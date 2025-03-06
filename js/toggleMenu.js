import { progressHandler, removeBookData } from './dataHandler.js';

export default class ToggleMenuModule {
  constructor(wrapper) {
    this.wrapper = document.querySelector(wrapper);
    this.initialize();
  }

  initialize() {
    if (!this.wrapper) return;

    this.wrapper.addEventListener('click', (e) => {
      const toggleMenu = e.target.closest('.toggle-menu-book');
      const doneToggle = e.target.closest('.done');
      const removeToggle = e.target.closest('.remove');

      if (toggleMenu) {
        const toggleMenuId = toggleMenu.closest('.toggle-menu-book-container')
          .dataset.menuId;

        this.toggleMenuHandler(e, toggleMenuId);
      } else if ((e, doneToggle)) {
        const doneToggleId = doneToggle.dataset.doneToggleId;

        this.doneToggleHandler(e, doneToggleId);
      } else if ((e, removeToggle)) {
        const removeToggleId = removeToggle.dataset.removeToggleId;

        this.removeToggleHandler(e, removeToggleId);
      } else {
        this.checkOutsideToggle(e);
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.wrapper')) {
        this.closeAllMenus();
      }
    });
  }

  checkOutsideToggle(e) {
    if (!e.target.closest('.menu')) {
      this.closeAllMenus();
    }
  }

  toggleMenuHandler(e, toggleMenuId) {
    e.stopPropagation();

    // const bookCard = document.querySelector(`[data-book-id="${toggleMenuId}"]`);
    // const menu = bookCard.querySelector('.menu');
    const menu = this.bookCardHandler(toggleMenuId);

    this.wrapper.querySelectorAll('.menu.active').forEach((activeMenu) => {
      const activeMenuCheck = activeMenu.closest('.book-cards');

      if (activeMenuCheck.dataset.bookId !== toggleMenuId) {
        activeMenu.classList.remove('active');
      }
    });

    menu.classList.toggle('active');
  }

  // getting the progress from the book
  getProgress(bookId) {
    const progress = progressHandler(bookId);
    return progress;
  }

  // setting the progress from the book
  setProgress(bookId, progress, isToggled) {
    // how to set the progress without lossing the data and changing it on both UI and data?
    const bookToggledId = document
      .querySelector(`[data-book-id="${bookId}"]`)
      .querySelector('.description-wrapper');
    const progressSvg = bookToggledId.querySelector('#progress--circle');
    const progressText = bookToggledId.querySelector('#progress--text');
    progressText.textContent = `${progress}%`;
    progressSvg.style.strokeDashoffset = 100 - progress;
    if (isToggled === 'true') {
      progressSvg.style.stroke = 'rgb(200 183 173)';
    } else {
      progressSvg.style.stroke = 'rgb(154 105 113)';
    }
  }

  doneToggle(bookId, isToggled, doneToggle) {
    const doneUndo = doneToggle.querySelector('.done-undo');
    const doneUndoIcon = doneToggle.querySelector('.fi');
    bookId = parseInt(bookId);

    if (isToggled === 'true') {
      this.setProgress(bookId, 100, isToggled);
      setTimeout(() => {
        doneUndo.textContent = 'Undo';
        doneUndoIcon.classList.remove('fi', 'fi-bs-check-circle');
        doneUndoIcon.classList.add('fi', 'fi-bs-rotate-left');
      }, 300);
    } else {
      const progress = this.getProgress(bookId);
      this.setProgress(bookId, progress, isToggled);
      setTimeout(() => {
        doneUndo.textContent = 'Done';
        doneUndoIcon.classList.remove('fi', 'fi-bs-rotate-left');
        doneUndoIcon.classList.add('fi', 'fi-bs-check-circle');
      }, 300);
    }
  }

  doneToggleHandler(e, doneToggleId) {
    e.stopPropagation();
    // function to handle progress bars
    // checking if the done toggle is complete
    const menu = this.bookCardHandler(doneToggleId);
    const doneToggle = menu.querySelector('.done');
    const isToggled = this.toggleHandler(doneToggle);

    this.doneToggle(doneToggleId, isToggled, doneToggle);
    menu.classList.remove('active');
  }

  // bookCard.remove();
  removeBook(bookId) {
    bookId = bookId.toString();

    this.wrapper.querySelectorAll('.book-cards').forEach((bookCard) => {
      const bookCardId = bookCard.dataset.bookId;
      if (bookCardId === bookId) {
        bookCard.remove();
        removeBookData(bookId);
      }
    });
  }

  removeToggle(bookId, isToggled, removeToggle) {
    bookId = parseInt(bookId);
    if (isToggled === 'true') {
      // TODO: create a dialog comfirmation to remove the book
      this.removeBook(bookId);
    }
  }

  removeToggleHandler(e, removeToggleId) {
    e.stopPropagation();
    // function to handle remove book card
    const menu = this.bookCardHandler(removeToggleId);
    const removeToggle = menu.querySelector('.remove');
    const isToggled = this.toggleHandler(removeToggle);

    this.removeToggle(removeToggleId, isToggled, removeToggle);
    menu.classList.remove('active');
  }

  toggleHandler(isToggled) {
    if (isToggled.getAttribute('isToggled') === 'false') {
      isToggled.setAttribute('isToggled', 'true');
      return 'true';
    } else {
      isToggled.setAttribute('isToggled', 'false');
      return 'false';
    }
  }

  bookCardHandler(bookCardId) {
    const bookCard = document.querySelector(`[data-book-id="${bookCardId}"]`);
    const menu = bookCard.querySelector('.menu');

    return menu;
  }

  closeAllMenus() {
    this.wrapper.querySelectorAll('.menu.active').forEach((menu) => {
      menu.classList.remove('active');
    });
  }
}
