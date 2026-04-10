// Import controller
import { Request, Response } from 'express';
import * as importService from './import.service';

export const getAllImportReceipts = async (req: Request, res: Response) => {
  const receipts = await importService.getAllImportReceipts();
  res.json(receipts);
};

export const getImportReceiptById = async (req: Request, res: Response) => {
  const receipt = await importService.getImportReceiptById(req.params.id);
  if (!receipt) return res.status(404).json({ message: 'Not found' });
  res.json(receipt);
};

export const createImportReceipt = async (req: Request, res: Response) => {
  const receipt = await importService.createImportReceipt(req.body);
  res.status(201).json(receipt);
};

export const updateImportReceipt = async (req: Request, res: Response) => {
  const receipt = await importService.updateImportReceipt(req.params.id, req.body);
  if (!receipt) return res.status(404).json({ message: 'Not found' });
  res.json(receipt);
};

export const deleteImportReceipt = async (req: Request, res: Response) => {
  const ok = await importService.deleteImportReceipt(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
};

// ImportItem handlers
export const getImportItems = async (req: Request, res: Response) => {
  const items = await importService.getImportItems(req.params.receiptId);
  res.json(items);
};

export const addImportItem = async (req: Request, res: Response) => {
  const item = await importService.addImportItem(req.body);
  res.status(201).json(item);
};

export const updateImportItem = async (req: Request, res: Response) => {
  const item = await importService.updateImportItem(req.params.id, req.body);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const deleteImportItem = async (req: Request, res: Response) => {
  const ok = await importService.deleteImportItem(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
};
