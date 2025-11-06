const navbar_toggle = document.getElementById("mobile-menu");
const navbar_menu = document.getElementById("navbar_menu");

navbar_toggle.addEventListener("click", () => {
  navbar_toggle.classList.toggle("active");
  navbar_menu.classList.toggle("active");
});
