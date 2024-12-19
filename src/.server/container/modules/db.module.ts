import { createModule } from "@evyweb/ioctopus";

import { MockTransactionManagerService } from "~/.server/infrastructure/common/services/transaction-manager.mock";
import { TransactionManagerService } from "~/.server/infrastructure/common/services/transaction-manger";

import { DI_SYMBOLS } from "../types";

export function createTransactionManagerModule() {
  const transactionManagerModule = createModule();

  if (process.env.NODE_ENV === "test") {
    transactionManagerModule
      .bind(DI_SYMBOLS.ITransactionManagerService)
      .toClass(MockTransactionManagerService);
  } else {
    transactionManagerModule
      .bind(DI_SYMBOLS.ITransactionManagerService)
      .toClass(TransactionManagerService);
  }

  return transactionManagerModule;
}
