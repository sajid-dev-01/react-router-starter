import { RoleRepository } from "~/.server/features/role/role-repository";
import { UserRepository } from "~/.server/features/user/user-repository";
import { HttpError } from "~/.server/libs/exceptions";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

import { AuthenticationService } from "../services/auth-service";

interface Input {
  name: string;
  email: string;
  password: string;
}

export type SignUpUseCase = ReturnType<typeof signUpUseCase>;
export const signUpUseCase =
  (
    instrumentationService: InstrumentationService,
    authService: AuthenticationService,
    roleRepository: RoleRepository,
    userRepository: UserRepository
  ) =>
  async (dto: Input) => {
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
