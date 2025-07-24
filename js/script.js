// =========================================================
//                    GENERAL SCRIPT.JS
// =========================================================

const NAIRA_CONVERSION_RATE = 1534.75; // USD to NGN conversion rate

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

function DisplayFeaturedItems() {
  const featuredProductsContainer = document.querySelector(".featured");
  const flashSalesContainer = document.querySelector(".flash-sales");

  const flashSalesItems = {
    items: [
      {
        id: 1,
        name: "Chanel Coco Noir Eau De",
        img: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
        price: "₦45,000",
      },
      {
        id: 2,
        name: "Dolce Shine Eau de",
        img: "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp",
        price: "₦45,000",
      },
      {
        id: 3,
        name: "Heshe Women's Leather Bag",
        img: "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/1.webp",
        price: "₦45,000",
      },
      {
        id: 4,
        name: "Prada Women Bag",
        img: "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
        price: "₦45,000",
      },
      {
        id: 5,
        name: "Pampi Shoes",
        img: "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/1.webp",
        price: "₦45,000",
      },
      {
        id: 6,
        name: "Calvin Klein Heel Shoes",
        img: "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
        price: "₦45,000",
      },
    ],
  };

  flashSalesItems.items.forEach((item) => {
    flashSalesContainer.innerHTML += `
    <div class="productCard flex-col min-w-72 h-auto bg-white p-4 rounded-md shadow-lg relative">
                    <div class="rounded-md bg-lime-200 text-lime-500 text-sm w-fit font-semibold p-2">-40%</div>
                    <img src="${item.img}"
                        alt="Image of ${item.name}" class="h-64 object-contain rounded">
                    <p class="mt-2 font-semibold">${item.name}</p>
                    <div class="price flex gap-2">
                        <span class="text-accent font-bold text-[var(--accent)]">${item.price}</span>
                        <span class="text-[var(--secondary)] line-through ">₦57,000</span>
                    </div>
                    <div class="flex items-center justify-center gap-4 mt-2">
                        <button
                            class="cart-btn add-to-cart flex items-center justify-center text-center w-full overflow-hidden text-lg gap-2 bg-[#0084F0] hover:bg-[#0084f0f4] text-white font-semibold px-2 py-2 rounded-sm shadow-sm transition duration-150"
                            id="addToCartBtn" data-product-id="${item.id}" data-product-name="${item.name}"
                            data-product-price="45000"
                            data-product-image="${item.img}">
                            <i class="fa-solid fa-cart-shopping cart-icon text-white text-center"></i>
                            <span class="text-center cart-txt">Add to Cart</span>
                        </button>
                    </div>
                </div>
    `;
  });
  const featuredItems = [
    {
      id: 1,
      name: "Calvin Klein Limited Edition Series",
      img: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
      price: "₦45,000",
    },
    {
      id: 2,
      name: "Rolex Cellini Date Black",
      img: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
      price: "₦45,000",
    },
    {
      id: 3,
      name: "Rolex Cellini Moonphase",
      img: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
      price: "₦45,000",
    },
    {
      id: 4,
      name: "Apple Watch Series 4",
      img: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/1.webp",
      price: "₦45,000",
    },
  ];

  featuredItems.forEach((item) => {
    featuredProductsContainer.innerHTML += `
      <div class="productCard min-w-72 h-auto bg-white p-4 rounded-md shadow-lg">
        <img src="${item.img}" alt="Image of ${item.name}" class="h-64 object-contain rounded">
        <p class="mt-2 font-semibold">${item.name}</p>
        <div class="price flex gap-2">
          <span class="text-accent font-bold text-[var(--accent)]">${item.price}</span>
          <span class="text-[var(--secondary)] line-through">₦57,000</span>
        </div>
            <div class="flex items-center justify-center gap-4 mt-2">
                        <button
                            class="cart-btn add-to-cart flex items-center justify-center text-center w-full overflow-hidden text-lg gap-2 bg-[#0084F0] hover:bg-[#0084f0f4] text-white font-semibold px-2 py-2 rounded-sm shadow-sm transition duration-150"
                            id="addToCartBtn" data-product- id="${item.id}" data-product-name="${item.name}"
                            data-product-price="45000"
                            data-product-image="${item.img}">
                            <i class="fa-solid fa-cart-shopping cart-icon text-white text-center"></i>
                            <span class="text-center cart-txt">Add to Cart</span>
                        </button>
                    </div>
      </div>
    `;
  });
}
DisplayFeaturedItems();

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

    let nairaPrice = `₦${Math.round(
      product.price * NAIRA_CONVERSION_RATE
    ).toLocaleString()}`;
    let originalPrice;
    if (product.discountPercentage === 100) {
      originalPrice = "N/A";
    } else {
      originalPrice = `₦${Math.round(
        (product.price * NAIRA_CONVERSION_RATE) /
          (1 - product.discountPercentage / 100)
      ).toLocaleString()}`;
    }
    cards.innerHTML = `
      <!--<div class= "rounded-md bg-lime-200 text-lime-500 text-sm w-fit font-semibold p-2">-${Math.round(
        product.discountPercentage
      )}%</div> -->
      <img class="product-image" src="${imageUrl}" alt="Image of ${
      product.title
    }" <img src="${imageUrl}" onerror="this.onerror=null;this.src='./images/templateImg.jpg'">
      <div class="product-title text-balance">
        <h2 class="overflow-hidden text-ellipsis text-balance">${
          product.title
        }</h2>
        <p class="text-[var(--accent)] text-xl font-semibold">${nairaPrice}</p>
        <p class = "text-md font-light text-[var(--secondary)] line-through ">${originalPrice}</p>
      </div>
    `;
    //  Display Product Profiles
    cards.addEventListener("click", async () => {
      const loader = document.getElementById("loader");
      const container = document.getElementById("container");
      container.style.display = "none";
      const results = document.getElementById("results");
      results.style.display = "none";

      const reviews = product.reviews || [];
      async function fetchRandomProfiles(count) {
        const res = await fetch(
          `https://randomuser.me/api/?results=${count}&nat=us,gb,ng`
        );
        const { results } = await res.json();
        return results;
      }
      const profiles = await fetchRandomProfiles(reviews.length);
      const reviewHTML = reviews
        .map((review, i) => {
          const prof = profiles[i];
          const avatar = prof.picture.thumbnail;
          const fullName = review.reviewerName;
          const ratingStars =
            "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
          const date = new Date(review.date).toLocaleDateString();

          return `
            <div class="review-card flex gap-3 items-start bg-[#F0F8FF] rounded-lg p-3">
              <img src="${avatar}" alt="${fullName}" class="w-10 h-10 rounded-full border-2 border-[#AFFF00]" />
              <div>
                <span class="font-semibold text-[#0084F0]">${fullName}</span>
                <span class="text-yellow-400 ml-2">${ratingStars}</span>
                <p class="text-gray-700 text-sm mt-1">${review.comment}</p>
                <span class="text-xs text-gray-400">${date}</span>
              </div>
            </div>
          `;
        })
        .join("");

      const ProductInfoContainer = document.getElementById("productInfo");
      ProductInfoContainer.style.display = "flex";
      const productRating =
        "★".repeat(Math.floor(product.rating)) +
        "☆".repeat(5 - Math.floor(product.rating));
      const quantityLeft = product.stock;

      ProductInfoContainer.innerHTML = `
        <button class="back-btn px-6 py-4 text-gray-700 text-lg absolute top-3 left-6 rounded-md font-semibold" id="backToMain">&#10094; Back</button>

        <div class="left flex flex-col md:flex-row p-1 gap-6 mt-12 justify-center overflow-hidden relative">
          <i class="fa-regular fa-heart font-mono font-bold text-lg absolute top-0 right-4 text-[var(--accent)]"></i>

          <div class="sub-left flex flex-col gap-8 items-center overflow-hidden w-full h-fit md:w-[29rem] p-4">
        <div class="img relative">
          <img src="${imageUrl}" alt="Image of ${
        product.title
      }" onerror="this.onerror=null;this.src='./images/templateImg.jpg'">
          <span class="bg-lime-200 text-lime-500 absolute top-0 right-1 px-2 py-1 rounded text-xs font-semibold ml-2">${Math.round(
            product.discountPercentage
          )}% OFF</span>
        </div>
        <div class="rating flex justify-center items-center gap-2 mt-2">
          <span class="text-xl text-yellow-400">${productRating}</span>
          <span class="text-gray-500 text-md">(234 ratings)</span>
        </div>
          </div>

          <div class="subright flex flex-col gap-8 p-5 mt-1 flex-1">
        <div class="productInfo flex flex-col gap-4">
          <h2 class="productTitle text-2xl font-bold text-[#0084F0]">${
            product.title
          }</h2>
          <p class="productDescription text-gray-700 text-sm text-wrap">${
            product.description
          }</p>
        </div>

        <div class="price flex gap-3 items-center">
          <p class="text-2xl font-bold text-[#ace335]">${nairaPrice}</p>
          <p class="line-through text-gray-400 text-md">${originalPrice}</p>
        </div>
          <div class="itemsLeft mt-4 text-gray-600 text-md">
                    <span class="itemsLeftNo font-semibold text-[#0084F0]">${quantityLeft}</span> Items Left
                </div>
        <div class="flex items-center justify-center gap-4 mt-6 ">
          <button class="cart-btn add-to-cart flex items-center justify-center text-center w-full overflow-hidden text-lg gap-2 bg-[#0084F0] hover:bg-[#0084f0f4] text-white font-semibold px-6 py-4 rounded-sm shadow-sm transition duration-150" id="addToCartBtn"
      data-product-id="${product.id}"
      data-product-name="${product.title}"
      data-product-price="${product.price * NAIRA_CONVERSION_RATE}"
      data-product-image="${imageUrl}">
            <i class="fa-solid fa-cart-shopping cart-icon text-white text-center"></i>
            <span class="text-center cart-txt">Add to Cart</span>
          </button>
        </div>
          </div>
        </div>

        <div class="right w-full md:w-[45vw] bg-white rounded-lg shadow-md p-6 mt-8 md:mt-0 md:ml-8">
          <h3 class="text-xl font-bold text-[#0084F0] mb-4">Customer Reviews</h3>
          <div class="reviews flex flex-col gap-6">
        ${reviewHTML}
          </div>
        </div>
      `;
      
// Logic for ProductQuantity Color
      let NumberDisplay = document.querySelector(".itemsLeftNo");
      if (quantityLeft <= 10) {
        NumberDisplay.classList.add("text-red-700");
      } else if (quantityLeft <= 50) {
        NumberDisplay.classList.add("text-yellow-500");
      } else {
        NumberDisplay.classList.add("text-blue-400");
      }

      let backbtn = document.querySelectorAll(".back-btn");
      backbtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          container.style.display = "block";
          const results = document.getElementById("results");
          results.style.display = "none";
          ProductInfoContainer.style.display = "none";
        });
      });
    });

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

  const main = document.getElementById("main");
  main.style.display = "none";

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
        section.id = `${category.slug || category}-section`;
        section.className = `${
          category.slug || category
        } flex gap-4 p-4 mt-4 justify-start items-stretch flex-nowrap overflow-x-auto hide-scrollbar scroll-smooth w-full`;

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
    main.style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  displaySections();
});

// =========================================================
//                     Search Function
// =========================================================

let searchInput = document.getElementById("search");
const results = document.getElementById("results");
async function searchProducts(query) {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Show loader

  try {
    let response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error(`Error found ${response.status}`);
    }
    const data = await response.json();

    const main = document.getElementById("container");
    const products = document.querySelector(".search-items");
    main.style.display = "none";
    results.style.display = "flex";

    // Display Products
    displayItems(data.products, products);
  } catch (err) {
    console.error(err);
  } finally {
    loader.style.display = "none"; // Hide loader after rendering
  }
}

// Event Listener for search
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = searchInput.value.trim().toLowerCase();
    if (query) searchProducts(query);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sign-in").addEventListener("click", () => {
    window.location.href = "login.html";
  });
});
