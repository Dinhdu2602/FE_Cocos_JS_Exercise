import express from "express";
import {
    createOrder,
    getOrders,
    updateOrderStatus,
} from "./order.controller";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.put("/:id/status", updateOrderStatus);

export default router;