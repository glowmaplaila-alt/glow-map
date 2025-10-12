  document.addEventListener('DOMContentLoaded', function() {

  // Inicializar calendario
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    height: 600,
    events: JSON.parse(localStorage.getItem('glowRegistros') || '[]'),
    eventClick: function(info) {
      alert("📅 Registro del " + info.event.start.toLocaleDateString() + ":\n" + info.event.title);
    }
  });
  calendar.render();

  // Función para actualizar progreso
  function actualizarProgreso() {
    const checkboxes = document.querySelectorAll('.habit');
    const total = checkboxes.length;
    const completadas = [...checkboxes].filter(c => c.checked).length;
    const porcentaje = Math.round((completadas / total) * 100);
    const circle = document.getElementById('progreso-circulo');
    const text = document.getElementById('progreso-circular-texto');
    const estrellasDiv = document.getElementById('estrellas');
    const mensaje = document.getElementById('mensaje-recompensa');

    const offset = 377 - (377 * porcentaje) / 100;
    circle.style.strokeDasharray = '377';
    circle.style.strokeDashoffset = offset;
    text.textContent = porcentaje + '%';

    estrellasDiv.innerHTML = '⭐'.repeat(Math.floor(porcentaje / 20));
    mensaje.textContent =
      porcentaje === 100 ? '¡Excelente! Has cumplido todos tus hábitos de hoy 🥇' :
      'Sigue avanzando en tus hábitos saludables 🌿';

    return porcentaje;
  }

  // Guardar registro
  document.getElementById('guardar-registro').addEventListener('click', () => {
    const fecha = new Date().toISOString().split('T')[0];
    const comidas = document.getElementById('registro-comidas').value.trim();
    const emocion = document.getElementById('emocion-despues').value.trim();
    const vasos = document.getElementById('vasos-agua').value;

    // Hábitos y colores seleccionados
    const habitos = [...document.querySelectorAll('.habit')].filter(c => c.checked).map(c => c.parentNode.textContent.trim());
    const colores = [...document.querySelectorAll('.checkbox-group input')].filter(c => c.checked).map(c => c.parentNode.textContent.trim());

    if (!comidas && !emocion && habitos.length === 0 && colores.length === 0 && vasos === '') {
      alert("Por favor completa algún campo antes de guardar.");
      return;
    }

    // Actualizar progreso
    const porcentaje = actualizarProgreso();

    // Crear evento para el calendario
    const evento = {
      title: `🍽️ ${comidas || 'Registro de nutrición'} — ${emocion || ''} (${porcentaje}%)`,
      start: fecha,
      extendedProps: { habitos, colores, vasos }
    };

    // Guardar en localStorage
    const registros = JSON.parse(localStorage.getItem('glowRegistros') || '[]');
    registros.push(evento);
    localStorage.setItem('glowRegistros', JSON.stringify(registros));

    // Añadir al calendario
    calendar.addEvent(evento);

    alert("✅ Registro guardado en el calendario del " + fecha);

    // Limpiar campos
    document.getElementById('registro-comidas').value = '';
    document.getElementById('emocion-despues').value = '';
    document.getElementById('vasos-agua').value = '';
    document.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = false);

    // Reset de progreso
    actualizarProgreso();
  });

  // Inicializar progreso si hay registros previos
  actualizarProgreso();

}); // Fin DOMContentLoaded

function cargarTraduccion(lang) {
  fetch(`../i18n/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });

      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (data[key]) el.placeholder = data[key];
      });
    });
}

document.getElementById("language-selector").addEventListener("change", e => {
  const lang = e.target.value;
  cargarTraduccion(lang);
});