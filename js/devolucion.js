// ──────────────────────────────────────────────
// DEVOLUCIÓN ESCRITA — enfoque BioEneagrama (Vero Gil)
// Se envía solo por mail:
//   · construirSintesis(scores)        → la persona: síntesis clara de su momento actual
//   · construirLecturaCompleta(scores) → Vero: la misma síntesis + ampliación teórica
//                                        (también en el panel lectura.html)
// Fuente: "Base Eneagrama para consultantes" y "Lectura de Eneagrama" (Vero Gil).
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

// Textos para la síntesis: conductas en lugar de etiquetas, escritos como posibilidad
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

// Centros de energía y su miedo constitutivo (Vero Gil, "Lectura de Eneagrama")
const CENTROS_INTELIGENCIA = [
  { clave: 'accion',      nombre: 'Acción',      largo: 'centro de la ACCIÓN (instintivo o visceral)', tipos: [8, 9, 1], miedo: 'ser débil, no poder',  foco: 'el cuerpo, los límites y el hacer' },
  { clave: 'sentimiento', nombre: 'Sentimiento', largo: 'centro del SENTIMIENTO (corazón)',           tipos: [2, 3, 4], miedo: 'ser rechazado',         foco: 'los vínculos, la imagen y lo que pasa con los demás' },
  { clave: 'pensamiento', nombre: 'Pensamiento', largo: 'centro del PENSAMIENTO (mente)',             tipos: [5, 6, 7], miedo: 'la realidad',           foco: 'la mente, la planificación y la búsqueda de seguridad' }
];

// Tríadas hornevianas: cómo se reacciona ante los conflictos
const REACCION_TRIADA = {
  acercan:   { accion: "acercarse a los otros",      herida: "el rechazo, la carencia de afecto, el miedo a que no te quieran",
               clave: "dar un paso hacia atrás: desapegarse de los otros, dejar de cargarse situaciones y atender la propia persona" },
  enfrentan: { accion: "enfrentar y desafiar",       herida: "la agresión, el miedo a ser débil o a ser agredido",
               clave: "dar un paso hacia el interior: soltar la armadura construida para protegerse y aceptar que no se puede dominar todo" },
  aislan:    { accion: "tomar distancia y aislarse", herida: "la soledad, el miedo al abandono",
               clave: "dar un paso hacia adelante: mostrar acercamiento, apertura y compromiso; el entorno responde positivamente" }
};

// Diferencia mínima entre luz y sombra para hablar de predominio
const DIF_LUZ_SOMBRA = 3;

const nombreTipo = t => TIPOS[t].nombre.replace(/^El /, '');
const delTipo = t => 'del ' + nombreTipo(t);
const tTipo = t => 'T' + t + ' · ' + nombreTipo(t);
const enLista = arr => arr.length > 1 ? arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1] : (arr[0] || '');
const mayus = s => s.charAt(0).toUpperCase() + s.slice(1);

// Cálculos verificables: media, grupos, energía más marcada, más bajas, centros y tríadas
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
  const principales = tipos.filter(t => tot(t) === max).sort(desc);
  // La segunda se lee junto a la primera solo si también está por encima de la media
  const segunda = principales.length === 1 && encima[1] !== undefined ? encima[1] : null;
  const bajas = debajo.slice().reverse().slice(0, 3); // las más bajas, de menor a mayor

  const suma = arr => arr.reduce((a, t) => a + tot(t), 0);
  const centros = CENTROS_INTELIGENCIA.map(c => ({ ...c, suma: suma(c.tipos) })).sort((a, b) => b.suma - a.suma);
  const triadas = Object.keys(TRIADAS).map(k => ({ ...TRIADAS[k], id: k, suma: suma(TRIADAS[k].tipos) })).sort((a, b) => b.suma - a.suma);

  return { tot, max, min, media, encima, enRef, debajo, principales, segunda, bajas, centros, triadas, sobre: t => tot(t) >= media };
}

