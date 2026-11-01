// ──────────────────────────────────────────────
// DEVOLUCIÓN ESCRITA — enfoque BioEneagrama (Vero Gil)
// Dos versiones a partir de los mismos puntajes:
//   · construirSintesis(scores)        → la persona: síntesis breve que invita a la consulta
//                                        (test.html, PDF y mail a la persona)
//   · construirLecturaCompleta(scores) → Vero: lectura completa + datos técnicos
//                                        (mail a Vero y panel lectura.html)
// Criterios: foto de hoy (no esencia), referencia = (máx + mín) / 2, conductas en lugar
// de etiquetas, energías bajas como recursos a explorar, hipótesis para observar.
// ──────────────────────────────────────────────

// Textos por energía. Todo lo interpretativo está escrito como posibilidad.
const LECTURA_TIPO = {
  1: {
    verbo: "hacer las cosas bien, con orden y criterio",
    recurso: "Tenés un sentido claro de lo correcto y la capacidad de ordenar, mejorar y sostener la calidad de lo que hacés.",
    automatismo: "exigirte (y exigir) que todo esté bien hecho, y sentir tensión cuando algo queda imperfecto",
    ejemplo: "Terminás un trabajo que salió bien, pero te quedás pensando en el único detalle que podría haber quedado mejor.",
    pregunta: "¿Te cuesta disfrutar de lo que hiciste mientras quede algo por corregir?",
    sombra: "exigirte de más y sentir enojo cuando las cosas no salen como deberían",
    donTrampa: "La misma exigencia que hace que tu trabajo sea confiable puede dejarte sin descanso ni disfrute.",
    recursoBajo: "orden propio, criterio y coherencia con lo que considerás valioso.",
    practica: "Cuando termines algo, nombrá primero tres cosas que salieron bien antes de mirar lo que falta.",
    preguntaFinal: "¿Esto necesita ser perfecto, o ya es suficientemente bueno?"
  },
  2: {
    verbo: "cuidar, escuchar y acompañar a los demás",
    recurso: "Podés estar presente para otros y percibir lo que necesitan: la gente suele sentirse acompañada a tu lado.",
    automatismo: "decir que sí antes de preguntarte si querés o podés",
    ejemplo: "Alguien te pide una mano un día en que ya venías con lo justo. Aceptás igual, y a la noche te encontrás sin energía, con la sensación de que nadie lo registró.",
    pregunta: "¿A veces te ocupás tanto de acompañar o de estar disponible que dejás para después lo que vos necesitás?",
    sombra: "esperar reconocimiento por lo que das y sentir frustración cuando no llega",
    donTrampa: "La misma sensibilidad que te permite percibir lo que otro necesita puede llevarte a olvidar lo que necesitás vos.",
    recursoBajo: "cuidado, cercanía y permiso para pedir lo que necesitás.",
    practica: "Antes de aceptar un pedido, hacé una pausa y preguntate si querés hacerlo y si tenés disponibilidad.",
    preguntaFinal: "¿Estoy ayudando por elección, o esperando que eso me asegure cariño, reconocimiento o tranquilidad?"
  },
  3: {
    verbo: "proponerte metas y avanzar hacia resultados",
    recurso: "Tenés energía para ponerte objetivos, organizarte y llegar a resultados concretos.",
    automatismo: "medir tu valor por lo que lográs y seguir rindiendo aunque el cuerpo pida parar",
    ejemplo: "Cerrás un objetivo importante y, en lugar de celebrarlo, ya estás pensando en el siguiente.",
    pregunta: "¿Te pasa que te cuesta frenar, como si parar fuera perder terreno?",
    sombra: "ajustar tu imagen a lo que esperan los demás y dejar las emociones para después",
    donTrampa: "La misma eficacia que te lleva lejos puede hacerte confundir lo que hacés con lo que sos.",
    recursoBajo: "reconocer tu propio valor, ordenar prioridades y avanzar hacia objetivos personales.",
    practica: "Una vez por semana, celebrá un logro antes de proponerte el siguiente.",
    preguntaFinal: "¿Esto lo hago porque lo quiero, o para que me vean de una determinada manera?"
  },
  4: {
    verbo: "sentir con profundidad y expresarte de manera auténtica",
    recurso: "Tenés sensibilidad para captar matices emocionales y darles una forma propia y original.",
    automatismo: "quedarte en lo que falta o en lo que se perdió, y comparar tu vida con la de otros",
    ejemplo: "Algo lindo está pasando, pero tu atención se va hacia lo que no está o hacia cómo era antes.",
    pregunta: "¿A veces sentís que a tu vida le falta algo que a otros parece sobrarles?",
    sombra: "encerrarte en tu mundo interior y pasar de la euforia al desánimo",
    donTrampa: "La misma profundidad que te permite conmoverte puede hacer que una emoción ocupe más espacio del que necesita.",
    recursoBajo: "contacto con tus emociones, expresión creativa y autenticidad.",
    practica: "Cada día, anotá algo que tenés hoy y que valorás, por pequeño que sea.",
    preguntaFinal: "¿Qué hay de valioso en este momento, tal como es?"
  },
  5: {
    verbo: "observar, comprender y pensar con independencia",
    recurso: "Podés analizar con claridad, tomar distancia y entender cómo funcionan las cosas.",
    automatismo: "retirarte a pensar en lugar de participar, y guardar tu tiempo y tu energía",
    ejemplo: "En una reunión tenés algo valioso para decir, pero preferís seguir observando y te lo guardás.",
    pregunta: "¿Te pasa que preferís entender todo antes de animarte a actuar?",
    sombra: "aislarte y desconectarte de lo que sentís para analizarlo",
    donTrampa: "La misma distancia que te da claridad puede dejarte afuera de lo que querés vivir.",
    recursoBajo: "pausa, observación y espacio propio antes de responder.",
    practica: "Una vez por día, compartí una idea o algo que sentís antes de tenerlo del todo resuelto.",
    preguntaFinal: "¿Necesito saber más, o ya puedo dar el primer paso?"
  },
  6: {
    verbo: "sostener, colaborar y buscar seguridad en los vínculos",
    recurso: "Se puede confiar en vos: sostenés compromisos, anticipás problemas y cuidás al grupo.",
    automatismo: "anticipar lo que puede salir mal y buscar afuera la confirmación de que vas por buen camino",
    ejemplo: "Antes de decidir algo importante consultás a varias personas, y aun así te quedás con la duda.",
    pregunta: "¿A veces dudás de tu propio criterio aunque tengas razones para confiar en él?",
    sombra: "dudar de tu criterio e imaginar lo peor antes de que pase",
    donTrampa: "La misma prudencia que te protege puede frenarte cuando es momento de animarte.",
    recursoBajo: "confianza, compromiso y apoyo en vínculos seguros.",
    practica: "Ante una duda, escribí primero qué pensás vos antes de consultar a otros.",
    preguntaFinal: "¿Esto que siento es un riesgo real, o es mi miedo anticipando?"
  },
  7: {
    verbo: "disfrutar, entusiasmarte y abrir posibilidades",
    recurso: "Tenés alegría, ideas y una capacidad real de ver salidas donde otros ven problemas.",
    automatismo: "pasar rápido a otra cosa cuando algo se pone difícil o aburrido",
    ejemplo: "Cuando aparece una conversación incómoda, la desviás con humor o con un plan nuevo.",
    pregunta: "¿Te pasa que llenás la agenda para no quedarte a solas con lo que te preocupa?",
    sombra: "dispersarte y esquivar lo que duele",
    donTrampa: "El mismo entusiasmo que abre caminos puede hacer que dejes muchos sin terminar.",
    recursoBajo: "disfrute, alegría y permiso para pasarla bien.",
    practica: "Elegí un proyecto que ya empezaste y dale un paso más antes de abrir uno nuevo.",
    preguntaFinal: "¿Estoy eligiendo esto, o estoy escapando de algo?"
  },
  8: {
    verbo: "decidir, proteger y poner límites",
    recurso: "Tenés fuerza para decidir, hacerte cargo y proteger a quienes querés.",
    automatismo: "tomar el control y reaccionar con fuerza cuando sentís que te presionan",
    ejemplo: "Alguien cuestiona una decisión tuya y tu respuesta sale más fuerte de lo que hubieras querido.",
    pregunta: "¿Te cuesta mostrar cansancio o fragilidad, aun con la gente de confianza?",
    sombra: "imponer tu ritmo y mostrar más dureza de la que sentís",
    donTrampa: "La misma fuerza que protege a otros puede alejar la cercanía que también necesitás.",
    recursoBajo: "firmeza, límites y permiso para decir lo que querés.",
    practica: "Cuando sientas el impulso de reaccionar, respirá tres veces antes de responder.",
    preguntaFinal: "¿Qué estoy protegiendo cuando endurezco mi respuesta?"
  },
  9: {
    verbo: "conciliar, aceptar y sostener la calma",
    recurso: "Transmitís calma, podés ver todos los puntos de vista y ayudás a que los demás se entiendan.",
    automatismo: "ceder para evitar el conflicto y postergar lo que es importante para vos",
    ejemplo: "Alguien propone un plan que no te convence y decís que sí para no generar tensión.",
    pregunta: "¿Te cuesta saber qué querés vos cuando hay otros opinando?",
    sombra: "postergar lo propio y desconectarte cuando algo incomoda",
    donTrampa: "La misma calma que une a los demás puede hacer que tu voz quede en silencio.",
    recursoBajo: "calma, aceptación y pausa para volver a tu centro.",
    practica: "Una vez por día, decí en voz alta una preferencia tuya, aunque sea pequeña.",
    preguntaFinal: "¿Qué quiero yo en esta situación?"
  }
};

