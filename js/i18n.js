// --- Script de traducción multilingüe GlowMap ---
const languageSelect = document.getElementById("language-select");
const defaultLang = localStorage.getItem("selectedLang") || "es";

function loadLanguage(lang) {
  fetch(`../lang/${lang}.json`)
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar el archivo de idioma");
      return response.json();
    })
    .then(data => applyTranslations(data))
    .catch(error => console.error("Error de traducción:", error));
}

function applyTranslations(data) {
  // Cambiar texto dentro de elementos con data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (data[key]) el.textContent = data[key];
  });

  // Cambiar placeholders (inputs, textareas, etc.)
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (data[key]) el.placeholder = data[key];
  });

  // Cambiar título de la página si tiene data-i18n
  const title = document.querySelector("title[data-i18n]");
  if (title) {
    const key = title.getAttribute("data-i18n");
    if (data[key]) title.textContent = data[key];
  }

  // Cambiar dirección del texto si es árabe
  if (document.documentElement.lang === "ar" || data["lang_direction"] === "rtl") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
}

function changeLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("selectedLang", lang);
  loadLanguage(lang);
}

// --- Inicialización ---
if (languageSelect) {
  languageSelect.value = defaultLang;
  languageSelect.addEventListener("change", e => changeLanguage(e.target.value));
}

// Cargar idioma guardado al inicio
changeLanguage(defaultLang);
