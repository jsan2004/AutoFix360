document.getElementById('repair-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission
  
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block'; // Make the message visible
    successMessage.classList.add('show'); // Add animation class
  
    // Hide the success message after 20 seconds
    setTimeout(function() {
      successMessage.style.display = 'none';
      successMessage.classList.remove('show'); // Remove animation class
    }, 20000);  // 20000ms = 20 seconds
  });