document.addEventListener("DOMContentLoaded", function () {
    const sellerList = document.getElementById("seller-list");
    const formPopup = document.getElementById("form-popup");

    // Ambil data dari Local Storage
    let sellers = JSON.parse(localStorage.getItem("sellers")) || [];

    function displaySellers() {
        sellerList.innerHTML = "";
        sellers.forEach((seller, index) => {
            const sellerDiv = document.createElement("div");
            sellerDiv.classList.add("seller-card");
            sellerDiv.innerHTML = `
                <h3>${seller.name}</h3>
                <img src="${seller.image}" alt="${seller.product}" class="seller-image">
                <p>Jenis Ikan: ${seller.product}</p>
                <p>Harga: Rp${seller.price}/kg</p>
                <p>Kontak: <a href="https://wa.me/${seller.whatsapp}" target="_blank">${seller.whatsapp}</a></p>
                <button onclick="deleteSeller(${index})">Hapus</button>
            `;
            sellerList.appendChild(sellerDiv);
        });
    }

    window.openForm = function () {
        formPopup.style.display = "block";
    };

    window.closeForm = function () {
        formPopup.style.display = "none";
    };

    window.addSeller = function () {
        const name = document.getElementById("seller-name").value;
        let whatsapp = document.getElementById("seller-whatsapp").value;
        const product = document.getElementById("seller-product").value;
        const price = document.getElementById("seller-price").value;
        const imageInput = document.getElementById("seller-image");

        // Konversi nomor WhatsApp jika diawali dengan 0
        if (whatsapp.startsWith("0")) {
            whatsapp = "62" + whatsapp.substring(1);
        }

        // Cek apakah semua input terisi
        if (!name || !whatsapp || !product || !price || !imageInput.files.length) {
            alert("Harap isi semua kolom!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageData = event.target.result;

            // Simpan data baru
            const newSeller = { name, whatsapp, product, price, image: imageData };
            sellers.push(newSeller);
            localStorage.setItem("sellers", JSON.stringify(sellers));

            displaySellers();
            closeForm();
        };

        reader.readAsDataURL(imageInput.files[0]);
    };

    window.deleteSeller = function (index) {
        sellers.splice(index, 1);
        localStorage.setItem("sellers", JSON.stringify(sellers));
        displaySellers();
    };

    // Tampilkan daftar yang tersimpan
    displaySellers();
});
