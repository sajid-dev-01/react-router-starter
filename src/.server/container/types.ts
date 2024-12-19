import { ICrashReporterService } from "../application/common/services/crash-reaporter";
import { IEmailService } from "../application/common/services/email";
import { IInstrumentationService } from "../application/common/services/instrumentation";
import { ITransactionManagerService } from "../application/common/services/transaction-manager";
import { ISessionRepository } from "../application/repositories/session.repo";
import { IUserRepository } from "../application/repositories/user.repo";
import { IVerifyTokenRepository } from "../application/repositories/verify-token.repo";
import { IAuthenticationService } from "../application/services/auth/auth";
import { IOtpService } from "../application/services/auth/otp";
import {
  IForgotPasswordUseCase,
  IResetPasswordUseCase,
  ISignInUseCase,
  ISignOutUseCase,
  ISignUpUseCase,
  IVerifyEmailUseCase,
} from "../application/use-cases/auth.use-case";

export const DI_SYMBOLS = {
  // Repositories
  IRoleRepository: Symbol.for("IRoleRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IVerifyTokenRepository: Symbol.for("IVerifyTokenRepository"),

  // Services
  IInstrumentationService: Symbol.for("IInstrumentationService"),
  ICrashReporterService: Symbol.for("ICrashReporterService"),
  ITransactionManagerService: Symbol.for("ITransactionManagerService"),
  IEmailService: Symbol.for("IEmailService"),
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  IOtpService: Symbol.for("IOtpService"),

  // Use Cases
  ISignUpUseCase: Symbol.for("ISignUpUseCase"),
  IVerifyEmailUseCase: Symbol.for("IVerifyEmailUseCase"),
  ISignInUseCase: Symbol.for("ISignInUseCase"),
  ISignOutUseCase: Symbol.for("ISignOutUseCase"),
  IForgotPasswordUseCase: Symbol.for("IForgotPasswordUseCase"),
  IResetPasswordUseCase: Symbol.for("IResetPasswordUseCase"),
};

export interface DI_RETURN_TYPES {
  // Repositories
  IUserRepository: IUserRepository;
  ISessionRepository: ISessionRepository;
  IVerifyTokenRepository: IVerifyTokenRepository;

  // Services
  ITransactionManagerService: ITransactionManagerService;
  IInstrumentationService: IInstrumentationService;
  ICrashReporterService: ICrashReporterService;
  IEmailService: IEmailService;
  IAuthenticationService: IAuthenticationService;
  IOtpService: IOtpService;

  // Use Cases
  // - auth
  ISignUpUseCase: ISignUpUseCase;
  IVerifyEmailUseCase: IVerifyEmailUseCase;
  ISignInUseCase: ISignInUseCase;
  ISignOutUseCase: ISignOutUseCase;
  IForgotPasswordUseCase: IForgotPasswordUseCase;
  IResetPasswordUseCase: IResetPasswordUseCase;
  // - role
  // - user
}
