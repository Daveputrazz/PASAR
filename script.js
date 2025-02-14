// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5rwSp4izSLqqJJ1JfM3z-53nmTiPT7OQ",
    authDomain: "pasar-be733.firebaseapp.com",
    projectId: "pasar-be733",
    storageBucket: "pasar-be733.appspot.com",
    messagingSenderId: "1023094402275",
    appId: "1:1023094402275:web:14867f684e1ac52fd0a9d6",
    measurementId: "G-WHMXKQ3YEC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login & Register
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Registrasi Berhasil"))
        .catch(error => alert(error.message));
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("logout-btn").style.display = "block";
            alert("Login Berhasil");
        })
        .catch(error => alert(error.message));
}

function logout() {
    auth.signOut().then(() => {
        document.getElementById("logout-btn").style.display = "none";
        alert("Logout Berhasil");
    });
}

// Slideshow Functionality
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

showSlide(slideIndex);

// Menambahkan Penjual
function addSeller() {
    let name = document.getElementById("seller-name").value;
    let whatsapp = document.getElementById("seller-whatsapp").value;
    let product = document.getElementById("seller-product").value;
    let price = document.getElementById("seller-price").value;
    let image = document.getElementById("seller-image").files[0];

    if (whatsapp.startsWith("0")) {
        whatsapp = "62" + whatsapp.substring(1);
    }

    let sellerList = document.getElementById("seller-list");
    let sellerDiv = document.createElement("div");
    sellerDiv.innerHTML = `
        <h3>${name}</h3>
        <p>Produk: ${product}</p>
        <p>Harga: Rp${price}/kg</p>
        <p>WhatsApp: <a href="https://wa.me/${whatsapp}" target="_blank">${whatsapp}</a></p>
        <button onclick="removeSeller(this)">Hapus</button>
    `;
    sellerList.appendChild(sellerDiv);
}

function removeSeller(button) {
    button.parentElement.remove();
}

function openForm() {
    document.getElementById("form-popup").style.display = "block";
}

function closeForm() {
    document.getElementById("form-popup").style.display = "none";
}
