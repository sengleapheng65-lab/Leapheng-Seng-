const navbarToggle = document.getElementById("mobile-menu");
const navbarMenu = document.getElementById("navbar_menu");
const themeToggle = document.getElementById("theme-toggle");

navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLightMode = document.body.classList.contains("light-mode");

  themeToggle.textContent = isLightMode ? "🌙" : "☀️";

  localStorage.setItem("theme", isLightMode ? "light" : "dark");
});
