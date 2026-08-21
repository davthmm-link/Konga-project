/* =========================================================
   WISHLIST
   ========================================================= */


function displayWishlist() {

    const wishlistContainer =
        document.getElementById("wishlist-container");


    if (!wishlistContainer) {

        return;

    }


    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    /* =====================================================
       EMPTY WISHLIST
       ===================================================== */

    if (wishlist.length === 0) {
        
        wishlistContainer.innerHTML = `

            <div class="empty-wishlist">

                <div class="empty-icon">

                    <i class="fa-regular fa-heart"></i>

                </div>

                <h2>

                    Your Wishlist is Empty

                </h2>

                <p>

                    Save products you love and
                    they will appear here.

                </p>

                <a href="index.html">

                    Continue Shopping

                </a>

            </div>

        `;

        return;

    }


    /* =====================================================
       DISPLAY PRODUCTS
       ===================================================== */

    wishlistContainer.innerHTML =
        wishlist.map(product => `

            <div class="wishlist-card">

                <div class="wishlist-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </div>


                <div class="wishlist-info">

                    <h3>

                        ${product.name}

                    </h3>


                    <p class="wishlist-category">

                        ${product.category}

                    </p>


                    <p class="wishlist-price">

                        ₦${Number(product.price).toLocaleString()}

                    </p>


                    <p class="wishlist-description">

                        ${product.description}

                    </p>


                    <div class="wishlist-buttons">

                        <button
                            class="cart-btn"
                            onclick="addWishlistToCart(${product.id})">

                            <i class="fa-solid fa-cart-shopping"></i>

                            Add To Cart

                        </button>


                        <button
                            class="remove-btn"
                            onclick="removeFromWishlist(${product.id})">

                            <i class="fa-solid fa-trash"></i>

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        `).join("");

}



/* =========================================================
   REMOVE FROM WISHLIST
   ========================================================= */

function removeFromWishlist(productId) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    wishlist =
        wishlist.filter(
            product => product.id !== productId
        );


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    displayWishlist();

}



/* =========================================================
   ADD WISHLIST PRODUCT TO CART
   ========================================================= */

function addWishlistToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    if (!product) {

        return;

    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        product.name +
        " has been added to your cart!"
    );

}



/* =========================================================
   LOAD WISHLIST
   ========================================================= */

displayWishlist();