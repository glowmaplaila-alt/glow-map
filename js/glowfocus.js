window.onload = function () {
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
};