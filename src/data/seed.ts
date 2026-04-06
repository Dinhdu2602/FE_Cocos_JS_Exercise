import { Library }  from "../models/library.ts";
import { createSampleBooks } from "./books.ts";
import { createSampleUsers } from "./users.ts";
export function seedData (
    library: Library,
    generateBookId: () => number,
    generateUserId: () => number,
): void {
    const books = createSampleBooks(generateBookId);
    const users = createSampleUsers(generateUserId);
    for(let i = 0; i < books.length; i++){
        library.books.push(books[i]!);
    }
    for(let i = 0; i < users.length; i++){
        library.users.push(users[i]!);
    }
}