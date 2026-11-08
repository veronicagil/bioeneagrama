function typeAngle(t) {
  return (((t === 9 ? 0 : t) * 40) + 270) % 360;
}

function typeXY(t, cx, cy, r) {
  const a = typeAngle(t) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function fmtMedia(m) {
  return m % 1 === 0 ? String(m) : m.toFixed(1).replace('.', ',');
}

function renderEnea(containerId, scores, media, showLabels) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (showLabels) {
    el.innerHTML = buildEneaResultados(containerId, scores, media);
    return;
  }

  const CX = 100, CY = 100, RC = 74;

  const totals = {};
  let maxVal = -1, minVal = 21, maxT = 1, minT = 1;
  for (let t = 1; t <= 9; t++) {
    totals[t] = (scores[t] && scores[t].total != null) ? scores[t].total : 0;
    if (totals[t] > maxVal) { maxVal = totals[t]; maxT = t; }
    if (totals[t] < minVal) { minVal = totals[t]; minT = t; }
  }

  const TRIANGLE = [[9,3],[3,6],[6,9]];
  const HEXAD = [[1,4],[4,2],[2,8],[8,5],[5,7],[7,1]];

  let lines = '';
  for (const [a, b] of [...TRIANGLE, ...HEXAD]) {
    const [x1, y1] = typeXY(a, CX, CY, RC);
    const [x2, y2] = typeXY(b, CX, CY, RC);
    lines += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#C8B8E8" stroke-width="1" opacity="0.7"/>`;
  }

  const circle = `<circle cx="${CX}" cy="${CY}" r="${RC}" fill="none" stroke="#C8B8E8" stroke-width="1.5"/>`;

  let points = '';

  for (let t = 1; t <= 9; t++) {
    const [x, y] = typeXY(t, CX, CY, RC);
    let color, size;

    if (t === maxT)      { color = '#B5004F'; size = 5; }
    else if (t === minT) { color = '#4B0082'; size = 3; }
    else if (totals[t] >= media) { color = '#E91E8C'; size = 3.5; }
    else                 { color = '#B0A0CC'; size = 2.2; }

    points += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size}" fill="${color}"/>`;
  }

  const mediaText = media > 0
    ? `<text x="${CX}" y="${CY + 5}" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" font-weight="600" fill="url(#mg${containerId})">⌀ ${media.toFixed(1)}</text>`
    : '';

  el.innerHTML = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <linearGradient id="mg${containerId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B5004F"/>
      <stop offset="100%" stop-color="#4B0082"/>
    </linearGradient>
  </defs>
  ${circle}
  ${lines}
  ${points}
  ${mediaText}
</svg>`;
}

// Símbolo grande de resultados: puntaje de cada tipo en su vértice + nombre alrededor
function buildEneaResultados(containerId, scores, media) {
  const CX = 100, CY = 100, RC = 70;
  const FONT = 'DM Sans, Helvetica, Arial, sans-serif';

  const totals = {};
  let maxVal = -1, minVal = 21, maxT = 1, minT = 1;
  for (let t = 1; t <= 9; t++) {
    totals[t] = (scores[t] && scores[t].total != null) ? scores[t].total : 0;
    if (totals[t] > maxVal) { maxVal = totals[t]; maxT = t; }
    if (totals[t] < minVal) { minVal = totals[t]; minT = t; }
  }

  const TRIANGLE = [[9,3],[3,6],[6,9]];
  const HEXAD = [[1,4],[4,2],[2,8],[8,5],[5,7],[7,1]];

  let lines = '';
  for (const [a, b] of [...TRIANGLE, ...HEXAD]) {
    const [x1, y1] = typeXY(a, CX, CY, RC);
    const [x2, y2] = typeXY(b, CX, CY, RC);
    lines += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#C8B8E8" stroke-width="1"/>`;
  }

  let points = '';
  let labels = '';

  for (let t = 1; t <= 9; t++) {
    const [x, y] = typeXY(t, CX, CY, RC);
    const esMax = totals[t] === maxVal; // la (o las) más marcadas llevan un halo: tendencia hacia la esencia
    let color;
    if (esMax)                    color = '#B5004F';
    else if (t === minT)          color = '#4B0082';
    else if (totals[t] >= media)  color = '#E91E8C';
    else                          color = '#7B2FBE';
    const r = esMax ? 13 : 10;

    if (esMax) points += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="19" fill="#B5004F" fill-opacity="0.12" stroke="#B5004F" stroke-width="1.6"/>`;
    points += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}" stroke="#fff" stroke-width="1.5"/>` +
      `<text x="${x.toFixed(1)}" y="${(y + 3.8).toFixed(1)}" text-anchor="middle" font-family="${FONT}" font-size="${esMax ? 12 : 10}" font-weight="700" fill="#fff">${totals[t]}</text>`;

    const a = typeAngle(t) * Math.PI / 180;
    const cos = Math.cos(a), sin = Math.sin(a);
    const lr = RC + (esMax ? 24 : 17);
    const lx = CX + lr * cos;
    const ly = CY + lr * sin;
    const anchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';
    const dy = sin > 0.3 ? 8 : sin < -0.3 ? -2 : 3;
    const nombre = (typeof TIPOS !== 'undefined' && TIPOS[t]) ? TIPOS[t].nombre.replace(/^El /, '') : '';

    labels += `<text x="${lx.toFixed(1)}" y="${(ly + dy).toFixed(1)}" text-anchor="${anchor}" font-family="${FONT}" font-size="8.5" font-weight="${esMax ? 700 : 600}" fill="${esMax ? '#B5004F' : '#3D2060'}">${t} · ${nombre}</text>`;
  }

  const mediaText = media > 0
    ? `<text x="${CX}" y="${CY - 4}" text-anchor="middle" font-family="${FONT}" font-size="7.5" font-weight="700" fill="#5E4A7A" letter-spacing="1.2">MEDIA</text>` +
      `<text x="${CX}" y="${CY + 13}" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="url(#mg${containerId})">${fmtMedia(media)}</text>`
    : '';

  return `<svg viewBox="-55 -12 310 226" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <linearGradient id="mg${containerId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B5004F"/>
      <stop offset="100%" stop-color="#4B0082"/>
    </linearGradient>
  </defs>
  <circle cx="${CX}" cy="${CY}" r="${RC}" fill="none" stroke="#C8B8E8" stroke-width="1.5"/>
  ${lines}
  ${points}
  ${labels}
  ${mediaText}
</svg>`;
}
