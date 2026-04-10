import mongoose, { Schema, Document } from 'mongoose';

export interface OrderItem {
    variantId: string;
    quantity: number;
    price: number;
    costPrice: number;
}

export interface Order extends Document {
    customerId?: string;
    items: OrderItem[];
    totalAmount: number;
    discountAmount?: number;
    couponCode?: string;
    status: 'PENDING' | 'PAID' | 'CANCELLED' | 'RETURNED';
    createdAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>({
    variantId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
});

const OrderSchema = new Schema<Order>({
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number },
    couponCode: { type: String },
    status: { type: String, enum: ['PENDING', 'PAID', 'CANCELLED', 'RETURNED'], default: 'PENDING' },
    createdAt: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model<Order>('Order', OrderSchema);