document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Price Tracker listo para buscar productos dinámicos...");

    const API_KEY = "53C09080269C4EFB88ECE212F519E7E4";
    const BASE_URL = "https://api.rainforestapi.com/request?api_key=" + API_KEY;
    
    document.getElementById("search-btn").addEventListener("click", async function () {
        const query = document.getElementById("search-query").value;
        const category = document.getElementById("category").value;
        
        if (!query) {
            alert("Por favor, ingrese un término de búsqueda.");
            return;
        }

        const url = `${BASE_URL}&type=search&amazon_domain=amazon.com&search_term=${query}&category_id=${category}`;
        fetchData(url);
    });
});

async function fetchData(url) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "<tr><td colspan='5'>Cargando productos...</td></tr>";

    try {
        const response = await fetch(url);
        const data = await response.json();

        productList.innerHTML = ""; // Limpiar la tabla antes de inyectar datos

        data.search_results.forEach(product => {
            const price = product?.price?.value;
            const updatedRaw = product?.buybox_winner?.updated_at || Date.now();
            const updatedDate = new Date(updatedRaw);
            
            // Ajuste de la hora a la zona horaria del usuario
            const localTime = updatedDate.toLocaleString(undefined, {
                timeZoneName: "short"
            });

            // Solo mostrar productos con precio disponible
            if (!price) return; 

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.title}</td>
                <td>$${price.toFixed(2)}</td>
                <td>${localTime}</td>
                <td><input type="number" class="price-target" placeholder="Ingrese precio" /></td>
                <td class="alert-status">-</td>
            `;
            productList.appendChild(row);
        });

        attachPriceAlerts();
    } catch (error) {
        console.error("Error al obtener productos:", error);
        productList.innerHTML = "<tr><td colspan='5'>Error al cargar productos.</td></tr>";
    }
}

function attachPriceAlerts() {
    document.querySelectorAll(".price-target").forEach((input, index) => {
        input.addEventListener("input", function () {
            const targetPrice = parseFloat(input.value);
            const currentPrice = parseFloat(document.querySelectorAll("td:nth-child(2)")[index].textContent.replace("$", ""));
            const alertCell = document.querySelectorAll(".alert-status")[index];

            if (!isNaN(targetPrice) && targetPrice >= 0) {
                if (currentPrice && targetPrice >= currentPrice) {
                    alertCell.innerHTML = "🔔 Precio alcanzado";
                    alertCell.style.color = "green";
                    showNotification(`¡El precio ha bajado a $${currentPrice}!`);
                } else {
                    alertCell.innerHTML = "❌ Aún no baja";
                    alertCell.style.color = "red";
                }
            }
        });
    });
}
