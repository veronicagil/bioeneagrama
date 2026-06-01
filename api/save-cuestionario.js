module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const SHEETS_URL = process.env.SHEETS_WEBHOOK_URL;
  if (!SHEETS_URL) return res.status(200).json({ ok: true, skipped: 'no webhook configured' });

  try {
    const data = req.body || {};
    await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'cuestionario', ...data }),
      redirect: 'follow'
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('save-cuestionario error:', err.message);
    res.status(200).json({ ok: true }); // No interrumpir la experiencia del usuario
  }
};
