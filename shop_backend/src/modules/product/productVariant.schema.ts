import mongoose, { Schema, Document } from 'mongoose';

export interface IProductVariant extends Document {
  productId: string;
  size: string;
  color: string;
  price: number;
  costPrice: number;
  stock: number;
  sku: string;
}

const ProductVariantSchema = new Schema<IProductVariant>({
  productId: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  sku: { type: String, required: true },
});

const ProductVariantModel = mongoose.model<IProductVariant>('ProductVariant', ProductVariantSchema);
export default ProductVariantModel;
