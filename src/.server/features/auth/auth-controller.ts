import { InstrumentationService } from "~/.server/shared/monitoring/instrumentation/instrumentation";

import { SignInDto, SignUpDto } from "./auth-dto";
import { SignInUseCase, SignUpUseCase } from "./use-cases";

export type SignUpController = ReturnType<typeof signUpController>;
export const signUpController =
  (
    instrumentationService: InstrumentationService,
    signUpUseCase: SignUpUseCase
  ) =>
  async (dto: SignUpDto) => {
    return await instrumentationService.startSpan(
      { name: "signUp Controller" },
      async () => {
        return signUpUseCase(dto);
      }
    );
  };

export type SignInController = ReturnType<typeof signInController>;
export const signInController =
  (
    instrumentationService: InstrumentationService,
    signInUseCase: SignInUseCase
  ) =>
  async (dto: SignInDto) => {
    return await instrumentationService.startSpan(
      { name: "signIn Controller" },
      async () => {
        return signInUseCase(dto);
      }
    );
  };
