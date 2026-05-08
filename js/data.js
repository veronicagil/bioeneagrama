const WA_NUMBER = "5491149169532";
const PIN_LECTURA = "2408";
const FRASE_FINAL = "El Eneagrama no te define. Es el mapa que te ayuda a visibilizar aspectos de tu personalidad para conocer la energía que te arrastra. Propicia la autoobservación y te permite integrar aspectos que te llevan a tu evolución consciente.";

const TIPOS = {
  1: { nombre: "El Organizador", miedo: "No ser perfecto", motivacion: "Ser bueno, íntegro, correcto", centro: "Visceral — instintivo", transformacion: "Del perfeccionismo a la alegría", ala_desarrolla: 2, ala_cuesta: 9, integracion: 7, desintegracion: 4 },
  2: { nombre: "El Servidor",    miedo: "No ser querido, ser rechazado", motivacion: "Ser amado y necesario", centro: "Sentimiento — emocional", transformacion: "Del servicio condicionado al altruismo", ala_desarrolla: 1, ala_cuesta: 3, integracion: 4, desintegracion: 8 },
  3: { nombre: "El Realizador",  miedo: "Fracasar, no ser valioso", motivacion: "Ser admirado y exitoso", centro: "Sentimiento — emocional", transformacion: "De la imagen a la autenticidad", ala_desarrolla: 2, ala_cuesta: 4, integracion: 6, desintegracion: 9 },
  4: { nombre: "El Creativo",    miedo: "Ser común, igual a todos", motivacion: "Expresarse con profundidad y belleza", centro: "Sentimiento — emocional", transformacion: "Del mundo interior a la acción", ala_desarrolla: 5, ala_cuesta: 3, integracion: 1, desintegracion: 2 },
  5: { nombre: "El Observador",  miedo: "Ser ignorante, no entender", motivacion: "Saber, ser competente", centro: "Mental — pensamiento", transformacion: "De la sabiduría acumulada a la acción", ala_desarrolla: 4, ala_cuesta: 6, integracion: 8, desintegracion: 7 },
  6: { nombre: "El Colaborador", miedo: "No estar seguro, que algo malo pase", motivacion: "Apoyo, seguridad y estructura", centro: "Mental — pensamiento", transformacion: "De la lealtad a la paz interior", ala_desarrolla: 5, ala_cuesta: 7, integracion: 9, desintegracion: 3 },
  7: { nombre: "El Entusiasta",  miedo: "El dolor y el sufrimiento", motivacion: "Ser feliz, disfrutar, vivir experiencias", centro: "Mental — pensamiento", transformacion: "De la alegría dispersa a la sabiduría", ala_desarrolla: 8, ala_cuesta: 6, integracion: 5, desintegracion: 1 },
  8: { nombre: "El Luchador",    miedo: "Ser herido o dominado", motivacion: "Protegerse y decidir su camino", centro: "Visceral — instintivo", transformacion: "De la justicia propia al altruismo", ala_desarrolla: 7, ala_cuesta: 9, integracion: 2, desintegracion: 5 },
  9: { nombre: "El Pacificador", miedo: "El caos y el conflicto", motivacion: "Paz y armonía", centro: "Visceral — instintivo", transformacion: "De la paz evitativa a la fe en sí mismo", ala_desarrolla: 1, ala_cuesta: 8, integracion: 3, desintegracion: 6 }
};

