(function () {
  'use strict';

  const scores = {};
  for (let t = 1; t <= 9; t++) scores[t] = { luz: 0, sombra: 0, total: 0 };

  let currentQ = 0;
  let answered = false;
  let questions = [];
  let answerHistory = [];

  let userName = '';
  let userEmail = '';

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
    const vals = Object.values(scores).map(function (s) { return s.total; });
    return (Math.max.apply(null, vals) + Math.min.apply(null, vals)) / 2;
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

    answerHistory.push({ tipo: q.tipo, seccion: q.seccion, resp: resp, ronda: q.ronda });
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

  // Devuelve las primeras 3 afirmaciones de luz y sombra del tipo dominante que el usuario respondió "sí"
  function getAfirmacionesDominante(dominante) {
    var luz = [];
    var sombra = [];
    for (var i = 0; i < answerHistory.length; i++) {
      var h = answerHistory[i];
      if (h.tipo === dominante && h.resp === 'si') {
        if (h.seccion === 'luz' && luz.length < 3) {
          luz.push(AFIRMACIONES[dominante].luz[h.ronda]);
        } else if (h.seccion === 'sombra' && sombra.length < 3) {
          sombra.push(AFIRMACIONES[dominante].sombra[h.ronda]);
        }
      }
    }
    return { luz: luz, sombra: sombra };
  }

  function buildEmailHTML(dominante, media) {
    var tipo = TIPOS[dominante];
    var afirm = getAfirmacionesDominante(dominante);
    var luz = afirm.luz;
    var sombra = afirm.sombra;

    var ordenados = [];
    for (var t = 1; t <= 9; t++) ordenados.push(t);
    ordenados.sort(function (a, b) { return scores[b].total - scores[a].total; });

    var luzItems = luz.map(function (a) {
      return '<li style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #f0eaf8">' + a + '</li>';
    }).join('');

    var sombraItems = sombra.map(function (a) {
      return '<li style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #ede8f5">' + a + '</li>';
    }).join('');

    var puntajesRows = ordenados.map(function (t) {
      var s = scores[t];
      var esDom = t === dominante;
      var bgColor = esDom ? '#f9e8f0' : (s.total >= media ? '#fdf5ff' : '#f9f7ff');
      var fontW = esDom ? 'bold' : 'normal';
      var marca = esDom ? '★ ' : '';
      return '<tr style="background:' + bgColor + ';border-bottom:1px solid #ede8f5">' +
        '<td style="padding:8px 14px;font-weight:' + fontW + ';color:#3a3a5c">' + marca + 'T' + t + ' · ' + TIPOS[t].nombre + '</td>' +
        '<td style="padding:8px 10px;text-align:center;font-weight:' + fontW + ';color:#B5004F">' + s.total + '</td>' +
        '<td style="padding:8px 10px;text-align:center;color:#c8a000">☀️ ' + s.luz + '</td>' +
        '<td style="padding:8px 10px;text-align:center;color:#6B2D8B">🌑 ' + s.sombra + '</td>' +
        '</tr>';
    }).join('');

    var luzSection = luz.length > 0
      ? '<div style="padding:24px 30px;background:#fffdf5;border-bottom:2px solid #f0ece0">' +
        '<p style="margin:0 0 14px;font-size:11px;letter-spacing:2px;color:#c8a000;font-weight:bold;text-transform:uppercase">☀️ &nbsp;Algunas expresiones de tu luz</p>' +
        '<ul style="margin:0;padding-left:18px;color:#555;font-size:14px;line-height:1.8;list-style:none;padding:0">' + luzItems + '</ul>' +
        '</div>'
      : '';

    var sombraSection = sombra.length > 0
      ? '<div style="padding:24px 30px;background:#fdf5ff;border-bottom:2px solid #ede8f5">' +
        '<p style="margin:0 0 14px;font-size:11px;letter-spacing:2px;color:#7B2D8B;font-weight:bold;text-transform:uppercase">🌑 &nbsp;Algunas expresiones de tu sombra</p>' +
        '<ul style="margin:0;padding-left:18px;color:#555;font-size:14px;line-height:1.8;list-style:none;padding:0">' + sombraItems + '</ul>' +
        '</div>'
      : '';

    return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
      '<body style="margin:0;padding:0;background:#f5f0ff;font-family:Georgia,serif">' +
      '<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">' +

      // Header
      '<div style="background:linear-gradient(135deg,#B5004F 0%,#4B0082 100%);padding:40px 30px;text-align:center">' +
      '<h1 style="margin:0;font-size:26px;color:#fff;letter-spacing:1px">Bio Eneagrama</h1>' +
      '<p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);letter-spacing:1px">Test de autoconocimiento · Vero Gil</p>' +
      '</div>' +

      // Saludo
      '<div style="padding:28px 30px;background:#f9f6ff;border-bottom:2px solid #ede8f5">' +
      '<p style="margin:0;font-size:16px;color:#3a3a5c">Hola <strong>' + userName + '</strong>,</p>' +
      '<p style="margin:12px 0 0;font-size:14px;color:#666;line-height:1.7">Este es tu resultado del Bio Eneagrama. Es una foto del momento — muestra desde dónde estás actuando <strong>hoy</strong>. Guardalo y volvé a él cuando quieras.</p>' +
      '</div>' +

      // Tipo dominante
      '<div style="background:linear-gradient(135deg,#B5004F 0%,#4B0082 100%);padding:32px 30px;text-align:center">' +
      '<p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,0.7);text-transform:uppercase">TIPO ' + dominante + ' · TU TIPO DOMINANTE</p>' +
      '<h2 style="margin:0;font-size:38px;color:#fff;font-weight:bold">' + tipo.nombre + '</h2>' +
      '<div style="margin:14px auto 0;display:inline-block;padding:6px 20px;border:1px solid rgba(255,255,255,0.35);border-radius:20px;color:rgba(255,255,255,0.9);font-size:13px">' + tipo.centro + '</div>' +
      '</div>' +

      // Síntesis
      '<div style="padding:28px 30px;border-bottom:2px solid #ede8f5">' +
      '<p style="margin:0;font-size:15px;line-height:1.9;color:#3a3a5c;font-style:italic">' + tipo.sintesis + '</p>' +
      '</div>' +

      luzSection +
      sombraSection +

      // Puntajes
      '<div style="padding:24px 30px;border-bottom:2px solid #ede8f5">' +
      '<p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#888;text-transform:uppercase">Tus puntajes</p>' +
      '<p style="margin:0 0 16px;font-size:15px;color:#B5004F;font-weight:bold">Media: ' + media.toFixed(1) + '</p>' +
      '<table style="width:100%;border-collapse:collapse;font-size:13px">' +
      '<tr style="background:#f0e8f5">' +
      '<th style="padding:8px 14px;text-align:left;color:#555;font-weight:normal">Tipo</th>' +
      '<th style="padding:8px 10px;text-align:center;color:#555;font-weight:normal">Total</th>' +
      '<th style="padding:8px 10px;text-align:center;color:#555;font-weight:normal">Luz</th>' +
      '<th style="padding:8px 10px;text-align:center;color:#555;font-weight:normal">Sombra</th>' +
      '</tr>' +
      puntajesRows +
      '</table>' +
      '</div>' +

      // CTA
      '<div style="padding:32px 30px;background:linear-gradient(135deg,#B5004F 0%,#4B0082 100%);text-align:center">' +
      '<h3 style="margin:0 0 10px;font-size:22px;color:#fff">¿Querés saber más de vos?</h3>' +
      '<p style="margin:0 0 22px;font-size:14px;color:rgba(255,255,255,0.85);line-height:1.7">Este test es la puerta de entrada. En una lectura individual podemos ir mucho más profundo: tus alas, tus ejes, tus contradicciones internas y tu camino de evolución específico.</p>' +
      '<a href="https://wa.me/' + WA_NUMBER + '" style="display:inline-block;padding:14px 30px;background:#25D366;color:#fff;text-decoration:none;border-radius:25px;font-weight:bold;font-size:15px;font-family:sans-serif">💬 Quiero ir más profundo</a>' +
      '</div>' +

      // Footer
      '<div style="padding:20px 30px;text-align:center;background:#f5f0ff">' +
      '<p style="margin:0;font-size:12px;color:#aaa;font-family:sans-serif">Bio Eneagrama · VG · Vero Gil · bioeneagrama.vercel.app</p>' +
      '</div>' +

      '</div></body></html>';
  }

  function buildEmailText(dominante, media) {
    var tipo = TIPOS[dominante];
    var afirm = getAfirmacionesDominante(dominante);
    var luz = afirm.luz;
    var sombra = afirm.sombra;

    var ordenados = [];
    for (var t = 1; t <= 9; t++) ordenados.push(t);
    ordenados.sort(function (a, b) { return scores[b].total - scores[a].total; });

    var txt = 'Hola ' + userName + ',\n\n';
    txt += 'Este es tu resultado del Bio Eneagrama.\n\n';
    txt += '★ TU TIPO DOMINANTE: Tipo ' + dominante + ' · ' + tipo.nombre + '\n';
    txt += 'Centro: ' + tipo.centro + '\n\n';
    txt += tipo.sintesis + '\n\n';

    if (luz.length > 0) {
      txt += '☀️ ALGUNAS EXPRESIONES DE TU LUZ:\n';
      for (var i = 0; i < luz.length; i++) txt += '• ' + luz[i] + '\n';
      txt += '\n';
    }
    if (sombra.length > 0) {
      txt += '🌑 ALGUNAS EXPRESIONES DE TU SOMBRA:\n';
      for (var j = 0; j < sombra.length; j++) txt += '• ' + sombra[j] + '\n';
      txt += '\n';
    }

    txt += '📊 TUS PUNTAJES — Media: ' + media.toFixed(1) + '\n';
    txt += '─────────────────────────────\n';
    ordenados.forEach(function (t) {
      var s = scores[t];
      var marca = t === dominante ? ' ★' : '';
      txt += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + marca + '  (☀️ ' + s.luz + ' | 🌑 ' + s.sombra + ')\n';
    });

    txt += '\n─────────────────────────────\n';
    txt += '¿Querés saber más de vos?\n';
    txt += 'Escribime: wa.me/' + WA_NUMBER + '\n\n';
    txt += 'Bio Eneagrama · Vero Gil\nbioeneagrama.vercel.app';

    return txt;
  }

  window.generarPDF = function () {
    var btn = document.getElementById('btn-pdf');
    if (btn) { btn.textContent = '⏳ Generando PDF...'; btn.disabled = true; }

    // Ocultar el banner PDF y los botones de acción del PDF temporal
    var banner = document.getElementById('pdf-banner');
    var btnGuardar = document.getElementById('btn-guardar');
    if (banner) banner.style.display = 'none';
    if (btnGuardar) btnGuardar.style.display = 'none';

    var elemento = document.getElementById('results-section');
    var nombre = userName ? userName.replace(/\s+/g, '-') : 'resultado';
    var opciones = {
      margin:      [8, 8, 8, 8],
      filename:    'BioEneagrama-' + nombre + '.pdf',
      image:       { type: 'jpeg', quality: 0.92 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true, scrollY: 0 },
      jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(elemento).save().then(function () {
      if (banner) banner.style.display = '';
      if (btnGuardar) btnGuardar.style.display = '';
      if (btn) { btn.textContent = '✓ PDF descargado'; btn.disabled = false; }
    }).catch(function () {
      if (banner) banner.style.display = '';
      if (btnGuardar) btnGuardar.style.display = '';
      if (btn) { btn.textContent = '📄 Descargar mi resultado en PDF'; btn.disabled = false; }
    });
  };

  function enviarEmailResultados(dominante, media) {
    if (!userEmail) return;

    var tipo = TIPOS[dominante];
    var textBody = buildEmailText(dominante, media);

    // EmailJS al cliente — texto estructurado limpio
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'EMAILJS_PUBLIC_KEY') {
      try {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

        var paramsCliente = {
          to_name:     userName,
          to_email:    userEmail,
          tipo_num:    'Tipo ' + dominante,
          tipo_nombre: tipo.nombre,
          tipo_centro: tipo.centro,
          sintesis:    tipo.sintesis,
          media:       media.toFixed(1),
          puntajes:    textBody,
          message:     textBody
        };
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, paramsCliente).catch(function () {});

        // EmailJS a Vero con datos del cliente + sus resultados
        var paramsVero = {
          to_name:     'Vero Gil',
          to_email:    'mverogil@gmail.com',
          tipo_num:    'Tipo ' + dominante,
          tipo_nombre: tipo.nombre,
          tipo_centro: tipo.centro,
          sintesis:    tipo.sintesis,
          media:       media.toFixed(1),
          puntajes:    textBody,
          message:     'RESULTADO DE: ' + userName + ' (' + userEmail + ')\n\n' + textBody
        };
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, paramsVero).catch(function () {});

      } catch (e) {}
    }

    // Formspree — notificación completa a Vero con todos los datos del resultado
    if (FORMSPREE_ID && FORMSPREE_ID !== 'FORMSPREE_ID') {
      var afirm = getAfirmacionesDominante(dominante);
      var ordenados = [];
      for (var t = 1; t <= 9; t++) ordenados.push(t);
      ordenados.sort(function (a, b) { return scores[b].total - scores[a].total; });

      var puntajesStr = '';
      ordenados.forEach(function (t) {
        var s = scores[t];
        puntajesStr += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + (t === dominante ? ' ★' : '') + ' (☀️' + s.luz + '/🌑' + s.sombra + ')  ';
      });

      fetch('https://formspree.io/f/' + FORMSPREE_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject:           '🌀 Resultado de ' + userName + ' — Bio Eneagrama',
          nombre:             userName,
          email:              userEmail,
          tipo_dominante:     'Tipo ' + dominante + ' · ' + tipo.nombre,
          centro:             tipo.centro,
          media:              media.toFixed(1),
          puntajes:           puntajesStr,
          expresiones_luz:    afirm.luz.join(' | ') || '(ninguna)',
          expresiones_sombra: afirm.sombra.join(' | ') || '(ninguna)',
          origen:             'Bio Eneagrama — Resultados completos'
        })
      }).catch(function () {});
    }
  }

  function setupEmailForm() {
    var errorEl = document.getElementById('email-error');

    function intentarComenzar() {
      var nombre = document.getElementById('input-nombre').value.trim();
      var email = document.getElementById('input-email').value.trim();
      var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nombre || !emailValido) {
        errorEl.classList.remove('hidden');
        return;
      }
      errorEl.classList.add('hidden');
      userName = nombre;
      userEmail = email;

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

    var media = calcMedia();
    var tipos = Array.from({ length: 9 }, function (_, i) { return i + 1; });
    var altos = tipos.filter(function (t) { return scores[t].total >= media; }).sort(function (a, b) { return scores[b].total - scores[a].total; });
    var bajos = tipos.filter(function (t) { return scores[t].total < media; }).sort(function (a, b) { return scores[a].total - scores[b].total; });
    var dominante = altos[0] || 1;
    var tipo = TIPOS[dominante];

    document.getElementById('res-tipo-num').textContent = 'Tipo ' + dominante + ' · Tu tipo dominante';
    document.getElementById('res-tipo-nombre').textContent = tipo.nombre;
    document.getElementById('res-tipo-centro').textContent = tipo.centro;
    document.getElementById('res-sintesis').textContent = tipo.sintesis;

    document.getElementById('media-display').textContent = media.toFixed(1);
    renderEnea('enea-results', scores, media, true);

    // Envía email al cliente y notificación a Vero
    enviarEmailResultados(dominante, media);

    var altosEl = document.getElementById('grupo-altos');
    altosEl.innerHTML = '';
    altos.forEach(function (t, i) { altosEl.appendChild(makeTipoCard(t, i === 0 ? '★' : String(i + 1), 'alto')); });

    var bajosEl = document.getElementById('grupo-bajos');
    bajosEl.innerHTML = '';
    bajos.forEach(function (t, i) { bajosEl.appendChild(makeTipoCard(t, i === 0 ? '▾' : '', 'bajo')); });

    document.getElementById('btn-guardar').onclick = function () {
      var nombreMostrar = userName ? userName : 'Mis resultados';
      var msg = '🌀 *Bio Eneagrama · ' + nombreMostrar + '*\n\n';
      msg += '★ *Tipo dominante: ' + TIPOS[dominante].nombre + '*\n';
      msg += TIPOS[dominante].centro + '\n\n';
      msg += TIPOS[dominante].sintesis + '\n\n';
      msg += '📊 *Puntajes:*\n';
      for (var t = 1; t <= 9; t++) {
        var s = scores[t];
        var marca = t === dominante ? ' ★' : '';
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + marca + '\n';
      }
      msg += '\n📐 Media: ' + media.toFixed(1);
      msg += '\n\n_Bio Eneagrama · Vero Gil_\nbioeneagrama.vercel.app';
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    };

    document.getElementById('btn-consulta').onclick = function () {
      var hash = Object.entries(scores).map(function (e) { return e[0] + '=' + e[1].luz + ',' + e[1].sombra; }).join('|');
      var baseUrl = window.location.origin + window.location.pathname.replace('test.html', '');
      var lecturaUrl = baseUrl + 'lectura.html#' + encodeURIComponent(hash);

      var triadaKey = tipo.triada;
      var triada = TRIADAS[triadaKey];

      var ordenados = Array.from({ length: 9 }, function (_, i) { return i + 1; })
        .sort(function (a, b) { return scores[b].total - scores[a].total; });
      var sobMedia = ordenados.filter(function (t) { return scores[t].total >= media; });
      var bajMedia = ordenados.filter(function (t) { return scores[t].total < media; });

      var msg = '🌀 *BIO ENEAGRAMA — Consulta profesional*\n';
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
        var s = scores[t];
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': *' + s.total + '* (☀️' + s.luz + ' 🌑' + s.sombra + ')\n';
      });
      msg += '\n▽ Bajo la media:\n';
      bajMedia.forEach(function (t) {
        var s = scores[t];
        msg += 'T' + t + ' ' + TIPOS[t].nombre + ': ' + s.total + ' (☀️' + s.luz + ' 🌑' + s.sombra + ')\n';
      });

      msg += '\n🔍 *Panel profesional:*\n' + lecturaUrl;
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    };
  }

  function makeTipoCard(t, badge, grupo) {
    var div = document.createElement('div');
    div.className = 'tipo-card ' + grupo;
    var s = scores[t];
    var emptyFlex = 20 - s.total;
    var badgeClass = grupo === 'bajo' ? 'tipo-badge bajo-badge' : 'tipo-badge';
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
    var sim = { 1:7, 2:15, 3:5, 4:8, 5:4, 6:10, 7:6, 8:3, 9:7 };
    for (var t = 1; t <= 9; t++) {
      var luz = Math.round(sim[t] * 0.55);
      var sombra = sim[t] - luz;
      scores[t] = { luz: luz, sombra: sombra, total: sim[t] };
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
