export default class BookCardModule {
  constructor(data) {
    this.data = data; // this is the data from the dataHandler.js -> library.js in object format
    this.elements = {};
    this.wrapper = this.getParentNode();
  }

  getParentNode() {
    return document.querySelector('.wrapper');
  }

  createBookCardElements() {
    this.elements.bookCards = document.createElement('div');

    this.elements.toggleMenuBookContainer = document.createElement('div');
    this.elements.bookCover = document.createElement('img');
    this.elements.descriptionWrapper = document.createElement('div');

    this.elements.toggleMenuBook = document.createElement('div');
    this.elements.toggleIcon = document.createElement('i');
    this.elements.menu = document.createElement('div');

    this.elements.done = document.createElement('div');
    this.elements.line = document.createElement('div');
    this.elements.remove = document.createElement('div');

    this.elements.doneUndo = document.createElement('p'); // this is the done-undo
    this.elements.doneUndoIcon = document.createElement('i');

    this.elements.removeParagrapgh = document.createElement('p');
    this.elements.removeIcon = document.createElement('i');

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
    this.setBookCards();

    this.setBookCardComponent();

    this.setToggleMenuBookComponent();

    this.setMenuComponent();

    this.setDoneComponent();

    this.setRemoveComponent();

    this.setDescriptionWrapperComponent();

    this.setBookDescriptionComponent();

    this.setProgressBarComponent();
  }

  setBookCards() {
    this.elements.bookCards.classList.add('book-cards');
    this.elements.bookCards.setAttribute('data-book-id', this.data.id);
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

    this.elements.toggleMenuBookContainer.classList.add(
      'toggle-menu-book-container'
    );
    this.elements.toggleMenuBookContainer.setAttribute(
      'data-menu-id',
      this.data.id
    );

    this.elements.descriptionWrapper.classList.add('description-wrapper');
  }

  setToggleMenuBookComponent() {
    this.elements.toggleMenuBook.classList.add('toggle-menu-book');
    this.elements.toggleIcon.classList.add('fi', 'fi-bs-menu-dots');
    this.elements.menu.classList.add('menu');
  }

  setMenuComponent() {
    this.elements.done.classList.add('done');
    this.elements.done.setAttribute('data-done-toggle-id', this.data.id);

    this.elements.line.classList.add('line');

    this.elements.remove.classList.add('remove');
    this.elements.remove.setAttribute('data-remove-toggle-id', this.data.id);
  }

  setDoneComponent() {
    this.elements.doneUndo.classList.add('done-undo');
    this.elements.doneUndo.textContent = 'Done';
    this.elements.doneUndoIcon.classList.add('fi', 'fi-bs-check-circle');
  }

  setRemoveComponent() {
    this.elements.remove.classList.add('remove');
    this.elements.removeParagrapgh.textContent = 'Remove';
    this.elements.removeIcon.classList.add('fi', 'fi-bs-trash');
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

    this.elements.remove.append(
      this.elements.removeParagrapgh,
      this.elements.removeIcon
    );

    this.elements.done.append(
      this.elements.doneUndo,
      this.elements.doneUndoIcon
    );

    this.elements.menu.append(
      this.elements.done,
      this.elements.line,
      this.elements.remove
    );

    this.elements.toggleMenuBook.append(this.elements.toggleIcon);

    this.elements.toggleMenuBookContainer.append(
      this.elements.toggleMenuBook,
      this.elements.menu
    );

    this.elements.bookCards.append(
      this.elements.toggleMenuBookContainer,
      this.elements.bookCover,
      this.elements.descriptionWrapper
    );

    this.wrapper.appendChild(this.elements.bookCards);
  }

  rederCard() {
    this.createBookCardElements();
    this.setAttributesManager();
    this.assembleElements();
  }
}
