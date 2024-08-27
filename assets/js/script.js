/**
 * DOM elements
 */const menuToggleBtn=document.querySelector("#menu-toggle-btn"),siteHeader=document.querySelector(".site-header"),icon=menuToggleBtn.querySelector("span"),header={siteMenuToggle:()=>{menuToggleBtn.addEventListener("click",()=>{siteHeader.classList.toggle("is-open"),siteHeader.classList.contains("is-open")?(icon.innerHTML="close",menuToggleBtn.setAttribute("aria-label","Chiudi il men\xF9")):(icon.innerHTML="menu",menuToggleBtn.setAttribute("aria-label","Apri il men\xF9"))})},keyPressEscToCloseMenu:()=>{document.addEventListener("keypress",a=>{"Escape"===a.key&&siteHeader.classList.remove("is-open"),console.log(a.key)})}};/**
 * Header
 *//*const components = {
  componentsFunction: () => {
    console.log('component works!')
  },
}*/header.siteMenuToggle(),header.keyPressEscToCloseMenu();
