'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { 
    sidebar.classList.toggle("active");
    
    // Rotar el ícono suavemente
    const icon = sidebarBtn.querySelector("ion-icon");
    if (icon) {
      if (sidebar.classList.contains("active")) {
        icon.style.transform = "rotate(180deg)";
      } else {
        icon.style.transform = "rotate(0deg)";
      }
      icon.style.transition = "transform 0.4s ease";
    }
  });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (
  testimonialsItem.length &&
  modalContainer &&
  modalCloseBtn &&
  overlay &&
  modalImg &&
  modalTitle &&
  modalText
) {
  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }

      if (title) {
        modalTitle.innerHTML = title.innerHTML;
      }

      if (text) {
        modalText.innerHTML = text.innerHTML;
      }

      testimonialsModalFunc();

    });

  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
if (select && selectValue && selectItems.length) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
if (filterBtn.length && selectValue) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }

      this.classList.add("active");
      lastClickedBtn = this;

    });

  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn && formInputs.length) {
  // add event to all form input field
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
  
  // Enviar formulario a WhatsApp
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const fullname = form.querySelector('[name="fullname"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;
    
    // Número de WhatsApp (el mismo del sidebar: +57 301 248 5766)
    const phoneNumber = "573012485766";
    
    // Crear el mensaje formateado
    const whatsappMessage = `*Nuevo mensaje de contacto*%0A%0A*Nombre:* ${encodeURIComponent(fullname)}%0A*Email:* ${encodeURIComponent(email)}%0A*Mensaje:*%0A${encodeURIComponent(message)}`;
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    
    // Abrir WhatsApp en nueva ventana
    window.open(whatsappURL, '_blank');
    
    // Limpiar formulario
    form.reset();
    formBtn.setAttribute("disabled", "");
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const normalizeKey = (value) => (
  (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
);

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    const targetPage = normalizeKey(this.dataset.navLink);
    let matched = false;
    
    for (let j = 0; j < pages.length; j++) {
      const isTarget = normalizeKey(pages[j].dataset.page) === targetPage;
      pages[j].classList.toggle("active", isTarget);
      if (isTarget) {
        matched = true;
      }
    }
    
    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.toggle("active", navigationLinks[k] === this);
    }
    
    if (!matched && pages.length) {
      pages[0].classList.add("active");
      if (navigationLinks.length) {
        navigationLinks[0].classList.add("active");
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

  });
}