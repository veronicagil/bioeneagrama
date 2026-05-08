(function () {
  'use strict';

  let scoresLoaded = null;

  // Intentar leer scores del hash de la URL
  function parseHashScores() {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return null;
    const scores = {};
    try {
      hash.split('|').forEach(part => {
        const [t, vals] = part.split('=');
        const [luz, sombra] = vals.split(',').map(Number);
        scores[Number(t)] = { luz, sombra, total: luz + sombra };
      });
      if (Object.keys(scores).length === 9) return scores;
    } catch (e) { }
    return null;
  }

  function calcMedia(scores) {
    const vals = Object.values(scores).map(s => s.total);
    return (Math.max(...vals) + Math.min(...vals)) / 2;
  }

  function checkPin() {
    const val = document.getElementById('pin-input').value.trim();
    const errEl = document.getElementById('pin-error');
    if (val === PIN_LECTURA) {
      document.getElementById('pin-screen').classList.add('hidden');
      const fromHash = parseHashScores();
      if (fromHash) {
        scoresLoaded = fromHash;
        showPanel(scoresLoaded);
      } else {
        document.getElementById('entry-screen').classList.remove('hidden');
      }
    } else {
      errEl.classList.remove('hidden');
      document.getElementById('pin-input').value = '';
      setTimeout(() => errEl.classList.add('hidden'), 2000);
    }
  }

  function getEntryScores() {
    const scores = {};
    let ok = true;
    for (let t = 1; t <= 9; t++) {
      const luz = parseInt(document.getElementById('luz' + t).value, 10);
      const sombra = parseInt(document.getElementById('sombra' + t).value, 10);
      if (isNaN(luz) || isNaN(sombra) || luz < 0 || luz > 10 || sombra < 0 || sombra > 10) {
        ok = false; break;
      }
      scores[t] = { luz, sombra, total: luz + sombra };
    }
    return ok ? scores : null;
  }

  function buildEntryForm() {
    const grid = document.getElementById('score-grid');
    grid.innerHTML = '';
    for (let t = 1; t <= 9; t++) {
      const cell = document.createElement('div');
      cell.className = 'score-cell';
      cell.innerHTML = `
        <label>T${t} · ${NOMBRES_CORTOS[t]}</label>
        <div class="score-inputs">
          <input type="number" id="luz${t}" min="0" max="10" placeholder="☀️" title="Luz">
          <span>/</span>
          <input type="number" id="sombra${t}" min="0" max="10" placeholder="🌑" title="Sombra">
        </div>`;
      grid.appendChild(cell);
    }
  }

  function showPanel(scores) {
    document.getElementById('entry-screen').classList.add('hidden');
    document.getElementById('panel').classList.remove('hidden');
    window.scrollTo(0, 0);

    const media = calcMedia(scores);
    const tipos = Array.from({ length: 9 }, (_, i) => i + 1);
    const altos = tipos.filter(t => scores[t].total >= media).sort((a, b) => scores[b].total - scores[a].total);
    const dominante = altos[0] || 1;

    // A: Media
    document.getElementById('sec-media').innerHTML = `
      <div class="lectura-item">
        <strong>Media:</strong> ${media.toFixed(1)}
        &nbsp;|&nbsp; <strong>Tipo dominante:</strong> T${dominante} — ${TIPOS[dominante].nombre}
        &nbsp;|&nbsp; <strong>Puntaje:</strong> ${scores[dominante].total} (☀️${scores[dominante].luz} / 🌑${scores[dominante].sombra})
      </div>
    `;

    // SVG
    renderEnea('enea-lectura', scores, media, true);

    // B: Alas
    const tipo = TIPOS[dominante];
    const alaD = tipo.ala_desarrolla;
    const alaC = tipo.ala_cuesta;
    document.getElementById('sec-alas').innerHTML = `
      <div class="lectura-item">
        <strong>Ala que desarrolla: T${alaD} — ${TIPOS[alaD].nombre}</strong><br>
        Puntaje: ${scores[alaD].total} — <span class="${scores[alaD].total >= media ? 'tag-sobre' : 'tag-bajo'}">${scores[alaD].total >= media ? 'Sobre media' : 'Bajo media'}</span>
      </div>
      <div class="lectura-item">
        <strong>Ala que le cuesta: T${alaC} — ${TIPOS[alaC].nombre}</strong><br>
        Puntaje: ${scores[alaC].total} — <span class="${scores[alaC].total >= media ? 'tag-sobre' : 'tag-bajo'}">${scores[alaC].total >= media ? 'Sobre media' : 'Bajo media'}</span>
      </div>
    `;

    // C: Ejes de equilibrio
    let ejesHtml = '';
    let ningunEje = true;
    for (const eje of EJES) {
      const [t1, t2] = eje.tipos;
      const diff = Math.abs(scores[t1].total - scores[t2].total);
      const seForma = diff <= 1;
      if (seForma) ningunEje = false;
      const ambos = scores[t1].total + scores[t2].total;
      ejesHtml += `<div class="lectura-item">
        <strong>${eje.nombre}</strong> (T${t1} + T${t2})<br>
        T${t1}: ${scores[t1].total} | T${t2}: ${scores[t2].total} | Diferencia: ${diff}<br>
        ${seForma
          ? `<span class="tag-sobre">✓ Eje activo</span> — ambos ${ambos >= media * 2 ? 'sobre media' : 'bajo media'}`
          : `<span class="tag-bajo">Sin eje formado</span>`}
      </div>`;
    }
    if (ningunEje) {
      ejesHtml += `<div class="lectura-item"><strong>Sin ningún eje formado</strong> → gran transformación en la vida de la persona.</div>`;
    }
    document.getElementById('sec-ejes').innerHTML = ejesHtml;

    // D: Dilemas
    let dilemHtml = '';
    for (const dil of DILEMAS) {
      const [t1, t2] = dil.tipos;
      const masAct = scores[t1].total >= scores[t2].total ? t1 : t2;
      const menosAct = masAct === t1 ? t2 : t1;
      dilemHtml += `<div class="lectura-item">
        <strong>${dil.nombre}</strong> (T${t1} vs T${t2})<br>
        Polo más activado: <span class="tag-sobre">T${masAct} — ${TIPOS[masAct].nombre}</span> (${scores[masAct].total})<br>
        Polo menos activado: <span class="tag-bajo">T${menosAct} — ${TIPOS[menosAct].nombre}</span> (${scores[menosAct].total})
      </div>`;
    }
    document.getElementById('sec-dilemas').innerHTML = dilemHtml;

    // E: Brazos / Flechas
    const integ = tipo.integracion;
    const desint = tipo.desintegracion;
    document.getElementById('sec-flechas').innerHTML = `
      <div class="lectura-item">
        <strong>Integración → T${integ} — ${TIPOS[integ].nombre}</strong><br>
        Puntaje: ${scores[integ].total} — <span class="${scores[integ].total >= media ? 'tag-sobre' : 'tag-bajo'}">${scores[integ].total >= media ? 'Sobre media' : 'Bajo media'}</span>
      </div>
      <div class="lectura-item">
        <strong>Desintegración → T${desint} — ${TIPOS[desint].nombre}</strong><br>
        Puntaje: ${scores[desint].total} — <span class="${scores[desint].total >= media ? 'tag-sobre' : 'tag-bajo'}">${scores[desint].total >= media ? 'Sobre media' : 'Bajo media'}</span>
      </div>
    `;

    // F: Ejes de polaridad (pendiente)
    document.getElementById('sec-polaridad').innerHTML = `
      <div class="placeholder-prox">🔮 Próximamente — Ejes de Polaridad</div>
    `;

    // G: Tríada
    let triadaKey = null;
    for (const [k, tri] of Object.entries(TRIADAS)) {
      if (tri.tipos.includes(dominante)) { triadaKey = k; break; }
    }
    const triada = TRIADAS[triadaKey];
    const triNombres = triada.tipos.map(t => `T${t} — ${NOMBRES_CORTOS[t]}`).join(', ');
    document.getElementById('sec-triada').innerHTML = `
      <div class="lectura-item">
        <strong>Tríada: ${triNombres}</strong><br>
        Herida: <span class="tag-forma">${triada.herida}</span><br>
        Clave evolutiva: <em>${triada.clave}</em>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildEntryForm();

    document.getElementById('btn-pin').addEventListener('click', checkPin);
    document.getElementById('pin-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') checkPin();
    });

    document.getElementById('btn-calcular').addEventListener('click', function () {
      const s = getEntryScores();
      if (!s) {
        alert('Ingresá valores entre 0 y 10 para cada tipo (Luz y Sombra).');
        return;
      }
      scoresLoaded = s;
      showPanel(s);
    });
  });
})();
