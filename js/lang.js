
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-selector');

  function loadLanguage(lang) {
    fetch(`lang/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (data[key]) {
            el.innerText = data[key];
          }
        });
      });
  }

  selector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    loadLanguage(selectedLang);
    localStorage.setItem('selectedLang', selectedLang);
  });

  const savedLang = localStorage.getItem('selectedLang') || 'es';
  selector.value = savedLang;
  loadLanguage(savedLang);
});








function loadLanguage(lang) {
  console.log("Cargando idioma:", lang); // <-- DEBUG
  fetch(`lang/${lang}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo de idioma");
      }
      return response.json();
    })
    .then(data => {
      console.log("Datos cargados:", data); // <-- DEBUG
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
          el.innerText = data[key];
        } else {
          console.warn("No se encontró clave:", key); // <-- DEBUG
        }
      });
    })
    .catch(err => {
      console.error("Error cargando idioma:", err);
    });
}
