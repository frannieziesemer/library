// @ts-check

const overlay = document.querySelector('.overlay-outer');
const overlayInner = document.querySelector('.overlay-inner');
const addNewButton = document.querySelector('.new-book-button');
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
        read: true

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
        newBookForm.reset();
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
 * @param {Boolean} read - Indicates whether the book has been read or not
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
    read = event.target[3].checked;
    console.log(read);
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
    const readElement = document.createElement('div');
    const readInput = document.createElement('input');
    const readLabel = document.createElement('label');
    const removeButton = document.createElement('button');

    bookCard.classList.add('book-card');
    titleElement.classList.add('title');
    authorElement.classList.add('author');
    pagesElement.classList.add('pages');
    readElement.classList.add('readElement');
    readInput.setAttribute('type', 'checkbox');
    readInput.setAttribute('value', 'Book Read??');
    readInput.classList.add('read-checkbox');
    removeButton.classList.add('remove-button');

    titleElement.textContent = book.title;
    authorElement.textContent = book.author;
    pagesElement.textContent = `${book.pages} pages`;
    readLabel.textContent = `book read?`;
    removeButton.textContent = 'delete';

    if(book.read === true) {
        readInput.checked = true;
    } else {
        readInput.checked = false;
    }

    cardsWrapper.appendChild(bookCard);
    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(readElement);
    readElement.appendChild(readLabel);
    readElement.appendChild(readInput);
    bookCard.appendChild(removeButton);

    //set index number as data attribute 
    let indexNumber = myLibrary.length -1;
    bookCard.setAttribute('data-index', indexNumber);
  
    removeButton.addEventListener('click', removeBook);
    readElement.addEventListener('change', handleReadCheckbox);
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


/**
 * Function to remove a book object from array and from dom
 * @param {Event} event - event listener on delete button 
 */
const removeBook = (event) => {
    let indexOfBook = event.target.parentElement.dataset.index;
    myLibrary.splice(indexOfBook, 1);
    event.target.parentElement.remove();
    console.log(myLibrary);
}
/**
 * Function finds the index of the book object and changes read to true or false
 * @param {event} event 
 * @returns boolean change on book object 
 */
const handleReadCheckbox = (event) => {
    let indexOfBook = event.currentTarget.parentElement.dataset.index;
    if (event.target.checked === true) {
        myLibrary[indexOfBook].read = true;

        console.log(myLibrary[indexOfBook]);
    } else {
        myLibrary[indexOfBook].read = false;
        console.log(myLibrary[indexOfBook]);
    }
}



//add event listener to form submit button
newBookForm.addEventListener('submit', (event) => {
    event.preventDefault();    
    addBookToLibrary(event);
    }
    );

exitBookButton.addEventListener('click', exitForm);

displayBookCards(myLibrary);
