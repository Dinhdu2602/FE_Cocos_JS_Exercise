import express from "express";
import {
    createCategory,
    getCategories,
    deleteCategory,
} from "./category.controller";
import { authenticateJWT } from '../../common/middleware/auth.middleware';

const router = express.Router();
router.use(authenticateJWT);
router.post("/", createCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);
export default router;