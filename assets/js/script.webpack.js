import * as focusTrap from 'focus-trap';

/**
 * DOM elements
 */
const
  endpoint = "https://www.quantitas.it/forms/turismo-quantitas-it/carrier.php",
  menuToggleBtn = document.querySelector('#menu-toggle-btn'),
  siteHeader = document.querySelector('.site-header'),
  siteHeaderLinks = siteHeader ? siteHeader.querySelector('ul').querySelectorAll('a') : null,
  icon = menuToggleBtn.querySelector('span'),
  imageStrategyWrapper = document.querySelector('.scroll-animation-strategy'),
  imageStrategy = imageStrategyWrapper ? imageStrategyWrapper.querySelector('img') : null,
  slider = document.querySelector('.slider'),
  accordionBtn = document.querySelectorAll('.accordion-btn'),
  contactForm = document.querySelector('#contact-form'),
  inputCompanyName = document.querySelector('#input-company-name'),
  inputEmail = document.querySelector('#input-email'),
  inputPrivacy = document.querySelector('#input-privacy'),
  fieldset = contactForm ? contactForm.querySelector('fieldset') : null,
  formSuccess = document.querySelector('#form-success'),
  formFailure = document.querySelector('#form-failure'),
  videoPlayer = document.querySelector('video');

const trap = focusTrap.createFocusTrap('#site-header', {});

/**
 * Header
 */
const header = {
  siteMenuClose: () => {
    icon.innerHTML = 'menu';
    const labelObj = menuToggleBtn.dataset.labels ? JSON.parse(menuToggleBtn.dataset.labels) : null;
    const label = labelObj ? labelObj.open : 'Apri il menù';
    menuToggleBtn.setAttribute('aria-label', label);
    menuToggleBtn.setAttribute('title', label);
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    trap.deactivate();
  },
  siteMenuToggle: () => {
    menuToggleBtn.addEventListener('click', () => {
      siteHeader.classList.toggle('is-open');
      if (siteHeader.classList.contains('is-open')) {
        icon.innerHTML = 'close';
        const labelObj = menuToggleBtn.dataset.labels ? JSON.parse(menuToggleBtn.dataset.labels) : null;
        const label = labelObj ? labelObj.close : 'Chiudi il menù';
        menuToggleBtn.setAttribute('aria-label', label);
        menuToggleBtn.setAttribute('title', label);
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
  clickOnLinkToCloseSiteMenu: () => {
    if (!siteHeaderLinks) return
    siteHeaderLinks.forEach(link => {
      link.addEventListener('click', () => {
        siteHeader.classList.remove('is-open');
        header.siteMenuClose()
      })
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
  },
  fixLangSwitcher: () => {
    const langBtn = document.querySelectorAll('.lang-switcher');
    langBtn.forEach(lang => {
      const href = lang.dataset.ref
      lang.setAttribute('href', href);
    })
  }
}

const components = {
  scrollDrivenAnimations: () => {
    if (slider) {
      slider.animate({transform: ['translateX(0)', 'translateX(-600px)']}, {
        timeline: new ScrollTimeline({
          source: document.documentElement,
        })
      });
    }
    if (imageStrategy) {
      imageStrategy.animate({transform: ['rotate(0)', 'rotate(360deg)']}, {
        timeline: new ScrollTimeline({
          source: document.documentElement,
        })
      });
    }
  },
  accordion: () => {
    if (!accordionBtn) return;
    accordionBtn.forEach(btn => {
      btn.addEventListener('click', () => {
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
  },
  videoPlayer: () => {
    if (!videoPlayer) return;

    const observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
          videoPlayer.play().then(() => {});
        } else {
          if (!videoPlayer.paused) {
              videoPlayer.pause();
          }
        }
    }, null);

    observer.observe(videoPlayer);
  }
}

const form = {
  getErrorStrings: (mail = false) => {
    if (!contactForm) return;
    const lang = contactForm.dataset.lang;
    const errorObj = JSON.parse( contactForm.dataset.errors);
    return mail ? errorObj.mail[lang] : errorObj.default[lang];
  },
  submitAction: () => {
    if (!contactForm) return;
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.validateForm()) {
        const button = contactForm.querySelector('button');
        button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg> invio'
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

        fetch(endpoint, {
          method: "post",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
          .then(response => {
            fieldset.classList.add('hidden')
            contactForm.querySelector('button').classList.add('hidden')
            formSuccess.removeAttribute('hidden')
            formSuccess.removeAttribute('style')
            return response.text();
          })
          .then(txt => {
            console.info(txt);
          })
          .catch(function(err) {
            fieldset.classList.add('hidden')
            contactForm.querySelector('button').classList.add('hidden')
            formFailure.removeAttribute('hidden')
            formFailure.removeAttribute('style')
            console.error("Failed to fetch page: ", err);
          });
      }
    })
  },
  setInvalid: (input = null, errorHint = form.getErrorStrings()) => {
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
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
      else if (!form.validateEmail(inputEmail.value)) form.setInvalid(inputEmail, form.getErrorStrings(true))
      return false;
    }
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  header.siteMenuToggle();
  header.keyPressEscToCloseSiteMenu();
  header.setStickyHeaderStyle();
  header.clickOnLinkToCloseSiteMenu();
  header.fixLangSwitcher();
  components.scrollDrivenAnimations();
  components.accordion();
  components.videoPlayer();
  form.submitAction();
})
