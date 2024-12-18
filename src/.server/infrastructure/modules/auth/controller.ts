import { SignInDto, SignUpDto } from "~/.server/application/dtos/auth.dto";
import { getInstance } from "~/.server/container";

export type ISignInController = ReturnType<typeof signInController>;

export const signUpController = async (dto: SignUpDto) => {
  const signUpUseCase = getInstance("ISignUpUseCase");
  signUpUseCase;
};

export const signInController = async (input: SignInDto) => {
  const signInUseCase = getInstance("ISignInUseCase");
  signInUseCase;
};
