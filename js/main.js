document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Cargando precios reales...");

    // Clave API de Rainforest (Reemplaza con la tuya)
    const API_KEY = "TU_API_KEY_AQUI";
    const BASE_URL = "https://api.rainforestapi.com/request?api_key=" + API_KEY;

    // Productos a rastrear (IDs de Amazon)
    const productIDs = [
        { name: "PlayStation 5", asin: "B08FC5L3RG" },
        { name: "Tarjeta Gráfica RTX 3060", asin: "B08WPRMVWB" },
        { name: "iPhone 14 Pro", asin: "B0BDJH9V9J" }
    ];

    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpiar la tabla

    for (const product of productIDs) {
        try {
            const response = await fetch(`${BASE_URL}&type=product&amazon_domain=amazon.com&asin=${product.asin}`);
            const data = await response.json();

            // Obtener el precio si está disponible
            const price = data.product?.buybox_winner?.price?.value || "No disponible";
            const updated = new Date().toLocaleTimeString();

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>$${price}</td>
                <td>${updated}</td>
                <td><input type="number" class="price-target" placeholder="Ingrese precio" /></td>
                <td class="alert-status">-</td>
            `;
            productList.appendChild(row);
        } catch (error) {
            console.error("Error obteniendo precio:", error);
        }
    }

    // Agregar detección de precios
    document.querySelectorAll(".price-target").forEach((input, index) => {
        input.addEventListener("input", function () {
            const targetPrice = parseFloat(input.value);
            const currentPrice = parseFloat(document.querySelectorAll("td:nth-child(2)")[index].textContent.replace("$", ""));
            const alertCell = document.querySelectorAll(".alert-status")[index];

            if (!isNaN(targetPrice) && targetPrice >= 0) {
                if (currentPrice && targetPrice >= currentPrice) {
                    alertCell.innerHTML = "🔔 Precio alcanzado";
                    alertCell.style.color = "green";
                } else {
                    alertCell.innerHTML = "❌ Aún no baja";
                    alertCell.style.color = "red";
                }
            } else {
                alertCell.innerHTML = "-";
            }
        });
    });

    console.log("✅ Precios actualizados con datos reales.");
});
