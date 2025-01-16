import { UserRepository } from "~/.server/features/user/user.repo";
import {
  HttpError,
  NotFoundError,
  NotVerifiedError,
} from "~/.server/libs/exceptions";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

import { AuthenticationService } from "../services/auth.service";

interface Input {
  email: string;
  password: string;
}

export type SignInUseCase = ReturnType<typeof signInUseCase>;
export const signInUseCase =
  (
    instrumentationService: InstrumentationService,
    authService: AuthenticationService,
    userRepository: UserRepository
  ) =>
  async (dto: Input) => {
    return instrumentationService.startSpan(
      { name: "signInUseCase", op: "function" },
      async () => {
        const existingUser = await userRepository.findByEmail(dto.email);
        if (!existingUser || !existingUser.password) {
          throw new NotFoundError();
        }

        if (!existingUser.emailVerified) {
          throw new NotVerifiedError();
        }

        const validPassword = await authService.validatePasswords({
          password: dto.password,
          hash: existingUser.password,
        });
        if (!validPassword) {
          throw new HttpError("Invalid credentials!");
        }

        return await authService.createSession(existingUser);
      }
    );
  };
