const WA_NUMBER = "5491149169532";
const PIN_LECTURA = "2408";
const FORMSPREE_ID = "xnjwgnle";
const EMAILJS_SERVICE_ID  = "service_kecuou6";
const EMAILJS_TEMPLATE_ID = "9ogiq8d";
const EMAILJS_PUBLIC_KEY  = "Tf-t9XcIQTRoaXsYy";
const FRASE_FINAL = "El Eneagrama no te define. Es el mapa que te ayuda a visibilizar aspectos de tu personalidad para conocer la energía que te arrastra. Propicia la autoobservación y te permite integrar aspectos que te llevan a tu evolución consciente.";

const TIPOS = {
  1: { nombre: "El Organizador", miedo: "No ser perfecto", motivacion: "Ser bueno, íntegro, correcto", centro: "Visceral — instintivo", transformacion: "Del perfeccionismo a la alegría", ala_desarrolla: 2, ala_cuesta: 9, integracion: 7, desintegracion: 4, triada: "enfrentan",
       sintesis: "El Organizador tiene una brújula interna muy potente — sabe exactamente qué está bien y qué no. Eso le da estructura y confianza, pero también puede convertirse en una exigencia que no para nunca. El trabajo es aprender a soltar el control, disfrutar sin culpa y tratarse con la misma amabilidad que le exige al mundo.",
       resena: "Energía orientada a la corrección y la integridad. Tiene una brújula interna muy clara de lo que está bien — y puede volverse muy exigente consigo mismo y con los demás cuando algo no cumple ese estándar." },
  2: { nombre: "El Servidor",    miedo: "No ser querido, ser rechazado", motivacion: "Ser amado y necesario", centro: "Sentimiento — emocional", transformacion: "Del servicio condicionado al altruismo", ala_desarrolla: 1, ala_cuesta: 3, integracion: 4, desintegracion: 8, triada: "acercan",
       sintesis: "El Servidor tiene una capacidad enorme de conectar — siente lo que les pasa a los demás y se mueve naturalmente a ayudar. La trampa es dar tanto para ser querido que termina perdiéndose a sí mismo. El trabajo es descubrir que puede recibir, pedir y cuidarse — y seguir siendo valioso sin tener que ganárselo.",
       resena: "Energía orientada al vínculo y al cuidado. Necesita sentirse querido y necesario — y puede perder de vista sus propias necesidades mientras atiende las de todos los demás." },
  3: { nombre: "El Realizador",  miedo: "Fracasar, no ser valioso", motivacion: "Ser admirado y exitoso", centro: "Sentimiento — emocional", transformacion: "De la imagen a la autenticidad", ala_desarrolla: 2, ala_cuesta: 4, integracion: 6, desintegracion: 9, triada: "enfrentan",
       sintesis: "El Realizador sabe cómo llegar a los objetivos — tiene energía, foco y una imagen que genera confianza. La trampa es confundir lo que logra con lo que es. El trabajo es encontrar la identidad real más allá de los resultados y aprender a estar presente sin tener que demostrar nada.",
       resena: "Energía orientada al logro y la imagen. Tiene una gran capacidad para alcanzar metas y proyectar confianza — y puede confundir lo que logra con lo que verdaderamente es." },
  4: { nombre: "El Creativo",    miedo: "Ser común, igual a todos", motivacion: "Expresarse con profundidad y belleza", centro: "Sentimiento — emocional", transformacion: "Del mundo interior a la acción", ala_desarrolla: 5, ala_cuesta: 3, integracion: 1, desintegracion: 2, triada: "aislan",
       sintesis: "El Creativo siente la vida con una intensidad que pocos entienden — su mundo interior es profundo, original y sensible. La trampa es quedarse ahí y perder contacto con la acción concreta. El trabajo es tomar todo lo que siente y llevarlo al mundo real, sin esperar a que las condiciones sean perfectas.",
       resena: "Energía orientada a la profundidad y la expresión. Tiene una sensibilidad muy afinada para lo bello y lo significativo — y puede quedarse atrapado en la intensidad de su mundo interior." },
  5: { nombre: "El Observador",  miedo: "Ser ignorante, no entender", motivacion: "Saber, ser competente", centro: "Mental — pensamiento", transformacion: "De la sabiduría acumulada a la acción", ala_desarrolla: 4, ala_cuesta: 6, integracion: 8, desintegracion: 7, triada: "aislan",
       sintesis: "El Observador tiene una mente que analiza, conecta y comprende como pocas. Su fortaleza es la claridad — cuando habla, tiene algo concreto para decir. La trampa es procesar tanto que el mundo pasa sin que se meta. El trabajo es animarse a participar, a equivocarse y a dejarse conocer.",
       resena: "Energía orientada al conocimiento y la autonomía. Analiza y comprende antes de actuar — y puede volverse tan reservado que el mundo pase sin que se involucre en él." },
  6: { nombre: "El Colaborador", miedo: "No estar seguro, que algo malo pase", motivacion: "Apoyo, seguridad y estructura", centro: "Mental — pensamiento", transformacion: "De la lealtad a la paz interior", ala_desarrolla: 5, ala_cuesta: 7, integracion: 9, desintegracion: 3, triada: "acercan",
       sintesis: "El Colaborador es de los que sostienen: leal, responsable y muy atento a lo que puede fallar. Esa vigilancia le dio seguridad, pero también mucho gasto de energía. El trabajo es empezar a confiar en sí mismo — no solo en los demás — y actuar desde la convicción en lugar del miedo.",
       resena: "Energía orientada a la seguridad y la lealtad. Es confiable y responsable, con una antena muy sensible para detectar amenazas — y puede paralizarse ante la duda o el miedo." },
  7: { nombre: "El Entusiasta",  miedo: "El dolor y el sufrimiento", motivacion: "Ser feliz, disfrutar, vivir experiencias", centro: "Mental — pensamiento", transformacion: "De la alegría dispersa a la sabiduría", ala_desarrolla: 8, ala_cuesta: 6, integracion: 5, desintegracion: 1, triada: "acercan",
       sintesis: "El Entusiasta tiene una energía que contagia — ve posibilidades donde otros ven problemas y sabe cómo activar a la gente. La trampa es saltar siempre hacia lo nuevo para evitar lo que duele. El trabajo es profundizar: quedarse con algo, terminarlo y descubrir lo que aparece cuando no hay escapatoria.",
       resena: "Energía orientada a la experiencia y la alegría. Tiene una vitalidad genuina y una capacidad real de ver posibilidades donde otros ven problemas — y puede evitar el dolor saltando siempre hacia lo siguiente." },
  8: { nombre: "El Luchador",    miedo: "Ser herido o dominado", motivacion: "Protegerse y decidir su camino", centro: "Visceral — instintivo", transformacion: "De la justicia propia al altruismo", ala_desarrolla: 7, ala_cuesta: 9, integracion: 2, desintegracion: 5, triada: "enfrentan",
       sintesis: "El Luchador tiene presencia y no le teme a lo difícil — toma decisiones, protege a los que quiere y va para adelante sin dudar. La trampa es que esa fortaleza puede alejar la cercanía real. El trabajo es dejar entrar la vulnerabilidad — no como debilidad, sino como la puerta hacia vínculos más verdaderos.",
       resena: "Energía orientada al poder y la protección. Tiene presencia natural y valentía para enfrentar lo difícil — y puede volverse excesivamente intenso o controlador cuando siente que pierde terreno." },
  9: { nombre: "El Pacificador", miedo: "El caos y el conflicto", motivacion: "Paz y armonía", centro: "Visceral — instintivo", transformacion: "De la paz evitativa a la fe en sí mismo", ala_desarrolla: 1, ala_cuesta: 8, integracion: 3, desintegracion: 6, triada: "aislan",
       sintesis: "El Pacificador tiene una calma que le hace bien a todos — ve todos los lados, no juzga y sostiene la armonía con naturalidad. La trampa es borrarse a sí mismo para que nada se altere. El trabajo es encontrar la propia voz, decir lo que quiere y animarse a ocupar el espacio que le corresponde.",
       resena: "Energía orientada a la armonía y la calma. Tiene una capacidad genuina para ver todos los lados y sostener el equilibrio — y puede olvidarse de sus propias necesidades para evitar el conflicto." }
};