// Centros: 3 energías × 20 afirmaciones = 60 posibles cada uno, por eso se comparan en bruto
const CENTROS = [
  { clave: 'sentimiento', nombre: 'Sentimiento', tipos: [2, 3, 4], foco: 'los vínculos, la imagen y lo que pasa con los demás' },
  { clave: 'pensamiento', nombre: 'Pensamiento', tipos: [5, 6, 7], foco: 'la mente, la planificación y la búsqueda de seguridad' },
  { clave: 'accion',      nombre: 'Acción',      tipos: [8, 9, 1], foco: 'el cuerpo, los límites y el hacer' }
];

// Tríadas según cómo se reacciona ante los conflictos (solo para la lectura de Vero)
const REACCION_TRIADA = {
  acercan:   { accion: "acercarse a los otros",      herida: "el rechazo",  clave: "dar un paso hacia atrás" },
  enfrentan: { accion: "enfrentar y desafiar",       herida: "la agresión", clave: "dar un paso hacia el interior" },
  aislan:    { accion: "tomar distancia y aislarse", herida: "el abandono", clave: "dar un paso hacia adelante" }
};

// Diferencia mínima entre luz y sombra para hablar de predominio
const DIF_LUZ_SOMBRA = 3;

const nombreTipo = t => TIPOS[t].nombre.replace(/^El /, '');
const delTipo = t => 'del ' + nombreTipo(t);
const enLista = arr => arr.length > 1 ? arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1] : (arr[0] || '');

