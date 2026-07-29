console.log("Cart.js Loaded Successfully");

// ===========================
// LOAD CART
// ===========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ===========================
// UPDATE CART BADGE
// ===========================

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;
    let totalItems = 0;
    cart.forEach(function(item) {
        totalItems += item.quantity;
    });
    cartCount.innerText = totalItems;
}

// ===========================
// SAVE CART
// ===========================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// ===========================
// DISPLAY CART
// ===========================

function displayCart() {
    if (!cartItems) return;
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartItems.innerHTML = `
        <div class="empty-cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <h2>Your cart is empty</h2>
            <p>Add some amazing products to your shopping cart.</p>
            <a href="webpage.html">
                Continue Shopping
            </a>
        </div>
        `;
        if (totalPrice) {
            totalPrice.innerText = "0";
        }
        return;
    }

    let total = 0;
    cart.forEach(function(product) {
        total += product.price * product.quantity;
        cartItems.innerHTML += `
        <div class="cart-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="cart-price">
                    ₦${product.price.toLocaleString()}

                </div>
                <div class="quantity">

                    <button onclick="decreaseQuantity(${product.id})">

                        -

                    </button>

                    <span>${product.quantity}</span>

                    <button onclick="increaseQuantity(${product.id})">

                        +

                    </button>
                </div>
                <button
                    class="remove-btn"
                    onclick="removeItem(${product.id})">
                    Remove Item
                </button>
            </div>
        </div>
        `;
    });
    totalPrice.innerText = total.toLocaleString();
}

// ===========================
// INCREASE QUANTITY
// ===========================

function increaseQuantity(productId) {
    const product = cart.find(function(item) {
        return item.id === productId;
    });
    if (!product) return;
    product.quantity++;
    saveCart();
    displayCart();
}

// ===========================
// DECREASE QUANTITY
// ===========================

function decreaseQuantity(productId) {
    const product = cart.find(function(item) {
        return item.id === productId;
    });
    if (!product) return;
    if (product.quantity > 1) {
        product.quantity--;
    } else {
        if (confirm("Remove this item from your cart?")) {
            removeItem(productId);
            return;
        }
    }
    saveCart();
    displayCart();
}

// ===========================
// REMOVE ITEM
// ===========================

function removeItem(productId) {
    const product = cart.find(function(item) {
        return item.id === productId;
    });
    if (!product) return;
    if (confirm(`Remove "${product.name}" from your cart?`)) {
        cart = cart.filter(function(item) {
            return item.id !== productId;
        });
        saveCart();
        displayCart();
    }
}

// ===========================
// CLEAR CART
// ===========================

function clearCart() {
    if (cart.length === 0) {
        alert("Your cart is already empty.");
        return;
    }

    if (confirm("Are you sure you want to clear your shopping cart?")) {
        cart = [];
        saveCart();
        displayCart();
    }
}

// ===========================
// CLEAR CART BUTTON
// ===========================

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
}

// ===========================
// PAGE INITIALIZATION
// ===========================

function initializeCart() {
    displayCart();
    updateCartCount();
    console.log("Shopping Cart Loaded Successfully ✅");
}
initializeCart();

// ===========================
// EXPORT FUNCTIONS
// ===========================

window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem = removeItem;
window.clearCart = clearCart;

// ===========================
// STORAGE SYNC
// ===========================

// Refresh the cart if localStorage changes
window.addEventListener("storage", function () {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    displayCart();
    updateCartCount();
});