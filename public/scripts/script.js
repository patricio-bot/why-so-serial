let navMenu = document.querySelector(".nav-menu");
let navBtn = document.querySelector(".nav-button");
let itemsNav = document.querySelector(".nav-menu a");
let burgerLines = document.querySelector(".lines");
navBtn.addEventListener("click", () => {
    navBtn.classList.toggle("show-menu");
    burgerLines.classList.toggle("close");
    navMenu.classList.toggle("show-menu");
});
