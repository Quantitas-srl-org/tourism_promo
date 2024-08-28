/**
 * DOM elements
 */const menuToggleBtn=document.querySelector("#menu-toggle-btn"),siteHeader=document.querySelector(".site-header"),icon=menuToggleBtn.querySelector("span"),slider=document.querySelector(".slider"),header={siteMenuToggle:()=>{menuToggleBtn.addEventListener("click",()=>{siteHeader.classList.toggle("is-open"),siteHeader.classList.contains("is-open")?(icon.innerHTML="close",menuToggleBtn.setAttribute("aria-label","Chiudi il men\xF9"),menuToggleBtn.setAttribute("aria-expanded","true")):(icon.innerHTML="menu",menuToggleBtn.setAttribute("aria-label","Apri il men\xF9"),menuToggleBtn.setAttribute("aria-expanded","false"))})},keyPressEscToCloseMenu:()=>{document.addEventListener("keypress",a=>{"Escape"===a.key&&siteHeader.classList.remove("is-open"),console.log(a.key)})},setStickyHeaderStyle:()=>{document.addEventListener("scroll",()=>{32<window.scrollY?siteHeader.classList.add("is-sticky"):siteHeader.classList.remove("is-sticky")}),document.addEventListener("load",()=>{32<window.scrollY&&siteHeader.classList.add("is-sticky")})}},components={scrollDrivenAnimation:()=>{slider.animate({transform:["translateX(0)","translateX(-600px)"]},{fill:"both",timeline:new ScrollTimeline({source:document.documentElement}),rangeStart:new CSSUnitValue(0,"px"),rangeEnd:new CSSUnitValue(1200,"px")})}};/**
 * Header
 */header.siteMenuToggle(),header.keyPressEscToCloseMenu(),header.setStickyHeaderStyle(),components.scrollDrivenAnimation();
