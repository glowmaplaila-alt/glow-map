window.addEventListener("load", () => {
  const campos = [
    "descripcion-gasto",
    "monto-gasto",
    "objetivo-financiero",
    "gasto-necesario",
    "gasto-impulsivo",
    "gasto-alegria"
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
});