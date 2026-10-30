const nodemailer = require('nodemailer');

const MAIL_VERO = 'mverogil@gmail.com';

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}

async function guardarEnSheets(data, now) {
  const SHEETS_URL = process.env.SHEETS_WEBHOOK_URL;
  if (!SHEETS_URL) return;
  const fecha = now.toISOString().slice(0, 10);
  const hora = now.toISOString().slice(11, 16);
  const { preguntas, ...datosPlanilla } = data; // la planilla recibe los mismos datos que antes
  await fetch(SHEETS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'cuestionario', fecha: fecha, hora: hora, timestamp: now.toISOString(), ...datosPlanilla }),
    redirect: 'follow'
  });
}

// Envía las respuestas del cuestionario al mail de Vero
async function enviarPorMail(data) {
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD;
  if (!GMAIL_USER || !GMAIL_PASS) return;

  const preguntas  = Array.isArray(data.preguntas)  ? data.preguntas  : [];
  const respuestas = Array.isArray(data.respuestas) ? data.respuestas : [];
  const filas = respuestas.map(function (r, i) {
    return '<div style="margin:0 0 16px">' +
      '<p style="margin:0 0 4px;font-weight:bold;color:#4B0082;font-family:sans-serif;font-size:14px">' + (i + 1) + '. ' + esc(preguntas[i] || 'Pregunta ' + (i + 1)) + '</p>' +
      '<p style="margin:0;color:#1A0A2E;font-family:sans-serif;font-size:14px;line-height:1.6">' + (String(r || '').trim() ? esc(r.trim()) : '<em style="color:#888">(sin respuesta)</em>') + '</p>' +
      '</div>';
  }).join('');

  const html = '<div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #ede8f5;border-radius:12px;overflow:hidden">' +
    '<div style="padding:20px 26px;background:linear-gradient(135deg,#B5004F,#4B0082);color:#fff;font-family:Georgia,serif">' +
    '<p style="margin:0;font-size:22px;font-weight:bold">Cuestionario + solicitud de consulta</p>' +
    '<p style="margin:6px 0 0;font-size:13px;font-family:sans-serif;opacity:0.9">Bio Eneagrama · Vero Gil</p></div>' +
    '<div style="padding:20px 26px;background:#f5f0ff;font-family:sans-serif;font-size:14px;color:#1A0A2E;line-height:1.7">' +
    '<strong>Nombre:</strong> ' + esc(data.nombre) + '<br>' +
    '<strong>Mail:</strong> ' + esc(data.email) + '<br>' +
    '<strong>Teléfono:</strong> ' + esc(data.telefono || '—') + '</div>' +
    '<div style="padding:22px 26px">' + filas + '</div></div>';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_PASS }
  });
  const destinatarios = Array.from(new Set([MAIL_VERO, GMAIL_USER]));
  await transporter.sendMail({
    from: '"Bio Eneagrama" <' + GMAIL_USER + '>',
    to: destinatarios.join(', '),
    replyTo: data.email || undefined,
    subject: '📝 Cuestionario y solicitud de consulta — ' + (data.nombre || data.email || 'sin nombre'),
    html: html
  });
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body || {};
  const now = new Date();
  const resultados = await Promise.allSettled([guardarEnSheets(data, now), enviarPorMail(data)]);
  resultados.forEach(function (r) {
    if (r.status === 'rejected') console.error('save-cuestionario error:', r.reason && r.reason.message);
  });
  res.status(200).json({ ok: true }); // No interrumpir la experiencia del usuario
};
