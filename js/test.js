(function () {
  'use strict';

  const scores = {};
  for (let t = 1; t <= 9; t++) scores[t] = { luz: 0, sombra: 0, total: 0 };

  let currentQ   = 0;
  let answered   = false;
  let questions  = [];
  let answerHistory = [];

  let userName     = '';
  let userApellido = '';
  let userEmail    = '';
  let userTelefono = '';
  let userOrigen   = '';

  // Guardamos el dominante y la media para usarlos al generar el PDF
  let resultDominante = 1;
  let resultMedia     = 0;
  let pdfGenerado     = null; // data URI del PDF ya generado

  // ──────────────────────────────────────────────
  // CONSTRUCCIÓN DE PREGUNTAS
  // ──────────────────────────────────────────────
  function buildQuestions() {
    const q = [];
    for (let r = 0; r < 10; r++) {
      for (const t of ORDEN_LUZ[r]) {
        q.push({ tipo: t, seccion: 'luz', texto: AFIRMACIONES[t].luz[r], ronda: r });
      }
      for (const t of ORDEN_SOMBRA[r]) {
        q.push({ tipo: t, seccion: 'sombra', texto: AFIRMACIONES[t].sombra[r], ronda: r });
      }
    }
    return q;
  }

  function calcMedia() {
    const vals = Object.values(scores).map(s => s.total);
    return (Math.max(...vals) + Math.min(...vals)) / 2;
  }

  // ──────────────────────────────────────────────
  // RENDER DE PREGUNTAS
  // ──────────────────────────────────────────────
  function renderQuestion() {
    const q   = questions[currentQ];
    const step5 = Math.floor(currentQ / 5) * 5;
    const pct   = (step5 / questions.length) * 100;

    document.getElementById('progress-fill').style.width = pct + '%';

    document.getElementById('q-num').innerHTML =
      '<span class="question-firma">VG · Vero Gil</span>';
    document.getElementById('q-text').textContent = q.texto;

    document.getElementById('btn-si').classList.remove('selected');
    document.getElementById('btn-no').classList.remove('selected');
    answered = false;

    const btnBack = document.getElementById('btn-back');
    currentQ > 0 ? btnBack.classList.remove('hidden') : btnBack.classList.add('hidden');

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

    answerHistory.push({ tipo: q.tipo, seccion: q.seccion, resp, ronda: q.ronda });
    renderEnea('enea-live', scores, calcMedia(), false);

    setTimeout(function () {
      currentQ++;
      if (currentQ >= questions.length) startLoading();
      else renderQuestion();
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

  // ──────────────────────────────────────────────
  // AFIRMACIONES RESPONDIDAS SÍ DEL TIPO DOMINANTE
  // ──────────────────────────────────────────────
  function getAfirmacionesDominante(dominante) {
    const luz = [], sombra = [];
    for (const h of answerHistory) {
      if (h.tipo === dominante && h.resp === 'si') {
        if (h.seccion === 'luz'    && luz.length    < 3) luz.push(AFIRMACIONES[dominante].luz[h.ronda]);
        if (h.seccion === 'sombra' && sombra.length < 3) sombra.push(AFIRMACIONES[dominante].sombra[h.ronda]);
      }
    }
    return { luz, sombra };
  }

  // ──────────────────────────────────────────────
  // TEXTO DE PUNTAJES PARA EL EMAIL
  // ──────────────────────────────────────────────
  function buildPuntajesTexto(dominante, media) {
    const ordenados = Array.from({ length: 9 }, (_, i) => i + 1)
      .sort((a, b) => scores[b].total - scores[a].total);
    let txt = '';
    ordenados.forEach(t => {
      const s = scores[t];
      txt += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total +
        (t === dominante ? ' ★' : '') +
        '  (☀️ ' + s.luz + ' / 🌑 ' + s.sombra + ')\n';
    });
    return txt;
  }

  // ──────────────────────────────────────────────
  // PDF: AUTO-GENERAR + ENVIAR POR EMAIL
  // ──────────────────────────────────────────────
  function iniciarGeneracionPDF(dominante, media) {
    const btn    = document.getElementById('btn-pdf');
    const banner = document.getElementById('pdf-banner');
    const btnG   = document.getElementById('btn-guardar');

    if (btn) { btn.textContent = '⏳ Preparando tu resultado...'; btn.disabled = true; }

    // Ocultar controles que no deben ir en el PDF
    if (banner) banner.style.display = 'none';
    if (btnG)   btnG.style.display   = 'none';

    const elemento = document.getElementById('results-section');
    const nombre   = userName.replace(/\s+/g, '-') || 'resultado';
    const filename = 'BioEneagrama-' + nombre + '.pdf';

    const opciones = {
      margin:      [8, 8, 8, 8],
      filename:    filename,
      image:       { type: 'jpeg', quality: 0.92 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true, scrollY: 0 },
      jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(elemento).outputPdf('datauristring')
      .then(function (uri) {
        pdfGenerado = uri;

        // Restaurar controles
        if (banner) banner.style.display = '';
        if (btnG)   btnG.style.display   = '';
        if (btn)  { btn.textContent = '📄 Descargar mi resultado en PDF'; btn.disabled = false; }

        // Enviar email con PDF adjunto
        if (userEmail) {
          const tipo = TIPOS[dominante];
          const puntajes = buildPuntajesTexto(dominante, media);

          // Serializar puntajes como objeto estructurado para la base de datos
          var scoresData = {};
          Object.keys(scores).forEach(function(t) {
            scoresData['T' + t] = { luz: scores[t].luz, sombra: scores[t].sombra, total: scores[t].total };
          });

          fetch('/api/send-email', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              toName:      userName,
              toApellido:  userApellido,
              toEmail:     userEmail,
              toTelefono:  userTelefono,
              toOrigen:    userOrigen,
              tipoNum:     'Tipo ' + dominante,
              tipoNombre:  tipo.nombre,
              centro:      tipo.centro,
              sintesis:    tipo.sintesis,
              puntajes:    puntajes,
              media:       media.toFixed(1),
              scoresData:  scoresData,
              pdfBase64:   uri,
              pdfFilename: filename
            })
          }).catch(function () {});
        }
      })
      .catch(function () {
        if (banner) banner.style.display = '';
        if (btnG)   btnG.style.display   = '';
        if (btn)  { btn.textContent = '📄 Descargar mi resultado en PDF'; btn.disabled = false; }
      });
  }

  // Botón de descarga — usa el PDF ya generado
  window.generarPDF = function () {
    if (!pdfGenerado) return;
    const nombre   = userName.replace(/\s+/g, '-') || 'resultado';
    const filename = 'BioEneagrama-' + nombre + '.pdf';
    const link = document.createElement('a');
    link.href     = pdfGenerado;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ──────────────────────────────────────────────
  // FORMULARIO INICIAL (nombre + email)
  // ──────────────────────────────────────────────
  function setupEmailForm() {
    const errorEl = document.getElementById('email-error');

    function intentarComenzar() {
      const nombre   = document.getElementById('input-nombre').value.trim();
      const apellido = document.getElementById('input-apellido').value.trim();
      const email    = document.getElementById('input-email').value.trim();
      const tel      = document.getElementById('input-telefono').value.trim();
      const origen   = document.getElementById('input-origen').value;
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nombre || !apellido || !emailValido) {
        errorEl.classList.remove('hidden');
        return;
      }
      errorEl.classList.add('hidden');
      userName     = nombre;
      userApellido = apellido;
      userEmail    = email;
      userTelefono = tel;
      userOrigen   = origen;

      document.getElementById('email-section').classList.add('hidden');
      document.getElementById('progress-wrap').classList.remove('hidden');
      document.getElementById('test-section').classList.remove('hidden');
    }

    document.getElementById('btn-comenzar').addEventListener('click', intentarComenzar);
    document.getElementById('input-email').addEventListener('keydown', e => { if (e.key === 'Enter') intentarComenzar(); });
    document.getElementById('input-nombre').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('input-email').focus(); });
  }

  // ──────────────────────────────────────────────
  // LOADING → RESULTADOS
  // ──────────────────────────────────────────────
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
    const tipos  = Array.from({ length: 9 }, (_, i) => i + 1);
    const altos  = tipos.filter(t => scores[t].total >= media).sort((a, b) => scores[b].total - scores[a].total);
    const bajos  = tipos.filter(t => scores[t].total  < media).sort((a, b) => scores[a].total - scores[b].total);
    const dominante = altos[0] || 1;
    const tipo = TIPOS[dominante];

    // Guardar para usar en el PDF
    resultDominante = dominante;
    resultMedia     = media;

    document.getElementById('res-tipo-num').textContent   = 'Tipo ' + dominante + ' · Tu tipo dominante';
    document.getElementById('res-tipo-nombre').textContent = tipo.nombre;
    document.getElementById('res-tipo-centro').textContent = tipo.centro;
    document.getElementById('res-sintesis').textContent   = tipo.sintesis;
    document.getElementById('media-display').textContent  = media.toFixed(1);
    renderEnea('enea-results', scores, media, true);

    // Cards de tipos
    const altosEl = document.getElementById('grupo-altos');
    altosEl.innerHTML = '';
    altos.forEach((t, i) => altosEl.appendChild(makeTipoCard(t, i === 0 ? '★' : String(i + 1), 'alto')));

    const bajosEl = document.getElementById('grupo-bajos');
    bajosEl.innerHTML = '';
    bajos.forEach((t, i) => bajosEl.appendChild(makeTipoCard(t, i === 0 ? '▾' : '', 'bajo')));

    // Botón WhatsApp guardar
    document.getElementById('btn-guardar').onclick = function () {
      let msg = '🌀 *Bio Eneagrama · ' + (userName || 'Mis resultados') + '*\n\n';
      msg += '★ *Tipo dominante: ' + tipo.nombre + '*\n' + tipo.centro + '\n\n' + tipo.sintesis + '\n\n';
      msg += '📊 *Puntajes:*\n';
      for (let t = 1; t <= 9; t++) {
        const s = scores[t];
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + (t === dominante ? ' ★' : '') + '\n';
      }
      msg += '\n📐 Media: ' + media.toFixed(1);
      msg += '\n\n_Bio Eneagrama · Vero Gil_\nbioeneagrama.vercel.app';
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    };

    // Botón WhatsApp consulta profesional
    document.getElementById('btn-consulta').onclick = function () {
      const hash = Object.entries(scores)
        .map(e => e[0] + '=' + e[1].luz + ',' + e[1].sombra).join('|');
      const baseUrl = window.location.origin + window.location.pathname.replace('test.html', '');
      const lecturaUrl = baseUrl + 'lectura.html#' + encodeURIComponent(hash);
      const triada = TRIADAS[tipo.triada];

      const ordenados = Array.from({ length: 9 }, (_, i) => i + 1)
        .sort((a, b) => scores[b].total - scores[a].total);
      const sobMedia = ordenados.filter(t => scores[t].total >= media);
      const bajMedia = ordenados.filter(t => scores[t].total  < media);

      let msg = '🌀 *BIO ENEAGRAMA — Consulta profesional*\n━━━━━━━━━━━━━━━━━━━━\n';
      if (userName)  msg += '👤 *' + userName  + '*\n';
      if (userEmail) msg += '📧 ' + userEmail + '\n';
      msg += '\n★ *TIPO DOMINANTE: T' + dominante + ' — ' + tipo.nombre + '*\n';
      msg += '• Centro: ' + tipo.centro + '\n';
      msg += '• Transformación: ' + tipo.transformacion + '\n';
      msg += '• Ala que desarrolla: T' + tipo.ala_desarrolla + ' — ' + TIPOS[tipo.ala_desarrolla].nombre + '\n';
      msg += '• Ala que le cuesta: T' + tipo.ala_cuesta + ' — ' + TIPOS[tipo.ala_cuesta].nombre + '\n';
      msg += '• Integración → T' + tipo.integracion + ' — ' + TIPOS[tipo.integracion].nombre + '\n';
      msg += '• Desintegración → T' + tipo.desintegracion + ' — ' + TIPOS[tipo.desintegracion].nombre + '\n';
      msg += '• ' + triada.nombre + ' (herida: ' + triada.herida + ')\n';
      msg += '• Luz: ' + scores[dominante].luz + ' / Sombra: ' + scores[dominante].sombra + '\n\n';
      msg += '📊 *PUNTAJES* — Media: ' + media.toFixed(1) + '\n\n▲ Sobre la media:\n';
      sobMedia.forEach(t => {
        const s = scores[t];
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': *' + s.total + '* (☀️' + s.luz + ' 🌑' + s.sombra + ')\n';
      });
      msg += '\n▽ Bajo la media:\n';
      bajMedia.forEach(t => {
        const s = scores[t];
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + ' (☀️' + s.luz + ' 🌑' + s.sombra + ')\n';
      });
      msg += '\n🔍 *Panel profesional:*\n' + lecturaUrl;
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    };

    // Auto-generar PDF y enviar email (se dispara automáticamente al ver resultados)
    setTimeout(function () {
      iniciarGeneracionPDF(dominante, media);
    }, 800);
  }

  // ──────────────────────────────────────────────
  // CARDS DE TIPOS
  // ──────────────────────────────────────────────
  function makeTipoCard(t, badge, grupo) {
    const div = document.createElement('div');
    div.className = 'tipo-card ' + grupo;
    const s = scores[t];
    const emptyFlex  = 20 - s.total;
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

  // ──────────────────────────────────────────────
  // AUTOFILL PARA TESTING
  // ──────────────────────────────────────────────
  window.autocompletar = function () {
    const sim = { 1:7, 2:15, 3:5, 4:8, 5:4, 6:10, 7:6, 8:3, 9:7 };
    for (let t = 1; t <= 9; t++) {
      const luz    = Math.round(sim[t] * 0.55);
      const sombra = sim[t] - luz;
      scores[t] = { luz, sombra, total: sim[t] };
    }
    currentQ = questions.length;
    startLoading();
  };

  // ──────────────────────────────────────────────
  // INIT
  // ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    questions = buildQuestions();
    renderQuestion();
    setupEmailForm();

    document.getElementById('btn-si').addEventListener('click',  () => handleAnswer('si'));
    document.getElementById('btn-no').addEventListener('click',  () => handleAnswer('no'));
    document.getElementById('btn-back').addEventListener('click', handleBack);

    document.addEventListener('keydown', function (e) {
      if (document.getElementById('test-section').classList.contains('hidden')) return;
      if (e.key === 's' || e.key === 'S' || e.key === 'y' || e.key === 'Y') handleAnswer('si');
      if (e.key === 'n' || e.key === 'N') handleAnswer('no');
    });
  });
})();
