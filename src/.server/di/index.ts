import { createContainer } from "@evyweb/ioctopus";

import { InstrumentationService } from "~/.server/shared/monitoring/instrumentation/instrumentation";

import { initAuthModule } from "./modules/auth.module";
import { initTransactionModule } from "./modules/db.module";
import { initEmailModule } from "./modules/email.module";
import { initEncryptionModule } from "./modules/encryption.module";
import { initMonitorModule } from "./modules/monitor.module";
import { initRoleModule } from "./modules/role.module";
import { initUserModule } from "./modules/user.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

const AppContainer = createContainer();

AppContainer.load(Symbol("MonitorModule"), initMonitorModule());
AppContainer.load(Symbol("TransactionModule"), initTransactionModule());
AppContainer.load(Symbol("EncryptionModule"), initEncryptionModule());
AppContainer.load(Symbol("EmailModule"), initEmailModule());
AppContainer.load(Symbol("RoleModule"), initRoleModule());
AppContainer.load(Symbol("UserModule"), initUserModule());
AppContainer.load(Symbol("AuthModule"), initAuthModule());

export function getInstance<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  const instrumantionService = AppContainer.get<InstrumentationService>(
    DI_SYMBOLS.InstrumentationService
  );

  return instrumantionService.startSpan(
    {
      name: "(di) getInstance",
      op: "function",
      attributes: { symbol: symbol.toString() },
    },
    () => AppContainer.get(DI_SYMBOLS[symbol])
  );
}
