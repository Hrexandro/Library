let myLibrary = [];

let ordinal=0;

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
    ordinal++;
    this.ordinalNumber=ordinal;
  
}

function checkDescription(bookObject){
    if (bookObject.read===true){
        bookObject.readDescription="Has read."
    }
    else {
        bookObject.readDescription="Has not read."
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
        <button class="removal-button">x</button><br>
        <p>Title: ${bookObject.title}</p>
        <p>Author: ${bookObject.author}</p>
        <p>Pages: ${bookObject.pages}</p>
        <button class="mark-read-button">${bookObject.readDescription}</button>
        <br><br>
        
    `
    bookCard.setAttribute("data-ordinal",`${bookObject.ordinalNumber}`)
    addRemovalListener(bookCard.getElementsByClassName('removal-button')[0]);//because it's the only one
    addReadToggleListener(bookCard.getElementsByClassName('mark-read-button')[0]);
    
}   
let removalButtons= document.getElementsByClassName("removal-button");

let SeventhSon = new book('Seventh Son', "Orson Scott Card", 270, false)
let Mindhunter= new book("Mindhunter", "John Douglas, Mark Olshaker", 429, false)
let AGameOfThrones= new book("A Game of Thrones", "George R.R. Martin", 801, true)
addBookToLibrary(SeventhSon);
addBookToLibrary(Mindhunter);
addBookToLibrary(AGameOfThrones);

let titleArea = document.getElementById("title-area");
let authorArea = document.getElementById("author-area");
let pagesArea = document.getElementById("pages-area");
let readYes = document.getElementById("read");
let readNo = document.getElementById("notread");
let radioBox = document.getElementById("radioset");
let titleSorter = document.getElementById("title-sorter");
let titleSorterReverse = document.getElementById("title-sorter-reverse");
let sortSelect = document.getElementById("sort");
let orderSelect = document.getElementById("order");
const readingcheck = document.querySelector('#readingcheck')


function sortBy (attribute){
    function compareAlphabetically(a,b) {
        return a[`${attribute}`].localeCompare(b[`${attribute}`]);
    }
    function compareNumbers(a,b){
        return Number(a[`${attribute}`])-Number(b[`${attribute}`]);
    }
    function compareLastNameAlphabetically(a,b){//first letter after the last space before the comma
        return findLastName(a[`${attribute}`]).localeCompare(findLastName(b[`${attribute}`]));
    }
    if (attribute==="select"){
        return
    }
    else if (attribute==="pages"||attribute==="ordinalNumber"){
        myLibrary.sort(compareNumbers);
    }
    else if (attribute==="author"){
        myLibrary.sort(compareLastNameAlphabetically);
    }
    else {
        myLibrary.sort(compareAlphabetically);

    }
    if (orderChoice==="descending"){
        myLibrary.reverse();
    }

}
function findLastName(string){//find the first capital letter after the last space before the comma (multiple authors), or the first capital letter after the last space, or first letter (one word names)
    let regex=/(?<=\s)([a-zA-Z]).*(?=\,)/;
    if (string.match(regex)){
        return string.match(regex)[0]
    }
    for (i=string.length;i>0;i--){     
        if (string[i]===" "){
            return string.slice(i+1);
        }
    }
    return string;
}


let choice="title" //sort by what  
let orderChoice="ascending" //ascending or descending

sortSelect.addEventListener('change',(e)=>{
    choice=e.target.value;
    sortBy(choice);
    recreateBookCards();
})

orderSelect.addEventListener('change',(e)=>{
    orderChoice=e.target.value
    sortBy(choice);
    recreateBookCards();
})

        
function recreateBookCards () {
    clearBookCards();
    displayLibrary();
}
function clearBookCards (){
    while (bookCards.firstChild){
        bookCards.removeChild(bookCards.firstChild);
    }
}

const newButton = document.getElementById("new")

let somethingMissing;

function filledChecker (){//for all inputs
    let areas = document.querySelectorAll(".area")
    for (i=0;i<areas.length;i++){
        currentInputElementChecker(areas[i])
    }
    currentInputElementChecker(radioBox)
}

function currentInputElementChecker(element){//use with the focusout event below to ensure input fields are checked themselves upon losing focus
    if (element===radioBox) {
        if (!readYes.checked&&!readNo.checked){
            document.getElementById("radioset").classList.add("unfilled-radio");
            somethingMissing=true;
        }
        else {
            radioBox.classList.remove("unfilled-radio");
        }
    }
    else if (element.value===""){
        element.classList.add("unfilled")
        somethingMissing=true;
    }
    else {
        element.classList.remove("unfilled");
    }
}

document.querySelectorAll("input").forEach(element => {
    element.addEventListener('focusout',(e)=>{
        currentInputElementChecker(e.target)
    })
})


radioBox.addEventListener('click',()=>{
    currentInputElementChecker(radioBox);
})

function clearFormFields(){
    for (i=0;i<arguments.length;i++){
        arguments[i].classList.remove("unfilled");
        arguments[i].classList.remove("unfilled-radio");
        if (arguments[i].getAttribute('id')==="radioset"){
            radioBox.reset();
        }
        else {
            arguments[i].value="";
        }
    }
}

function ensureNumbers(field){//if characters typed into the pages field not numbers, nothing is typed
    ["input", "keydown", "keyup"].forEach((action)=>{
        field.addEventListener(`${action}`,(e)=>{
            if (!/^-?\d*$/.test(String.fromCharCode(e.keyCode))&&e.key.length==1){//length 1 ensures that keys like backspace or tab still work
                e.returnValue = false;
            }
        })
    })
}

ensureNumbers(pagesArea)

newButton.addEventListener('click',()=>{
    somethingMissing=false;
    filledChecker();
    let radio = readYes.checked ? true : false;
    if (somethingMissing){
        return;
    }
    else if (!somethingMissing){
        if (isNaN(Number(pagesArea.value))){
            pagesArea.value=0;
        }
        let newBook = new book(`${titleArea.value}`, `${authorArea.value}`, `${Number(pagesArea.value)}`, radio);
        clearFormFields(titleArea, authorArea, pagesArea, radioBox);
        addBookToLibrary(newBook);
        displayBook (newBook);
        updateLocalStorage();//add new book to localstorage
        updateCounters();
    }
})

function updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function addRemovalListener(button){
    button.addEventListener('click',(e)=>{
        let DOMholder=e.target.parentNode;//holds the DOM to be able to refer to it in the transitionend event
        DOMholder.addEventListener('transitionend',(e)=>{//make sure the DOM is removed only after the transition ends
            bookCards.removeChild(DOMholder);
        })
        DOMholder.classList.add('disappearing')//causes the transition
        myLibrary.splice(myLibrary.findIndex((obj)=>{
            return obj.ordinalNumber===Number(DOMholder.getAttribute('data-ordinal'))
        }),1);
        updateLocalStorage();
        updateCounters();
    })
}

function addReadToggleListener(button){
    button.addEventListener('click',(e)=>{
        let currentBook =  myLibrary.find((obj)=>{
            return obj.ordinalNumber==Number(e.target.parentNode.getAttribute('data-ordinal'));
            
            })
        currentBook.read=!currentBook.read;
        checkDescription(currentBook)//makes sure the description matches the read state
        toggleReadDOM(e.target.parentNode)
        updateLocalStorage();//update the localstorage also
        updateCounters();
        
    }
    )
}

function toggleReadDOM(bookDOM){
    let currentBook =  myLibrary.find((obj)=>{
        return obj.ordinalNumber==Number(bookDOM.getAttribute('data-ordinal'));
        
        })
    bookDOM.getElementsByClassName("mark-read-button")[0].textContent=(currentBook.read===true) ? "Has read.":"Has not read.";
}

if(localStorage.getItem("myLibrary")){//if something has been set in the local storage, then retrieve
    myLibrary=JSON.parse(localStorage.getItem("myLibrary"))
}

ordinal= myLibrary.reduce((currentMax,checked)=>{//makes sure ordinals do not repeat after loading the page from localStorage
        return Math.max(currentMax,checked.ordinalNumber);
},0)

function updateCounters(){
    let readCounter = document.getElementById("read-book-counter");
    let unreadCounter = document.getElementById("unread-book-counter");
    let bookCounter = document.getElementById("book-counter");
    readCounter.textContent=` ${myLibrary.filter((book)=>{return book.read===true}).length}`;
    unreadCounter.textContent=` ${myLibrary.filter((book)=>{return book.read===false}).length}`;
    bookCounter.textContent=` ${myLibrary.length}`;
}

displayLibrary();
updateCounters();