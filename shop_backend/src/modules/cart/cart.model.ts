// Cart model
export interface Cart {
  id: string;
  userId: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productVariantId: string;
  quantity: number;
}
