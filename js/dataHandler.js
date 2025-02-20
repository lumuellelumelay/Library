import BookCardModule from './bookCardModule.js';
import Library from './library.js';
const library = new Library();

// add book to the library
const addLibrary = function (book) {
  library.addBookList(
    book.title,
    book.author,
    book.year,
    book.description,
    book.progress,
    book.url
  );
};

// create cards from the library books
const createBookCards = function () {
  const books = library.getBookList();
  books.forEach((book) => {
    const bookData = {
      id: book.id,
      title: book.title,
      author: book.author,
      year: book.year,
      description: book.description,
      progress: book.progress,
      url: book.url,
    };
    console.log(bookData);
    const bookCard = new BookCardModule(bookData);
    bookCard.rederCard();
  });
};

// iterate through the json data and add each book to the library
// and create cards after adding all books
export const jsonHandler = function (data) {
  data.forEach((books) => {
    addLibrary(books);
  });
  createBookCards();
};

fetch('./data/userBooks.json')
  .then((response) => response.json())
  .then((json) => jsonHandler(json))
  .catch((error) => console.error('Error loading JSON', error));
