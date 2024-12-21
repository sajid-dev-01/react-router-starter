import { NotFoundError, TokenError } from "~/.server/domain/exceptions";

import { IInstrumentationService } from "../../abstruct/infrastructure/instrumentation";
import { IOtpService } from "../../abstruct/infrastructure/otp";
import { IUserRepository } from "../../abstruct/repositories/user.repo";
import { IVerifyTokenRepository } from "../../abstruct/repositories/verify-token.repo";
import { ResetPasswordDto } from "../../dtos/auth.dto";

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
