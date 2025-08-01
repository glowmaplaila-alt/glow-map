window.addEventListener("load", function () {
  const storageKeys = [
    "hora-manana",
    "acciones-manana",
    "sentir-manana",
    "hora-noche",
    "acciones-noche",
    "sentir-noche",
    "habito-agua",
    "habito-ejercicio",
    "habito-sinmovil",
    "habito-agradecer",
    "resumen-dia",
    "estado-dia"
  ];

  // Cargar datos guardados
  storageKeys.forEach((key) => {
    const el = document.getElementById(key);
    if (el) {
      if (el.type === "checkbox") {
        el.checked = localStorage.getItem(key) === "true";
      } else if (el.type === "radio") {
        if (localStorage.getItem(key) === el.value) el.checked = true;
      } else {
        el.value = localStorage.getItem(key) || "";
      }
    }
  });

  // Guardar datos al cambiar
  document.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", function () {
      if (el.type === "checkbox") {
        localStorage.setItem(el.id, el.checked);
      } else if (el.type === "radio") {
        if (el.checked) localStorage.setItem("estado-dia", el.value);
      } else {
        localStorage.setItem(el.id, el.value);
      }
    });
  });
});
