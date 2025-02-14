import Library from './library.js';
const library = new Library();

// add book to the library
const addLibrary = function (book) {
  library.addBookList(book.title, book.author, book.year);
  console.log(library.getBookList());
};

// iterate through the json data and add each book to the library
export const jsonHandler = function (data) {
  data.forEach((books) => {
    addLibrary(books);
  });
};

fetch('./data/userBooks.json')
  .then((response) => response.json())
  .then((json) => jsonHandler(json))
  .catch((error) => console.error('Error loading JSON', error));
