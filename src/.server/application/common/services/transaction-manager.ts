export interface ITransaction {
  rollback: () => void;
}

export interface ITransactionManagerService {
  startTransaction<T>(
    cb: (tx: ITransaction) => Promise<T>,
    parent?: ITransaction
  ): Promise<T>;
}
