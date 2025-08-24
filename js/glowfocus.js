
  const campos = ['necesarias', 'postergables', 'agradables', 'emociones'];
  const radios = document.getElementsByName('estado');

  // Cargar valores guardados
  campos.forEach(id => {
    const saved = localStorage.getItem(id);
    if (saved) document.getElementById(id).value = saved;
  });

  const estadoGuardado = localStorage.getItem('estado');
  if (estadoGuardado) {
    for (let r of radios) {
      if (r.value === estadoGuardado) r.checked = true;
    }
  }

  // Guardar automáticamente al salir de la página
  window.addEventListener('beforeunload', function () {
    campos.forEach(id => {
      localStorage.setItem(id, document.getElementById(id).value);
    });

    for (let r of radios) {
      if (r.checked) {
        localStorage.setItem('estado', r.value);
        break;
      }
    }
  });

  // Cuando cargue el DOM
  document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar ---
    const openBtn = document.getElementById('open-menu');
    const closeBtn = document.getElementById('close-menu');
    const sidebar = document.getElementById('sidebar');

    if (openBtn && closeBtn && sidebar) {
      openBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        openBtn.style.display = 'none';
      });

      closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        openBtn.style.display = 'block';
      });
    }

    // --- Calendario ---
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
        events: cargarEventosGlowFocus(),
        eventClick: function (info) {
          const datos = JSON.parse(localStorage.getItem(info.event.id));
          if (datos) {
            alert(
              `Tareas necesarias: ${datos.necesarias}\n` +
              `Tareas postergables: ${datos.postergables}\n` +
              `Tareas agradables: ${datos.agradables}\n` +
              `Emociones: ${datos.emociones}\n` +
              `Estado: ${datos.estado}`
            );
          }
        }
      });
      calendar.render();
    } else {
      console.warn('⚠️ No se encontró el elemento con id="calendar"');
    }
  });

  // --- Funciones de guardado y carga ---
  function guardarGlowFocus() {
    const tareas = {
      necesarias: document.getElementById('necesarias').value,
      postergables: document.getElementById('postergables').value,
      agradables: document.getElementById('agradables').value,
      emociones: document.getElementById('emociones').value,
      estado: document.querySelector('input[name="estado"]:checked')?.value || 'no definido',
      fecha: new Date().toISOString().split('T')[0]
    };
    const clave = 'glowFocus-' + tareas.fecha;
    localStorage.setItem(clave, JSON.stringify(tareas));
    alert('Tareas guardadas con éxito.');
    location.reload();
  }

  function cargarEventosGlowFocus() {
    let eventos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      if (clave.startsWith('glowFocus-')) {
        const datos = JSON.parse(localStorage.getItem(clave));
        eventos.push({
          id: clave,
          title: 'GlowFocus',
          start: datos.fecha,
        });
      }
    }
    return eventos;
  }


 
