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

function addMessage(text, sender){
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// lógica básica de recomendación (placeholder)
function recommendTemplate(query){
  const q = query.toLowerCase();

  // GlowHabit
  if(q.includes("hábito") || q.includes("habit")){
    return "Te recomiendo usar la plantilla GlowHabit Builder 📋: https://glowmaplaila-alt.github.io/glow-map/paginas/glowhabit.html";
  } 
  // GlowMood
  else if(q.includes("estado de ánimo") || q.includes("mood")){
    return "Parece que GlowMood Map sería ideal para ti 😊: https://glowmaplaila-alt.github.io/glow-map/paginas/glowmood.html";
  } 
  // GlowFocus (tareas flexibles)
  else if(q.includes("tareas") || q.includes("prioridad") || q.includes("urgencia") ||
          q.includes("organizar") || q.includes("planificar") || q.includes("enfoque") ||
          q.includes("flexible") || q.includes("productividad") || q.includes("agenda")){
    return "Te recomiendo usar la plantilla GlowFocus 📝 para organizar tus tareas según prioridad y urgencia: https://glowmaplaila-alt.github.io/glow-map/paginas/glowfocus.html";
  } 
  // Respuesta general
  else {
    return "Podrías probar GlowMap general o explorar todas las plantillas en el menú: https://glowmaplaila-alt.github.io/glow-map/";
  }
}