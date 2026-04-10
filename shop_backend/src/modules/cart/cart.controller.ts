// Cart controller
import type { Request, Response } from 'express';
import * as cartService from './cart.service';

export const getCart = async (req: Request, res: Response) => {
  const cart = await cartService.getCart(req.query.userId as string);
  if (!cart) return res.status(404).json({ message: 'Not found' });
  res.json(cart);
};

export const getCartById = async (req: Request, res: Response) => {
  const cart = await cartService.getCartById(req.params.id as string);
  if (!cart) return res.status(404).json({ message: 'Not found' });
  res.json(cart);
};

export const createCart = async (req: Request, res: Response) => {
  const cart = await cartService.createCart(req.body);
  res.status(201).json(cart);
};

export const updateCart = async (req: Request, res: Response) => {
  const cart = await cartService.updateCart(req.params.id as string, req.body);
  if (!cart) return res.status(404).json({ message: 'Not found' });
  res.json(cart);
};

export const deleteCart = async (req: Request, res: Response) => {
  const ok = await cartService.deleteCart(req.params.id as string);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
};

// CartItem handlers
export const getCartItems = async (req: Request, res: Response) => {
  const items = await cartService.getCartItems(req.params.cartId as string);
  res.json(items);
};

export const addCartItem = async (req: Request, res: Response) => {
  const item = await cartService.addCartItem(req.body);
  res.status(201).json(item);
};

export const updateCartItem = async (req: Request, res: Response) => {
  const item = await cartService.updateCartItem(req.params.id as string, req.body);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const ok = await cartService.deleteCartItem(req.params.id as string);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
};
