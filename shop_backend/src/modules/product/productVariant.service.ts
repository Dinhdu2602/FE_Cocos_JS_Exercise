import { ProductVariant } from "./productVariant.model";

const variants: ProductVariant[] = [];

export const ProductVariantService = {
    create(data: Omit<ProductVariant, "id">): ProductVariant {
        const newVariant: ProductVariant = {
            id: crypto.randomUUID().toString(),
            ...data,
        };
        variants.push(newVariant);

        return newVariant;
    },

    getByProductId(productId: string): ProductVariant[] {
        return variants.filter((v) => v.productId === productId);
    },

    update(id: string, data: Partial<ProductVariant>): ProductVariant | null {
        const variant = variants.find((v) => v.id === id);
        
        if(!variant) return null;

        Object.assign(variant, data);
        return variant;
    },

    delete(id: string): boolean {
        const index = variants.findIndex((v) => v.id === id);

        if(index === -1) return false;

        variants.splice(index, 1);
        return true;
    },
};