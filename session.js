fetch('/check-login')
  .then(response => response.json())
  .then(data => {
    if (!data.loggedIn) {
      // Redirect to login page if not logged in
      window.location.href = "login.html";
    }
  })
  .catch(err => console.error("Session Check Error:", err));
