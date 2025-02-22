export default class BookCardModule {
  constructor(data) {
    this.data = data; // this is the data from the library.js in object format
    this.elements = {};
    this.wrapper = this.getParentNode();
  }

  getParentNode() {
    return document.querySelector('.wrapper');
  }

  createBookCardElements() {
    this.elements.bookCards = document.createElement('div');

    this.elements.bookCover = document.createElement('img');
    this.elements.descriptionWrapper = document.createElement('div');

    this.elements.bookDescription = document.createElement('div');
    this.elements.progressBar = document.createElement('div');

    this.elements.bookTitle = document.createElement('p');
    this.elements.bookAuthor = document.createElement('p');

    this.elements.circleSvg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    this.elements.circleOne = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.elements.circleTwo = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.elements.text = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
  }

  setAttributesManager() {
    this.elements.bookCards.classList.add('book-cards');

    this.setBookCardComponent();

    this.setDescriptionWrapperComponent();

    this.setBookDescriptionComponent();

    this.setProgressBarComponent();
  }

  imageHandler(image) {
    if (!image || image.length === 0) {
      return 'https://picsum.photos/300';
    }
    return image;
  }

  altHandler(alt) {
    return alt || 'A random generated image';
  }

  setBookCardComponent() {
    const image = this.imageHandler(this.data.url);
    const alt = this.altHandler(this.data.alt);

    this.elements.bookCover.setAttribute('src', image);
    this.elements.bookCover.setAttribute('alt', alt);

    this.elements.descriptionWrapper.classList.add('description-wrapper');
  }

  setDescriptionWrapperComponent() {
    this.elements.bookDescription.classList.add('book-description');
    this.elements.progressBar.classList.add('progress-bar');
  }

  setBookDescriptionComponent() {
    this.elements.bookTitle.classList.add('book-title');
    this.elements.bookTitle.textContent = this.data.title;

    this.elements.bookAuthor.classList.add('book-author');
    this.elements.bookAuthor.textContent = this.data.author;
  }

  setProgressBarComponent() {
    this.elements.circleSvg.setAttribute('viewBox', '0 0 100 100');

    const circleOneAttributes = {
      stroke: '#e4e3e3',
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
    // const progressBar = `progress--${this.data.id}`;
    // const progressBar = `progress--circle`;
    const circleTwoAttributes = {
      id: 'progress--circle',
      stroke: '#9a6971',
      'stroke-width': '8',
      cx: '50',
      cy: '50',
      r: '30',
      fill: 'none',
      pathLength: '100',
    };
    Object.entries(circleTwoAttributes).forEach(([key, value]) => {
      this.elements.circleTwo.setAttribute(key, value);
    });

    const textAttributes = {
      id: 'progress--text',
      x: '50',
      y: '-50',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
    };
    Object.entries(textAttributes).forEach(([key, value]) => {
      this.elements.text.setAttribute(key, value);
    });

    this.progressHandler(this.data.progress);
  }

  progressHandler(percentage) {
    this.elements.text.textContent = `${percentage}%`;
    this.elements.circleTwo.style.strokeDashoffset = 100 - percentage;
  }

  assembleElements() {
    this.elements.circleSvg.append(
      this.elements.circleOne,
      this.elements.circleTwo,
      this.elements.text
    );
    this.elements.progressBar.appendChild(this.elements.circleSvg);

    this.elements.bookDescription.append(
      this.elements.bookTitle,
      this.elements.bookAuthor
    );

    this.elements.descriptionWrapper.append(
      this.elements.bookDescription,
      this.elements.progressBar
    );

    this.elements.bookCards.append(
      this.elements.bookCover,
      this.elements.descriptionWrapper
    );

    this.wrapper.appendChild(this.elements.bookCards);
  }

  rederCard() {
    console.log(this.data);
    this.createBookCardElements();
    this.setAttributesManager();
    this.assembleElements();
  }
}
