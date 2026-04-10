// User routes
import { Router } from 'express';
import * as userController from './user.controller';
import { authenticateJWT } from '../../common/middleware/auth.middleware';

const router = Router();
router.use(authenticateJWT);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
