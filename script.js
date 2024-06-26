const myLibrary = [];
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

                if (key === 'read') {
                    const readButton = document.createElement('button');
                    newTd.appendChild(readButton);
                    readButton.appendChild(newText);
                    readButton.setAttribute("name", "read-toggle");
                    

                    newText.nodeValue === "yes" ? readButton.setAttribute("class", "green-background") : 
                    readButton.setAttribute("class", "red-background");


            
                }
                else {
                newTd.appendChild(newText);
                }
                
            }  
               // ADD DELETE BUTTON
                const delCell = document.createElement("td");
                const delButton = document.createElement("button");
                const delText = document.createTextNode("Delete");
                
                newRow.appendChild(delCell);
                delCell.appendChild(delButton);
                delButton.appendChild(delText);

                delButton.setAttribute("class", "delete-row");
                
                // UPDATE GLOBAL NODE LISTS
                updateNodelist();

                // UPDATE GLOBAL COUNTER AND ADD DATA-INDEX ATTRIBUTE
                counter++;
                newRow.setAttribute("data-index", counter);
                delButton.setAttribute("data-index", counter);

                // RECOUNT TABLE ROW INDEX
                recountTableIndex();

                // ADD DELETE FUNCTION
                addDeleteFunction(counter);

                // ADD READ TOGGLE FUNCTION
                addToggleReadStatus(counter);
        } 
}

// DELETE BOOK EVENT LISTENER
function addDeleteFunction(counter) {
    let index = --counter;
    const button = document.querySelector(`button[data-index='${index}']`);
    
    button.addEventListener("click", (e) => {
        let updatedIndex = e.target.getAttribute("data-index");
        deleteRows[updatedIndex].remove();
        myLibrary.splice(updatedIndex, 1);
        recountTableIndex();
        updateNodelist();
    });

};

// TOGGLE READ STATUS EVENT LISTENER
function addToggleReadStatus(counter) {
    let index = --counter;
    const button = document.querySelector(`tr[data-index='${index}']>td>button[name="read-toggle"]`);
    button.addEventListener('click', (e) => {
        let updatedIndex = e.target.parentNode.parentNode.getAttribute("data-index");
        if (e.target.getAttribute("class") === "green-background") {
            e.target.setAttribute("class", "red-background");
            e.target.textContent = "no";
        } else {
            e.target.setAttribute("class", "green-background");
            e.target.textContent = "yes";
        }
        myLibrary[updatedIndex]["read"] = e.target.textContent;
    });
}

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
    } else if (length === 1) {
        deleteRows[0].setAttribute("data-index", 0);
        deleteButtons[0].setAttribute("data-index", 0);
    } else {
        console.log("Empty table");
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


/*

Book.prototype.info = function() {
     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

*/
