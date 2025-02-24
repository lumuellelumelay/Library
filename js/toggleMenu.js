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

  doneToggleHandler(e, doneToggleId) {
    e.stopPropagation();
    // function to handle progress bars

    const menu = this.bookCardHandler(doneToggleId);
    menu.classList.remove('active');
  }

  removeToggleHandler(e, removeToggleId) {
    e.stopPropagation();
    // function to handle remove book card

    const menu = this.bookCardHandler(removeToggleId);
    menu.classList.remove('active');
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
