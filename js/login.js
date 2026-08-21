// ======================================
// LOGIN
// ======================================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Clear old session data
        localStorage.removeItem("isLoggedIn");
        
        localStorage.removeItem("username");

        auth.signInWithEmailAndPassword(email, password)

            .then((userCredential) => {

                const user = userCredential.user;

                localStorage.setItem("isLoggedIn", "true");

                localStorage.setItem("username", user.displayName || user.email);

                alert("Login Successful!");

                window.location.href = "/";
            })

            .catch((error) => {
                switch (error.code) {
                    case "auth/user-not-found":
                        alert("No account found with this email.");
                        break;

                    case "auth/wrong-password":
                        alert("Incorrect password.");
                        break;

                    case "auth/invalid-email":
                        alert("Please enter a valid email.");
                        break;

                    case "auth/invalid-credential":
                        alert("Invalid email or password.");
                        break;
                    default:
                        alert(error.message);
                }
            });
    });
}