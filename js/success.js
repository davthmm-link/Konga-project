console.log("Success.js Loaded Successfully");

// ===========================
// LOAD LATEST ORDER
// ===========================

const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));

if (!latestOrder) {
    alert("No recent order found.");
    window.location.href = "webpage.html";
}

// ===========================
// DISPLAY ORDER DETAILS
// ===========================

document.getElementById("customer-name").innerText =
    latestOrder.customer.fullname;

document.getElementById("order-id").innerText =
    latestOrder.orderId;

document.getElementById("tracking-number").innerText =
    latestOrder.trackingNumber;

document.getElementById("payment-reference").innerText =
    latestOrder.reference;

document.getElementById("order-total").innerText =
    Number(latestOrder.total).toLocaleString();

// ===========================
// SAVE ORDER HISTORY
// ===========================

let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Prevent duplicate order from being saved
const exists = orders.some(function(order){
    return order.orderId === latestOrder.orderId;
});

if(!exists){
    orders.push(latestOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
}

console.log("Order Loaded Successfully ✅");