import { Book } from "../models/book.ts";

export function createSampleBooks(generateId: () => number): Book [] {
    const books: Book[] = [];
    books.push(new Book(generateId(), "Clean Code", "Robert C. Martin", "1980"));
    books.push(new Book(generateId(), "The Pragmatic Programmer", "Andrew Hunt", "1992"));
    books.push(new Book(generateId(), "Refactoring", "Martin Fowler", "1850"));
    books.push(new Book(generateId(), "Design Patterns", "Erich Gamma", "1880"));
    books.push(new Book(generateId(), "JavaScript: The Good Parts", "Douglas Crockford", "1922"));
    books.push(new Book(generateId(), "You Don't Know JS", "Kyle Simpson", "1944"));
    books.push(new Book(generateId(), "Eloquent JavaScript", "Marijn Haverbeke", "2000"));
    books.push(new Book(generateId(), "Cracking the Coding Interview", "Gayle Laakmann", "1970"));
    books.push(new Book(generateId(), "Introduction to Algorithms", "Thomas H. Cormen", "1977"));
    books.push(new Book(generateId(), "Node.js Design Patterns", "Mario Casciaro", "1998"));

    return books;
}