// ── Versión para la persona: síntesis clara de su momento actual ──
function construirSintesis(scores) {
  const a = analizarResultados(scores);
  const d = a.principales[0];
  const L = LECTURA_TIPO[d];

  let marcada;
  if (a.principales.length > 1) {
    marcada = 'Hoy aparecen con la misma fuerza las energías ' + enLista(a.principales.map(t => '<strong>' + delTipo(t) + '</strong>')) +
      ' (' + a.max + ' cada una). Son las energías desde las que estás actuando hoy.';
  } else {
    marcada = 'Tu energía más marcada es la <strong>' + delTipo(d) + '</strong> (' + a.tot(d) + '): es la energía desde la que estás actuando hoy' +
      (a.segunda ? ', acompañada por la <strong>' + delTipo(a.segunda) + '</strong> (' + a.tot(a.segunda) + ')' : '') + '.';
  }

  return {
    nombreTipo: nombreTipo(d),
    intro: [
      'El Eneagrama es un mapa de autoconocimiento. <strong>No te encasilla</strong>: te muestra desde qué energías estás actuando hoy, en este momento de tu vida.',
      'Todos tenemos las nueve energías, y todas tienen <strong>luces y sombras</strong>. El Eneagrama busca la <strong>armonía y el equilibrio</strong> entre ellas.'
    ],
    media: {
      valor: a.media, max: a.max, min: a.min,
      texto: 'La <strong>MEDIA</strong> es tu <strong>valor de referencia</strong>: tu puntaje más alto más tu puntaje más bajo, dividido 2. En tu caso: (' + a.max + ' + ' + a.min + ') ÷ 2 = <strong>' + fmtMedia(a.media) + '</strong>.',
      uso: 'Las energías que quedan <strong>por encima</strong> de tu media son las más activas hoy; las que quedan <strong>por debajo</strong> son las que hoy están más en pausa.'
    },
    leyendaSimbolo: 'Cada punto del símbolo muestra tu puntaje: en fucsia, por encima de la media; en violeta, por debajo. Las líneas interiores unen las energías que se influyen entre sí.',
    grupos: { encima: a.encima, enRef: a.enRef, debajo: a.debajo },
    marcada: [
      marcada,
      'Esto <strong>no necesariamente es tu esencia</strong> (la energía con la que nacemos, que no cambia): muestra cómo te estás moviendo en este momento, y puede cambiar.',
      'En su luz, ' + L.recurso.charAt(0).toLowerCase() + L.recurso.slice(1) + ' En su sombra, puede aparecer la tendencia a ' + L.sombra + '. Las dos caras son parte de lo que todos tenemos.'
    ],
    bajas: {
      intro: 'Tus energías más bajas son las que hoy te conviene trabajar. El camino es ir acercándolas a tu media para integrarlas, no que todos los números queden iguales.',
      items: a.bajas.map(t => '<strong>' + nombreTipo(t) + ' (' + a.tot(t) + ')</strong>: ' + LECTURA_TIPO[t].recursoBajo)
    },
    autoobservacion: 'La clave es la <strong>AUTOOBSERVACIÓN</strong>: darte cuenta, en el momento, de cuándo reaccionás en automático. Ese registro es lo que te permite "hackear" tus automatismos y elegir cómo responder, para vivir de manera más consciente.',
    practica: L.practica,
    preguntaPractica: L.preguntaFinal
  };
}

