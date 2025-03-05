document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Price Tracker está cargando productos...");

    // Datos de prueba (más adelante usaremos datos reales)
    const products = [
        { name: "PlayStation 5", price: "$499", updated: "Hace 10 minutos" },
        { name: "Tarjeta Gráfica RTX 3060", price: "$379", updated: "Hace 5 minutos" },
        { name: "iPhone 14 Pro", price: "$999", updated: "Hace 2 minutos" }
    ];

    // Verificamos que el elemento con ID 'product-list' existe
    const productList = document.getElementById("product-list");
    if (!productList) {
        console.error("❌ No se encontró el elemento #product-list.");
        return;
    }

    productList.innerHTML = ""; // Limpiar contenido previo

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.updated}</td>
        `;
        productList.appendChild(row);
    });

    console.log("✅ Productos cargados correctamente.");
});
