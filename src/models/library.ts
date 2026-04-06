import { Book } from "./book.ts";
import { User } from "./user.ts";
export class Library {
    books: Book[];
    users: User[];
    constructor() {
        this.books = [];
        this.users = [];
    }
}