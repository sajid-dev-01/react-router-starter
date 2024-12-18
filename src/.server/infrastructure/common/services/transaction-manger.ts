import { ITransactionManagerService } from "~/.server/application/common/services/transaction-manager";
import { db, DrizzleTransaction } from "~/.server/db";

export class TransactionManagerService implements ITransactionManagerService {
  public startTransaction<T>(
    clb: (tx: DrizzleTransaction) => Promise<T>,
    parent?: DrizzleTransaction
  ): Promise<T> {
    const invoker = parent ?? db;
    return invoker.transaction(clb);
  }
}
