const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const book1 = new Book("Game of thrones", "George R.R. Martin", 1945, false);
const book2 = new Book("Harry Potter", "JK Rowling", 1997, true);
const book3 = new Book("Noli Me Tangere", "Jose P. Rizal", 1878, false);

const modal = document.querySelector("[data-modal]");
const newBookButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");


newBookButton.addEventListener("click", () => {
    modal.showModal();
});

closeButton.addEventListener("click", () => {
    modal.close();
});