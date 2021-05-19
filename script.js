/*
TO DO:
readme:
mention sorting and counting and localstorage

check scaling description on phone

change colors depedning on read or not read

bugs:



style
sources:
external code:
https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp - hide arrow next to number field
https://codeburst.io/animating-dynamically-created-elements-pure-css-c864fdb6e366 - dynamically appearing bookcards

https://github.com/googlefonts/noto-fonts- font
books icon
<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

fonts

	<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@500&display=swap" rel="stylesheet">

background:

*/



let myLibrary = [];

let ordinal=0;




// console.log(
//     [1,2,3,4,5].reduce((currentMax,checked)=>{
//         // console.log(currentMax.ordinalNumber);
//         // console.log(checked.ordinalNumber);
//         return Math.max(currentMax,checked);
//     },0)
// )
    
    // myLibrary.sort(compareOrdinals)

    // function compareOrdinals(a,b){
    //     return a.ordinalNumber-b.ordinalNumber
    // }




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

        
    `
    // console.log(bookObject.ordinalNumber);
    bookCard.setAttribute("data-ordinal",`${bookObject.ordinalNumber}`)
    addRemovalListener(bookCard.getElementsByClassName('removal-button')[0]);//bc it's the only one
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

// function compareAlphabetically(a,b) {//works!
//     return a[`${attribute}`].localeCompare(b[`${attribute}`];

// }

function sortBy (attribute){
    console.log(attribute)
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
        console.log("lastnames-should work")
        myLibrary.sort(compareLastNameAlphabetically);
    }
    else {
        console.log("notlastnames")
        myLibrary.sort(compareAlphabetically);

    }
    if (orderChoice==="descending"){
        myLibrary.reverse();
    }

}
function findLastName(string){//find the first capital letter after the last space before the comma (multiple authors), or the first capital letter after the last space, or first letter (one word names)
    let regex=/(?<=\s)([a-zA-Z]).*(?=\,)/;
    if (string.match(regex)){
        return string.match(regex)[0]//returns an object, the index 1 is the actual letter
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
    console.log(choice)
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

document.querySelectorAll("input").forEach(element => {
    element.addEventListener('click',()=>{
        filledChecker ()
    })
})


radioBox.addEventListener('click',()=>{
    filledChecker();
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
        console.log(arguments)
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
        let newBook = new book(`${titleArea.value}`, `${authorArea.value}`, `${Number(pagesArea.value)}`, radio);
        clearFormFields(titleArea, authorArea, pagesArea, radioBox);
        addBookToLibrary(newBook);
        displayBook (newBook);
        updateLocalStorage();//add new book to localstorage
        updateCounters();
    }
    //localStorage.storedCards=bookCards.innerHTML//store in local storage
    //localStorage.myLibrary=myLibrary
})

function updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}


function addRemovalListener(button){
    button.addEventListener('click',(e)=>{
        let DOMholder=e.target.parentNode;//holds the DOM to be able to refer to it in the transitionend event
        console.log(DOMholder)
        console.log(DOMholder.getAttribute('data-ordinal'))
        console.log(myLibrary.findIndex((obj)=>{
                return obj.ordinalNumber===Number(DOMholder.getAttribute('data-ordinal'))
            }))
        DOMholder.addEventListener('transitionend',(e)=>{//make sure the DOM is removed only after the transition ends
            bookCards.removeChild(DOMholder);
        })
        DOMholder.classList.add('disappearing')//causes the transition
        // bookCards.removeChild(e.path[1]);
        myLibrary.splice(myLibrary.findIndex((obj)=>{
            return obj.ordinalNumber===Number(DOMholder.getAttribute('data-ordinal'))
        }),1);
        updateLocalStorage();
        updateCounters();


        //myLibrary.splice(e.path[1].getAttribute('data-ordinal'),1)
        // console.log(e);
        // console.log(e.path[1]);
    })
}

function addReadToggleListener(button){
    button.addEventListener('click',(e)=>{
        let currentBook =  myLibrary.find((obj)=>{
            return obj.ordinalNumber==Number(e.target.parentNode.getAttribute('data-ordinal'));
            
            })
        console.log(currentBook.read);
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
    console.log(bookDOM)
    bookDOM.getElementsByClassName("mark-read-button")[0].textContent=(currentBook.read===true) ? "Has read.":"Has not read.";
}
//localStorage.storedCards=bookCards.innerHTML//store initial in local storage DOES NOT WORK
//localStorage.myLibrary=myLibrary

//localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
//bookCards.innerHTML=localStorage.getItem("storedCards")//wypeirdziela [object HTMLDivElement]

if(localStorage.getItem("myLibrary")){//if something has been set in the local storage, then retrieve
    myLibrary=JSON.parse(localStorage.getItem("myLibrary"))
}

ordinal= myLibrary.reduce((currentMax,checked)=>{//makes sure ordinals do not repeat after loading the page from localStorage
        // console.log(currentMax.ordinalNumber);
        // console.log(checked.ordinalNumber);
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



            //   <p>Books read:<span id="read-book-counter"></span></p>
            //   <p>Books unread:<span id="unread-book-counter"></span></p>
            //   <p>Total books:<span id="book-counter"></span></p>

//console.log(localStorage.getItem("storedCards"))

displayLibrary();
updateCounters();
//console.log(localStorage.getItem("myLibrary"))

// for (i=0;i<removalButtons.length;i++){
//     addRemovalListener(removalButtons[i]);
// }

/*
//TODO
not go forward unless all boxes are filled



*/
