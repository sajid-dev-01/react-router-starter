import { HttpError, NotFoundError, NotVerifiedError } from "~/.server/domain/exceptions";
import { SignInDto } from "~/features/auth/schemas";

import { IAuthenticationService } from "../../abstruct/infrastructure/auth";
import { IInstrumentationService } from "../../abstruct/infrastructure/instrumentation";
import { IUserRepository } from "../../abstruct/repositories/user.repo";

export type ISignInUseCase = ReturnType<typeof signInUseCase>;
export const signInUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthenticationService,
    userRepository: IUserRepository
  ) =>
    async (dto: SignInDto) => {
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

