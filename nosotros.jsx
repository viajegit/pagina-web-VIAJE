function Nosotros() {
  return (
    <>
      <NosotrosHero />
      <ManifiestoSection />
      <AlmaSection />
      <PMVSection />
      <ValoresSection />
      <DiferenciadoresSection />
      <EquipoSection />
      <JIDSection />
      <LexicoSection />
      <NosotrosCTA />
    </>
  );
}

/* ---------- ICONOS (set de línea propio, azul de marca) ---------- */
const ICON_PATHS = {
  target: <React.Fragment><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" /></React.Fragment>,
  compass: <React.Fragment><circle cx="12" cy="12" r="9" /><polygon points="16.2 7.8 13.6 13.6 7.8 16.2 10.4 10.4" /></React.Fragment>,
  eye: <React.Fragment><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></React.Fragment>,
  heart: <path d="M19 13.5c1.5-1.45 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 2.5c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  bulb: <React.Fragment><path d="M15 14c.2-1 .7-1.7 1.5-2.5A6 6 0 1 0 6 8c0 1.6.6 2.8 1.5 3.5C8.3 12.3 8.8 13 9 14" /><path d="M9 18h6" /><path d="M10 21.5h4" /></React.Fragment>,
  scale: <React.Fragment><path d="M12 3.5v17" /><path d="M6.5 20.5h11" /><path d="M4.5 7.5h15" /><path d="M19 7.5l3 6.5h-6Z" /><path d="M5 7.5l3 6.5H2Z" /></React.Fragment>,
  shield: <React.Fragment><path d="M12 3l7.5 3v5.5c0 4.7-3.2 7.5-7.5 8.5-4.3-1-7.5-3.8-7.5-8.5V6Z" /><path d="m9 12 2 2 4-4" /></React.Fragment>,
  users: <React.Fragment><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.6a3.2 3.2 0 0 1 0 6.2" /><path d="M18.5 19a5.5 5.5 0 0 0-2.2-4" /></React.Fragment>,
  rocket: <React.Fragment><path d="M5 15c-1.2 1-1.7 4.5-1.7 4.5S6.8 19 7.8 17.8a1.7 1.7 0 0 0-2.8-2.8Z" /><path d="m12.5 14.5-3-3c.5-1.7 1.3-3.3 2.4-4.7C14.8 2.7 18.7 2 21.5 2.5c.5 2.8-.2 6.7-4.3 9.6-1.4 1.1-3 1.9-4.7 2.4Z" /><circle cx="15" cy="9" r="1.4" /></React.Fragment>,
};

function VIcon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

function IconBadge({ name, size = 50 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 14,
      background: "var(--primary-50)", color: "var(--primary)",
      display: "grid", placeItems: "center", flexShrink: 0,
    }}>
      <VIcon name={name} size={Math.round(size * 0.5)} />
    </div>
  );
}

