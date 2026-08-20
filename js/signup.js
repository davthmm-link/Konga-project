const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            return userCredential.user.updateProfile({
                displayName: fullName
            });

        })
        .then(() => {

            alert("Account created successfully!");

            signupForm.reset();

            window.location.href = "login.html";

        })
        .catch((error) => {

            alert(error.message);

        });
});