import { createContainer } from "@evyweb/ioctopus";

import { initAuthModule } from "~/.server/container/modules/auth.module";
import { initTransactionModule } from "~/.server/container/modules/db.module";
import { initEmailModule } from "~/.server/container/modules/email.module";
import { initEncryptionModule } from "~/.server/container/modules/encryption.module";
import { initMonitorModule } from "~/.server/container/modules/monitor.module";
import { initRoleModule } from "~/.server/container/modules/role.module";
import { initUserModule } from "~/.server/container/modules/user.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "~/.server/container/types";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

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
