import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  referenceId: string;
  description: string;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
  amount: { type: Number, required: true },
  referenceId: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const TransactionModel = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default TransactionModel;
