import { CustomerService } from "./customer.service";
import type { Request, Response } from "express";
export const createCustomer = (
    req: Request,
    res: Response
) => {
    const customer =
        CustomerService.create(req.body);

    res.json(customer);
};

export const getCustomers = (
    req: Request,
    res: Response
) => {
    res.json(
        CustomerService.getAll()
    );
};