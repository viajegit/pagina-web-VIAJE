// Datos del blog de Viaje. Array global de posts — sin JSX, solo datos.
// Cada post tiene un "content" tipado (p / h2 / list) que blog.jsx recorre
// para renderizar la nota, sin necesitar dangerouslySetInnerHTML.

window.BLOG_POSTS = [
  {
    slug: "que-es-el-carpooling-caracas",
    title: "¿Qué es el carpooling y por qué está creciendo en Caracas?",
    description: "El carpooling conecta a personas que ya hacen la misma ruta para compartir el viaje y los costos. Te explicamos qué es, sus ventajas y por qué tiene tanto sentido en Caracas.",
    date: "2026-07-08",
    readTime: "5 min",
    tag: "Guías",
    excerpt: "Compartir el carro con alguien que ya va para donde tú vas no es un concepto nuevo — pero en Caracas, cada vez tiene más sentido. Te contamos de qué se trata.",
    keyTakeaways: [
      "Carpooling es compartir un vehículo con alguien que ya iba por tu misma ruta, dividiendo el costo.",
      "En Venezuela existe hace décadas como \"dar la cola\"; el carpooling moderno solo le agrega estructura y verificación.",
      "Caracas es terreno fértil por el tráfico, el costo de mantener carro y las brechas del transporte público.",
      "El pasajero ahorra y viaja verificado; el piloto genera ingreso extra sin desviarse de su ruta.",
      "Viaje conecta esa demanda y oferta con verificación de identidad y GPS en vivo, ya disponible en Caracas.",
    ],
    related: ["viaje-carpooling-verificado-caracas", "carpooling-caracas-venezuela"],
    content: [
      {
        type: "p",
        text: "Carpooling es, en el fondo, algo muy sencillo: compartir un vehículo con alguien que ya va por tu misma ruta, dividiendo el costo del trayecto entre los dos. No es un taxi ni un servicio de transporte formal. Es coordinación entre personas — vecinos, compañeros de trabajo, gente del mismo sector — que de todas formas iban a hacer ese recorrido.",
      },
      {
        type: "p",
        text: "La idea no es nueva: en Venezuela toda la vida se ha \"dado la cola\". El carpooling moderno le pone estructura, verificación y un poco de tecnología a algo que el venezolano ya sabía hacer.",
      },
      {
        type: "h2",
        text: "Por qué Caracas es terreno fértil para el carpooling",
      },
      {
        type: "p",
        text: "Moverse en Caracas es una decisión que se toma todos los días, y no es sencilla. El tráfico es denso en buena parte de la ciudad, sobre todo en las horas de entrada y salida del trabajo. Mantener un vehículo propio — gasolina, mantenimiento, estacionamiento — cuesta cada vez más. Y el transporte público formal no siempre cubre bien todas las rutas ni todos los horarios.",
      },
      {
        type: "p",
        text: "En ese contexto, aprovechar mejor los vehículos que YA están circulando — en vez de sumar más carros a la calle — es simplemente más eficiente. Si alguien va a manejar de todos modos desde tu zona hasta la tuya de destino, compartir ese trayecto le hace bien a los dos lados.",
      },
      {
        type: "h2",
        text: "Los beneficios, para los dos lados",
      },
      {
        type: "list",
        items: [
          "Para el pasajero: ahorra frente al costo de un taxi, viaja con alguien conocido y verificado en vez de con un extraño cualquiera, y usa rutas que ya conoce y que se repiten día a día.",
          "Para el piloto: genera un ingreso extra sin desviarse de su ruta diaria habitual, tiene compañía en el trayecto, y aprovecha mejor un vehículo que de todas formas va a sacar a la calle.",
        ],
      },
      {
        type: "h2",
        text: "Cómo encaja Viaje en esto",
      },
      {
        type: "p",
        text: "Viaje conecta pasajeros con pilotos que ya recorren esa misma ruta todos los días, con verificación de identidad y GPS en vivo durante cada trayecto. La idea es simple: que compartir el camino sea fácil, seguro y confiable para ambos lados. Ya está disponible en Caracas.",
      },
      {
        type: "p",
        text: [
          "Si te interesa probarlo, ",
          { t: "descárgala en Google Play", href: "https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dblog_body%26utm_campaign%3Dque_es_carpooling" },
          " como pasajero, o ",
          { t: "postúlate como piloto", href: "/registro-piloto" },
          " si vas en carro al trabajo.",
        ],
      },
    ],
  },
  {
    slug: "cuanto-cuesta-moverte-en-caracas",
    title: "Cuánto cuesta moverte en Caracas: taxi, transporte público y carpooling",
    description: "Comparamos, en términos generales, las opciones para moverte en Caracas y por qué una tarifa fija sin sorpresas cambia las reglas del juego.",
    date: "2026-07-08",
    readTime: "6 min",
    tag: "Guías",
    excerpt: "Taxi, apps de transporte, transporte público, carro propio o carpooling: cada opción para moverte en Caracas tiene un costo distinto, y no siempre es el que crees.",
    keyTakeaways: [
      "El taxi de calle en Caracas no tiene tarifa regulada: el precio se negocia y varía cada vez.",
      "Las apps de transporte por demanda usan tarifa dinámica: el precio sube con la demanda, la hora o el clima.",
      "En una prueba real de 9 km, ese tipo de apps terminó entre $2 y $6 según el vehículo.",
      "Viaje usa tarifa fija por zona geográfica: Viajecito $0,55, Viaje $1,10, El Viaje $3,30 — nunca cambia en hora pico.",
      "La diferencia no es solo el monto: es saber de antemano cuánto vas a pagar.",
    ],
    related: ["que-es-el-carpooling-caracas", "taxi-ridery-o-viaje-caracas"],
    content: [
      {
        type: "p",
        text: "Moverse en Caracas es una decisión diaria con impacto real en el bolsillo. No todas las opciones cuestan lo mismo, y muchas veces lo que parece más cómodo termina siendo lo más caro — o lo más impredecible.",
      },
      {
        type: "list",
        items: [
          "Taxi y apps de transporte: suelen tener tarifa dinámica, que puede subir en hora pico o según la demanda del momento. Es cómodo, pero difícil de predecir.",
          "Transporte público: generalmente es la opción más económica, aunque con rutas fijas y tiempos de espera inciertos.",
          "Vehículo propio: implica gasolina, mantenimiento y estacionamiento — cuesta incluso los días que no lo usas.",
          "Carpooling: compartes el costo real del trayecto con alguien que de todas formas iba para allá, lo que suele traducirse en una tarifa más baja y estable.",
        ],
      },
      {
        type: "h2",
        text: "El problema de la tarifa dinámica",
      },
      {
        type: "p",
        text: "Una de las mayores fuentes de fricción al moverte por la ciudad es no saber cuánto vas a pagar hasta el momento en que pides el viaje. Cuando la tarifa cambia según la hora, el clima o la demanda, planificar el gasto del mes se vuelve casi imposible. Un mismo trayecto puede costar distinto un lunes en la mañana que un viernes en la noche, y eso genera desconfianza e incertidumbre en quien solo quiere llegar a su destino.",
      },
      {
        type: "h2",
        text: "Cómo lo resuelve Viaje: tarifa fija, sin sorpresas",
      },
      {
        type: "p",
        text: "En Viaje no existe la tarifa dinámica. El precio depende de la categoría de tu ruta, no de la hora ni de la demanda, y son solo tres:",
      },
      {
        type: "list",
        items: [
          "Viajecito — $0,55: rutas cortas dentro de la misma zona urbana.",
          "Viaje — $1,10: trayectos entre zonas con cerro o cambio de altitud.",
          "El Viaje — $3,30: recorridos largos fuera del área urbana.",
        ],
      },
      {
        type: "p",
        text: "El piloto recibe el 90% de cada viaje; Viaje cobra una comisión del 10%. Y puedes pagar como te quede más cómodo: en efectivo, por Pago Móvil, o con la billetera interna, que calcula la tasa BCV de forma automática.",
      },
      {
        type: "p",
        text: [
          "Si quieres ver el detalle completo de cada categoría y ejemplos de rutas, revisa nuestra ",
          { t: "página de tarifas", href: "/tarifas" },
          ". Y si quieres empezar a usar Viaje en Caracas, ",
          { t: "descárgala en Google Play", href: "https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dblog_cuanto_cuesta" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "viaje-carpooling-verificado-caracas",
    title: "Viaje: carpooling verificado que conecta tu ruta diaria en Caracas",
    description: "Presentamos Viaje: la plataforma de carpooling en Caracas con verificación de identidad, GPS en vivo y tarifa fija. Así es como funciona.",
    date: "2026-07-08",
    readTime: "4 min",
    tag: "Viaje",
    excerpt: "Somos Viaje: una plataforma de carpooling que conecta a pasajeros con pilotos que ya recorren su misma ruta a diario en Caracas. Así funcionamos.",
    keyTakeaways: [
      "Viaje conecta pasajeros con pilotos que ya recorren la misma ruta todos los días en Caracas.",
      "Todo piloto pasa por verificación de identidad, licencia y antecedentes (KYC) antes de operar.",
      "Cada viaje se puede seguir con GPS en tiempo real y tiene botón de emergencia (SOS) disponible.",
      "La tarifa es fija por categoría — Viajecito, Viaje y El Viaje — sin sorpresas en hora pico.",
      "El piloto recibe el 90% de cada viaje; ya está disponible para descargar en Caracas.",
    ],
    related: ["que-es-el-carpooling-caracas", "cuanto-cuesta-moverte-en-caracas"],
    content: [
      {
        type: "p",
        text: "Somos Viaje, una plataforma de carpooling que conecta a pasajeros con pilotos que ya recorren esa misma ruta todos los días en Caracas. No inventamos un servicio nuevo: le dimos estructura, verificación y tecnología a algo que el venezolano lleva toda la vida haciendo — dar la cola.",
      },
      {
        type: "p",
        text: "No vinimos a mover carros. Vinimos a cambiarle el día al venezolano. Por eso no pensamos en Viaje solo como una forma de llegar de un punto a otro, sino como una manera de hacer más llevadero algo que se vive todos los días: el trayecto.",
      },
      {
        type: "h2",
        text: "Verificación antes que nada",
      },
      {
        type: "p",
        text: "Antes de que un piloto pueda operar en Viaje, pasa por un proceso de verificación de identidad, licencia y antecedentes (KYC), que toma entre 24 y 48 horas. A eso se suma la calificación mutua entre pasajero y piloto después de cada viaje, que mantiene la confianza dentro de la comunidad.",
      },
      {
        type: "h2",
        text: "Seguridad en cada viaje",
      },
      {
        type: "p",
        text: "Cada trayecto se puede seguir con GPS en tiempo real, y hay un botón de emergencia (SOS) siempre disponible durante el viaje. La seguridad de pasajeros y pilotos va primero, antes que cualquier otra cosa.",
      },
      {
        type: "h2",
        text: "Precio fijo, sin sorpresas",
      },
      {
        type: "p",
        text: "En Viaje no hay tarifa dinámica. Tres categorías, precio fijo: Viajecito a $0,55, Viaje a $1,10 y El Viaje a $3,30, según la geografía de la ruta. El piloto recibe el 90% de cada viaje.",
      },
      {
        type: "p",
        text: [
          "Ya está disponible en Caracas. ",
          { t: "Descárgala en Google Play", href: "https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dblog_verificado" },
          " y pide tu primer viaje, o ",
          { t: "postúlate como piloto", href: "/registro-piloto" },
          " si vas en carro al trabajo.",
        ],
      },
    ],
  },
  {
    slug: "taxi-ridery-o-viaje-caracas",
    title: "Taxi, apps de transporte o Viaje: cuánto pagas realmente por moverte en Caracas",
    description: "Comparamos con números reales y verificados lo que cuesta moverte en Caracas: taxi tradicional, apps de transporte por demanda y Viaje. Tarifa dinámica vs tarifa fija.",
    date: "2026-07-19",
    readTime: "6 min",
    tag: "Guías",
    excerpt: "No somos un taxi, pero sabemos que así es como la gente compara sus opciones para moverse. Aquí están los números reales, sin adornos.",
    keyTakeaways: [
      "El taxi tradicional en Caracas no tiene tarifa fija: el precio se negocia y varía según quién lo cobre.",
      "Las apps de transporte por demanda cobran tarifa dinámica — el precio \"desde\" no es lo que realmente pagas.",
      "En un mismo trayecto real de 9 km, ese tipo de apps rondó los $2 en moto y cerca de $6 en carro.",
      "Viaje no es un taxi: es carpooling con tarifa fija por zona, igual un lunes 7am que un viernes 6pm.",
      "La ventaja no es solo el precio — es saber cuánto vas a pagar antes de pedir el viaje.",
    ],
    related: ["carpooling-caracas-venezuela", "cuanto-cuesta-moverte-en-caracas"],
    content: [
      {
        type: "p",
        text: "Cuando alguien busca cómo moverse por Caracas, la pregunta casi siempre es la misma: \"¿cuál es la opción más barata?\". Viaje no es un taxi — somos carpooling, coordinación entre vecinos que ya hacen la misma ruta — pero entendemos que a la hora de decidir, la gente compara todas sus opciones por igual. Así que investigamos los números reales de cada una, verificados en sus propias fuentes y en un comparativo independiente, y los ponemos aquí sin adornos.",
      },
      {
        type: "h2",
        text: "Taxi tradicional: sin tarifa fija",
      },
      {
        type: "p",
        text: "En Caracas, el taxi de calle no tiene una tarifa regulada ni un taxímetro de uso generalizado: el precio se negocia con el conductor antes de subir, y varía según la distancia, la hora y quién te lo cobre. Es la opción más impredecible de todas — puedes pagar distinto por el mismo trayecto dos días seguidos.",
      },
      {
        type: "h2",
        text: "Apps de transporte por demanda: el precio \"desde\" no es lo que pagas",
      },
      {
        type: "p",
        text: "Varias apps de transporte operan hoy en Caracas, todas con el mismo patrón: publican (o no) un precio de entrada \"desde\" cierto monto, y el costo real se calcula al momento de pedir el viaje según la demanda del momento — hora pico, lluvia, poca disponibilidad de conductores. Algunas ni siquiera publican una tabla de precios de entrada en su web: el costo se calcula dentro de la app, y el pago suele coordinarse directo con el conductor (Pago Móvil, Zelle o efectivo), lo que las hace difíciles de comparar por adelantado.",
      },
      {
        type: "h2",
        text: "Un mismo trayecto, varias apps: la prueba real",
      },
      {
        type: "p",
        text: [
          "Los precios \"desde\" son un piso, no lo que realmente se paga. Para tener una comparación justa hace falta ver el mismo viaje en varias apps a la vez — y eso es exactamente lo que hizo ",
          { t: "un comparativo independiente de Motum Magazine", href: "https://motummagazine.com/actualidad/yango-venezuela-app-movilidad-precios/" },
          " para un trayecto real de 9 km entre el Sambil de La Candelaria y Parque Cristal:",
        ],
      },
      {
        type: "table",
        headers: ["Vehículo", "Rango real pagado"],
        rows: [
          ["Moto", "$2,10 – $3,20"],
          ["Carro", "$5,57 – $5,85"],
        ],
      },
      {
        type: "p",
        text: "En un viaje real, sin promociones ni horas valle, las apps de transporte por demanda terminan bastante parejas entre sí — todas por encima de $2 en moto y cerca de $6 en carro. Ninguna te dice ese número antes de pedir el viaje con exactitud, porque todas recalculan según el momento.",
      },
      {
        type: "h2",
        text: "Viaje: precio fijo por zona, siempre el mismo",
      },
      {
        type: "p",
        text: "En Viaje el precio no depende de la hora, la demanda ni el clima. Depende solo de la geografía de tu ruta, y son tres categorías:",
      },
      {
        type: "list",
        items: [
          "Viajecito — $0,55: rutas cortas dentro de la misma zona urbana.",
          "Viaje — $1,10: trayectos entre zonas con cerro o cambio de altitud.",
          "El Viaje — $3,30: recorridos largos fuera del área urbana.",
        ],
      },
      {
        type: "p",
        text: [
          "Ese precio es el mismo un lunes a las 7am que un viernes a las 6pm — no hay tarifa dinámica que active en hora pico, porque el modelo no es \"pedir un carro\", es compartir un trayecto que el piloto ya iba a hacer de todas formas. Puedes ver el detalle completo por categoría en nuestra ",
          { t: "página de tarifas", href: "/tarifas" },
          ".",
        ],
      },
      {
        type: "p",
        text: [
          "La diferencia no es solo el monto final — es saber de antemano cuánto vas a pagar, sin sorpresas cuando más lo necesitas. Si quieres empezar a moverte así, ",
          { t: "descarga Viaje en Google Play", href: "https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dblog_taxi_ridery" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "carpooling-caracas-venezuela",
    title: "Carpooling en Caracas, Venezuela: cómo saber si una app es carpooling de verdad",
    description: "No todo lo que aparece al buscar carpooling en Venezuela es carpooling real. Te explicamos las categorías que existen y en cuál encaja Viaje.",
    date: "2026-08-17",
    readTime: "6 min",
    tag: "Guías",
    excerpt: "Si buscas carpooling en Caracas, Venezuela, te van a salir varias opciones y no todas hacen lo mismo. Aquí te explicamos cómo diferenciarlas.",
    keyTakeaways: [
      "No todo lo que aparece al buscar \"carpooling Caracas\" es carpooling real — algunas son transporte privado con otro nombre.",
      "Hay opciones pensadas para viajes entre ciudades (interurbano), con tarifa variable por kilómetro.",
      "Otras sí son carpooling nacional, pero sin tarifa fija: cada conductor pone su precio.",
      "Algunas no son carpooling — son traslados privados y turismo entre ciudades, con precio de agencia.",
      "Viaje es la opción enfocada en la ruta diaria dentro de Caracas, con precio fijo por zona.",
    ],
    related: ["que-es-el-carpooling-caracas", "taxi-ridery-o-viaje-caracas"],
    content: [
      {
        type: "p",
        text: "Si buscas \"carpooling en Caracas, Venezuela\" te van a salir varias opciones, y no todas hacen lo mismo. Algunas son carpooling de verdad, otras son transporte privado con otro nombre, y al menos una categoría son páginas de anuncios que existen desde antes de que hubiera apps de transporte en Venezuela. Aquí va cómo diferenciarlas, sin adornos.",
      },
      {
        type: "h2",
        text: "Primero, qué SÍ es carpooling (y qué no)",
      },
      {
        type: "p",
        text: [
          "Carpooling es compartir un vehículo con alguien que YA iba a hacer ese trayecto, dividiendo el costo entre los dos. No es lo mismo que pedir un carro que sale exclusivamente a buscarte — eso es transporte privado o ridehailing, así use un carro particular. Comparamos ese tipo de apps en detalle en ",
          { t: "otra nota", href: "/blog/taxi-ridery-o-viaje-caracas" },
          ". Esta es sobre las opciones que sí compiten en la categoría de carpooling.",
        ],
      },
      {
        type: "h2",
        text: "Viaje — para tu ruta del día a día en Caracas",
      },
      {
        type: "p",
        text: [
          "Viaje conecta pasajeros con pilotos que ya recorren la misma ruta todos los días, dentro de Caracas. Tarifa fija por zona geográfica (Viajecito $0,55, Viaje $1,10, El Viaje $3,30 — sin tarifa dinámica ni en hora pico), verificación de identidad y licencia de cada piloto, GPS en vivo durante el trayecto y botón de emergencia. Ya está disponible en Google Play. Ver el ",
          { t: "detalle de tarifas", href: "/tarifas" },
          ".",
        ],
      },
      {
        type: "h2",
        text: "Carpooling interurbano — para viajar entre ciudades, no para el día a día",
      },
      {
        type: "p",
        text: "Algunas plataformas nacen de alianzas universitarias, pensadas para trayectos interurbanos — típicamente estudiantes viajando entre ciudades, no el trayecto diario dentro de una misma ciudad. Su tarifa suele ser variable por kilómetro recorrido, a diferencia del precio fijo por zona de Viaje. Si tu necesidad es ir de Caracas a otra ciudad un fin de semana, ese tipo de opción tiene sentido; si es ir a la oficina todos los días, no es para eso.",
      },
      {
        type: "h2",
        text: "Carpooling nacional sin tarifa fija",
      },
      {
        type: "p",
        text: "Existen también apps de carpooling real a nivel nacional: el conductor publica su ruta, horario, puestos disponibles y precio, y el pasajero reserva el puesto. La diferencia clave con Viaje: el precio lo decide cada conductor viaje por viaje, no hay una tarifa fija publicada, y no están enfocadas específicamente en la ruta diaria dentro de Caracas sino en cualquier ruta del país.",
      },
      {
        type: "h2",
        text: "Traslados privados, turismo y tablones de anuncios",
      },
      {
        type: "p",
        text: "También vas a encontrar opciones que aparecen en resultados de búsqueda relacionados pero que no son carpooling en el sentido de compartir el costo de un trayecto que ya ibas a hacer: servicios de traslados privados y paquetes turísticos entre ciudades (más parecidos a una agencia de transporte), y tablones de anuncios que existen desde hace más de una década, sin app propia, sin verificación de identidad ni de conductores, y sin forma de saber cuánta actividad real tienen hoy en Caracas.",
      },
      {
        type: "p",
        text: [
          "Si lo que buscas es compartir el trayecto que haces todos los días para ir al trabajo o la universidad dentro de Caracas, con precio fijo y verificación de por medio, ",
          { t: "descarga Viaje en Google Play", href: "https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dblog_carpooling_caracas" },
          ". Y si vas en carro al trabajo y quieres generar un ingreso extra sin desviarte de tu ruta, ",
          { t: "postúlate como piloto", href: "/registro-piloto" },
          ".",
        ],
      },
    ],
  },
];
