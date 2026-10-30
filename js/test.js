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

  // Guardamos el dominante y la media para usarlos al generar el PDF
  let resultDominante = 1;
  let resultMedia     = 0;
  let pdfGenerado     = null; // data URI del PDF ya generado
  let resultDevolucion = null; // devolución escrita, se manda también por mail

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
  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onloadend = function () { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Convierte el símbolo de resultados (SVG) a PNG para poder mostrarlo dentro del mail
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

  // El símbolo SVG sale vacío en el PDF: durante la generación se reemplaza por su versión PNG
  function ponerSimboloComoImagen(png) {
    const box = document.getElementById('enea-results');
    const svg = box && box.querySelector('svg');
    if (!png || !svg) return Promise.resolve(function () {});
    const img = new Image();
    img.style.cssText = 'display:block;width:100%;max-width:420px;height:auto;margin:0 auto';
    const listo = new Promise(function (resolve) { img.onload = resolve; img.onerror = resolve; });
    img.src = png;
    svg.style.display = 'none';
    box.appendChild(img);
    return listo.then(function () {
      return function restaurar() { img.remove(); svg.style.display = ''; };
    });
  }

  function iniciarGeneracionPDF(dominante, media) {
    const btn    = document.getElementById('btn-pdf');
    const banner = document.getElementById('pdf-banner');
    const btnG   = document.getElementById('btn-guardar');

    if (btn) { btn.textContent = '⏳ Preparando tu resultado...'; btn.disabled = true; }

    const elemento = document.getElementById('results-section');
    const nombre   = userName.replace(/\s+/g, '-') || 'resultado';
    const filename = 'BioEneagrama-' + nombre + '.pdf';

    let eneaPng  = null;
    let restaurarSimbolo = function () {};

    function restaurarPantalla() {
      restaurarSimbolo();
      if (banner) banner.style.display = '';
      if (btnG)   btnG.style.display   = '';
      if (btn)  { btn.textContent = '📄 Descargar mi resultado en PDF'; btn.disabled = false; }
    }

    eneaToPng()
      .then(function (png) {
        eneaPng = png;
        return ponerSimboloComoImagen(png);
      })
      .then(function (restaurar) {
        restaurarSimbolo = restaurar;

        // Ocultar controles que no deben ir en el PDF
        if (banner) banner.style.display = 'none';
        if (btnG)   btnG.style.display   = 'none';

        // Los celulares tienen un límite de tamaño de imagen (canvas): si el resultado es muy largo
        // y la escala es alta, la imagen se corta. Se ajusta la escala al largo del contenido.
        const altoAprox = elemento.scrollHeight * (elemento.offsetWidth / 730 || 1);
        const escala = Math.max(1, Math.min(2, Math.sqrt(12000000 / (730 * Math.max(altoAprox, 1)))));

        const opciones = {
          margin:      [10, 8, 10, 8],
          filename:    filename,
          image:       { type: 'jpeg', quality: 0.92 },
          // Sin windowWidth: con una ventana simulada más angosta que la hoja, el contenido salía corrido a la izquierda
          html2canvas: { scale: escala, useCORS: true, allowTaint: true, scrollX: 0, scrollY: 0 },
          jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
          // Ningún párrafo, título o tarjeta queda partido entre dos páginas; la lectura empieza en página nueva
          pagebreak:   { mode: ['avoid-all', 'css', 'legacy'], before: '#devolucion-lectura' }
        };

        return html2pdf().set(opciones).from(elemento).outputPdf('blob');
      })
      .then(function (blob) {
        pdfGenerado = URL.createObjectURL(blob);
        return blobToBase64(blob);
      })
      .then(function (uri) {
        restaurarPantalla();

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
              eneaPng:       eneaPng,
              devolucion:    resultDevolucion,
              toName:        userName,
              toApellido:    userApellido,
              toEmail:       userEmail,
              toTelefono:    userTelefono,
              edad:          userEdad,
              consentimiento: userConsentimiento ? 'Sí' : 'No',
              toOrigen:      userOrigen,
              tipoNum:       'Tipo ' + dominante,
              tipoNombre:    tipo.nombre,
              centro:        tipo.centro,
              sintesis:      tipo.sintesis,
              puntajes:      puntajes,
              media:         media.toFixed(1),
              scoresData:    scoresData,
              pdfBase64:     uri,
              pdfFilename:   filename
            })
          }).catch(function () {});
        }
      })
      .catch(restaurarPantalla);
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
    const totales = tipos.map(t => scores[t].total);
    const masAlto = Math.max(...totales);
    const masBajo = Math.min(...totales);
    document.getElementById('media-display').textContent  = fmtMedia(media);
    document.getElementById('media-calc').innerHTML =
      'En tu caso: (' + masAlto + ' + ' + masBajo + ') ÷ 2 = <strong>' + fmtMedia(media) + '</strong>';
    document.getElementById('grupo-altos-media').textContent = '(puntaje ' + fmtMedia(media) + ' o más)';
    document.getElementById('grupo-bajos-media').textContent = '(puntaje menor a ' + fmtMedia(media) + ')';
    renderEnea('enea-results', scores, media, true);

    // Devolución escrita (base teórica + síntesis interpretativa)
    resultDevolucion = construirDevolucion(scores);
    renderDevolucionBase('devolucion-base', resultDevolucion);
    renderDevolucionLectura('devolucion-lectura', resultDevolucion);

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
      msg += '\n📐 Media: ' + fmtMedia(media) + ' = (puntaje más alto ' + masAlto + ' + más bajo ' + masBajo + ') ÷ 2';
      msg += '\n_La media es tu valor de referencia: los tipos con puntaje igual o mayor son tus energías más activas hoy._';
      msg += '\n\n_Bio Eneagrama · Vero Gil_\nbioeneagrama.vercel.app';
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    };

    // Botón WhatsApp "Quiero hacer un proceso": le llegan a Vero los puntajes y el link al panel
    const solicitarProceso = function () {
      const hash = Object.entries(scores)
        .map(e => e[0] + '=' + e[1].luz + ',' + e[1].sombra).join('|');
      const baseUrl = window.location.origin + window.location.pathname.replace('test.html', '');
      const lecturaUrl = baseUrl + 'lectura.html#' + encodeURIComponent(hash);
      const triada = TRIADAS[tipo.triada];

      const ordenados = Array.from({ length: 9 }, (_, i) => i + 1)
        .sort((a, b) => scores[b].total - scores[a].total);
      const sobMedia = ordenados.filter(t => scores[t].total >= media);
      const bajMedia = ordenados.filter(t => scores[t].total  < media);

      let msg = '🌀 *BIO ENEAGRAMA — Quiero hacer un proceso a partir del Eneagrama*\n━━━━━━━━━━━━━━━━━━━━\n';
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
    document.querySelectorAll('[data-accion="proceso"]').forEach(b => { b.onclick = solicitarProceso; });

    // Link al cuestionario de datos personales, con mail y teléfono precargados
    const cuesParams = new URLSearchParams();
    if (userEmail)    cuesParams.set('email', userEmail);
    if (userTelefono) cuesParams.set('tel', userTelefono);
    const cuesUrl = 'cuestionario.html' + (cuesParams.toString() ? '?' + cuesParams.toString() : '');
    document.querySelectorAll('[data-accion="cuestionario"]').forEach(a => { a.href = cuesUrl; });

    // Ventana "¿Querés profundizar tu lectura?" al llegar al final de los resultados
    const modal = document.getElementById('modal-profundizar');
    const cerrarModal = function () { modal.classList.add('hidden'); };
    document.getElementById('modal-prof-cerrar').onclick = cerrarModal;
    document.getElementById('modal-prof-seguir').onclick = cerrarModal;
    modal.onclick = function (e) { if (e.target === modal) cerrarModal(); };
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(function (entries) {
        if (entries.some(en => en.isIntersecting)) {
          modal.classList.remove('hidden');
          obs.disconnect();
        }
      });
      obs.observe(document.getElementById('btn-guardar'));
    }

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
