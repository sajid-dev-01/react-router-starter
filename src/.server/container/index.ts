import { createContainer } from "@evyweb/ioctopus";

import { IInstrumentationService } from "../application/common/services/instrumentation";
import { createAuthModule } from "./modules/auth.module";
import { createTransactionManagerModule } from "./modules/db.module";
import { createMonitorModule } from "./modules/monitor.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

const AppContainer = createContainer();

AppContainer.load(Symbol("MonitorModule"), createMonitorModule());
AppContainer.load(
  Symbol("TransactionModule"),
  createTransactionManagerModule()
);
AppContainer.load(Symbol("AuthModule"), createAuthModule());

export function getInstance<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
  // @ts-expect-error
): DI_RETURN_TYPES[K] {
  const instrumantionService = AppContainer.get<IInstrumentationService>(
    DI_SYMBOLS.IInstrumentationService
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
