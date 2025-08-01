window.addEventListener('DOMContentLoaded', () => {
  const registroComidas = document.getElementById('registro-comidas');
  const emocionDespues = document.getElementById('emocion-despues');
  const vasosAgua = document.getElementById('vasos-agua');

  const colores = [
    'color-verde',
    'color-rojo',
    'color-naranja',
    'color-blanco',
    'color-morado'
  ];

  // Cargar datos almacenados
  registroComidas.value = localStorage.getItem('registroComidas') || '';
  emocionDespues.value = localStorage.getItem('emocionDespues') || '';
  vasosAgua.value = localStorage.getItem('vasosAgua') || '';

  colores.forEach(color => {
    const checkbox = document.getElementById(color);
    checkbox.checked = JSON.parse(localStorage.getItem(color)) || false;
    checkbox.addEventListener('change', () => {
      localStorage.setItem(color, checkbox.checked);
    });
  });

  registroComidas.addEventListener('input', () => {
    localStorage.setItem('registroComidas', registroComidas.value);
  });

  emocionDespues.addEventListener('input', () => {
    localStorage.setItem('emocionDespues', emocionDespues.value);
  });

  vasosAgua.addEventListener('input', () => {
    localStorage.setItem('vasosAgua', vasosAgua.value);
  });
});
