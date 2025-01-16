import { UserRepository } from "~/.server/features/user/user.repo";
import { VerifyTokenRepository } from "~/.server/features/verify-token/verify-token.repo";
import { NotFoundError, TokenError } from "~/.server/libs/exceptions";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

import { OtpService } from "../services/otp.service";

interface Input {
  otp: string;
  email: string;
  password: string;
}

export type ResetPasswordUseCase = ReturnType<typeof resetPasswordUseCase>;
export const resetPasswordUseCase =
  (
    instrumentationService: InstrumentationService,
    otpService: OtpService,
    verifyTokenRepository: VerifyTokenRepository,
    userRepository: UserRepository
  ) =>
  async ({ email, otp, password }: Input) => {
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
