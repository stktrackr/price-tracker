document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Price Tracker está cargando productos...");

    // Datos de prueba (más adelante usaremos datos reales)
    const products = [
        { name: "PlayStation 5", price: "$499", updated: "Hace 10 minutos" },
        { name: "Tarjeta Gráfica RTX 3060", price: "$379", updated: "Hace 5 minutos" },
        { name: "iPhone 14 Pro", price: "$999", updated: "Hace 2 minutos" }
    ];

    // Insertar productos en la tabla
    const productList = document.getElementById("product-list");
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
});
