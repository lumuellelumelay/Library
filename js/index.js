import { testFunction, jsonHandler } from './dataHandler.js';
// import BookCardModule from './bookCardModule.js';
// import Library from './library.js';

import toggleMenuModule from './toggleMenu.js';

document.addEventListener('DOMContentLoaded', () => {
  new toggleMenuModule('.wrapper');
});

// TEST FUNCTION
console.log(testFunction(1, 2, 3));
console.log(testFunction(1, 2));
