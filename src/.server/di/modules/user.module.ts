import { createModule } from "@evyweb/ioctopus";

import { SqlUserRepository } from "~/.server/features/user/sql-user-repository";
import { UserMapper } from "~/.server/features/user/user-mapper";

import { DI_SYMBOLS } from "../types";

export function initUserModule() {
  const userModule = createModule();

  userModule.bind(UserMapper.name).toClass(UserMapper);
  userModule
    .bind(DI_SYMBOLS.UserRepository)
    .toClass(SqlUserRepository, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.CrashReporterService,
      UserMapper.name,
    ]);

  return userModule;
}
