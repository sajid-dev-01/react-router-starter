import { UserRepository } from "~/.server/features/user/repositories/user-repository";
import { NotFoundError, TokenError } from "~/.server/shared/exceptions";
import { InstrumentationService } from "~/.server/shared/monitoring/instrumentation/instrumentation";

import { VerifyTokenRepository } from "../repositories/verify-token-repository";
import { AuthenticationService } from "../services/auth-service";
import { OtpService } from "../services/otp-service";

interface Input {
  email: string;
  otp: string;
}

export type VerifyEmailUseCase = ReturnType<typeof verifyEmailUseCase>;
export const verifyEmailUseCase =
  (
    instrumentationService: InstrumentationService,
    authService: AuthenticationService,
    otpService: OtpService,
    userRepository: UserRepository,
    verifyTokenRepository: VerifyTokenRepository
  ) =>
  async ({ email, otp }: Input) => {
    return instrumentationService.startSpan(
      { name: "verifyEmailUseCase", op: "function" },
      async () => {
        const existingUser = await userRepository.findByEmail(email);
        if (!existingUser) throw new NotFoundError();

        const verifyToken = await verifyTokenRepository.findByEmail(email);
        if (!verifyToken || verifyToken.expiresAt <= new Date())
          throw new TokenError();

        if (!otpService.verifyHOTP(verifyToken.token, otp))
          throw new TokenError();

        await Promise.all([
          userRepository.updateByEmail(email, { emailVerified: new Date() }),
          authService.deleteVerifyEmail(email),
        ]);
      }
    );
  };
