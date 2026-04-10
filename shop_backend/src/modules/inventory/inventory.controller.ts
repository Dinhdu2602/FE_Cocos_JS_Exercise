// Inventory controller
import type { Request, Response } from 'express';
import * as inventoryService from './inventory.service';

export const getInventoryLogs = async (req: Request, res: Response) => {
  const logs = await inventoryService.getInventoryLogs();
  res.json(logs);
};

export const getInventoryLogById = async (req: Request, res: Response) => {
  const log = await inventoryService.getInventoryLogById(req.params.id as string);
  if (!log) return res.status(404).json({ message: 'Not found' });
  res.json(log);
};

export const createInventoryLog = async (req: Request, res: Response) => {
  const log = await inventoryService.createInventoryLog(req.body);
  res.status(201).json(log);
};

export const updateInventoryLog = async (req: Request, res: Response) => {
  const log = await inventoryService.updateInventoryLog(req.params.id as string, req.body);
  if (!log) return res.status(404).json({ message: 'Not found' });
  res.json(log);
};

export const deleteInventoryLog = async (req: Request, res: Response) => {
  const ok = await inventoryService.deleteInventoryLog(req.params.id as string);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
};
