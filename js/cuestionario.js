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

  function buildMessage() {
    let msg = '🌀 *Cuestionario Bio Eneagrama — Vero Gil*\n\n';
    PREGUNTAS.forEach((texto, i) => {
      const val = (document.getElementById('p' + (i + 1)) || {}).value || '(sin respuesta)';
      msg += `*${i + 1}. ${texto}*\n${val.trim()}\n\n`;
    });
    msg += 'Por favor reenvía estas respuestas para una mejor interpretación. ¡Muchas gracias! — Vero Gil';
    return msg;
  }

  const RESPUESTAS_PRUEBA = [
    "María García — lo eligió mi abuela materna porque era su nombre favorito.",
    "15 de marzo de 1985. Tengo 40 años.",
    "Segunda de tres hermanos. Tengo una hermana mayor y un hermano menor.",
    "Piscis.",
    "Diseñadora gráfica. Trabajo de manera freelance desde hace 5 años.",
    "En pareja hace 8 años con Pablo. Convivimos desde hace 4. Relación estable aunque con momentos de distancia emocional.",
    "Con mi pareja y nuestra hija Luna. Vivimos juntos desde hace 4 años.",
    "Luna, femenina, 6 años.",
    "Leer, pintar acuarelas los domingos, caminar en la naturaleza cuando puedo. Me recarga mucho estar al aire libre.",
    "Cambié de trabajo hace 3 meses. Al principio fue mucha angustia y sensación de pérdida, pero fue abriendo algo nuevo en mí que todavía estoy procesando.",
    "Fue muy difícil. Me encerré mucho, trabajé en exceso, descuidé mi cuerpo. Por otro lado descubrí la meditación y empecé a ver cosas que antes no me animaba a mirar.",
    "Frida Kahlo. Me impacta su capacidad de transformar el dolor en arte y su autenticidad radical. No le pedía permiso a nadie para ser quien era.",
    "Contracturas frecuentes en cuello y hombros. Mi médico dice que es tensión acumulada.",
    "Vivir de lo que me apasiona, tener tiempo de calidad con mi hija, y sentir que ayudo a otras personas aunque sea de a poco.",
    "Quiero entenderme mejor. Siento que reacciono de maneras que después no reconozco como mías. Quiero saber qué hay detrás de eso."
  ];

  window.autocompletar = function () {
    for (let i = 0; i < RESPUESTAS_PRUEBA.length; i++) {
      const el = document.getElementById('p' + (i + 1));
      if (el) el.value = RESPUESTAS_PRUEBA[i];
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    buildForm();

    document.getElementById('btn-enviar').addEventListener('click', function () {
      const msg = buildMessage();
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    });
  });
})();
