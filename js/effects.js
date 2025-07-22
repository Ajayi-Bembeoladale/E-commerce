// SLIDER
const track = document.getElementById("slider-track");
const slides = track.children;
const totalSlides = slides.length;
const slideWidth = () => slides[0].clientWidth;

const dotContainer = document.getElementById("dots");
const actualSlides = totalSlides - 2; // remove 2 clones
let currentIndex = 1;
let interval;

// Hamburger menu logic
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
});
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});
// Optional: close menu on outside click
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) mobileMenu.classList.add("hidden");
});

// Generate dot indicators
for (let i = 0; i < actualSlides; i++) {
  const dot = document.createElement("div");
  dot.className =
    "h-2 w-2 bg-gray-400 rounded-full transition-all duration-300 cursor-pointer";
  dotContainer.appendChild(dot);

  // Add click to navigate to slide
  dot.addEventListener("click", () => {
    currentIndex = i + 1;
    setSlide(currentIndex);
    updateDots();
    restartAutoSlide();
  });
}

const dotElems = dotContainer.children;

function updateDots() {
  [...dotElems].forEach((dot, i) => {
    if (i === currentIndex - 1) {
      dot.className =
        "h-2 w-6 bg-gray-700 rounded-full transition-all duration-300";
    } else {
      dot.className =
        "h-2 w-2 bg-gray-400 rounded-full transition-all duration-300";
    }
  });
}

// Set slide position
function setSlide(index) {
  track.style.transition = "transform 0.6s ease-in-out";
  track.style.transform = `translateX(-${slideWidth() * index}px)`;
  updateDots();
}

function nextSlide() {
  if (currentIndex >= totalSlides - 1) return;
  currentIndex++;
  setSlide(currentIndex);
}

function prevSlide() {
  if (currentIndex <= 0) return;
  currentIndex--;
  setSlide(currentIndex);
}

// Loop fix
track.addEventListener("transitionend", () => {
  if (currentIndex === totalSlides - 1) {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(-${slideWidth() * currentIndex}px)`;
  }
  if (currentIndex === 0) {
    track.style.transition = "none";
    currentIndex = totalSlides - 2;
    track.style.transform = `translateX(-${slideWidth() * currentIndex}px)`;
  }
  updateDots();
});

// Auto-play
function startAutoSlide() {
  interval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

function restartAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

window.addEventListener("load", () => {
  setSlide(currentIndex);
  updateDots();
  startAutoSlide();
});

window.addEventListener("resize", () => {
  track.style.transition = "none";
  setSlide(currentIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  nextSlide();
  restartAutoSlide();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  prevSlide();
  restartAutoSlide();
});

// Display Menu-dropdown Help
const dropdownHelp = document.querySelector(".help");
const helpMenu = document.getElementById("help-menu");
const arrowHelp = document.getElementById("arrow-help");

// Display Menu-dropdown Acc
const dropDownAccount = document.querySelector(".drop");
const accMenu = document.querySelector(".dropdown-menu");
const indicatorArrowAcc = document.getElementById("arrow");

function dropDown(trigger, menu, indicator) {

  trigger.addEventListener("click", () => {
    let isHidden = menu.classList.contains("hidden");

    //Clear previous animation classes
    menu.classList.remove("expandMenu", "retract");

    if (isHidden) {
      menu.classList.remove("hidden");
      menu.classList.add("expandMenu");
      indicator.className =
        "fa-solid fa-angle-up text-white text-sm mt-[.4rem] hover:text-[#AFFF00] hover:translate-y";
    } else {
      menu.classList.add("retract");
      indicator.className =
        "fa-solid fa-angle-down text-white text-sm mt-[.4rem] hover:text-[#AFFF00] hover:translate-y";

      setTimeout(() => {
        menu.classList.add("hidden");
        menu.classList.remove("retract");
      }, 250); // Match the animation duration exactly
    }
  });
}

// Dropdown Account Menu
dropDown(dropDownAccount, accMenu, indicatorArrowAcc);

// Dropdown Help Menu
dropDown(dropdownHelp, helpMenu, arrowHelp);
