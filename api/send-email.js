const nodemailer = require('nodemailer');

module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD;

  if (!GMAIL_USER || !GMAIL_PASS) {
    return res.status(503).json({ error: 'Email no configurado' });
  }

  const { toName, toApellido, toEmail, toTelefono, edad, consentimiento, toOrigen, tipoNum, tipoNombre, centro, sintesis, puntajes, media, scoresData, pdfBase64, pdfFilename, eneaPng, devolucion, lecturaCompleta } = req.body || {};

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
    const emailHtml = buildClienteEmail(toName, devolucion, scoresData, extremos, conSimbolo);

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
      html: buildVeroEmail(datosCliente, nombreCompleto, lecturaCompleta, scoresData, extremos, conSimbolo),
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

// ──────────────────────────────────────────────
// Mails: la persona recibe la síntesis (js/devolucion.js → construirSintesis);
// Vero recibe la lectura completa (construirLecturaCompleta). Estilos inline para Gmail.
// ──────────────────────────────────────────────
var FUCSIA = '#B5004F', VIOLETA = '#4B0082', TINTA = '#1F1230', TINTA2 = '#4A3A60', TINTA3 = '#75668A', FONDO = '#F4EDFA';
var P = 'margin:0 0 14px;font-size:15px;color:' + TINTA + ';line-height:1.7;font-family:Helvetica,Arial,sans-serif';
var H1 = 'margin:0 0 14px;font-size:32px;line-height:1.1;font-weight:normal;color:' + TINTA + ';font-family:Georgia,serif';
var H2 = 'margin:28px 0 10px;font-size:23px;line-height:1.2;font-weight:bold;color:' + VIOLETA + ';font-family:Georgia,serif';
var ETQ = 'margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;color:' + FUCSIA + ';font-family:Helvetica,Arial,sans-serif';

function estilizar(html) {
  return String(html || '')
    .replace(/<strong>/g, '<strong style="color:' + VIOLETA + '">')
    .replace(/<em>/g, '<em style="color:' + FUCSIA + '">');
}
function parrafos(arr) {
  return (arr || []).map(function (p) { return '<p style="' + P + '">' + estilizar(p) + '</p>'; }).join('');
}
function fmt(n) { n = Number(n); return Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ','); }

var NOMBRES = { 1: 'Organizador', 2: 'Servidor', 3: 'Realizador', 4: 'Creativo', 5: 'Observador', 6: 'Colaborador', 7: 'Entusiasta', 8: 'Luchador', 9: 'Pacificador' };

// Lista ordenada de mayor a menor con barras (tablas, para que se vea bien en cualquier mail)
function mapaBarras(scoresData, ref) {
  var filas = Object.keys(scoresData || {}).map(function (k) {
    var t = Number(String(k).replace('T', ''));
    return { t: t, v: Number(scoresData[k].total) || 0 };
  }).sort(function (a, b) { return b.v - a.v || a.t - b.t; });
  if (!filas.length) return '';
  var grupo = function (txt) {
    return '<tr><td colspan="3" style="padding:12px 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;color:' + TINTA3 + ';font-family:Helvetica,Arial,sans-serif">' + txt + '</td></tr>';
  };
  var fila = function (f) {
    var ancho = Math.max(2, Math.round(f.v / 20 * 100)), color = f.v >= ref ? '#C2185B' : '#8E5CC9';
    return '<tr>' +
      '<td style="padding:3px 10px 3px 0;font-size:13px;color:' + TINTA + ';font-family:Helvetica,Arial,sans-serif;white-space:nowrap">' + NOMBRES[f.t] + ' <span style="color:' + TINTA3 + '">T' + f.t + '</span></td>' +
      '<td style="padding:3px 0;width:100%"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E6DDF0;border-radius:0 4px 4px 0"><tr>' +
      '<td width="' + ancho + '%" style="height:10px;background:' + color + ';border-radius:0 4px 4px 0;font-size:0;line-height:0">&nbsp;</td>' +
      '<td style="font-size:0;line-height:0">&nbsp;</td></tr></table></td>' +
      '<td style="padding:3px 0 3px 10px;font-size:13px;font-weight:bold;color:' + TINTA + ';text-align:right;font-family:Helvetica,Arial,sans-serif">' + f.v + '</td>' +
      '</tr>';
  };
  var html = grupo('Más presentes hoy');
  var enRef = false, debajo = false;
  filas.forEach(function (f) {
    if (f.v === ref && !enRef) { html += grupo('En tu referencia'); enRef = true; }
    if (f.v < ref && !debajo) { html += grupo('Más en pausa'); debajo = true; }
    html += fila(f);
  });
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' + html + '</table>';
}

