import { HttpError } from "~/.server/domain/exceptions";

import { IAuthenticationService } from "../../abstruct/infrastructure/auth.service";
import { IInstrumentationService } from "../../abstruct/infrastructure/instrumentation.service";
import { IRoleRepository } from "../../abstruct/repositories/role.repo";
import { IUserRepository } from "../../abstruct/repositories/user.repo";
import { SignUpDto } from "../../dtos/auth.dto";

export type ISignUpUseCase = ReturnType<typeof signUpUseCase>;
export const signUpUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthenticationService,
    roleRepository: IRoleRepository,
    userRepository: IUserRepository
  ) =>
  async (dto: SignUpDto) => {
    return instrumentationService.startSpan(
      { name: "signUpUseCase", op: "function" },
      async () => {
        const existingUser = await userRepository.findByEmail(dto.email);
        if (existingUser) {
          if (existingUser.emailVerified) {
            throw new HttpError("Email is already taken");
          }

          if (await authService.isVerifyEmailSent(dto.email)) {
            throw new HttpError("Email already sent. Try after a few minutes");
          } else {
            await authService.deleteVerifyEmail(dto.email);
            await authService.sendVerifyEmail(dto.email);
          }
        }

        const userRole = await roleRepository.findByName("USER");
        if (!userRole) throw new Error("`USER` role not exists.");

        const [user] = await Promise.all([
          userRepository.create({ ...dto, roleId: userRole.id }),
          authService.sendVerifyEmail(dto.email),
        ]);

        return user;
      }
    );
  };
