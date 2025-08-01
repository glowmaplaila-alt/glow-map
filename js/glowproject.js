window.addEventListener("load", () => {
  const campos = [
    "objetivo-proyecto",
    "pasos-proyecto",
    "ideas-rapidas",
    "barra-progreso"
  ];

  campos.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const saved = localStorage.getItem(id);
    if (el.type === "range") {
      el.value = saved || 0;
      document.getElementById("porcentaje").textContent = `${el.value}%`;
    } else {
      el.value = saved || "";
    }

    el.addEventListener("input", () => {
      localStorage.setItem(id, el.value);
      if (el.id === "barra-progreso") {
        document.getElementById("porcentaje").textContent = `${el.value}%`;
      }
    });
  });
});
