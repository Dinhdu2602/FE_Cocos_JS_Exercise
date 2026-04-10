import TransactionModel, { type ITransaction } from './transaction.schema';

export const getAllTransactions = async (): Promise<ITransaction[]> => {
  return TransactionModel.find();
};

export const getTransactionById = async (id: string): Promise<ITransaction | null> => {
  return TransactionModel.findById(id);
};

export const createTransaction = async (transaction: Partial<ITransaction>): Promise<ITransaction> => {
  const created = new TransactionModel(transaction);
  return created.save();
};

export const updateTransaction = async (id: string, update: Partial<ITransaction>): Promise<ITransaction | null> => {
  return TransactionModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteTransaction = async (id: string): Promise<boolean> => {
  const res = await TransactionModel.findByIdAndDelete(id);
  return !!res;
};
