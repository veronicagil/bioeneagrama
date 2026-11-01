(function () {
  'use strict';

  const scores = {};
  for (let t = 1; t <= 9; t++) scores[t] = { luz: 0, sombra: 0, total: 0 };

  let currentQ   = 0;
  let answered   = false;
  let questions  = [];
  let answerHistory = [];

  let userName         = '';
  let userApellido     = '';
  let userEmail        = '';
  let userTelefono     = '';
  let userEdad         = '';
  let userConsentimiento = false;
  let userOrigen       = '';

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
    const pct = Math.min(100, Math.round((currentQ / questions.length) * 100));

    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-label').textContent = pct + '%';

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
  // ENVÍO DEL RESULTADO POR MAIL (la persona solo ve el aviso en pantalla)
  // ──────────────────────────────────────────────
  // Convierte el símbolo (dibujado fuera de pantalla) a PNG para mostrarlo dentro del mail
  function eneaToPng() {
    return new Promise(function (resolve) {
      const svg = document.querySelector('#enea-results svg');
      if (!svg) return resolve(null);
      const ANCHO = 930, ALTO = 678; // proporción del viewBox 310 x 226
      const clon = svg.cloneNode(true);
      clon.setAttribute('width', ANCHO);
      clon.setAttribute('height', ALTO);
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clon)], { type: 'image/svg+xml;charset=utf-8' }));
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = ANCHO;
        canvas.height = ALTO;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ANCHO, ALTO);
        ctx.drawImage(img, 0, 0, ANCHO, ALTO);
        URL.revokeObjectURL(url);
        try { resolve(canvas.toDataURL('image/png')); } catch (e) { resolve(null); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }

  function enviarResultado() {
    const media = calcMedia();
    const tipos = Array.from({ length: 9 }, (_, i) => i + 1);
    const dominante = tipos.slice().sort((a, b) => scores[b].total - scores[a].total || a - b)[0];

    const scoresData = {};
    tipos.forEach(t => { scoresData['T' + t] = { luz: scores[t].luz, sombra: scores[t].sombra, total: scores[t].total }; });

    // Link al panel de Vero con los puntajes cargados
    const hash = tipos.map(t => t + '=' + scores[t].luz + ',' + scores[t].sombra).join('|');
    const panelUrl = window.location.origin + window.location.pathname.replace(/test\.html$/, '') + 'lectura.html#' + encodeURIComponent(hash);

    renderEnea('enea-results', scores, media, true);

    return eneaToPng().then(function (eneaPng) {
      return fetch('/api/send-email', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eneaPng:         eneaPng,
          devolucion:      construirSintesis(scores),
          lecturaCompleta: construirLecturaCompleta(scores),
          panelUrl:        panelUrl,
          toName:          userName,
          toApellido:      userApellido,
          toEmail:         userEmail,
          toTelefono:      userTelefono,
          edad:            userEdad,
          consentimiento:  userConsentimiento ? 'Sí' : 'No',
          toOrigen:        userOrigen,
          tipoNum:         'Tipo ' + dominante,
          tipoNombre:      TIPOS[dominante].nombre,
          media:           media.toFixed(1),
          scoresData:      scoresData
        })
      });
    });
  }

  // ──────────────────────────────────────────────
  // FORMULARIO INICIAL (nombre + email)
  // ──────────────────────────────────────────────
  function setupEmailForm() {
    const errorEl = document.getElementById('email-error');

    function intentarComenzar() {
      const nombre        = document.getElementById('input-nombre').value.trim();
      const apellido      = document.getElementById('input-apellido').value.trim();
      const email         = document.getElementById('input-email').value.trim();
      const tel           = document.getElementById('input-telefono').value.trim();
      const edad          = document.getElementById('input-edad').value.trim();
      const consentimiento = document.getElementById('input-consentimiento').checked;
      const origen        = document.getElementById('input-origen').value;
      const emailValido   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nombre || !apellido || !emailValido) {
        errorEl.classList.remove('hidden');
        return;
      }
      errorEl.classList.add('hidden');
      userName         = nombre;
      userApellido     = apellido;
      userEmail        = email;
      userTelefono     = tel;
      userEdad         = edad;
      userConsentimiento = consentimiento;
      userOrigen       = origen;

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
    enviarResultado().catch(function () {});
  }

  // Botón de prueba: completa puntajes de ejemplo y salta a los resultados (solo con ?prueba)
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
    if (new URLSearchParams(window.location.search).has('prueba')) {
      document.getElementById('prueba-wrap').classList.remove('hidden');
    }
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
