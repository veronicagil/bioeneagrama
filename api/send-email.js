const nodemailer = require('nodemailer');

module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD;

  if (!GMAIL_USER || !GMAIL_PASS) {
    return res.status(503).json({ error: 'Email no configurado' });
  }

  const { toName, toApellido, toEmail, toTelefono, edad, consentimiento, toOrigen, tipoNum, tipoNombre, centro, sintesis, puntajes, media, scoresData, pdfBase64, pdfFilename, eneaPng, devolucion } = req.body || {};

  if (!toEmail || !toName) {
    return res.status(400).json({ error: 'Faltan datos del destinatario' });
  }

  const nombreCompleto = toApellido ? toName + ' ' + toApellido : toName;
  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10);
  const hora = ahora.toISOString().slice(11, 16);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_PASS }
    });

    // Puntaje más alto y más bajo, para explicar cómo se calcula la media
    const totales = Object.values(scoresData || {}).map(function (s) { return Number(s.total) || 0; });
    const extremos = totales.length ? { alto: Math.max.apply(null, totales), bajo: Math.min.apply(null, totales) } : null;

    const conSimbolo = typeof eneaPng === 'string' && eneaPng.indexOf('base64,') !== -1 && eneaPng.length < 1500000;
    const emailHtml = buildResultEmail(nombreCompleto, tipoNum, tipoNombre, centro, sintesis, puntajes, media, extremos, conSimbolo, devolucion);

    const attachments = [];
    if (conSimbolo) {
      attachments.push({
        filename: 'eneagrama.png',
        content: eneaPng.split('base64,')[1],
        encoding: 'base64',
        contentType: 'image/png',
        cid: 'eneagrama-resultado'
      });
    }
    if (pdfBase64 && pdfBase64.length < 5000000) {
      const data = pdfBase64.includes('base64,') ? pdfBase64.split('base64,')[1] : pdfBase64;
      attachments.push({
        filename: pdfFilename || ('BioEneagrama-' + toName + '.pdf'),
        content: data,
        encoding: 'base64',
        contentType: 'application/pdf'
      });
    }

    // Email al cliente
    await transporter.sendMail({
      from: '"Vero Gil · Bio Eneagrama" <' + GMAIL_USER + '>',
      to: toEmail,
      subject: 'Tu resultado · Bio Eneagrama · Vero Gil',
      html: emailHtml,
      attachments: attachments
    });

    // Email a Vero con datos de contacto completos del cliente
    const datosCliente =
      '<div style="background:#f0e8f8;padding:16px 20px;border-radius:8px;margin-bottom:20px;font-family:sans-serif;font-size:13px;color:#3a3a5c">' +
      '<p style="margin:0 0 6px;font-weight:bold;font-size:14px">📋 Datos del cliente</p>' +
      '<p style="margin:2px 0">👤 ' + nombreCompleto + '</p>' +
      '<p style="margin:2px 0">📧 ' + toEmail + '</p>' +
      (toTelefono ? '<p style="margin:2px 0">📱 ' + toTelefono + '</p>' : '') +
      (edad ? '<p style="margin:2px 0">🎂 Edad: ' + edad + '</p>' : '') +
      '<p style="margin:2px 0">🕒 Fecha: ' + fecha + ' · ' + hora + '</p>' +
      (consentimiento ? '<p style="margin:2px 0">✅ Consentimiento: desea recibir novedades y propuestas</p>' : '<p style="margin:2px 0">⚪ Consentimiento: no desea recibir novedades</p>') +
      (toOrigen   ? '<p style="margin:2px 0">🔍 Llegó por: ' + toOrigen + '</p>' : '') +
      '</div>';

    await transporter.sendMail({
      from: '"Bio Eneagrama" <' + GMAIL_USER + '>',
      to: GMAIL_USER,
      subject: '🌀 ' + nombreCompleto + ' · ' + tipoNum + ' ' + tipoNombre,
      html: datosCliente + emailHtml,
      attachments: attachments
    });

    // Guardar en Google Sheets si está configurado
    const SHEETS_URL = process.env.SHEETS_WEBHOOK_URL;
    if (SHEETS_URL) {
      try {
        await fetch(SHEETS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source:       'test',
            nombre:       toName,
            apellido:     toApellido || '',
            email:        toEmail,
            telefono:     toTelefono || '',
            edad:         edad || '',
            consentimiento: consentimiento ? 'Sí' : 'No',
            origen:       toOrigen || '',
            tipoNum:      tipoNum || '',
            tipoNombre:   tipoNombre || '',
            media:        media || '',
            fecha:        fecha,
            hora:         hora,
            timestamp:    ahora.toISOString(),
            scores:       scoresData || {}
          }),
          redirect: 'follow'
        });
      } catch (sheetErr) {
        console.error('sheets error:', sheetErr.message);
      }
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send-email error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Devolución escrita (generada en js/devolucion.js) con estilos inline para el mail
function buildDevolucionHtml(dev) {
  if (!dev || !Array.isArray(dev.base) || !Array.isArray(dev.secciones)) return { base: '', lectura: '' };
  var P = 'margin:0 0 12px;font-size:14px;color:#1A0A2E;line-height:1.7;font-family:sans-serif';
  var SUB = 'margin:18px 0 10px;padding-bottom:6px;border-bottom:2px solid #F9D6E8;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#4B0082;font-family:sans-serif';
  var estilizar = function (html) {
    return String(html)
      .replace(/<strong>/g, '<strong style="color:#4B0082">')
      .replace(/<em>/g, '<em style="color:#B5004F;font-style:normal;font-weight:bold">');
  };

  var base = '<div style="padding:24px 30px;border-bottom:2px solid #ede8f5;background:#faf7ff">' +
    '<p style="margin:0 0 14px;padding-bottom:10px;border-bottom:2px solid #F9D6E8;text-align:center;font-size:28px;line-height:1.2;font-weight:bold;color:#B5004F;font-family:Georgia,serif">El Eneagrama, ¿qué es?</p>' +
    dev.base.map(function (p) { return '<p style="' + P + '">' + estilizar(p) + '</p>'; }).join('') +
    '</div>';

  var lectura = '<div style="padding:24px 30px;border-bottom:2px solid #ede8f5">' +
    '<p style="margin:0 0 14px;padding-bottom:10px;border-bottom:2px solid #F9D6E8;text-align:center;font-size:28px;line-height:1.2;font-weight:bold;color:#B5004F;font-family:Georgia,serif">Tu lectura de Eneagrama</p>' +
    dev.secciones.map(function (sec) {
      return '<p style="' + SUB + '">' + sec.titulo + '</p>' +
        (sec.intro ? '<p style="' + P + '">' + estilizar(sec.intro) + '</p>' : '') +
        (sec.parrafos || []).map(function (p) { return '<p style="' + P + '">' + estilizar(p) + '</p>'; }).join('') +
        (sec.items ? '<ul style="margin:0 0 12px;padding-left:18px">' + sec.items.map(function (i) { return '<li style="' + P + '">' + estilizar(i) + '</li>'; }).join('') + '</ul>' : '');
    }).join('') +
    '</div>';

  return { base: base, lectura: lectura };
}

