const form = document.getElementById("loginForm");
const errorBox = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    errorBox.textContent = "Please fill in all fields.";
    return;
  }

  // Retrieve user from localStorage
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    errorBox.textContent = "No registered account found. Please register first.";
    return;
  }

  const user = JSON.parse(storedUser);

  if (user.email !== email) {
    errorBox.textContent = "Email not found.";
    return;
  }

  if (user.password !== password) {
    errorBox.textContent = "Incorrect password.";
    return;
  }

  // Clear errors and simulate login
  errorBox.textContent = "";
  alert("Login successful!");

  // Save login status (optional)
  localStorage.setItem("isLoggedIn", true);

  // Redirect to dashboard
  window.location.href = "index.php?page=dashboard";
});
