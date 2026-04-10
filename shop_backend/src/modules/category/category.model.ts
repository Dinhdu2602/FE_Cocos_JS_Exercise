import mongoose, { Schema, Document } from 'mongoose';

export interface Category extends Document {
    name: string;
    description: string;
}

const CategorySchema = new Schema<Category>({
    name: { type: String, required: true },
    description: { type: String },
});

export const CategoryModel = mongoose.model<Category>('Category', CategorySchema);