// Cálculos verificables: referencia, grupos, energía principal y centros
function analizarResultados(scores) {
  const tipos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const tot = t => scores[t].total;
  const desc = (a, b) => tot(b) - tot(a) || a - b;
  const max = Math.max(...tipos.map(tot));
  const min = Math.min(...tipos.map(tot));
  const media = (max + min) / 2;
  const encima = tipos.filter(t => tot(t) > media).sort(desc);
  const enRef  = tipos.filter(t => tot(t) === media).sort(desc);
  const debajo = tipos.filter(t => tot(t) < media).sort(desc);
  const orden  = tipos.slice().sort(desc);

  // Energía principal: la más alta (o las empatadas en el primer puesto)
  const principales = orden.filter(t => tot(t) === max);
  // La segunda se lee en conjunto solo si también está por encima de la referencia
  const segunda = principales.length === 1 && encima[1] !== undefined ? encima[1] : null;
  const bajas = debajo.slice().reverse().slice(0, 3); // las 2-3 más bajas, de menor a mayor

  const centros = CENTROS.map(c => ({ ...c, suma: c.tipos.reduce((a, t) => a + tot(t), 0) }))
    .sort((a, b) => b.suma - a.suma);

  return { tot, max, min, media, encima, enRef, debajo, orden, principales, segunda, bajas, centros };
}

function fraseEnergiaPrincipal(a) {
  const p = a.principales;
  if (p.length > 1) {
    return 'En tus respuestas aparecen con la misma fuerza las energías ' + enLista(p.map(t => '<strong>' + delTipo(t) + '</strong>')) +
      ' (' + a.max + ' cada una). Juntas hablan de una forma de estar que combina ' + enLista(p.map(t => LECTURA_TIPO[t].verbo)) + '.';
  }
  const d = p[0];
  let f = 'En tus respuestas aparece con más fuerza la energía <strong>' + delTipo(d) + '</strong> (' + a.tot(d) + ')';
  if (a.segunda) {
    f += ', acompañada por la <strong>' + delTipo(a.segunda) + '</strong> (' + a.tot(a.segunda) + '). Juntas hablan de una forma de estar que combina ' +
      LECTURA_TIPO[d].verbo + ' con ' + LECTURA_TIPO[a.segunda].verbo + '.';
  } else {
    f += '. Habla de una forma de estar ligada a ' + LECTURA_TIPO[d].verbo + '.';
  }
  return f;
}

