export default class BookCardModule {
  // Temporary: Since the data are comming from the library.js file
  // we can skip getting the data from the library.js and
  // we can just pass the variables when the BookCardHandle (soon)
  // invoke the instances of BookCardModule.

  // this constructor is temporary only and will be removed
  // if it was not used properly.
  constructor(data) {
    this.data = data; // this is the data from the library.js in object format
    this.elements = {};
    this.wrapper = this.getParentNode();
  }

  getParentNode() {
    return (wrapper = document.querySelector('.wrapper'));
  }

  // this instance creates the book card elements and
  // stores to the this.element object for later use.
  createBookCardElements() {
    // Note: this trend goes to top-level to bottom-level in respect to the DOM

    // create book card
    this.elements.bookCards = document.createElement('div');

    // create book card component
    this.elements.bookCover = document.createElement('img');
    this.elements.descriptionWrapper = document.createElement('div');

    // create description wrapper component
    this.elements.bookDescription = document.createElement('div');
    this.elements.progressBar = document.createElement('div');

    // create book description component
    this.elements.bookTitle = document.createElement('p');
    this.elements.bookAuthor = document.createElement('p');

    // create progress bar component
    this.elements.circleSvg = document.createElement('svg');
    this.elements.circleOne = document.createElement('circle');
    this.elements.circleTwo = document.createElement('circle');
    this.elements.text = document.createElement('text');
  }

  // this instance is the collection of instances and will
  // invoke other methods once this instance is invoked.
  // Note: this trend goes to top-level to bottom-level in respect to the DOM.
  // Note: this code is temporary and changes will be made.
  //
  // this instance is for setting attributes to the book card components
  setAttributesManager() {
    // for book card
    this.elements.bookCards.classList.add('book-cards');

    // for book cover and description wrapper
    setBookCardComponent();

    // for book description wrapper component
    setDescriptionWrapperComponent();

    // for book description component
    setBookDescriptionComponent();

    // for progress bar component
    setProgressBarComponent();
  }

  setBookCardComponent() {
    this.elements.bookCover.setAttributes(
      'src',
      this.data.url || 'https://picsum.photos/300'
    );
    this.elements.bookCover.setAttributes(
      'alt',
      this.data.alt || 'A random generated image'
    );

    this.elements.descriptionWrapper.classList.add('description-wrapper');
  }

  setDescriptionWrapperComponent() {
    this.elements.bookDescription.classList.add(book - description);
    this.elements.progressBar.classList.add('progress-bar');
  }

  // test the book title and author with .textContent
  setBookDescriptionComponent() {
    this.elements.bookTitle.classList.add('book-title');
    this.elements.bookTItle.textConotent = this.data.title;

    this.this.elements.bookAuthor.classList.add('book-author');
    this.elements.bookAuthor.textConotent = this.data.author;
  }

  setProgressBarComponent() {
    this.elements.circleSvg.setAttributes('viewBox', '0 0 100 100');

    // attributes of circle one
    const circleOneAttributes = {
      stroke: '#e0dfda',
      'stroke-width': '8',
      cx: '50',
      cy: '50',
      r: '30',
      fill: 'none',
    };
    Object.entries(circleOneAttributes).forEach(([key, value]) => {
      this.elements.circleOne.setAttribute(key, value);
    });

    // attributes of circle two
    const progressBar = `progress--${this.data.id}`;
    const circleTwoAttributes = {
      id: progressBar,
      storke: '#b5ab54',
      'stroke-width': '8',
      cx: '50',
      cy: '50',
      r: '30',
      fill: 'none',
      pathLength: '100',
    };
    Object.entries(circleTwoAttributes).forEach(([key, value]) => {
      this.elements.circleTwo.setAttributes(key, value);
    });

    // attributes of text
    const text = {
      id: 'progress--text',
      x: '50',
      y: '-50',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
    };
    Object.entries(textAttributes).forEach(([key, value]) => {
      this.elements.text.setAttributes(key, value);
    });

    this.progressHandler(this.data.progress);
  }

  progressHandler(percentage) {
    this.elements.text.textContent = `${percentage}%`;
    this.elements.circleTwo.style.strokeDashoffset = percentage;
  }
}

// The problem is how to set the data from the json and
// display it in the card.
// Solution: temporary solution is to set the data in the constructor.
