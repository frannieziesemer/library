# library app

An app that takes the user input of a book and stores the data in localStorage. The read status of the book can be updated and the book card can be deleted. 

### skills demonstrated
- localStorage ( this is fun! )
- object contructor
- DOM manipulation 
- jsdoc documentation 

#### challenges overcome while building this app 
- I must search best practices for .js file structure
    - i have many variable declarations outside of functions and addEventListeners throughout the page
    - looks very messy and unclear :( 
    - element construction and bubbling causing issues on adding event listeners 
    - the event listener for delete button and read checkbox must be added in the same scope as the element is created which is inside createBookCard function - but now the createBookCard function is called before the element is created ???? causing the even listener to show error 
    OVERCAME: created the onload event listener and refactored code into another function to ensure the book cards are all added on load and this solved the problem 
- populating the DOM with local storage data 


### features to add 
- !important - form validation + close overlay on submit 
- cloud storage 