// ── Versión para la persona: breve, clara y con ganas de saber más ──
function construirSintesis(scores) {
  const a = analizarResultados(scores);
  const d = a.principales[0];
  const L = LECTURA_TIPO[d];

  return {
    queEs: [
      'El Eneagrama es un mapa de autoconocimiento que describe nueve formas de pensar, sentir y actuar. <strong>No te encasilla</strong>: te muestra desde qué energía estás actuando <strong>hoy</strong>.',
      'Todos traemos al nacer una energía de base, la <strong>esencia</strong>, que no cambia. Las otras ocho forman nuestra <strong>personalidad</strong>, que se adapta y se va modificando con lo que vivimos. Por eso este test es una foto de tu momento actual.'
    ],
    referencia: {
      valor: a.media, max: a.max, min: a.min,
      texto: 'Es el punto medio entre tu puntaje más alto y el más bajo: (' + a.max + ' + ' + a.min + ') ÷ 2 = ' + fmtMedia(a.media) + '. No es el promedio de los nueve resultados: sirve para ver qué energías están más presentes hoy y cuáles más en pausa.'
    },
    grupos: { encima: a.encima, enRef: a.enRef, debajo: a.debajo },
    sintesis: [
      fraseEnergiaPrincipal(a),
      L.recurso + ' Esto no define tu esencia: es la energía desde la que más te estás moviendo en este momento.'
    ],
    pregunta: L.pregunta,
    enPausa: a.bajas.length
      ? 'Hoy aparecen más en pausa las energías ' + enLista(a.bajas.map(t => '<strong>' + delTipo(t) + '</strong>')) + '. No son carencias: son recursos que podés despertar.'
      : '',
    teaser: [
      'Cómo se combinan tus energías y qué respuestas automáticas conviene observar.',
      'Qué recursos podés integrar desde las energías que hoy están más en pausa.',
      'Cómo aparecen tus tres centros: sentimiento, pensamiento y acción.',
      'Tus alas, tus brazos de integración, tus ejes de equilibrio y cómo respondés ante los conflictos.',
      'Una práctica concreta para tu momento de vida.'
    ]
  };
}

