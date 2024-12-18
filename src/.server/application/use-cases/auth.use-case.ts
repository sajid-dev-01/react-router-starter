import { IInstrumentationService } from "../common/services/instrumentation";
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  VerifyEmailDto,
} from "../dtos/auth.dto";
import { IRoleRepository } from "../repositories/role.repo";
import type { IUserRepository } from "../repositories/user.repo";
import { IVerifyTokenRepository } from "../repositories/verify-token.repo";
import { IAuthenticationService } from "../services/auth/auth";
import { IOtpService } from "../services/auth/otp";

import {
  HttpError,
  NotFoundError,
  NotVerifiedError,
  TokenError,
} from "~/.server/domain/errors";

export type ISignUpUseCase = ReturnType<typeof signUpUseCase>;
export const signUpUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthenticationService,
    roleRepository: IRoleRepository,
    userRepository: IUserRepository
  ) =>
  async (dto: SignUpDto) => {
    return instrumentationService.startSpan(
      { name: "signUpUseCase", op: "function" },
      async () => {
        const existingUser = await userRepository.findByEmail(dto.email);
        if (existingUser) {
          if (existingUser.emailVerified) {
            throw new HttpError("Email is already taken");
          }

          if (await authService.isVerifyEmailSent(dto.email)) {
            throw new HttpError("Email already sent. Try after a few minutes");
          } else {
            await authService.deleteVerifyEmail(dto.email);
            await authService.sendVerifyEmail(dto.email);
          }
        }

        const userRole = await roleRepository.findByName("USER");
        if (!userRole) throw new Error("`USER` role not exists.");

        const [user] = await Promise.all([
          userRepository.create({ ...dto, roleId: userRole.id }),
          authService.sendVerifyEmail(dto.email),
        ]);

        return user;
      }
    );
  };

export type IVerifyEmailUseCase = ReturnType<typeof verifyEmailUseCase>;
export const verifyEmailUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthenticationService,
    otpService: IOtpService,
    userRepository: IUserRepository,
    verifyTokenRepository: IVerifyTokenRepository
  ) =>
  async (email: string, dto: VerifyEmailDto) => {
    return instrumentationService.startSpan(
      { name: "verifyEmailUseCase", op: "function" },
      async () => {
        const existingUser = await userRepository.findByEmail(email);
        if (!existingUser) throw new NotFoundError();

        const verifyToken = await verifyTokenRepository.findByEmail(email);
        if (!verifyToken || verifyToken.expiresAt <= new Date())
          throw new TokenError();

        if (!otpService.verifyHOTP(verifyToken.token, dto.otp))
          throw new TokenError();

        await Promise.all([
          userRepository.updateByEmail(email, { emailVerified: new Date() }),
          authService.deleteVerifyEmail(email),
        ]);
      }
    );
  };

export type ISignInUseCase = ReturnType<typeof signInUseCase>;
export const signInUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthenticationService,
    userRepository: IUserRepository
  ) =>
  async (dto: SignInDto) => {
    return instrumentationService.startSpan(
      { name: "signInUseCase", op: "function" },
      async () => {
        const existingUser = await userRepository.findByEmail(dto.email);
        if (!existingUser || !existingUser.password) {
          throw new NotFoundError();
        }

        if (!existingUser.emailVerified) {
          throw new NotVerifiedError();
        }

        const validPassword = await authService.validatePasswords({
          password: dto.password,
          hash: existingUser.password,
        });
        if (!validPassword) {
          throw new HttpError("Invalid credentials!");
        }

        return await authService.createSession(existingUser);
      }
    );
  };

export type ISignOutUseCase = ReturnType<typeof signOutUseCase>;
export const signOutUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthenticationService,
    userRepository: IUserRepository
  ) =>
  async (email: string, dto: VerifyEmailDto) => {
    return instrumentationService.startSpan(
      { name: "signOutUseCase", op: "function" },
      async () => {
        // TODO: implement sign out features
      }
    );
  };

export type IForgotPasswordUseCase = ReturnType<typeof forgotPasswordUseCase>;
export const forgotPasswordUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthenticationService,
    userRepository: IUserRepository
  ) =>
  async ({ email }: ForgotPasswordDto) => {
    return instrumentationService.startSpan(
      { name: "forgotPasswordUseCase", op: "function" },
      async () => {
        const existingUser = await userRepository.findByEmail(email);
        if (!existingUser) throw new NotFoundError();

        if (await authService.isVerifyEmailSent(email)) {
          throw new HttpError("Email already sent. Try after a few minutes");
        }

        await authService.deleteVerifyEmail(email);
        await authService.sendVerifyEmail(email);
      }
    );
  };

export type IResetPasswordUseCase = ReturnType<typeof resetPasswordUseCase>;
export const resetPasswordUseCase =
  (
    instrumentationService: IInstrumentationService,
    otpService: IOtpService,
    verifyTokenRepository: IVerifyTokenRepository,
    userRepository: IUserRepository
  ) =>
  async ({ email, otp, password }: ResetPasswordDto) => {
    return instrumentationService.startSpan(
      { name: "resetPasswordUseCase", op: "function" },
      async () => {
        const existingUser = await userRepository.findByEmail(email);
        if (!existingUser) throw new NotFoundError();

        const verifyToken = await verifyTokenRepository.findByEmail(email);
        if (!verifyToken || verifyToken.expiresAt <= new Date()) {
          throw new TokenError();
        }

        if (!otpService.verifyHOTP(verifyToken.token, otp)) {
          throw new TokenError();
        }

        await Promise.all([
          userRepository.updateById(existingUser.id, { password }),
          verifyTokenRepository.deleteByEmail(email),
        ]);
      }
    );
  };
