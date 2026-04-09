import type { Request, Response } from "express";
import { CategoryService } from "./category.service";

export const createCategory = (req: Request, res: Response) => {
    const { name, description} = req.body;
    
    const category = CategoryService.create({
        name, 
        description,
    });

    res.json(category);
};

export const getCategories = (req: Request, res: Response) => {
    const categories = CategoryService.getAll();

    res.json(categories);
};

export const deleteCategory = (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = CategoryService.delete(id as string);

    if (!deleted) {
        return res.status(404).json({
            message: "Category not found.",
        });
    }
    
    res.json({
        message: "Delete successfully.",
    });
};