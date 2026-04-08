import type { Category } from "./category.model";
const categories: Category[] = [];
export const CategoryService = {
    create(data: Omit<Category, "id">): Category {
        const newCategory: Category = {
            id: Date.now().toString(),
            ...data,
        };
        categories.push(newCategory);

        return newCategory;
    },
    
    getAll(): Category[] {
        return categories;
    } ,
    
    delete(id: string): boolean {
        const index = categories.findIndex((c) => c.id === id);

        if (index === -1) return false;
        categories.splice(index, 1);
        return true;
    },
};