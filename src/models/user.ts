import { Book } from "./book.ts";
export class User {
    id: number;
    name: string;
    borrowedBooks: Book[];
    constructor(id: number, name:string) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }
}