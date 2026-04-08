import type { Request, Response} from "express";
import { ProductService } from "./product.service";
export const createProduct = (req: Request, res: Response) => {
    const { name, description, categoryId, brand, images } = req.body;

    const product = ProductService.create({
        name,
        description,
        categoryId,
        brand,
        images,
    });
    
    res.json(product);
};

export const getProducts = (req: Request, res: Response) => {
    const products = ProductService.getAll();

    res.json(products);
};

export const updateProduct = (req: Request, res: Response) => {
    const { id } = req.params;

    const updated = ProductService.update(id as string, req.body);

    if(!updated) {
        return res.status(404).json({
            message: "Product not found.",
        });
    }

    res.json(updated);
};

export const deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    
    const deleted = ProductService.delete(id as string);
    if(!deleted) {
        return res.status(404).json({
            message: "Product not found.",
        });
    }

    res.json({
        message: "Deleted successfully.",
    });
};