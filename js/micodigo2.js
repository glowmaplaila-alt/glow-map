window.onload = function () {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorMsg.textContent = "Ingresa un correo electrónico válido.";
      e.preventDefault();
      return;
    }

    if (password.length < 6) {
      errorMsg.textContent = "La contraseña debe tener al menos 6 caracteres.";
      e.preventDefault();
    }
  });
};