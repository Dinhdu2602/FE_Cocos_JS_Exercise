import mongoose, { Schema, Document } from 'mongoose';

export interface IImportReceipt extends Document {
  supplierId: string;
  createdBy: string;
  createdAt: Date;
}

const ImportReceiptSchema = new Schema<IImportReceipt>({
  supplierId: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const ImportReceiptModel = mongoose.model<IImportReceipt>('ImportReceipt', ImportReceiptSchema);
export default ImportReceiptModel;

export interface IImportItem extends Document {
  receiptId: string;
  productVariantId: string;
  quantity: number;
  price: number;
}

const ImportItemSchema = new Schema<IImportItem>({
  receiptId: { type: Schema.Types.ObjectId, ref: 'ImportReceipt', required: true },
  productVariantId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const ImportItemModel = mongoose.model<IImportItem>('ImportItem', ImportItemSchema);
export { ImportItemModel };
