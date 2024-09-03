import * as focusTrap from 'focus-trap';

/**
 * DOM elements
 */
const menuToggleBtn = document.querySelector('#menu-toggle-btn'), siteHeader = document.querySelector('.site-header'),
  icon = menuToggleBtn.querySelector('span'),
  imageStrategy = document.querySelector('.scroll-animation-strategy').querySelector('img'),
  slider = document.querySelector('.slider'), accordionBtn = document.querySelectorAll('.accordion-btn'),
  contactForm = document.querySelector('#contact-form'),
  inputCompanyName = document.querySelector('#input-company-name'),
  inputEmail = document.querySelector('#input-email'),
  inputPrivacy = document.querySelector('#input-privacy'),
  fieldset = contactForm.querySelector('fieldset'),
  formSuccess = document.querySelector('#form-success');

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
  },
  siteMenuToggle: () => {
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
  },
  keyPressEscToCloseSiteMenu: () => {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        siteHeader.classList.remove('is-open');
        header.siteMenuClose();
      }
    })
  },
  setStickyHeaderStyle: () => {
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
        const panelId = btn.getAttribute('aria-controls'), id = btn.getAttribute('data-id'),
          panel = document.getElementById(panelId), icon = btn.querySelector('.material-symbols-outlined'),
          wrapper = document.querySelector('.accordion-wrapper-' + id);
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

const form = {
  submitAction: () => {
    if (!contactForm) return false;
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.validateForm()) {
        const payload = {
          companyName: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          smartTourismDestination: '',
          privacy: '',
        }
        const inputs = fieldset.elements;
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].nodeName === "INPUT") {
            switch (inputs[i].name) {
              case 'email':
                payload.email = inputs[i].value;
                break;
              case 'phone':
                payload.phone = inputs[i].value;
                break;
              case 'company-name':
                payload.companyName = inputs[i].value;
                break;
              case 'first-name':
                payload.firstName = inputs[i].value;
                break;
              case 'last-name':
                payload.lastName = inputs[i].value;
                break;
              case 'toggle':
                payload.smartTourismDestination = inputs[i].checked;
                break;
              case 'privacy':
                payload.privacy = inputs[i].checked;
                break;
            }
          }
        }

        fieldset.classList.add('hidden')
        contactForm.querySelector('button').classList.add('hidden')
        formSuccess.removeAttribute('hidden')
        formSuccess.removeAttribute('style')
        console.log(payload);
        // TODO: send data somewhere
      }
    })
  },
  setInvalid: (input = null, errorHint = 'Questo campo è obbligatorio') => {
    const errorElement = document.createElement('span'),
      errorID = 'error-' + input.id;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-errormessage', errorID);
    input.classList.add('is-invalid');
    errorElement.innerHTML = errorHint;
    errorElement.id = errorID;
    errorElement.classList.add('error-hint');
    input.parentElement.append(errorElement);
  },
  setValid: (input) => {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-errormessage');
    input.classList.remove('is-invalid');
    const errorHint = document.querySelector('#error-' + input.id)
    if (errorHint) errorHint.remove();
  },
  validateEmail: (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  },
  validateForm: () => {
    form.setValid(inputEmail)
    form.setValid(inputCompanyName)
    form.setValid(inputPrivacy)
    if (
      inputCompanyName.value === '' ||
      inputPrivacy.checked === false ||
      inputEmail.value === '' ||
      !form.validateEmail(inputEmail.value)
    ) {
      if (inputCompanyName.value === '') form.setInvalid(inputCompanyName)
      if (inputPrivacy.checked === false) form.setInvalid(inputPrivacy)
      if (inputEmail.value === '') form.setInvalid(inputEmail)
      else if (!form.validateEmail(inputEmail.value)) form.setInvalid(inputEmail, 'Questa non è una email valida')
      return false;
    }
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  header.siteMenuToggle();
  header.keyPressEscToCloseSiteMenu();
  header.setStickyHeaderStyle();
  components.scrollDrivenAnimations();
  components.accordion();
  form.submitAction();
})
