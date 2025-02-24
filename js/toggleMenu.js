export default class ToggleMenuModule {
  constructor(wrapper) {
    this.wrapper = document.querySelector(wrapper);
    this.initialize();
  }

  initialize() {
    if (!this.wrapper) return;

    this.wrapper.addEventListener('click', (e) => {
      const toggleMenu = e.target.closest('.book-cards');

      if (toggleMenu) {
        const bookCardId = toggleMenu.dataset.bookId;
        this.toggleMenuHandler(e, bookCardId);
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

  toggleMenuHandler(e, bookCardId) {
    e.stopPropagation();

    const bookCard = document.querySelector(`[data-book-id="${bookCardId}"]`);
    const menu = bookCard.querySelector('.menu');

    this.wrapper.querySelectorAll('.menu.active').forEach((activeMenu) => {
      const activeMenuCheck = activeMenu.closest('.book-cards');

      if (activeMenuCheck.dataset.bookId !== bookCardId) {
        activeMenu.classList.remove('active');
      }
    });

    menu.classList.toggle('active');
  }

  closeAllMenus() {
    this.wrapper.querySelectorAll('.menu.active').forEach((menu) => {
      menu.classList.remove('active');
    });
  }
}
