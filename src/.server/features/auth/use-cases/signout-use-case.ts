import { UserRepository } from "~/.server/features/user/user-repository";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

import { AuthenticationService } from "../services/auth-service";

export type SignOutUseCase = ReturnType<typeof signOutUseCase>;
export const signOutUseCase =
  (
    instrumentationService: InstrumentationService,
    authService: AuthenticationService,
    userRepository: UserRepository
  ) =>
  async () => {
    return instrumentationService.startSpan(
      { name: "signOutUseCase", op: "function" },
      async () => {
        // TODO: implement sign out features
      }
    );
  };
