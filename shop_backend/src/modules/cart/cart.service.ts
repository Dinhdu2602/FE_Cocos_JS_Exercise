import CartModel, { type ICart, CartItemModel, type ICartItem } from './cart.schema';

export const getCart = async (userId: string): Promise<ICart | null> => {
  return CartModel.findOne({ userId });
};

export const getCartById = async (id: string): Promise<ICart | null> => {
  return CartModel.findById(id);
};

export const createCart = async (cart: Partial<ICart>): Promise<ICart> => {
  const created = new CartModel(cart);
  return created.save();
};

export const updateCart = async (id: string, update: Partial<ICart>): Promise<ICart | null> => {
  return CartModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteCart = async (id: string): Promise<boolean> => {
  const res = await CartModel.findByIdAndDelete(id);
  return !!res;
};

// CartItem CRUD
export const getCartItems = async (cartId: string): Promise<ICartItem[]> => {
  return CartItemModel.find({ cartId });
};

export const addCartItem = async (item: Partial<ICartItem>): Promise<ICartItem> => {
  const created = new CartItemModel(item);
  return created.save();
};

export const updateCartItem = async (id: string, update: Partial<ICartItem>): Promise<ICartItem | null> => {
  return CartItemModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteCartItem = async (id: string): Promise<boolean> => {
  const res = await CartItemModel.findByIdAndDelete(id);
  return !!res;
};
