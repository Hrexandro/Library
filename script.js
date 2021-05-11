/*
TO DO:

żeby nie wyskakiwał przycisk toggle read ponizej

change colors depedning on read or not read

sorting

zamień textare'y na inputy

style
sources:
external code:
https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp - hide arrow next to number field
https://codeburst.io/animating-dynamically-created-elements-pure-css-c864fdb6e366 - dynamically appearing bookcards
- to  delete, add the class with reverse transition effect before deleting

background:
<a href="https://www.freepik.com/photos/background">Background photo created by kues - www.freepik.com</a> squared-paper-texture
<a href="https://www.vecteezy.com/free-vector/lines">Lines Vectors by Vecteezy</a>free-squared-paper-vector
*/



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
    this.ordinalNumber=ordinal;
    ordinal++;
  
}

function checkDescription(bookObject){
    if (bookObject.read===true){
        bookObject.readDescription="Has read."
    }
    else {
        bookObject.readDescription="Has not read."
    }
    console.log(bookObject.read)
    console.log(bookObject.read)
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
    console.log(bookObject.ordinalNumber);
    bookCard.setAttribute("data-ordinal",`${bookObject.ordinalNumber}`)
    addRemovalListener(bookCard.getElementsByClassName('removal-button')[0]);//bc it's the only one
    addReadToggleListener(bookCard.getElementsByClassName('mark-read-button')[0]);
    
}   
let removalButtons= document.getElementsByClassName("removal-button");

let SeventhSon = new book('Seventh Son', "Orson Scott Card", 270, false)
let Mindhunter= new book("Mindhunter", "John Douglas, Mark Olshaker", 429, false)
let WojennaKorona= new book("Wojenna Korona", "Elżbieta Cherezińska", 700, true)
addBookToLibrary(SeventhSon);
addBookToLibrary(Mindhunter);
addBookToLibrary(WojennaKorona);

// addBookToLibrary(SeventhSon);
// addBookToLibrary(WojennaKorona);
// addBookToLibrary(SeventhSon);
// addBookToLibrary(WojennaKorona);
// addBookToLibrary(SeventhSon);
// addBookToLibrary(WojennaKorona);




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
        updateLocalStorage();//add new book to localstorage
        
    }
    //localStorage.storedCards=bookCards.innerHTML//store in local storage
    //localStorage.myLibrary=myLibrary
})

function updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}


function addRemovalListener(button){
    button.addEventListener('click',(e)=>{
        let DOMholder=e.path[1]//holds the DOM to be able to refer to it in the transitionend event
        e.path[1].addEventListener('transitionend',(e)=>{//make sure the DOM is removed only after the transition ends
            bookCards.removeChild(DOMholder);
        })
        e.path[1].classList.add('disappearing')//causes the transition
        // bookCards.removeChild(e.path[1]);
        myLibrary.splice(myLibrary.findIndex((obj)=>{
            return obj.ordinalNumber===e.path[1].getAttribute('data-ordinal')
        }),1);
        updateLocalStorage();



        //myLibrary.splice(e.path[1].getAttribute('data-ordinal'),1)
        // console.log(e);
        // console.log(e.path[1]);
    })
}

function addReadToggleListener(button){
    button.addEventListener('click',(e)=>{
        console.log(e.path[1].getAttribute('data-ordinal'));
        let currentBook =  myLibrary.find((obj)=>{
            return obj.ordinalNumber===Number(e.path[1].getAttribute('data-ordinal'));
            
            })
        console.log(currentBook.read);
        currentBook.read=!currentBook.read;
        checkDescription(currentBook)//makes sure the description matches the read state
        console.log(currentBook.read);
        console.log(toggleReadDOM(e.path[1]))
        toggleReadDOM(e.path[1])
        updateLocalStorage();//update the localstorage also
        
    }
    )
}

function toggleReadDOM(bookDOM){
    let currentBook =  myLibrary.find((obj)=>{
        return obj.ordinalNumber===Number(bookDOM.getAttribute('data-ordinal'));
        
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

//console.log(localStorage.getItem("storedCards"))

displayLibrary();
//console.log(localStorage.getItem("myLibrary"))

// for (i=0;i<removalButtons.length;i++){
//     addRemovalListener(removalButtons[i]);
// }

/*
//TODO
not go forward unless all boxes are filled



*/
