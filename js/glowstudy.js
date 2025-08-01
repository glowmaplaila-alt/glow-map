window.addEventListener('DOMContentLoaded', () => {
  const planDiario = document.getElementById('plan-diario');
  const planExamenes = document.getElementById('plan-examenes');
  const escalaAnsiedad = document.getElementById('escala-ansiedad');
  const valorAnsiedad = document.getElementById('valor-ansiedad');
  const ideasDescanso = document.getElementById('ideas-descanso');

  // Cargar datos del localStorage
  planDiario.value = localStorage.getItem('planDiario') || '';
  planExamenes.value = localStorage.getItem('planExamenes') || '';
  escalaAnsiedad.value = localStorage.getItem('escalaAnsiedad') || 5;
  valorAnsiedad.textContent = escalaAnsiedad.value;
  ideasDescanso.value = localStorage.getItem('ideasDescanso') || '';

  // Eventos para guardar cambios
  planDiario.addEventListener('input', () => {
    localStorage.setItem('planDiario', planDiario.value);
  });

  planExamenes.addEventListener('input', () => {
    localStorage.setItem('planExamenes', planExamenes.value);
  });

  escalaAnsiedad.addEventListener('input', () => {
    localStorage.setItem('escalaAnsiedad', escalaAnsiedad.value);
    valorAnsiedad.textContent = escalaAnsiedad.value;
  });

  ideasDescanso.addEventListener('input', () => {
    localStorage.setItem('ideasDescanso', ideasDescanso.value);
  });
});
