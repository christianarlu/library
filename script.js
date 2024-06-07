const book1 = new Book("Game of thrones", "George R.R. Martin", 1945, "yes");
const book2 = new Book("Harry Potter", "JK Rowling", 1997, "no");
const book3 = new Book("The Universe", "Don Pablo", 820, "yes");
const book4 = new Book("Ibong Adarna", "Juan Carlos", 3714, "no");

const myLibrary = [book1, book2, book3, book4];
let counter = 0;

const table = document.querySelector("table > tbody");
const submit = document.querySelector(".submit");

const modal = document.querySelector("[data-modal]");
const newBookButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");

let deleteRows = document.querySelectorAll("tr[data-index]");
let deleteButtons = document.querySelectorAll(".delete-row");

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
    updateTable(myLibrary);
    

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

// UPDATE TABLE FUNCTION
function updateTable(myLibrary) {
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

        delButton.setAttribute("class", "delete-row");

        updateNodelist()

        // UPDATE GLOBAL COUNTER AND ADD DATA-INDEX ATTRIBUTE
        counter = i;
        newRow.setAttribute("data-index", counter);
        delButton.setAttribute("data-index", counter);
    } 
}

updateTable(myLibrary);

// DELETE BOOK EVENT LISTENER
deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        updateNodelist();
        let index = e.target.getAttribute("data-index");
        console.log(e.target);
        if (deleteRows.length > 1) {
            for (let row of deleteRows) {
                if (row.getAttribute("data-index") === index) {
                    row.remove();
                }  
            }
        } else {
            deleteRows[index].remove();
        }
        recountTableIndex();
    })
});

// RECOUNT ROW INDEX
function recountTableIndex() {
    updateNodelist();
    let length = deleteRows.length;
    counter = length;
    if (length > 1) {
        for (let i = length - 1; i >= 0; i--) {
            deleteRows[i].setAttribute("data-index", i);
            deleteButtons[i].setAttribute("data-index", i);
        }
    } else {
        deleteRows[0].setAttribute("data-index", 0);
        deleteButtons[0].setAttribute("data-index", 0)
    }


}

//UPDATE GLOBAL NODELISTS
function updateNodelist() {
    const updatedDelRows = document.querySelectorAll("tr[data-index]");
    const updatedDelButtons = document.querySelectorAll(".delete-row");
    deleteRows = updatedDelRows;
    deleteButtons = updatedDelButtons;
}




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

