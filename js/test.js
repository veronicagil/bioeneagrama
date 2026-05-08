(function () {
  'use strict';

  const scores = {};
  for (let t = 1; t <= 9; t++) scores[t] = { luz: 0, sombra: 0, total: 0 };

  let currentQ = 0;
  let answered = false;
  let questions = [];

  let userName = '';
  let userEmail = '';

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

  function setupEmailForm() {
    const btnComenzar = document.getElementById('btn-comenzar');
    const errorEl = document.getElementById('email-error');

    function intentarComenzar() {
      const nombre = document.getElementById('input-nombre').value.trim();
      const email = document.getElementById('input-email').value.trim();
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nombre || !emailValido) {
        errorEl.classList.remove('hidden');
        return;
      }
      errorEl.classList.add('hidden');
      userName = nombre;
      userEmail = email;

      if (FORMSPREE_ID && FORMSPREE_ID !== 'FORMSPREE_ID') {
        fetch('https://formspree.io/f/' + FORMSPREE_ID, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ nombre: nombre, email: email, origen: 'Bio Eneagrama Test' })
        }).catch(function () {});
      }

      document.getElementById('email-section').classList.add('hidden');
      document.getElementById('progress-wrap').classList.remove('hidden');
      document.getElementById('test-section').classList.remove('hidden');
    }

    btnComenzar.addEventListener('click', intentarComenzar);
    document.getElementById('input-email').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') intentarComenzar();
    });
    document.getElementById('input-nombre').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('input-email').focus();
    });
  }

  function showResults() {
    document.getElementById('progress-wrap').classList.add('hidden');
    document.getElementById('test-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    window.scrollTo(0, 0);

    const media = calcMedia();
    const tipos = Array.from({ length: 9 }, (_, i) => i + 1);
    const altos = tipos.filter(t => scores[t].total >= media).sort((a, b) => scores[b].total - scores[a].total);
    const bajos = tipos.filter(t => scores[t].total < media).sort((a, b) => scores[a].total - scores[b].total);
    const dominante = altos[0] || 1;
    const tipo = TIPOS[dominante];

    // Featured tipo dominante
    document.getElementById('res-tipo-num').textContent = 'Tipo ' + dominante + ' · Tu tipo dominante';
    document.getElementById('res-tipo-nombre').textContent = tipo.nombre;
    document.getElementById('res-tipo-centro').textContent = tipo.centro;
    document.getElementById('res-mini-lectura').textContent = tipo.mini_lectura;

    // Orientación para integrar
    document.getElementById('res-orientacion').textContent = tipo.orientacion;

    // SVG + media
    document.getElementById('media-display').textContent = media.toFixed(1);
    renderEnea('enea-results', scores, media, true);

    // Todos los tipos
    const altosEl = document.getElementById('grupo-altos');
    altosEl.innerHTML = '';
    altos.forEach(function (t, i) { altosEl.appendChild(makeTipoCard(t, i === 0 ? '★' : String(i + 1), 'alto')); });

    const bajosEl = document.getElementById('grupo-bajos');
    bajosEl.innerHTML = '';
    bajos.forEach(function (t, i) { bajosEl.appendChild(makeTipoCard(t, i === 0 ? '▾' : '', 'bajo')); });

    // Botón consulta individual → abre WA con resultados
    document.getElementById('btn-consulta').onclick = function () {
      const hash = Object.entries(scores).map(function (e) { return e[0] + '=' + e[1].luz + ',' + e[1].sombra; }).join('|');
      const baseUrl = window.location.origin + window.location.pathname.replace('test.html', '');
      const lecturaUrl = baseUrl + 'lectura.html#' + encodeURIComponent(hash);
      let msg = '🌀 *Bio Eneagrama — Vero Gil*\n📊 Resultados del Test\n\n';
      if (userName) msg += '👤 ' + userName + '\n';
      if (userEmail) msg += '📧 ' + userEmail + '\n';
      msg += '\n';
      for (let t = 1; t <= 9; t++) {
        const s = scores[t];
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + ' (☀️' + s.luz + ' / 🌑' + s.sombra + ')\n';
      }
      msg += '\n📐 Media: ' + media.toFixed(1) + '\n';
      msg += '\n🔍 Panel profesional:\n' + lecturaUrl;
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    };
  }

  function makeTipoCard(t, badge, grupo) {
    const div = document.createElement('div');
    div.className = 'tipo-card ' + grupo;
    const s = scores[t];
    const emptyFlex = 20 - s.total;
    const badgeClass = grupo === 'bajo' ? 'tipo-badge bajo-badge' : 'tipo-badge';
    div.innerHTML = `
      <div class="tipo-nombre">
        <span class="${badgeClass}">${badge}</span>
        <span>T${t} · ${TIPOS[t].nombre}</span>
      </div>
      <div class="tipo-score">Total: ${s.total} &nbsp;|&nbsp; ☀️ Luz: ${s.luz} &nbsp;|&nbsp; 🌑 Sombra: ${s.sombra}</div>
      <div class="mini-bars">
        <div class="mini-bar-luz" style="flex:${s.luz}"></div>
        <div class="mini-bar-sombra" style="flex:${s.sombra}"></div>
        ${emptyFlex > 0 ? '<div style="flex:' + emptyFlex + ';height:5px;background:var(--border)"></div>' : ''}
      </div>
      <p class="tipo-resena">${TIPOS[t].resena}</p>`;
    return div;
  }

  // Autofill para testing — T2 dominante
  window.autocompletar = function () {
    const sim = { 1:7, 2:15, 3:5, 4:8, 5:4, 6:10, 7:6, 8:3, 9:7 };
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
    setupEmailForm();

    document.getElementById('btn-si').addEventListener('click', function () { handleAnswer('si'); });
    document.getElementById('btn-no').addEventListener('click', function () { handleAnswer('no'); });

    document.addEventListener('keydown', function (e) {
      if (document.getElementById('test-section').classList.contains('hidden')) return;
      if (e.key === 's' || e.key === 'S' || e.key === 'y' || e.key === 'Y') handleAnswer('si');
      if (e.key === 'n' || e.key === 'N') handleAnswer('no');
    });
  });
})();
