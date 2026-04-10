import ProductVariantModel, { type IProductVariant } from './productVariant.schema';

export const ProductVariantService = {
    async create(data: Partial<IProductVariant>): Promise<IProductVariant> {
        const created = new ProductVariantModel(data);
        return created.save();
    },

    async getByProductId(productId: string): Promise<IProductVariant[]> {
        return ProductVariantModel.find({ productId });
    },

    async update(id: string, data: Partial<IProductVariant>): Promise<IProductVariant | null> {
        return ProductVariantModel.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id: string): Promise<boolean> {
        const res = await ProductVariantModel.findByIdAndDelete(id);
        return !!res;
    },

    async deductStock(id: string, quantity: number): Promise<IProductVariant | null> {
        const variant = await ProductVariantModel.findById(id);
        if (!variant) return null;
        if (variant.stock < quantity) {
            throw new Error('Insufficient stock');
        }
        variant.stock -= quantity;
        await variant.save();
        return variant;
    },

    async checkStock(id: string, quantity: number): Promise<boolean> {
        const variant = await ProductVariantModel.findById(id);
        if (!variant) {
            throw new Error('Variant not found.');
        }
        return variant.stock >= quantity;
    },
    // ...existing code...
    async restock(id: string, quantity: number): Promise<IProductVariant | null> {
        const variant = await ProductVariantModel.findById(id);
        if (!variant) return null;
        variant.stock += quantity;
        await variant.save();
        return variant;
    },

    async getInventorySummary() {
        const totalVariants = await ProductVariantModel.countDocuments();
        const variants = await ProductVariantModel.find();
        const totalStock = variants.reduce((sum, variant) => sum + variant.stock, 0);
        const lowStockCount = variants.filter(variant => variant.stock <= 5).length;
        return {
            totalVariants,
            totalStock,
            lowStockCount,
        };
    },
};