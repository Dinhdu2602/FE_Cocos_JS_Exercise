import type { Order } from "./order.model";
import { ProductVariantService } from "../product/productVariant.service";

const orders: Order[] = [];

export const OrderService = {
    create(data: Omit<Order, "id" | "createdAt" | "status" | "totalAmount">): Order {
        data.items.forEach((item) => {
            const enoughStock = ProductVariantService.checkStock(
                item.variantId,
                item.quantity
            );
            if (!enoughStock) {
                throw new Error("Insufficient stock");
            }
        });
        
        data.items.forEach((item) => {
            ProductVariantService.deductStock(
                item.variantId, 
                item.quantity
            );
        });
        
        const totalAmount = data.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0 
        );

        const newOrder: Order = {
            id: crypto.randomUUID().toString(),
            createdAt: new Date(),
            status: "PENDING",
            totalAmount,
            ...data,
        };
        orders.push(newOrder);
        return newOrder;
    },

    getAll(): Order[] {
        return orders;
    },

    updateStatus(id: string, status: Order["status"]): Order | null {
        const order = orders.find((o) => o.id === id);

        if(!order) return null;

        order.status = status;

        return order;
    },
};
