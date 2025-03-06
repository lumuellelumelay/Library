import Book from './book.js';

export default class Library {
  constructor() {
    this.id = 1;
    this.bookList = []; // this will store the books
  }

  addBookList(title, author, year, description, progress, url) {
    this.bookList.push(
      new Book(this.id, title, author, year, description, progress, url)
    );
    this.id++;
  }

  getBookList() {
    return this.bookList;
  }

  getBook(bookId) {
    bookId = parseInt(bookId);
    console.log(bookId, this.bookList);
    const bookList = this.getBookList();
    const bookFiltered = bookList.filter((book) => {
      if (book.id === bookId) {
        return book;
      }
    });
    return bookFiltered[0];
  }

  removeBook(bookId) {
    const bookList = this.getBookList();
    const index = bookList.findIndex((book) => book.id === bookId);
    this.bookList.splice(index, 1);
  }

  getNewBook() {
    return this.bookList[this.bookList.length - 1];
  }
}
