console.log("Success.js Loaded Successfully");

// ===========================
// LOAD ORDER
// ===========================

const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
const orderDate = document.getElementById("order-date");
const continueShopping = document.getElementById("continue-shopping");

// ===========================
// DISPLAY ORDER DATE
// ===========================

if (latestOrder && orderDate) {
    orderDate.innerText = latestOrder.date;
} else if (orderDate) {
    orderDate.innerText = new Date().toLocaleString();
}

// ===========================
// CONTINUE SHOPPING
// ===========================

if (continueShopping) {
    continueShopping.addEventListener("click", function () {
        // Remove the saved order after it has been viewed
        localStorage.removeItem("latestOrder");
        window.location.href = "webpage.html";
    });
}

// ===========================
// PREVENT GOING BACK TO CHECKOUT
// ===========================
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};
// ===========================
// PAGE LOADED
// ===========================

console.log("Order Completed Successfully ✅");