// ── Versión para Vero: lectura completa + datos técnicos para la consulta ──
function construirLecturaCompleta(scores) {
  const a = analizarResultados(scores);
  const d = a.principales[0];
  const L = LECTURA_TIPO[d];
  const s = scores[d];
  const linea = t => 'T' + t + ' · ' + nombreTipo(t) + ' — <strong>' + a.tot(t) + '</strong>';
  const sobre = t => a.tot(t) >= a.media;
  const estado = t => sobre(t) ? 'por encima o en la referencia' : 'por debajo de la referencia';
  const secciones = [];

  // 1. Mapa (cálculo)
  const mapa = ['Referencia: (' + a.max + ' + ' + a.min + ') ÷ 2 = <strong>' + fmtMedia(a.media) + '</strong>. Es el punto medio entre los extremos, no el promedio.'];
  mapa.push('<strong>Por encima:</strong> ' + (a.encima.length ? a.encima.map(linea).join(' · ') : 'ninguna'));
  if (a.enRef.length) mapa.push('<strong>En la referencia:</strong> ' + a.enRef.map(linea).join(' · '));
  if (a.debajo.length) mapa.push('<strong>Por debajo:</strong> ' + a.debajo.map(linea).join(' · '));
  mapa.push('Tener más energías por debajo no indica por sí mismo desequilibrio, e integrar recursos no significa que todos los números queden iguales.');
  secciones.push({ titulo: 'Mapa y referencia', parrafos: mapa });

  // 2. Síntesis de hoy (hipótesis)
  const facetas = [['Recurso', L.recurso]];
  if (a.segunda) facetas.push(['Lo que suma ' + delTipo(a.segunda).replace(/^del /, 'el '), LECTURA_TIPO[a.segunda].recurso]);
  a.principales.slice(1).forEach(t => facetas.push(['Recurso ' + delTipo(t), LECTURA_TIPO[t].recurso]));
  facetas.push(['Para observar', 'La respuesta automática de ' + L.automatismo + '.']);
  facetas.push(['Por ejemplo', L.ejemplo]);

  const dif = s.luz - s.sombra;
  let luzSombra = 'En el ' + nombreTipo(d) + ': <strong>' + s.luz + '</strong> respuestas de luz y <strong>' + s.sombra + '</strong> de sombra (10 posibles en cada una). ';
  if (Math.abs(dif) < DIF_LUZ_SOMBRA) luzSombra += 'Aparecen cercanas: las dos caras están presentes.';
  else if (dif > 0)                   luzSombra += 'Predominan las respuestas de luz: los recursos de esta energía están disponibles.';
  else                                luzSombra += 'Predominan las respuestas de sombra: conviene observar las formas automáticas de responder.';
  luzSombra += ' La luz muestra recursos disponibles; la sombra, formas automáticas de responder, como ' + L.sombra + '.';

  secciones.push({
    titulo: 'Síntesis de hoy',
    parrafos: [fraseEnergiaPrincipal(a)],
    facetas: facetas,
    pregunta: L.pregunta,
    parrafos2: [luzSombra],
    cita: 'Aquello que es tu don puede ser también tu trampa.',
    citaTexto: L.donTrampa
  });

  // 3. Recursos para integrar (hipótesis)
  if (a.bajas.length) {
    secciones.push({
      titulo: 'Recursos para integrar',
      intro: 'Las energías más bajas no son carencias ni prueban un miedo: orientan preguntas sobre recursos hoy menos disponibles y posibles miedos circunstanciales.',
      items: a.bajas.map(t => '<strong>T' + t + ' · ' + nombreTipo(t) + ' (' + a.tot(t) + ')</strong>: ' + LECTURA_TIPO[t].recursoBajo),
      cierre: ['Pueden ayudar a sostener ' + L.verbo + ' desde un lugar con más equilibrio.']
    });
  }

  // 4. Centros (cálculo + lectura cotidiana)
  const c = a.centros;
  const cen = c.map(x => x.nombre + ' (' + x.tipos.join('·') + '): <strong>' + x.suma + '</strong> de 60');
  let lecturaCentros;
  if (c[0].suma === c[2].suma)      lecturaCentros = 'Los tres centros aparecen parejos.';
  else if (c[0].suma === c[1].suma) lecturaCentros = 'Las respuestas se apoyan por igual en ' + c[0].nombre.toLowerCase() + ' y ' + c[1].nombre.toLowerCase() + '; ' + c[2].nombre.toLowerCase() + ' (' + c[2].foco + ') aparece más en pausa.';
  else                              lecturaCentros = 'Hoy las respuestas se apoyan sobre todo en el centro de ' + c[0].nombre.toLowerCase() + ' (' + c[0].foco + '). ' +
                                      (c[1].suma === c[2].suma ? 'Los otros dos aparecen parejos.' : 'El de ' + c[2].nombre.toLowerCase() + ' (' + c[2].foco + ') es el que aparece más en pausa.');
  secciones.push({ titulo: 'Centros', intro: 'Cada centro reúne 3 energías × 20 afirmaciones = 60 posibles, por eso se comparan en bruto.', items: cen, cierre: [lecturaCentros] });

  // 5. Práctica y pregunta
  secciones.push({ titulo: 'Práctica y pregunta', parrafos: ['<strong>Práctica:</strong> ' + L.practica, '<strong>Pregunta:</strong> <em>' + L.preguntaFinal + '</em>'] });

  // 6. Datos técnicos para la lectura personalizada (relativos a la referencia)
  const tipo = TIPOS[d];
  const tec = [];
  tec.push('<strong>Alas de T' + d + ':</strong> T' + tipo.ala_desarrolla + ' (' + a.tot(tipo.ala_desarrolla) + ', ' + estado(tipo.ala_desarrolla) + ') y T' + tipo.ala_cuesta + ' (' + a.tot(tipo.ala_cuesta) + ', ' + estado(tipo.ala_cuesta) + ').');
  tec.push('<strong>Brazos:</strong> integración → T' + tipo.integracion + ' (' + a.tot(tipo.integracion) + ', ' + estado(tipo.integracion) + '); desintegración → T' + tipo.desintegracion + ' (' + a.tot(tipo.desintegracion) + ', ' + estado(tipo.desintegracion) + ').');
  const ejes = EJES.map(e => {
    const [t1, t2] = e.tipos, dd = Math.abs(a.tot(t1) - a.tot(t2));
    return e.nombre + ' (T' + t1 + ' ' + a.tot(t1) + ' · T' + t2 + ' ' + a.tot(t2) + '): ' + (dd <= 2 ? '<strong>se forma</strong>' : 'no se forma') + ' (diferencia ' + dd + ')';
  });
  tec.push('<strong>Ejes de equilibrio</strong> (se forman con diferencia de hasta 2):<br>' + ejes.join('<br>'));
  const tr = REACCION_TRIADA[tipo.triada];
  tec.push('<strong>Ante los conflictos</strong> (tríada de T' + d + '): ' + tr.accion + '. Herida: ' + tr.herida + '. Clave: ' + tr.clave + '.');
  secciones.push({ titulo: 'Para la lectura personalizada', intro: 'Datos calculados según la referencia. No se compartieron con la persona.', parrafos: tec });

  return { titulo: 'Lectura completa', secciones: secciones };
}

