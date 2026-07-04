function startRecommendation() {
    // Scroll to the recommendation section
    document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
}

function recommendProduct() {
    const skin = document.getElementById("skinType").value;
    console.log("Selected skin type:", skin);

    if (skin === "") {
        alert("Please select your skin type");
        return;
    }

    console.log("Sending request to /recommend...");

    fetch("/recommend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            skinType: skin
        })
    })
    .then(response => {
        console.log("Response status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("Received data:", data);
        
        let html = "<h2>Recommended Products</h2>";

        data.forEach(product => {
            html += `
            <div class="card">
                <h3>${product.name}</h3>
                <p><b>Brand:</b> ${product.brand}</p>
                <p><b>Category:</b> ${product.category}</p>
                <p><b>Price:</b> $${product.price}</p>
                <p><b>Rating:</b> ⭐ ${product.rating}</p>
            </div>
            `;
        });

        console.log("HTML to display:", html);
        document.getElementById("result").innerHTML = html;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching recommendations. Check console for details.</p>";
    });
}