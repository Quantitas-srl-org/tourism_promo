/**
 * DOM elements
 */
const menuToggleBtn = document.querySelector('#menu-toggle-btn'),
  siteHeader = document.querySelector('.site-header'),
  icon = menuToggleBtn.querySelector('span'),
  slider = document.querySelector('.slider');

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
        menuToggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        icon.innerHTML = 'menu';
        menuToggleBtn.setAttribute('aria-label', 'Apri il menù');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      }
    })
  },
  keyPressEscToCloseMenu: () => {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        siteHeader.classList.remove('is-open');
        icon.innerHTML = 'menu';
        menuToggleBtn.setAttribute('aria-label', 'Apri il menù');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      }
    })
  },
  setStickyHeaderStyle: () => {
    document.addEventListener('scroll', event => {
      if (window.scrollY > 32) {
        siteHeader.classList.add('is-sticky');
      } else {
        siteHeader.classList.remove('is-sticky');
      }
    })
    document.addEventListener('load', event => {
      if (window.scrollY > 32) {
        siteHeader.classList.add('is-sticky');
      }
    })
  }
}

const components = {
  scrollDrivenAnimation: () => {
    slider.animate(
      {transform: ['translateX(0)', 'translateX(-600px)']},
      {
        fill: 'both',
        timeline: new ScrollTimeline({
          source: document.documentElement,
        }),
        rangeStart: new CSSUnitValue(0, 'px'),
        rangeEnd: new CSSUnitValue(1200, 'px'),
      });
  },
}

header.siteMenuToggle();
header.keyPressEscToCloseMenu();
header.setStickyHeaderStyle();
components.scrollDrivenAnimation();
