// Transaction routes
import { Router } from 'express';
import * as transactionController from './transaction.controller';

const router = Router();
router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);
router.post('/', transactionController.createTransaction);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;
