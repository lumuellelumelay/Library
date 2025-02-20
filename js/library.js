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
}
