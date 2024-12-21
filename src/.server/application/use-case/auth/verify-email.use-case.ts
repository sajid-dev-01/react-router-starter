import { NotFoundError, TokenError } from "~/.server/domain/exceptions";

import { IAuthenticationService } from "../../abstruct/infrastructure/auth";
import { IInstrumentationService } from "../../abstruct/infrastructure/instrumentation";
import { IOtpService } from "../../abstruct/infrastructure/otp";
import { IUserRepository } from "../../abstruct/repositories/user.repo";
import { IVerifyTokenRepository } from "../../abstruct/repositories/verify-token.repo";
import { VerifyEmailDto } from "../../dtos/auth.dto";

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

