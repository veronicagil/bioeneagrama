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

      const btn = document.getElementById('btn-enviar');
      btn.textContent = 'Enviando…';
      btn.disabled = true;

      // Enviar las respuestas al mail de Vero y guardarlas en Google Sheets
      fetch('/api/save-cuestionario', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nombre, email, telefono, respuestas, preguntas: PREGUNTAS })
      }).then(function (r) {
        if (!r.ok) throw new Error('envio');
        mostrarTurno(nombre, email);
      }).catch(function () {
        btn.textContent = '📩 Enviar cuestionario y solicitar consulta';
        btn.disabled = false;
        alert('No pudimos enviar el cuestionario. Revisá tu conexión y probá de nuevo.');
      });
    });

    // Cierre: cuestionario recibido → tecla para coordinar el turno por WhatsApp
    function mostrarTurno(nombre, email) {
      let msg = '🌀 *Bio Eneagrama — Turno de consulta*\n\n';
      msg += 'Hola Vero, ya te envié el cuestionario. Quiero coordinar un turno para mi devolución personalizada.\n\n';
      if (nombre.trim()) msg += '👤 ' + nombre.trim().split('\n')[0] + '\n';
      if (email.trim())  msg += '📧 ' + email.trim() + '\n';
      document.getElementById('btn-turno').href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
      document.getElementById('cues-form').classList.add('hidden');
      document.getElementById('cues-turno').classList.remove('hidden');
      window.scrollTo(0, 0);
    }
  });
})();
