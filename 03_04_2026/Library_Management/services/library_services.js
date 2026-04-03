function addBook(library, book) {
    library.books.push(book);
}
function showBook(library) {
    console.log("=== BOOK LIST ===")
    for(var i = 0;i<library.books.length; i++) {
        var book = library.books[i];
        console.log(
            "ID: " + book.id +
            " | Title: " + book.title +
            " | Author: " + book.author +
            " | Borrowed: " + book.isBorrowed
        );
    }
}
function deleteBook(library, bookId) {
    for (var i = 0; i < library.books.length; i++)
        if(library.books[i].id === bookId) {
            for(var j = i; j < library.books.length - 1; j++)
                library.books[j] = library.books[j+1];
        library.books.length = library.books.length -1;
        return "Delete book success.";
    }
    return "Book not found.";
}
function editBook(library, bookId, newTitle, newAuthor) {
    for(var i = 0; i < library.books.length; i++)
        if (library.books[i].id === bookId){
            library.books[i].title = newTitle;
            library.books[i].author = newAuthor;
            return "Update Book success.";
        }
    return "Book not found.";    
}
function findBookById(library, bookId) {
    for(var i = 0; i < library.books.length; i++)
        if (library.books[i].id === bookId)
            return library.books[i];
    return null;
}
function borrowBook(library, bookId, user, callback) {
    var book = findBookById(library, bookId);
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
function returnBook(library, bookId, user) {
    for (var i = 0; i < user.borrowedBooks.length; i++){
        if (user.borrowedBooks[i].id === bookId) {
            user.borrowedBooks[i].isBorrowed = false;
            for (var j = i; j < user.borrowedBooks.length - 1; j++)
                user.borrowedBooks[j] = user.borrowedBooks[j+1];
        }
        user.borrowedBooks.length = user.borrowedBooks.length -1;
        return "Return book success.";
    }
    return "Book not found in user list.";
}
module.exports = {
    addBook: addBook,
    showBook: showBook,
    deleteBook: deleteBook,
    editBook: editBook,
    findBookById: findBookById,
    borrowBook: borrowBook,
    returnBook: returnBook,
};