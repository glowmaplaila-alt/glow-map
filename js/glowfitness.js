window.addEventListener("load", () => {
  const fields = [
    "ejercicio",
    "duracion",
    "repeticiones",
    "objetivo-fuerza",
    "objetivo-flexibilidad",
    "objetivo-cardio",
    "comentario"
  ];

  fields.forEach(id => {
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

  const estado = document.getElementsByName("estado-ejercicio");
  const savedEstado = localStorage.getItem("estado-ejercicio");
  if (savedEstado) {
    [...estado].forEach(r => {
      if (r.value === savedEstado) r.checked = true;
    });
  }

  estado.forEach(r => {
    r.addEventListener("change", () => {
      if (r.checked) localStorage.setItem("estado-ejercicio", r.value);
    });
  });
});
