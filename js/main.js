document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Price Tracker está cargando productos...");

    const products = [
        { name: "PlayStation 5", price: 499, updated: "Hace 10 minutos" },
        { name: "Tarjeta Gráfica RTX 3060", price: 379, updated: "Hace 5 minutos" },
        { name: "iPhone 14 Pro", price: 999, updated: "Hace 2 minutos" }
    ];

    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; 

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.updated}</td>
            <td><input type="number" class="price-target" placeholder="Ingrese precio" /></td>
            <td class="alert-status">-</td>
        `;
        productList.appendChild(row);
    });

    // Detectar cambios en el input del precio objetivo
    document.querySelectorAll(".price-target").forEach((input, index) => {
        input.addEventListener("change", function() {
            const targetPrice = parseFloat(input.value);
            const currentPrice = products[index].price;
            const alertCell = productList.rows[index].cells[4];

            if (!isNaN(targetPrice) && targetPrice >= 0) {
                if (targetPrice >= currentPrice) {
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

    console.log("✅ Productos cargados correctamente.");
});
