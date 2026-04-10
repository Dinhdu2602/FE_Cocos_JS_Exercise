import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  points: number;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
});

const CustomerModel = mongoose.model<ICustomer>('Customer', CustomerSchema);
export default CustomerModel;
