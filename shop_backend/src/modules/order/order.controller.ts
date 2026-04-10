import type { Request, Response } from "express";
import { OrderService } from './order.service';

export const createOrder = (req: Request, res: Response) => {
    const order = OrderService.create(req.body);

    res.json(order);
};

export const getOrders = (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const status = req.query.status as string;
    const order = req.query.order as "asc" | "desc";
    const customerId = req.query.customerId as string;
    const sortBy = req.query.sortBy as string;
    const orders = OrderService.getAll({
        page,
        limit,
        status,
        customerId,
        sortBy,
        order
    });

    res.json(orders);
}

export const updateOrderStatus = (req: Request, res: Response) => {
    const { id } = req.params;

    const { status } = req.body;
    const updated = OrderService.updateStatus(id as string, status);

    if(!updated) {
        res.status(404).json({
            message: "Order not found.",
        });
    }
    res.json(updated);
};

export const cancelOrder = (req: Request, res: Response) => {
    const { id } = req.params;

    const cancelled = OrderService.cancel(id as string);

    if (!cancelled) {
        return res.status(404).json({
            message: "Order not found.",
        });
    }
    res.json(cancelled);
}

export const getRevenueAnalytics = (req: Request, res: Response) => {
    const analytics = OrderService.getRevenueAnalytics();

    res.json(analytics);
}

export const getTopSellingVariants = (req: Request, res: Response) => {
    const result = OrderService.getTopSellingVariants();

    res.json(result);
}

export const getProfitAnalytics = (req: Request, res: Response) => {
    const result = OrderService.getProfitAnalytics();

    res.json(result);
}

export const returnOrder = (req: Request, res: Response) => {
    const { id } = req.params;

    const returned =
        OrderService.returnOrder(id as string);

    if (!returned) {
        return res.status(404).json({
            message: "Order not found",
        });
    }

    res.json(returned);
};