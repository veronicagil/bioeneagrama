// ──────────────────────────────────────────────
// DEVOLUCIÓN ESCRITA
// Base teórica + síntesis interpretativa según la media.
// Fuente: "Base Eneagrama para consultantes" y "Lectura de Eneagrama" (Vero Gil).
// La usan test.html (persona), el mail (persona + Vero) y lectura.html (panel).
// ──────────────────────────────────────────────

// Cada energía: con qué se identifica, luz/sombra, miedo circunstancial cuando está baja y cómo despertarla
const ENERGIAS = {
  1: {
    identidad: "la perfección: organizar y ordenar",
    luz: "ordenada, honrada y precisa",
    sombra: "controladora, autoexigente y obsesiva",
    cualidades: "el orden, el criterio y la integridad",
    baja: "Puede aparecer el miedo a perder la libertad por sentir que las estructuras —laborales o de pareja— te asfixian.",
    sugerencia: "Construí un orden propio y flexible, al servicio de lo que es importante para vos, y elegí actuar en coherencia con un valor que quieras honrar.",
    practica: "hacer cada día una tarea con orden y prolijidad, y dejarte también un espacio libre, sin exigencias.",
    pregunta: "¿Qué es lo correcto para mí en esta situación, más allá de lo que esperan los demás?"
  },
  2: {
    identidad: "el servicio: servir y ayudar",
    luz: "altruista, cariñosa y dispuesta",
    sombra: "manipuladora afectiva, víctima y orgullosa",
    cualidades: "el cuidado, la empatía y la conexión con el otro",
    baja: "Puede haber miedo a abrirte afectivamente por temor a sufrir, sobre todo en la pareja o en el vínculo entre padres e hijos.",
    sugerencia: "Hacé un gesto de cuidado concreto —un mensaje, una escucha atenta, un abrazo— y practicá también pedir lo que necesitás.",
    practica: "hacer cada día un gesto concreto de cuidado hacia alguien, y otro hacia vos.",
    pregunta: "¿A quién puedo acercarme hoy con una atención genuina, sin esperar nada a cambio?"
  },
  3: {
    identidad: "el éxito: realizar y lograr",
    luz: "competente, efectiva y exitosa",
    sombra: "competitiva, exigente y vanidosa",
    cualidades: "la acción, el logro y la confianza en las propias capacidades",
    baja: "Puede haber miedo a fracasar —en lo material o en lo afectivo— y por eso algo importante para tu realización personal está quedando sin hacer.",
    sugerencia: "Definí una meta pequeña y alcanzable, dividila en pasos concretos y animate a mostrar lo que hacés y a reconocer lo que lográs.",
    practica: "fijarte una meta chica por semana y celebrar cuando la cumplas.",
    pregunta: "¿Qué quiero lograr y qué primer paso concreto puedo dar hoy?"
  },
  4: {
    identidad: "la armonía: crear y armonizar",
    luz: "original, auténtica y sensible",
    sombra: "dependiente, idealista y con necesidad de ser diferente",
    cualidades: "la sensibilidad, la creatividad y el contacto con el mundo emocional",
    baja: "Puede haber miedo a mirarte, a ver aspectos que cuestan por autoestima; pueden aparecer la autocrítica y la culpa, que es necesario limpiar.",
    sugerencia: "Regalate un espacio de expresión —escribir, dibujar, bailar, escuchar música—, nombrá cada día una emoción que hayas sentido y tratate con la misma compasión que tendrías con alguien que querés.",
    practica: "dedicar diez minutos diarios a escribir lo que sentís, sin juzgarlo.",
    pregunta: "¿Qué estoy sintiendo realmente y cómo puedo expresarlo de manera auténtica?"
  },
  5: {
    identidad: "el saber: observar e investigar",
    luz: "inteligente, sabia y objetiva",
    sombra: "soberbia, irónica y extremadamente racional",
    cualidades: "la observación, la reflexión y la búsqueda de comprensión",
    baja: "Puede haber algo de tu realidad, presente o pasada, que hoy no querés o no podés ver o aceptar.",
    sugerencia: "Reservá momentos de silencio para observar tu realidad con curiosidad y sin juicio; escribir lo que observás ayuda a ver con claridad aquello que cuesta aceptar.",
    practica: "regalarte cada día un rato de silencio para observar antes de reaccionar.",
    pregunta: "¿Qué hay en mi realidad que todavía no me animo a mirar?"
  },
  6: {
    identidad: "la responsabilidad: acompañar y sostener",
    luz: "leal, cumplidora y responsable",
    sombra: "sumisa, miedosa y desconfiada",
    cualidades: "la confianza, la lealtad y la responsabilidad compartida",
    baja: "Puede aparecer el miedo a perder la libertad porque te están pesando responsabilidades que elegiste.",
    sugerencia: "Revisá tus responsabilidades: cuáles elegís sostener y cuáles podés compartir o soltar. Apoyate en un vínculo de confianza y animate a pedir ayuda.",
    practica: "revisar cada semana tus compromisos y compartir o soltar al menos uno que hoy te pesa.",
    pregunta: "¿Qué responsabilidad estoy sosteniendo por miedo, y cuál elijo de verdad?"
  },
  7: {
    identidad: "la ilusión: disfrutar y alegrar",
    luz: "optimista, alegre y simpática",
    sombra: "ilusionista, dispersa y superficial",
    cualidades: "la alegría, el entusiasmo y la apertura a nuevas posibilidades",
    baja: "Puede haber miedo a disfrutar: no te das permiso porque, si lo hicieras, ¿quién sostiene todo? Quizás alguien te mostró que disfrutar es superficial.",
    sugerencia: "Incorporá algo placentero cada día, probá una experiencia nueva por semana y anotá antes de dormir tres cosas que agradecés.",
    practica: "hacer cada día algo que disfrutes solo por el placer de hacerlo.",
    pregunta: "¿Qué puedo disfrutar hoy, aunque sea algo pequeño?"
  },
  8: {
    identidad: "la justicia: luchar y liderar",
    luz: "fuerte, justa y protectora",
    sombra: "posesiva, intolerante y sin medida en lo que expresa",
    cualidades: "la fuerza, la determinación y la capacidad de poner límites",
    baja: "Puede haber miedo a tomar una decisión, porque decidir implica dejar cosas importantes, o porque cuesta decir «no» a algo o a alguien.",
    sugerencia: "Practicá decir que no cuando algo no te hace bien, expresá tu opinión con claridad y mové el cuerpo para conectar con tu fuerza.",
    practica: "decir un «no» claro cuando algo no te hace bien, y mover el cuerpo cada día.",
    pregunta: "¿Dónde necesito poner un límite o tomar una decisión con firmeza?"
  },
  9: {
    identidad: "la paz: serenar y conciliar",
    luz: "armónica, serena y equilibrada",
    sombra: "complaciente, perezosa y desmotivada",
    cualidades: "la calma, la aceptación y la capacidad de conciliar",
    baja: "Puede haber miedo a parar: si te detenés, ¿quién se hace cargo de todo? A veces el hacer constante tapa algo que no querés ver.",
    sugerencia: "Regalate pausas conscientes —respirar, caminar sin apuro, estar en la naturaleza— y antes de reaccionar, escuchá la mirada del otro.",
    practica: "hacer tres pausas conscientes por día para respirar y volver a tu centro.",
    pregunta: "¿Qué necesito para estar en paz conmigo hoy?"
  }
};

