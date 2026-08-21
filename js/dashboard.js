console.log("Dashboard.js Loaded Successfully");

// ===========================
// LOAD ORDERS
// ===========================

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];


// ===========================
// LOAD WISHLIST
// ===========================

const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


// ===========================
// GET CURRENT FIREBASE USER
// ===========================

if (typeof firebase !== "undefined" &&
    firebase.auth) {

    firebase.auth().onAuthStateChanged(function(user) {

        const customerName =
            document.getElementById("customer-name");

        if (!customerName) return;

        if (user) {

            customerName.innerText =
                user.displayName ||
                user.email?.split("@")[0] ||
                "Customer";

        } else {

            customerName.innerText =
                "Customer";

        }

    });

}

// ===========================
// TOTAL ORDERS
// ===========================

const totalOrders =
    document.getElementById("total-orders");

if (totalOrders) {

    totalOrders.innerText =
        orders.length;

}


// ===========================
// ACTIVE ORDERS
// ===========================

const activeOrders =
    document.getElementById("active-orders");

if (activeOrders) {

    const activeCount =
        orders.filter(function(order) {

            return order.status !== "Delivered";

        }).length;

    activeOrders.innerText =
        activeCount;

}


// ===========================
// WISHLIST COUNT
// ===========================

const wishlistCount =
    document.getElementById("wishlist-count");

if (wishlistCount) {

    wishlistCount.innerText =
        wishlist.length;

}


// ===========================
// TOTAL SPENT
// ===========================

const totalSpent =
    document.getElementById("total-spent");

if (totalSpent) {

    const amountSpent =
        orders.reduce(function(total, order) {

            return total +
                Number(order.total || 0);

        }, 0);

    totalSpent.innerText =
        amountSpent.toLocaleString();

}


// ===========================
// RECENT ORDERS
// ===========================

const recentOrders =
    document.getElementById("recent-orders");


if (recentOrders) {

    recentOrders.innerHTML = "";


    // ===========================
    // NO ORDERS
    // ===========================

    if (orders.length === 0) {

        recentOrders.innerHTML = `

            <div class="empty-orders">

                <i class="fa-solid fa-box-open"></i>

                <p>
                    You haven't placed any orders yet.
                </p>

                <a href="index.html">
                    Start Shopping
                </a>

            </div>

        `;

    } else {


        // ===========================
        // GET MOST RECENT ORDERS
        // ===========================

        const recentOrdersList =
            [...orders]
            .reverse()
            .slice(0, 5);


        recentOrdersList.forEach(function(order) {

            recentOrders.innerHTML += `

                <div class="recent-order">

                    <div class="recent-order-info">

                        <h3>
                            ${order.orderId}
                        </h3>

                        <p>
                            ${order.date}
                        </p>

                        <p>
                            Tracking:
                            ${order.trackingNumber}
                        </p>

                    </div>


                    <div class="recent-order-status">

                        <span>
                            ${order.status}
                        </span>

                    </div>


                    <div class="recent-order-total">

                        <strong>
                            ₦${Number(order.total || 0)
                                .toLocaleString()}
                        </strong>

                    </div>


                    <div>

                        <a
                            href="order-details.html?orderId=${encodeURIComponent(order.orderId)}"
                            class="recent-order-btn">

                            <i class="fa-solid fa-eye"></i>

                            View Details

                        </a>

                    </div>

                </div>

            `;

        });

    }

}


// ===========================
// COMPLETE
// ===========================

console.log("Dashboard Data Loaded Successfully ✅");