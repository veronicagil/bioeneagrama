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
  "<strong>Eneagrama significa nueve.</strong> Es un <strong>método de autoconocimiento y de transformación personal y vincular</strong> que conduce a la evolución del ser sano y ecológico. Es un <strong>mapa que nos ayuda a ubicarnos en el territorio</strong>: describe nueve miradas diferentes de ver la vida, nueve formas de pensar, sentir y actuar. Cada una es una manifestación <strong>parcial</strong> del ser <strong>total</strong> que somos.",
  "Cada tipología funciona como un <strong>«anteojo»</strong> con el que miramos la llamada realidad: nadie la percibe tal cual es. Conocernos en el Eneagrama nos permite liberarnos de las <strong>reacciones automáticas</strong> que nos arrastran hacia modos conocidos e ineficientes de relacionarnos, y elegir con plena conciencia cómo <strong>responder</strong>. Por eso <strong>el Eneagrama es un puente entre la psicología y la espiritualidad</strong>.",
  "La <strong>ESENCIA</strong> es la energía que traemos al nacer en su estado más puro: nuestra verdadera naturaleza, los pies desde donde nos paramos en la vida, <strong>la energía que nos arrastra</strong>. La esencia <strong>no cambia</strong>. Pero desde que nacemos necesitamos adaptarnos a la familia, al entorno y al modo en que nos educaron —en la lógica biológica, quien no se adapta no sobrevive— y así vamos construyendo una <strong>PERSONALIDAD ADAPTATIVA</strong>, que <strong>sí cambia y fluctúa</strong> según el contexto.",
  "Por eso este test es <strong>«una foto» sacada en este momento de tu vida</strong>: un espejo que muestra desde qué energías te estás moviendo <strong>HOY</strong>. Es una información <strong>variable</strong>, que puede cambiar según el momento o la situación que estés atravesando. Descubrir la propia esencia lleva tiempo y no puede hacerse en un test ni en una sola lectura: tu tipo dominante de hoy no necesariamente es tu esencia.",
  "Todas las tipologías tienen <strong>luz y sombra</strong> en partes iguales. No hay tipologías mejores que otras: en la luz nos iluminan y nos llevan hacia nuestra evolución; en la sombra muestran los aspectos que nos anclan. Conocerlas nos permite aceptarlas, integrarlas y trascenderlas, en lugar de negarlas.",
  "La clave de este camino es la <strong>AUTOOBSERVACIÓN</strong> constante: los hábitos de la personalidad solo pueden modificarse si los vemos en el momento en que ocurren. Observarnos con conciencia nos permite ir llevando cada energía hacia su luz y reconocernos como un <strong>ser completo</strong>, en movimiento evolutivo permanente.",
  "Para leer tus resultados, la referencia es tu <strong>MEDIA</strong>: tu puntaje más alto más tu puntaje más bajo, dividido 2. Es el parámetro para observarte y observar tu modo de vincularte con el entorno. Es favorable que haya más tipologías por arriba de la media; las que quedan por debajo muestran <strong>por dónde empezar a trabajar</strong>.",
  "<em>El Eneagrama honra la individualidad y la diversidad que somos.</em>"
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
  const tipo = TIPOS[dom];
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

  const alaD = tipo.ala_desarrolla, alaC = tipo.ala_cuesta;
  let alas = 'Las <strong>alas</strong> son las tipologías vecinas que equilibran a tu energía dominante: el ' + nom(alaD) + ' y el ' + nom(alaC) + '. ';
  if (sobre(alaD) && sobre(alaC))        alas += 'Las dos están por encima de tu media: son energías activas y conocidas que te equilibran.';
  else if (!sobre(alaD) && !sobre(alaC)) alas += 'Las dos están por debajo de tu media: puede costarte «levantar vuelo». Trabajar aspectos de esas energías te va a ayudar a equilibrarte.';
  else {
    const activa = sobre(alaD) ? alaD : alaC, dormida = sobre(alaD) ? alaC : alaD;
    alas += 'El ' + nom(activa) + ' está activo, mientras que el ' + nom(dormida) + ' está por debajo de tu media: ahí hay una energía para conocer y desarrollar.';
  }
  sintesis.push(alas);

  const tr = REACCION_TRIADA[tipo.triada];
  sintesis.push('Ante los conflictos, la energía del ' + nom(dom) + ' tiende a <strong>' + tr.accion + '</strong>. Esta reacción se vincula con una herida primaria: ' + tr.herida + '. La clave evolutiva es <strong>' + tr.clave + '</strong>.');

  const int = tipo.integracion, des = tipo.desintegracion;
  let brazos = 'Su camino de transformación va <strong>' + tipo.transformacion.toLowerCase() + '</strong>, a través de los <strong>brazos</strong> que la unen al ' + nom(int) + ' (integración) y al ' + nom(des) + '. ';
  if (sobre(int) && sobre(des))        brazos += 'Los dos están por encima de tu media: estás tomando el tesoro y vas bien en tu camino de integración.';
  else if (!sobre(int) && !sobre(des)) brazos += 'Los dos están por debajo de tu media, como «brazos caídos»: es momento de activar tu camino de crecimiento.';
  else if (sobre(int))                 brazos += 'El brazo de integración está activo, pero el otro está por debajo de tu media: cuidado con quedarte en la forma y no ir al fondo.';
  else                                 brazos += 'El brazo de integración está por debajo de tu media: observá cuándo actuás desde la sombra para volver cada vez más rápido a tu centro.';
  sintesis.push(brazos);

  // 2. Energías para despertar: los miedos circunstanciales de las más bajas
  const despertar = bajos.slice(0, 3).map(t =>
    '<strong>' + nom(t) + ' (' + tot(t) + ' puntos)</strong> — Es la energía de ' + ENERGIAS[t].cualidades + '. ' + ENERGIAS[t].baja + ' <em>Sugerencia:</em> ' + ENERGIAS[t].sugerencia
  );

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
      intro: 'Las tipologías menos marcadas hablan de lo que tememos en este momento de la vida: son <strong>miedos circunstanciales</strong>, no defectos. Estos valores cambian en cuanto ponemos conciencia en nuestras acciones, pensamientos y sentimientos, y dejamos de actuar en automático.',
      items: despertar
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
