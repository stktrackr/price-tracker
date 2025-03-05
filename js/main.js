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
    productList.innerHTML = "<tr><td colspan='7'>Cargando productos...</td></tr>";

    try {
        const response = await fetch(url);
        const data = await response.json();

        productList.innerHTML = ""; 

        data.search_results.forEach(product => {
            const price = product?.price?.value;
            const updatedDate = new Date().toLocaleString();
            const imageUrl = product?.image || "https://via.placeholder.com/60";
            const buyLink = product?.link || "#";

            if (!price) return;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${imageUrl}" class="product-image"></td>
                <td>${product.title}</td>
                <td>$${price.toFixed(2)}</td>
                <td>${updatedDate}</td>
                <td><input type="number" class="price-target" placeholder="Ingrese precio" /></td>
                <td class="alert-status">-</td>
                <td><a href="${buyLink}" target="_blank" class="buy-btn">🛒 Comprar</a></td>
            `;
            productList.appendChild(row);
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        productList.innerHTML = "<tr><td colspan='7'>Error al cargar productos.</td></tr>";
    }
}
