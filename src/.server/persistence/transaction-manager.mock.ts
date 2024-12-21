import {
  ITransaction,
  ITransactionManagerService,
} from "../application/abstruct/persistence/transaction-manager";

export class MockTransactionManagerService
  implements ITransactionManagerService
{
  public startTransaction<T>(
    clb: (tx: ITransaction) => Promise<T>
  ): Promise<T> {
    return clb({ rollback: () => {} });
  }
}
