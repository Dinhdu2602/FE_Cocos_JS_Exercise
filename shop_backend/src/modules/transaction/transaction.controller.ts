// Transaction controller
import type { Request, Response } from 'express';
import * as transactionService from './transaction.service';

export const getAllTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionService.getAllTransactions();
  res.json(transactions);
};

export const getTransactionById = async (req: Request, res: Response) => {
  const transaction = await transactionService.getTransactionById(req.params.id as string);
  if (!transaction) return res.status(404).json({ message: 'Not found' });
  res.json(transaction);
};

export const createTransaction = async (req: Request, res: Response) => {
  const transaction = await transactionService.createTransaction(req.body);
  res.status(201).json(transaction);
};

export const updateTransaction = async (req: Request, res: Response) => {
  const transaction = await transactionService.updateTransaction(req.params.id as string, req.body);
  if (!transaction) return res.status(404).json({ message: 'Not found' });
  res.json(transaction);
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const ok = await transactionService.deleteTransaction(req.params.id as string);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
};
