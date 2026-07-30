// ======================================
// SIGNUP
// ======================================

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check passwords

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;

        }

        // Create Firebase User

        auth.createUserWithEmailAndPassword(email, password)

            .then(function (userCredential) {

                const user = userCredential.user;

                // Save display name

                return user.updateProfile({

                    displayName: fullname

                }).then(function () {

                    localStorage.setItem("username", fullname);

                    alert("Account created successfully!");

                    window.location.href = "login.html";

                });

            })

            .catch(function (error) {

                alert(error.message);

            });

    });

}