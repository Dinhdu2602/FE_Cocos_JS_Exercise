import ProductModel, { type IProduct } from './product.schema';

export const ProductService = {
    async create(data: Partial<IProduct>): Promise<IProduct> {
        const created = new ProductModel(data);
        return created.save();
    },

    async getAll(): Promise<IProduct[]> {
        return ProductModel.find();
    },

    async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
        return ProductModel.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id: string): Promise<boolean> {
        const res = await ProductModel.findByIdAndDelete(id);
        return !!res;
    },
};