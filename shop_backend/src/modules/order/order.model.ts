export interface OrderItem {
    variantId: string,
    quantity: number,
    price: number,
}

export interface Order {
    id: string,
    customerId?: string,
    items: OrderItem[],
    totalAmount: number,
    status: "PENDING" | "PAID" | "CANCELLED",
    createdAt: Date,
}