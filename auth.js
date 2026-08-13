document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const navList = document.querySelector(".nav_list");

    if (user) {
        // If user is logged in, modify navbar
        navList.innerHTML = `
            <li class="nav_item"><a href="C:/autoFix360/AutoFix.html" class="nav_link">Home</a></li>
            <li class="nav_item"><a href="C:/autoFix360/Book Reparir.html" class="nav_link">Book Repair</a></li>
            <li class="nav_item"><a href="C:/autoFix360/Insurance.html" class="nav_link">Insurance</a></li>
            <li class="nav_item"><a href="C:/autoFix360/cart.html" class="nav_link">Cart</a></li>
            <li class="nav_item"><a href="C:\autoFix360\orders.html" class="nav_link">Orders</a></li>
            <li class="nav_item"><a href="#" class="nav_link" id="logoutBtn">Logout (${user.email})</a></li>
        `;

        // Logout Functionality
        document.getElementById("logoutBtn").addEventListener("click", function () {
            localStorage.removeItem("user");
            alert("Logged out successfully!");
            window.location.reload();
        });
    } else {
        // If user is NOT logged in, show Sign Up option
        navList.innerHTML = `
            <li class="nav_item"><a href="C:/autoFix360/AutoFix.html" class="nav_link">Home</a></li>
            <li class="nav_item"><a href="C:/autoFix360/Book Reparir.html" class="nav_link">Book Repair</a></li>
            <li class="nav_item"><a href="C:/autoFix360/Insurance.html" class="nav_link">Insurance</a></li>
            <li class="nav_item"><a href="C:/autoFix360/cart.html" class="nav_link">Cart</a></li>
            <li class="nav_item"><a href="C:\autoFix360\orders.html" class="nav_link">Orders</a></li>
            <li class="nav_item"><a href="C:/autoFix360/signup.html" class="nav_link">Sign Up</a></li>
        `;
    }
});
