// Fuente de datos SEO (título/descripción) por ruta estática, usada por
// build.mjs para prerenderizar el <title>/<meta description> correctos en el
// HTML crudo de cada página (Google indexa el HTML sin JS ejecutado).
//
// OJO: estos valores deben coincidir EXACTAMENTE con el objeto META en
// app.jsx (el useEffect que setea document.title en el cliente, ~línea 82).
// Si cambias uno, cambia el otro — no hay import cruzado porque app.jsx se
// sirve al navegador tal cual (sin bundler) y este archivo es solo para Node.
export const PAGES = [
  { path: "/", title: "Viaje · Carpooling en Caracas desde $0,55", description: "Viaje conecta tu ruta diaria con conductores que ya van por ahí. Carpooling en Caracas desde $0,55 por trayecto, con verificación, GPS en vivo y pagos seguros." },
  { path: "/tarifas", title: "Tarifas de carpooling en Caracas · Viaje", description: "Tarifa fija de carpooling en Caracas: Viajecito $0,55, Viaje $1,10 y El Viaje $3,30. Sin tarifa dinámica. Mira cómo se calcula el precio de tu viaje." },
  { path: "/pilotos", title: "Sé piloto de carpooling en Caracas · Viaje", description: "Genera ingresos con tu ruta diaria en el carpooling de Caracas: el piloto recibe el 90% de cada viaje. Postúlate para ser piloto de Viaje." },
  { path: "/como-funciona", title: "Cómo funciona el carpooling en Caracas · Viaje", description: "Así funciona el carpooling de Viaje en Caracas: te conectamos con conductores que ya recorren tu ruta para compartir el viaje y los costos." },
  { path: "/nosotros", title: "Nosotros · Viaje", description: "No vinimos a mover carros: vinimos a cambiarle el día al venezolano. Conoce el manifiesto, los valores y el equipo detrás de Viaje." },
  { path: "/registro", title: "Pre-registro pasajero · Viaje", description: "Pre-regístrate como pasajero y sé de los primeros en usar Viaje en Caracas." },
  { path: "/registro-piloto", title: "Pre-registro piloto · Viaje", description: "Pre-regístrate como piloto de Viaje y empieza a generar ingresos con tu ruta diaria." },
  { path: "/contacto", title: "Contacto · Viaje", description: "¿Dudas sobre Viaje? Contáctanos; respondemos en menos de 24 horas." },
  { path: "/descarga", title: "Descarga Viaje · iPhone y Android", description: "Descarga la app de Viaje ya mismo, disponible en App Store y Google Play." },
  { path: "/blog", title: "Blog · Viaje", description: "Guías y noticias sobre carpooling, transporte y movilidad en Caracas." },
];
