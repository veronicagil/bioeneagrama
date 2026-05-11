(function () {
  'use strict';

  const scores = {};
  for (let t = 1; t <= 9; t++) scores[t] = { luz: 0, sombra: 0, total: 0 };

  let currentQ = 0;
  let answered = false;
  let questions = [];
  let answerHistory = []; // para el botón "Anterior"

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
    numEl.innerHTML = 'Pregunta ' + (currentQ + 1) + ' de ' + questions.length + ' <span class="question-firma">VG · Vero Gil</span>';
    document.getElementById('q-text').textContent = q.texto;

    document.getElementById('btn-si').classList.remove('selected');
    document.getElementById('btn-no').classList.remove('selected');
    answered = false;

    // Mostrar/ocultar botón anterior
    const btnBack = document.getElementById('btn-back');
    if (currentQ > 0) {
      btnBack.classList.remove('hidden');
    } else {
      btnBack.classList.add('hidden');
    }

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

    answerHistory.push({ tipo: q.tipo, seccion: q.seccion, resp: resp });
    renderEnea('enea-live', scores, calcMedia(), false);

    setTimeout(function () {
      currentQ++;
      if (currentQ >= questions.length) {
        startLoading();
      } else {
        renderQuestion();
      }
    }, 380);
  }

  function handleBack() {
    if (currentQ <= 0 || answerHistory.length === 0) return;

    const last = answerHistory.pop();
    if (last.resp === 'si') {
      scores[last.tipo][last.seccion]--;
      scores[last.tipo].total--;
    }
    currentQ--;
    answered = false;
    renderEnea('enea-live', scores, calcMedia(), false);
    renderQuestion();
  }

  function enviarEmailResultados(dominante, media) {
    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'EMAILJS_PUBLIC_KEY') return;
    if (!userEmail) return;

    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

      const tipo = TIPOS[dominante];
      let puntajes = '';
      for (let t = 1; t <= 9; t++) {
        puntajes += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + scores[t].total + ' (Luz: ' + scores[t].luz + ' / Sombra: ' + scores[t].sombra + ')\n';
      }

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_name:     userName,
        to_email:    userEmail,
        tipo_num:    'Tipo ' + dominante,
        tipo_nombre: tipo.nombre,
        tipo_centro: tipo.centro,
        sintesis:    tipo.sintesis,
        puntajes:    puntajes,
        media:       media.toFixed(1)
      }).catch(function () {});
    } catch (e) {}
  }

  function setupEmailForm() {
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

    document.getElementById('btn-comenzar').addEventListener('click', intentarComenzar);
    document.getElementById('input-email').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') intentarComenzar();
    });
    document.getElementById('input-nombre').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('input-email').focus();
    });
  }

  // Muestra el loading 5 segundos antes de los resultados
  function startLoading() {
    document.getElementById('progress-wrap').classList.add('hidden');
    document.getElementById('test-section').classList.add('hidden');
    document.getElementById('loading-section').classList.remove('hidden');
    window.scrollTo(0, 0);

    setTimeout(function () {
      document.getElementById('loading-section').classList.add('hidden');
      showResults();
    }, 5000);
  }

  function showResults() {
    document.getElementById('results-section').classList.remove('hidden');
    window.scrollTo(0, 0);

    const media = calcMedia();
    const tipos = Array.from({ length: 9 }, (_, i) => i + 1);
    const altos = tipos.filter(function (t) { return scores[t].total >= media; }).sort(function (a, b) { return scores[b].total - scores[a].total; });
    const bajos = tipos.filter(function (t) { return scores[t].total < media; }).sort(function (a, b) { return scores[a].total - scores[b].total; });
    const dominante = altos[0] || 1;
    const tipo = TIPOS[dominante];

    // Tipo dominante
    document.getElementById('res-tipo-num').textContent = 'Tipo ' + dominante + ' · Tu tipo dominante';
    document.getElementById('res-tipo-nombre').textContent = tipo.nombre;
    document.getElementById('res-tipo-centro').textContent = tipo.centro;
    document.getElementById('res-sintesis').textContent = tipo.sintesis;

    // SVG + media
    document.getElementById('media-display').textContent = media.toFixed(1);
    renderEnea('enea-results', scores, media, true);

    // Email al respondente
    enviarEmailResultados(dominante, media);

    // Tipos altos
    const altosEl = document.getElementById('grupo-altos');
    altosEl.innerHTML = '';
    altos.forEach(function (t, i) { altosEl.appendChild(makeTipoCard(t, i === 0 ? '★' : String(i + 1), 'alto')); });

    // Tipos bajos
    const bajosEl = document.getElementById('grupo-bajos');
    bajosEl.innerHTML = '';
    bajos.forEach(function (t, i) { bajosEl.appendChild(makeTipoCard(t, i === 0 ? '▾' : '', 'bajo')); });

    // Botón guardar resultados → WA propio
    document.getElementById('btn-guardar').onclick = function () {
      const nombreMostrar = userName ? userName : 'Mis resultados';
      let msg = '🌀 *Bio Eneagrama · ' + nombreMostrar + '*\n\n';
      msg += '★ *Tipo dominante: ' + TIPOS[dominante].nombre + '*\n';
      msg += TIPOS[dominante].centro + '\n\n';
      msg += TIPOS[dominante].sintesis + '\n\n';
      msg += '📊 *Puntajes:*\n';
      for (let t = 1; t <= 9; t++) {
        const s = scores[t];
        const marca = t === dominante ? ' ★' : '';
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + marca + '\n';
      }
      msg += '\n📐 Media: ' + media.toFixed(1);
      msg += '\n\n_Bio Eneagrama · Vero Gil_\nbioeneagrama.vercel.app';
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    };

    // Botón consulta → WA profesional completo
    document.getElementById('btn-consulta').onclick = function () {
      const hash = Object.entries(scores).map(function (e) { return e[0] + '=' + e[1].luz + ',' + e[1].sombra; }).join('|');
      const baseUrl = window.location.origin + window.location.pathname.replace('test.html', '');
      const lecturaUrl = baseUrl + 'lectura.html#' + encodeURIComponent(hash);

      const tipo = TIPOS[dominante];
      const triadaKey = tipo.triada;
      const triada = TRIADAS[triadaKey];

      // Tipos ordenados de mayor a menor
      const ordenados = Array.from({ length: 9 }, (_, i) => i + 1)
        .sort(function (a, b) { return scores[b].total - scores[a].total; });
      const sobMedia = ordenados.filter(function (t) { return scores[t].total >= media; });
      const bajMedia = ordenados.filter(function (t) { return scores[t].total < media; });

      let msg = '🌀 *BIO ENEAGRAMA — Consulta profesional*\n';
      msg += '━━━━━━━━━━━━━━━━━━━━\n';
      if (userName) msg += '👤 *' + userName + '*\n';
      if (userEmail) msg += '📧 ' + userEmail + '\n';
      msg += '\n';

      msg += '★ *TIPO DOMINANTE: T' + dominante + ' — ' + tipo.nombre + '*\n';
      msg += '• Centro: ' + tipo.centro + '\n';
      msg += '• Transformación: ' + tipo.transformacion + '\n';
      msg += '• Ala que desarrolla: T' + tipo.ala_desarrolla + ' — ' + TIPOS[tipo.ala_desarrolla].nombre + '\n';
      msg += '• Ala que le cuesta: T' + tipo.ala_cuesta + ' — ' + TIPOS[tipo.ala_cuesta].nombre + '\n';
      msg += '• Integración → T' + tipo.integracion + ' — ' + TIPOS[tipo.integracion].nombre + '\n';
      msg += '• Desintegración → T' + tipo.desintegracion + ' — ' + TIPOS[tipo.desintegracion].nombre + '\n';
      msg += '• ' + triada.nombre + ' (herida: ' + triada.herida + ')\n';
      msg += '• Luz: ' + scores[dominante].luz + ' / Sombra: ' + scores[dominante].sombra + '\n';
      msg += '\n';

      msg += '📊 *PUNTAJES (mayor a menor)*\n';
      msg += '📐 Media: ' + media.toFixed(1) + '\n\n';
      msg += '▲ Sobre la media:\n';
      sobMedia.forEach(function (t) {
        const s = scores[t];
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': *' + s.total + '* (☀️' + s.luz + ' 🌑' + s.sombra + ')\n';
      });
      msg += '\n▽ Bajo la media:\n';
      bajMedia.forEach(function (t) {
        const s = scores[t];
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + ' (☀️' + s.luz + ' 🌑' + s.sombra + ')\n';
      });

      msg += '\n🔍 *Panel profesional:*\n' + lecturaUrl;
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    };
  }

  function makeTipoCard(t, badge, grupo) {
    const div = document.createElement('div');
    div.className = 'tipo-card ' + grupo;
    const s = scores[t];
    const emptyFlex = 20 - s.total;
    const badgeClass = grupo === 'bajo' ? 'tipo-badge bajo-badge' : 'tipo-badge';
    div.innerHTML =
      '<div class="tipo-nombre">' +
        '<span class="' + badgeClass + '">' + badge + '</span>' +
        '<span>T' + t + ' · ' + TIPOS[t].nombre + '</span>' +
      '</div>' +
      '<div class="tipo-score">Total: ' + s.total + ' &nbsp;|&nbsp; ☀️ Luz: ' + s.luz + ' &nbsp;|&nbsp; 🌑 Sombra: ' + s.sombra + '</div>' +
      '<div class="mini-bars">' +
        '<div class="mini-bar-luz" style="flex:' + s.luz + '"></div>' +
        '<div class="mini-bar-sombra" style="flex:' + s.sombra + '"></div>' +
        (emptyFlex > 0 ? '<div style="flex:' + emptyFlex + ';height:5px;background:var(--border)"></div>' : '') +
      '</div>' +
      '<p class="tipo-resena">' + TIPOS[t].resena + '</p>';
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
    startLoading();
  };

  document.addEventListener('DOMContentLoaded', function () {
    questions = buildQuestions();
    renderQuestion();
    setupEmailForm();

    document.getElementById('btn-si').addEventListener('click', function () { handleAnswer('si'); });
    document.getElementById('btn-no').addEventListener('click', function () { handleAnswer('no'); });
    document.getElementById('btn-back').addEventListener('click', handleBack);

    document.addEventListener('keydown', function (e) {
      if (document.getElementById('test-section').classList.contains('hidden')) return;
      if (e.key === 's' || e.key === 'S' || e.key === 'y' || e.key === 'Y') handleAnswer('si');
      if (e.key === 'n' || e.key === 'N') handleAnswer('no');
    });
  });
})();
