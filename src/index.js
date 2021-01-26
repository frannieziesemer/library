// @ts-check

const overlay = document.querySelector('.overlay-outer');
const overlayInner = document.querySelector('.overlay-inner');
const addNewButton = document.querySelector('.new-book');
const submitNewBookButton = document.getElementById('submit-new-book');

//variable declarations
let author;
let pages;
let title;
let read;
let newLibraryItem;

/**
 * @type {Array} 
 */
let myLibrary = [
    {
        title: 'Harry Potter',
        author: 'JK Rowling',
        pages: '230',
        read: 'yes'

    }
];


/**
 * open pop up for to enter new book details 
 * called on ADD new button with event listener 
 */
const openOverlay = () => {
    //check if modal is already open 
    if (overlay.matches('.open')) {
        console.info('overlay already open');
        return;
    } else {
        submitNewBookButton.disabled = false;
        overlay.classList.add('open');
    }
}
addNewButton.addEventListener('click', openOverlay);


/**
 * Represents a book
 * @constructor
 * @param {String} title - Title of the book
 * @param {String} author - Author of the book
 * @param {String} pages - Number of pages the book has
 * @param {String|Boolean} read - Indicates whether the book has been read or not
 */
function Book (title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
/**
 * Function retreives input from form and creates new Book object {@link new Book}
 * it also calls {@link creatBookCard} function to populate the dom with new book details
 * and disables submit button 
 * @param {event} event 
 * @returns {Object} - creates new Book object and appends the object to DOM
 */

const addBookToLibrary = (event) => {
    author = event.target[0].value;
    title = event.target[1].value;
    pages = event.target[2].value;
    read = event.target[3].value;
    newLibraryItem = new Book(author, title, pages, read);
    myLibrary.push(newLibraryItem);
    console.log(myLibrary);
    createBookCard(newLibraryItem);
    submitNewBookButton.disabled = true;
}






/**
 * Display Books in HTML - creates a new div, h3, h5 to display book details
 * @param {object} book - object taken from array {@link myLibrary} 
 * this function is called in {@link displayBookCards}
 * @returns DOM elements 
 */
function createBookCard(book) {
    const cardsWrapper = document.querySelector('.cards-wrapper');
    const bookCard = document.createElement('div');
    const titleElement = document.createElement('h3');
    const authorElement = document.createElement('h5');
    const pagesElement = document.createElement('p');
    const readElement = document.createElement('p');

    bookCard.classList.add('book-card');
    titleElement.classList.add('title');
    authorElement.classList.add('author');
    pagesElement.classList.add('pages');
    readElement.classList.add('element');

    titleElement.textContent = book.title;
    authorElement.textContent = book.author;
    pagesElement.textContent = `${book.pages} pages`;
    readElement.textContent = `book read before? ${book.read}`;

    cardsWrapper.appendChild(bookCard);
    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(readElement);
  
}
/**
 * Append existing Book Cards to Html - loops through {@link myLibrary} array and calls the {@link createBookCard} function 
 * to append each book as a new 'card' div
 * @param {array} library 
 */
const displayBookCards = (library) => {
    library.forEach((book) => {
        createBookCard(book);
    })
} 



//HANDLING OF FORM
//element selectors 
const newBookForm = document.getElementById('new-book-form');
const exitBookButton = document.getElementById('exit-form');
/**
 * Function handles exit button on form - it resets input data and closes overlay
 */
const exitForm = () => {
    newBookForm.reset();
    overlay.classList.remove('open');
}



//add event listener to form submit button
newBookForm.addEventListener('submit', (event) => {
    event.preventDefault();    
    addBookToLibrary(event);
    }
    );

exitBookButton.addEventListener('click', exitForm);

displayBookCards(myLibrary);
