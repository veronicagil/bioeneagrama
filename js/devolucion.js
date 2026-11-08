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
    // La MEDIA va después de la energía más marcada, explicada como concepto (sin un número destacado que confunda)
    media: {
      valor: a.media, max: a.max, min: a.min,
      texto: 'Para leer tu mapa usamos la <strong>MEDIA</strong>, tu <strong>valor de referencia</strong>. Se calcula sumando tu puntaje más alto y tu puntaje más bajo, y dividiendo por 2. En tu caso: (' + a.max + ' + ' + a.min + ') ÷ 2 = ' + fmtMedia(a.media) + '.',
      uso: 'No indica cuánto vale una energía: sirve para ubicarlas. Las que quedan <strong>por encima</strong> de tu media son las más activas hoy; las que quedan <strong>por debajo</strong> son las que hoy están más en pausa.'
    },
    leyendaSimbolo: 'El punto con el halo es tu energía más marcada. En fucsia, las energías por encima de tu media; en violeta, las que están por debajo. Las líneas interiores unen las energías que se influyen entre sí.',
    grupos: { encima: a.encima, enRef: a.enRef, debajo: a.debajo },
    marcada: [
      marcada,
      'En el símbolo aparece destacada porque marca una <strong>tendencia hacia tu esencia</strong>, la energía con la que nacemos y que no cambia. Esa tendencia se confirma con el tiempo y en una lectura personalizada; por ahora muestra cómo te estás moviendo hoy.',
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

// ── Teoría para la ampliación de Vero (fuente: "Lectura de Eneagrama", Vero Gil) ──
const TEORIA_TIPO = {
  1: { ampliada: "busca mejorar para aportar mejor; le importan la esencia y la trascendencia. Es gran guía y orientador, con visión de conjunto y discernimiento práctico; logra bajar la presión y la tensión, y reírse de sí mismo",
       alterada: "necesita tener todo bajo control y se autoexige; hace monólogos en vez de diálogos, prejuzga y critica; la forma pasa a importar más que el fondo y puede volverse castigador",
       evitar: "la ira. Necesita relajarse y conectar con la alegría del fluir",
       alas: "desarrolla el ala 2; lo que más le cuesta es la paz del 9" },
  2: { ampliada: "es altruista y original (flecha al 4), con gran capacidad de escucha; puede reconocer su propio valor sin depender del reconocimiento externo",
       alterada: "se olvida de sí y se posterga; puede ponerse en víctima y manipular mediante la culpa, pasar de servicial a servil y de colaborador a controlador, y esperar que le compensen lo que dio. No sabe decir que no",
       evitar: "vivir para el otro y la soberbia. Aprender a poner límites y a considerar al otro como un igual",
       alas: "desarrolla el ala 1; lo que más le cuesta es la autoestima del 3" },
  3: { ampliada: "es gran motivador y despierta liderazgo; empieza a darle tiempo al amor, busca logros cualitativos y se vuelve más auténtico",
       alterada: "confunde el hacer con el ser; el fin justifica los medios y se miente a sí mismo; es competitivo, vanidoso y ansioso, y no puede ver gente quieta",
       evitar: "engañarse y engañar. Necesita lograr veracidad",
       alas: "desarrolla el ala 2; lo que más le cuesta es la autenticidad del 4" },
  4: { ampliada: "es creador e innovador, con profundidad emocional, intuición y sentido de la belleza; sueña con un mundo mejor",
       alterada: "la emocionalidad lo domina: muy bien o muy mal, entre la melancolía y la exaltación; vive observando lo que falta, le cuesta concretar y puede trasladar al cuerpo lo que no expresa",
       evitar: "la envidia y la comparación. Salir de su mundo interior para cumplir y concretar",
       alas: "desarrolla el ala 5; lo que más le cuesta es concretar como el 3" },
  5: { ampliada: "vive la vida y se compromete con ella; tiene capacidad de asombro, puede ser gran maestro y pasa a buscar el para qué",
       alterada: "pierde sensibilidad, se aísla, escapa a los sentimientos y racionaliza todo; no se mete, busca el por qué y puede caer en la soberbia intelectual",
       evitar: "la codicia intelectual. Pasar de la sabiduría a la acción",
       alas: "desarrolla el ala 4; lo que más le cuesta es compartir como el 6" },
  6: { ampliada: "es responsable, confiable, humilde y colaborador: acompaña, sostiene y cuida. Apuntala su autoestima con la espiritualidad y con espacios donde comprenderse",
       alterada: "se vuelve dependiente y sumiso a la autoridad, y se posterga; los miedos tiñen su vida (duda, indecisión, el qué dirán) y puede guardar resentimiento",
       evitar: "perderse en los miedos que le generan las cosas nuevas. ¡Animarse!",
       alas: "desarrolla el ala 5; lo que más le cuesta es disfrutar como el 7" },
  7: { ampliada: "aporta frescura y esperanza, y saca a los otros del dolor; cuando madura conecta con el dolor y desde ahí con la alegría, camino a la sabiduría",
       alterada: "aparecen sus dos sombras: la dispersión (hace de todo, superficialmente) y la ilusión (no ve la realidad, niega el dolor); escapa de los límites y de la rutina",
       evitar: "la gula de experiencias. Trabajar la templanza: mesura, realismo, constancia y compromiso",
       alas: "desarrolla el ala 8; lo que más le cuesta es la rutina del 6" },
  8: { ampliada: "defiende la justicia y levanta causas como líder; es capaz de dar la vida por el otro. Adentro esconde un niño que necesita afecto",
       alterada: "defiende cualquier causa, cae en el sincericidio que hiere, se vuelve extremista y posesivo, y puede inspirar miedo",
       evitar: "la lujuria, atravesar los límites. Aprender a disfrutar la sencillez",
       alas: "desarrolla el ala 7; lo que más le cuesta es la paciencia del 9" },
  9: { ampliada: "tiene percepción espiritual y visión amplia; cuando se compromete lo motiva la paz y en su evolución encuentra su eje",
       alterada: "aparecen la pasividad, la comodidad y la complacencia; detrás de un «está todo bien» se esconde un «no hagamos nada». Evita conflictos y, antes de expresar enojo, se enferma",
       evitar: "la pereza. Aprender a entrar en acción; se lo mueve motivándolo, no presionándolo",
       alas: "desarrolla el ala 1; lo que más le cuesta es la determinación del 8" }
};

const DILEMA_TEXTO = {
  '1-5': "Lo negativo es quedarse en la Forma; lo positivo, poner la Forma en función del Fondo. En esto va la felicidad de ambas tipologías.",
  '2-6': "Ser para los otros es anteponerlos a uno mismo (en el 2, actuar en forma paternalista; en el 6, con sumisión). Lo positivo es ser con el otro: decidir juntos, ser pares.",
  '3-7': "El problema es vivir para afuera: el 3 en el logro y el éxito, el 7 en la dispersión. Resuelto, consiste en ir al interior y, desde la profundidad, salir a mejorar la calidad vincular.",
  '4-8': "Lo negativo es optar por la destrucción (el 4 hacia la depresión y la angustia; el 8 destruyendo al otro y terminando por destruirse); lo positivo, la construcción y conectar con la vida."
};

// Tríadas hornevianas clásicas (Karen Horney, en la lectura de Riso-Hudson): cómo cada energía busca lo que necesita
const HORNEVIANAS = [
  { nombre: 'Asertivos',   tipos: [3, 7, 8], texto: 'buscan lo que necesitan exigiéndolo, con una energía expansiva que va hacia adelante y pone su yo en primer plano' },
  { nombre: 'Cumplidores', tipos: [1, 2, 6], texto: 'buscan lo que necesitan ganándoselo: cumplen con lo que se espera de ellos y se guían por el deber, lo correcto y lo útil' },
  { nombre: 'Retraídos',   tipos: [4, 5, 9], texto: 'buscan lo que necesitan replegándose en su mundo interior y tomando distancia' }
];

const CEREBRO = { accion: 'cerebro reptiliano · vísceras', sentimiento: 'cerebro límbico · corazón', pensamiento: 'neocórtex · mente' };

// ── Ampliación para Vero: interpretación teórica para la lectura profunda ──
function construirLecturaCompleta(scores) {
  const a = analizarResultados(scores);
  const d = a.principales[0];
  const tipo = TIPOS[d], E = ENERGIAS[d], L = LECTURA_TIPO[d], T = TEORIA_TIPO[d], s = scores[d];
  const pts = t => tTipo(t) + ' <strong>' + a.tot(t) + '</strong>';
  const ls = t => ' (luz ' + scores[t].luz + ' / sombra ' + scores[t].sombra + ')';
  const estado = t => a.tot(t) > a.media ? 'sobre la media' : a.tot(t) === a.media ? 'en la media' : 'bajo la media';
  const secciones = [];
  const c = a.centros;
  const cDom = c.find(x => x.tipos.includes(d));
  const trDom = REACCION_TRIADA[tipo.triada];

  // 0. Síntesis interpretativa
  let sint = 'Hoy se mueve sobre todo desde la energía <strong>' + delTipo(d) + '</strong> (' + a.tot(d) + '), del centro de ' + cDom.nombre.toLowerCase();
  if (a.segunda) sint += ', acompañada por la ' + delTipo(a.segunda) + ' (' + a.tot(a.segunda) + ')';
  sint += '. ';
  if (c[0].suma > c[2].suma) sint += 'El centro más activo es el de ' + c[0].nombre.toLowerCase() + ' y el más en pausa, el de ' + c[2].nombre.toLowerCase() + '. ';
  sint += 'Ante los conflictos, su energía principal tiende a ' + trDom.accion + '. ';
  if (a.bajas.length) sint += 'Las energías más bajas (' + enLista(a.bajas.map(t => nombreTipo(t) + ' ' + a.tot(t))) + ') orientan los miedos circunstanciales a explorar en la consulta.';
  secciones.push({
    titulo: 'Síntesis para la consultora',
    parrafos: [sint, 'Hipótesis de trabajo: observar la respuesta automática de ' + L.automatismo + (a.bajas[0] ? ', y cómo integrar la energía ' + delTipo(a.bajas[0]) + ' (' + LECTURA_TIPO[a.bajas[0]].recursoBajo.replace(/.$/, '') + ')' : '') + '.']
  });

  // 1. Más altos y más bajos
  const grupos = ['<strong>Media: ' + fmtMedia(a.media) + '</strong> = (' + a.max + ' + ' + a.min + ') ÷ 2. Es la referencia para observar a la persona y su modo de vincularse con el entorno.'];
  grupos.push('<strong>Sobre la media:</strong><br>' + a.encima.map(t => pts(t) + ls(t)).join('<br>'));
  if (a.enRef.length) grupos.push('<strong>En la media:</strong><br>' + a.enRef.map(t => pts(t) + ls(t)).join('<br>'));
  if (a.debajo.length) grupos.push('<strong>Bajo la media:</strong><br>' + a.debajo.map(t => pts(t) + ls(t)).join('<br>'));
  grupos.push(a.encima.length + a.enRef.length >= a.debajo.length
    ? 'Hay más tipologías por arriba de la media: es favorable, hay recursos activos en los que apoyarse.'
    : 'Hay más tipologías por debajo de la media (' + a.debajo.length + ' de 9): varios recursos para despertar. No indica por sí mismo desequilibrio; las más bajas marcan por dónde empezar a trabajar.');
  secciones.push({ titulo: 'Más altos y más bajos', parrafos: grupos });

  // 2. Las energías más marcadas
  const marc = [];
  marc.push(a.principales.length > 1
    ? 'Energías más marcadas, empatadas: ' + enLista(a.principales.map(pts)) + '.'
    : '<strong>' + tTipo(d) + '</strong> (' + a.tot(d) + '), identificada con ' + E.identidad + '. No necesariamente es la esencia: es la energía desde la que se está actuando hoy; la esencia se descubre con tiempo y una lectura más profunda.');
  marc.push('<strong>Motivación:</strong> ' + tipo.motivacion.toLowerCase() + '. <strong>Miedo base:</strong> ' + tipo.miedo.toLowerCase() + '. <strong>Transformación:</strong> ' + tipo.transformacion.toLowerCase() + '.');
  marc.push('<strong>En conciencia ampliada</strong> ' + T.ampliada + '.');
  marc.push('<strong>En conciencia alterada</strong> ' + T.alterada + '.');
  marc.push('<strong>Tiene que evitar</strong> ' + T.evitar + '.');
  const dif = s.luz - s.sombra;
  marc.push('<strong>Luz ' + s.luz + ' / sombra ' + s.sombra + '</strong> (10 posibles en cada una): ' +
    (Math.abs(dif) < DIF_LUZ_SOMBRA ? 'presencia cercana de ambas caras.' : dif > 0 ? 'predomina la luz: está viviendo esta energía más desde su versión ' + E.luz + '.' : 'predomina la sombra (' + E.sombra + '): invitación a poner conciencia para llevarla hacia la luz.'));
  if (a.segunda) {
    const T2 = TEORIA_TIPO[a.segunda];
    marc.push('La acompaña <strong>' + tTipo(a.segunda) + '</strong> (' + a.tot(a.segunda) + ls(a.segunda) + '), que en conciencia ampliada ' + T2.ampliada + '; en conciencia alterada ' + T2.alterada + '. Juntas combinan ' + L.verbo + ' con ' + LECTURA_TIPO[a.segunda].verbo + '. No confundir con un ala.');
  }
  secciones.push({
    titulo: 'Las energías más marcadas',
    parrafos: marc,
    facetas: [['Para observar', 'La respuesta automática de ' + L.automatismo + '.'], ['Por ejemplo', L.ejemplo]],
    pregunta: L.pregunta,
    cita: 'Aquello que es tu don puede ser también tu trampa.',
    citaTexto: L.donTrampa + ' «El exceso enferma» (E. Fromm).'
  });

  // 3. Centros operativos y miedos constitutivos
  const cen = c.map(x => '<strong>' + x.nombre + '</strong> (' + x.tipos.join('·') + ', ' + CEREBRO[x.clave] + '): ' + x.suma + ' de 60 · miedo constitutivo: <em>' + x.miedo + '</em>');
  const lecC = [];
  if (c[0].suma === c[2].suma) lecC.push('Los tres centros aparecen parejos.');
  else {
    lecC.push('Se mueve principalmente desde el ' + c[0].largo + ', cuyo miedo constitutivo es ' + c[0].miedo + '. Darse cuenta de cuándo ese miedo domina es un buen indicador para volver al observador interno.');
    if (c[1].suma !== c[2].suma) lecC.push('El centro más en pausa es el ' + c[2].largo + ' (' + c[2].foco + '): ahí hay recursos para integrar.');
  }
  lecC.push('La energía más marcada pertenece al centro de ' + cDom.nombre.toLowerCase() + ' (miedo constitutivo: ' + cDom.miedo + ')' +
    (cDom.clave === c[0].clave ? ', que coincide con el centro más activo.' : '; el centro más activo es otro: explorar esa diferencia.'));
  secciones.push({
    titulo: 'Centros operativos y miedos constitutivos',
    intro: 'Los miedos constitutivos acompañan a cada esencia a lo largo de toda la vida: hay uno de los tres cerebros que actúa más allá de la voluntad. Cada centro reúne 3 energías × 20 afirmaciones = 60 posibles, por eso se comparan en bruto.',
    items: cen, cierre: lecC
  });

  // 4. Tríadas según cómo reaccionan ante los conflictos
  const tr = a.triadas;
  const trCierre = ['Ante los conflictos, la energía más marcada tiende a <strong>' + trDom.accion + '</strong>. Herida primaria (experiencia primaria del nacimiento): ' + trDom.herida + '. <strong>Clave evolutiva:</strong> ' + trDom.clave + '.'];
  if (tr[0].id !== tipo.triada && tr[0].suma > tr[1].suma) {
    trCierre.push('La tríada con más puntaje es la ' + tr[0].nombre.toLowerCase() + ' (' + REACCION_TRIADA[tr[0].id].accion + '): explorar si esa reacción aparece hoy con más fuerza que la de su energía principal.');
  }
  secciones.push({
    titulo: 'Tríadas según cómo reaccionan ante los conflictos',
    items: tr.map(x => '<strong>' + x.nombre + '</strong> (' + x.tipos.join('·') + '): ' + x.suma + ' de 60 · herida: ' + x.herida),
    cierre: trCierre
  });

  // 5. Tríadas hornevianas (clásicas)
  const hv = HORNEVIANAS.map(h => ({ ...h, suma: h.tipos.reduce((acc, t) => acc + a.tot(t), 0) })).sort((x, y) => y.suma - x.suma);
  const hvDom = hv.find(h => h.tipos.includes(d));
  const hvCierre = ['La energía más marcada pertenece al grupo de los <strong>' + hvDom.nombre.toLowerCase() + '</strong>: ' + hvDom.texto + '.'];
  if (hv[0].suma > hv[1].suma && hv[0].nombre !== hvDom.nombre) hvCierre.push('El grupo con más puntaje es el de los ' + hv[0].nombre.toLowerCase() + ': ' + hv[0].texto + '.');
  secciones.push({
    titulo: 'Tríadas hornevianas',
    intro: 'Agrupan las energías según cómo buscan obtener lo que necesitan (teoría clásica de Karen Horney; no figura en tus documentos).',
    items: hv.map(h => '<strong>' + h.nombre + '</strong> (' + h.tipos.join('·') + '): ' + h.suma + ' de 60'),
    cierre: hvCierre
  });

  // 6. Alas
  const alaD = tipo.ala_desarrolla, alaC = tipo.ala_cuesta;
  let alas = 'El ' + d + ' ' + T.alas + '. En sus resultados: ' + pts(alaD) + ' (' + estado(alaD) + ') y ' + pts(alaC) + ' (' + estado(alaC) + '). ';
  if (a.sobre(alaD) && a.sobre(alaC))        alas += 'Las dos alas están encendidas: energías activas y conocidas que la equilibran.';
  else if (!a.sobre(alaD) && !a.sobre(alaC)) alas += 'Con las dos alas por debajo de la media le costará «levantar vuelo» en su camino de evolución: necesita enfocar y trabajar aspectos de esas tipologías para equilibrarse.';
  else {
    const on = a.sobre(alaD) ? alaD : alaC, off = on === alaD ? alaC : alaD;
    alas += 'El ala ' + on + ' está activa; el ala ' + off + ' está por debajo de la media y puede ser una energía desconocida para trabajar.';
  }
  secciones.push({ titulo: 'Alas', intro: 'Son las tipologías a ambos lados de la propia: representan las cualidades y atributos que equilibran. Es conveniente que estén por encima de la media.', parrafos: [alas] });

  // 7. Brazos
  const int = tipo.integracion, des = tipo.desintegracion;
  let brazos = 'Integración → ' + pts(int) + ' (' + estado(int) + '); desintegración → ' + pts(des) + ' (' + estado(des) + '). ';
  if (a.sobre(int) && a.sobre(des))        brazos += 'Los dos por encima de la media: está tomando el tesoro y va bien en su camino de integración.';
  else if (!a.sobre(int) && !a.sobre(des)) brazos += 'Los dos por debajo de la media, «brazos caídos»: no está tomando el tesoro ni yendo hacia el crecimiento. Momento de activar el camino de integración.';
  else if (a.sobre(int))                   brazos += 'Integración arriba y el otro brazo abajo: peligro de quedarse en la forma y no ir al fondo.';
  else                                     brazos += 'Integración por debajo de la media: conocer el camino de desintegración le permite saber cuándo actúa desde la sombra, mirarlo y volver cada vez más rápido.';
  secciones.push({ titulo: 'Brazos (integración y desintegración)', intro: 'Muestran cómo se fue constituyendo el ego olvidando el Yo esencial, y qué camino recorrer para encontrarlo.', parrafos: [brazos] });

  // 8. Dilemas
  const dil = DILEMAS.map(x => {
    const [t1, t2] = x.tipos;
    const mas = a.tot(t1) >= a.tot(t2) ? t1 : t2, menos = mas === t1 ? t2 : t1;
    const propio = x.tipos.includes(d) ? ' <em>(incluye su energía más marcada)</em>' : '';
    return '<strong>' + x.nombre + '</strong> (' + t1 + '–' + t2 + ')' + propio + ': ' +
      (a.tot(t1) === a.tot(t2) ? 'polos parejos (' + a.tot(t1) + ', ' + estado(t1) + ').' : 'más activado el ' + mas + ' (' + a.tot(mas) + ', ' + estado(mas) + '), menos el ' + menos + ' (' + a.tot(menos) + ', ' + estado(menos) + ').') +
      ' ' + DILEMA_TEXTO[t1 + '-' + t2];
  });
  secciones.push({ titulo: 'Dilemas', intro: 'Los dilemas acompañan y son parte de nuestra realidad: tienen un polo en luz y uno en sombra. Ir hacia el extremo de la sombra afecta a uno mismo y al entorno.', items: dil });

  // 9. Ejes de equilibrio
  const ejesForm = [];
  const ejes = EJES.map(e => {
    const [t1, t2] = e.tipos, dd = Math.abs(a.tot(t1) - a.tot(t2));
    if (dd <= 2) ejesForm.push(e);
    let txt = '<strong>' + e.nombre + '</strong> (' + t1 + ' ' + a.tot(t1) + ' · ' + t2 + ' ' + a.tot(t2) + '): ';
    if (dd > 2) return txt + 'no se forma (diferencia ' + dd + ').';
    const prom = (a.tot(t1) + a.tot(t2)) / 2;
    return txt + '<strong>se forma</strong> (diferencia ' + dd + '), ' +
      (prom < a.media ? 'por debajo de la media: es la llave para trabajar en este momento de su vida.' : prom > a.media ? 'por encima de la media: puede estar en luz o en sombra.' : 'en la media.');
  });
  const ejesCierre = [];
  if (!ejesForm.length) ejesCierre.push('Sin ningún eje formado: está atravesando una gran transformación, una metamorfosis; un gran cambio en muchos aspectos de su vida en este momento.');
  else ejesCierre.push('Un eje formado indica que hay algo estático, quieto, en esa área.' + (ejesForm.length === 1 ? ' Si hay un solo eje y está en la media, se considera bajo.' : ''));
  secciones.push({ titulo: 'Ejes de equilibrio', intro: 'Son los tensores del Eneagrama y aportan estabilidad: pares que suman 9. Se forma eje cuando las marcaciones son iguales o difieren hasta dos puntos.', items: ejes, cierre: ejesCierre });

  // 10. Miedos circunstanciales (de la más baja a la más alta bajo la media)
  const bajoMedia = a.debajo.slice().reverse();
  if (bajoMedia.length) {
    secciones.push({
      titulo: 'Miedos circunstanciales',
      intro: 'Surgen de las respuestas: lo menos marcado hace referencia a lo que se teme en este momento de la vida. Estos valores cambian cuando se pone conciencia en acciones, pensamientos y sentimientos y se deja de actuar en automático.',
      items: bajoMedia.map(t => '<strong>' + tTipo(t) + ' (' + a.tot(t) + ')</strong> — ' + ENERGIAS[t].baja + ' <em>Sugerencia:</em> ' + ENERGIAS[t].sugerencia)
    });
  }

  // 11. Prácticas
  const foco = a.bajas[0];
  const prac = ['<strong>Desde la energía más marcada:</strong> ' + L.practica + ' <em>' + L.preguntaFinal + '</em>'];
  if (foco) prac.push('<strong>Para integrar la energía ' + delTipo(foco) + ':</strong> ' + mayus(ENERGIAS[foco].practica) + ' <em>' + ENERGIAS[foco].pregunta + '</em>');
  prac.push('Y en cada situación: <strong>¿fluyo o empujo?</strong>');
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
