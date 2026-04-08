import express from "express";
import {
    createCategory,
    getCategories,
    deleteCategory,
} from "./category.controller";

const router = express.Router();

router.post("/", createCategory);

router.get("/", getCategories);

router.delete("/:id", deleteCategory);

export default router;