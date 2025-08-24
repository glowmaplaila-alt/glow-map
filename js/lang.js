document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-selector');

  // Función para cargar y aplicar traducción
  function loadLanguage(lang) {
    console.log("Cargando idioma:", lang);

    fetch(`lang/${lang}.json`) // ✅ ruta absoluta desde la raíz
      .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar el archivo de idioma");
        return response.json();
      })
      .then(translations => {
        console.log("Datos cargados:", translations);

        // Aplica traducción a los elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[key]) {
            el.textContent = translations[key];
          } else {
            console.warn("No se encontró clave:", key);
          }
        });

        // ✅ Soporte RTL para árabe
        if (lang === 'ar') {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'ar';
          document.body.style.fontFamily = `"Cairo", Arial, sans-serif`;
        } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = lang;
          document.body.style.fontFamily = `"Cairo", Arial, sans-serif`;
        }
      })
      .catch(err => {
        console.error("Error cargando idioma:", err);
      });
  }

  // Cargar idioma desde localStorage o español por defecto
  const savedLang = localStorage.getItem('lang') || 'es';
  selector.value = savedLang;
  loadLanguage(savedLang);

  // Cuando cambia el selector
  selector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('lang', selectedLang);
    loadLanguage(selectedLang);
  });
});