// @ts-check


/**
 * Array of Books - books are objects
 * @type {Array<object>}
 */
let myLibrary = [ 
    {
        title:'the hobbit', 
        author: 'JRR Tolkein',
        pages: '200'
    }, {
        title:'harry potter', 
        author: 'JK Rowling',
        pages: '400'
    }];

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

// const theHobbit = new Book('The Hobbit','JRR Tolkein', 298, 'not read yet');
//         console.log(theHobbit.info());


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

displayBookCards(myLibrary);