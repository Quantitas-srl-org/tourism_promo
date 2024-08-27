/**
 * DOM elements
 */
const menuToggleBtn = document.querySelector('#menu-toggle-btn'),
  siteHeader = document.querySelector('.site-header'),
  icon = menuToggleBtn.querySelector('span');

/**
 * Header
 */
const header = {
  siteMenuToggle: () => {
    menuToggleBtn.addEventListener('click', () => {
      siteHeader.classList.toggle('is-open');
      if (siteHeader.classList.contains('is-open')) {
        icon.innerHTML = 'close';
        menuToggleBtn.setAttribute('aria-label', 'Chiudi il menù');
      } else {
        icon.innerHTML = 'menu';
        menuToggleBtn.setAttribute('aria-label', 'Apri il menù');
      }
    })
  },
  keyPressEscToCloseMenu: () => {
    document.addEventListener('keypress', (event) => {
      if (event.key === 'Escape') {
        siteHeader.classList.remove('is-open');
      }
      console.log(event.key)
    })
  }
}

/*const components = {
  componentsFunction: () => {
    console.log('component works!')
  },
}*/

header.siteMenuToggle();
header.keyPressEscToCloseMenu();
