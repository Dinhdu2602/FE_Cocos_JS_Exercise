// Report controller
import type { Request, Response } from 'express';
import * as reportService from './report.service';

export const getRevenueReport = async (req: Request, res: Response) => {
  const data = await reportService.getRevenueReport();
  res.json(data);
};

export const getProfitReport = async (req: Request, res: Response) => {
  const data = await reportService.getProfitReport();
  res.json(data);
};

export const getOrderCountReport = async (req: Request, res: Response) => {
  const data = await reportService.getOrderCountReport();
  res.json(data);
};

export const getStockReport = async (req: Request, res: Response) => {
  const data = await reportService.getStockReport();
  res.json(data);
};
