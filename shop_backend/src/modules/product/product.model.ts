export interface Product {
    id: string,
    name: string,
    description: string,
    categoryId: string,
    brand?: string,
    images: string [],
    createdAt: Date,
}
