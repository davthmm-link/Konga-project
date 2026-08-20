console.log("Order Tracking.js Loaded Successfully");

// ===========================
// GET ORDER ID FROM URL
// ===========================

const urlParams = new URLSearchParams(window.location.search);

const orderId = urlParams.get("orderId");

// ===========================
// LOAD ORDERS
// ===========================

const orders = JSON.parse(localStorage.getItem("orders")) || [];

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
    // DISPLAY ORDER INFORMATION
    // ===========================

    document.getElementById("tracking-order-id").innerText =
        order.orderId;

    document.getElementById("tracking-number").innerText =
        order.trackingNumber;

    document.getElementById("tracking-date").innerText =
        order.date;


    // ===========================
    // CURRENT STATUS
    // ===========================

    document.getElementById("current-status").innerText =
        order.status;


    // ===========================
    // ORDER DETAILS LINK
    // ===========================

    document.getElementById("details-link").href =
        "order-details.html?orderId=" + encodeURIComponent(order.orderId);


    // ===========================
    // UPDATE TIMELINE
    // ===========================

    const timelineSteps =
        document.querySelectorAll(".timeline-step");


    /*
        Current order statuses:

        Processing
        Packed
        Out for Delivery
        Delivered
    */

    const statusMap = {

        "Processing": 1,

        "Packed": 2,

        "Out for Delivery": 3,

        "Delivered": 4

    };


    const currentStatus =
        statusMap[order.status] || 1;


    timelineSteps.forEach(function(step, index) {

        const stepNumber = index + 1;

        if (stepNumber <= currentStatus + 1) {

            step.classList.add("completed");

        }
    });

}


console.log("Order Tracking Loaded Successfully ✅");