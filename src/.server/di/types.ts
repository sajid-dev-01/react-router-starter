import {
  SignInController,
  SignUpController,
} from "~/.server/features/auth/auth-controller";
import { AuthenticationService } from "~/.server/features/auth/services/auth-service";
import { OtpService } from "~/.server/features/auth/services/otp-service";
import {
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  VerifyEmailUseCase,
} from "~/.server/features/auth/use-cases";
import { TransactionManager } from "~/.server/shared/transaction/transaction-manager";

import { SessionRepository } from "../features/auth/repositories/session-repository";
import { VerifyTokenRepository } from "../features/auth/repositories/verify-token-repository";
import { RoleRepository } from "../features/user/repositories/role-repository";
import { UserRepository } from "../features/user/repositories/user-repository";
import { EncryptionService } from "../shared/cryptography/encryption";
import { EmailService } from "../shared/email/email-service";
import { CrashReporterService } from "../shared/monitoring/crash-reporter/crash-reporter";
import { InstrumentationService } from "../shared/monitoring/instrumentation/instrumentation";
import { Logger } from "../shared/monitoring/logger/logger";

export const DI_SYMBOLS = {
  // Repositories
  RoleRepository: Symbol.for("RoleRepository"),
  UserRepository: Symbol.for("UserRepository"),
  SessionRepository: Symbol.for("SessionRepository"),
  VerifyTokenRepository: Symbol.for("VerifyTokenRepository"),

  // Services
  Logger: Symbol.for("Logger"),
  InstrumentationService: Symbol.for("nstrumentationService"),
  CrashReporterService: Symbol.for("CrashReporterService"),
  EmailService: Symbol.for("EmailService"),
  TransactionManagerService: Symbol.for("TransactionManagerService"),
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

export interface DI_RETURN_TYPES {
  // Repositories
  RoleRepository: RoleRepository;
  UserRepository: UserRepository;
  SessionRepository: SessionRepository;
  VerifyTokenRepository: VerifyTokenRepository;

  // Services
  Logger: Logger;
  InstrumentationService: InstrumentationService;
  CrashReporterService: CrashReporterService;
  EmailService: EmailService;
  TransactionManagerService: TransactionManager;
  AuthenticationService: AuthenticationService;
  EncryptionService: EncryptionService;
  OtpService: OtpService;

  // Use Cases
  // - auth
  SignUpUseCase: SignUpUseCase;
  VerifyEmailUseCase: VerifyEmailUseCase;
  SignInUseCase: SignInUseCase;
  SignOutUseCase: SignOutUseCase;
  ForgotPasswordUseCase: ForgotPasswordUseCase;
  ResetPasswordUseCase: ResetPasswordUseCase;
  // - role
  // - user

  // controllers
  // - auth
  SignUpController: SignUpController;
  SignInController: SignInController;
}
