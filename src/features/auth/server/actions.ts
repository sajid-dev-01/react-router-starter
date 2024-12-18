"use server";

import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";

import appConfig from "~/configs/app-config";
import { wait } from "~/lib/helpers";
import { actionClient, authActionClient } from "~/lib/safe-action";
import {
  confirmPassword,
  createSession,
  forgotPassword,
  invalidateUserSession,
  resendVerifyEmail,
  resetPassword,
  signUpUser,
  validateCredential,
  verifyEmail,
} from "~/services/auth-service";

import { REGISTRATION_COOKIE } from "../constants";
import {
  ConfirmPasswordSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
  VerifyEmailSchema,
} from "../schemas";

export const signUpAction = actionClient
  .metadata({ actionName: "signUpAction" })
  .schema(SignUpSchema)
  .action(async ({ parsedInput }) => {
    const user = await signUpUser(parsedInput);
    const cookie = await cookies();

    if ("id" in user) {
      cookie.set(REGISTRATION_COOKIE, user.email, {
        httpOnly: true,
        sameSite: "lax",
        secure: appConfig.env === "production",
        expires: Date.now() * 1000 * 60 * 60,
        path: "/",
      });
    }
  });

export const resendCodeAction = actionClient
  .metadata({ actionName: "resendCodeAction" })
  .action(async () => {
    const cookie = await cookies();
    const email = cookie.get(REGISTRATION_COOKIE)?.value;

    if (!email) return;

    return await resendVerifyEmail(email);
  });

export const verifyEmailAction = actionClient
  .metadata({ actionName: "verifyEmailAction" })
  .schema(VerifyEmailSchema)
  .action(async ({ parsedInput }) => {
    const cookie = await cookies();
    const email = cookie.get(REGISTRATION_COOKIE)?.value;

    if (!email) throw new Error("REGISTRATION_COOKIE not found");

    await Promise.all([wait(1000), verifyEmail(email, parsedInput.otp)]);

    cookie.delete(REGISTRATION_COOKIE);
  });

export const signInAction = actionClient
  .metadata({ actionName: "signInAction" })
  .schema(SignInSchema)
  .action(async ({ parsedInput }) => {
    const headerList = await headers();
    const user = await validateCredential(parsedInput);

    if ("id" in user) {
      await createSession(user.id, {
        ipAddress: headerList.get("X-Forwarded-For"),
        userAgent: userAgent({ headers: headerList }),
      });
    }

    return user;
  });

export const forgotPasswordAction = actionClient
  .metadata({ actionName: "forgotPasswordAction" })
  .schema(ForgotPasswordSchema)
  .action(async ({ parsedInput }) => {
    await forgotPassword(parsedInput.email);
  });

export const resetPasswordAction = actionClient
  .metadata({ actionName: "resetPasswordAction" })
  .schema(ResetPasswordSchema)
  .action(async ({ parsedInput }) => {
    await resetPassword(parsedInput);
  });

export const signOutAction = authActionClient
  .metadata({ actionName: "signOutAction" })
  .action(async ({ ctx }) => {
    await invalidateUserSession(ctx.user.id);
  });

export const confirmPassAction = authActionClient
  .metadata({ actionName: "confirmPassAction" })
  .schema(ConfirmPasswordSchema)
  .action(async ({ ctx, parsedInput }) => {
    await confirmPassword({
      sessionId: ctx.session.id,
      password: parsedInput.password,
    });
  });
