import CategoryModel, { type ICategory } from './category.schema';

export const CategoryService = {
    async create(data: Partial<ICategory>): Promise<ICategory> {
        const created = new CategoryModel(data);
        return created.save();
    },

    async getAll(): Promise<ICategory[]> {
        return CategoryModel.find();
    },

    async delete(id: string): Promise<boolean> {
        const res = await CategoryModel.findByIdAndDelete(id);
        return !!res;
    },
};