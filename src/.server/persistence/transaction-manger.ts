import { db, DrizzleTransaction } from "~/.server/persistence/db";

import { ITransactionManagerService } from "../application/abstruct/persistence/transaction-manager";

export class TransactionManagerService implements ITransactionManagerService {
  public startTransaction<T>(
    clb: (tx: DrizzleTransaction) => Promise<T>,
    parent?: DrizzleTransaction
  ): Promise<T> {
    const invoker = parent ?? db;
    return invoker.transaction(clb);
  }
}
