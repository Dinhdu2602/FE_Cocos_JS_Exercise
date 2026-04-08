import { Product } from "./product.model";

const products: Product[] = [];

export const ProductService = {
    create(data: Omit<Product, "id" | "createdAt">): Product {
        const newProduct: Product = {
            id: crypto.randomUUID().toString(),
            createdAt: new Date(),
            ...data,
        };
        products.push(newProduct);

        return newProduct;
    },

    getAll(): Product[] {
        return products;
    },

    update(id: string, data: Partial<Product>): Product | null {
        const product = products.find((p) => p.id === id);

        if(!product) return null;
        Object.assign(product, data);

        return product
    },

    delete(id: string): boolean {
        const index = products.findIndex((p) => p.id === id);

        if(index === -1) return false;

        products.splice(index, 1);
        
        return true;
    },
};