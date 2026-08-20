console.log("Checkout.js Loaded Successfully");

// ===========================
// LOAD CART
// ===========================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

// ===========================
// PAYSTACK KEY
// ===========================

const PAYSTACK_PUBLIC_KEY = "pk_test_ac298f2d9b039d5a98c52330d98b04b906ebacb7";

// ===========================
// DISPLAY ORDER SUMMARY
// ===========================

function displayCheckout() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let subtotal = 0;
    const deliveryFee = 2500;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        document.getElementById("subtotal").innerText = "0";
        checkoutTotal.innerText = "0";

        return;
    }

    cart.forEach(function(product) {

        const itemTotal = product.price * product.quantity;

        subtotal += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">

                <span>
                    ${product.name} × ${product.quantity}
                </span>

                <strong>
                    ₦${itemTotal.toLocaleString()}
                </strong>

            </div>
        `;

    });

    document.getElementById("subtotal").innerText =
        subtotal.toLocaleString();

    document.getElementById("delivery-fee").innerText =
        deliveryFee.toLocaleString();

    const grandTotal = subtotal + deliveryFee;

    checkoutTotal.innerText =
        grandTotal.toLocaleString();

}

// ===========================
// GENERATE ORDER ID
// ===========================

function generateOrderId() {

    return "KNG-" + Date.now();

}

// ===========================
// GENERATE TRACKING NUMBER
// ===========================

function generateTrackingNumber() {

    return "KNG-TRK-" +

        Math.random()

        .toString(36)

        .substring(2,10)

        .toUpperCase();

}

// ===========================
// PLACE ORDER
// ===========================

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event){

        event.preventDefault();

        if(cart.length === 0){

            alert("Your cart is empty.");

            return;

        }

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();

        if(!fullname || !email || !phone || !address){

            alert("Please complete all the required fields.");

            return;

        }

        const handler = PaystackPop.setup({

            key: PAYSTACK_PUBLIC_KEY,

            email: email,

            amount: Number(checkoutTotal.innerText.replace(/,/g,"")) * 100,

            currency: "NGN",

            callback: function(response){

                const order = {

                    orderId: generateOrderId(),

                    trackingNumber: generateTrackingNumber(),

                    reference: response.reference,

                    customer:{

                        fullname,

                        email,

                        phone,

                        address

                    },

                    items: cart,

                    total: Number(checkoutTotal.innerText.replace(/,/g,"")),

                    paymentStatus:"PAID",

                    status:"Processing",

                    date:new Date().toLocaleString()

                };

                // Save latest order

                localStorage.setItem(

                    "latestOrder",

                    JSON.stringify(order)

                );

                // Save all orders

                let orders = JSON.parse(

                    localStorage.getItem("orders")

                ) || [];

                orders.push(order);

                localStorage.setItem(

                    "orders",

                    JSON.stringify(orders)

                );

                // Clear cart

                localStorage.removeItem("cart");

                // Go to success page

                window.location.href = "success.html";

            },

            onClose:function(){

                alert("Payment cancelled.");

            }

        });

        handler.openIframe();

    });

}

// ===========================
// INITIALIZE PAGE
// ===========================

displayCheckout();