// Centros operativos (los tres cerebros) y su miedo constitutivo
const CENTROS_INTELIGENCIA = [
  { tipos: [8, 9, 1], nombre: "centro de la ACCIÓN (instintivo o visceral)", miedo: "ser débil, no poder" },
  { tipos: [2, 3, 4], nombre: "centro del SENTIMIENTO (corazón)",            miedo: "ser rechazado" },
  { tipos: [5, 6, 7], nombre: "centro del PENSAMIENTO (mente)",              miedo: "la realidad" }
];

// Tríadas según cómo se reacciona ante los conflictos
const REACCION_TRIADA = {
  acercan:   { accion: "acercarse a los otros",       herida: "el rechazo, la carencia de afecto, el miedo a que no te quieran",
               clave: "dar un paso hacia atrás: desapegarte de los otros, dejar de cargarte situaciones y atender tu propia persona" },
  enfrentan: { accion: "enfrentar y desafiar",        herida: "la agresión, el miedo a ser débil o a que te agredan",
               clave: "dar un paso hacia tu interior: soltar la armadura que construiste para protegerte y aceptar que no podés dominar todo" },
  aislan:    { accion: "tomar distancia y aislarse",  herida: "la soledad, el miedo a que te abandonen",
               clave: "dar un paso hacia adelante: mostrar tu acercamiento, tu apertura y tu compromiso; el entorno te va a responder positivamente" }
};

