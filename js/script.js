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

// =========================================================
//                    GENERAL SCRIPT.JS
// =========================================================


let allProducts = [];
let price = []
async function getProducts() {
  try {
    let response = await fetch("https://dummyjson.com/products?limit=1000");

    if (!response.ok) {
      throw new Error(`Error found ${response.status}`);
    }
     
    const data = await response.json();
    //Push all products into the named array
    allProducts = data.products;
    price = `₦${data.products.price * 1500 .toLocaleString()} + `
    // displayItems(allProducts);
    console.log(data);
    // console.log(productList);
  } catch (err) {
    console.error(err);
  }
}
getProducts();

function displayItems(products, section = document.body) {
  section.innerHTML = "";

  products.forEach((product) => {
    const cards = document.createElement("div");
    cards.className =
      "productCard min-w-72 h-auto bg-white p-4 rounded-sm shadow-lg";

    // Use the first image if available, otherwise use a fallback
    let imageUrl = product.images
      ? product.images[0]
      : "./images/templateImg.jpg";

    cards.innerHTML = `
      <img class="country-flag" src="${imageUrl}" alt="Image of ${product.title}" <img src="${imageUrl}" onerror="this.onerror=null;this.src='./images/templateImg.jpg'">
      <div class="country-info">
        <h2>${product.title}</h2>
        <p class="text-[var(--accent)]"><strong>Price:</strong> $${price}</p>
        <p><strong>Number of Products Left:</strong> ${product.stock}</p>
      </div>
    `;

    section.appendChild(cards);
  });
}
async function fetchByCategory(category, section) {
  try {
    let response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`Error found ${response.status}`);
    }

    const data = await response.json();
    //Push all products into the named array
    displayItems(data.products, section);

    // displayItems(allProducts);
    console.log(data);
    // console.log(productList);
  } catch (err) {
    console.error(err);
  }

  // Display where ?
}

const fragranceDisplay = document.querySelector(".fragrances");
const laptopsDisplay = document.querySelector(".laptops");
const kitchenAccessoriesDisplay = document.querySelector(".kitchen-accessories");
const furnitureDisplay = document.querySelector(".furniture");
fetchByCategory("fragrances", fragranceDisplay);
fetchByCategory("laptops", laptopsDisplay);
fetchByCategory("kitchen-accessories", kitchenAccessoriesDisplay);
fetchByCategory("furniture", furnitureDisplay);




// =========================================================
//                     Search Function
// =========================================================

let input = document.getElementById("search").value.trim().toLowerCase();
(async function SearchProducts() {
  try {
    let response = await fetch(
      `https://dummyjson.com/products/search?q=${input}`
    );
    if (!response.ok) {
      throw new Error(`Error found ${response.status}`);
    }
    const data = await response.json();
    displayItems(data.products, section);
  } catch (err) {
    console.error(err);
  }
}) 
input.addEventListener(KeyboardEvent(cntrl + s),// activate searchbar to start typing)
input.addEventListener(enter,SearchProducts());


fetch("https://dummyjson.com/products/categories")
  .then((res) => res.json())
  .then(console.log);
