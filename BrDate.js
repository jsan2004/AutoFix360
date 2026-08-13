// Get tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);  // Increment the date by 1

// Get the date 10 days from tomorrow
const tenDaysLater = new Date(tomorrow);
tenDaysLater.setDate(tomorrow.getDate() + 10);  // Increment the date by 10 days

// Format the dates to YYYY-MM-DD
const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
const tenDaysLaterFormatted = tenDaysLater.toISOString().split('T')[0];

// Set the min and max attributes
document.getElementById('schedule-date').min = tomorrowFormatted;
document.getElementById('schedule-date').max = tenDaysLaterFormatted;


// Estimated pricing
const priceData = {
    Car: {
      "Engine Repair": 5000,
      "Brake Repair": 2500,
      "Oil Change": 1500,
      "Transmission Repair": 7000,
      "Other": "The price will be stated after the problem is examined on-field"
    },
    Bike: {
      "Engine Repair": 3000,
      "Brake Repair": 1200,
      "Oil Change": 800,
      "Transmission Repair": 5000,
      "Other": "The price will be stated after the problem is examined on-field"
    },
    Truck: {
      "Engine Repair": 8000,
      "Brake Repair": 4000,
      "Oil Change": 2500,
      "Transmission Repair": 10000,
      "Other": "The price will be stated after the problem is examined on-field"
    },
    Other: {
      "Engine Repair": "The price will be stated after the problem is examined on-field",
      "Brake Repair": "The price will be stated after the problem is examined on-field",
      "Oil Change": "The price will be stated after the problem is examined on-field",
      "Transmission Repair": "The price will be stated after the problem is examined on-field",
      "Other": "The price will be stated after the problem is examined on-field"
    }
  };
  
  document.getElementById("vehicle-type").addEventListener("change", updatePrice);
  document.getElementById("repair-type").addEventListener("change", updatePrice);
  
  function updatePrice() {
    const vehicle = document.getElementById("vehicle-type").value;
    const repair = document.getElementById("repair-type").value;
    const priceField = document.getElementById("estimated-price");
  
    if (vehicle && repair) {
      priceField.value = priceData[vehicle][repair]; 
    } else {
      priceField.value = "Select options to see price";
    }
  }
// sql connection

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".repair-form");

  form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission

      // Retrieve user email from localStorage (if logged in)
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const userEmail = user ? user.email : "Guest"; // Default to "Guest" if not logged in

      // Collect form data
      const formData = {
          user_email: userEmail,
          vehicle_type: document.getElementById("vehicle-type").value,
          repair_type: document.getElementById("repair-type").value,
          estimated_price: document.getElementById("estimated-price").value,
          schedule_date: document.getElementById("schedule-date").value,
          comments: document.getElementById("comments").value,
          address_line1: document.getElementById("address_line1").value,
          address_line2: document.getElementById("address_line2").value || "",
          landmark: document.getElementById("landmark").value,
          pin_code: document.getElementById("pin_code").value
      };

      try {
          const response = await fetch("http://localhost:5000/book-repair", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData)
          });

          const result = await response.json();
          if (result.status === "success") {
              alert("Booking Successful!");

              // Save order details in localStorage
              let orders = JSON.parse(localStorage.getItem("orders")) || [];
              orders.push(formData);
              localStorage.setItem("orders", JSON.stringify(orders));

              form.reset(); // Reset form
              
              // Redirect to orders page
              window.location.href = "C:/autoFix360/orders.html";
          } else {
              alert("Booking Failed: " + result.message);
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
      }
  });
});



  