function ComoFunciona() {
  return (
    <>
      <CFHero />
      <PassengerFlow />
      <PilotFlow />
      <IncludedSection />
      <CFCTASection />
    </>
  );
}

function CFHero() {
  return (
    <section style={{ position: "relative", padding: "100px 5vw 80px", overflow: "hidden" }}>
      <div className="map-grid map-grid-fade" />
      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Cómo funciona el carpooling · Caracas</div>
          <h1 className="h1" style={{ marginTop: 24, marginBottom: 24, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
            Así es como <em style={{ color: "var(--primary)", fontStyle: "italic" }}>viajas</em><br />o <em style={{ color: "var(--primary)", fontStyle: "italic" }}>ganas</em>.
          </h1>
          <p className="lede" style={{ margin: "0 auto" }}>
            Dos flujos. Uno para pasajeros, otro para pilotos. Sin enredos, sin sorpresas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FlowSection({ tag, title, intro, steps, accent = "primary", inverted = false }) {
  return (
    <section className="sec" style={{ background: inverted ? "var(--ink)" : "var(--bg)", color: inverted ? "#fff" : "var(--ink)", position: "relative", overflow: "hidden" }}>
      {inverted && (
        <div style={{ position: "absolute", inset: 0, opacity: .35, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(30,136,229,.35), transparent 70%)" }} />
      )}
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ color: inverted ? "var(--primary-light)" : "var(--primary)", marginBottom: 14 }}>{tag}</div>
          <h2 className="h2" style={{ color: inverted ? "#fff" : "var(--ink)", maxWidth: 760, marginBottom: 16 }}>{title}</h2>
          <p className="lede" style={{ color: inverted ? "#B8C4D6" : "var(--ink-3)", marginBottom: 60, maxWidth: 640 }}>{intro}</p>
        </Reveal>
        <div style={{ position: "relative" }}>
          {/* Vertical connecting line */}
          <div style={{
            position: "absolute", left: 27, top: 40, bottom: 40, width: 2,
            background: inverted ? "linear-gradient(180deg, rgba(100,181,246,.4), rgba(100,181,246,.05))" : "linear-gradient(180deg, var(--primary-50), var(--bg))",
          }} className="flow-line" />
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {steps.map((s, i) => <FlowStep key={i} {...s} num={i+1} inverted={inverted} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowStep({ num, t, d, vis, inverted }) {
  const [ref, inView] = useReveal(0.2);
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "56px 1fr 1.1fr", gap: 32, alignItems: "start",
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
      transition: "opacity .7s var(--ease), transform .7s var(--ease)",
    }} className="flow-step">
      <div style={{
        width: 56, height: 56, borderRadius: 999,
        background: inverted ? "rgba(30,136,229,.2)" : "var(--primary-50)",
        border: inverted ? "1.5px solid rgba(100,181,246,.4)" : "1.5px solid var(--primary)",
        color: inverted ? "#fff" : "var(--primary)",
        display: "grid", placeItems: "center", fontWeight: 700, fontFamily: "var(--mono)", fontSize: 16,
        position: "relative", zIndex: 2,
      }}>{String(num).padStart(2, "0")}</div>
      <div style={{ paddingTop: 8 }}>
        <h3 className="h3" style={{ color: inverted ? "#fff" : "var(--ink)", marginBottom: 10 }}>{t}</h3>
        <p style={{ fontSize: 16, color: inverted ? "#B8C4D6" : "var(--ink-3)", lineHeight: 1.6, maxWidth: 480 }}>{d}</p>
      </div>
      <div>{vis}</div>
    </div>
  );
}

function PassengerFlow() {
  const steps = [
    {
      t: "Configuras tu ruta",
      d: "Pones casa y trabajo, eliges horario de entrada y salida. Lo guardas y olvídate por 6 meses.",
      vis: <MiniMapVis variant="route" />,
    },
    {
      t: "Buscas pilotos",
      d: "La app te muestra pilotos disponibles en tu zona, su ruta y el horario en el que pasan.",
      vis: <MiniListVis />,
    },
    {
      t: "Solicitas el viaje",
      d: "Eliges piloto, ves su foto y vehículo, y mandas la solicitud. El piloto confirma en segundos.",
      vis: <MiniConfirmVis />,
    },
    {
      t: "Pagas y viajas",
      d: "Pagas con tu saldo VIP, recargado al instante. Tracking GPS en vivo, botón de emergencia siempre listo.",
      vis: <MiniPayVis />,
    },
  ];
  return <FlowSection tag="Flujo del pasajero" title="Cómo viaja un pasajero" intro="Solo necesitas saber a dónde vas. Viaje busca pilotos que pasen por tu zona en tu horario." steps={steps} />;
}

function PilotFlow() {
  const steps = [
    {
      t: "Te postulas",
      d: "Llenas el formulario con tus datos, los del vehículo y subes tus documentos.",
      vis: <MiniDocsVis />,
    },
    {
      t: "Verificación 24–48h",
      d: "Validamos tu identidad, licencia y antecedentes. Te avisamos por correo y WhatsApp cuando estás dentro.",
      vis: <MiniVerifyVis />,
    },
    {
      t: "Publicas tu ruta",
      d: "Subes tu ruta diaria y horario. Los pasajeros cercanos te encuentran automáticamente.",
      vis: <MiniMapVis variant="dark" />,
    },
    {
      t: "Cobras automático",
      d: "Cada viernes recibes tus ganancias por transferencia, sin que tengas que hacer nada.",
      vis: <MiniEarnVis />,
    },
  ];
  return <FlowSection tag="Flujo del piloto" title="Cómo gana un piloto" intro="Tú ya vas todos los días al trabajo. Lleva pasajeros que van por tu misma ruta y gana extra sin desviarte un metro." steps={steps} inverted />;
}

function MiniMapVis({ variant }) {
  const dark = variant === "dark";
  return (
    <div style={{
      width: "100%", height: 220, borderRadius: 18, overflow: "hidden",
      background: dark ? "linear-gradient(160deg, #1565C0, #0D47A1)" : "linear-gradient(160deg, #F0F6FE, #DCEAFA)",
      position: "relative",
    }}>
      <svg viewBox="0 0 400 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id={"mv" + (dark ? "d" : "l")} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={dark ? "rgba(255,255,255,.08)" : "rgba(30,136,229,.1)"} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="220" fill={"url(#mv" + (dark ? "d" : "l") + ")"} />
        <path d="M 40 180 C 100 160, 160 140, 220 110 S 340 60, 380 40"
          stroke={dark ? "#64B5F6" : "#1E88E5"} strokeWidth="3" fill="none" strokeLinecap="round"
          pathLength="100" style={{ strokeDasharray: 100, strokeDashoffset: 100, animation: "drawLine 1.8s var(--ease) .2s forwards" }}
        />
        <circle cx="40" cy="180" r="7" fill="#22C55E" stroke="#fff" strokeWidth="2.5" />
        <circle cx="380" cy="40" r="7" fill="#1E88E5" stroke="#fff" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

function MiniListVis() {
  return (
    <div style={{ padding: 18, borderRadius: 18, background: "var(--surface)", boxShadow: "var(--shadow-md)", border: "1px solid var(--line-2)", display: "flex", flexDirection: "column", gap: 10 }}>
      {[["RG", "Rafael G.", "★ 4.92", "8 min"], ["CM", "Carla M.", "★ 4.88", "12 min"], ["LP", "Luis P.", "★ 4.97", "15 min"]].map(([i, n, r, t], idx) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, borderRadius: 12, background: "var(--bg-soft)" }}>
          <div style={{ width: 34, height: 34, borderRadius: 999, background: ["linear-gradient(135deg, #FFB74D, #F57C00)", "linear-gradient(135deg, #BA68C8, #7B1FA2)", "linear-gradient(135deg, #4DB6AC, #00796B)"][idx], color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>{i}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{n}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{r} · {t}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>$0,55</div>
        </div>
      ))}
    </div>
  );
}

function MiniConfirmVis() {
  return (
    <div style={{ padding: 22, borderRadius: 18, background: "var(--surface)", boxShadow: "var(--shadow-md)", border: "1px solid var(--line-2)", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--green)", letterSpacing: ".1em", textTransform: "uppercase" }}>✓ Confirmado en 4 seg</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 999, background: "linear-gradient(135deg, #FFB74D, #F57C00)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>RG</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Rafael G.</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Toyota Corolla blanco · AB123CD</div>
        </div>
      </div>
      <div style={{ padding: "12px 14px", borderRadius: 12, background: "var(--bg-soft)", fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Chacao</span><span style={{ color: "var(--muted)", fontFamily: "var(--mono)" }}>7:38am</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}><span>Altamira</span><span style={{ color: "var(--muted)", fontFamily: "var(--mono)" }}>7:52am</span></div>
      </div>
    </div>
  );
}

function MiniPayVis() {
  return (
    <div style={{ padding: 22, borderRadius: 18, background: "var(--surface)", boxShadow: "var(--shadow-md)", border: "1px solid var(--line-2)" }}>
      <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Métodos de pago</div>
      <div style={{ padding: 16, borderRadius: 14, background: "var(--bg-soft)", display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
        <div style={{ fontSize: 26 }}>💳</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Saldo VIP</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Recarga al instante, paga sin efectivo</div>
        </div>
      </div>
      <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", fontSize: 12, color: "var(--ink-2)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 18, height: 18, borderRadius: 999, background: "var(--green)", color: "#fff", display: "grid", placeItems: "center", fontSize: 10 }}>✓</span>
        Tasa BCV calculada automáticamente
      </div>
    </div>
  );
}

function MiniDocsVis() {
  return (
    <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#fff" }}>
      <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#90CAF9", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Documentos</div>
      {["Cédula", "Licencia vigente", "Carnet de circulación", "Foto del vehículo"].map((d, i) => (
        <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
          <span style={{ fontSize: 13 }}>{d}</span>
          <span style={{ width: 18, height: 18, borderRadius: 999, background: i < 3 ? "rgba(34,197,94,.2)" : "rgba(255,255,255,.06)", color: i < 3 ? "#22C55E" : "#7E8FAA", display: "grid", placeItems: "center", fontSize: 10 }}>{i < 3 ? "✓" : "⋯"}</span>
        </div>
      ))}
    </div>
  );
}

function MiniVerifyVis() {
  return (
    <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#fff" }}>
      <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#90CAF9", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16 }}>Estado · 18h restantes</div>
      <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,.08)", borderRadius: 999, overflow: "hidden", marginBottom: 18 }}>
        <div style={{ position: "absolute", inset: 0, width: "65%", background: "linear-gradient(90deg, #22C55E, #1E88E5)", borderRadius: 999 }} />
      </div>
      {[["Identidad", true], ["Licencia", true], ["Antecedentes", false], ["Vehículo", false]].map(([t, ok]) => (
        <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", fontSize: 13 }}>
          <span>{t}</span>
          <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 999, background: ok ? "rgba(34,197,94,.15)" : "rgba(245,158,11,.15)", color: ok ? "#22C55E" : "#F59E0B" }}>{ok ? "Aprobado" : "En revisión"}</span>
        </div>
      ))}
    </div>
  );
}

function MiniEarnVis() {
  return (
    <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#fff" }}>
      <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#90CAF9", letterSpacing: ".1em", textTransform: "uppercase" }}>Este mes</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
        <div className="tabular" style={{ fontSize: 48, fontFamily: "var(--serif)", color: "#fff" }}>$184,30</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 16, height: 50, alignItems: "flex-end" }}>
        {[20, 35, 28, 50, 38, 60, 80, 65, 90, 75, 100, 88, 95].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 12 ? "var(--primary-light)" : "rgba(100,181,246,.4)", borderRadius: 3 }} />
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: "#90CAF9" }}>+18% vs mes pasado</div>
    </div>
  );
}

function IncludedSection() {
  const features = [
    { ic: "🛰️", t: "Tracking GPS en vivo", d: "Ves la ubicación del piloto desde que confirma hasta que llegas." },
    { ic: "🆘", t: "Botón de emergencia", d: "Un toque y se activa contacto con soporte y autoridades." },
    { ic: "⭐", t: "Calificación mutua", d: "Pasajeros y pilotos se califican. Mantiene la comunidad sana." },
    { ic: "💱", t: "Tasa BCV automática", d: "Pagas en USD, ves equivalente en Bs en tiempo real." },
    { ic: "🔔", t: "Notificaciones live", d: "Te avisamos cuando tu piloto está a 2 minutos de llegar." },
    { ic: "🛡️", t: "Verificación gratuita", d: "Identidad, licencia y antecedentes validados antes de operar." },
  ];
  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Lo que viene incluido</div>
          <h2 className="h2" style={{ maxWidth: 720, marginBottom: 60 }}>Seguridad y experiencia, en cada viaje.</h2>
        </Reveal>
        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="incl-grid">
            {features.map((f) => (
              <Tilt key={f.t} max={6}>
                <div className="card card-hover tilt" style={{ padding: 28, height: "100%" }}>
                  <div style={{ fontSize: 28 }}>{f.ic}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 16, marginBottom: 8 }}>{f.t}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.5 }}>{f.d}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 32 }}>
            ¿Primera vez oyendo hablar de carpooling? Te explicamos{" "}
            <Link to="/blog/que-es-el-carpooling-caracas" style={{ color: "var(--primary)", fontWeight: 600 }}>
              qué es y por qué está creciendo en Caracas
            </Link>.
          </p>
        </Reveal>
      </div>
      <style>{`@media (max-width: 880px) { .incl-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function CFCTASection() {
  return (
    <section className="sec">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="h2" style={{ marginBottom: 24 }}>¿Te interesa?</h2>
          <p className="lede" style={{ margin: "0 auto 36px" }}>Ya está disponible en Caracas. Descárgala y pide tu primer viaje, o postúlate como piloto si vas en carro al trabajo.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic><a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dcomo_funciona_cta" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Descargar en Google Play <ArrowRight /></a></Magnetic>
            <Magnetic><a href="https://apps.apple.com/ve/app/viaje-app/id6806683135" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Descargar en App Store <ArrowRight /></a></Magnetic>
            <Magnetic><Link to="/registro-piloto" className="btn btn-outline btn-lg">Ser piloto</Link></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.ComoFunciona = ComoFunciona;
