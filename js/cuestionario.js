(function () {
  'use strict';

  const PREGUNTAS = [
    "Nombre completo — ¿quién lo eligió y por qué?",
    "Fecha de nacimiento y edad.",
    "Lugar en tu familia de origen (orden entre hermanos).",
    "Signo astrológico.",
    "Profesión y ocupación actual.",
    "Estado de pareja / situación vincular (especificá tiempos).",
    "¿Con quién compartís el hogar y desde cuándo?",
    "Hijos: nombre, sexo y edad.",
    "Hobbies / ¿qué te encanta hacer en tus ratos libres?",
    "Acontecimiento importante en los últimos meses y su impacto en vos.",
    "¿Cómo viviste la pandemia? (pensamientos, sentimientos, efectos)",
    "Personaje que admires y por qué — características sobresalientes.",
    "Síntoma físico o dato de salud relevante.",
    "Tu sueño para la vida (tomá el tiempo que necesites).",
    "Motivo de consulta — ¿por qué quisiste hacer esta lectura?"
  ];

  function buildForm() {
    const container = document.getElementById('preguntas-container');
    container.innerHTML = '';
    PREGUNTAS.forEach((texto, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'pregunta-wrap';
      wrap.innerHTML = `
        <label class="pregunta-label" for="p${i + 1}">
          <span class="pregunta-num">${i + 1}</span>
          <span>${texto}</span>
        </label>
        <textarea class="campo" id="p${i + 1}" name="p${i + 1}" rows="3" placeholder="Tu respuesta…"></textarea>
      `;
      container.appendChild(wrap);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildForm();

    // Si viene desde el test, precargar mail y teléfono
    const params = new URLSearchParams(window.location.search);
    if (params.get('email')) document.getElementById('cues-email').value = params.get('email');
    if (params.get('tel'))   document.getElementById('cues-tel').value   = params.get('tel');

    document.getElementById('btn-enviar').addEventListener('click', function () {
      // Recopilar datos de contacto
      const email    = (document.getElementById('cues-email') || {}).value || '';
      const telefono = (document.getElementById('cues-tel')   || {}).value || '';

      // Recopilar las 15 respuestas
      const respuestas = [];
      for (let i = 1; i <= PREGUNTAS.length; i++) {
        respuestas.push((document.getElementById('p' + i) || {}).value || '');
      }
      const nombre = respuestas[0] || ''; // La primera pregunta es el nombre completo

      // Enviar las respuestas al mail de Vero y guardarlas en Google Sheets
      fetch('/api/save-cuestionario', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nombre, email, telefono, respuestas, preguntas: PREGUNTAS })
      }).catch(function () {});

      // Aviso por WhatsApp: cuestionario enviado + solicitud de consulta
      let msg = '🌀 *Bio Eneagrama — Solicitud de consulta*\n\n';
      msg += 'Hola Vero, te envié el cuestionario por mail y quiero solicitar una consulta personalizada.\n\n';
      if (nombre.trim()) msg += '👤 ' + nombre.trim().split('\n')[0] + '\n';
      if (email.trim())  msg += '📧 ' + email.trim() + '\n';
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');

      const btn = document.getElementById('btn-enviar');
      btn.textContent = '✓ Cuestionario enviado';
      btn.disabled = true;
    });
  });
})();
