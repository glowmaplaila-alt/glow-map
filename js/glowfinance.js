window.addEventListener("load", () => {
  const campos = [
    "descripcion-gasto",
    "monto-gasto",
    "objetivo-financiero",
    "gasto-necesario",
    "gasto-impulsivo",
    "gasto-alegria"
  ];

  campos.forEach(id => {
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
});

    document.addEventListener('DOMContentLoaded', () => {
  const metaAhorroInput = document.getElementById('meta-ahorro');
  const ahorroActualInput = document.getElementById('ahorro-actual');
  const actualizarBtn = document.getElementById('actualizar-progreso');
  const barraProgreso = document.getElementById('progreso-barra');
  const habitos = document.querySelectorAll('.habitos-financieros input[type="checkbox"]');

  // Crear texto del porcentaje junto a la barra
  const porcentajeTexto = document.createElement('span');
  porcentajeTexto.id = 'porcentaje-progreso';
  porcentajeTexto.style.marginLeft = '10px';
  porcentajeTexto.style.fontWeight = 'bold';
  porcentajeTexto.style.color = '#5a4734';
  barraProgreso.parentElement.appendChild(porcentajeTexto);

  // ---- FUNCIONES ----

  function getClaveDia() {
    const hoy = new Date();
    return `finanzas_${hoy.getFullYear()}_${hoy.getMonth() + 1}_${hoy.getDate()}`;
  }

  function cargarDatos() {
    const data = localStorage.getItem(getClaveDia());
    return data ? JSON.parse(data) : { meta: 0, ahorro: 0, habitos: [] };
  }

  function guardarDatos(data) {
    localStorage.setItem(getClaveDia(), JSON.stringify(data));
  }

  function calcularProgreso(meta, ahorro, habitos) {
    let porcentajeAhorro = meta > 0 ? Math.min((ahorro / meta) * 100, 100) : 0;
    const totalHabitos = habitos.length;
    const cumplidos = [...habitos].filter(h => h.checked).length;
    const porcentajeHabitos = totalHabitos > 0 ? (cumplidos / totalHabitos) * 100 : 0;

    // Ponderar: 70% ahorro + 30% hábitos
    const progresoTotal = Math.round((porcentajeAhorro * 0.7) + (porcentajeHabitos * 0.3));
    barraProgreso.style.width = `${progresoTotal}%`;
    porcentajeTexto.textContent = `${progresoTotal}%`;
  }

  // ---- CARGAR DATOS GUARDADOS ----
  const datos = cargarDatos();
  if (datos.meta) metaAhorroInput.value = datos.meta;
  if (datos.ahorro) ahorroActualInput.value = datos.ahorro;
  if (datos.habitos && datos.habitos.length) {
    habitos.forEach((h, i) => h.checked = datos.habitos[i] || false);
  }

  calcularProgreso(datos.meta, datos.ahorro, habitos);

  // ---- EVENTOS ----
  actualizarBtn.addEventListener('click', () => {
    const meta = parseFloat(metaAhorroInput.value) || 0;
    const ahorro = parseFloat(ahorroActualInput.value) || 0;
    const datosActuales = { ...cargarDatos(), meta, ahorro, habitos: [...habitos].map(h => h.checked) };
    guardarDatos(datosActuales);
    calcularProgreso(meta, ahorro, habitos);
  });

  habitos.forEach((h, i) => {
    h.addEventListener('change', () => {
      const datosActuales = cargarDatos();
      datosActuales.habitos[i] = h.checked;
      guardarDatos(datosActuales);
      calcularProgreso(parseFloat(metaAhorroInput.value) || 0, parseFloat(ahorroActualInput.value) || 0, habitos);
    });
  });

  // Reset automático si cambia el día
  const ultimaClave = localStorage.getItem('ultimaClaveFinanzas');
  const claveHoy = getClaveDia();
  if (ultimaClave && ultimaClave !== claveHoy) {
    localStorage.removeItem(ultimaClave);
  }
  localStorage.setItem('ultimaClaveFinanzas', claveHoy);
});






document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    height: 'auto',
    selectable: true,
    editable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      list: 'Lista'
    },

    /* ==== Cuando se selecciona una fecha ==== */
    select: function(info) {
      const gasto = prompt("💸 Añadir gasto o nota para el " + info.startStr + ":");
      if (gasto) {
        calendar.addEvent({
          title: gasto,
          start: info.startStr,
          allDay: true
        });
        guardarEventos(calendar.getEvents());
      }
      calendar.unselect();
    },

    /* ==== Cargar eventos guardados ==== */
    events: JSON.parse(localStorage.getItem('gastosCalendario') || '[]'),

    /* ==== Eliminar evento al hacer clic ==== */
    eventClick: function(info) {
      if (confirm(`¿Eliminar este evento?\n${info.event.title}`)) {
        info.event.remove();
        guardarEventos(calendar.getEvents());
      }
    }
  });

  calendar.render();

  /* ==== Guardar los eventos en localStorage ==== */
  function guardarEventos(eventos) {
    const data = eventos.map(ev => ({
      title: ev.title,
      start: ev.startStr,
      allDay: ev.allDay
    }));
    localStorage.setItem('gastosCalendario', JSON.stringify(data));
  }
});
