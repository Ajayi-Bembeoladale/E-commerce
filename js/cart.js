// NEW CODE: Cart Management
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart and orders from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Function to update cart count
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('#noOfItemsCart, #noOfItemsCartMobile').forEach(el => {
            el.textContent = cartCount;
        });
    }

    // Function to show cart notification
    function showCartNotification() {
        const notification = document.getElementById('cartNotification');
        if (notification) {
            notification.classList.remove('hidden');
            notification.classList.add('block');
            setTimeout(() => {
                notification.classList.remove('block');
                notification.classList.add('hidden');
                setTimeout(() => {
                    notification.classList.add('hidden');
                }, 500);
            }, 3000);
        }
    }

    // Add to cart functionality
    document.body.addEventListener('click', (e) => {
    const button = e.target.closest('.add-to-cart');

  if (button) {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const productPrice = parseFloat(button.dataset.productPrice);
    const productImage = button.dataset.productImage;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartNotification();
  }
});
 

    // Cart page specific functionality
    if (window.location.pathname.includes('cart.html')) {
        const cartItemsContainer = document.getElementById('cartItems');
        const emptyCartMessage = document.getElementById('emptyCart');
        const cartSummary = document.getElementById('cartSummary');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const locationInput = document.getElementById('location');

        function renderCart() {
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                emptyCartMessage.classList.remove('hidden');
                cartSummary.classList.add('hidden');
                checkoutBtn.disabled = true;
            } else {
                emptyCartMessage.classList.add('hidden');
                cartSummary.classList.remove('hidden');
                checkoutBtn.disabled = !locationInput.value.trim();

                cart.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('cart-item');
                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <p class="font-semibold text-[#0084F0]">${item.name}</p>
                            <p>₦${Math.round(item.price * item.quantity).toLocaleString()}</p>
                            <div class="quantity-control">
                                <button class="decrease-quantity" data-index="${index}">-</button>
                                <span>${item.quantity}</span>
                                <button class="increase-quantity" data-index="${index}">+</button>
                            </div>
                        </div>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                });

                const subtotal = cart.reduce((total, item) => Math.round(total + item.price * item.quantity), 0);
                document.getElementById('cartSubtotal').textContent = `₦${subtotal.toLocaleString()}`;
            }
        }

        // Update checkout button state based on location input
        locationInput.addEventListener('input', () => {
            checkoutBtn.disabled = !locationInput.value.trim() || cart.length === 0;
        });

        // Quantity controls
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('increase-quantity')) {
                const index = e.target.dataset.index;
                cart[index].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            } else if (e.target.classList.contains('decrease-quantity')) {
                const index = e.target.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            } else if (e.target.classList.contains('remove-item')) {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            }
        });

        // Checkout process
        checkoutBtn.addEventListener('click', () => {
            const modal = document.getElementById('checkoutModal');
            const modalSubtotal = document.getElementById('modalSubtotal');
            const modalLocation = document.getElementById('modalLocation');
            const modalDeliveryDate = document.getElementById('modalDeliveryDate');

            const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
            const deliveryDate = new Date();
            deliveryDate.setHours(deliveryDate.getHours() + 48 + Math.floor(Math.random() * 24));
            const formattedDate = deliveryDate.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            modalSubtotal.textContent = `₦${subtotal.toLocaleString()}`;
            modalLocation.textContent = locationInput.value;
            modalDeliveryDate.textContent = formattedDate;

            modal.classList.remove('hidden');
        });

        // Cancel checkout
        document.getElementById('cancelCheckout').addEventListener('click', () => {
            document.getElementById('checkoutModal').classList.add('hidden');
        });

        // Confirm checkout
        document.getElementById('confirmCheckout').addEventListener('click', () => {
            const order = {
                id: Date.now().toString(),
                items: [...cart],
                total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
                location: locationInput.value,
                deliveryDate: document.getElementById('modalDeliveryDate').textContent,
                status: 'Enroute'
            };
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
            document.getElementById('checkoutModal').classList.add('hidden');
            alert('Order placed successfully!');
        });

        renderCart();
    }

    // Update orders dropdown
    const ordersMenu = document.querySelector('.orders');
    if (ordersMenu) {
        ordersMenu.addEventListener('click', () => {
            const dropdown = ordersMenu.parentElement.querySelector('.dropdown-menu');
            const ordersList = dropdown.querySelector('.orders-list') || document.createElement('div');
            ordersList.classList.add('orders-list', 'mt-2');
            ordersList.innerHTML = orders.length === 0 ? '<p class="text-gray-700">No orders yet.</p>' : '';
            orders.forEach(order => {
                const orderElement = document.createElement('div');
                orderElement.classList.add('order-item', 'p-2', 'border-t', 'border-gray-200');
                orderElement.innerHTML = `
                    <p class="font-semibold text-[#0084F0]">Order #${order.id}</p>
                    <p class="text-sm text-gray-700">Total: ₦${order.total.toLocaleString()}</p>
                    <p class="text-sm text-gray-700">Status: ${order.status}</p>
                    <p class="text-sm text-gray-700">Delivery: ${order.deliveryDate}</p>
                    <p class="text-sm text-gray-700">Location: ${order.location}</p>
                `;
                ordersList.appendChild(orderElement);
            });
            if (!dropdown.contains(ordersList)) {
                dropdown.appendChild(ordersList);
            }
        });
    }