function buildResultEmail(nombre, tipoNum, tipoNombre, centro, sintesis, puntajes, media, extremos, conSimbolo, devolucion) {
  var dev = buildDevolucionHtml(devolucion);
  var mediaTxt = String(media || '').replace(/\.0$/, '').replace('.', ',');

  var simboloHtml = conSimbolo
    ? '<div style="padding:24px 20px;border-bottom:2px solid #ede8f5;text-align:center">' +
      '<p style="margin:0 0 6px;font-size:11px;letter-spacing:1px;color:#888;text-transform:uppercase;font-family:sans-serif">Tu mapa del Eneagrama</p>' +
      '<p style="margin:0 0 12px;font-size:13px;color:#555;font-family:sans-serif">En cada punta del símbolo está tu puntaje para ese tipo.</p>' +
      '<img src="cid:eneagrama-resultado" alt="Tu símbolo del Eneagrama con tus puntajes" width="500" style="display:block;width:100%;max-width:500px;height:auto;margin:0 auto">' +
      '<p style="margin:10px 0 0;font-size:12px;color:#666;font-family:sans-serif">' +
      '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#B5004F;vertical-align:middle"></span> Sobre la media &nbsp;&nbsp; ' +
      '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#7B2FBE;vertical-align:middle"></span> Bajo la media</p>' +
      '</div>'
    : '';

  var mediaHtml = mediaTxt
    ? '<div style="padding:22px 30px;border-bottom:2px solid #ede8f5">' +
      '<div style="border:2px solid #B5004F;background:#F9D6E8;border-radius:12px;padding:18px 20px;text-align:center;font-family:sans-serif">' +
      '<p style="margin:0 0 8px;font-size:18px;font-weight:bold;color:#B5004F">Tu MEDIA: ' + mediaTxt + '</p>' +
      '<p style="margin:0 0 10px;font-size:14px;color:#1A0A2E;line-height:1.6">La <strong>media</strong> es tu valor de referencia: se calcula sumando tu puntaje <strong>más alto</strong> y tu puntaje <strong>más bajo</strong>, y dividiendo por 2.</p>' +
      (extremos ? '<p style="margin:0 0 10px;font-size:15px;color:#4B0082">En tu caso: (' + extremos.alto + ' + ' + extremos.bajo + ') ÷ 2 = <strong>' + mediaTxt + '</strong></p>' : '') +
      '<p style="margin:0;font-size:13px;color:#3D2060;line-height:1.6">Es la clave para leer tus números: los tipos con puntaje <strong>igual o mayor</strong> a tu media son tus energías más activas hoy; los que quedan <strong>por debajo</strong> son las más dormidas.</p>' +
      '</div></div>'
    : '';

  var puntajesHtml = (puntajes || '').split('\n').filter(Boolean).map(function (linea) {
    var esDom = linea.indexOf('★') !== -1;
    return '<tr style="background:' + (esDom ? '#fce4ec' : '#fdf5ff') + ';border-bottom:1px solid #ede8f5">' +
      '<td style="padding:9px 14px;color:#3a3a5c;font-weight:' + (esDom ? 'bold' : 'normal') + '">' + linea + '</td>' +
      '</tr>';
  }).join('');

  return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:20px;background:#f5f0ff;font-family:Georgia,serif">' +
    '<div style="max-width:580px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">' +

    '<div style="background:linear-gradient(135deg,#B5004F,#4B0082);padding:28px 24px;text-align:center">' +
    '<div style="width:56px;height:56px;margin:0 auto 14px;border-radius:50%;background:rgba(255,255,255,0.16);display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px;font-weight:700">⌀</div>' +
    '<h1 style="margin:0;color:#fff;font-size:28px;letter-spacing:1px;font-family:Georgia,serif">Bio Eneagrama</h1>' +
    '<p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-family:sans-serif;letter-spacing:1px">Un mapa de autoconocimiento, no una etiqueta.</p>' +
    '</div>' +

    '<div style="padding:26px 30px;background:#f9f6ff;border-bottom:2px solid #ede8f5">' +
    '<p style="margin:0;font-size:16px;color:#3a3a5c">Hola <strong>' + nombre + '</strong>,</p>' +
    '<p style="margin:12px 0 0;font-size:14px;color:#666;line-height:1.7;font-family:sans-serif">' +
    'Este resultado no define quién sos. Refleja desde dónde estás observando, sintiendo y actuando hoy. Es una fotografía de tu momento actual y puede evolucionar con tu mayor conciencia.' +
    '</p>' +
    '</div>' +

    dev.base +

    '<div style="background:linear-gradient(135deg,#B5004F,#4B0082);padding:26px 30px;text-align:center">' +
    '<p style="margin:0 0 6px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:sans-serif">' + (tipoNum || '') + ' · Tipo dominante</p>' +
    '<h2 style="margin:0;color:#fff;font-size:32px;font-family:Georgia,serif">' + (tipoNombre || '') + '</h2>' +
    '<p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-family:sans-serif">' + (centro || '') + '</p>' +
    '</div>' +

    '<div style="padding:24px 30px;border-bottom:2px solid #ede8f5">' +
    '<p style="margin:0;font-size:15px;color:#3a3a5c;line-height:1.8">' + (sintesis || '') + '</p>' +
    '</div>' +

    mediaHtml +
    simboloHtml +
    dev.lectura +

    '<div style="padding:24px 30px;border-bottom:2px solid #ede8f5">' +
    '<p style="margin:0 0 10px;font-size:11px;letter-spacing:1px;color:#888;text-transform:uppercase;font-family:sans-serif">Puntajes en relación con tu media</p>' +
    '<p style="margin:0 0 14px;font-size:13px;color:#555;line-height:1.6;font-family:sans-serif">Estos puntajes muestran cómo se activan tus energías hoy, no quién sos en tu conjunto.</p>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;font-family:sans-serif">' +
    puntajesHtml +
    '</table>' +
    '</div>' +

    '<div style="padding:26px 30px;background:linear-gradient(135deg,#B5004F,#4B0082);text-align:center">' +
    '<h3 style="margin:0 0 10px;color:#fff;font-size:20px;font-family:Georgia,serif">¿Querés profundizar tu lectura?</h3>' +
    '<p style="margin:0 0 18px;color:rgba(255,255,255,0.92);font-size:13px;line-height:1.7;font-family:sans-serif">Este test es una primera foto. Si querés profundizar tu lectura, solicitá una consulta personalizada: completá el cuestionario con tus datos personales y con esa información preparo tu lectura completa.</p>' +
    '<a href="https://bioeneagrama.vercel.app/cuestionario.html" style="display:inline-block;margin:0 4px 10px;padding:13px 24px;background:#fff;color:#B5004F;text-decoration:none;border-radius:25px;font-weight:bold;font-size:14px;font-family:sans-serif">💬 Profundizar mi lectura en consulta individual</a>' +
    '<a href="https://wa.me/5491149169532?text=' + encodeURIComponent('Hola Vero, hice el test de Bio Eneagrama y quiero hacer un proceso a partir del Eneagrama.') + '" style="display:inline-block;margin:0 4px 10px;padding:13px 24px;background:#fff;color:#4B0082;text-decoration:none;border-radius:25px;font-weight:bold;font-size:14px;font-family:sans-serif">🌀 Quiero hacer un proceso a partir del Eneagrama</a>' +
    '<p style="margin:10px 0 0;color:rgba(255,255,255,0.88);font-size:12px;line-height:1.7;font-family:sans-serif">También podés elegir un <strong>acompañamiento personalizado en formato proceso</strong>: encuentros periódicos para trabajar tus energías, sostener los cambios en el tiempo y transformar tus crisis en oportunidades.</p>' +
    '</div>' +

    '<div style="padding:18px 30px 30px;text-align:center;background:#f5f0ff">' +
    '<p style="margin:0;font-size:11px;color:#aaa;font-family:sans-serif">Bio Eneagrama · VG · Vero Gil · bioeneagrama.vercel.app</p>' +
    '</div>' +
    '</div></body></html>';
}
