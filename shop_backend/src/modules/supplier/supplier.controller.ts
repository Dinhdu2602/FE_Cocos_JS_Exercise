import type { Request, Response } from 'express';
import * as supplierService from "./supplier.service";

export const getAllSuppliers = async (req: Request, res: Response) => {
  const suppliers = await supplierService.getAllSuppliers();
  res.json(suppliers);
};

export const getSupplierById = async (req: Request, res: Response) => {
  const supplier = await supplierService.getSupplierById(req.params.id as string);
  if (!supplier) return res.status(404).json({ message: 'Not found' });
  res.json(supplier);
};

export const createSupplier = async (req: Request, res: Response) => {
  const supplier = await supplierService.createSupplier(req.body);
  res.status(201).json(supplier);
};

export const updateSupplier = async (req: Request, res: Response) => {
  const supplier = await supplierService.updateSupplier(req.params.id as string, req.body);
  if (!supplier) return res.status(404).json({ message: 'Not found' });
  res.json(supplier);
};

export const deleteSupplier = async (req: Request, res: Response) => {
  const ok = await supplierService.deleteSupplier(req.params.id as string);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
};
