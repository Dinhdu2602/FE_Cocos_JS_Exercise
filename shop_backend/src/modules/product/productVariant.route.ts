import express from "express";
import {
    createVariant,
    getVariantsByProduct,
    updateVariant,
    deleteVariant,
    getInventorySummary,

} from "./productVariant.controller"

const router = express.Router();

router.post("/products/:productId/variants", createVariant);

router.get("/products/:productId/variants", getVariantsByProduct);

router.put("/variants/:id", updateVariant);

router.delete("/variants/:id", deleteVariant);

router.get("/variants/inventory-summary", getInventorySummary);
export default router;