function simbolo(conSimbolo) {
  return conSimbolo
    ? '<img src="cid:eneagrama-resultado" alt="Tu símbolo del Eneagrama con tus puntajes" width="440" style="display:block;width:100%;max-width:440px;height:auto;margin:14px auto 4px">'
    : '';
}

function bloqueMapa(ref, extremos, scoresData, conSimbolo, textoRef) {
  return '<div style="background:' + FONDO + ';border-radius:6px;padding:20px 22px;margin:0 0 6px">' +
    '<table role="presentation" cellpadding="0" cellspacing="0"><tr>' +
    '<td style="padding-right:14px;font-size:54px;line-height:1;color:' + FUCSIA + ';font-family:Georgia,serif;font-weight:bold;vertical-align:top">' + fmt(ref) + '</td>' +
    '<td style="font-size:13px;line-height:1.55;color:' + TINTA2 + ';font-family:Helvetica,Arial,sans-serif;vertical-align:top"><strong style="color:' + TINTA + '">Tu referencia.</strong> ' +
    (textoRef || (extremos ? 'Es el punto medio entre el puntaje más alto y el más bajo: (' + extremos.alto + ' + ' + extremos.bajo + ') ÷ 2 = ' + fmt(ref) + '.' : '')) + '</td>' +
    '</tr></table>' +
    simbolo(conSimbolo) +
    mapaBarras(scoresData, ref) +
    '<p style="margin:10px 0 0;font-size:12px;color:' + TINTA3 + ';font-family:Helvetica,Arial,sans-serif">Cada energía puede sumar hasta 20.</p>' +
    '</div>';
}

function envolver(contenido) {
  return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:20px 10px;background:#F4EDFA">' +
    '<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden">' +
    contenido +
    '<div style="padding:18px 30px 26px;text-align:center"><p style="margin:0;font-size:11px;color:#9a8fb0;font-family:Helvetica,Arial,sans-serif">Bio Eneagrama · VG · Vero Gil · bioeneagrama.vercel.app</p></div>' +
    '</div></body></html>';
}

var CABECERA = '<div style="background:linear-gradient(135deg,#B5004F,#4B0082);background-color:#7A0F6A;padding:24px 30px">' +
  '<p style="margin:0;color:#fff;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-family:Helvetica,Arial,sans-serif;font-weight:bold">Bio Eneagrama · Vero Gil</p></div>';

// ── Mail a la persona: síntesis breve + invitación ──
function buildClienteEmail(nombre, sint, scoresData, extremos, conSimbolo) {
  sint = sint || {};
  var ref = sint.referencia ? Number(sint.referencia.valor) : (extremos ? (extremos.alto + extremos.bajo) / 2 : 0);
  var waProceso = 'https://wa.me/5491149169532?text=' + encodeURIComponent('Hola Vero, hice el test de Bio Eneagrama y quiero hacer un proceso a partir del Eneagrama.');

  return envolver(
    CABECERA +
    '<div style="padding:30px 30px 10px">' +
    '<p style="' + P + ';font-size:16px">Hola <strong style="color:' + VIOLETA + '">' + nombre + '</strong>, acá está tu lectura de hoy.</p>' +

    '<h1 style="' + H1 + ';margin-top:18px">El Eneagrama, <em style="color:' + FUCSIA + '">¿qué es?</em></h1>' +
    parrafos(sint.queEs) +

    '<h1 style="' + H1 + ';margin-top:30px;padding-top:24px;border-top:1px solid #E6DDF0">Tu lectura de <em style="color:' + FUCSIA + '">Eneagrama</em></h1>' +
    '<h2 style="' + H2 + ';margin-top:6px">Tu mapa de hoy</h2>' +
    bloqueMapa(ref, extremos, scoresData, conSimbolo, sint.referencia && sint.referencia.texto) +

    '<h2 style="' + H2 + '">Tu síntesis de hoy</h2>' +
    parrafos(sint.sintesis) +
    (sint.pregunta ? '<p style="margin:18px 0;padding-left:14px;border-left:2px solid ' + FUCSIA + ';font-size:21px;line-height:1.35;font-style:italic;color:' + VIOLETA + ';font-family:Georgia,serif">' + sint.pregunta + '</p>' : '') +
    (sint.enPausa ? parrafos([sint.enPausa]) : '') +
    '</div>' +

    '<div style="margin:10px 30px 0;background:' + FONDO + ';border-top:3px solid ' + FUCSIA + ';border-radius:0 0 6px 6px;padding:22px 24px;text-align:center">' +
    '<h2 style="' + H2 + ';margin-top:0">Esto es solo el comienzo</h2>' +
    '<p style="' + P + '">Esta foto muestra una parte de tu mapa. En una <strong style="color:' + VIOLETA + '">lectura personalizada</strong> vemos:</p>' +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px;text-align:left">' +
    (sint.teaser || []).map(function (t) {
      return '<tr><td style="padding:3px 10px 3px 0;color:' + FUCSIA + ';font-size:12px;vertical-align:top">✦</td><td style="padding:3px 0;font-size:14px;line-height:1.55;color:' + TINTA2 + ';font-family:Helvetica,Arial,sans-serif">' + t + '</td></tr>';
    }).join('') +
    '</table>' +
    '<a href="https://bioeneagrama.vercel.app/cuestionario.html" style="display:block;padding:14px 18px;background:' + FUCSIA + ';color:#fff;text-decoration:none;border-radius:999px;font-weight:bold;font-size:15px;font-family:Helvetica,Arial,sans-serif">Profundizar mi lectura en consulta individual</a>' +
    '<a href="' + waProceso + '" style="display:block;margin-top:10px;padding:12px 18px;border:1.5px solid ' + VIOLETA + ';color:' + VIOLETA + ';text-decoration:none;border-radius:999px;font-weight:bold;font-size:14px;font-family:Helvetica,Arial,sans-serif">Quiero hacer un proceso a partir del Eneagrama</a>' +
    '<p style="margin:14px 0 0;font-size:12px;line-height:1.5;color:' + TINTA3 + ';font-family:Helvetica,Arial,sans-serif">Al solicitar tu consulta vas a completar un cuestionario personal; tus respuestas me llegan a mverogil@gmail.com. La consulta es arancelada y se reserva con el 50% de seña.</p>' +
    '</div>' +

    '<p style="margin:26px 30px 0;text-align:center;font-size:19px;line-height:1.4;color:' + TINTA2 + ';font-family:Georgia,serif">El Eneagrama no te define: te ayuda a comprenderte para vivir con mayor conciencia.</p>'
  );
}

