import mongoose, { Schema, Document } from 'mongoose';

export interface IAccount extends Document {
  email: string;
  password: string;
  role: 'OWNER' | 'STAFF' | 'CUSTOMER';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const AccountSchema = new Schema<IAccount>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['OWNER', 'STAFF', 'CUSTOMER'], required: true },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const AccountModel = mongoose.model<IAccount>('Account', AccountSchema);
export default AccountModel;
