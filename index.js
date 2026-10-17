/* ===================================
   SELECT ELEMENTS
   =================================== */

const navbar = document.querySelector(".navbar");
const navbarToggle = document.getElementById("mobile-menu");
const navbarMenu = document.getElementById("navbar_menu");
const themeToggle = document.getElementById("theme-toggle");
const typingName = document.getElementById("typing-name");

/* ===================================
   MOBILE MENU
   =================================== */

if (navbarToggle && navbarMenu) {
  navbarToggle.setAttribute("aria-expanded", "false");

  navbarToggle.addEventListener("click", () => {
    const isMenuOpen = navbarMenu.classList.toggle("active");

    navbarToggle.classList.toggle("active", isMenuOpen);
    navbarToggle.setAttribute("aria-expanded", isMenuOpen);
  });

  /* Close menu after clicking a navigation link */

  const navLinks = navbarMenu.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarToggle.classList.remove("active");
      navbarMenu.classList.remove("active");
      navbarToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Close menu by pressing Escape */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navbarToggle.classList.remove("active");
      navbarMenu.classList.remove("active");
      navbarToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ===================================
   DARK AND LIGHT MODE
   =================================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");

  if (themeToggle) {
    themeToggle.textContent = "🌙";
  }
} else if (themeToggle) {
  themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLightMode ? "🌙" : "☀️";

    localStorage.setItem("theme", isLightMode ? "light" : "dark");
  });
}

/* ===================================
   NAVBAR SCROLL BEHAVIOR
   =================================== */

let previousScrollPosition = window.scrollY;

function updateNavbar() {
  if (!navbar) {
    return;
  }

  const currentScrollPosition = Math.max(window.scrollY, 0);

  const scrollDifference = currentScrollPosition - previousScrollPosition;

  /* Connected and visible at the top */

  if (currentScrollPosition <= 80) {
    navbar.classList.remove("scrolled");
    navbar.classList.remove("nav-hidden");
  } else {
    /* Separate the navbar after leaving the top */

    navbar.classList.add("scrolled");

    /* Hide when scrolling down */

    if (scrollDifference > 5) {
      navbar.classList.add("nav-hidden");
    }

    /* Show when scrolling up */

    if (scrollDifference < -5) {
      navbar.classList.remove("nav-hidden");
    }
  }

  previousScrollPosition = currentScrollPosition;
}

window.addEventListener("scroll", updateNavbar, {
  passive: true,
});

updateNavbar();

/* ===================================
   NAME TYPING ANIMATION
   =================================== */

const fullName = "Leapheng Seng.";

let characterIndex = 0;
let isDeleting = false;

function typeName() {
  if (!typingName) {
    return;
  }

  typingName.textContent = fullName.substring(0, characterIndex);

  let typingSpeed = 110;

  if (!isDeleting && characterIndex < fullName.length) {
    characterIndex++;
  } else if (!isDeleting && characterIndex === fullName.length) {
    isDeleting = true;
    typingSpeed = 1800;
  } else if (isDeleting && characterIndex > 0) {
    characterIndex--;
    typingSpeed = 65;
  } else {
    isDeleting = false;
    typingSpeed = 500;
  }

  window.setTimeout(typeName, typingSpeed);
}

/* Show full name for users who disable animations */

if (typingName) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    typingName.textContent = fullName;
  } else {
    typeName();
  }
}
