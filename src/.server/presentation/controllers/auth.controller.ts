import { SignInDto, SignUpDto } from "~/.server/application/dtos/auth.dto";
import { getInstance } from "~/.server/container";

export type ISignInController = ReturnType<typeof signInController>;

export const signUpController = async (dto: SignUpDto) => {
  const signUpUseCase = getInstance("ISignUpUseCase");

  return signUpUseCase(dto);
};

export const signInController = async (dto: SignInDto) => {
  const signInUseCase = getInstance("ISignInUseCase");

  return signInUseCase(dto);
};
