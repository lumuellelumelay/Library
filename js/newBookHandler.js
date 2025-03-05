import {
  validatorYear,
  validatorTitle,
  validatorAuthor,
  validatorDescription,
  validatorImage,
  validatorSubmittion,
  resetInput,
} from './addNewBookValidator.js';

import { addNewBook } from './dataHandler.js';

export class NewBookHandler {
  constructor(addBook) {
    this.addBookButton = document.querySelector(addBook);
    this.newBookContainer = document.querySelector('.new-book-container');
    this.newBook = undefined;
    this.boundSubmitButton = null;
    this.boundCancelButton = null;
    this.initializeOverlay();
  }

  initializeOverlay() {
    if (!this.addBookButton) return;

    this.addBookButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.newBookContainer.dataset.overlayContainer = 'true';
      const overlayState = this.newBookContainer.dataset.overlayContainer;

      if (overlayState === 'true') {
        this.addBookHandler();
      }
    });
  }

  ifImageEmpty(image) {
    // if the image is undefined, let the bookCardModule handle the default image
    if (image === undefined) {
      return '';
    }
    return image.trim();
  }

  ifDescriptionEmpty(description) {
    if (description === '' || description === undefined) {
      return 'Add a description';
    }
    return description;
  }

  newBookManage() {
    const title = validatorTitle();
    const author = validatorAuthor();
    const year = validatorYear();
    let description = validatorDescription();
    let image = validatorImage();

    image = this.ifImageEmpty(image);
    description = this.ifDescriptionEmpty(description);
    const checkEmpty = validatorSubmittion(title, author, year);

    if (checkEmpty) {
      return null;
    } else {
      return {
        title: title,
        author: author,
        year: year,
        description: description,
        progress: 0,
        url: image,
      };
    }
  }

  cancelHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    this.newBookContainer.dataset.overlayContainer = 'false';
  }

  submitHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    this.newBook = this.newBookManage();

    if (this.newBook) {
      addNewBook(this.newBook);
      this.newBookContainer.dataset.overlayContainer = 'false';
      resetInput();
    }
  }

  addBookHandler() {
    const cancelButton = this.newBookContainer.querySelector('.cancel-button');
    const submitButton = this.newBookContainer.querySelector('.submit-button');

    submitButton.removeEventListener('click', this.boundSubmitButton);
    cancelButton.removeEventListener('click', this.boundCancelButton);

    if (!this.boundCancelButton) {
      this.boundCancelButton = this.cancelHandler.bind(this);
    }

    if (!this.boundSubmitButton) {
      this.boundSubmitButton = this.submitHandler.bind(this);
    }

    cancelButton.addEventListener('click', this.boundCancelButton);
    submitButton.addEventListener('click', this.boundSubmitButton);
  }
}
