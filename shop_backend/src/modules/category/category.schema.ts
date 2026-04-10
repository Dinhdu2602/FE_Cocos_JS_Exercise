import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
export default CategoryModel;
