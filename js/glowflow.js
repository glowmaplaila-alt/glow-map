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



 // ------------------------------
    // Variables y elementos
    // ------------------------------
    const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');
    const barraHabitos = document.getElementById('barra-habitos');
    const glowpoints = document.getElementById('glowpoints');

    const estrellasContainer = document.getElementById('estrellas');
    const mensajeRecompensa = document.getElementById('mensaje-recompensa');
    const progresoCirculo = document.getElementById('progreso-circulo');
    const progresoTexto = document.getElementById('progreso-circular-texto');

    const totalDiasSemana = 5;

    // ------------------------------
    // Función guardar datos
    // ------------------------------
    function guardarGlowFlow() {
      // Guardar horas y textos
      localStorage.setItem('hora-manana', document.getElementById('hora-manana').value);
      localStorage.setItem('acciones-manana', document.getElementById('acciones-manana').value);
      localStorage.setItem('sentir-manana', document.getElementById('sentir-manana').value);

      localStorage.setItem('hora-noche', document.getElementById('hora-noche').value);
      localStorage.setItem('acciones-noche', document.getElementById('acciones-noche').value);
      localStorage.setItem('sentir-noche', document.getElementById('sentir-noche').value);

      localStorage.setItem('resumen-dia', document.getElementById('resumen-dia').value);
      localStorage.setItem('nota-rapida', document.getElementById('nota-rapida').value);

      // Guardar hábitos
      const habitos = {};
      checkboxes.forEach(cb => habitos[cb.id] = cb.checked);
      localStorage.setItem('habitos', JSON.stringify(habitos));

      // Aumentar estrella si el día se guardó
      let diasGuardados = parseInt(localStorage.getItem('glowflow_dias_guardados') || 0);
      diasGuardados = Math.min(diasGuardados + 1, totalDiasSemana);
      localStorage.setItem('glowflow_dias_guardados', diasGuardados);

      // Actualizar gráficos y recompensas
      actualizarProgreso();
      actualizarRecompensas();
      alert('¡GlowFlow guardado correctamente! ⭐');
    }

    // ------------------------------
    // Función cargar datos al inicio
    // ------------------------------
    function cargarDatos() {
      document.getElementById('hora-manana').value = localStorage.getItem('hora-manana') || '';
      document.getElementById('acciones-manana').value = localStorage.getItem('acciones-manana') || '';
      document.getElementById('sentir-manana').value = localStorage.getItem('sentir-manana') || '';

      document.getElementById('hora-noche').value = localStorage.getItem('hora-noche') || '';
      document.getElementById('acciones-noche').value = localStorage.getItem('acciones-noche') || '';
      document.getElementById('sentir-noche').value = localStorage.getItem('sentir-noche') || '';

      document.getElementById('resumen-dia').value = localStorage.getItem('resumen-dia') || '';
      document.getElementById('nota-rapida').value = localStorage.getItem('nota-rapida') || '';

      // Cargar hábitos
      const habitosGuardados = JSON.parse(localStorage.getItem('habitos') || '{}');
      checkboxes.forEach(cb => cb.checked = habitosGuardados[cb.id] || false);

      actualizarProgreso();
      actualizarRecompensas();
    }

    // ------------------------------
    // Actualizar barra de hábitos y GlowPoints
    // ------------------------------
    function actualizarProgreso() {
      let completados = 0;
      checkboxes.forEach(cb => { if(cb.checked) completados++; });
      const porcentaje = (completados / checkboxes.length) * 100;
      barraHabitos.style.width = porcentaje + '%';
      glowpoints.textContent = completados * 10;
    }

    // ------------------------------
    // Actualizar estrellas y círculo de progreso
    // ------------------------------
    function actualizarRecompensas() {
      let estrellas = parseInt(localStorage.getItem('glowflow_dias_guardados') || 0);

      // Mostrar estrellas
      estrellasContainer.innerHTML = '⭐'.repeat(estrellas);

      // Mensaje
      if(estrellas >= totalDiasSemana){
        mensajeRecompensa.textContent = "¡Felicidades! Semana GlowFocus completada 🎉";
      } else {
        mensajeRecompensa.textContent = `Te faltan ${totalDiasSemana - estrellas} días para terminar la semana.`;
      }

      // Progreso circular
      const porcentaje = (estrellas / totalDiasSemana) * 100;
      const radio = progresoCirculo.r.baseVal.value;
      const circunferencia = 2 * Math.PI * radio;
      progresoCirculo.style.strokeDasharray = circunferencia;
      progresoCirculo.style.strokeDashoffset = circunferencia - (porcentaje / 100) * circunferencia;
      progresoTexto.textContent = `${Math.round(porcentaje)}%`;
    }

    // ------------------------------
    // Iniciar
    // ------------------------------
    document.addEventListener('DOMContentLoaded', () => {
      cargarDatos();
    });

