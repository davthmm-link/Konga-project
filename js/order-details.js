console.log("Order Details.js Loaded Successfully");

// ===========================
// GET ORDER ID
// ===========================

const urlParams = new URLSearchParams(window.location.search);

const orderId = urlParams.get("orderId");

// ===========================
// LOAD ORDERS
// ===========================

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

// ===========================
// FIND ORDER
// ===========================

const order = orders.find(function(item) {

    return item.orderId === orderId;

});

// ===========================
// HANDLE INVALID ORDER
// ===========================

if (!order) {

    alert("Order not found.");

    window.location.href = "orders.html";

} else {

    // ===========================
    // ORDER INFORMATION
    // ===========================

    document.getElementById("order-id").innerText =
        order.orderId;

    document.getElementById("tracking-number").innerText =
        order.trackingNumber;

    document.getElementById("payment-status").innerText =
        order.paymentStatus;

    document.getElementById("delivery-status").innerText =
        order.status;

    document.getElementById("payment-reference").innerText =
        order.reference;

    document.getElementById("order-date").innerText =
        order.date;


    // ===========================
    // CUSTOMER INFORMATION
    // ===========================

    document.getElementById("customer-name").innerText =
        order.customer.fullname;

    document.getElementById("customer-email").innerText =
        order.customer.email;

    document.getElementById("customer-phone").innerText =
        order.customer.phone;

    document.getElementById("customer-address").innerText =
        order.customer.address;


    // ===========================
    // PRODUCTS
    // ===========================

    const orderItems =
        document.getElementById("order-items");

    orderItems.innerHTML = "";

    let subtotal = 0;

    order.items.forEach(function(product) {

        const itemSubtotal =
            Number(product.price) *
            Number(product.quantity);

        subtotal += itemSubtotal;

        orderItems.innerHTML += `

            <div class="order-item">

                <div class="order-item-info">

                    <h3 class="order-item-name">
                        ${product.name}
                    </h3>

                    <p class="order-item-category">
                        ${product.category || "Product"}
                    </p>

                    <p class="order-item-quantity">
                        Quantity: ${product.quantity}
                    </p>

                </div>

                <div class="order-item-price">

                    <p>
                        ₦${Number(product.price).toLocaleString()}
                        × ${product.quantity}
                    </p>

                    <strong>
                        ₦${itemSubtotal.toLocaleString()}
                    </strong>

                </div>

            </div>

        `;

    });


    // ===========================
    // DELIVERY
    // ===========================

    const deliveryFee = 2500;


    // ===========================
    // GRAND TOTAL
    // ===========================

    const grandTotal =
        subtotal + deliveryFee;


    // ===========================
    // DISPLAY TOTALS
    // ===========================

    document.getElementById("invoice-subtotal").innerText =
        subtotal.toLocaleString();

    document.getElementById("invoice-delivery").innerText =
        deliveryFee.toLocaleString();

    document.getElementById("grand-total").innerText =
        grandTotal.toLocaleString();

}


console.log("Invoice Loaded Successfully ✅");