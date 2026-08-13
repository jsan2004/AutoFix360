// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4, // Show 4 products per row
  spaceBetween: 20, // Adjust spacing between products
  breakpoints: {
    1024: {
      slidesPerView: 4, // 4 per row on desktop
    },
    768: {
      slidesPerView: 2, // 2 per row on tablets
    },
    480: {
      slidesPerView: 1, // 1 per row on mobile
    }
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Animations
ScrollReveal().reveal(".top_nav", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
});
ScrollReveal().reveal(".nav", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
  delay: 100,
});

ScrollReveal().reveal(".header", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
  delay: 200,
});
ScrollReveal().reveal(".section", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
  duration: 1000,
  delay: 100,
});
ScrollReveal().reveal(".footer", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
  duration: 1000,
  delay: 100,
});

// mobile nav
const hamburger = document.querySelector(".hamburger");
const Nav = document.querySelector(".mobile_nav");

hamburger.addEventListener("click", () => {
  Nav.classList.toggle("mobile_nav_hide");
});

const AddToCart = document.querySelectorAll(".add_to_cart");

AddToCart.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const title = button.getAttribute("data-title");
    const image = button.getAttribute("data-image");
    const price = button.getAttribute("data-price");

    const cartItem = { id, title, image, price };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

document.getElementById("signupForm").addEventListener("submit", async function(event) {
  event.preventDefault();  // Prevent page refresh

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Sending request:", email, password); // Debugging log

  try {
      const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
      });

      console.log("Response status:", response.status); // Log response status
      const result = await response.json();
      console.log("Response data:", result); // Log response data

      if (response.ok) {
          document.getElementById("message").innerText = "Signup successful!";
      } else {
          document.getElementById("message").innerText = result.message || "Signup failed!";
      }
  } catch (error) {
      console.error("Error during fetch:", error);
      document.getElementById("message").innerText = "Signup failed!";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.getElementById("signupNav").style.display = "none";
    document.getElementById("myAccountNav").style.display = "block";
    document.getElementById("userEmail").innerText = user.email;
  } else {
    document.getElementById("signupNav").style.display = "block";
    document.getElementById("myAccountNav").style.display = "none";
  }
});

// Logout function (Logs out but does not delete account)
function logout() {
  localStorage.removeItem("user");
  window.location.href = "C:/autoFix360/AutoFix.html"; // Redirect to homepage
}

// Sign Out (Delete Account from Database)
async function signOut() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
  if (!confirmDelete) return;

  try {
    const response = await fetch("http://localhost:5000/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });

    const result = await response.json();
    if (result.success) {
      localStorage.removeItem("user"); // Remove from frontend storage
      alert("Your account has been deleted.");
      window.location.href = "C:/autoFix360/AutoFix.html"; // Redirect to homepage
    } else {
      alert("Error deleting account. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
}


