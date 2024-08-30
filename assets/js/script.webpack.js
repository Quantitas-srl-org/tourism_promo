import * as focusTrap from 'focus-trap';

/**
 * DOM elements
 */
const menuToggleBtn = document.querySelector('#menu-toggle-btn'), siteHeader = document.querySelector('.site-header'),
  icon = menuToggleBtn.querySelector('span'),
  imageStrategy = document.querySelector('.scroll-animation-strategy').querySelector('img'),
  imageScheme = document.querySelector('.scroll-animation-scheme').querySelector('span'),
  slider = document.querySelector('.slider');

const trap = focusTrap.createFocusTrap('#site-header', {});

/**
 * Header
 */
const header = {
  siteMenuClose: () => {
    icon.innerHTML = 'menu';
    menuToggleBtn.setAttribute('aria-label', 'Apri il menù');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    trap.deactivate();
  }, siteMenuToggle: () => {
    menuToggleBtn.addEventListener('click', () => {
      siteHeader.classList.toggle('is-open');
      if (siteHeader.classList.contains('is-open')) {
        icon.innerHTML = 'close';
        menuToggleBtn.setAttribute('aria-label', 'Chiudi il menù');
        menuToggleBtn.setAttribute('aria-expanded', 'true');
        trap.activate();
      } else {
        header.siteMenuClose();
      }
    })
  }, keyPressEscToCloseSiteMenu: () => {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        siteHeader.classList.remove('is-open');
        header.siteMenuClose();
      }
    })
  }, setStickyHeaderStyle: () => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 32) {
        siteHeader.classList.add('is-sticky');
      } else {
        siteHeader.classList.remove('is-sticky');
      }
    })
    document.addEventListener('load', () => {
      if (window.scrollY > 32) {
        siteHeader.classList.add('is-sticky');
      }
    })
  }
}

const components = {
  scrollDrivenAnimations: () => {
    slider.animate({transform: ['translateX(0)', 'translateX(-600px)']}, {
      fill: 'both', timeline: new ScrollTimeline({
        source: document.documentElement,
      })
    });
    imageStrategy.animate({transform: ['rotate(0)', 'rotate(360deg)']}, {
      fill: 'both', timeline: new ScrollTimeline({
        source: document.documentElement,
      })
    });
   /*
    imageScheme.animate({transform: ['translateY(0)', 'translateY(100px)']}, {
      fill: 'both', timeline: new ScrollTimeline({
        source: document.documentElement,
      })
    });
    */
  }
}

document.addEventListener('DOMContentLoaded', () => {
  header.siteMenuToggle();
  header.keyPressEscToCloseSiteMenu();
  header.setStickyHeaderStyle();
  components.scrollDrivenAnimations();
})