/* ---------- HERO ---------- */
function NosotrosHero() {
  return (
    <section style={{ position: "relative", padding: "100px 5vw 70px", overflow: "hidden" }}>
      <div className="map-grid map-grid-fade" />
      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Quiénes somos</div>
          <h1 className="h1" style={{ marginTop: 24, marginBottom: 24, maxWidth: 980, marginLeft: "auto", marginRight: "auto" }}>
            No vinimos a mover carros.<br />Vinimos a <em style={{ color: "var(--primary)", fontStyle: "italic" }}>cambiarle el día</em> al venezolano.
          </h1>
          <p className="lede" style={{ margin: "0 auto", maxWidth: 680 }}>
            Viaje no cambia el transporte. Innova la experiencia de moverte — y, con ella, la de vivir tu día.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- MANIFIESTO ---------- */
function ManifiestoSection() {
  const paras = [
    "Porque cómo te mueves define todo lo demás: a qué hora te despiertas, cómo te vistes, con qué ánimo llegas al trabajo, cuánto tiempo te queda para los tuyos al volver. El trayecto de cada día no es un detalle: es el marco de tu vida.",
    "Y en Venezuela, ese trayecto se sufre. En silencio, todos los días, millones de personas.",
    "Viaje existe para eso. No para reinventar la vida, sino para hacer mejor lo que ya haces todos los días: ir, volver, llegar. Convertir lo tedioso en llevadero, lo incierto en confiable, lo caro en justo.",
  ];
  return (
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 18 }}>El manifiesto</div>
        </Reveal>
        <Reveal stagger>
          {paras.map((p, i) => (
            <p key={i} style={{ fontSize: 20, lineHeight: 1.7, color: "var(--ink-2)", marginBottom: 24, fontWeight: i === 0 ? 500 : 400 }}>{p}</p>
          ))}
          <p style={{
            fontSize: 26, lineHeight: 1.5, color: "var(--ink)", marginTop: 36,
            fontFamily: "var(--serif)", fontWeight: 700, borderLeft: "3px solid var(--primary)", paddingLeft: 22,
          }}>
            No cambiamos el transporte. Innovamos la experiencia de moverte —<br />
            y con ella, la de vivir tu día.<br />
            <span style={{ color: "var(--primary)" }}>Eso es Viaje. Innovando Experiencias.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- EL ALMA (dark) ---------- */
function AlmaSection() {
  return (
    <section className="sec" style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, opacity: .4, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,136,229,.35), transparent 70%)",
      }} />
      <div className="wrap" style={{ position: "relative", textAlign: "center", maxWidth: 860 }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ color: "var(--primary-light)", marginBottom: 16, justifyContent: "center", display: "inline-flex" }}>El alma de Viaje</div>
          <h2 className="h2" style={{ color: "#fff", marginBottom: 28, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            La fuerza del venezolano.
          </h2>
        </Reveal>
        <Reveal stagger>
          <p style={{ fontSize: 19, lineHeight: 1.75, color: "#C8D3E5", marginBottom: 22 }}>
            Viaje nace de la misma fuerza que mueve a este país: la del venezolano que, pase lo que pase, se levanta y sigue.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.75, color: "#C8D3E5", marginBottom: 22 }}>
            Sobrevivimos a un doblete sísmico que habría paralizado a cualquier nación. No todos —y a quienes ya no están, los honramos—, pero aquí seguimos: trabajando, moviéndonos, construyendo. Esa resiliencia no es una historia que contamos; es de lo que estamos hechos.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.75, color: "#C8D3E5", marginBottom: 40 }}>
            Viaje conecta con cada venezolano que se levanta cada día a hacer que todo mejore. Por eso somos más que una app: somos parte de esa fuerza.
          </p>
          <p style={{ fontSize: 34, fontFamily: "var(--serif)", fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
            Somos fuertes. <span style={{ color: "var(--primary-light)" }}>Eso es Viaje.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- PROPÓSITO / MISIÓN / VISIÓN ---------- */
function PMVSection() {
  const items = [
    { tag: "Propósito", icon: "target", t: "El porqué", d: "Que moverse en Venezuela vuelva a ser fácil, digno y accesible — mejorando eso que todos viven a diario y casi nadie cuestiona." },
    { tag: "Misión", icon: "compass", t: "Lo que hacemos", d: "Hacer del trayecto diario del venezolano una experiencia más humana, confiable y justa, conectando a la gente que ya comparte el mismo camino." },
    { tag: "Visión", icon: "eye", t: "A dónde vamos", d: "Que llegar al trabajo, a casa o a donde sea deje de ser una carga y se vuelva una parte buena del día; que “moverse bien” se diga Viaje." },
  ];
  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Hacia dónde apuntamos</div>
          <h2 className="h2" style={{ maxWidth: 640, marginBottom: 56 }}>Propósito, misión y visión.</h2>
        </Reveal>
        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="pmv-grid">
            {items.map((it) => (
              <div key={it.tag} className="card" style={{ padding: 32, height: "100%" }}>
                <IconBadge name={it.icon} />
                <div className="eyebrow" style={{ marginTop: 18, color: "var(--primary)" }}>{it.tag}</div>
                <h3 className="h3" style={{ marginTop: 8, marginBottom: 12 }}>{it.t}</h3>
                <p style={{ fontSize: 15, color: "var(--ink-3)", lineHeight: 1.6 }}>{it.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 880px) { .pmv-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ---------- VALORES ---------- */
function ValoresSection() {
  const valores = [
    { icon: "heart", t: "Confianza de pana", d: "La confianza entre personas reales ES el producto. Si algo la erosiona, no se lanza." },
    { icon: "bulb", t: "Aquí se resuelve", d: "Ingenio venezolano: ante el obstáculo, buscamos la salida, no la excusa." },
    { icon: "scale", t: "Precio justo, pase lo que pase", d: "Tarifa fija, sin abuso, ni en hora pico ni en crisis. La accesibilidad no se negocia." },
    { icon: "shield", t: "Primero la seguridad", d: "La de pasajeros y pilotos va antes que cualquier métrica de crecimiento." },
    { icon: "users", t: "Comunidad, no carreras", d: "No movemos pasajeros: conectamos vecinos. Construimos pertenencia, no solo transacciones." },
    { icon: "rocket", t: "Enviar le gana a prometer", d: "Equipo pequeño, ejecución rápida y en orden. Hecho y funcionando > planeado y bonito." },
  ];
  return (
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Cómo pensamos</div>
          <h2 className="h2" style={{ maxWidth: 640, marginBottom: 56 }}>Nuestros valores.</h2>
        </Reveal>
        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="val-grid">
            {valores.map((v) => (
              <Tilt key={v.t} max={5}>
                <div className="card card-hover tilt" style={{ padding: 28, height: "100%" }}>
                  <IconBadge name={v.icon} size={46} />
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 16, marginBottom: 8 }}>{v.t}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>{v.d}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 880px) { .val-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ---------- DIFERENCIADORES ---------- */
function DiferenciadoresSection() {
  const difs = [
    { t: "Pana a pana, no anónimo", d: "Viajas con vecinos de tu misma ruta, no con un extraño cualquiera." },
    { t: "Precio fijo y justo, pase lo que pase", d: "Sin tarifa que sube en hora pico ni en crisis." },
    { t: "Carpooling de verdad", d: "Aprovechamos rutas que YA existen, no inventamos carreras. Más barato, más ecológico, más comunidad." },
    { t: "Karma, tu moneda de confianza", d: "Tu comportamiento construye tu reputación y tus beneficios." },
    { t: "Hecho en Venezuela, para Venezuela", d: "Pago Móvil, tasa BCV y resiliencia probada." },
  ];
  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Lo que nos hace Viaje</div>
          <h2 className="h2" style={{ maxWidth: 700, marginBottom: 56 }}>Y no otra cosa.</h2>
        </Reveal>
        <Reveal stagger>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 880 }}>
            {difs.map((d, i) => (
              <div key={d.t} className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "52px 1fr", gap: 20, alignItems: "center" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 999, background: "var(--primary-50)",
                  border: "1.5px solid var(--primary)", color: "var(--primary)",
                  display: "grid", placeItems: "center", fontWeight: 700, fontFamily: "var(--mono)", fontSize: 16,
                }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{d.t}</h3>
                  <p style={{ fontSize: 15, color: "var(--ink-3)", lineHeight: 1.55 }}>{d.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- EQUIPO ---------- */
function EquipoSection() {
  const team = [
    { ini: "LI", n: "Luis Ilarraza", role: "Director General", alma: "Marca el rumbo", d: "El propósito y el rumbo: que Viaje nunca pierda el porqué.", grad: "linear-gradient(135deg, #1E88E5, #0D47A1)" },
    { ini: "JR", n: "José Romero", role: "Director de Producto y Tecnología", alma: "Construye la app", d: "Que moverse sea simple y confiable: código, infraestructura y pagos.", grad: "linear-gradient(135deg, #4DB6AC, #00796B)" },
    { ini: "DH", n: "Daniel Herrera", role: "Director de Marketing y Comunidad", alma: "Une la cuadra", d: "La experiencia de pertenecer: marca, comunidad y crecimiento.", grad: "linear-gradient(135deg, #BA68C8, #7B1FA2)" },
  ];
  return (
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>La cuadra de Viaje</div>
          <h2 className="h2" style={{ maxWidth: 700, marginBottom: 16 }}>Quienes lo mueven.</h2>
          <p className="lede" style={{ marginBottom: 56, maxWidth: 640 }}>
            Pocos, venezolanos y de la cuadra. Cada quien mueve una parte de la experiencia diaria de millones.
          </p>
        </Reveal>
        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="team-grid">
            {team.map((m) => (
              <div key={m.n} className="card card-hover" style={{ padding: 28, display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 999, background: m.grad, color: "#fff",
                  display: "grid", placeItems: "center", fontSize: 20, fontWeight: 700, flexShrink: 0,
                  fontFamily: "var(--serif)",
                }}>{m.ini}</div>
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 3 }}>{m.n}</h3>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)" }}>{m.role}</div>
                  <div style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-3)", marginTop: 1 }}>{m.alma}</div>
                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55, marginTop: 12 }}>{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p style={{
            marginTop: 36, textAlign: "center", fontSize: 17, fontFamily: "var(--serif)",
            fontWeight: 600, color: "var(--ink-2)", fontStyle: "italic",
          }}>
            “En Viaje no movemos personas: mejoramos su día. Somos innovadores de experiencias.”
          </p>
        </Reveal>
      </div>
      <style>{`@media (max-width: 880px) { .team-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ---------- JID ---------- */
function JIDSection() {
  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Quién nos impulsa</div>
          <h2 className="h2" style={{ marginBottom: 24 }}>JID — Juventud Internacional de Desarrollo.</h2>
        </Reveal>
        <Reveal stagger>
          <div className="card jid-card" style={{ padding: 32, display: "flex", gap: 24, alignItems: "flex-start" }}>
            <IconBadge name="users" size={56} />
            <div>
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, marginBottom: 16 }}>
                Detrás de Viaje está la <strong>Asociación Civil Juventud Internacional de Desarrollo (JID)</strong>, una organización venezolana sin fines de lucro fundada en 2020 que promueve el desarrollo profesional y personal de los jóvenes del país.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, marginBottom: 16 }}>
                Viaje nace en ese mismo espíritu: un proyecto construido por jóvenes venezolanos para resolver, con tecnología, un problema real de todos los días. Creemos que el desarrollo de un país también se construye resolviendo lo cotidiano — como moverse.
              </p>
              <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 14, color: "var(--ink-3)" }}>
                <span><strong style={{ color: "var(--ink-2)" }}>RIF:</strong> J-50068009-0</span>
                <a href="https://www.instagram.com/jid_vzla/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", fontWeight: 600 }}>@jid_vzla en Instagram ↗</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 640px) { .jid-card { flex-direction: column !important; } }`}</style>
    </section>
  );
}

/* ---------- LÉXICO ---------- */
function LexicoSection() {
  const words = [
    ["Conductor", "Piloto"],
    ["Pasajero", "Copiloto"],
    ["Dar un aventón", "dar la cola"],
    ["Comunidad", "panas de ruta"],
    ["Soporte", "Vi"],
    ["Reputación", "Karma"],
    ["Primeros usuarios", "Founding"],
  ];
  return (
    <section className="sec" style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, opacity: .3, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 20% 100%, rgba(30,136,229,.4), transparent 70%)",
      }} />
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ color: "var(--primary-light)", marginBottom: 14 }}>El universo Viaje</div>
          <h2 className="h2" style={{ color: "#fff", maxWidth: 700, marginBottom: 16 }}>Hablamos en venezolano.</h2>
          <p className="lede" style={{ color: "#B8C4D6", marginBottom: 48, maxWidth: 640 }}>
            No inventamos nada: le dimos forma a algo que el venezolano lleva toda la vida haciendo — dar la cola. Solo que ahora es segura, justa y para todos.
          </p>
        </Reveal>
        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, maxWidth: 820 }} className="lex-grid">
            {words.map(([from, to]) => (
              <div key={to} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                borderRadius: 14, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
              }}>
                <span style={{ fontSize: 14, color: "#7E8FAA", textDecoration: "line-through" }}>{from}</span>
                <span style={{ color: "var(--primary-light)" }}>→</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{to}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 700px) { .lex-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ---------- CTA ---------- */
function NosotrosCTA() {
  return (
    <section className="sec">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="h2" style={{ marginBottom: 24 }}>¿Te montas en esto?</h2>
          <p className="lede" style={{ margin: "0 auto 36px" }}>Ya está disponible en Caracas. Descárgala y pide tu primer viaje, o postúlate como piloto si vas en carro al trabajo.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic><a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dnosotros_cta" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Descargar en Google Play <ArrowRight /></a></Magnetic>
            <Magnetic><a href="https://apps.apple.com/ve/app/viaje-app/id6806683135" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Descargar en App Store <ArrowRight /></a></Magnetic>
            <Magnetic><Link to="/registro-piloto" className="btn btn-outline btn-lg">Ser piloto</Link></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Nosotros = Nosotros;
