// ======================================
// FIREBASE CONFIGURATION
// ======================================

const firebaseConfig = {
    apiKey: "AIzaSyC7MhqPPhJwR2hunf9fyqEM7W4lpHptobs",
    authDomain: "kongaprojectapp.firebaseapp.com",
    projectId: "kongaprojectapp",
    storageBucket: "kongaprojectapp.firebasestorage.app",
    messagingSenderId: "413371170404",
    appId: "1:413371170404:web:520122f981c053d140e971",
    measurementId: "G-V3KX8F6CX2"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Firebase Authentication

const auth = firebase.auth();