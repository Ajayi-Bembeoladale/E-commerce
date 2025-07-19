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
let price = [];
async function getProducts() {
  try {
    let response = await fetch("https://dummyjson.com/products?limit=0");

    if (!response.ok) {
      throw new Error(`Error found ${response.status}`);
    }

    const data = await response.json();
    //Push all products into the named array
    allProducts = data.products;

    // displayItems(allProducts);
    console.log(data.products);
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

    let nairaPrice = `₦${(product.price * 1500).toLocaleString()}`;

    cards.innerHTML = `
      <img class="product-image" src="${imageUrl}" alt="Image of ${product.title}" <img src="${imageUrl}" onerror="this.onerror=null;this.src='./images/templateImg.jpg'">
      <div class="product-title">
        <h2>${product.title}</h2>
        <p class="text-[var(--accent)]"><strong>Price:</strong> ${nairaPrice}</p>
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

// =========================================================
//                     Display Sections
// =========================================================

async function displaySections() {
  try {
    // Fetch all categories
    const res = await fetch("https://dummyjson.com/products/categories");
    const categories = await res.json();
    console.log(categories);
    // Shuffle the categories to make them random each time
    categories.sort(() => Math.random() - 0.5);

    // Find the container where you want to inject all category sections
    const productContainer = document.querySelector(".productDisplay");
    productContainer.innerHTML = ""; // Clear any existing content

    // Loop through each category and create its section
    for (const category of categories) {
      // Create and append the category title
      const center = document.createElement("center");
      center.className =
        "text-xl bg-[var(--primary)] p-4 px-10 font-bold mt-2 text-[var(--highlight)] rounded-sm";
      center.textContent = category.slug.toUpperCase();

      // Create wrapper for arrows + scrollable section
      const wrapper = document.createElement("div");
      wrapper.className = "relative w-full flex items-center";

      // Create left arrow
      const leftArrow = document.createElement("button");
      leftArrow.innerHTML = `<button id="prevBtn"
                        class="absolute left-4 top-1/2 text-2xl -translate-y-1/2 bg-white p-2 rounded-full shadow text-black z-10">&#10094;</button>`;
      // Create right arrow
      const rightArrow = document.createElement("button");
      rightArrow.innerHTML = `<button id="nextBtn"
                        class="absolute right-4 text-2xl top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow text-black z-10">
                        &#10095;</button>`;

      // Arrow button functionality
      leftArrow.onclick = () => {
        section.scrollBy({ left: -300, behavior: "smooth" });
      };

      rightArrow.onclick = () => {
        section.scrollBy({ left: 300, behavior: "smooth" });
      };

      // Create the section for products
      const section = document.createElement("section");
      section.id = `${category}Display`;
      section.className = `${category} flex gap-4 p-4 mt-4 justify-start items-stretch flex-nowrap overflow-x-auto hide-scrollbar scroll-smooth w-full`;

      wrapper.appendChild(leftArrow);
      wrapper.appendChild(section);
      wrapper.appendChild(rightArrow);
      // Append to the container
      productContainer.appendChild(center);
      productContainer.appendChild(wrapper);

      // Fetch and display products for this category
      fetchByCategory(category.slug, section);
    }
  } catch (err) {
    console.error("Failed to display sections:", err);
  }
}

// Call this after DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  displaySections();
});

// =========================================================
//                     Search Function
// =========================================================

let searchInput = document.getElementById("search");
const results = document.getElementById("results");
async function searchProducts(query) {
  try {
    let response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error(`Error found ${response.status}`);
    }
    const data = await response.json();

    let main = document.getElementById("main");

    main.style.display = "none";
    results.style.display = "flex";

    //display Products
    displayItems(data.products, results);
  } catch (err) {
    console.error(err);
  }
}

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = searchInput.value.trim().toLowerCase();
    if (query) searchProducts(query);
  }
});
// searchInput.addEventListener("input", function (e) {

//     const query = searchInput.value.trim().toLowerCase();
//     if (query) searchProducts(query);

// });
