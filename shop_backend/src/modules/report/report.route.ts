// Report routes
import { Router } from 'express';
import * as reportController from './report.controller';

const router = Router();
router.get('/revenue', reportController.getRevenueReport);
router.get('/profit', reportController.getProfitReport);
router.get('/orders', reportController.getOrderCountReport);
router.get('/stock', reportController.getStockReport);

export default router;
