// Import routes
import { Router } from 'express';
import * as importController from './import.controller';

const router = Router();
// ImportReceipt
router.get('/', importController.getAllImportReceipts);
router.get('/:id', importController.getImportReceiptById);
router.post('/', importController.createImportReceipt);
router.put('/:id', importController.updateImportReceipt);
router.delete('/:id', importController.deleteImportReceipt);
// ImportItem
router.get('/:receiptId/items', importController.getImportItems);
router.post('/:receiptId/items', importController.addImportItem);
router.put('/items/:id', importController.updateImportItem);
router.delete('/items/:id', importController.deleteImportItem);

export default router;
