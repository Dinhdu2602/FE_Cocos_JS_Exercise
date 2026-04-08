export interface ProductVariant {
    id: string,
    productId: string,

    size: string,
    color: string,

    price: number,
    costPrice: number,

    stock: number,
    sku: string,
}