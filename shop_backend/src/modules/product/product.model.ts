import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
    name: string;
    description: string;
    categoryId: string;
    brand?: string;
    images: string[];
    createdAt: Date;
}

const ProductSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: String },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
