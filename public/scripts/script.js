var zodiacBtn = document.querySelector(".main-zodiac")
var zbuttons = document.querySelector(".zodiac-btns")
var alphaBtn = document.querySelector(".main-alpha")
var abuttons = document.querySelector(".alpha-btns")

zodiacBtn.addEventListener("click", () => {
  zbuttons.classList.toggle("show-list")
  abuttons.classList.remove("show-list")
})

alphaBtn.addEventListener("click", () => {
  abuttons.classList.toggle("show-list")
  zbuttons.classList.remove("show-list")
})