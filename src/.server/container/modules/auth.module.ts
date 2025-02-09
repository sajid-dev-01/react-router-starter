import { createModule } from "@evyweb/ioctopus";

import { serverEnv } from "~/.server/configs/env/server-env";
import {
  signInController,
  signUpController,
} from "~/.server/features/auth/auth-controller";
import { CustomOtpService } from "~/.server/features/auth/services/custom-otp-service";
import { MockAuthenticationService } from "~/.server/features/auth/services/mock-auth-service";
import { MyAuthenticationService } from "~/.server/features/auth/services/my-auth-service";
import {
  forgotPasswordUseCase,
  resetPasswordUseCase,
  signInUseCase,
  signOutUseCase,
  signUpUseCase,
  verifyEmailUseCase,
} from "~/.server/features/auth/use-cases";
import { SqlSessionRepository } from "~/.server/features/session/sql-session-repository";
import { SqlVerifyTokenRepository } from "~/.server/features/verify-token/sql-verify-token-repository";

import { DI_SYMBOLS } from "../types";

export function initAuthModule() {
  const authModule = createModule();

  if (serverEnv.NODE_ENV === "test") {
    authModule
      .bind(DI_SYMBOLS.AuthenticationService)
      .toClass(MockAuthenticationService);
  } else {
    authModule
      .bind(DI_SYMBOLS.AuthenticationService)
      .toClass(MyAuthenticationService, [
        DI_SYMBOLS.OtpService,
        DI_SYMBOLS.UserRepository,
        DI_SYMBOLS.VerifyTokenRepository,
        DI_SYMBOLS.SessionRepository,
      ]);
    authModule
      .bind(DI_SYMBOLS.OtpService)
      .toClass(CustomOtpService, [DI_SYMBOLS.EncryptionService]);
  }

  // repositories
  authModule
    .bind(DI_SYMBOLS.SessionRepository)
    .toClass(SqlSessionRepository, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.CrashReporterService,
    ]);
  authModule
    .bind(DI_SYMBOLS.VerifyTokenRepository)
    .toClass(SqlVerifyTokenRepository, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.CrashReporterService,
    ]);

  // use-cases
  authModule
    .bind(DI_SYMBOLS.SignUpUseCase)
    .toHigherOrderFunction(signUpUseCase, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.AuthenticationService,
      DI_SYMBOLS.RoleRepository,
      DI_SYMBOLS.UserRepository,
    ]);
  authModule
    .bind(DI_SYMBOLS.VerifyEmailUseCase)
    .toHigherOrderFunction(verifyEmailUseCase, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.AuthenticationService,
      DI_SYMBOLS.OtpService,
      DI_SYMBOLS.UserRepository,
      DI_SYMBOLS.VerifyTokenRepository,
    ]);
  authModule
    .bind(DI_SYMBOLS.SignInUseCase)
    .toHigherOrderFunction(signInUseCase, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.AuthenticationService,
      DI_SYMBOLS.UserRepository,
    ]);
  authModule
    .bind(DI_SYMBOLS.SignOutUseCase)
    .toHigherOrderFunction(signOutUseCase, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.AuthenticationService,
    ]);
  authModule
    .bind(DI_SYMBOLS.ForgotPasswordUseCase)
    .toHigherOrderFunction(forgotPasswordUseCase, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.AuthenticationService,
      DI_SYMBOLS.UserRepository,
    ]);
  authModule
    .bind(DI_SYMBOLS.ResetPasswordUseCase)
    .toHigherOrderFunction(resetPasswordUseCase, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.OtpService,
      DI_SYMBOLS.VerifyTokenRepository,
      DI_SYMBOLS.UserRepository,
    ]);

  // controllers
  authModule
    .bind(DI_SYMBOLS.SignUpController)
    .toHigherOrderFunction(signUpController, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.SignUpUseCase,
    ]);
  authModule
    .bind(DI_SYMBOLS.SignInController)
    .toHigherOrderFunction(signInController, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.SignInUseCase,
    ]);

  return authModule;
}
