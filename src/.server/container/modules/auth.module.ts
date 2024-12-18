import { createModule } from "@evyweb/ioctopus";

import { DI_SYMBOLS } from "../types";

import {
  forgotPasswordUseCase,
  resetPasswordUseCase,
  signInUseCase,
  signOutUseCase,
  signUpUseCase,
  verifyEmailUseCase,
} from "~/.server/application/use-cases/auth.use-case";
import { serverEnv } from "~/.server/env/server-env";
import { AuthenticationService } from "~/.server/infrastructure/modules/auth/services/auth";

export function createAuthModule() {
  const authModule = createModule();

  if (serverEnv.NODE_ENV === "test") {
    // authModule.bind(DI_SYMBOLS.IAuthenticationService).toClass(MockAuthenticationService)
  } else {
    authModule
      .bind(DI_SYMBOLS.IAuthenticationService)
      .toClass(AuthenticationService, [
        DI_SYMBOLS.IOtpService,
        DI_SYMBOLS.IUserRepository,
        DI_SYMBOLS.IVerifyTokenRepository,
        DI_SYMBOLS.ISessionRepository,
      ]);
  }

  authModule
    .bind(DI_SYMBOLS.ISignUpUseCase)
    .toHigherOrderFunction(signUpUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IRoleRepository,
      DI_SYMBOLS.IUserRepository,
    ]);

  authModule
    .bind(DI_SYMBOLS.IVerifyEmailUseCase)
    .toHigherOrderFunction(verifyEmailUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IOtpService,
      DI_SYMBOLS.IUserRepository,
      DI_SYMBOLS.IVerifyTokenRepository,
    ]);
  authModule
    .bind(DI_SYMBOLS.ISignInUseCase)
    .toHigherOrderFunction(signInUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IUserRepository,
    ]);
  authModule
    .bind(DI_SYMBOLS.ISignOutUseCase)
    .toHigherOrderFunction(signOutUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
    ]);
  authModule
    .bind(DI_SYMBOLS.IForgotPasswordUseCase)
    .toHigherOrderFunction(forgotPasswordUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IUserRepository,
    ]);
  authModule
    .bind(DI_SYMBOLS.IResetPasswordUseCase)
    .toHigherOrderFunction(resetPasswordUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IOtpService,
      DI_SYMBOLS.IVerifyTokenRepository,
      DI_SYMBOLS.IUserRepository,
    ]);

  return authModule;
}
