document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-selector');

  // Función para cargar y aplicar traducción
  function loadLanguage(lang) {
    fetch(`../lang/${lang}.json`)
      .then(response => {
        if (!response.ok) throw new Error('Archivo no encontrado');
        return response.json();
      })
      .then(translations => {
        // Aplica traducción a los elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[key]) {
            el.textContent = translations[key];
          }
        });

        // Soporte RTL si es árabe
        if (lang === 'ar') {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'ar';
        } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = lang;
        }
      })
      .catch(error => {
        console.error('Error al cargar traducción:', error);
      });
  }

  // Carga el idioma al cambiar el selector
  selector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    loadLanguage(selectedLang);
  });

  // Opcional: cargar idioma guardado en localStorage
  const savedLang = localStorage.getItem('lang') || 'es';
  selector.value = savedLang;
  loadLanguage(savedLang);

  // Guardar idioma al cambiar
  selector.addEventListener('change', (e) => {
    localStorage.setItem('lang', e.target.value);
  });
});