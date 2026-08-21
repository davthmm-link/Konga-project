console.log("Orders.js Loaded Successfully");

// ===========================
// LOAD ORDERS
// ===========================

const orders = JSON.parse(localStorage.getItem("orders")) || [];

const ordersList = document.getElementById("orders-list");

// ===========================
// DISPLAY ORDERS
// ===========================

function displayOrders() {

    if (!ordersList) return;

    // No Orders
    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                <i class="fa-solid fa-box-open"></i>

                <h2>No Orders Yet</h2>

                <p>

                    You haven't placed any orders.

                </p>

                <a href="index.html">

                    Continue Shopping

                </a>

            </div>

        `;

        return;
    }

    // Newest order first
    const sortedOrders = [...orders].reverse();

    ordersList.innerHTML = "";

    sortedOrders.forEach(function(order) {

        ordersList.innerHTML += `

            <div class="order-card">

                <div class="order-top">

                    <div class="order-id">

                        ${order.orderId}

                    </div>

                    <div>

                        <span class="payment-status">

                            ${order.paymentStatus}

                        </span>

                        <span class="delivery-status">

                            ${order.status}

                        </span>

                    </div>

                </div>

                <div class="order-details">

                    <div class="detail-box">

                        <h4>Customer</h4>

                        <p>${order.customer.fullname}</p>

                    </div>

                    <div class="detail-box">

                        <h4>Date</h4>

                        <p>${order.date}</p>

                    </div>

                    <div class="detail-box">

                        <h4>Tracking Number</h4>

                        <p>${order.trackingNumber}</p>

                    </div>

                    <div class="detail-box">

                        <h4>Payment Reference</h4>

                        <p>${order.reference}</p>

                    </div>

                </div>

                <div class="order-total">

                    ₦${Number(order.total).toLocaleString()}

                </div>

                <div class="order-actions">

                 <a
                    class="view-btn"
                    href="order-details.html?orderId=${order.orderId}">

                 <i class="fa-solid fa-eye"></i>

                 View Details

                </a>

                <a
                    class="track-btn"
                    href="order-tracking.html?orderId=${order.orderId}">

                 <i class="fa-solid fa-truck"></i>

                 Track Order

             </a>

                </div>

            </div>

        `;

    });

}

// ===========================
// INITIALIZE
// ===========================

displayOrders();