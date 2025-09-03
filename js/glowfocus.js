
  const campos = ['necesarias', 'postergables', 'agradables', 'emociones'];
  const radios = document.getElementsByName('estado');

  document.addEventListener('DOMContentLoaded', () => {
  function activateTaskEvents(taskItem) {
    const check = taskItem.querySelector('.check');
    const input = taskItem.querySelector('input');

    // ✔ Marcar tarea hecha
    check.addEventListener('click', () => {
      taskItem.classList.toggle('done');
      check.classList.toggle('done');
      check.textContent = check.classList.contains('done') ? "✔" : "";
    });

    // ➕ Crear nueva tarea al presionar Enter
    input.addEventListener('keydown', (e) => {
      if (e.key === "Enter" && input.value.trim() !== "") {
        e.preventDefault();
        const newTask = taskItem.cloneNode(true);
        newTask.classList.remove('done');
        newTask.querySelector('input').value = "";
        newTask.querySelector('.check').classList.remove('done');
        newTask.querySelector('.check').textContent = "";
        taskItem.parentElement.appendChild(newTask);
        activateTaskEvents(newTask);
        newTask.querySelector('input').focus();
      }
    });
  }

  // Inicializar eventos en todas las listas
  document.querySelectorAll('.task-item').forEach(activateTaskEvents);
});


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

  // --- Configuración del sistema de recompensas ---
const maxEstrellas = 5; // Una semana = 5 estrellas
let estrellasGanadas = 0;
let ultimaFechaGuardada = "";

// --- Al cargar la página, traer progreso desde localStorage ---
document.addEventListener("DOMContentLoaded", () => {
  const progreso = JSON.parse(localStorage.getItem("glowFocus-progreso"));
  if (progreso) {
    estrellasGanadas = progreso.estrellas || 0;
    ultimaFechaGuardada = progreso.ultimaFecha || "";
    mostrarEstrellas();
  }
});

// --- Función de guardado principal ---
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

  // --- 🎁 Sistema de recompensas semanal ---
  const hoy = tareas.fecha;

  if (hoy !== ultimaFechaGuardada) {
    // Solo una estrella por día
    estrellasGanadas++;
    ultimaFechaGuardada = hoy;

    if (estrellasGanadas > maxEstrellas) {
      estrellasGanadas = 1; // Reinicia ciclo semanal
    }

    // Guardar progreso
    localStorage.setItem("glowFocus-progreso", JSON.stringify({
      estrellas: estrellasGanadas,
      ultimaFecha: ultimaFechaGuardada
    }));

    mostrarEstrellas();
    // Animación desde el botón
    lanzarEstrellas(5);
    // Animación alrededor del círculo de progreso
    lanzarEstrellasCircular(7);
  }

  location.reload();
}

// --- Cargar eventos en el calendario ---
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

// --- Mostrar estrellas en pantalla ---
function mostrarEstrellas() {
  const estrellasDiv = document.getElementById('estrellas');
  const mensaje = document.getElementById('mensaje-recompensa');
  estrellasDiv.innerHTML = '';

  for (let i = 1; i <= maxEstrellas; i++) {
    const star = document.createElement('span');
    star.textContent = '★';
    if (i <= estrellasGanadas) {
      star.classList.add('active', 'animar'); 
      star.addEventListener('animationend', () => star.classList.remove('animar'));
    }
    estrellasDiv.appendChild(star);
  }

  // ✅ Solo progreso circular
  const mensajeMotivador = generarMensajeMotivador();
  mostrarProgresoCircular(mensajeMotivador);

  mensaje.textContent = mensajeMotivador;

  // Animar círculo
  const circulo = document.getElementById("progreso-circulo");
  circulo.classList.add('animar-circulo');
  circulo.addEventListener('animationend', () => circulo.classList.remove('animar-circulo'));
}

function generarMensajeMotivador() {
  const porcentaje = (estrellasGanadas / maxEstrellas) * 100;

  if (porcentaje === 0) return "¡Comienza tu semana GlowFocus! ✨";
  if (porcentaje > 0 && porcentaje < 40) return "¡Buen inicio! Sigue así 👏";
  if (porcentaje >= 40 && porcentaje < 80) return "¡Vas genial! 💪";
  if (porcentaje >= 80 && porcentaje < 100) return "¡Casi al 100%! No te detengas 🚀";
  if (porcentaje === 100) return "✅ ¡Semana completada al 100%! 🌟 Felicidades";
}

// ✅ Eliminado mostrarProgresoSemanal()

function mostrarProgresoCircular(mensaje) {
  const circulo = document.getElementById("progreso-circulo");
  const texto = document.getElementById("progreso-circular-texto");

  const porcentaje = Math.round((estrellasGanadas / maxEstrellas) * 100);
  const offset = 377 - (377 * porcentaje / 100);
  circulo.style.strokeDashoffset = offset;

  texto.textContent = porcentaje + "%";
}

function lanzarEstrellas(num = 5) {
  const contenedor = document.getElementById("estrellas-animadas");

  for (let i = 0; i < num; i++) {
    const estrella = document.createElement("span");
    estrella.textContent = "★";
    estrella.classList.add("estrella-flotante");

    estrella.style.left = Math.random() * 100 + "%";
    estrella.style.fontSize = 16 + Math.random() * 24 + "px";
    estrella.style.animationDelay = (Math.random() * 0.5) + "s";

    contenedor.appendChild(estrella);
    estrella.addEventListener("animationend", () => estrella.remove());
  }
}

function lanzarEstrellas(num = 7) {
  const contenedor = document.getElementById("estrellas-animadas");
  const boton = document.querySelector(".boton-centro button");
  const botonRect = boton.getBoundingClientRect();

  for (let i = 0; i < num; i++) {
    const estrella = document.createElement("span");
    estrella.textContent = "★";
    estrella.classList.add("estrella-flotante");

    estrella.style.left = botonRect.left + Math.random() * botonRect.width + "px";
    estrella.style.top = botonRect.top + "px";

    estrella.style.fontSize = 16 + Math.random() * 24 + "px";
    estrella.style.animationDelay = (Math.random() * 0.3) + "s";

    contenedor.appendChild(estrella);
    estrella.addEventListener("animationend", () => estrella.remove());
  }
}

function lanzarEstrellasCircular(num = 8) {
  const circulo = document.querySelector(".progreso-circular");
  const rect = circulo.getBoundingClientRect();
  const centroX = rect.left + rect.width / 2;
  const centroY = rect.top + rect.height / 2;

  const contenedor = document.getElementById("estrellas-animadas");

  for (let i = 0; i < num; i++) {
    const estrella = document.createElement("span");
    estrella.textContent = "★";
    estrella.classList.add("estrella-orbita");

    estrella.style.left = centroX + "px";
    estrella.style.top = centroY + "px";

    estrella.style.fontSize = 14 + Math.random() * 20 + "px";
    estrella.style.animationDelay = (Math.random() * 0.3) + "s";

    contenedor.appendChild(estrella);
    estrella.addEventListener("animationend", () => estrella.remove());
  }
}

