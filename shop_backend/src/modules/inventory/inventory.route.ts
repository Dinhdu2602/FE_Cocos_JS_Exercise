// Inventory routes
import { Router } from 'express';
import * as inventoryController from './inventory.controller';

const router = Router();
router.get('/', inventoryController.getInventoryLogs);
router.get('/:id', inventoryController.getInventoryLogById);
router.post('/', inventoryController.createInventoryLog);
router.put('/:id', inventoryController.updateInventoryLog);
router.delete('/:id', inventoryController.deleteInventoryLog);

export default router;