// NEW CODE: Dynamic Product Loading
if (window.location.pathname.includes('product.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const products = [
        {
            id: '1',
            name: 'Calvin Klein Limited Edition Series',
            price: 45000,
            originalPrice: 57000,
            image: 'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp',
            description: 'A stylish watch with a brown leather strap, perfect for any occasion.',
            stock: 24,
            discount: '21% OFF'
        },
        {
            id: '2',
            name: 'Rolex Cellini Date Black',
            price: 45000,
            originalPrice: 57000,
            image: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp',
            description: 'Elegant Rolex Cellini with a black dial, offering timeless sophistication.',
            stock: 24,
            discount: '21% OFF'
        },
        {
            id: '3',
            name: 'Rolex Cellini Moonphase',
            price: 45000,
            originalPrice: 57000,
            image: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp',
            description: 'Luxurious Rolex watch with moonphase complication.',
            stock: 24,
            discount: '21% OFF'
        },
        {
            id: '4',
            name: 'Apple Watch Series 4',
            price: 45000,
            originalPrice: 57000,
            image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/1.webp',
            description: 'Smartwatch with advanced health and fitness tracking features.',
            stock: 24,
            discount: '21% OFF'
        },
        {
            id: '5',
            name: 'Red Nail Polish',
            price: 80000,
            originalPrice: 95000,
            image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp',
            description: 'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails.',
            stock: 24,
            discount: '16% OFF'
        }
    ];

    const product = products.find(p => p.id === productId);
    if (product) {
        document.querySelector('.productTitle').textContent = product.name;
        document.querySelector('.productDescription').textContent = product.description;
        document.querySelector('.sub-left img').src = product.image;
        document.querySelector('.sub-left span').textContent = product.discount;
        document.querySelector('.price p:first-child').textContent = `₦${product.price.toLocaleString()}`;
        document.querySelector('.price p:last-child').textContent = `₦${product.originalPrice.toLocaleString()}`;
        document.querySelector('.itemsLeft span').textContent = product.stock;
        const addToCartBtn = document.getElementById('addToCartBtn');
        addToCartBtn.dataset.productId = product.id;
        addToCartBtn.dataset.productName = product.name;
        addToCartBtn.dataset.productPrice = product.price;
        addToCartBtn.dataset.productImage = product.image;
    } else {
        // Redirect to main page if product not found
        window.location.href = 'index.html';
    }
}




    // Initialize cart count on page load
    updateCartCount();
});