// ── Ampliación para Vero: interpretación teórica para la lectura profunda ──
function construirLecturaCompleta(scores) {
  const a = analizarResultados(scores);
  const d = a.principales[0];
  const tipo = TIPOS[d], E = ENERGIAS[d], L = LECTURA_TIPO[d], s = scores[d];
  const pts = t => tTipo(t) + ' <strong>' + a.tot(t) + '</strong>';
  const ls = t => ' (luz ' + scores[t].luz + ' / sombra ' + scores[t].sombra + ')';
  const estado = t => a.sobre(t) ? 'sobre la media' : 'bajo la media';
  const secciones = [];

  // 1. Más altos y más bajos
  const grupos = ['<strong>Sobre la media</strong> (' + fmtMedia(a.media) + '):<br>' + a.encima.map(t => pts(t) + ls(t)).join('<br>')];
  if (a.enRef.length) grupos.push('<strong>En la media:</strong><br>' + a.enRef.map(t => pts(t) + ls(t)).join('<br>'));
  if (a.debajo.length) grupos.push('<strong>Bajo la media:</strong><br>' + a.debajo.map(t => pts(t) + ls(t)).join('<br>'));
  grupos.push(a.encima.length + a.enRef.length >= a.debajo.length
    ? 'Hay más tipologías por arriba de la media: es favorable, hay recursos activos en los que apoyarse.'
    : 'Hay más tipologías por debajo de la media: no indica por sí mismo desequilibrio, pero muestra varios recursos para despertar.');
  secciones.push({ titulo: 'Más altos y más bajos', parrafos: grupos });

  // 2. Las energías más marcadas
  const marc = [];
  marc.push(a.principales.length > 1
    ? 'Energías más marcadas, empatadas: ' + enLista(a.principales.map(pts)) + '.'
    : 'Energía más marcada: <strong>' + tTipo(d) + '</strong> (' + a.tot(d) + '), identificada con ' + E.identidad + '. No necesariamente es la esencia: es la energía desde la que se está actuando hoy.');
  marc.push('Motivación: ' + tipo.motivacion.toLowerCase() + '. Miedo constitutivo de la energía: ' + tipo.miedo.toLowerCase() + '. Transformación: ' + tipo.transformacion.toLowerCase() + '.');
  marc.push('En la luz es ' + E.luz + '; en la sombra, ' + E.sombra + '.');
  const dif = s.luz - s.sombra;
  marc.push('Luz ' + s.luz + ' / sombra ' + s.sombra + ' (10 posibles en cada una): ' +
    (Math.abs(dif) < DIF_LUZ_SOMBRA ? 'presencia cercana de ambas caras.' : dif > 0 ? 'predomina la luz.' : 'predomina la sombra: conviene trabajar las formas automáticas de responder.'));
  if (a.segunda) marc.push('La acompaña <strong>' + tTipo(a.segunda) + '</strong> (' + a.tot(a.segunda) + '): una forma de estar que combina ' + L.verbo + ' con ' + LECTURA_TIPO[a.segunda].verbo + '. No confundir con un ala.');
  secciones.push({
    titulo: 'Las energías más marcadas',
    parrafos: marc,
    facetas: [['Para observar', 'La respuesta automática de ' + L.automatismo + '.'], ['Por ejemplo', L.ejemplo]],
    pregunta: L.pregunta,
    cita: 'Aquello que es tu don puede ser también tu trampa.',
    citaTexto: L.donTrampa
  });

  // 3. Centros de energía y miedos constitutivos
  const c = a.centros;
  const cen = c.map(x => '<strong>' + x.nombre + '</strong> (' + x.tipos.join('·') + '): ' + x.suma + ' de 60 · miedo constitutivo: ' + x.miedo);
  let lecC = c[0].suma === c[2].suma ? 'Los tres centros aparecen parejos.'
    : 'Se mueve principalmente desde el ' + c[0].largo + ' (' + c[0].foco + '), cuyo miedo constitutivo es ' + c[0].miedo + '. Darse cuenta de cuándo ese miedo domina es un indicador para volver al observador interno.' +
      (c[1].suma === c[2].suma ? '' : ' El centro que pide más atención es el ' + c[2].largo + '.');
  const cDom = CENTROS_INTELIGENCIA.find(x => x.tipos.includes(d));
  lecC += ' La energía más marcada pertenece al centro de ' + cDom.nombre.toLowerCase() + '.';
  secciones.push({ titulo: 'Centros de energía', intro: 'Cada centro reúne 3 energías × 20 afirmaciones = 60 posibles: se comparan en bruto.', items: cen, cierre: [lecC] });

  // 4. Tríadas hornevianas
  const tr = a.triadas;
  const trItems = tr.map(x => '<strong>' + x.nombre + '</strong> (' + x.tipos.join('·') + '): ' + x.suma + ' de 60');
  const trDom = REACCION_TRIADA[tipo.triada];
  const trCierre = ['Ante los conflictos, la energía más marcada tiende a <strong>' + trDom.accion + '</strong>. Herida primaria: ' + trDom.herida + '. Clave evolutiva: ' + trDom.clave + '.'];
  if (tr[0].id !== tipo.triada && tr[0].suma > tr[1].suma) {
    trCierre.push('La tríada con más puntaje es la ' + tr[0].nombre.toLowerCase() + ' (' + REACCION_TRIADA[tr[0].id].accion + '): explorar si esa reacción aparece con más fuerza que la de su energía principal.');
  }
  secciones.push({ titulo: 'Tríadas hornevianas', items: trItems, cierre: trCierre });

  // 5. Alas y brazos
  const alaD = tipo.ala_desarrolla, alaC = tipo.ala_cuesta;
  let alas = 'Alas de ' + tTipo(d) + ': ' + pts(alaD) + ' (' + estado(alaD) + ') y ' + pts(alaC) + ' (' + estado(alaC) + '). ';
  if (a.sobre(alaD) && a.sobre(alaC))        alas += 'Las dos sobre la media: energías activas que la equilibran.';
  else if (!a.sobre(alaD) && !a.sobre(alaC)) alas += 'Las dos bajo la media: puede costar «levantar vuelo»; trabajar aspectos de esas energías ayuda a equilibrarse.';
  else alas += 'Una activa y otra bajo la media: ahí hay una energía para conocer y desarrollar.';
  const int = tipo.integracion, des = tipo.desintegracion;
  let brazos = 'Brazos: integración → ' + pts(int) + ' (' + estado(int) + '); desintegración → ' + pts(des) + ' (' + estado(des) + '). ';
  if (a.sobre(int) && a.sobre(des))        brazos += 'Los dos sobre la media: está tomando el tesoro, va bien en su camino de integración.';
  else if (!a.sobre(int) && !a.sobre(des)) brazos += 'Los dos bajo la media, «brazos caídos»: momento de activar el camino de crecimiento.';
  else if (a.sobre(int))                   brazos += 'Integración activa y el otro brazo bajo la media: cuidado con quedarse en la forma y no ir al fondo.';
  else                                     brazos += 'Integración bajo la media: observar cuándo actúa desde la sombra para volver más rápido a su centro.';
  secciones.push({ titulo: 'Alas y brazos', parrafos: [alas, brazos] });

  // 6. Dilemas
  const dil = DILEMAS.map(x => {
    const [t1, t2] = x.tipos;
    const mas = a.tot(t1) >= a.tot(t2) ? t1 : t2, menos = mas === t1 ? t2 : t1;
    return '<strong>' + x.nombre + '</strong> (T' + t1 + ' vs T' + t2 + '): ' +
      (a.tot(t1) === a.tot(t2) ? 'polos parejos (' + a.tot(t1) + ').' : 'polo más activado T' + mas + ' ' + nombreTipo(mas) + ' (' + a.tot(mas) + ', ' + estado(mas) + '); menos activado T' + menos + ' ' + nombreTipo(menos) + ' (' + a.tot(menos) + ', ' + estado(menos) + ').');
  });
  const ejes = EJES.map(e => {
    const [t1, t2] = e.tipos, dd = Math.abs(a.tot(t1) - a.tot(t2));
    return e.nombre + ' (T' + t1 + ' ' + a.tot(t1) + ' · T' + t2 + ' ' + a.tot(t2) + '): ' + (dd <= 2 ? '<strong>se forma</strong>' : 'no se forma') + ' (diferencia ' + dd + ')';
  });
  const ningunEje = EJES.every(e => Math.abs(a.tot(e.tipos[0]) - a.tot(e.tipos[1])) > 2);
  secciones.push({ titulo: 'Dilemas y ejes de equilibrio', items: dil.concat(ejes), cierre: ningunEje ? ['Sin ningún eje formado: momento de gran transformación en la vida de la persona.'] : [] });

  // 7. Miedos circunstanciales (energías bajo la media, de la más baja a la más alta)
  const bajoMedia = a.debajo.slice().reverse();
  if (bajoMedia.length) {
    secciones.push({
      titulo: 'Miedos circunstanciales',
      intro: 'Las tipologías menos marcadas hablan de lo que se teme en este momento de la vida. No son defectos: cambian cuando se pone conciencia en acciones, pensamientos y sentimientos.',
      items: bajoMedia.map(t => '<strong>' + tTipo(t) + ' (' + a.tot(t) + ')</strong> — ' + ENERGIAS[t].baja + ' <em>Sugerencia:</em> ' + ENERGIAS[t].sugerencia)
    });
  }

  // 8. Práctica
  const foco = a.bajas[0];
  const prac = ['<strong>Desde la energía más marcada:</strong> ' + L.practica + ' <em>' + L.preguntaFinal + '</em>'];
  if (foco) prac.push('<strong>Para integrar la energía ' + delTipo(foco) + ':</strong> ' + mayus(ENERGIAS[foco].practica) + ' <em>' + ENERGIAS[foco].pregunta + '</em>');
  secciones.push({ titulo: 'Prácticas posibles', parrafos: prac });

  return { titulo: 'Ampliación para la lectura profunda', secciones: secciones };
}

// Panel de Vero (lectura.html): muestra la ampliación
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
        (sec.cita ? '<p class="lc-cita">' + sec.cita + '</p><p>' + sec.citaTexto + '</p>' : '') +
        (sec.items ? '<ul>' + sec.items.map(i => '<li>' + i + '</li>').join('') + '</ul>' : '') +
        ps(sec.cierre) +
      '</div>'
    ).join('');
}
