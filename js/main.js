document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Price Tracker listo.");

    const currencySelect = document.getElementById("currency-select");
    currencySelect.addEventListener("change", function () {
        alert(`🌎 Moneda cambiada a ${currencySelect.value}`);
    });

    const wishlistList = document.getElementById("wishlist-list");
    
    function addToWishlist(product) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist();
    }

    function renderWishlist() {
        wishlistList.innerHTML = "";
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.forEach(product => {
            let li = document.createElement("li");
            li.textContent = product;
            wishlistList.appendChild(li);
        });
    }

    renderWishlist();

    // Historial de precios con Chart.js
    const ctx = document.getElementById("priceChart").getContext("2d");
    const priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Día 1", "Día 2", "Día 3", "Día 4"],
            datasets: [{
                label: "Precio",
                data: [100, 90, 95, 80],
                borderColor: "#42a5f5",
                fill: false
            }]
        },
        options: {}
    });

    // Animaciones con GSAP
    gsap.from("section", { duration: 1, opacity: 0, y: 20, stagger: 0.2 });
});
