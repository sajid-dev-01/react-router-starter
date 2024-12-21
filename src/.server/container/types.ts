import { IAuthenticationService } from "../application/abstruct/infrastructure/auth";
import { ICrashReporterService } from "../application/abstruct/infrastructure/crash-reaporter";
import { IEmailService } from "../application/abstruct/infrastructure/email";
import { IInstrumentationService } from "../application/abstruct/infrastructure/instrumentation";
import { IOtpService } from "../application/abstruct/infrastructure/otp";
import { ITransactionManagerService } from "../application/abstruct/persistence/transaction-manager";
import { ISessionRepository } from "../application/abstruct/repositories/session.repo";
import { IUserRepository } from "../application/abstruct/repositories/user.repo";
import { IVerifyTokenRepository } from "../application/abstruct/repositories/verify-token.repo";
import {
  IForgotPasswordUseCase,
  IResetPasswordUseCase,
  ISignInUseCase,
  ISignOutUseCase,
  ISignUpUseCase,
  IVerifyEmailUseCase,
} from "../application/use-case/auth";

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
