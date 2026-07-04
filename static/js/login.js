// ================================
// Show / Hide Password
// ================================

function togglePassword() {

    const password = document.getElementById("password");
    const icon = document.querySelector(".toggle-password");

    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }
}

// ================================
// Form Validation
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {

        const username = document.querySelector("input[name='username']").value.trim();
        const password = document.querySelector("input[name='password']").value.trim();

        if (username === "" || password === "") {

            e.preventDefault();

            alert("Please enter both Username and Password.");

            return;
        }

        if (password.length < 6) {

            e.preventDefault();

            alert("Password must be at least 6 characters long.");

            return;
        }

    });

});

// ================================
// Welcome Animation
// ================================

window.onload = function () {

    const loginBox = document.querySelector(".login-box");

    loginBox.style.opacity = "0";
    loginBox.style.transform = "translateY(30px)";

    setTimeout(() => {

        loginBox.style.transition = "all 0.8s ease";
        loginBox.style.opacity = "1";
        loginBox.style.transform = "translateY(0)";

    }, 100);

};

// ================================
// Enter Key Support
// ================================

document.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        document.querySelector("button[type='submit']").click();

    }

});