window.addEventListener("load", () => {
  const campos = [
    "intencion",
    "deseos",
    "tecnica",
    "descarga",
    "miedo",
    "ansiedad",
    "calma",
    "gratitud"
  ];

  campos.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const saved = localStorage.getItem(id);
    if (el.type === "checkbox") {
      el.checked = saved === "true";
    } else {
      el.value = saved || "";
    }

    el.addEventListener("input", () => {
      if (el.type === "checkbox") {
        localStorage.setItem(id, el.checked);
      } else {
        localStorage.setItem(id, el.value);
      }
    });
  });

  // Recomendación diaria
  const mensajes = [
    "Respira profundo y suelta lo que no necesitas hoy.",
    "Eres suficiente tal como eres.",
    "Haz una pausa para sentir gratitud por lo más simple.",
    "Permítete sentir sin juzgar.",
    "Hoy es un buen día para reconectar contigo mismo."
  ];

  const mensajeDiv = document.getElementById("mensaje-dia");
  const mensajeRandom = mensajes[Math.floor(Math.random() * mensajes.length)];
  mensajeDiv.textContent = mensajeRandom;
});
