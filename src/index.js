// @ts-check

const overlay = document.querySelector('.overlay-outer');
const overlayInner = document.querySelector('.overlay-inner');
const addNewButton = document.querySelector('.new-book-button');
const submitNewBookButton = document.getElementById('submit-new-book');
const newBookForm = document.getElementById('new-book-form');
const exitBookButton = document.getElementById('exit-form');


//variable declarations
let author;
let pages;
let title;
let read;
let newLibraryItem;
let storageItemKey;
let book;

/**
 * This function is called on window load, it checks to see if the browser already has data in localStorage 
 *  If it true, it will loop through the localStorage to retrieve the Item Key so it can access each book object 
 *  the book item is an object which must be saved as a string so here we convert it to an object using JSON.parse 
 * this object is then passed into the {@link displayBookCard} function to create and display the book in the DOM
 * 
 */

const populateLocalStorage = () => {
	if(localStorage.length === 0) {
    console.info('there is no storage');
	} else {    //if true loop through localStorage object - find the key - parse to object - call function to create cards  
    for(let i = 0; i < localStorage.length; i++) {
        storageItemKey = localStorage.key(i);
				book = JSON.parse(localStorage.getItem(storageItemKey));
				displayBookCard(book);
    }
	}
} 

window.addEventListener('load', populateLocalStorage);


/**
 * This function opens a pop up overlay to enter new book details 
 * called on ADD NEW button with event listener 
 */
const openOverlay = () => {
    //check if modal is already open 
    if (overlay.matches('.open')) {
        console.info('overlay already open');
        return;
    } else {
        // submitNewBookButton.disabled = true;
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
 * + calls {@link displayBookCard} function to populate the dom with new book details
 * + calls {@link addBookToLocalStorage} to populate the localStorage
 * + disables submit button 
 * @param {event} event 
 * @returns {Object} - creates new Book object and appends the object to DOM
 */

const addBookToLibrary = (event) => {
    author = event.target[0].value;
    title = event.target[1].value;
    pages = event.target[2].value;
    read = event.target[3].checked;


    newLibraryItem = new Book(author, title, pages, read);
    addBookToLocalStorage(newLibraryItem);
    displayBookCard(newLibraryItem);
    submitNewBookButton.disabled = true;
}

/**
 * Function that takes the new book object, assigns a new key value
 * new key value is the title of the book
 * (this is so the next object does not overwrite the current book 
 * - each object requires a new key value)
 * Then the new book is converted to a string and Set to the local storage
 * @param {Object} newLibraryItem 
 */
const addBookToLocalStorage = (newLibraryItem) => {
    storageItemKey = newLibraryItem.title;
    localStorage.setItem(storageItemKey, JSON.stringify(newLibraryItem));
 }


/**
 * Display Books in HTML - creates a new div, h3, h5 to display book details
 * @param {object} book - object taken from array {@link myLibrary} 
 * this function is called in {@link displayBookCards}
 * @returns DOM elements 
 */
function displayBookCard(book) {
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

    bookCard.setAttribute('data-itemKey', book.title);

    removeButton.addEventListener('click', handleDeleteBook);
    readElement.addEventListener('change', handleReadCheckbox);
			 
}



/**
 * This function handles the submit button - it calls {@link addBookToLibrary} function and closes overlay
 * @param {Event} event 
 */
const submitForm = (event) => {
    event.preventDefault(); 
    addBookToLibrary(event);
    overlay.classList.remove('open');
}

/**
 * Function handles exit button on form - it resets input data and closes overlay
 */
const exitForm = () => {
    newBookForm.reset();
    submitNewBookButton.disabled = true;
    overlay.classList.remove('open');
}

/**
 * Function handles click outside overlay click
 * @param {Event} event 
 */
const handleClickOutside = (event) => {
    if(event.target == event.currentTarget) {
        exitForm();
    }
}


/**
 * Function to remove a book object from array and from dom
 * @param {Event} event - event listener on delete button 
 */
const handleDeleteBook = (event) => {
	let deletedBook = event.target.parentElement;
    localStorage.removeItem(deletedBook.dataset.itemKey);
    deletedBook.remove();		
}

/**
 * Function finds the index of the book object and changes read to true or false
 * @param {event} event 
 * @returns boolean change on book object 
 */
const handleReadCheckbox = (event) => {
	let readBookCard = event.target.parentElement;
	let obj = JSON.parse(localStorage.getItem(readBookCard.parentElement.dataset.itemKey));
    
    if (readBookCard.childNodes[1].checked === true) {
				obj.read = true;
    } else {
				obj.read = false;
        }
        
    //send updated object back to local storage as a string
    localStorage.setItem(readBookCard.parentElement.dataset.itemKey, JSON.stringify(obj));
				
 }


newBookForm.addEventListener('submit', submitForm);
exitBookButton.addEventListener('click', exitForm);
overlay.addEventListener('click', handleClickOutside);
 


