console.log("Checkout.js Loaded Successfully");

// ===========================
// LOAD CART
// ===========================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

// ===========================
// DISPLAY ORDER SUMMARY
// ===========================

function displayCheckout() {
    if (!checkoutItems) return;
    checkoutItems.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;
        checkoutTotal.innerText = "0";
        return;
    }

    cart.forEach(function(product) {
        const subtotal = product.price * product.quantity;
        total += subtotal;
        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <span>
                    ${product.name} × ${product.quantity}
                </span>
                <strong>
                    ₦${subtotal.toLocaleString()}
                </strong>
            </div>
        `;
    });
    checkoutTotal.innerText = total.toLocaleString();
}

// ===========================
// PLACE ORDER
// ===========================

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        if (!fullname || !email || !phone || !address) {
            alert("Please complete all the required fields.");
            return;
        }
        const order = {
            customer: {
                fullname,
                email,
                phone,
                address
            },
            items: cart,
            total: checkoutTotal.innerText,
            date: new Date().toLocaleString()
        };
        localStorage.setItem("latestOrder", JSON.stringify(order));
        localStorage.removeItem("cart");
        alert("Order placed successfully!");
        window.location.href = "success.html";
    });
}

// ===========================
// INITIALIZE PAGE
// ===========================

displayCheckout();