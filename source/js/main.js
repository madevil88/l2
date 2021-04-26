'use strict';

(function () {
  const pageBody = document.querySelector('body');
  const navMain = pageBody.querySelector('.page-header__main-nav');
  const navToggle = pageBody.querySelector('.page-header__main-nav-toggle');
  const menuItems = pageBody.querySelectorAll('.page-header__site-menu-item');

  const showMenu = () => {
    if (navMain.classList.contains('page-header__main-nav--closed')) {
        navMain.classList.remove('page-header__main-nav--closed');
        pageBody.style.overflow = 'hidden';
      } else {
        navMain.classList.add('page-header__main-nav--closed');
        pageBody.style.overflow = 'scroll';
      }
  };

  if (navMain && navToggle) {
    navMain.classList.remove('page-header__main-nav--nojs')
    navMain.classList.add('page-header__main-nav--closed');

    navToggle.addEventListener('click', showMenu);

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', showMenu);
    });
  }
})();
