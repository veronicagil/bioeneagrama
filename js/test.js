(function () {
  'use strict';

  const scores = {};
  for (let t = 1; t <= 9; t++) scores[t] = { luz: 0, sombra: 0, total: 0 };

  let currentQ = 0;
  let answered = false;
  let questions = [];

  // Resultados calculados al finalizar el test, compartidos entre pantallas
  let _media = 0, _dominante = 1, _altos = [], _bajos = [];

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

  function buildWAMessage() {
    const hash = Object.entries(scores).map(([t, s]) => `${t}=${s.luz},${s.sombra}`).join('|');
    const baseUrl = window.location.origin + window.location.pathname.replace('test.html', '');
    const lecturaUrl = baseUrl + 'lectura.html#' + encodeURIComponent(hash);
    let msg = '🌀 *Bio Eneagrama — Vero Gil*\n📊 Resultados del Test\n\n';
    for (let t = 1; t <= 9; t++) {
      const s = scores[t];
      msg += `T${t} ${TIPOS[t].nombre}: ${s.total} (☀️${s.luz} / 🌑${s.sombra})\n`;
    }
    msg += `\n📐 Media: ${_media.toFixed(1)}\n`;
    msg += `\n🔍 Panel profesional:\n${lecturaUrl}`;
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
  }

  // Llamada al terminar el test: calcula todo y muestra devolución
  function showResults() {
    document.getElementById('progress-wrap').classList.add('hidden');
    document.getElementById('test-section').classList.add('hidden');

    _media = calcMedia();
    const tipos = Array.from({ length: 9 }, (_, i) => i + 1);
    _altos = tipos.filter(t => scores[t].total >= _media).sort((a, b) => scores[b].total - scores[a].total);
    _bajos = tipos.filter(t => scores[t].total < _media).sort((a, b) => scores[a].total - scores[b].total);
    _dominante = _altos[0] || 1;

    showDevolucion();
  }

  // Primera pantalla: devolución interpretativa
  function showDevolucion() {
    document.getElementById('devolucion-section').classList.remove('hidden');
    window.scrollTo(0, 0);

    const tipo = TIPOS[_dominante];
    const s = scores[_dominante];

    document.getElementById('dev-num').textContent = 'Tipo ' + _dominante;
    document.getElementById('dev-nombre').textContent = tipo.nombre;
    document.getElementById('dev-centro').textContent = tipo.centro;
    document.getElementById('dev-mini-lectura').textContent = tipo.mini_lectura;

    const diff = s.luz - s.sombra;
    let balanceText;
    if (Math.abs(diff) <= 1) {
      balanceText = '✦ Tu patrón dominante muestra un equilibrio entre luz y sombra — señal de un momento de mayor conciencia y transición.';
    } else if (diff > 0) {
      balanceText = '☀️ Tu patrón dominante se expresa principalmente desde la luz, integrando recursos genuinos que ya tenés activos.';
    } else {
      balanceText = '🌑 Tu patrón dominante se expresa principalmente desde la sombra, lo que suele aparecer en momentos de tensión, búsqueda o mayor autoexigencia.';
    }
    document.getElementById('dev-balance').textContent = balanceText;

    const triada = TRIADAS[tipo.triada];
    document.getElementById('dev-triada').innerHTML = `
      <div class="dev-triada-nombre">${triada.nombre}</div>
      <p class="dev-triada-teaser">Tu tipo pertenece a esta tríada — lo que dice algo específico sobre cómo reaccionás en conflicto, qué herida está en el fondo y cuál es tu movimiento evolutivo. Eso es parte de lo que exploramos en la lectura individual.</p>
    `;

    document.getElementById('btn-wa-dev').onclick = buildWAMessage;

    document.getElementById('btn-ver-mapa').onclick = function () {
      document.getElementById('devolucion-section').classList.add('hidden');
      showTechnicalResults();
    };
  }

  // Segunda pantalla: mapa técnico completo
  function showTechnicalResults() {
    document.getElementById('results-section').classList.remove('hidden');
    window.scrollTo(0, 0);

    document.getElementById('media-display').textContent = _media.toFixed(1);

    const altosEl = document.getElementById('grupo-altos');
    altosEl.innerHTML = '';
    _altos.forEach((t, i) => altosEl.appendChild(makeTipoCard(t, i === 0 ? '★' : String(i + 1), 'alto')));

    const bajosEl = document.getElementById('grupo-bajos');
    bajosEl.innerHTML = '';
    _bajos.forEach((t, i) => bajosEl.appendChild(makeTipoCard(t, i === 0 ? '▾' : '', 'bajo')));

    const tipo = TIPOS[_dominante];
    document.getElementById('clave-dominante').innerHTML = `
      <div class="clave-box"><div class="clave-label">Miedo</div><div class="clave-val">${tipo.miedo}</div></div>
      <div class="clave-box"><div class="clave-label">Motivación</div><div class="clave-val">${tipo.motivacion}</div></div>
      <div class="clave-box"><div class="clave-label">Centro</div><div class="clave-val">${tipo.centro}</div></div>
      <div class="clave-box"><div class="clave-label">Transformación</div><div class="clave-val">${tipo.transformacion}</div></div>
    `;

    renderEnea('enea-results', scores, _media, true);
    document.getElementById('frase-final').textContent = FRASE_FINAL;
    document.getElementById('btn-wa').onclick = buildWAMessage;
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

  // Autofill para testing: simula puntajes realistas de un T4 dominante
  window.autocompletar = function () {
    const sim = { 1:6, 2:5, 3:4, 4:14, 5:10, 6:7, 7:8, 8:5, 9:9 };
    for (let t = 1; t <= 9; t++) {
      const luz = Math.round(sim[t] * 0.55);
      const sombra = sim[t] - luz;
      scores[t] = { luz, sombra, total: sim[t] };
    }
    currentQ = questions.length;
    showResults();
  };

  document.addEventListener('DOMContentLoaded', function () {
    questions = buildQuestions();
    renderQuestion();

    document.getElementById('btn-si').addEventListener('click', () => handleAnswer('si'));
    document.getElementById('btn-no').addEventListener('click', () => handleAnswer('no'));

    document.addEventListener('keydown', function (e) {
      if (!document.getElementById('devolucion-section').classList.contains('hidden')) return;
      if (!document.getElementById('results-section').classList.contains('hidden')) return;
      if (e.key === 's' || e.key === 'S' || e.key === 'y' || e.key === 'Y') handleAnswer('si');
      if (e.key === 'n' || e.key === 'N') handleAnswer('no');
    });
  });
})();
