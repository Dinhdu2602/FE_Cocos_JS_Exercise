import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  variantId: string;
  quantity: number;
  price: number;
  costPrice: number;
}

export interface IOrder extends Document {
  customerId?: string;
  items: IOrderItem[];
  totalAmount: number;
  discountAmount?: number;
  couponCode?: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'RETURNED';
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  variantId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  costPrice: { type: Number, required: true },
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  customerId: { type: String },
  items: { type: [OrderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  discountAmount: { type: Number },
  couponCode: { type: String },
  status: { type: String, enum: ['PENDING', 'PAID', 'CANCELLED', 'RETURNED'], required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;
