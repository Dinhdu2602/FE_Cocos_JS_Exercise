import { Book } from "./models/book.ts";
import { User } from "./models/user.ts";
import { Library} from "./models/library.ts";
import * as libraryService from "./services/libraryService.ts";
import { createIdGenerator }  from "./utils/idGenerator.ts";
import showMenu  from "./ui/menu.ts";
import { seedData } from "./data/seed.ts";
//import { MenuOption } from "./types/menuOption.ts";
import * as readline from "readline";
import { deleteBook } from "./services/libraryService.ts";
//import { deleteBook, editBook, findBookById, borrowBook, returnBook } from './services/libraryService';
const library: Library = new Library();

const generateBookId = createIdGenerator();
const generateUserId = createIdGenerator();
seedData(library, generateBookId, generateUserId);
const user1: User = library.users[0]!;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function startApp(): void {
    showMenu();
    rl.question("Please choose your option: ", function (choice:string) {
        handleMenu(choice);
    });
}
function addBookFlow(): void {
    rl.question("Please enter title: ", function(title: string){
      rl.question("Please enter author: ", function(author: string){
        rl.question("Please enter publication year: ", function(year: string){
            const id: number = generateBookId();
            const book: Book = new Book(id, title, author, year);
            libraryService.addBook(library, book);
            console.log("Add new book success.");
            startApp();
        });
      }); 
    });
}
function deleteBookFlow(): void {
    rl.question("Please enter book ID: ", function(idInput: string){
        const id: number = parseInt(idInput);
        const result: string = deleteBook(library, id);
        console.log(result);
        startApp;
    })
}
function editBookFlow(): void {
    rl.question("Please enter book ID: ", function(idInput: string){
        const id: number = parseInt(idInput);
        rl.question("Please enter new title: ", function(newTitle: string){
            rl.question("Please enter new author: ", function(newAuthor: string){
                rl.question("Please enter new publication year: ", function(newYear: string){
                    const result: string = libraryService.editBook(
                        library,
                        id,
                        newTitle,
                        newAuthor,
                        newYear
                    );
                    console.log(result);
                    startApp();
                });
            });
        });
    });
}
function findBookByIdFlow(): void {
    rl.question("Please enter book ID: ", function(idInput: string){
        const id: number = parseInt(idInput);
        const book: Book | null = libraryService.findBookById(library, id);
        if (book === null){
            console.log("Book not found. Please try again.");
        } else {
            console.log("=== BOOK INFO ===");
            console.log(
                "ID: " + book.id +
                " | Title: " + book.title +
                " | Author: " + book.author +
                " | Publication Year: " + book.year +
                " | Borrowed: " + book.isBorrowed
            );
        }
        startApp();
    });
}
function borrowBookFlow(): void {
    rl.question("Please enter book ID: ", function(idInput: string){
        const id: number = parseInt(idInput);
        libraryService.borrowBook(
            library,
            id,
            user1,
            function( err: string | null, msg?: string): void{
                console.log(err || msg);
                startApp();
            }
        );
    });
}
function returnBookFlow(): void {
    rl.question("Please enter book ID: ", function(idInput: string){
        const id: number = parseInt(idInput);
        const result: string = libraryService.returnBook(library, id, user1);
        console.log(result);
        startApp();
    });
}

function handleMenu(choice: string): void {
    const option: number = parseInt(choice);
    switch (option) {
        case 1:
            addBookFlow();
            break;
        case 2:
            deleteBookFlow();
            break;
        case 3:
            editBookFlow();
            break;
        case 4:
            libraryService.showBook(library);
            startApp();
            break;
        case 5:
            borrowBookFlow();
            break;
        case 6:
            returnBookFlow();
            break;
        case 7:
            findBookByIdFlow();
            break;
        case 0:
            console.log("Exit ...");
            rl.close();
            break;
        default: 
            console.log("Invalid choice! Please try again.");
            startApp();
            break;
    }
}

startApp();