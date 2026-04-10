
import { Router } from 'express';
import { createCustomer, getCustomers } from './customer.controller';
import { authenticateJWT } from '../../common/middleware/auth.middleware';

const router = Router();
router.use(authenticateJWT);
router.post('/', createCustomer);
router.get('/', getCustomers);

export default router;