// ── Mail a Vero: datos de contacto + lectura completa + datos técnicos ──
function buildVeroEmail(datosCliente, nombre, lectura, scoresData, extremos, conSimbolo) {
  var ref = extremos ? (extremos.alto + extremos.bajo) / 2 : 0;
  var secciones = (lectura && Array.isArray(lectura.secciones)) ? lectura.secciones : [];
  var cuerpo = secciones.map(function (sec) {
    return '<h2 style="' + H2 + '">' + sec.titulo + '</h2>' +
      (sec.intro ? '<p style="' + P + ';color:' + TINTA2 + '">' + estilizar(sec.intro) + '</p>' : '') +
      parrafos(sec.parrafos) +
      (sec.facetas ? '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 12px">' + sec.facetas.map(function (f) {
        return '<tr><td style="padding:4px 12px 4px 0;vertical-align:top;white-space:nowrap"><p style="' + ETQ + ';margin:2px 0 0">' + f[0] + '</p></td><td style="padding:4px 0"><p style="' + P + ';margin:0">' + estilizar(f[1]) + '</p></td></tr>';
      }).join('') + '</table>' : '') +
      (sec.pregunta ? '<p style="margin:14px 0;padding-left:14px;border-left:2px solid ' + FUCSIA + ';font-size:19px;font-style:italic;color:' + VIOLETA + ';font-family:Georgia,serif">' + sec.pregunta + '</p>' : '') +
      parrafos(sec.parrafos2) +
      (sec.cita ? '<p style="margin:18px 0 6px;text-align:center;font-size:20px;color:' + TINTA + ';font-family:Georgia,serif">' + sec.cita + '</p><p style="' + P + ';text-align:center">' + estilizar(sec.citaTexto) + '</p>' : '') +
      (sec.items ? '<ul style="margin:0 0 12px;padding-left:18px">' + sec.items.map(function (i) { return '<li style="' + P + ';margin-bottom:6px">' + estilizar(i) + '</li>'; }).join('') + '</ul>' : '') +
      parrafos(sec.cierre);
  }).join('');

  return envolver(
    CABECERA +
    '<div style="padding:24px 30px 10px">' +
    datosCliente +
    '<h1 style="' + H1 + '">Lectura completa · ' + nombre + '</h1>' +
    '<p style="' + P + ';color:' + TINTA2 + '">La persona recibió solo la síntesis breve. Esta lectura es para preparar la consulta: lo calculado está indicado como tal; lo demás son hipótesis para explorar.</p>' +
    bloqueMapa(ref, extremos, scoresData, conSimbolo) +
    cuerpo +
    '</div>'
  );
}
