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
const sonidos = {
  olas: new Audio("../imagenes/sonidos/olas.mp3"),
  bosque: new Audio("../imagenes/sonidos/bosque.mp3"),
  lluvia: new Audio("../imagenes/sonidos/lluvia.mp3")
};

const playBtn = document.getElementById("play-sonido");
const selectorSonido = document.getElementById("sonido");

if (playBtn && selectorSonido) {
  playBtn.addEventListener("click", () => {
    const elegido = selectorSonido.value;

    // Detiene todos los sonidos
    Object.values(sonidos).forEach(s => {
      s.pause();
      s.currentTime = 0;
    });

    if (elegido && sonidos[elegido]) {
      sonidos[elegido].play().catch(err => {
        console.warn("Reproducción bloqueada:", err);
        alert("Haz clic de nuevo en Reproducir 🎧 (el navegador lo permite solo tras una interacción)");
      });
    } else {
      alert("Selecciona un ambiente antes de reproducir 🎵");
    }
  });
  }

  // Liberar pensamientos 💨
  document.getElementById('reset-dia').addEventListener('click', () => {
    document.querySelectorAll('input[type=\"text\"], textarea').forEach(el => el.value = '');
    document.querySelectorAll('input[type=\"checkbox\"]').forEach(el => el.checked = false);
    alert('🌬️ Has liberado tus pensamientos del día');
  });
});
  