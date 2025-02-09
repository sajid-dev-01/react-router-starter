import { UserRepository } from "~/.server/features/user/user-repository";
import { HttpError, NotFoundError } from "~/.server/libs/exceptions";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

import { AuthenticationService } from "../services/auth-service";

interface Input {
  email: string;
}

export type ForgotPasswordUseCase = ReturnType<typeof forgotPasswordUseCase>;
export const forgotPasswordUseCase =
  (
    instrumentationService: InstrumentationService,
    authService: AuthenticationService,
    userRepository: UserRepository
  ) =>
  async ({ email }: Input) => {
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
