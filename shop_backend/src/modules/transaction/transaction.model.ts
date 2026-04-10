// Transaction model
export interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  referenceId: string;
  description: string;
  createdAt: Date;
}
