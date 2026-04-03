function Book(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isBorrowed = false;
}
module.exports= Book;