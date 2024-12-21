import { IAuthenticationService } from "../../abstruct/infrastructure/auth";
import { IInstrumentationService } from "../../abstruct/infrastructure/instrumentation";
import { IUserRepository } from "../../abstruct/repositories/user.repo";
import { VerifyEmailDto } from "../../dtos/auth.dto";

export type ISignOutUseCase = ReturnType<typeof signOutUseCase>;
export const signOutUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthenticationService,
    userRepository: IUserRepository
  ) =>
    async (email: string, dto: VerifyEmailDto) => {
      return instrumentationService.startSpan(
        { name: "signOutUseCase", op: "function" },
        async () => {
          // TODO: implement sign out features
        }
      );
    };

