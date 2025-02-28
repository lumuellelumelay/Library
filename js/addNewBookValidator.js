const newBook = document.querySelector('.new-book');

// universal validator
const validator = function (isValid, check) {
  if (check === true) {
    isValid.setAttribute('data-is-valid', 'true');
  } else if (check === false) {
    isValid.setAttribute('data-is-valid', 'false');
  } else {
    isValid.setAttribute('data-is-valid', 'none');
  }
};

const yearChecker = function (yearNumber, year) {
  if (year === '') {
    return 'true';
  }
  if (yearNumber < 1199 || yearNumber > 2026) {
    return true;
  } else {
    return false;
  }
};

const yearGroup = newBook.querySelector('.year-group');
const yearInput = yearGroup.querySelector('#book-year');
const isValidYear = yearGroup.querySelector('[data-is-valid="none"]');
export const validatorYear = function () {
  const year = yearInput.value;
  const yearNumber = parseInt(year);
  const yearRegex = /^\d+$/;

  if (year === '') {
    yearInput.setCustomValidity('');
    validator(isValidYear, null);
  }

  if (!yearRegex.test(year)) {
    yearInput.setCustomValidity('Please enter a valid year (numbers only)');
    validator(isValidYear, false);
  }

  if (yearChecker(yearNumber, year) === true) {
    yearInput.setCustomValidity(
      'Please enter a valid year (between 1200 and 2025)'
    );
    validator(isValidYear, false);
  } else if (yearChecker(yearNumber, year) === 'true') {
    yearInput.setCustomValidity('');
    validator(isValidYear, null);
  } else {
    yearInput.setCustomValidity('');
    validator(isValidYear, true);
    return year;
  }

  yearInput.reportValidity();
};

const titleGroup = newBook.querySelector('.title-group');
const titleInput = titleGroup.querySelector('#book-title');
const isValidTitle = titleGroup.querySelector('[data-is-valid="none"]');
export const validatorTitle = function () {
  const title = titleInput.value;

  if (title === '') {
    titleInput.setCustomValidity('');
    validator(isValidTitle, null);
  } else if (title.trim() === ' ') {
    titleInput.setCustomValidity('Please enter a book title');
  } else if (title.length > 101) {
    titleInput.setCustomValidity('The max is 100 characters');
    validator(isValidTitle, false);

    setTimeout(() => {
      titleInput.setCustomValidity('');
      validator(isValidTitle, true);
    }, 1000);
  } else {
    titleInput.setCustomValidity('');
    validator(isValidTitle, true);
    return title;
  }

  titleInput.reportValidity();
};

const authorGroup = newBook.querySelector('.author-group');
const authorInput = authorGroup.querySelector('#book-author');
const isValidAuthor = authorGroup.querySelector('[data-is-valid="none"]');
export const validatorAuthor = function () {
  const author = authorInput.value;

  if (author === '') {
    authorInput.setCustomValidity('');
    validator(isValidAuthor, null);
  } else if (author.trim() === ' ') {
    authorInput.setCustomValidity('Please enter an author name');
  } else if (author.length > 51) {
    authorInput.setCustomValidity('The max is 50 characters');
    validator(isValidAuthor, false);

    setTimeout(() => {
      authorInput.setCustomValidity('');
      validator(isValidAuthor, true);
    }, 1000);
  } else {
    authorInput.setCustomValidity('');
    validator(isValidAuthor, true);
    return author;
  }

  authorInput.reportValidity();
};

const descriptionGroup = newBook.querySelector('.description-group');
const descriptionInput = descriptionGroup.querySelector('#book-description');
const isValidDescription = descriptionGroup.querySelector(
  '[data-is-valid="none"]'
);
export const validatorDescription = function () {
  const description = descriptionInput.value;

  if (description === '') {
    descriptionInput.setCustomValidity('');
    validator(isValidDescription, null);
  } else if (description.length > 251) {
    descriptionInput.setCustomValidity('The max is 250 characters');
    validator(isValidDescription, false);

    setTimeout(() => {
      descriptionInput.setCustomValidity('');
      validator(isValidDescription, true);
    }, 1000);
  } else {
    descriptionInput.setCustomValidity('');
    validator(isValidDescription, true);
    return description;
  }

  descriptionInput.reportValidity();
};

const imageGroup = newBook.querySelector('.image-group');
const imageInput = imageGroup.querySelector('#book-image');
const isValidImage = imageGroup.querySelector('[data-is-valid="none"]');
export const validatorImage = function () {
  const image = imageInput.value;
  const imageRegex = /^https?:\/\//;
  if (image === '') {
    imageInput.setCustomValidity('');
    validator(isValidImage, null);
  } else if (!imageRegex.test(image)) {
    imageInput.setCustomValidity('Please enter a valid URL');
    validator(isValidImage, false);
  } else {
    imageInput.setCustomValidity('');
    validator(isValidImage, true);
    return image;
  }

  imageInput.reportValidity();
};

const submittionHandler = function (title, author, year) {
  const cacheValidator = {
    all: function () {
      validator(isValidTitle, false);
      validator(isValidAuthor, false);
      validator(isValidYear, false);

      yearInput.setCustomValidity('Please enter the following required fields');
      yearInput.reportValidity();
    },
    title: function () {
      if (title) {
        titleInput.setCustomValidity('Please enter a book title');
        validator(isValidTitle, false);
        titleInput.reportValidity();
      } else {
        titleInput.setCustomValidity('');
        validator(isValidTitle, true);
        titleInput.reportValidity();
      }
    },
    author: function () {
      if (author) {
        authorInput.setCustomValidity('Please enter an author name');
        validator(isValidAuthor, false);
        authorInput.reportValidity();
      } else {
        authorInput.setCustomValidity('');
        validator(isValidAuthor, true);
        authorInput.reportValidity();
      }
    },
    year: function () {
      if (year) {
        yearInput.setCustomValidity('Please enter a valid year (numbers only)');
        validator(isValidYear, false);
        yearInput.reportValidity();
      } else {
        yearInput.setCustomValidity('');
        validator(isValidYear, true);
        yearInput.reportValidity();
      }
    },
  };

  if (title && author && year) {
    cacheValidator.all();
    return;
  }

  cacheValidator.title();
  cacheValidator.author();
  cacheValidator.year();
};

export const validatorSubmittion = function (title, author, year) {
  let checkTitle = false;
  let checkAuthor = false;
  let checkYear = false;

  if (title === '' || title === undefined) {
    checkTitle = true;
  }
  if (author === '' || author === undefined) {
    checkAuthor = true;
  }
  if (year === '' || year === undefined) {
    checkYear = true;
  }

  submittionHandler(checkTitle, checkAuthor, checkYear);

  return checkTitle || checkAuthor || checkYear;
};

const resetValidate = function (isValid) {
  isValid.setAttribute('data-is-valid', 'none');
};

export const resetInput = function () {
  titleInput.value = '';
  authorInput.value = '';
  yearInput.value = '';
  descriptionInput.value = '';
  imageInput.value = '';

  resetValidate(isValidTitle);
  resetValidate(isValidAuthor);
  resetValidate(isValidYear);
  resetValidate(isValidDescription);
  resetValidate(isValidImage);
};

yearInput.addEventListener('input', validatorYear);
titleInput.addEventListener('input', validatorTitle);
authorInput.addEventListener('input', validatorAuthor);
descriptionInput.addEventListener('input', validatorDescription);
imageInput.addEventListener('input', validatorImage);