const AFIRMACIONES = {
  1: {
    luz: [
      "Actúo de acuerdo con lo que considero correcto, aunque me cueste.",
      "Soy coherente: lo que pienso, digo y hago va en la misma dirección.",
      "Me resulta natural poner orden donde hay desorden.",
      "Presto atención a los detalles para que el resultado final quede impecable.",
      "Me comprometo con causas que defienden lo justo frente a lo injusto.",
      "Reconozco mis errores y trabajo para corregirlos.",
      "El contacto con la naturaleza me ayuda a descomprimir la tensión que acumulo.",
      "Hago las cosas como corresponde, sin tomar atajos.",
      "Siempre veo cómo algo podría hacerse mejor, y me gusta mejorarlo.",
      "Sostengo con disciplina hábitos y rutinas que me hacen bien."
    ],
    sombra: [
      "Un pequeño detalle que falla me arruina la satisfacción por todo lo que salió bien.",
      "Me critico con dureza cuando siento que pude haberlo hecho mejor.",
      "Siento culpa cuando descanso o me divierto antes de terminar mis obligaciones.",
      "Siento que tengo que ser una persona intachable para merecer el respeto de los demás.",
      "Veo las cosas en blanco o negro: algo está bien o está mal.",
      "Cuando algo está mal hecho, siento la necesidad urgente de corregirlo.",
      "Me irrita que los demás hagan las cosas con descuido o de cualquier manera.",
      "Acumulo enojo por dentro y se me nota en la tensión, la rigidez o el tono cortante.",
      "Estoy convencido de tener la razón y me cuesta aceptar otra forma de ver las cosas.",
      "Marco los errores de los demás, aunque sean detalles menores."
    ]
  },
  2: {
    luz: [
      "La gente acude a mí cuando necesita consuelo o un consejo.",
      "Percibo lo que necesita otra persona antes de que me lo diga.",
      "Disfruto de la cercanía y del contacto con la gente que quiero.",
      "Doy mi tiempo con generosidad a quien lo necesita.",
      "Escucho con atención y presencia cuando alguien me cuenta lo que le pasa.",
      "Recuerdo los detalles importantes de la vida de las personas que quiero.",
      "Expreso mi afecto con facilidad, con palabras, abrazos y gestos.",
      "Hago que las personas se sientan bienvenidas y valoradas a mi lado.",
      "Cuando quiero a alguien, me entrego por completo.",
      "Me hace feliz saber que contribuí al bienestar de alguien."
    ],
    sombra: [
      "Me cuesta pedir ayuda: prefiero ser quien da.",
      "Ayudo a las personas antes de que me lo pidan.",
      "Me importa mucho que me vean como una persona buena y generosa.",
      "Necesito sentirme importante en la vida de los demás.",
      "Me ocupo tanto de los demás que descuido mi salud y mi descanso.",
      "Me duele cuando alguien olvida todo lo que hice por esa persona.",
      "Siento que, si dejo de dar, van a dejar de quererme.",
      "Muestro más preocupación por los demás de la que en realidad siento.",
      "Siento rechazo cuando alguien pone un límite a mi ayuda.",
      "Me cuesta negarme cuando alguien me pide algo."
    ]
  },
  3: {
    luz: [
      "Me fijo metas ambiciosas y me motiva alcanzarlas.",
      "Me gusta tener objetivos claros y medir mis avances.",
      "Me adapto con rapidez a distintos entornos y personas.",
      "Transmito seguridad y confianza cuando me presento ante otros.",
      "Soy eficiente: encuentro el camino más rápido para lograr un resultado.",
      "Tomo decisiones con rapidez y seguridad.",
      "Tengo espíritu emprendedor: transformo ideas en proyectos concretos.",
      "Las dificultades me impulsan a esforzarme más.",
      "Sé motivar a un equipo para que alcance sus objetivos.",
      "Disfruto de ver los resultados concretos de mi trabajo."
    ],
    sombra: [
      "Siento que valgo por lo que logro.",
      "Ajusto mi imagen según lo que espera la persona que tengo enfrente.",
      "Me identifico tanto con mi trabajo que pierdo de vista quién soy.",
      "Me importa mucho que los demás me vean como alguien exitoso.",
      "Me comparo con los demás y necesito sentir que les gano.",
      "Siento las críticas a lo que hago como críticas a mi persona.",
      "Me propongo tantos objetivos a la vez que vivo con tensión.",
      "Para lograr el éxito, a veces flexibilizo mis propios principios.",
      "Dejo mis emociones de lado para seguir rindiendo.",
      "Me impaciento cuando siento que me hacen perder el tiempo."
    ]
  },
  4: {
    luz: [
      "El arte y la creatividad son mi manera de procesar lo que siento.",
      "Pongo un sello personal en todo lo que hago.",
      "Puedo poner en palabras mis estados emocionales con precisión.",
      "Busco que mis experiencias tengan profundidad y significado.",
      "Me muestro tal cual soy, con autenticidad.",
      "Acompaño el dolor de los demás sin asustarme de sus emociones.",
      "Me conmueve la belleza: un paisaje, una melodía, un objeto bien hecho.",
      "Capto matices emocionales que a la mayoría le pasan desapercibidos.",
      "Me animo a explorar mis emociones más profundas, incluso las difíciles.",
      "Me atraen los símbolos y el sentido profundo que hay detrás de las cosas."
    ],
    sombra: [
      "Siento que los demás tienen algo que a mí me falta.",
      "Siento que pocas personas me comprenden de verdad.",
      "Me aburre lo cotidiano: necesito que la vida tenga intensidad.",
      "Me dicen que exagero mis emociones.",
      "Paso de la euforia al desánimo con facilidad.",
      "Una pérdida o un final me afecta durante mucho tiempo.",
      "Me quedo en la nostalgia y vuelvo una y otra vez al pasado.",
      "Me encierro en mi mundo interior cuando me siento mal.",
      "Necesito sentirme una persona diferente y especial.",
      "Idealizo a las personas cuando están lejos y les encuentro defectos cuando están cerca."
    ]
  },
  5: {
    luz: [
      "Me apasiona investigar un tema hasta comprenderlo en profundidad.",
      "Analizo las situaciones con objetividad, separando los hechos de las emociones.",
      "Valoro mi independencia y la cuido.",
      "Me gusta ver las cosas en perspectiva antes de sacar conclusiones.",
      "Mantengo la calma y la cabeza fría en situaciones de crisis.",
      "Conecto ideas de distintos campos y encuentro la lógica que las une.",
      "Disfruto de la soledad: es mi espacio para pensar y crear.",
      "Cuando hablo, voy al punto y digo algo concreto.",
      "Vivo con sencillez y me alcanza con poco.",
      "Desarrollo ideas y teorías propias sobre cómo funcionan las cosas."
    ],
    sombra: [
      "Me quedo observando desde afuera en lugar de participar.",
      "Cuando me presionan, me alejo y me retiro.",
      "Siento que me falta saber más antes de animarme a actuar.",
      "Necesito mucho tiempo a solas para recuperar energía.",
      "Me desconecto de lo que siento y paso a analizarlo.",
      "Prefiero trabajar en soledad antes que en equipo.",
      "Me irritan las personas que opinan sin fundamentos.",
      "Mantengo separadas las distintas áreas de mi vida: trabajo, amistades, familia.",
      "Acumulo libros, datos o información «por si acaso».",
      "Las demandas emocionales de los demás me agotan."
    ]
  },
  6: {
    luz: [
      "Soy leal: en los momentos difíciles me quedo al lado de los míos.",
      "Anticipo los problemas y tengo preparado un plan B.",
      "Me siento parte de un grupo y trabajo para fortalecerlo.",
      "Sostengo mis compromisos a largo plazo, aun cuando se vuelven difíciles.",
      "Soy una persona práctica y realista.",
      "Detecto enseguida las contradicciones y las incoherencias.",
      "Me gusta que las reglas y los acuerdos estén claros desde el principio.",
      "Actúo con prudencia ante lo desconocido.",
      "Me animo a enfrentar mis miedos cuando se trata de defender lo que quiero.",
      "Antes de decidir, consulto la opinión de personas de confianza."
    ],
    sombra: [
      "Dudo mucho antes de tomar una decisión.",
      "Ante un proyecto nuevo, primero pienso en todo lo que podría salir mal.",
      "Bajo presión me pongo tenso y reacciono a la defensiva.",
      "Me cuesta confiar en las intenciones de los demás.",
      "Desconfío de mi propio criterio y busco que alguien me lo confirme.",
      "Pregunto varias veces para asegurarme de que todo está bien.",
      "Desconfío de la autoridad y, al mismo tiempo, busco su aprobación.",
      "Prefiero renunciar a mi independencia si eso me da seguridad.",
      "La ansiedad me acompaña gran parte del día.",
      "Divido el mundo en «los míos» y «los de afuera»."
    ]
  },
  7: {
    luz: [
      "Contagio entusiasmo a las personas que me rodean.",
      "Encuentro el lado positivo hasta en las situaciones difíciles.",
      "Soy el alma de las reuniones.",
      "Me encanta probar cosas nuevas: comidas, lugares, actividades.",
      "Recupero el ánimo rápidamente después de un tropiezo.",
      "Se me ocurren muchas ideas y alternativas en poco tiempo.",
      "Soy una persona espontánea y me adapto con alegría a los cambios de planes.",
      "Disfruto intensamente de los placeres de la vida.",
      "Aprendo rápido y me interesan muchos temas a la vez.",
      "Tengo buen sentido del humor y me río con facilidad."
    ],
    sombra: [
      "Evito pensar en lo que me produce dolor.",
      "Esquivo las conversaciones serias o incómodas.",
      "Me cuesta asumir compromisos a largo plazo.",
      "Lleno mi agenda de planes para evitar quedarme con un vacío.",
      "Me cuesta ponerme límites con los gustos: comida, salidas, compras.",
      "Me aburro con facilidad cuando algo se vuelve rutinario.",
      "Me pongo impaciente cuando tengo que esperar.",
      "Algunas personas me consideran superficial.",
      "Encuentro buenas razones para justificar lo que quiero hacer.",
      "Empiezo muchos proyectos y abandono la mayoría cuando dejan de ser novedad."
    ]
  },
  8: {
    luz: [
      "Mantengo la firmeza en situaciones de presión.",
      "Defiendo a los más débiles cuando alguien abusa de ellos.",
      "Protejo a las personas que quiero con todo lo que tengo.",
      "Detecto rápidamente quién tiene el poder en un grupo.",
      "Asumo el liderazgo con naturalidad.",
      "Pongo límites claros y los hago respetar.",
      "Me hago cargo de los problemas y los resuelvo.",
      "Digo lo que pienso de frente, sin vueltas.",
      "Sigo adelante con mis decisiones aunque otros se opongan.",
      "Tengo mucha energía y vitalidad para luchar por lo que quiero."
    ],
    sombra: [
      "Mi forma de reaccionar intimida a otras personas.",
      "Necesito tener el control de las situaciones.",
      "Cuando siento que me acorralan, reacciono con fuerza.",
      "Me ocupé tanto de ser fuerte para los demás que dejé de lado mis propios miedos.",
      "Muestro más dureza de la que siento por dentro.",
      "Siento que, si bajo la guardia, se van a aprovechar de mí.",
      "Me rebelo ante las reglas que otros me imponen.",
      "Cuando alguien me traiciona, me cuesta perdonar.",
      "Llevo mi cuerpo al límite sin medir el cansancio.",
      "Prefiero actuar antes que detenerme a analizar lo que siento."
    ]
  },
  9: {
    luz: [
      "Transmito calma y tranquilidad a mi entorno.",
      "Busco la armonía en mis vínculos.",
      "Medio con imparcialidad en los conflictos porque comprendo los distintos puntos de vista.",
      "Acepto a las personas tal como son.",
      "Soy una persona estable y constante.",
      "Me llevo bien con casi todo el mundo.",
      "Tengo una mirada amplia que integra lo que otros ven por separado.",
      "Tengo paciencia para respetar los tiempos de cada proceso.",
      "Disfruto de los placeres simples y cotidianos.",
      "Cuando me comprometo con una causa, lo hago desde un lugar genuino."
    ],
    sombra: [
      "Me desconecto con distracciones (pantallas, comida, sueño) cuando algo me incomoda.",
      "Me cuesta saber qué quiero; me resulta más fácil acompañar lo que eligen otros.",
      "Sigo el camino que menos esfuerzo me demanda.",
      "Postergo para mañana lo que puedo hacer hoy.",
      "Mi lentitud impacienta a los demás.",
      "Digo que estoy de acuerdo aunque por dentro piense distinto.",
      "Me guardo el enojo para evitar un conflicto.",
      "Me disperso y me cuesta sostener la atención en lo importante.",
      "Le quito importancia a los problemas para que todos se tranquilicen.",
      "Cuando me presionan, me empaco y resisto en silencio."
    ]
  }
};

