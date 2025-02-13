import { createModule } from "@evyweb/ioctopus";

import { DrizzleTransactionManager } from "~/.server/shared/transaction/drizzle-transaction-manger";
import { MockTransactionManager } from "~/.server/shared/transaction/transaction-manager.mock";

import { DI_SYMBOLS } from "../types";

export function initTransactionModule() {
  const transactionManagerModule = createModule();

  if (process.env.NODE_ENV === "test") {
    transactionManagerModule
      .bind(DI_SYMBOLS.TransactionManagerService)
      .toClass(MockTransactionManager);
  } else {
    transactionManagerModule
      .bind(DI_SYMBOLS.TransactionManagerService)
      .toClass(DrizzleTransactionManager);
  }

  return transactionManagerModule;
}
