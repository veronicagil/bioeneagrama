const nodemailer = require('nodemailer');

module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD;

  if (!GMAIL_USER || !GMAIL_PASS) {
    return res.status(503).json({ error: 'Email no configurado' });
  }

  const { toName, toApellido, toEmail, toTelefono, toOrigen, tipoNum, tipoNombre, centro, sintesis, puntajes, media, pdfBase64, pdfFilename } = req.body || {};

  if (!toEmail || !toName) {
    return res.status(400).json({ error: 'Faltan datos del destinatario' });
  }

  const nombreCompleto = toApellido ? toName + ' ' + toApellido : toName;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_PASS }
    });

    const emailHtml = buildResultEmail(nombreCompleto, tipoNum, tipoNombre, centro, sintesis, puntajes, media);

    const attachments = [];
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
            nombre: toName,
            apellido: toApellido || '',
            email: toEmail,
            telefono: toTelefono || '',
            origen: toOrigen || '',
            tipoNum: tipoNum || '',
            tipoNombre: tipoNombre || ''
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

function buildResultEmail(nombre, tipoNum, tipoNombre, centro, sintesis, puntajes, media) {
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

    '<div style="background:linear-gradient(135deg,#B5004F,#4B0082);padding:38px 30px;text-align:center">' +
    '<h1 style="margin:0;color:#fff;font-size:26px;letter-spacing:1px;font-family:Georgia,serif">Bio Eneagrama</h1>' +
    '<p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;font-family:sans-serif;letter-spacing:1px">Test de autoconocimiento · Vero Gil</p>' +
    '</div>' +

    '<div style="padding:26px 30px;background:#f9f6ff;border-bottom:2px solid #ede8f5">' +
    '<p style="margin:0;font-size:16px;color:#3a3a5c">Hola <strong>' + nombre + '</strong>,</p>' +
    '<p style="margin:12px 0 0;font-size:14px;color:#666;line-height:1.7;font-family:sans-serif">' +
    'Adjunto encontrás tu resultado del Bio Eneagrama en PDF — una foto de cómo estás actuando hoy. Guardálo para volver a él cuando quieras.' +
    '</p>' +
    '</div>' +

    '<div style="background:linear-gradient(135deg,#B5004F,#4B0082);padding:28px 30px;text-align:center">' +
    '<p style="margin:0 0 6px;color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:sans-serif">' + (tipoNum || '') + ' · TU TIPO DOMINANTE</p>' +
    '<h2 style="margin:0;color:#fff;font-size:34px;font-family:Georgia,serif">' + (tipoNombre || '') + '</h2>' +
    '<p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-family:sans-serif">' + (centro || '') + '</p>' +
    '</div>' +

    '<div style="padding:24px 30px;border-bottom:2px solid #ede8f5">' +
    '<p style="margin:0;font-size:15px;font-style:italic;color:#3a3a5c;line-height:1.8">' + (sintesis || '') + '</p>' +
    '</div>' +

    '<div style="padding:24px 30px;border-bottom:2px solid #ede8f5">' +
    '<p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#888;text-transform:uppercase;font-family:sans-serif">Tus puntajes · Media: ' + (media || '') + '</p>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;font-family:sans-serif">' +
    puntajesHtml +
    '</table>' +
    '</div>' +

    '<div style="padding:28px 30px;background:linear-gradient(135deg,#B5004F,#4B0082);text-align:center">' +
    '<h3 style="margin:0 0 10px;color:#fff;font-size:20px;font-family:Georgia,serif">¿Querés saber más de vos?</h3>' +
    '<p style="margin:0 0 18px;color:rgba(255,255,255,0.85);font-size:13px;line-height:1.7;font-family:sans-serif">En una lectura individual podemos ir mucho más profundo: tus alas, tus ejes y tu camino de evolución específico.</p>' +
    '<a href="https://wa.me/5491149169532" style="display:inline-block;padding:13px 28px;background:#25D366;color:#fff;text-decoration:none;border-radius:25px;font-weight:bold;font-size:14px;font-family:sans-serif">💬 Quiero ir más profundo</a>' +
    '</div>' +

    '<div style="padding:18px;text-align:center;background:#f5f0ff">' +
    '<p style="margin:0;font-size:11px;color:#aaa;font-family:sans-serif">Bio Eneagrama · VG · Vero Gil · bioeneagrama.vercel.app</p>' +
    '</div>' +
    '</div></body></html>';
}
