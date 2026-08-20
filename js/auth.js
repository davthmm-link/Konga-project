// ======================================
// AUTHENTICATION
// ======================================

auth.onAuthStateChanged(function (user) {

    const loginLink = document.getElementById("login-link");
    const signupLink = document.querySelector('a[href="signup.html"]');
    const navLinks = document.querySelector(".nav-links");

    if (user) {

        localStorage.setItem("username", user.displayName || user.email);

        if (loginLink) loginLink.style.display = "none";

        if (signupLink) signupLink.style.display = "none";

        if (navLinks && !document.getElementById("welcome-user")) {

            const welcome = document.createElement("span");

            welcome.id = "welcome-user";

            welcome.style.color = "#fff";
            welcome.style.fontWeight = "bold";
            welcome.style.marginRight = "15px";

            welcome.innerHTML = "👋 " + (user.displayName || user.email);

            navLinks.prepend(welcome);
        }

        if (navLinks && !document.getElementById("logout-btn")) {

            const logout = document.createElement("a");

            logout.href = "#";

            logout.id = "logout-btn";

            logout.innerHTML =
                '<i class="fa-solid fa-right-from-bracket"></i> Logout';

            logout.onclick = function (e) {

                e.preventDefault();

                if (!confirm("Do you want to sign out?")) {

                    return;

                }

                sessionStorage.setItem("loggingOut", "true");

                auth.signOut()

                    .then(function () {

                        localStorage.removeItem("username");

                        alert("Logged out successfully!");

                        window.location.href = "login.html";

                    })

                    .catch(function (error) {

                        sessionStorage.removeItem("loggingOut");

                        alert(error.message);

                    });
            };
            navLinks.appendChild(logout);
        }

    } else {
        localStorage.removeItem("username");
        if (sessionStorage.getItem("loggingOut")) {
            sessionStorage.removeItem("loggingOut");
            return;
        }

        const currentPage =
            window.location.pathname.split("/").pop();

        const protectedPages = [
            "webpage.html",
            "cart.html",
            "checkout.html"
        ];

        if (protectedPages.includes(currentPage)) {

            alert("Please login first.");

            window.location.href = "login.html";

        }
    }
});