const DEVOLUCION_BASE = [
  "<strong>El Eneagrama no nos encasilla</strong>: nos muestra la energía desde la que estamos actuando <strong>HOY</strong>. Es un mapa de autoconocimiento que describe nueve formas de pensar, sentir y actuar.",
  "Todos traemos al nacer una energía de base llamada <strong>ESENCIA</strong>, y las <strong>8 tipologías restantes forman nuestra personalidad</strong>. La esencia <strong>no cambia</strong>: es la energía que nos arrastra. La personalidad es <strong>adaptativa</strong> y se va modificando a lo largo de la vida, según nuestras vivencias, circunstancias personales y crisis vitales.",
  "Por eso este test es <strong>una foto de tu momento actual</strong>: una información variable, que puede cambiar según lo que estés atravesando. Tu tipología más alta de hoy no necesariamente es tu esencia. Cada energía tiene <strong>luz y sombra</strong>, y ninguna es mejor que otra.",
  "La clave es la <strong>AUTOOBSERVACIÓN</strong>: darnos cuenta de cuándo actuamos en automático nos permite elegir con conciencia cómo responder."
];

function construirDevolucion(scores) {
  const tipos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const tot = t => scores[t].total;
  const nom = t => 'T' + t + ' · ' + TIPOS[t].nombre;
  const max = Math.max(...tipos.map(tot));
  const min = Math.min(...tipos.map(tot));
  const media = (max + min) / 2;
  const sobre = t => tot(t) >= media;
  const altos = tipos.filter(sobre).sort((a, b) => tot(b) - tot(a));
  const bajos = tipos.filter(t => !sobre(t)).sort((a, b) => tot(a) - tot(b));
  const dom = altos[0];
  const s = scores[dom];
  const e = ENERGIAS[dom];

  const enLista = arr => arr.length > 1 ? arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1] : arr.join('');

  // 1. Síntesis de hoy
  const sintesis = [];
  sintesis.push('Tu media es <strong>' + fmtMedia(media) + '</strong>. Hoy la energía que más se activa en vos es la del <strong>' + nom(dom) + '</strong> (' + tot(dom) + ' puntos), que se identifica con <strong>' + e.identidad + '</strong>. Esto no significa que sea tu esencia: es la energía desde la que más te estás moviendo en este momento de tu vida.');

  let luzSombra = 'En la luz, esta energía es ' + e.luz + '; en la sombra, ' + e.sombra + '. ';
  if (s.luz > s.sombra)      luzSombra += 'Hoy la estás viviendo más desde su <strong>luz</strong> (' + s.luz + ' respuestas de luz y ' + s.sombra + ' de sombra).';
  else if (s.sombra > s.luz) luzSombra += 'Hoy aparece con más fuerza su <strong>sombra</strong> (' + s.sombra + ' respuestas de sombra y ' + s.luz + ' de luz): es una invitación a poner conciencia para llevarla hacia la luz.';
  else                       luzSombra += 'Hoy su luz y su sombra aparecen en equilibrio (' + s.luz + ' respuestas de cada una).';
  sintesis.push(luzSombra + ' Recordá: <em>aquello que es tu don puede ser también tu trampa.</em>');

  const otrosAltos = altos.slice(1);
  let balance = 'Tenés <strong>' + altos.length + '</strong> tipologías sobre la media y <strong>' + bajos.length + '</strong> por debajo. ';
  if (otrosAltos.length) balance += 'Además de tu energía dominante, están activas ' + enLista(otrosAltos.map(nom)) + '. ';
  balance += altos.length >= bajos.length
    ? 'Es favorable que haya más energías por arriba de la media: tenés recursos activos en los que apoyarte.'
    : 'Hoy hay más energías por debajo de la media: es una invitación a despertar recursos que ya están en vos.';
  sintesis.push(balance);

  const centros = CENTROS_INTELIGENCIA.map(c => ({ c: c, suma: c.tipos.reduce((acc, t) => acc + tot(t), 0) }))
    .sort((a, b) => b.suma - a.suma);
  if (centros[0].suma > centros[2].suma) {
    sintesis.push('Mirando los tres centros operativos, hoy te movés principalmente desde el <strong>' + centros[0].c.nombre + '</strong>, cuyo miedo de base es a ' + centros[0].c.miedo + '. Darte cuenta de cuándo ese miedo te domina es un buen indicador para volver a tu observador interno. El centro que hoy pide más atención es el <strong>' + centros[2].c.nombre + '</strong>.');
  }

  // Alas, brazos, tríada y ejes quedan para la lectura personalizada
  sintesis.push('Tu mapa tiene mucho más para mostrarte: tus <strong>alas</strong>, tus <strong>brazos</strong> de integración, tus <strong>ejes de equilibrio</strong> y tu modo de reaccionar ante los conflictos. Esa lectura se hace de manera <strong>personalizada</strong>, mirando tu historia y tu momento de vida.');

  // 2. Energías para despertar: reflexión general sobre los miedos circunstanciales
  const despertar = bajos.length
    ? ['Hoy las energías menos activas en vos son: ' + enLista(bajos.slice(0, 3).map(t => '<strong>' + nom(t) + '</strong>')) + '. Preguntate qué te cuesta poner en juego de cada una y qué situación de tu vida actual puede estar frenándola.']
    : [];

  // 3. Para llevarte de aquí en adelante
  const foco = bajos[0] || dom;
  const llevarte = [
    'Elegí una sola práctica para las próximas semanas: <strong>' + ENERGIAS[foco].practica + '</strong>',
    'Y una pregunta de autoobservación para hacerte cada día: <strong>«' + ENERGIAS[foco].pregunta + '»</strong>',
    'Volvé a hacer el test dentro de unos meses: comparar las fotos te va a mostrar cómo se van moviendo tus energías. Y preguntate, en cada situación: <strong>¿fluyo o empujo?</strong>'
  ];

  const secciones = [{ titulo: 'Tu síntesis de hoy', parrafos: sintesis }];
  if (despertar.length) {
    secciones.push({
      titulo: 'Energías para despertar',
      intro: 'Las tipologías que quedan por debajo de la media hablan de lo que tememos en este momento de la vida: son <strong>miedos circunstanciales</strong>, no defectos. Aparecen por lo que estamos atravesando y cambian en cuanto ponemos conciencia en lo que hacemos, pensamos y sentimos.',
      parrafos: despertar
    });
  }
  secciones.push({ titulo: 'Para llevarte de aquí en adelante', parrafos: llevarte });

  return { base: DEVOLUCION_BASE, secciones: secciones };
}

function renderDevolucionBase(containerId, dev) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '<p class="res-filosofia-titulo">El Eneagrama: qué es y qué refleja este test</p>' +
    dev.base.map(p => '<p>' + p + '</p>').join('');
}

function renderDevolucionLectura(containerId, dev) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '<p class="devolucion-titulo">Tu devolución</p>' +
    dev.secciones.map(sec =>
      '<div class="devolucion-seccion">' +
        '<p class="devolucion-subtitulo">' + sec.titulo + '</p>' +
        (sec.intro ? '<p>' + sec.intro + '</p>' : '') +
        (sec.parrafos || []).map(p => '<p>' + p + '</p>').join('') +
        (sec.items ? '<ul>' + sec.items.map(i => '<li>' + i + '</li>').join('') + '</ul>' : '') +
      '</div>'
    ).join('');
}
