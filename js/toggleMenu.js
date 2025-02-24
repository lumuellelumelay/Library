export default class ToggleMenuModule {
  constructor(wrapper) {
    this.wrapper = document.querySelector(wrapper);
    this.initialize();
  }

  initialize() {
    if (!this.wrapper) return;

    this.wrapper.addEventListener('click', (e) => {
      const toggleMenu = e.target.closest('.toggle-menu-book');

      if (toggleMenu) {
        const toggleMenuId = toggleMenu.closest('.toggle-menu-book-container')
          .dataset.menuId;

        this.toggleMenuHandler(e, toggleMenuId);
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

    const bookCard = document.querySelector(`[data-book-id="${toggleMenuId}"]`);
    const menu = bookCard.querySelector('.menu');

    this.wrapper.querySelectorAll('.menu.active').forEach((activeMenu) => {
      const activeMenuCheck = activeMenu.closest('.book-cards');

      if (activeMenuCheck.dataset.bookId !== toggleMenuId) {
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
