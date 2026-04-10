// User model
import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  accountId: string;
  name: string;
  birth: Date;
  phone: string;
  address: string;
  createdAt: Date;
}

const UserSchema = new Schema<User>({
  accountId: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: Date, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<User>('User', UserSchema);
