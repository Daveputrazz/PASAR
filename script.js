// SLIDESHOW MANUAL
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

showSlide(currentSlide);

// FORM PENAMBAHAN PENJUAL
function openForm() {
    document.getElementById("form-popup").style.display = "block";
}

function closeForm() {
    document.getElementById("form-popup").style.display = "none";
}

function addSeller() {
    let name = document.getElementById("seller-name").value;
    let whatsapp = document.getElementById("seller-whatsapp").value;
    let product = document.getElementById("seller-product").value;
    let price = document.getElementById("seller-price").value;
    let imageInput = document.getElementById("seller-image").files[0];

    // Validasi input
    if (!name || !whatsapp || !product || !price || !imageInput) {
        alert("Harap isi semua data dan upload gambar!");
        return;
    }

    // Format nomor WhatsApp (ganti 0 menjadi 62)
    if (whatsapp.startsWith("0")) {
        whatsapp = "62" + whatsapp.substring(1);
    }

    // Upload gambar sementara menggunakan FileReader
    let reader = new FileReader();
    reader.onload = function (e) {
        let sellerList = document.getElementById("seller-list");
        let sellerDiv = document.createElement("div");
        sellerDiv.innerHTML = `
            <img src="${e.target.result}" alt="${product}">
            <p><strong>${name}</strong></p>
            <p>Produk: ${product}</p>
            <p>Harga: Rp${price}/kg</p>
            <p><a href="https://wa.me/${whatsapp}" target="_blank">Hubungi via WhatsApp</a></p>
        `;
        sellerList.appendChild(sellerDiv);
    };
    reader.readAsDataURL(imageInput);

    // Tutup form
    closeForm();
}
