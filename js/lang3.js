document.addEventListener('DOMContentLoaded', () => {
  const langSelector = document.getElementById('language-selector');
  const elements = document.querySelectorAll('[data-i18n]');

  async function loadLanguage(lang) {
    try {
      const res = await fetch(`lang/${lang}.json`);
      if (!res.ok) throw new Error('Archivo de idioma no encontrado');
      const translations = await res.json();

      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  // Cargar idioma por defecto
  loadLanguage(langSelector.value);

  // Cambiar idioma al seleccionar
  langSelector.addEventListener('change', (e) => {
    loadLanguage(e.target.value);
  });
});
