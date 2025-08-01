
    window.onload = function () {
    document.getElementById('registroForm').addEventListener('submit', function(e) {
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorMsg = document.getElementById('errorMsg');
      errorMsg.textContent = "";

      // Validación simple
      if (nombre.length < 3) {
        errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
        e.preventDefault();
        return;
      }

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
}
  