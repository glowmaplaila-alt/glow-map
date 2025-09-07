window.addEventListener("load", () => {
  const fields = [
    "ejercicio",
    "duracion",
    "repeticiones",
    "objetivo-fuerza",
    "objetivo-flexibilidad",
    "objetivo-cardio",
    "comentario"
  ];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const saved = localStorage.getItem(id);
    if (el.type === "checkbox") {
      el.checked = saved === "true";
    } else {
      el.value = saved || "";
    }

    el.addEventListener("input", () => {
      if (el.type === "checkbox") {
        localStorage.setItem(id, el.checked);
      } else {
        localStorage.setItem(id, el.value);
      }
    });
  });

  const estado = document.getElementsByName("estado-ejercicio");
  const savedEstado = localStorage.getItem("estado-ejercicio");
  if (savedEstado) {
    [...estado].forEach(r => {
      if (r.value === savedEstado) r.checked = true;
    });
  }

  estado.forEach(r => {
    r.addEventListener("change", () => {
      if (r.checked) localStorage.setItem("estado-ejercicio", r.value);
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const guardarBtn = document.getElementById('guardar-entreno');

  guardarBtn.addEventListener('click', () => {
    const ejercicio = document.getElementById('ejercicio').value;
    const duracion = Number(document.getElementById('duracion').value);
    const repeticiones = Number(document.getElementById('repeticiones').value);
    const fecha = document.getElementById('fecha-entreno').value;
    const estado = document.querySelector('input[name="estado-ejercicio"]:checked')?.value || 'normal';
    const comentario = document.getElementById('comentario').value;

    if (!fecha || !ejercicio) return alert('Completa fecha y tipo de ejercicio');

    // Guardar en localStorage
    const entrenos = JSON.parse(localStorage.getItem('entrenos')) || [];
    entrenos.push({ fecha, ejercicio, duracion, repeticiones, estado, comentario });
    localStorage.setItem('entrenos', JSON.stringify(entrenos));

    alert('Entrenamiento guardado ✅');
    actualizarCalendario();
    actualizarGrafico();
  });

  function actualizarCalendario() {
    const calendario = document.getElementById('calendario');
    calendario.innerHTML = '';
    const entrenos = JSON.parse(localStorage.getItem('entrenos')) || [];
    entrenos.forEach(e => {
      const div = document.createElement('div');
      div.className = 'dia-entreno';
      div.innerHTML = `<strong>${e.fecha}</strong>: ${e.ejercicio} (${e.duracion} min)`;
      calendario.appendChild(div);
    });
  }

  function actualizarGrafico() {
    const entrenos = JSON.parse(localStorage.getItem('entrenos')) || [];
    const ctx = document.getElementById('grafico-progreso').getContext('2d');
    const labels = entrenos.map(e => e.fecha);
    const data = entrenos.map(e => e.duracion);
    
    if (window.grafico) window.grafico.destroy(); // destruir gráfico previo
    window.grafico = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Duración entrenamiento (min)',
          data,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Inicializar calendario y gráfico al cargar la página
  actualizarCalendario();
  actualizarGrafico();
});




document.addEventListener('DOMContentLoaded', () => {
  // --- FullCalendar ---
  const calendarEl = document.getElementById('calendar');
  const entrenos = JSON.parse(localStorage.getItem('entrenos')) || [];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: entrenos.map(e => ({
      title: `${e.ejercicio} (${e.duracion} min)`,
      start: e.fecha,
      description: `Repeticiones: ${e.repeticiones || '-'}, Estado: ${e.estado}`
    })),
    eventDidMount: info => {
      // Tooltip simple con comentario
      if (info.event.extendedProps.description) {
        info.el.setAttribute('title', info.event.extendedProps.description);
      }
    }
  });

  calendar.render();

  // --- Función para agregar un entrenamiento y actualizar calendario ---
  const guardarBtn = document.getElementById('guardar-entreno');
  guardarBtn.addEventListener('click', () => {
    const ejercicio = document.getElementById('ejercicio').value;
    const duracion = Number(document.getElementById('duracion').value);
    const repeticiones = Number(document.getElementById('repeticiones').value);
    const fecha = document.getElementById('fecha-entreno').value;
    const estado = document.querySelector('input[name="estado-ejercicio"]:checked')?.value || 'normal';
    const comentario = document.getElementById('comentario').value;

    if (!fecha || !ejercicio) return alert('Completa fecha y tipo de ejercicio');

    // Guardar en localStorage
    const entrenos = JSON.parse(localStorage.getItem('entrenos')) || [];
    const nuevo = { fecha, ejercicio, duracion, repeticiones, estado, comentario };
    entrenos.push(nuevo);
    localStorage.setItem('entrenos', JSON.stringify(entrenos));

    // Añadir evento al calendario
    calendar.addEvent({
      title: `${ejercicio} (${duracion} min)`,
      start: fecha,
      description: `Repeticiones: ${repeticiones || '-'}, Estado: ${estado}`
    });

    alert('Entrenamiento guardado ✅');
  });
});



const guardarBtn = document.getElementById('guardar-entreno');
const checkboxes = document.querySelectorAll('#workout-tracker .done');
const estrellasContainer = document.getElementById('estrellas');
const progresoCirculo = document.getElementById('progreso-circulo');
const progresoTexto = document.getElementById('progreso-circular-texto');
const completados = 5; // número de ejercicios completados
const totalEjercicios = 8;

const porcentaje = Math.round((completados / totalEjercicios) * 100);

const mensajeRecompensa = document.getElementById('mensaje-recompensa');
mensajeRecompensa.textContent = porcentaje === 100 
  ? translations.progress_message.completo 
  : translations.progress_message.parcial
      .replace('{completados}', completados)
      .replace('{total}', totalEjercicios);


function actualizarProgreso() {
  let completados = 0;
  checkboxes.forEach(cb => {
    if(cb.checked) completados++;
  });

  // porcentaje
  const porcentaje = Math.round((completados / totalEjercicios) * 100);

  // actualiza círculo SVG
  const radio = 60;
  const circunferencia = 2 * Math.PI * radio;
  const offset = circunferencia - (porcentaje / 100) * circunferencia;
  progresoCirculo.style.strokeDashoffset = offset;
  progresoTexto.textContent = `${porcentaje}%`;

  // actualiza estrellas (1 estrella cada 20%)
  const numEstrellas = Math.floor(porcentaje / 20);
  estrellasContainer.innerHTML = '';
  for(let i = 0; i < 5; i++){
    const span = document.createElement('span');
    span.classList.add('estrella');
    if(i < numEstrellas) span.classList.add('activa');
    span.textContent = '⭐';
    estrellasContainer.appendChild(span);
  }

  // mensaje
  if(porcentaje === 100){
    mensajeRecompensa.textContent = '¡Rutina completada! 🌟';
  } else {
    mensajeRecompensa.textContent = `Has completado ${completados} de ${totalEjercicios} ejercicios.`;
  }

  // guardar en localStorage
  const datos = {
    completados: Array.from(checkboxes).map(cb => cb.checked),
    porcentaje: porcentaje
  };
  localStorage.setItem('progresoEntrenamiento', JSON.stringify(datos));
}

// cargar datos al iniciar
window.addEventListener('load', () => {
  const datos = JSON.parse(localStorage.getItem('progresoEntrenamiento'));
  if(datos){
    checkboxes.forEach((cb, i) => {
      cb.checked = datos.completados[i];
      cb.closest('.exercise').classList.toggle('completed', cb.checked);
    });
    actualizarProgreso();
  }
});

// evento al guardar
guardarBtn.addEventListener('click', () => {
  // tachar ejercicios completados
  checkboxes.forEach(cb => {
    cb.closest('.exercise').classList.toggle('completed', cb.checked);
  });
  actualizarProgreso();
});


