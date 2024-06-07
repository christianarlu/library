const book1 = new Book("Game of thrones", "George R.R. Martin", 1945, "yes");
const book2 = new Book("Harry Potter", "JK Rowling", 1997, "no");
const book3 = new Book("The Universe", "Don Pablo", 820, "yes");
const book4 = new Book("Ibong Adarna", "Juan Carlos", 3714, "no");

const myLibrary = [book1, book2, book3, book4];
let counter = 0;

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
    
    myLibrary.push(book);
    counter++;
    displayBooks(myLibrary);
    

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

// DISPLAY FUNCTION
function displayBooks(myLibrary) {
    for (let i = counter; i < myLibrary.length; i++) {
        const newRow = document.createElement("tr");
        table.appendChild(newRow);
        for (let key in myLibrary[i]) {
            const newTd = document.createElement("td");
            newRow.appendChild(newTd)

            const newText = document.createTextNode(myLibrary[i][key]);
            newTd.appendChild(newText);

        }
        // CREATE DELETE BUTTON
        const delCell = document.createElement("td");
        const delButton = document.createElement("button");
        const delText = document.createTextNode("Delete");
        newRow.appendChild(delCell);
        delCell.appendChild(delButton);
        delButton.appendChild(delText);

        // UPDATE GLOBAL COUNTER 
        counter = i;
    } 
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

