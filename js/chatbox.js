// chat.js
const openBtn = document.getElementById("chat-open-btn");
const widget = document.getElementById("chat-widget");
const toggle = document.getElementById("chat-toggle");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");

// abrir/cerrar
openBtn.addEventListener("click", () => {
  widget.style.display = "block";
  openBtn.style.display = "none";
});
toggle.addEventListener("click", () => {
  widget.style.display = "none";
  openBtn.style.display = "block";
});

// enviar mensaje usuario
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage(){
  const text = input.value.trim();
  if(!text) return;
  addMessage(text, "user");
  input.value = "";

  // Simular respuesta recomendación (aquí luego pones tu lógica real)
  setTimeout(() => {
    const reply = recommendTemplate(text);
    addMessage(reply, "bot");
  }, 500);
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);

  if (sender === "bot") {
    div.innerHTML = text;  // ✅ Permite HTML (links, <br>, etc.)
  } else {
    div.textContent = text; // ✅ El usuario se mantiene en texto plano
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// lógica básica de recomendación (corregida)
function recommendTemplate(query) {
  const q = query.toLowerCase();

  // --- GlowMood Map ---
  if (
    q.includes("emocion") ||
    q.includes("emociones") ||
    q.includes("sentimiento") ||
    q.includes("sentimientos") ||
    q.includes("animo") ||
    q.includes("estado de ánimo") ||
    q.includes("estado de animo") ||
    q.includes("humor") ||
    q.includes("mood") ||
    q.includes("glowmood") ||
    q.includes("mapa de emociones") ||
    q.includes("mapa emocional") ||
    q.includes("registro emocional") ||
    q.includes("diario emocional") ||
    q.includes("sentirse") ||
    q.includes("cómo me siento") ||
    q.includes("como me siento") ||
    q.includes("sentí") ||
    q.includes("sentir")  
  ) {
    return `Aquí tienes la plantilla de GlowMood — Mapa de Emociones 😊<br> <br>
      <a href="paginas/glowmood.html" target="_blank">Abrir GlowMood</a><br><br>
      Podrás registrar tus emociones diarias, ver el resumen semanal y mensual, y obtener consejos según tu estado.`;
  }

      // --- GlowFitness ---
  if (
    q.includes("ejercicio") || q.includes("ejercicios") || q.includes("deporte") || q.includes("fitness") ||
    q.includes("entreno") || q.includes("entrenar") || q.includes("gimnasio") ||
    q.includes("gym") || q.includes("fuerza") || q.includes("cardio") ||
    q.includes("flexibilidad")
  ) {
    return `Aquí tienes la plantilla GlowFitness 🏋️‍♀️ para registrar tus entrenamientos:<br><br>
      <a href="paginas/glowfitness.html" target="_blank">Abrir GlowFitness</a><br><br>
      Podrás llevar un registro de tus ejercicios, progresos, objetivos y recompensas.`;
  }

  // --- GlowHabit ---
  if (q.includes("hábito") || q.includes("habit") || q.includes("habito")) {
    return `Te recomiendo usar la plantilla GlowHabit Builder 📋:<br><br>
      <a href="paginas/glowhabit.html" target="_blank">Abrir GlowHabit</a>`;
  }

  // --- GlowFocus ---
  if (
    q.includes("tareas") || q.includes("prioridad") || q.includes("urgencia") ||
    q.includes("organizar") || q.includes("planificar") || q.includes("enfoque") ||
    q.includes("flexible") || q.includes("productividad") || q.includes("agenda")
  ) {
    return `Te recomiendo usar la plantilla GlowFocus 📝:<br><br>
      <a href="paginas/glowfocus.html" target="_blank">Abrir GlowFocus</a>`;
  }

  // --- Respuesta general ---
  return `Podrías probar GlowMap general o explorar todas las plantillas en el menú:<br> <br>
    <a href="https://glowmaplaila-alt.github.io/glow-map/" target="_blank">Ver todas las plantillas</a>`;

}