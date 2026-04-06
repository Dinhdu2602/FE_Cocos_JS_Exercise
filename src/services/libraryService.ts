import { Book } from "../models/book.ts";
import { User } from "../models/user.ts";
import { Library } from "../models/library.ts";
export function addBook(library: Library, book: Book): void {
     library.books.push(book);
}
export function showBook(library: Library): void {
    console.log("=== BOOK LIST ===");
    for (let i = 0; i<library.books.length; i++){
        let book = library.books[i];
    console.log(
        "ID: " + book?.id +
        " | Title: " + book?.title +
        " | Author: " + book?.author +
        " | Year: " + book?.year +
        " | Borrowed: " + book?.isBorrowed,
    );
 }
}
export function deleteBook(library: Library, bookId: number): string {
    for(let i = 0; i < library.books.length; i++) {
        if (library.books[i]?.id === bookId) {
            for(let j = i; j < library.books.length - 1; j++){
                const nextBook = library.books[j+1];
                if (nextBook) {
                library.books[j] = nextBook;
                }
            }
            library.books.length--;
            return "Delete book success.";
        }
    }
    return "Book not found. Please try again.";
}
export function editBook(library:Library, bookId: number, newTitle: string, newAuthor: string, newYear: string): string { 
    for(var i = 0; i < library.books.length; i++){
        let book = library.books[i];
        if (!book) continue;
        if (book.id === bookId){
            book.title = newTitle;
            book.author = newAuthor;
            book.year = newYear;
            return "Update Book success.";
        }
    }
    return "Book not found.";  
}
export function findBookById(library: Library, bookId: number): Book | null  {
    const book = library.books.find(b => b.id === bookId);
    return book ?? null;
}
export function borrowBook(
    library: Library, 
    bookId: number, 
    user: User, 
    callback: (error: string | null, message?: string) => void): void {
    let book = findBookById(library, bookId);
    if (book === null) {
        callback("Book not found. Please try again.");
        return;
    }
    if (book.isBorrowed === true) {
        callback("This book is already borrowed. Please choose another book.");
        return;
    }
    book.isBorrowed = true;
    user.borrowedBooks.push(book);
    callback(null, "This book is borrowed success.");
}
export function returnBook(library:Library, bookId: number, user: User): string {
    for (var i = 0; i < user.borrowedBooks.length; i++){
        const book = user.borrowedBooks[i];
        if (!book) continue;
        if (book.id === bookId) {
            book.isBorrowed = false;
            for (let j = i; j < user.borrowedBooks.length - 1; j++){
                const nextBook = user.borrowedBooks[j+1];
                if(nextBook)
                {
                    user.borrowedBooks[j] = nextBook;
                }
            }
            user.borrowedBooks.length--;
            return "Return book success.";
        }   
    }
    return "Book not found in user list.";
}