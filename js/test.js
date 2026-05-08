(function () {
  'use strict';

  // Estado
  const scores = {};
  for (let t = 1; t <= 9; t++) scores[t] = { luz: 0, sombra: 0, total: 0 };

  let currentQ = 0;
  let answered = false;
  let questions = [];

  // Construir las 180 preguntas intercalando rondas LUZ y SOMBRA
  function buildQuestions() {
    const q = [];
    for (let r = 0; r < 10; r++) {
      for (const t of ORDEN_LUZ[r]) {
        q.push({ tipo: t, seccion: 'luz', texto: AFIRMACIONES[t].luz[r] });
      }
      for (const t of ORDEN_SOMBRA[r]) {
        q.push({ tipo: t, seccion: 'sombra', texto: AFIRMACIONES[t].sombra[r] });
      }
    }
    return q;
  }

  function calcMedia() {
    const vals = Object.values(scores).map(s => s.total);
    return (Math.max(...vals) + Math.min(...vals)) / 2;
  }

  function renderQuestion() {
    const q = questions[currentQ];
    const pct = (currentQ / questions.length) * 100;

    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-label').textContent = currentQ + ' / ' + questions.length;

    const numEl = document.getElementById('q-num');
    numEl.innerHTML = `Pregunta ${currentQ + 1} de ${questions.length} <span class="question-firma">VG · Vero Gil</span>`;
    document.getElementById('q-text').textContent = q.texto;

    document.getElementById('btn-si').classList.remove('selected');
    document.getElementById('btn-no').classList.remove('selected');
    answered = false;

    const card = document.getElementById('question-card');
    card.classList.remove('fade-in');
    void card.offsetWidth;
    card.classList.add('fade-in');
  }

  function handleAnswer(resp) {
    if (answered) return;
    answered = true;

    const q = questions[currentQ];
    if (resp === 'si') {
      scores[q.tipo][q.seccion]++;
      scores[q.tipo].total++;
      document.getElementById('btn-si').classList.add('selected');
    } else {
      document.getElementById('btn-no').classList.add('selected');
    }

    renderEnea('enea-live', scores, calcMedia(), false);

    setTimeout(() => {
      currentQ++;
      if (currentQ >= questions.length) {
        showResults();
      } else {
        renderQuestion();
      }
    }, 380);
  }

  function showResults() {
    document.getElementById('test-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    window.scrollTo(0, 0);

    const media = calcMedia();
    document.getElementById('media-display').textContent = media.toFixed(1);

    const tipos = Array.from({ length: 9 }, (_, i) => i + 1);
    const altos = tipos.filter(t => scores[t].total >= media).sort((a, b) => scores[b].total - scores[a].total);
    const bajos = tipos.filter(t => scores[t].total < media).sort((a, b) => scores[a].total - scores[b].total);
    const dominante = altos[0] || 1;

    // Render grupo ALTOS
    const altosEl = document.getElementById('grupo-altos');
    altosEl.innerHTML = '';
    altos.forEach((t, i) => altosEl.appendChild(makeTipoCard(t, i === 0 ? '★' : String(i + 1), 'alto')));

    // Render grupo BAJOS
    const bajosEl = document.getElementById('grupo-bajos');
    bajosEl.innerHTML = '';
    bajos.forEach((t, i) => bajosEl.appendChild(makeTipoCard(t, i === 0 ? '▾' : '', 'bajo')));

    // Clave del tipo dominante
    const tipo = TIPOS[dominante];
    document.getElementById('clave-dominante').innerHTML = `
      <div class="clave-box"><div class="clave-label">Miedo</div><div class="clave-val">${tipo.miedo}</div></div>
      <div class="clave-box"><div class="clave-label">Motivación</div><div class="clave-val">${tipo.motivacion}</div></div>
      <div class="clave-box"><div class="clave-label">Centro</div><div class="clave-val">${tipo.centro}</div></div>
      <div class="clave-box"><div class="clave-label">Transformación</div><div class="clave-val">${tipo.transformacion}</div></div>
    `;

    // SVG final con etiquetas
    renderEnea('enea-results', scores, media, true);

    // Frase final
    document.getElementById('frase-final').textContent = FRASE_FINAL;

    // Botón WhatsApp
    document.getElementById('btn-wa').onclick = function () {
      const hash = Object.entries(scores).map(([t, s]) => `${t}=${s.luz},${s.sombra}`).join('|');
      const baseUrl = window.location.origin + window.location.pathname.replace('test.html', '');
      const lecturaUrl = baseUrl + 'lectura.html#' + encodeURIComponent(hash);

      let msg = '🌀 *Bio Eneagrama — Vero Gil*\n📊 Resultados del Test\n\n';
      for (let t = 1; t <= 9; t++) {
        const s = scores[t];
        msg += `T${t} ${TIPOS[t].nombre}: ${s.total} (☀️${s.luz} / 🌑${s.sombra})\n`;
      }
      msg += `\n📐 Media: ${media.toFixed(1)}\n`;
      msg += `\n🔍 Panel profesional:\n${lecturaUrl}`;
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    };
  }

  function makeTipoCard(t, badge, grupo) {
    const div = document.createElement('div');
    div.className = 'tipo-card ' + grupo;
    const s = scores[t];
    const luzFlex = s.luz;
    const sombraFlex = s.sombra;
    const emptyFlex = 20 - s.total;
    const badgeClass = grupo === 'bajo' ? 'tipo-badge bajo-badge' : 'tipo-badge';
    div.innerHTML = `
      <div class="tipo-nombre">
        <span class="${badgeClass}">${badge}</span>
        <span>T${t} · ${TIPOS[t].nombre}</span>
      </div>
      <div class="tipo-score">Total: ${s.total} &nbsp;|&nbsp; ☀️ Luz: ${s.luz} &nbsp;|&nbsp; 🌑 Sombra: ${s.sombra}</div>
      <div class="mini-bars">
        <div class="mini-bar-luz" style="flex:${luzFlex}"></div>
        <div class="mini-bar-sombra" style="flex:${sombraFlex}"></div>
        ${emptyFlex > 0 ? `<div style="flex:${emptyFlex};height:5px;background:var(--border)"></div>` : ''}
      </div>`;
    return div;
  }

  // Init
  document.addEventListener('DOMContentLoaded', function () {
    questions = buildQuestions();
    renderQuestion();

    document.getElementById('btn-si').addEventListener('click', () => handleAnswer('si'));
    document.getElementById('btn-no').addEventListener('click', () => handleAnswer('no'));

    // Teclado: S/Y = Sí, N = No
    document.addEventListener('keydown', function (e) {
      if (document.getElementById('results-section') && !document.getElementById('results-section').classList.contains('hidden')) return;
      if (e.key === 's' || e.key === 'S' || e.key === 'y' || e.key === 'Y') handleAnswer('si');
      if (e.key === 'n' || e.key === 'N') handleAnswer('no');
    });
  });
})();
