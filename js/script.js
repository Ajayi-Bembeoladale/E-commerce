// =========================================================
//                    GENERAL SCRIPT.JS
// =========================================================

const NAIRA_CONVERSION_RATE = 1500; // USD to NGN conversion rate

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
      "productCard flex-col min-w-72 h-auto bg-white p-4 rounded-sm shadow-lg";

    // Use the first image if available, otherwise use a fallback
    let imageUrl = product.images
      ? product.images[0]
      : "./images/templateImg.jpg";

    let nairaPrice = `₦${(product.price * NAIRA_CONVERSION_RATE).toLocaleString()}`;
    let originalPrice;
    if (product.discountPercentage === 100) {
      originalPrice = "N/A";
    } else {
      originalPrice = `₦${Math.round((product.price * NAIRA_CONVERSION_RATE) / (1 - product.discountPercentage / 100)).toLocaleString()}`;
    }
    cards.innerHTML = `
      <!--<div class= "rounded-md bg-lime-200 text-lime-500 text-sm w-fit font-semibold p-2">-${Math.round(product.discountPercentage)}%</div> -->
      <img class="product-image" src="${imageUrl}" alt="Image of ${product.title}" <img src="${imageUrl}" onerror="this.onerror=null;this.src='./images/templateImg.jpg'">
      <div class="product-title text-balance">
        <h2 class="overflow-hidden text-ellipsis text-balance">${product.title}</h2>
        <p class="text-[var(--accent)] text-xl font-semibold">${nairaPrice}</p>
        <p class = "text-md font-light text-[var(--secondary)] line-through ">${originalPrice}</p>
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
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Show loader

  const main = document.getElementById('main');
  main.style.display = "none"

  try {
    // Fetch all categories
    const res = await fetch("https://dummyjson.com/products/categories");
    const categories = await res.json();
    categories.sort(() => Math.random() - 0.5);

    const productContainer = document.querySelector(".productDisplay");
    productContainer.innerHTML = "";

    // Fetch all categories in parallel and wait for all to finish
    await Promise.all(
      categories.map(async (category) => {
        // Create and append the category title
        const center = document.createElement("center");
        center.className =
          "text-xl bg-[var(--primary)] p-4 px-10 font-bold mt-2 text-[var(--highlight)] rounded-sm";
        center.textContent = (category.slug || category)
          .replace(/-/g, " ")
          .toUpperCase();

        // Create wrapper for arrows + scrollable section
        const wrapper = document.createElement("div");
        wrapper.className = "relative w-full flex items-center";

        // Create left arrow
        const leftArrow = document.createElement("button");
        leftArrow.innerHTML = `<span class="absolute left-4 top-1/2 text-2xl -translate-y-1/2 bg-white p-2 rounded-full shadow text-black z-10">&#10094;</span>`;
        // Create right arrow
        const rightArrow = document.createElement("button");
        rightArrow.innerHTML = `<span class="absolute right-4 text-2xl top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow text-black z-10">&#10095;</span>`;

        // Create the section for products
        const section = document.createElement("section");
        section.id = `${category.slug || category}Display`;
        section.className = `${category.slug || category} flex gap-4 p-4 mt-4 justify-start items-stretch flex-nowrap overflow-x-auto hide-scrollbar scroll-smooth w-full`;

        // Arrow button functionality
        leftArrow.onclick = () => {
          section.scrollBy({ left: -300, behavior: "smooth" });
        };
        rightArrow.onclick = () => {
          section.scrollBy({ left: 300, behavior: "smooth" });
        };

        wrapper.appendChild(leftArrow);
        wrapper.appendChild(section);
        wrapper.appendChild(rightArrow);
        productContainer.appendChild(center);
        productContainer.appendChild(wrapper);

        // Fetch and display products for this category
        await fetchByCategory(category.slug || category, section);
      })
    );
  } catch (err) {
    console.error("Failed to display sections:", err);
  } finally {
    // Hide loader after all fetching and rendering is done
    loader.style.display = "none";
    main.style.display = 'block'
  }
}
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
document.addEventListener("DOMContentLoaded", () => {
document.getElementById('sign-in').addEventListener('click',()=>{
  window.location.href ="login.html"
})
})