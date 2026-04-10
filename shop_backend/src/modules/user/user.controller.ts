// User controller
import type { Request, Response } from 'express';
import * as userService from './user.service';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id as string);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id as string, req.body);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const ok = await userService.deleteUser(req.params.id as string);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
};
