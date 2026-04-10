import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryLog extends Document {
  productVariantId: string;
  type: 'IMPORT' | 'EXPORT' | 'ADJUST';
  quantity: number;
  note: string;
  createdBy: string;
  createdAt: Date;
}

const InventoryLogSchema = new Schema<IInventoryLog>({
  productVariantId: { type: String, required: true },
  type: { type: String, enum: ['IMPORT', 'EXPORT', 'ADJUST'], required: true },
  quantity: { type: Number, required: true },
  note: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const InventoryLogModel = mongoose.model<IInventoryLog>('InventoryLog', InventoryLogSchema);
export default InventoryLogModel;
