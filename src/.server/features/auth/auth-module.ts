import { createModule } from "@evyweb/ioctopus";

import { serverEnv } from "~/.server/configs/env/server-env";
import {
  signInController,
  signUpController,
} from "~/.server/features/auth/auth-controller";
import { SqlSessionRepository } from "~/.server/features/auth/repositories/sql-session-repository";
import { SqlVerifyTokenRepository } from "~/.server/features/auth/repositories/sql-verify-token-repository";
import { AuthenticationServiceImpl } from "~/.server/features/auth/services/auth-service-impl";
import { AuthenticationServiceMock } from "~/.server/features/auth/services/auth-service-mock";
import { OtpServiceImpl } from "~/.server/features/auth/services/otp-service-impl";
import {
  forgotPasswordUseCase,
  resetPasswordUseCase,
  signInUseCase,
  signOutUseCase,
  signUpUseCase,
  verifyEmailUseCase,
} from "~/.server/features/auth/use-cases";

export const DI_SYMBOLS = {
  // Repositories
  RoleRepository: Symbol.for("RoleRepository"),
  UserRepository: Symbol.for("UserRepository"),
  SessionRepository: Symbol.for("SessionRepository"),
  VerifyTokenRepository: Symbol.for("VerifyTokenRepository"),

  // Services
  InstrumentationService: Symbol.for("nstrumentationService"),
  CrashReporterService: Symbol.for("CrashReporterService"),
  AuthenticationService: Symbol.for("AuthenticationService"),
  EncryptionService: Symbol.for("EncryptionService"),
  OtpService: Symbol.for("OtpService"),

  // Use Cases
  SignUpUseCase: Symbol.for("SignUpUseCase"),
  VerifyEmailUseCase: Symbol.for("VerifyEmailUseCase"),
  SignInUseCase: Symbol.for("SignInUseCase"),
  SignOutUseCase: Symbol.for("SignOutUseCase"),
  ForgotPasswordUseCase: Symbol.for("ForgotPasswordUseCase"),
  ResetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),

  // Controllers
  SignUpController: Symbol.for("SignUpController"),
  SignInController: Symbol.for("SignInController"),
  // VerifyEmailController: Symbol.for("VerifyEmailController"),
  // SignOutController: Symbol.for("SignOutController"),
  // ForgotPasswordController: Symbol.for("ForgotPasswordController"),
  // ResetPasswordController: Symbol.for("ResetPasswordController"),
};

export function initAuthModule() {
  const authModule = createModule();

  if (serverEnv.NODE_ENV === "test") {
    authModule
      .bind(DI_SYMBOLS.AuthenticationService)
      .toClass(AuthenticationServiceMock);
  } else {
    authModule
      .bind(DI_SYMBOLS.AuthenticationService)
      .toClass(AuthenticationServiceImpl, [
        DI_SYMBOLS.OtpService,
        DI_SYMBOLS.UserRepository,
        DI_SYMBOLS.VerifyTokenRepository,
        DI_SYMBOLS.SessionRepository,
      ]);
    authModule
      .bind(DI_SYMBOLS.OtpService)
      .toClass(OtpServiceImpl, [DI_SYMBOLS.EncryptionService]);
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
