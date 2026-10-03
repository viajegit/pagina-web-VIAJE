function Home() {
  return (
    <>
      <HeroSection />
      <TickerSection />
      <StatsSection />
      <HowItWorksSection />
      <PilotsSection />
      <FeaturesSection />
      <TarifasSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}

// ─────────────── HERO ───────────────
function HeroSection() {
  return (
    <section style={{ position: "relative", padding: "80px 5vw 100px", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div className="map-grid map-grid-fade" />
      <div style={{
        position: "absolute", top: "-10%", right: "-10%", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(30,136,229,.18), transparent 60%)",
        filter: "blur(20px)", pointerEvents: "none",
      }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 64, alignItems: "center" }}>
          <div>
            <Reveal>
              <div className="h-eyebrow eyebrow">🇻🇪 Carpooling verificado · Caracas</div>
            </Reveal>
            <Reveal>
              <h1 className="h1" style={{ marginTop: 24, marginBottom: 24 }}>
                Tu ruta diariasssddas,<br />
                <span style={{ display: "inline-flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  ahora <em style={{ fontStyle: "italic", color: "var(--primary)", position: "relative" }}>compartida<RouteUnderline /></em>.
                </span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="lede" style={{ marginBottom: 36 }}>
                El carpooling que conecta tu camino al trabajo con conductores que ya pasan por ahí.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Hasta 10× más barato</strong> que un taxi, desde $0,55 por trayecto.
              </p>
            </Reveal>
            <Reveal>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <Magnetic strength={10}>
                  <a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dhome_hero" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    Descargar en Google Play <ArrowRight />
                  </a>
                </Magnetic>
                <Magnetic strength={10}>
                  <a href="https://apps.apple.com/ve/app/viaje-app/id6806683135" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    Descargar en App Store <ArrowRight />
                  </a>
                </Magnetic>
                <Magnetic strength={6}>
                  <Link to="/registro-piloto" className="btn btn-outline btn-lg">
                    Quiero ser piloto
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
            <Reveal stagger>
              <div style={{ display: "flex", gap: 24, marginTop: 44, flexWrap: "wrap" }}>
                {[
                  ["Verificación de pilotos", "🛡️"],
                  ["Match en segundos", "⏱️"],
                  ["Tracking GPS en vivo", "📍"],
                ].map(([label, ic]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}>
                    <span style={{ fontSize: 16 }}>{ic}</span>{label}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="hero-right" style={{ position: "relative", display: "grid", placeItems: "center" }}>
            <HeroMap />
            <div style={{ position: "absolute", bottom: -40, right: -10, zIndex: 3, display: "none" }} className="hero-phone-show">
              <PhoneMock />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function RouteUnderline() {
  return (
    <svg viewBox="0 0 280 14" style={{ position: "absolute", left: 0, right: 0, bottom: -10, width: "100%", height: 14, overflow: "visible" }} preserveAspectRatio="none">
      <path d="M 4 10 C 60 2, 120 14, 180 6 S 260 2, 276 8" stroke="var(--primary)" strokeWidth="3" fill="none" strokeLinecap="round" pathLength="100"
        style={{ strokeDasharray: 100, strokeDashoffset: 100, animation: "drawLine 1.6s var(--ease) .6s forwards" }} />
      <style>{`@keyframes drawLine { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}

// ─────────────── TICKER ───────────────
function TickerSection() {
  const routes = [
    "El Paraíso → Chacao · $0,55",
    "Sabana Grande → Altamira · $0,55",
    "Catia → Plaza Venezuela · $0,55",
    "Caracas → Petare · $1,10",
    "La Urbina → Las Mercedes · $0,55",
    "El Valle → La Castellana · $0,55",
    "Los Palos Grandes → Chacao · $0,55",
    "Caracas → Los Teques · $3,30",
  ];
  const items = [...routes, ...routes];
  return (
    <section style={{ padding: "32px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--bg-soft)" }}>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((r, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-2)",
              fontWeight: 500,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--primary)" }} />
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────── STATS ───────────────
function StatsSection() {
  const stats = [
    { v: 0.55, prefix: "$", decimals: 2, label: "por trayecto", note: "10× más barato que un taxi" },
    { v: 10, suffix: "×", label: "más barato", note: "vs otras apps, taxis" },
    { v: 450, prefix: "$", label: "al mes", note: "ganancia máxima piloto" },
    { v: 3, label: "pasajeros máx", note: "por cada viaje compartido" },
  ];
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Los números</div>
          <h2 className="h2" style={{ maxWidth: 720, marginBottom: 60 }}>Lo que pagas, lo que ganas, lo que ahorras.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--line)" }}
          className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={i} as="div"
              style={{
                background: "var(--surface)", padding: "32px 28px",
                display: "flex", flexDirection: "column", gap: 6,
                minHeight: 180,
              }}>
              <div className="display" style={{ fontSize: 64, color: "var(--primary)", lineHeight: 1, fontFamily: "var(--serif)" }}>
                <CountUp to={s.v} decimals={s.decimals || 0} prefix={s.prefix || ""} suffix={s.suffix || ""} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{s.note}</div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 880px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

// ─────────────── HOW IT WORKS (Apple-style scroll) ───────────────
function HowItWorksSection() {
  const ref = React.useRef(null);
  const prog = useScrollProgress(ref);
  const steps = [
    {
      n: "01", t: "Configura tu ruta",
      d: "Pones tu casa y tu trabajo una vez. Eliges horario. Lo guardamos por 6 meses y olvídate.",
      img: <StepRoute />,
    },
    {
      n: "02", t: "Busca pilotos cerca",
      d: "Te mostramos conductores que pasan por tu zona, en tu horario. Ves su foto, vehículo y rating.",
      img: <StepMatch />,
    },
    {
      n: "03", t: "Paga y viaja",
      d: "Pagas con tu saldo VIP, recargado al instante. Tracking GPS en vivo. Botón de emergencia siempre listo.",
      img: <StepRide />,
    },
  ];
  // Determine active step based on scroll
  const active = Math.min(2, Math.floor(prog * 3.4));

  return (
    <section ref={ref} className="sec" style={{ background: "var(--ink)", color: "#fff", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .35, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 20% 30%, rgba(30,136,229,.35), transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .25, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(100,181,246,.3), transparent 70%)" }} />
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ color: "var(--primary-light)", marginBottom: 14 }}>Cómo funciona</div>
          <h2 className="h2" style={{ color: "#fff", maxWidth: 760, marginBottom: 80 }}>Tres pasos. Sin enredos.</h2>
        </Reveal>

        {/* DESKTOP: layout sticky con animación tipo Apple */}
        <div className="how-desktop" style={{ gridTemplateColumns: ".9fr 1.1fr", gap: 80, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 120, height: "60vh", display: "grid", placeItems: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 460, aspectRatio: "1/1" }}>
              {steps.map((s, i) => (
                <div key={i} style={{
                  position: "absolute", inset: 0,
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1) translateY(0)" : i < active ? "scale(.9) translateY(-30px)" : "scale(.9) translateY(30px)",
                  transition: "all .7s var(--ease)",
                }}>
                  {s.img}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                padding: 36, borderRadius: "var(--r-xl)",
                background: i === active ? "rgba(30,136,229,.15)" : "rgba(255,255,255,.03)",
                border: i === active ? "1px solid rgba(100,181,246,.4)" : "1px solid rgba(255,255,255,.06)",
                transition: "all .5s var(--ease)",
                transform: i === active ? "scale(1)" : "scale(.98)",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 14 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--primary-light)", letterSpacing: ".1em" }}>{s.n}</span>
                  <h3 className="h3" style={{ color: "#fff" }}>{s.t}</h3>
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "#B8C4D6", maxWidth: 520 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE: cada paso con su imagen propia, sin sticky ni active state */}
        <div className="how-mobile" style={{ flexDirection: "column", gap: 40 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: 24, borderRadius: "var(--r-xl)",
              background: "rgba(30,136,229,.12)",
              border: "1px solid rgba(100,181,246,.25)",
            }}>
              <div style={{ width: "100%", aspectRatio: "1/1", maxHeight: 320, display: "grid", placeItems: "center", marginBottom: 20 }}>
                {s.img}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--primary-light)", letterSpacing: ".1em" }}>{s.n}</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{s.t}</h3>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "#B8C4D6", margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .how-desktop { display: none !important; }
          .how-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}

function StepRoute() {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "var(--r-2xl)",
      background: "linear-gradient(160deg, #1565C0 0%, #0D47A1 100%)",
      padding: 32, position: "relative", overflow: "hidden",
      boxShadow: "0 30px 80px -20px rgba(13,71,161,.5)",
    }}>
      <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="sgrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#sgrid)" />
        <path d="M 60 320 L 60 200 L 200 200 L 200 80 L 340 80" stroke="rgba(255,255,255,.2)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <g>
          <circle cx="60" cy="320" r="14" fill="#22C55E" stroke="#fff" strokeWidth="3" />
          <text x="80" y="324" fill="#fff" fontSize="12" fontFamily="var(--mono)" fontWeight="600">CASA</text>
        </g>
        <g>
          <circle cx="340" cy="80" r="14" fill="#1E88E5" stroke="#fff" strokeWidth="3" />
          <text x="260" y="68" fill="#fff" fontSize="12" fontFamily="var(--mono)" fontWeight="600">TRABAJO</text>
        </g>
      </svg>
      <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, padding: 14, borderRadius: 16, background: "rgba(255,255,255,.1)", backdropFilter: "blur(10px)", color: "#fff" }}>
        <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "#90CAF9", textTransform: "uppercase", letterSpacing: ".12em" }}>Horario guardado</div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>L–V · 7:30am ida · 6:00pm vuelta</div>
      </div>
    </div>
  );
}

function StepMatch() {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "var(--r-2xl)",
      background: "linear-gradient(160deg, #1976D2 0%, #1565C0 100%)",
      padding: 32, display: "flex", flexDirection: "column", gap: 12,
      boxShadow: "0 30px 80px -20px rgba(13,71,161,.5)",
    }}>
      <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#90CAF9", textTransform: "uppercase", letterSpacing: ".12em" }}>3 pilotos cerca de ti</div>
      {[
        { n: "Rafael G.", c: "Toyota Corolla", r: "★ 4.92", t: "8 min", price: "$0,55" },
        { n: "Carla M.", c: "Chevrolet Aveo", r: "★ 4.88", t: "12 min", price: "$0,55" },
        { n: "Luis P.", c: "Ford Fiesta", r: "★ 4.97", t: "15 min", price: "$0,55" },
      ].map((p, i) => (
        <div key={i} style={{
          padding: 14, borderRadius: 14, background: "rgba(255,255,255,.95)",
          display: "flex", alignItems: "center", gap: 12,
          animation: `slideIn .5s var(--ease) ${i * .15}s both`,
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 999,
            background: ["linear-gradient(135deg, #FFB74D, #F57C00)", "linear-gradient(135deg, #BA68C8, #7B1FA2)", "linear-gradient(135deg, #4DB6AC, #00796B)"][i],
            display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>
            {p.n.split(" ").map(x => x[0]).join("")}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{p.n}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.c} · {p.r}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{p.price}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.t}</div>
          </div>
        </div>
      ))}
      <style>{`@keyframes slideIn { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform: none } }`}</style>
    </div>
  );
}

function StepRide() {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "var(--r-2xl)",
      background: "linear-gradient(160deg, #2196F3 0%, #1565C0 100%)",
      padding: 32, position: "relative", overflow: "hidden",
      boxShadow: "0 30px 80px -20px rgba(13,71,161,.5)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#90CAF9", textTransform: "uppercase", letterSpacing: ".12em" }}>En camino · ETA 6 min</div>
        <div style={{ marginTop: 16, padding: 18, borderRadius: 16, background: "rgba(255,255,255,.95)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: "linear-gradient(135deg, #FFB74D, #F57C00)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>RG</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Rafael G.</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Toyota Corolla · AB123CD</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ padding: "6px 10px", borderRadius: 8, background: "var(--bg-soft)", fontSize: 11, fontWeight: 600 }}>Chat</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,.12)", color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>💳</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Saldo VIP</div>
          <div style={{ fontSize: 11, opacity: .85 }}>Recarga al instante, paga sin efectivo</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────── PILOTS ───────────────
function PilotsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
          className="split-grid">
          <Reveal>
            <div>
              <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Para conductores</div>
              <h2 className="h2" style={{ marginBottom: 24 }}>
                Convierte tu ruta diaria en <em style={{ color: "var(--primary)", fontStyle: "italic" }}>ingresos</em>.
              </h2>
              <p className="lede" style={{ marginBottom: 32 }}>
                ¿Vas todos los días en carro al trabajo? Lleva hasta 3 personas que van por tu misma ruta y gana entre $60 y $450 al mes sin desviarte un metro.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {[
                  ["Sin filas, sin esperar carreras lejanas", "✓"],
                  ["Tú decides cuándo publicar tu ruta", "✓"],
                  ["Cobro automático al final del mes", "✓"],
                  ["Verificación gratuita en 24–48h", "✓"],
                ].map(([t, ic]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 999, background: "var(--green-bg)", color: "var(--green)",
                      display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700,
                    }}>{ic}</span>
                    <span style={{ fontSize: 15, color: "var(--ink-2)" }}>{t}</span>
                  </div>
                ))}
              </div>
              <Magnetic>
                <Link to="/registro-piloto" className="btn btn-primary btn-lg">Postularme como piloto <ArrowRight /></Link>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal>
            <div style={{
              position: "relative", borderRadius: "var(--r-2xl)", overflow: "hidden",
              boxShadow: "var(--shadow-lg)", border: "1px solid var(--line-2)",
              aspectRatio: "4 / 3", background: "#0a1322",
            }}>
              <iframe
                src="/demo-pilotos"
                title="Maneja con Viaje — escena 3D"
                loading="lazy"
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width: 980px) { .split-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}

function EarningsCard() {
  const [trips, setTrips] = React.useState(0);
  const [, inView] = useReveal(0.3);
  const ref = React.useRef(null);
  const [seenView, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (!seenView) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTrips(i);
      if (i >= 12) { clearInterval(iv); setTimeout(() => { setTrips(0); }, 1200); }
    }, 220);
    return () => clearInterval(iv);
  }, [seenView]);

  const perTrip = 0.55 * 0.90; // commission cut
  const total = (trips * perTrip).toFixed(2);

  return (
    <div ref={ref} style={{
      position: "relative",
      padding: 36, borderRadius: "var(--r-2xl)",
      background: "linear-gradient(160deg, #fff 0%, #F0F6FE 100%)",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--line-2)",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: .5, pointerEvents: "none" }}>
        <svg viewBox="0 0 500 400" style={{ width: "100%", height: "100%" }}>
          <path d="M 0 320 C 80 280, 160 300, 220 240 S 360 180, 500 120" stroke="rgba(30,136,229,.15)" strokeWidth="2" fill="none" />
          <path d="M 0 280 C 100 260, 180 200, 280 200 S 420 160, 500 80" stroke="rgba(30,136,229,.1)" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div className="eyebrow">Hoy · Lunes</div>
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", padding: "4px 10px", borderRadius: 999, background: "var(--green-bg)", color: "var(--green)" }}>
            <span className="pulse-dot" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6, width: 6, height: 6 }} /> En línea
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 16 }}>
          <div className="display tabular" style={{ fontSize: 80, color: "var(--primary)", fontFamily: "var(--serif)" }}>
            ${total}
          </div>
        </div>
        <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 28 }}>Ganancia simulada hoy</div>

        {/* Trip dots */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 14, height: 36, borderRadius: 6,
              background: i < trips ? "linear-gradient(180deg, var(--primary), var(--primary-dark))" : "var(--line)",
              transition: "background .3s",
              transform: i < trips ? "scaleY(1)" : "scaleY(.6)",
              transformOrigin: "bottom",
            }} />
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            ["Viajes", trips],
            ["Pasajeros", trips * 2],
            ["Km", (trips * 7.4).toFixed(0)],
          ].map(([l, v]) => (
            <div key={l} style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,.6)", border: "1px solid var(--line-2)" }}>
              <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{l}</div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--serif)", color: "var(--ink)" }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 14, borderRadius: 14, background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 32, height: 32, borderRadius: 999, background: "var(--green)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>↑</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Proyección mensual: $89 – $450</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Depende de qué tan seguido publiques tu ruta.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────── FEATURES ───────────────
function FeaturesSection() {
  const features = [
    {
      ic: "🌟",
      t: "Karma points",
      d: "Gana puntos cada viaje, califica bien y ayuda a tu comunidad. Sube de tier (Pana, Chévere, Maestro) y desbloquea beneficios reales.",
      tag: "Comunidad",
    },
    {
      ic: "🌙",
      t: "Modo nocturno seguro",
      d: "De 10pm a 5am la app pide código de confirmación al subir, comparte tu viaje en vivo con un contacto de emergencia y bloquea publicar viajes a pasajeros sin verificación reciente.",
      tag: "Seguridad",
    },
    {
      ic: "📸",
      t: "Foto del destino",
      d: "Al llegar, el pasajero sube una foto del lugar donde lo dejaron. Queda como prueba de finalización y como capa extra de tranquilidad para sus contactos.",
      tag: "Seguridad",
    },
    {
      ic: "🔍",
      t: "Verificación Truora",
      d: "Cruzamos cada piloto con Truora — el servicio que validan los bancos venezolanos para confirmar identidad y antecedentes. Cédula, biometría facial y récord antes de aprobar.",
      tag: "Verificación",
    },
    {
      ic: "👁️",
      t: "Modo Senior",
      d: "Tipografía 2× más grande, botones extra grandes, sin animaciones. La app entera se reconfigura para que tus abuelos puedan usarla sin ayuda.",
      tag: "Accesibilidad",
    },
    {
      ic: "📡",
      t: "Tracking GPS en vivo",
      d: "Mientras el viaje está activo, la ubicación del piloto se transmite cada pocos segundos. Tu familia puede ver en tiempo real dónde vas, sin instalarse la app.",
      tag: "Seguridad",
    },
  ];

  return (
    <section className="sec" style={{ background: "var(--bg-soft)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .5, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(30,136,229,.10), transparent 70%)" }} />
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Lo que nos hace distintos</div>
          <h2 className="h2" style={{ maxWidth: 760, marginBottom: 18 }}>
            Más que un viaje. <em style={{ color: "var(--primary)", fontStyle: "italic" }}>Una comunidad.</em>
          </h2>
          <p className="lede" style={{ maxWidth: 680, marginBottom: 56 }}>
            Construimos cada función pensando en la realidad venezolana — desde cómo viajan los adultos mayores hasta cómo proteger a quien sale del trabajo a las 11pm.
          </p>
        </Reveal>

        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="feat-grid">
            {features.map((f) => (
              <Tilt key={f.t} max={5}>
                <div className="card card-hover tilt" style={{ padding: 28, height: "100%", position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    fontSize: 10, fontFamily: "var(--mono)", letterSpacing: ".1em", textTransform: "uppercase",
                    padding: "4px 10px", borderRadius: 999,
                    background: "var(--primary-50)", color: "var(--primary)",
                  }}>{f.tag}</div>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{f.ic}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{f.t}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>{f.d}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>

        {/* Bullet menor: verificación de docs */}
        <Reveal>
          <div style={{
            marginTop: 40, padding: "18px 24px", borderRadius: 14,
            background: "var(--surface)", border: "1px solid var(--line-2)",
            display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
          }}>
            <span style={{ fontSize: 18 }}>✓</span>
            <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
              <b style={{ color: "var(--ink)" }}>Verificación obligatoria.</b> Ningún piloto publica viajes sin tener cédula, licencia, RIF y carnet de circulación verificados. Sin excepciones.
            </span>
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 880px) { .feat-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─────────────── TARIFAS PREVIEW ───────────────
function TarifasSection() {
  const competitors = [
    { name: "Viaje", price: "$0,55", val: 0.55, brand: true },
    { name: "Apps de transporte por demanda", price: "$3–5", val: 4 },
    { name: "Taxi tradicional", price: "$5–8", val: 6.5 },
  ];
  const max = 8;
  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Tarifas</div>
          <h2 className="h2" style={{ marginBottom: 24, maxWidth: 720 }}>
            Mismo trayecto. Diferencia <em style={{ color: "var(--primary)", fontStyle: "italic" }}>real</em>.
          </h2>
          <p className="lede" style={{ marginBottom: 60 }}>El Paraíso → Chacao. Esto es lo que pagarías hoy mismo en cada servicio.</p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {competitors.map((c, i) => (
            <CompetitorRow key={c.name} {...c} max={max} delay={i * 150} />
          ))}
        </div>

        <Reveal>
          <div style={{ display: "flex", gap: 14, marginTop: 56, flexWrap: "wrap" }}>
            <Magnetic>
              <Link to="/tarifas" className="btn btn-primary btn-lg">Ver planes completos <ArrowRight /></Link>
            </Magnetic>
            <span style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center" }}>
              Pago en efectivo, Pago Móvil o saldo VIP · Tasa BCV automática
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CompetitorRow({ name, price, val, brand, max, delay }) {
  const [ref, inView] = useReveal(0.3);
  const w = (val / max) * 100;
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "160px 1fr 100px", alignItems: "center", gap: 20,
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(12px)",
      transition: `opacity .6s var(--ease) ${delay}ms, transform .6s var(--ease) ${delay}ms`,
    }} className="comp-row">
      <div style={{ fontSize: 16, fontWeight: brand ? 800 : 600, color: brand ? "var(--primary)" : "var(--ink-2)", display: "flex", alignItems: "center", gap: 8 }}>
        {brand && <Mark size={22} />}
        {name}
      </div>
      <div style={{ position: "relative", height: 44, background: "var(--line-2)", borderRadius: 22, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: inView ? `${w}%` : "0%",
          background: brand
            ? "linear-gradient(90deg, #22C55E 0%, #1E88E5 100%)"
            : "linear-gradient(90deg, #E5EAF2 0%, #C8D3E5 100%)",
          borderRadius: 22,
          transition: `width 1.1s var(--ease) ${delay + 200}ms`,
          position: "relative",
        }}>
          {brand && (
            <div style={{
              position: "absolute", inset: 0, opacity: .6,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,.6), transparent)",
              animation: "shimmer 2.5s linear infinite",
              borderRadius: 22,
            }} />
          )}
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: brand ? "var(--primary)" : "var(--ink-2)", textAlign: "right", fontFamily: "var(--serif)" }}>
        {price}
      </div>
      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @media (max-width: 700px) {
          .comp-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────── FAQ ───────────────
function FAQSection() {
  const faqs = [
    { q: "¿Es un servicio de taxi?", a: "No. Viaje es transporte colaborativo: el piloto ya iba a hacer ese trayecto y se lleva a alguien que va en su misma dirección. No hay carreras ni desvíos." },
    { q: "¿Cómo pago?", a: "Tres opciones: efectivo (en Bs o USD al final del viaje), Pago Móvil con validación automática de la referencia, o saldo VIP (wallet recargable con Pago Móvil)." },
    { q: "¿Cómo me convierto en piloto?", a: "Llenas el formulario en /pilotos con tus datos, los del vehículo y subes tus documentos. Validamos identidad, licencia y antecedentes en 24–48h." },
    { q: "¿Es seguro?", a: "Todos los pilotos pasan verificación. Cada viaje tiene tracking GPS en vivo, botón de emergencia conectado con soporte y autoridades, y calificación mutua." },
    { q: "¿Funciona fuera de Caracas?", a: "Por ahora lanzamos en Caracas, Distrito Capital y zonas cercanas (Los Teques, Guarenas, La Guaira). Otras ciudades en 2026." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="sec">
      <div className="wrap-narrow">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>FAQ</div>
          <h2 className="h2" style={{ marginBottom: 48 }}>Preguntas frecuentes.</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderRadius: "var(--r-md)",
                background: isOpen ? "var(--bg-soft)" : "transparent",
                border: "1px solid " + (isOpen ? "var(--line)" : "transparent"),
                transition: "background .3s, border-color .3s",
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{ width: "100%", padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left" }}>
                  <span style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>{f.q}</span>
                  <span style={{
                    width: 32, height: 32, borderRadius: 999,
                    background: isOpen ? "var(--primary)" : "var(--line-2)",
                    color: isOpen ? "#fff" : "var(--ink-3)",
                    display: "grid", placeItems: "center", flexShrink: 0,
                    transition: "all .3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 200 : 0,
                  overflow: "hidden",
                  transition: "max-height .5s var(--ease)",
                }}>
                  <p style={{ padding: "0 24px 24px", fontSize: 15, color: "var(--ink-3)", lineHeight: 1.6 }}>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal>
          <div style={{
            marginTop: 36, padding: "26px 28px", borderRadius: "var(--r-md)",
            background: "var(--bg-soft)", border: "1px solid var(--line)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 18, flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>¿Te quedó otra duda?</div>
              <div style={{ fontSize: 14.5, color: "var(--ink-3)", marginTop: 4 }}>Vi, nuestra asesora, te responde al instante. 💬</div>
            </div>
            <button onClick={() => window.dispatchEvent(new Event("open-vi"))}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--primary)", color: "#fff", border: "none",
                borderRadius: 999, padding: "13px 22px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", boxShadow: "0 8px 24px rgba(2,128,249,.3)",
              }}>
              💬 Habla con un asesor
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────── FINAL CTA ───────────────
function FinalCTASection() {
  return (
    <section style={{ padding: "140px 5vw", background: "linear-gradient(160deg, #0D47A1 0%, #1565C0 50%, #1E88E5 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Background route */}
      <svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .3 }}>
        <defs>
          <linearGradient id="ctagrad" x1="0" x2="1">
            <stop offset="0" stopColor="#64B5F6" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".6" />
            <stop offset="1" stopColor="#64B5F6" stopOpacity="0" />
          </linearGradient>
          <pattern id="ctaGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1400" height="600" fill="url(#ctaGrid)" />
        <path d="M 0 400 C 280 320, 560 480, 840 360 S 1200 240, 1400 320" stroke="url(#ctagrad)" strokeWidth="3" fill="none" />
        <path d="M 0 500 C 200 460, 500 540, 800 500 S 1200 460, 1400 480" stroke="url(#ctagrad)" strokeWidth="2" fill="none" />
      </svg>
      <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ color: "#90CAF9", justifyContent: "center", display: "inline-flex" }}>Ya disponible en Caracas</div>
        </Reveal>
        <Reveal>
          <h2 className="h2" style={{ color: "#fff", marginTop: 24, marginBottom: 32, fontSize: "clamp(40px, 6vw, 88px)" }}>
            Sé de los <em style={{ fontStyle: "italic", color: "#90CAF9" }}>primeros</em><br />en usar Viaje.
          </h2>
        </Reveal>
        <Reveal>
          <p style={{ fontSize: 18, color: "#C8D3E5", maxWidth: 580, margin: "0 auto 40px" }}>
            Descárgala ahora y pide tu primer viaje hoy mismo. Si vas en carro al trabajo, también puedes postularte como piloto.
          </p>
        </Reveal>
        <Reveal>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic strength={12}>
              <a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dhome_bottom" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{ background: "#fff", color: "var(--primary-dark)" }}>
                Descargar en Google Play <ArrowRight />
              </a>
            </Magnetic>
            <Magnetic strength={12}>
              <a href="https://apps.apple.com/ve/app/viaje-app/id6806683135" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{ background: "#fff", color: "var(--primary-dark)" }}>
                Descargar en App Store <ArrowRight />
              </a>
            </Magnetic>
            <Magnetic strength={6}>
              <Link to="/registro-piloto" className="btn btn-lg" style={{ background: "rgba(255,255,255,.1)", color: "#fff", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.3)" }}>
                Quiero ser piloto
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Home = Home;
