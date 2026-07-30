console.log("App.js Loaded Successfully");

// ======================================
// HTML ELEMENTS
// ======================================

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");
const sortProducts = document.getElementById("sortProducts");

// ======================================
// UPDATE CART COUNT
// ======================================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(function(item){

        totalItems += item.quantity;

    });

    const cartCount = document.getElementById("cart-count");

    if(cartCount){

        cartCount.innerText = totalItems;

    }

}

// ======================================
// DISPLAY PRODUCTS
// ======================================

function displayProducts(productList = products){

    if(!productContainer) return;

    productContainer.innerHTML = "";

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    productList.forEach(function(product){

        const isWishlisted = wishlist.some(function(item){

            return item.id === product.id;

        });

        productContainer.innerHTML += `

        <div class="product-card" onclick="viewProduct(${product.id})">

            <img
                src="${product.image}"
                alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="price">

                    ₦${product.price.toLocaleString()}

                </p>

                <p>

                    ${product.description}

                </p>

                <div class="product-buttons">

                    <button
                    onclick="event.stopPropagation(); addToCart(${product.id})">

                        <i class="fa-solid fa-cart-shopping"></i>

                        Add To Cart

                    </button>

                    <button

                        class="wishlist-btn ${isWishlisted ? "active" : ""}"

                        onclick="event.stopPropagation(); addToWishlist(${product.id})">

                        <i class="fa-solid fa-heart"></i>

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ======================================
// ADD TO CART
// ======================================

function addToCart(productId){

    if(typeof requireLogin === "function"){

        if(!requireLogin()){

            return;

        }

    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(function(item){

        return item.id === productId;

    });

    if(!product) return;

    const existingProduct = cart.find(function(item){

        return item.id === productId;

    });

    if(existingProduct){

        existingProduct.quantity++;

    }

    else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    showToast(product.name + " added to cart 🛒");

}

// ======================================
// PRODUCT MODAL
// ======================================

function viewProduct(id){

    const product = products.find(function(item){

        return item.id === id;

    });

    if(!product) return;

    document.getElementById("modal-image").src = product.image;

    document.getElementById("modal-name").innerText = product.name;

    document.getElementById("modal-category").innerText =
    product.category;

    document.getElementById("modal-description").innerText =
    product.description;

    document.getElementById("modal-price").innerText =
    product.price.toLocaleString();

    // Add To Cart

    document.getElementById("modal-cart-btn").onclick = function(event){

        event.stopPropagation();

        addToCart(product.id);

    };

    // Wishlist

    const wishlistButton = document.getElementById("modal-wishlist-btn");

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const isWishlisted = wishlist.some(function(item){

        return item.id === product.id;

    });

    if(isWishlisted){

        wishlistButton.innerHTML =
        `<i class="fa-solid fa-heart"></i> Remove Wishlist`;

    }else{

        wishlistButton.innerHTML =
        `<i class="fa-solid fa-heart"></i> Add Wishlist`;

    }

    wishlistButton.onclick = function(event){

        event.stopPropagation();

        addToWishlist(product.id);

    };

    document.getElementById("product-modal").style.display = "flex";

}

// ======================================
// CLOSE MODAL
// ======================================

function closeModal(){

    document.getElementById("product-modal").style.display = "none";

}

// ======================================
// SEARCH PRODUCTS
// ======================================

if(searchInput){

    searchInput.addEventListener("input", function(){

        const searchText = this.value.toLowerCase();

        const filteredProducts = products.filter(function(product){

            return(

                product.name.toLowerCase().includes(searchText)

                ||

                product.category.toLowerCase().includes(searchText)

            );

        });

        displayProducts(filteredProducts);

    });

}

// ======================================
// CATEGORY FILTER
// ======================================

categoryButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const category = this.dataset.category;

        if(category === "All"){

            displayProducts(products);

        }

        else{

            const filteredProducts = products.filter(function(product){

                return product.category === category;

            });

            displayProducts(filteredProducts);

        }

    });

});

// ======================================
// SORT PRODUCTS
// ======================================

if(sortProducts){

    sortProducts.addEventListener("change", function(){

        let sortedProducts = [...products];

        switch(this.value){

            case "low-high":

                sortedProducts.sort(function(a,b){

                    return a.price - b.price;

                });

                break;

            case "high-low":

                sortedProducts.sort(function(a,b){

                    return b.price - a.price;

                });

                break;

            case "az":

                sortedProducts.sort(function(a,b){

                    return a.name.localeCompare(b.name);

                });

                break;

            case "za":

                sortedProducts.sort(function(a,b){

                    return b.name.localeCompare(a.name);

                });

                break;

            default:

                sortedProducts = [...products];

        }

        displayProducts(sortedProducts);

    });

}

// ======================================
// WISHLIST
// ======================================

function addToWishlist(productId){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const product = products.find(function(item){

        return item.id === productId;

    });

    if(!product) return;

    const exists = wishlist.find(function(item){

        return item.id === productId;

    });

    if(exists){

        wishlist = wishlist.filter(function(item){

            return item.id !== productId;

        });

        showToast(product.name + " removed from Wishlist ❤️");

    }

    else{

        wishlist.push(product);

        showToast(product.name + " added to Wishlist ❤️");

    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayProducts();

    closeModal();

}

// ======================================
// TOAST NOTIFICATION
// ======================================

function showToast(message){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },3000);

}

// ======================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ======================================

window.addEventListener("click", function(event){

    const modal = document.getElementById("product-modal");

    if(event.target === modal){

        closeModal();

    }

});

// ======================================
// SHOP NOW BUTTON
// ======================================

const shopNowBtn = document.querySelector(".hero button");

if(shopNowBtn){

    shopNowBtn.addEventListener("click", function(){

        document.querySelector(".title").scrollIntoView({

            behavior:"smooth"

        });

    });

}

// ======================================
// PRELOAD IMAGES
// ======================================

function preloadImages(){

    products.forEach(function(product){

        const img = new Image();

        img.src = product.image;

    });

}

// ======================================
// INITIALIZE PAGE
// ======================================

function initializePage(){

    displayProducts();

    updateCartCount();

    preloadImages();

    console.log("Konga Homepage Loaded Successfully ✅");

}

initializePage();

// ======================================
// EXPORT FUNCTIONS
// ======================================

window.displayProducts = displayProducts;
window.addToCart = addToCart;
window.viewProduct = viewProduct;
window.closeModal = closeModal;
window.addToWishlist = addToWishlist;