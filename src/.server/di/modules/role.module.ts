import { createModule } from "@evyweb/ioctopus";

import { SqlRoleRepository } from "~/.server/features/user/repositories/sql-role-repository";

import { DI_SYMBOLS } from "../types";

export function initRoleModule() {
  const roleModule = createModule();

  roleModule
    .bind(DI_SYMBOLS.RoleRepository)
    .toClass(SqlRoleRepository, [
      DI_SYMBOLS.InstrumentationService,
      DI_SYMBOLS.CrashReporterService,
    ]);

  return roleModule;
}
