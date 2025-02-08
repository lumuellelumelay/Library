import Library from './library.js';

const library = new Library();
library.addBookList('The Hobbit', 'J.R.R. Tolkien', 1937);
library.addBookList('The Lord of the Rings', 'J.R.R. Tolkien', 1954);
library.addBookList('The Catcher in the Rye', 'J.D. Salinger', 1951);

let displayBook = function (book) {
  console.log(
    `Book ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Year: ${book.year}`
  );
};

library.getBookList().forEach((book) => {
  displayBook(book);
});
