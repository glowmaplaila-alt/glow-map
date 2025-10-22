window.addEventListener("load", () => {
  // Campos guardados en localStorage
  const campos = [
    "intencion",
    "deseos",
    "tecnica",
    "descarga",
    "miedo",
    "ansiedad",
    "calma",
    "gratitud"
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

  // Frase del día 🌞
  const frases = [
    "Hoy me permito sentir sin juzgar.",
    "Respiro y me reconecto con mi calma.",
    "Mis pensamientos no me definen.",
    "Cada día es una nueva oportunidad para florecer.",
    "Soy más fuerte de lo que creo."
  ];
  document.getElementById('frase-dia').textContent =
    frases[Math.floor(Math.random() * frases.length)];

  // Consejo diario 🌱
  const tips = [
    "Dedica 5 minutos a respirar profundamente.",
    "Escribe algo bonito sobre ti.",
    "Desconecta de pantallas por 10 minutos.",
    "Da un paseo corto y observa el cielo.",
    "Escucha una canción que te eleve el ánimo."
  ];
  document.getElementById('mensaje-dia').textContent =
    tips[Math.floor(Math.random() * tips.length)];

  // Ritual de respiración 🧘‍♀️
  const circle = document.getElementById('ritual-anim');
  document.getElementById('ritual-btn').addEventListener('click', () => {
    circle.classList.add('active');
    setTimeout(() => {
      circle.classList.remove('active');
    }, 60000); // 1 minuto
  });

  // Color del ánimo 🎨
  const colorInput = document.getElementById('color-animo');
  const colorTexto = document.getElementById('color-resultado');
  colorInput.addEventListener('input', () => {
    document.body.style.backgroundColor = colorInput.value + '30';
    colorTexto.textContent = "Tu color mental de hoy: " + colorInput.value;
    localStorage.setItem('colorDia', colorInput.value);
  });
  if (localStorage.getItem('colorDia')) {
    colorInput.value = localStorage.getItem('colorDia');
    document.body.style.backgroundColor = localStorage.getItem('colorDia') + '30';
  }

  // Mapa emocional semanal 💫
  document.querySelectorAll('.dia').forEach(d => {
    d.addEventListener('click', () => d.classList.toggle('active'));
  });

  // Sonidos relajantes 🎧 (rutas locales)
// Rutas a los audios (ajusta si tu carpeta es otra)
const sonidosPaths = {
  olas: "../imagenes/sonidos/olas.mp3",
  bosque: "../imagenes/sonidos/bosque.mp3",
  lluvia: "../imagenes/sonidos/lluvia.mp3"
};

// Contenedor para instancias de Audio (se crearán "lazy")
const sonidos = {
  olas: null,
  bosque: null,
  lluvia: null
};

const playBtn = document.getElementById("play-sonido");
let stopBtn = document.getElementById("stop-sonido");
const selectorSonido = document.getElementById("sonido");

let audioActual = null; // referencia al audio que está sonando

// Si no hay botón de stop en el HTML, lo creamos junto al play (opcional)
if (!stopBtn && playBtn) {
  stopBtn = document.createElement("button");
  stopBtn.id = "stop-sonido";
  stopBtn.textContent = "Detener";
  stopBtn.setAttribute("data-i18n", "stop_sonido"); // para i18n si lo usas
  // intenta insertar justo después del botón de play
  playBtn.parentNode?.insertBefore(stopBtn, playBtn.nextSibling);
}

// función auxiliar para crear/cargar audio
function obtenerAudio(key) {
  if (!sonidosPaths[key]) return null;
  if (!sonidos[key]) {
    const a = new Audio(sonidosPaths[key]);
    a.loop = true;
    // escuchar errores de carga
    a.addEventListener("error", (e) => {
      console.error("Error al cargar audio:", key, sonidosPaths[key], e);
      alert("No se pudo cargar el audio seleccionado. Revisa la ruta o el archivo.");
    });
    sonidos[key] = a;
  }
  return sonidos[key];
}

// reproducir sonido seleccionado
function reproducirSonido(key) {
  if (!key) {
    alert("Selecciona un ambiente antes de reproducir 🎵");
    return;
  }
  const audio = obtenerAudio(key);
  if (!audio) return;

  // si ya hay otro audio sonando, lo paramos
  if (audioActual && audioActual !== audio) {
    audioActual.pause();
    audioActual.currentTime = 0;
  }

  audioActual = audio;

  // intentamos reproducir y manejamos la promesa
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // reproducción iniciada con éxito
        console.log("Reproduciendo:", key);
      })
      .catch(err => {
        console.warn("Reproducción bloqueada o error:", err);
        // mensajito amigable para el usuario — muchos navegadores requieren una interacción directa
        alert("Reproducción bloqueada por el navegador. Haz clic de nuevo en Reproducir 🎧 para confirmar.");
      });
  }
}

// detener audio actual
function detenerAudioActual() {
  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
    console.log("Audio detenido.");
    audioActual = null;
  }
}

// Eventos
if (playBtn && selectorSonido) {
  playBtn.addEventListener("click", () => {
    const elegido = selectorSonido.value;
    reproducirSonido(elegido);
  });
}

if (stopBtn) {
  stopBtn.addEventListener("click", () => {
    detenerAudioActual();
  });
}

// (Opcional) Si el usuario cambia la selección, puedes detener el audio actual automáticamente
if (selectorSonido) {
  selectorSonido.addEventListener("change", () => {
    // si quieres que al cambiar se detenga lo que suena:
    // detenerAudioActual();

    // o si prefieres reproducir automáticamente el nuevo seleccionado:
    // const nuevo = selectorSonido.value;
    // if (nuevo) reproducirSonido(nuevo);
  });
}

// Depuración: muestra si alguna ruta no existe (advertencia)
Object.keys(sonidosPaths).forEach(k => {
  // No intentamos fetch para no romper CORS; solo comprobación superficial
  if (!sonidosPaths[k] || typeof sonidosPaths[k] !== "string") {
    console.warn("Ruta de audio ausente o inválida para:", k);
  }
});

  // Liberar pensamientos 💨
  document.getElementById('reset-dia').addEventListener('click', () => {
    document.querySelectorAll('input[type=\"text\"], textarea').forEach(el => el.value = '');
    document.querySelectorAll('input[type=\"checkbox\"]').forEach(el => el.checked = false);
    alert('🌬️ Has liberado tus pensamientos del día');
  });
});
  