import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  categoryId: string;
  brand?: string;
  images: string[];
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: String, required: true },
  brand: { type: String },
  images: { type: [String], default: [] },
  createdAt: { type: Date, required: true, default: Date.now },
});

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;
