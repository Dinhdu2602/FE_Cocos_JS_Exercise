import mongoose, { Schema, Document } from 'mongoose';

export interface Customer extends Document {
    name: string;
    points: number;
}

const CustomerSchema = new Schema<Customer>({
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
});

export const CustomerModel = mongoose.model<Customer>('Customer', CustomerSchema);