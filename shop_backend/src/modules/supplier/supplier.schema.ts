import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  phone: string;
  address: string;
}

const SupplierSchema = new Schema<ISupplier>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const SupplierModel = mongoose.model<ISupplier>('Supplier', SupplierSchema);
export default SupplierModel;
