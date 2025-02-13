import { UserRepository } from "~/.server/features/user/repositories/user-repository";
import {
  HttpError,
  NotFoundError,
  NotVerifiedError,
  ValidationError,
} from "~/.server/shared/exceptions";
import { InstrumentationService } from "~/.server/shared/monitoring/instrumentation/instrumentation";

import { AuthenticationService } from "../services/auth-service";

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
          throw new ValidationError({ email: ["Not found"] });
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
