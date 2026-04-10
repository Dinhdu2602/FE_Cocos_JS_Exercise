import express from "express";
import{
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from "./product.controller";
import { authenticateJWT } from '../../common/middleware/auth.middleware';

const router = express.Router();
router.use(authenticateJWT);
router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;