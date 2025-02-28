import { jsonHandler } from './dataHandler.js';
import { NewBookHandler } from './newBookHandler.js';
// import BookCardModule from './bookCardModule.js';
// import Library from './library.js';

import toggleMenuModule from './toggleMenu.js';

document.addEventListener('DOMContentLoaded', () => {
  new toggleMenuModule('.wrapper');
  new NewBookHandler('.add-book');
});
