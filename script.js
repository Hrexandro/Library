let myLibrary = [];

function book (title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    if (read===true){
        this.readDescription= "Has read."
    }
    else {
        this.readDescription= "Has not read."
    }
    this.info = function (){
        return `${this.title} by ${this.author}, ${this.pages}. ${this.readDescription}`
    }
  
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const bookCards = document.getElementById("book-cards")

function displayLibrary(){
    for (i=0; i<myLibrary.length;i++){
        displayBook(myLibrary[i]);
    }
}  

function displayBook (bookObject){
    let bookCard = document.createElement('div')
    bookCard.classList.add('book-card')
    bookCards.appendChild(bookCard);
    bookCard.innerHTML=`
        <p>Book title: ${bookObject.title}</p>
        <p>Author: ${bookObject.author}</p>
        <p>Pages: ${bookObject.pages}</p>
        <p>${bookObject.readDescription}</p>
        <button class="removal-button">x</button>
    `
    bookCard.setAttribute("data-position",
    `${myLibrary.findIndex((book)=>{
        return  book.title===bookObject.title
        }
    )}`
    )
}   
let removalButtons= document.getElementsByClassName("removal-button");

let SeventhSon = new book('Seventh Son', "Orson Scott Card", 270, false)
let PrognozaPogody= new book("Prognoza Pogody", "Disney", 20, true)
addBookToLibrary(SeventhSon);
addBookToLibrary(PrognozaPogody);

let titleArea = document.getElementById("title-area");
let authorArea = document.getElementById("author-area");
let pagesArea = document.getElementById("pages-area");
let readYes = document.getElementById("read")
let readNo = document.getElementById("notread")
let radioBox = document.getElementById("radioset")
const readingcheck = document.querySelector('#readingcheck')




const newButton = document.getElementById("new")

let somethingMissing;

function filledChecker (){
    let areas = document.querySelectorAll(".area")
    for (i=0;i<areas.length;i++){
        if (areas[i].value===""){
            areas[i].classList.add("unfilled")
            somethingMissing=true;
        }
        else {
            areas[i].classList.remove("unfilled");
        }

    }
    if (!readYes.checked&&!readNo.checked){
        document.getElementById("radioset").classList.add("unfilled-radio");
        somethingMissing=true;
    }
    else {
        radioBox.classList.remove("unfilled-radio");
    }
}

function removeUncheckedStatuses(){
    for (i=0;i<arguments.length;i++){
        arguments[i].classList.remove("unfilled");
        arguments[i].classList.remove("unfilled-radio");
    }
}

newButton.addEventListener('click',()=>{
    somethingMissing=false;
    filledChecker();
    let radio = readYes.checked ? true : false;
    if (somethingMissing){
        return;
    }
    else if (!somethingMissing){
        let newBook = new book(`${titleArea.value}`, `${authorArea.value}`, `${pagesArea.value}`, radio);
        removeUncheckedStatuses(titleArea, authorArea, pagesArea, radioBox);
        addBookToLibrary(newBook);
        displayBook (newBook);
    }
})

displayLibrary()

for (i=0;i<removalButtons.length;i++){
    removalButtons[i].addEventListener('click',(e)=>{
        bookCards.removeChild(e.path[1]);
        console.log(e.path[1])
        myLibrary.splice(e.path[1].getAttribute('data-position'),1)
    })
}

/*
//TODO
not go forward unless all boxes are filled



*/
