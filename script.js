const book1 = new Book("Game of thrones", "George R.R. Martin", 1945, false);
const book2 = new Book("Harry Potter", "JK Rowling", 1997, true);
const book3 = new Book("Noli Me Tangere", "Jose P. Rizal", 1878, false);

const myLibrary = [book1, book2];

const table = document.querySelector("table");
const submit = document.querySelector(".submit");

const modal = document.querySelector("[data-modal]");
const newBookButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");

// BOOK CONSTRUCTOR FUNCTION
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Book.prototype.info = function() {
//     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
// }



// SUBMIT FUNCTION
submit.addEventListener("click", (e) => {
    e.preventDefault();
    let inputText = document.querySelectorAll("input:not(input[type=radio], input[type=submit])");
    let inputRadio = document.querySelector("input[type=radio]:checked");
    
    let title = inputText[0].value;
    let author = inputText[1].value;
    let pages = inputText[2].value;
    let read = inputRadio.value;

    const book = new Book(title, author, pages, read);
    addBook(book)
    clearInputs();
    modal.close();
});

// CLEAR FUNCTION
function clearInputs() {
    let inputText = document.querySelectorAll("input:not(input[type=radio], input[type=submit])");
    let radios = document.querySelectorAll("input[type=radio]");

    inputText[0].value = "";
    inputText[1].value = "";
    inputText[2].value = "";
    for (let i = 0; i < radios.length; i++ ) {
        radios[i].checked = false;
    }
}

// ADD BOOK FUNCTION
function addBook(bookObj) {
    myLibrary.push(bookObj);
    const newRow = document.createElement("tr");
    table.appendChild(newRow);
    for (let key in bookObj) {
        const newTd = document.createElement("td");
        newRow.appendChild(newTd);
        const newText = document.createTextNode(bookObj[key]);
        newTd.appendChild(newText);
    }
}

// DISPLAY FUNCTION
function displayBooks(myLibrary) {
    myLibrary.forEach((book) => {
        const newRow = document.createElement("tr");
        table.appendChild(newRow);
        for (let key in book) {
            const newTd = document.createElement("td");
            newRow.appendChild(newTd)

            const newText = document.createTextNode(book[key]);
            newTd.appendChild(newText);
        }
    });          
}

displayBooks(myLibrary);

/* Dialog/Modal related stuff below */
newBookButton.addEventListener("click", () => {
    modal.showModal();
});

closeButton.addEventListener("click", () => {
    modal.close();
});

modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

