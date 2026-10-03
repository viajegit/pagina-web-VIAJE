function LoadingSplash({ onDone }) {
  const videoRef = React.useRef(null);
  const [fadingOut, setFadingOut] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const finish = React.useCallback(() => {
    setFadingOut(true);
    setTimeout(onDone, 500);
  }, [onDone]);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnd = () => finish();
    v.addEventListener("ended", onEnd);
    const failsafe = setTimeout(finish, 7000);
    return () => { v.removeEventListener("ended", onEnd); clearTimeout(failsafe); };
  }, [finish]);

  const videoSrc = isMobile ? "/splash-loader-vertical.mp4" : "/splash-loader.mp4";

  return (
    <div
      onClick={finish}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#0280F9",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 500ms ease-out",
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <video
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ width: "100%", height: "100%", objectFit: isMobile ? "cover" : "contain" }}
      />
      <div style={{
        position: "absolute", bottom: 28, left: 0, right: 0,
        textAlign: "center", color: "rgba(255,255,255,0.55)",
        fontSize: 11, fontFamily: "var(--mono, monospace)", letterSpacing: "0.15em",
      }}>
        TOCA PARA SALTAR
      </div>
    </div>
  );
}

function App() {
  // Solo mostrar splash en el primer load de la sesión. Además, quien llega
  // desde un buscador ya trae intención de encontrar algo específico --
  // forzarlo a ver el video de marca antes de dejarlo leer perjudica justo al
  // tráfico de SEO que más interesa retener, así que a ese tráfico se le salta.
  const [splashDone, setSplashDone] = React.useState(() => {
    try {
      if (sessionStorage.getItem("viaje_splash_seen") === "1") return true;
      const ref = document.referrer || "";
      const fromSearchEngine = /google\.|bing\.|duckduckgo\.|yahoo\.|search\.brave\.|ecosia\.|yandex\./i.test(ref);
      if (fromSearchEngine) { sessionStorage.setItem("viaje_splash_seen", "1"); return true; }
      return false;
    } catch { return false; }
  });

  const finishSplash = React.useCallback(() => {
    try { sessionStorage.setItem("viaje_splash_seen", "1"); } catch {}
    setSplashDone(true);
  }, []);

  const route = useRoute();

  // SEO: título, descripción y canonical por página. Esto ya NO es lo único
  // que fija estos tags — build.mjs prerenderiza HTML estático por ruta
  // (ver seo-meta.mjs) con los tags correctos horneados en el HTML crudo,
  // porque el indexador de Google usa el HTML sin JS para el snippet. Este
  // useEffect queda como red de seguridad para navegación client-side (SPA)
  // y para navegadores reales; si tocas estos valores, actualiza también
  // seo-meta.mjs (mismo texto, dos archivos por la falta de bundler).
  React.useEffect(() => {
    const META = {
      "/": { t: "Viaje · Carpooling en Caracas desde $0,55", d: "Viaje conecta tu ruta diaria con conductores que ya van por ahí. Carpooling en Caracas desde $0,55 por trayecto, con verificación, GPS en vivo y pagos seguros." },
      "/tarifas": { t: "Tarifas de carpooling en Caracas · Viaje", d: "Tarifa fija de carpooling en Caracas: Viajecito $0,55, Viaje $1,10 y El Viaje $3,30. Sin tarifa dinámica. Mira cómo se calcula el precio de tu viaje." },
      "/pilotos": { t: "Sé piloto de carpooling en Caracas · Viaje", d: "Genera ingresos con tu ruta diaria en el carpooling de Caracas: el piloto recibe el 90% de cada viaje. Postúlate para ser piloto de Viaje." },
      "/como-funciona": { t: "Cómo funciona el carpooling en Caracas · Viaje", d: "Así funciona el carpooling de Viaje en Caracas: te conectamos con conductores que ya recorren tu ruta para compartir el viaje y los costos." },
      "/nosotros": { t: "Nosotros · Viaje", d: "No vinimos a mover carros: vinimos a cambiarle el día al venezolano. Conoce el manifiesto, los valores y el equipo detrás de Viaje." },
      "/registro": { t: "Pre-registro pasajero · Viaje", d: "Pre-regístrate como pasajero y sé de los primeros en usar Viaje en Caracas." },
      "/registro-piloto": { t: "Pre-registro piloto · Viaje", d: "Pre-regístrate como piloto de Viaje y empieza a generar ingresos con tu ruta diaria." },
      "/contacto": { t: "Contacto · Viaje", d: "¿Dudas sobre Viaje? Contáctanos; respondemos en menos de 24 horas." },
      "/blog": { t: "Blog · Viaje", d: "Guías y noticias sobre carpooling, transporte y movilidad en Caracas." },
    };
    let m = META[route] || META["/"];
    const blogMatchMeta = route.match(/^\/blog\/(.+)$/);
    if (blogMatchMeta) {
      const post = (window.BLOG_POSTS || []).find((p) => p.slug === blogMatchMeta[1]);
      m = post ? { t: post.title + " · Viaje", d: post.description } : META["/blog"];
    }
    document.title = m.t;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", m.d);
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.setAttribute("href", "https://www.viaje.com.ve" + (route === "/" ? "/" : route));
  }, [route]);

  let page;
  const trackMatch = route.match(/^\/track\/(.+)$/);
  const blogMatch = route.match(/^\/blog\/(.+)$/);
  if (trackMatch) {
    page = <TrackTrip token={trackMatch[1]} />;
  } else if (blogMatch) {
    page = <BlogPost slug={blogMatch[1]} />;
  } else {
    switch (route) {
      case "/como-funciona": page = <ComoFunciona />; break;
      case "/tarifas": page = <Tarifas />; break;
      case "/pilotos": page = <Pilotos />; break;
      case "/nosotros": page = <Nosotros />; break;
      case "/registro": page = <Registro />; break;
      case "/registro-piloto": page = <RegistroPiloto />; break;
      case "/contacto": page = <Contacto />; break;
      case "/descarga": page = <Descarga />; break;
      case "/blog": page = <Blog />; break;
      default: page = <Home />;
    }
  }

  return (
    <>
      {!splashDone && <LoadingSplash onDone={finishSplash} />}
      <Layout>
        {page}
        <CursorBlob />
      </Layout>
      <ViWidget />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
