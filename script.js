document.addEventListener("DOMContentLoaded", function () {
    loadSellers();
});

function openForm() {
    document.getElementById("form-popup").style.display = "block";
}

function closeForm() {
    document.getElementById("form-popup").style.display = "none";
}

function addSeller() {
    let name = document.getElementById("seller-name").value.trim();
    let whatsapp = document.getElementById("seller-whatsapp").value.trim();
    let product = document.getElementById("seller-product").value;
    let price = document.getElementById("seller-price").value;
    let imageFile = document.getElementById("seller-image").files[0];

    if (!name || !whatsapp || !price || !imageFile) {
        alert("Semua field harus diisi!");
        return;
    }

    if (whatsapp.startsWith("0")) {
        whatsapp = "62" + whatsapp.substring(1);
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let imageData = e.target.result;

        let newSeller = {
            name: name,
            whatsapp: whatsapp,
            product: product,
            price: price,
            image: imageData
        };

        let sellers = JSON.parse(localStorage.getItem("sellers")) || [];
        sellers.push(newSeller);
        localStorage.setItem("sellers", JSON.stringify(sellers));

        loadSellers();
        closeForm();
    };

    reader.readAsDataURL(imageFile);
}

function loadSellers() {
    let sellerList = document.getElementById("seller-list");
    sellerList.innerHTML = "";

    let sellers = JSON.parse(localStorage.getItem("sellers")) || [];
    
    sellers.forEach(seller => {
        let sellerDiv = document.createElement("div");
        sellerDiv.classList.add("seller");

        sellerDiv.innerHTML = `
            <h3>${seller.name}</h3>
            <img src="${seller.image}" alt="${seller.product}" class="seller-img">
            <p>Produk: ${seller.product}</p>
            <p>Harga: Rp${seller.price}/kg</p>
            <a href="https://wa.me/${seller.whatsapp}" target="_blank" class="whatsapp-button">Hubungi via WhatsApp</a>
        `;

        sellerList.appendChild(sellerDiv);
    });
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

function prevSlide() {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
}
