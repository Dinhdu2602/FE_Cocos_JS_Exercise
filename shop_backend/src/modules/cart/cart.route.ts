import { Router } from 'express';
import * as cartController from './cart.controller';
import { authenticateJWT } from '../../common/middleware/auth.middleware';

const router = Router();
router.use(authenticateJWT);
// Cart
router.get('/', cartController.getCart);
router.get('/:id', cartController.getCartById);
router.post('/', cartController.createCart);
router.put('/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteCart);
// CartItem
router.get('/:cartId/items', cartController.getCartItems);
router.post('/:cartId/items', cartController.addCartItem);
router.put('/items/:id', cartController.updateCartItem);
router.delete('/items/:id', cartController.deleteCartItem);
export default router;
