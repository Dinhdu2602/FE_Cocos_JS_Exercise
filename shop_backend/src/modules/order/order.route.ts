import express from "express";
import {
    cancelOrder,
    createOrder,
    getOrders,
    getProfitAnalytics,
    getRevenueAnalytics,
    getTopSellingVariants,
    returnOrder,
    updateOrderStatus,
} from "./order.controller";
import { authenticateJWT } from '../../common/middleware/auth.middleware';

const router = express.Router();
router.use(authenticateJWT);
router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id/status", updateOrderStatus);
router.put("/:id/cancel", cancelOrder);
router.get("/analytics/revenue", getRevenueAnalytics);
router.get("/analytics/top-selling", getTopSellingVariants);
router.get("/analytics/profit", getProfitAnalytics);
router.put("/:id/return", returnOrder);
export default router;