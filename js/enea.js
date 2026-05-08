function typeAngle(t) {
  return (((t === 9 ? 0 : t) * 40) + 270) % 360;
}

function typeXY(t, cx, cy, r) {
  const a = typeAngle(t) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function renderEnea(containerId, scores, media, showLabels) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const CX = 100, CY = 100, RC = showLabels ? 62 : 74;

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
  let labels = '';

  for (let t = 1; t <= 9; t++) {
    const [x, y] = typeXY(t, CX, CY, RC);
    let color, size;

    if (t === maxT)      { color = '#B5004F'; size = 5; }
    else if (t === minT) { color = '#4B0082'; size = 3; }
    else if (totals[t] >= media) { color = '#E91E8C'; size = 3.5; }
    else                 { color = '#B0A0CC'; size = 2.2; }

    points += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size}" fill="${color}"/>`;

    if (showLabels) {
      const angle = typeAngle(t);
      const labelR = RC + 18;
      const la = angle * Math.PI / 180;
      const lx = (CX + labelR * Math.cos(la)).toFixed(1);
      const ly = (CY + labelR * Math.sin(la)).toFixed(1);
      const anchor = (angle > 100 && angle < 260) ? 'end' : (angle < 80 || angle > 280) ? 'start' : 'middle';
      const dy = (angle > 200 && angle < 340) ? 4 : (angle > 20 && angle < 160) ? -2 : 0;

      labels += `<text x="${lx}" y="${parseFloat(ly) + dy}" text-anchor="${anchor}" font-family="DM Sans, sans-serif" font-size="7.5" fill="${color}" font-weight="600">T${t} · ${totals[t]}</text>`;
    }
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
  ${labels}
  ${mediaText}
</svg>`;
}
