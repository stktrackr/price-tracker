document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Price Tracker mejorado cargado...");

    // Cargar productos destacados
    const featuredList = document.getElementById("featured-list");
    const featuredProducts = [
        { name: "AirPods Pro", price: "$199", img: "https://via.placeholder.com/100" },
        { name: "MacBook Air", price: "$999", img: "https://via.placeholder.com/100" }
    ];

    featuredProducts.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `<img src="${product.img}" width="80"><br>${product.name} - ${product.price}`;
        featuredList.appendChild(div);
    });

    // Enviar formulario de contacto
    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("📩 ¡Mensaje enviado! Te responderemos pronto.");
    });
});
