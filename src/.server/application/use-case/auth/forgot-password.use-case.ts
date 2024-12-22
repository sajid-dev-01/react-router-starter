import { HttpError, NotFoundError } from "~/.server/domain/exceptions";

import { IAuthenticationService } from "../../abstruct/infrastructure/auth.service";
import { IInstrumentationService } from "../../abstruct/infrastructure/instrumentation.service";
import { IUserRepository } from "../../abstruct/repositories/user.repo";
import { ForgotPasswordDto } from "../../dtos/auth.dto";

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