// ── Render en página ──

// Lista ordenada de mayor a menor con barras, separada por la referencia
function renderMapaBarras(containerId, scores, sint) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const ref = sint.referencia.valor;
  const fila = t => {
    const v = scores[t].total, alto = v >= ref;
    return '<div class="sx-fila" title="T' + t + ' · ' + TIPOS[t].nombre + ': ' + v + ' de 20">' +
      '<div class="sx-fila-n">' + nombreTipo(t) + ' <span>T' + t + '</span></div>' +
      '<div class="sx-track"><i class="' + (alto ? 'sx-alto' : 'sx-bajo') + '" style="width:' + (v / 20 * 100) + '%"></i><b style="left:' + (ref / 20 * 100) + '%"></b></div>' +
      '<div class="sx-fila-v">' + v + '</div></div>';
  };
  const g = sint.grupos;
  let html = '<p class="sx-grupo">Más presentes hoy</p>' + g.encima.map(fila).join('');
  if (g.enRef.length)  html += '<p class="sx-grupo">En tu referencia</p>' + g.enRef.map(fila).join('');
  if (g.debajo.length) html += '<p class="sx-grupo">Más en pausa</p>' + g.debajo.map(fila).join('');
  el.innerHTML = html;
}

function renderSintesis(scores, sint) {
  const set = (id, html) => { const e = document.getElementById(id); if (e) e.innerHTML = html; };
  set('sx-que-es', sint.queEs.map(p => '<p>' + p + '</p>').join(''));
  set('sx-ref-num', fmtMedia(sint.referencia.valor));
  set('sx-ref-txt', '<b>Tu referencia.</b> ' + sint.referencia.texto);
  renderMapaBarras('sx-barras', scores, sint);
  set('sx-sintesis', sint.sintesis.map(p => '<p>' + p + '</p>').join(''));
  set('sx-pregunta', sint.pregunta);
  set('sx-pausa', sint.enPausa);
  set('sx-teaser', sint.teaser.map(t => '<li>' + t + '</li>').join(''));
}

function renderLecturaCompleta(containerId, lec) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const ps = arr => (arr || []).map(p => '<p>' + p + '</p>').join('');
  el.innerHTML = '<h2 class="devolucion-titulo">' + lec.titulo + '</h2>' +
    lec.secciones.map(sec =>
      '<div class="devolucion-seccion">' +
        '<p class="devolucion-subtitulo">' + sec.titulo + '</p>' +
        (sec.intro ? '<p>' + sec.intro + '</p>' : '') +
        ps(sec.parrafos) +
        (sec.facetas ? '<dl class="lc-facetas">' + sec.facetas.map(f => '<dt>' + f[0] + '</dt><dd>' + f[1] + '</dd>').join('') + '</dl>' : '') +
        (sec.pregunta ? '<p class="lc-pregunta">' + sec.pregunta + '</p>' : '') +
        ps(sec.parrafos2) +
        (sec.cita ? '<p class="lc-cita">' + sec.cita + '</p><p>' + sec.citaTexto + '</p>' : '') +
        (sec.items ? '<ul>' + sec.items.map(i => '<li>' + i + '</li>').join('') + '</ul>' : '') +
        ps(sec.cierre) +
      '</div>'
    ).join('');
}
