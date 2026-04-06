#LibraryMS
## Library Management System
## Library Requirement Requirement
Build a simple system to manage books in library. UI appear in console.
The system should allow users to:
 + Store and manage a collection of books
 + Perform basic operations such as adding, searching, updating, and deleting books
 + Track the availability status of each book

## Objective:
 + Practice basic programming concepts (function, array/objects)
 + Practice code using TypeScript
 + Understand CRUD operations (Create, Read, Update, Delete)
 + Improve logical thinking and problem-solving skills
 + Learn how to structure a small application
## Actors:
 + User:
   * Interacts with the system
   * Performs operations on books (add, search, update, delete)
## Objects:
 + Book: Represents a book in library with the following properties
     * id: number (Unique Identifier)
     * title: string (Book Title)
     * author: string (Author name)
     * year: string (Publication year)
     * isBorrowed: boolean (Availability)
 + User: Represents user will interact with the system
     * id: number (Unique Identifier)
     * name: string (User name)
     * borrowedBooks: array (List books that user borrowed)
 + Library: 
     * books: array (List books in library)
     * users: array (List users in library)
## Features:
 + Add book: Add a new book to the system
 + Delete book: Remove a book in the system
 + Edit book: Modify book details
 + Show book: Show list book detail in console window
 + Borrow Book
    * Mark a book as "Borrowed"
    * Only allow borrowing if the book is currently "Available"
 + Return Book
    * Mark a book as "Available"
    * Only allow returning if the book is currently "Borrowed"
