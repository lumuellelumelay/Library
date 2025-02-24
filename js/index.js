import { jsonHandler } from './dataHandler.js';
import BookCardModule from './bookCardModule.js';
import Library from './library.js';

// const toggleMenu = document.querySelector('.toggle-menu-book');
// const menu = document.querySelector('.menu');

// toggleMenu.addEventListener('click', (e) => {
//   e.stopPropagation();
//   menu.classList.toggle('active');
// });

// document.addEventListener('click', (e) => {
//   const menuActive = document.querySelector('.menu.active');
//   if (menuActive) {
//     menu.classList.remove('active');
//   }
// });

class toggleMenuModule {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.initialize();
  }

  initialize() {
    this.wrapper.addEventListener;
  }

  toggleMenuHandler(e) {
    const toggleMenu = e.target.closest('.toggle-menu-book');

    if (!toggleMenu) {
    }
  }
}

const wrapper = document.querySelector('.wrapper');

wrapper.addEventListener('click', (e) => {
  const toggleMenu = e.target.closest('.toggle-menu-book');
  if (toggleMenu) {
    e.stopPropagation();
    const menu = toggleMenu
      .closest('.toggle-menu-book-container')
      .querySelector('.menu');

    const isActive = menu.classList.contains('active');
    menu.classList.add('active');
  } else {
    document.querySelectorAll('.menu.active').forEach((menu) => {
      menu.classList.remove('active');
    });
  }
});
