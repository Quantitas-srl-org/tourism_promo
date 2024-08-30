import * as focusTrap from 'focus-trap';

/**
 * DOM elements
 */
const menuToggleBtn = document.querySelector('#menu-toggle-btn'), siteHeader = document.querySelector('.site-header'),
  icon = menuToggleBtn.querySelector('span'),
  imageStrategy = document.querySelector('.scroll-animation-strategy').querySelector('img'),
  slider = document.querySelector('.slider'),
  accordionBtn = document.querySelectorAll('.accordion-btn');

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
      timeline: new ScrollTimeline({
        source: document.documentElement,
      })
    });
    imageStrategy.animate({transform: ['rotate(0)', 'rotate(360deg)']}, {
      timeline: new ScrollTimeline({
        source: document.documentElement,
      })
    });
  },
  accordion: () => {
    accordionBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const panelId = btn.getAttribute('aria-controls'),
          id = btn.getAttribute('data-id'),
          panel = document.getElementById(panelId),
          icon = btn.querySelector('.material-symbols-outlined'),
          wrapper = document.querySelector('.accordion-wrapper-' + id);
        console.log(wrapper)
        panel.classList.toggle('hidden');
        const isOpen = !panel.classList.contains('hidden');
        btn.setAttribute('aria-expanded', isOpen.toString());
        if (isOpen) {
          wrapper.classList.add('border-2')
          icon.innerHTML = 'keyboard_arrow_up'
        } else {
          wrapper.classList.remove('border-2')
          icon.innerHTML = 'keyboard_arrow_down'
        }
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  header.siteMenuToggle();
  header.keyPressEscToCloseSiteMenu();
  header.setStickyHeaderStyle();
  components.scrollDrivenAnimations();
  components.accordion();
})
