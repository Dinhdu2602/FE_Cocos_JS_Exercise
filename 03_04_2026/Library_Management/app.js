var Book = require("./models/book");
var User = require("./models/user");
var libraryService = require("./services/library_services");
var createIdGenerator = require("./utils/idGenerator.js");
var showMenu = require("./ui/menu");
var Library = require("./models/library");
//console.log("TYPE:", typeof createIdGenerator);
//console.log("VALUE:", Library);
var library = new Library();
var generateBookId = createIdGenerator();
var generateUserId = createIdGenerator();
var book1 = new Book(generateBookId(), "Java Script Basic", "Do Ha Linh");
var book2 = new Book(generateBookId(), "NodeJS Begin to Pro", "Tran Nhat Tuan");

libraryService.addBook(library, book1);
libraryService.addBook(library, book2);
var user1 = new User(generateUserId(), "Kate");
var readline = require("readline");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function startApp() {
    showMenu();
    rl.question("Please choose your option: ", function(choice) {
        handleMenu(choice);
    });
}
function addBookFlow() {
    rl.question("Please enter title: ", function(title) {
        rl.question("Please enter author: ", function(author){
        var id = generateBookId();
        var book = new Book(id, title, author);
        libraryService.addBook(library, book);
        console.log("Add new book success.");
        startApp();
        });
    });
}
function deleteBookFlow() {
    rl.question("Please enter Book ID: ", function(idInput){
        var id = parseInt(idInput);
        var result = libraryService.deleteBook(library, id);
        console.log(result);
        startApp();
    })
}
function borrowBookFlow() {
    rl.question("Please enter Book ID: ", function(idInput){
        var id = parseInt(idInput);
        libraryService.borrowBook(library, id, user1, function(err, msg){
            console.log(err || msg);
            startApp();
        });
    });
}
function returnBookFlow() {
    rl.question("Please enter Book ID: ", function(idInput){
        var id = parseInt(idInput);
        var result = libraryService.returnBook(library, id, user1)
        console.log(result);
        startApp();
    });
}
function handleMenu(choice) {
    switch(choice) {
        case "1":
            addBookFlow();
            break;
        case "2":
            deleteBookFlow();
            break;
        case "4":
            libraryService.showBook(library);
            startApp();
            break;
        case "5":
            borrowBookFlow();
            break;
        case "6":
            returnBookFlow();
            break;
        case "0":
            console.log("Exit...");
            rl.close();
            break;
        default:
            console.log("Invalid choice! Please try again.");
            startApp();
            break;
    }   
}
startApp();