const AFIRMACIONES = {
  1: {
    luz: [
      "La gente confía en mí porque soy justo y hago lo que corresponde.",
      "Estoy orgulloso de mantener mis puntos de vista — soy congruente con lo que creo.",
      "Soy una persona metódica y organizada — eso le da estructura a todo lo que hago.",
      "Cuido los detalles, el orden y la precisión porque me importa que las cosas salgan bien.",
      "Me es fácil identificarme con causas que defienden lo correcto contra lo injusto.",
      "Me esfuerzo mucho por corregir mis errores y mejorar.",
      "El contacto con la naturaleza es de las pocas cosas que me ayuda a descomprimirme.",
      "Siento la necesidad de ser responsable con la mayor parte de mi tiempo.",
      "Para mí es muy importante actuar correctamente.",
      "Tengo inteligencia práctica — sé planificar, organizar y llegar al resultado."
    ],
    sombra: [
      "El último detalle que falla me arruina la sensación de que algo salió bien.",
      "Me enojo conmigo mismo cuando siento que pude haber hecho algo mejor.",
      "Me cuesta relajarme y disfrutar sin sentir que debería estar haciendo algo.",
      "Siento que tengo que ser perfecto para que me quieran o me valoren.",
      "Tiendo a ver todo en términos de correcto o incorrecto — blanco o negro.",
      "Cuando algo no está bien no puedo ignorarlo — realmente me molesta.",
      "Me frustra que ni yo ni los demás seamos como creo que deberíamos ser.",
      "Mi sentido del deber me lleva a sacrificar el descanso y el tiempo libre.",
      "Hago monólogos más que diálogos — tengo razón y me cuesta escuchar otra perspectiva.",
      "He sido demasiado exigente e inflexible con los demás."
    ]
  },
  2: {
    luz: [
      "La gente suele venir a pedirme que los conforte o aconseje — y me sale natural.",
      "Me gusta cuidar a los demás — es algo que me sale solo.",
      "Necesito sentirme cerca de las personas para estar bien.",
      "Cuando tengo tiempo libre, termino ayudando a alguien.",
      "Tengo una gran capacidad de escuchar al otro y estar presente en lo que le pasa.",
      "Me gusta salvar a alguien cuando veo que está en apuros.",
      "Me importan mucho los problemas emocionales de las personas que quiero.",
      "La gente se acerca a mí porque soy extrovertido y me comprometo con ellos.",
      "Cuando quiero a alguien me entrego de una manera total — mi afecto no es a medias.",
      "Mi actitud de servicio me lleva a poner toda mi energía en los demás."
    ],
    sombra: [
      "A veces siento que me usan o se aprovechan de lo que doy.",
      "Siento que debo ayudar a las personas aunque no me lo pidan.",
      "Me esfuerzo para que no me vean como egoísta.",
      "Necesito ser importante en la vida de otras personas.",
      "El deseo de ayudar me ha afectado mi propia salud y bienestar.",
      "Muchas veces me siento sobrecargado por lo que los demás esperan de mí.",
      "Siento que si dejo de dar, los demás podrían no quererme.",
      "Me muestro más preocupado por el otro de lo que realmente estoy.",
      "No me gusta que me pongan límites — necesito estar disponible para los demás.",
      "Soy adicto a los otros porque no sé decir que no."
    ]
  },
  3: {
    luz: [
      "Soy ambicioso y muy motivado — siempre fui así.",
      "Me gusta tener objetivos claros y saber exactamente en qué punto estoy.",
      "Me adapto con facilidad a situaciones y entornos distintos.",
      "Soy visto por los demás como alguien seguro y decidido.",
      "Me resulta natural organizar cosas y terminarlas.",
      "Tomar decisiones no me resulta difícil.",
      "Soy una persona emprendedora y con mucha motivación.",
      "La adversidad me endureció y me hizo más resuelto.",
      "Prefiero estar en la acción que mirar desde afuera.",
      "Soy buen trabajador y los resultados me dan satisfacción genuina."
    ],
    sombra: [
      "Siento que necesito lograr muchas cosas para que los demás me valoren.",
      "Gran parte de mis éxitos se debieron a que sé dar una buena impresión.",
      "Me identifico tanto con mi trabajo que a veces me olvido de quién soy.",
      "Proyectar una imagen ganadora es muy importante para mí.",
      "Me esforcé mucho para que los demás me acepten y quieran.",
      "Me molesta que me digan que lo que estoy haciendo no está bien.",
      "Vivo con cierta tensión porque me propongo demasiados objetivos a la vez.",
      "A veces hay que poner entre paréntesis las propias normas para lograr el éxito.",
      "Mis valores y estilo de vida han cambiado varias veces a lo largo de los años.",
      "Me disgusta que me hagan perder el tiempo."
    ]
  },
  4: {
    luz: [
      "Las artes y la expresión artística son fundamentales para mí — así proceso mis emociones.",
      "Me gusta hacer las cosas bien y con estilo.",
      "Una de mis cualidades es describir estados internos con precisión.",
      "Me gustan las experiencias intensas y profundas.",
      "Los demás se acercan a mí porque soy original, tranquilo y profundo.",
      "Habitualmente hice lo que quise hacer.",
      "Amo la belleza — las formas, el buen gusto, lo estético.",
      "Tengo mucha sensibilidad para captar lo que la mayoría no ve.",
      "Soy creativo e innovador — cambio las cosas para expresar algo que siento.",
      "Siempre me atrajo el simbolismo y el sentido más profundo de las cosas."
    ],
    sombra: [
      "Muestro una cara sonriente aunque por dentro esté triste.",
      "Siento que pocas personas tienen capacidad de entender lo que realmente siento.",
      "La mayoría de la gente no aprecia la verdadera belleza de la vida.",
      "Me acusan de ser dramático, pero en realidad no me comprenden.",
      "Paso por altibajos intensos — o estoy muy arriba o muy abajo.",
      "El final de una relación me afecta más que a la mayoría.",
      "Soy propenso a la nostalgia, la melancolía y a revivir el pasado.",
      "Tiendo a ser voluble y a quedarme en mi propio mundo.",
      "Me considero especial — no me gusta pensar que puedo ser vulgar.",
      "Idealizo a las personas cuando están lejos y las devalúo cuando están cerca."
    ]
  },
  5: {
    luz: [
      "Me encanta sintetizar y conectar ideas de distintos campos.",
      "Estoy orgulloso de ser objetivo y claro.",
      "Me esfuerzo en que se respete mi libertad e independencia.",
      "Me gusta ver todo en perspectiva antes de sacar conclusiones.",
      "Soy una persona cauta y reservada — pienso antes de actuar.",
      "Cuando surge un problema, primero lo estudio solo y después lo hablo.",
      "Tengo una gran capacidad de observación y análisis.",
      "Cuando hablo, tengo algo concreto para decir.",
      "Prefiero depender lo menos posible de los demás — eso me da libertad.",
      "Resuelvo mis problemas pensando — encuentro la estructura detrás de todo."
    ],
    sombra: [
      "Suelo quedarme atrás observando en lugar de involucrarme.",
      "Me cuesta mucho pedir o alcanzar lo que necesito.",
      "Cuando me presionan, me vuelvo huidizo.",
      "Las sorpresas me generan malestar — prefiero saber qué esperar.",
      "Necesito mucho espacio y tiempo privado — sin eso me agoto.",
      "Me quedo mudo cuando me preguntan cómo me siento.",
      "Guardo mis sentimientos para mí — no los comparto fácilmente.",
      "Tiendo a ser solitario y a preferir trabajar solo.",
      "Me fastidian las personas que no son lógicas o que no argumentan bien.",
      "Soy bastante tacaño con mi tiempo, mi energía y lo que comparto de mí."
    ]
  },
  6: {
    luz: [
      "Soy muy leal y confiable — en los momentos difíciles soy de los que se quedan.",
      "Suelo actuar con sentido del deber y la responsabilidad.",
      "La lealtad al grupo es muy importante para mí.",
      "Soy buen colaborador y la gente puede confiar en mí.",
      "Tengo gran capacidad de compromiso y de sostener proyectos a largo plazo.",
      "En general soy una persona pragmática y realista.",
      "Soy muy sensible a las contradicciones — las detecto enseguida.",
      "Me gusta que las cosas tengan principio y fin claro.",
      "La prudencia es una virtud fundamental en mi vida.",
      "Antes de tomar una decisión, junto toda la información posible."
    ],
    sombra: [
      "Estoy lleno de dudas con frecuencia — me cuesta decidir con confianza.",
      "Siento que estoy luchando con mis miedos todo el tiempo.",
      "Cuando me presionan me pongo irascible y tenso.",
      "Cuando me siento inseguro me vuelvo terco y defensivo.",
      "Siento el peligro y la amenaza más que otras personas.",
      "Me pregunto seguido si tengo el valor para hacer lo que hay que hacer.",
      "No he confiado demasiado en mí mismo — busco validación afuera.",
      "Prefiero sacrificar mi independencia si eso me da seguridad.",
      "Evalúo constantemente si las personas que me rodean pueden ser una amenaza.",
      "Tiendo a dividir el mundo en bandos y me preocupa de qué lado están todos."
    ]
  },
  7: {
    luz: [
      "Tengo una energía genuina que hace que la gente quiera estar cerca.",
      "Siempre veo el lado lleno del vaso — encuentro posibilidades donde otros ven problemas.",
      "La gente me dice que soy el alma de las reuniones.",
      "Si tengo que elegir entre lo nuevo y lo conocido, elijo lo nuevo.",
      "Soy muy entusiasta respecto al futuro.",
      "Suelo ver el lado bueno de las cosas naturalmente.",
      "Me gusta animar a la gente y sacarla del bajón.",
      "Me gusta saborear la vida — hay muy pocas cosas que no disfrute.",
      "Me encanta conectar ideas de distintos campos y ver el sentido más amplio de todo.",
      "Me han valorado por mi espíritu inquebrantable y mi sentido del humor."
    ],
    sombra: [
      "Me olvido fácilmente de lo que me produce dolor.",
      "La mayor parte del tiempo evito meterme en problemas graves.",
      "Me resulta difícil asumir compromisos a largo plazo.",
      "Suelo pasar de una cosa a otra en vez de profundizar en una sola.",
      "He sido demasiado confiado y permisivo conmigo mismo.",
      "Mi teoría es: si algo es bueno, más es mejor.",
      "No creo que sea bueno quedarse triste demasiado tiempo.",
      "Algunas personas me consideran superficial — y a veces tienen algo de razón.",
      "Me cuesta conectarme con el dolor propio sin transformarlo en otra cosa.",
      "Comienzo muchas cosas y me cuesta terminarlas cuando dejan de ser nuevas."
    ]
  },
  8: {
    luz: [
      "Me pongo al frente en las situaciones difíciles — no me escondo.",
      "Tengo un fuerte sentido de la justicia — cuando algo no está bien lo digo.",
      "Soy capaz de dar la vida por quien amo — mi lealtad es absoluta.",
      "Detecto dónde reside el poder en un grupo.",
      "Protejo a quienes están bajo mi responsabilidad.",
      "No me asusta enfrentarme con otros cuando es necesario.",
      "Sé cómo hacer las cosas — y lo hago.",
      "Soy directo y franco — la gente sabe que no les voy a mentir.",
      "Si estoy seguro de mi propósito, voy para adelante sin importar qué opinen.",
      "Me desenvuelvo muy bien luchando por lo que quiero."
    ],
    sombra: [
      "A veces irrité a los demás por ser demasiado agresivo.",
      "El control es una palabra clave para mí — me cuesta soltar.",
      "No me gusta estar arrinconado — reacciono mal cuando eso pasa.",
      "Tuve que ser fuerte para los demás y no tuve tiempo de ver mis propios miedos.",
      "Me muestro más duro de lo que realmente soy.",
      "Me preocupa que alguien se aproveche de mí cuando bajo la guardia.",
      "No me gusta que me digan que me adapte o me conforme.",
      "Me cuesta aceptar y expresar mi lado tierno o vulnerable.",
      "Tiendo más a actuar que a detenerme en los sentimientos.",
      "No me ocupo demasiado de la introspección ni del autoanálisis."
    ]
  },
  9: {
    luz: [
      "Casi siempre estoy calmado y tranquilo — eso le hace bien a mi entorno.",
      "La armonía y la aceptación son valores muy importantes para mí.",
      "Puedo ser un árbitro imparcial — para mí las dos partes son iguales.",
      "Tiendo a no juzgar a las personas — las acepto como son.",
      "Me precio de ser una persona estable y confiable.",
      "Soy extremadamente tratable — me llevo bien con casi todo el mundo.",
      "Tengo una percepción amplia — veo más allá de lo evidente.",
      "Soy bastante conservador en mis valores — eso me da solidez.",
      "La gente se siente cómoda conmigo porque no presiono ni juzgo.",
      "Cuando me comprometo con una causa, lo hago desde un lugar genuino."
    ],
    sombra: [
      "Me fastidia que me perturben — prefiero que todo siga su curso.",
      "Me resulta difícil decir no.",
      "Generalmente sigo la línea de menor resistencia.",
      "No hay nada tan urgente que no pueda esperar hasta mañana.",
      "Mi calma y lentitud pueden irritar a los demás.",
      "No me he impuesto suficientemente ante los demás.",
      "Tiendo a reprimir los sentimientos antes de que se conviertan en conflicto.",
      "Tengo cierta dificultad para centrar mi atención y sostenerla.",
      "Tiendo a quitarle importancia a las cosas para que los demás se tranquilicen.",
      "Me olvido de mis propias necesidades mientras atiendo las de todos los demás."
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
    tipos: [2, 6, 7],
    herida: "rechazo",
    clave: "dar un paso hacia atrás"
  },
  enfrentan: {
    tipos: [1, 3, 8],
    herida: "agresión",
    clave: "dar un paso hacia el interior"
  },
  aislan: {
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
