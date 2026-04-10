import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  userId: string;
}

const CartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
});

const CartModel = mongoose.model<ICart>('Cart', CartSchema);
export default CartModel;

export interface ICartItem extends Document {
  cartId: string;
  productVariantId: string;
  quantity: number;
}

const CartItemSchema = new Schema<ICartItem>({
  cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  productVariantId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const CartItemModel = mongoose.model<ICartItem>('CartItem', CartItemSchema);
export { CartItemModel };
