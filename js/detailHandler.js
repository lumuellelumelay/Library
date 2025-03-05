import { getBook } from './dataHandler.js';

export class BookCardInteraction {
  constructor() {
    this.wrapper = document.querySelector('.wrapper');
    this.bookCards = this.wrapper.querySelectorAll('.book-cards');
    this.dialog = document.querySelector('#bookDetailsDialog');
    this.closeButtonDialog = this.dialog.querySelector('.close-button-dialog');
    this.bookTitle = this.dialog.querySelector('.title-dialog');
    this.bookAuthor = this.dialog.querySelector('.book-author-dialog');
    this.bookYear = this.dialog.querySelector('.book-year-dialog');
    this.currentDescription = this.dialog.querySelector('.current-description');

    // this.initializeElements();
    this.initialize();
  }

  initialize() {
    this.wrapper.addEventListener(
      'click',
      this.bookCardsClickHandler.bind(this)
    );
    this.closeButtonDialog.addEventListener('click', () => this.closeDialog());
  }

  // initializeElements() {
  //   this.wrapper = document.querySelector('.wrapper');
  //   this.bookCards = this.wrapper.querySelectorAll('.book-cards');
  //   this.dialog = document.querySelector('#bookDetailsDialog');
  //   this.closeButtonDialog = this.dialog.querySelector('.close-button-dialog');
  //   this.bookTitle = this.dialog.querySelector('.title-dialog');
  //   this.bookAuthor = this.dialog.querySelector('.book-author-dialog');
  //   this.bookYear = this.dialog.querySelector('.book-year-dialog');
  //   this.currentDescription = this.dialog.querySelector('.current-description');
  // }

  bookCardsClickHandler(e) {
    const bookCard = e.target.closest('.book-cards');
    console.log(bookCard);

    if (bookCard) {
      e.stopPropagation();

      const bookId = bookCard.dataset.bookId;
      this.fetchBook(bookId);
    }
  }

  async fetchBook(bookId) {
    const processedBook = getBook(bookId);
    // console.log(processedBook); // checking if the processBook is right book
    this.showBookDetails(processedBook);
  }

  showBookDetails(book) {
    // UI implementation
    const bookDetails = {
      title: book.title,
      author: book.author,
      year: book.year,
      description: book.description,
      progress: book.progress,
    };

    const bookProcessed = bookDetails;

    // console.log(bookDetails);
    this.openDialog(bookProcessed);
  }

  openDialog(book) {
    this.dialog.showModal();
    this.detailManagement(book);
  }

  closeDialog() {
    this.dialog.close();
  }

  detailManagement(book) {
    this.bookTitle.textContent = book.title;
    this.bookAuthor.textContent = book.author;
    this.bookYear.textContent = book.year;
    this.currentDescription.textContent = book.description;
  }
}
