document.addEventListener('DOMContentLoaded', function () {
  // Verificar si FullCalendar está definido
  if (typeof FullCalendar === 'undefined') {
    console.error('❌ FullCalendar no está definido. Asegúrate de cargarlo antes que este script.');
    return;
  }

  const calendarEl = document.getElementById('calendar');

  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: cargarEventosGlowFlow()
    });

    calendar.render();
  } else {
    console.warn('⚠️ No se encontró el elemento con id="calendar"');
  }
});

function guardarGlowFlow() {
  const datos = {
    horaManana: document.getElementById('hora-manana').value,
    accionesManana: document.getElementById('acciones-manana').value,
    sentirManana: document.getElementById('sentir-manana').value,
    horaNoche: document.getElementById('hora-noche').value,
    accionesNoche: document.getElementById('acciones-noche').value,
    sentirNoche: document.getElementById('sentir-noche').value,
    resumenDia: document.getElementById('resumen-dia').value,
    estadoDia: document.querySelector('input[name="estado-dia"]:checked')?.value || '',
    habitoAgua: document.getElementById('habito-agua').checked,
    habitoEjercicio: document.getElementById('habito-ejercicio').checked,
    habitoSinMovil: document.getElementById('habito-sinmovil').checked,
    habitoAgradecer: document.getElementById('habito-agradecer').checked
  };

  const fechaActual = new Date().toISOString().split('T')[0];
  localStorage.setItem('glowflow-' + fechaActual, JSON.stringify(datos));

  alert('¡Rutina guardada para hoy!');
  location.reload(); // Para que el calendario se actualice inmediatamente
}

function cargarEventosGlowFlow() {
  const eventos = [];

  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    if (clave.startsWith('glowflow-')) {
      const fecha = clave.split('glowflow-')[1];
      eventos.push({
        title: 'Rutina guardada',
        start: fecha,
        allDay: true
      });
    }
  }

  return eventos;
}


