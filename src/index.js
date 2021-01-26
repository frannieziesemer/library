// @ts-check

const overlay = document.querySelector('.overlay-outer');
const overlayInner = document.querySelector('.overlay-inner');
const addNewButton = document.querySelector('.new-book');


/**
 * open pop up for to enter new book details 
 * called on ADD new button with event listener 
 */
const openOverlay = () => {
    //check if modal is already open 
    if (overlay.matches('.open')) {
        console.info('overlay already open');
        return;
    }
    overlay.classList.add('open');
}

addNewButton.addEventListener('click', openOverlay);

let myLibrary = [];

let author;
let pages;
let title;
let read;
let newLibraryItem;

/**
 * * Book Object constructor function
 * @param {String} title 
 * @param {String} author 
 * @param {Number} numberOfPages 
 * @param {String|Boolean} read 
 */
function Book (title,author,numberOfPages,read) {
    this.title = title
    this.author = author
    this.numberOfPages = numberOfPages
    this.read = read
}

// const addBookToLibrary = (newBook) => {
//     myLibrary.push(newBook);
// }


// /**
//  * Function creates newBook object
//  * @param {String} author 
//  * @param {String} title 
//  * @param {Number} pages 
//  * @param {String} read 
//  */
// const saveNewBook = (author, title, pages, read) => {
//     newLibraryItem = new Book(author, title, pages, read);
// }
const saveNewBook = (event) => {
    author = event.target[0].value;
    title = event.target[1].value;
    pages = event.target[2].value;
    read = event.target[3].value;
    newLibraryItem = new Book(author, title, pages, read);
    console.log(newLibraryItem);
    myLibrary.push(newLibraryItem);
    console.log(myLibrary);
    displayBookCards(myLibrary);
    
}




//add event listener to form submit button
const newBookForm = document.getElementById('new-book-form');
newBookForm.addEventListener('submit', (event) => {
        saveNewBook(event);
        
    }
    );





/**
 * Display Books in HTML - creates a new div, h3, h5 to display book details
 * @param {object} book - object taken from array {@link myLibrary} 
 * this function is called in {@link displayBookCards}
 */
function createBookCard(book) {

    const cardsWrapper = document.querySelector('.cards-wrapper');
    const bookCard = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('h5');
    const pages = document.createElement('p');

    bookCard.classList.add('book-card');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;

    cardsWrapper.appendChild(bookCard);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
  
}
/**
 * Append Book Cards to Html - loops through {@link myLibrary} array and calls the {@link createBookCard} function 
 * to append each book as a new 'card' div
 * @param {array} library 
 */
const displayBookCards = (library) => {
    library.forEach((book) => {
        createBookCard(book);
    })
} 


