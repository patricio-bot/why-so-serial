var zodiacBtn = document.querySelector(".main-zodiac")
var zbuttons = document.querySelector(".zodiac-btns")
var alphaBtn = document.querySelector(".main-alpha")
var abuttons = document.querySelector(".alpha-btns")

let navMenu = document.querySelector(".nav-menu");
let navBtn = document.querySelector(".nav-button");
let itemsNav = document.querySelector(".nav-menu a");
let burgerLines = document.querySelector(".lines");

navBtn.addEventListener("click", () => {
    navBtn.classList.toggle("show-menu");
    burgerLines.classList.toggle("close");
    navMenu.classList.toggle("show-menu");
});

if (zodiacBtn) {
    zodiacBtn.addEventListener("click", () => {
        zbuttons.classList.toggle("show-list")
        abuttons.classList.remove("show-list")
    })
}
if (alphaBtn) {
    alphaBtn.addEventListener("click", () => {
        abuttons.classList.toggle("show-list")
        zbuttons.classList.remove("show-list")
    })
}





