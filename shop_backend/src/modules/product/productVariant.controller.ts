import { Request, Response} from "express";
import { ProductVariantService } from "./productVariant.service";

export const createVariant = (req: Request, res: Response) => {
    const { productId } = req.params;

    const variant = ProductVariantService.create({
        productId,
        ...req.body,
    });

    res.json(variant);
};

export const getVariantsByProduct = (req: Request, res: Response) => {
    const { productId } = req.params;

    const variants = ProductVariantService.getByProductId(productId as string);
    
    res.json(variants);
};

export const updateVariant = (req: Request, res: Response) => {
    const { id } = req.params;

    const updated = ProductVariantService.update(id as string, req.body);

    if(!updated) {
        res.status(404).json({
            message: "Variant not found.",
        });
    }
    res.json(updated);
};

export const deleteVariant = (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = ProductVariantService.delete(id as string);

    if(!deleted) {
        res.status(404).json({
            message: "Variant not found.",
        });
    }
    
    res.json ({
        message: "Delete successfully.",
    });
};
