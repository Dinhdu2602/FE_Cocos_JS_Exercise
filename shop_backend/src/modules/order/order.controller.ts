import type { Request, Response } from "express";
import { OrderService } from './order.service';

export const createOrder = (req: Request, res: Response) => {
    const order = OrderService.create(req.body);

    res.json(order);
};

export const getOrders = (req: Request, res: Response) => {
    const orders = OrderService.getAll();
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