const ORDEN_LUZ = [
  [4,8,1,6,2,9,5,3,7],[7,2,5,9,3,8,1,6,4],[1,6,9,3,7,4,2,8,5],
  [5,3,7,8,4,2,6,9,1],[9,1,4,7,6,5,8,2,3],[2,7,8,4,5,1,3,6,9],
  [6,4,3,1,8,7,9,5,2],[3,9,6,5,1,8,4,7,2],[8,6,2,7,9,3,5,4,1],[4,1,7,2,6,5,8,9,3]
];

const ORDEN_SOMBRA = [
  [6,3,7,1,9,4,2,8,5],[2,9,4,6,8,3,7,5,1],[8,5,2,4,1,7,9,3,6],
  [3,7,6,5,2,9,4,1,8],[1,4,8,9,5,6,3,7,2],[7,1,5,3,4,8,6,2,9],
  [5,8,9,2,7,6,1,3,4],[9,3,1,7,6,4,2,8,5],[2,6,4,8,3,1,7,5,9],[8,2,3,6,1,5,9,4,7]
];

const EJES = [
  { tipos: [1, 8], nombre: "Eje del HACER" },
  { tipos: [2, 7], nombre: "Eje del COMUNICAR" },
  { tipos: [3, 6], nombre: "Eje del TENER" },
  { tipos: [4, 5], nombre: "Eje del SER" }
];

const DILEMAS = [
  { tipos: [1, 5], nombre: "Forma vs. Fondo" },
  { tipos: [2, 6], nombre: "Ser para vs. Ser con" },
  { tipos: [3, 7], nombre: "Exterioridad vs. Interioridad" },
  { tipos: [4, 8], nombre: "Vida vs. Muerte" }
];

const TRIADAS = {
  acercan: {
    nombre: "Tríada del Acercamiento",
    tipos: [2, 6, 7],
    herida: "rechazo",
    clave: "dar un paso hacia atrás"
  },
  enfrentan: {
    nombre: "Tríada del Enfrentamiento",
    tipos: [1, 3, 8],
    herida: "agresión",
    clave: "dar un paso hacia el interior"
  },
  aislan: {
    nombre: "Tríada del Aislamiento",
    tipos: [4, 5, 9],
    herida: "abandono",
    clave: "dar un paso hacia adelante"
  }
};

const NOMBRES_CORTOS = {
  1: "Organizador", 2: "Servidor", 3: "Realizador",
  4: "Creativo", 5: "Observador", 6: "Colaborador",
  7: "Entusiasta", 8: "Luchador", 9: "Pacificador"
};
