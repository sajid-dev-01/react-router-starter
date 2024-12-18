import {
  ITransaction,
  ITransactionManagerService,
} from "~/.server/application/common/services/transaction-manager";

export class MockTransactionManagerService
  implements ITransactionManagerService
{
  public startTransaction<T>(
    clb: (tx: ITransaction) => Promise<T>
  ): Promise<T> {
    return clb({ rollback: () => {} });
  }
}
