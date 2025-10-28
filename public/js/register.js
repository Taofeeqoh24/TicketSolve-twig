// Simple validation + localStorage
const form = document.getElementById("registerForm");
const errorBox = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // simple client-side validation
  if (!name || name.length < 3) {
    errorBox.textContent = "Name must be at least 3 characters";
    return;
  }
  if (!email.includes("@")) {
    errorBox.textContent = "Please enter a valid email address";
    return;
  }
  if (password.length < 6) {
    errorBox.textContent = "Password must be at least 6 characters long";
    return;
  }

  errorBox.textContent = "";

  // save to localStorage
  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration successful!");
  form.reset();

  // redirect to login or dashboard
  window.location.href = "index.php?page=login";
});
