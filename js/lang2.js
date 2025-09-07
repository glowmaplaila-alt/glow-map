document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-selector');
  const mensajeRecompensa = document.getElementById('mensaje-recompensa');

  function loadLanguage(lang) {
    fetch(`../lang/${lang}.json`)
      .then(response => {
        if (!response.ok) throw new Error('Archivo no encontrado');
        return response.json();
      })
      .then(translations => {
        // Traduce texto visible
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[key]) el.textContent = translations[key];
        });

        // Traduce placeholders de inputs
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
          const key = el.getAttribute('data-i18n-placeholder');
          if (translations[key]) el.setAttribute('placeholder', translations[key]);
        });

        // Actualiza mensaje de recompensa si ya tienes porcentaje
        if (typeof completados !== 'undefined' && typeof totalEjercicios !== 'undefined') {
          const porcentaje = Math.round((completados / totalEjercicios) * 100);
          mensajeRecompensa.textContent = porcentaje === 100 
            ? translations.progress_message.completo 
            : translations.progress_message.parcial
                .replace('{completados}', completados)
                .replace('{total}', totalEjercicios);
        }

        // Soporte RTL si es árabe
        if (lang === 'ar') {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'ar';
        } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = lang;
        }
      })
      .catch(error => console.error('Error al cargar traducción:', error));
  }

  // Carga idioma al cambiar selector
  selector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('lang', selectedLang);
    loadLanguage(selectedLang);
  });

  // Carga idioma guardado o por defecto
  const savedLang = localStorage.getItem('lang') || 'es';
  selector.value = savedLang;
  loadLanguage(savedLang);
});