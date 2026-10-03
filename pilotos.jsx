function Pilotos() {
  return (
    <>
      <PilotosHero />
      <BenefitsSection />
      <PilotosCalculator />
      <PilotosFAQSection />
      <PostulationForm />
    </>
  );
}

// OJO: estas 5 preguntas deben coincidir EXACTAMENTE con el schema FAQPage
// que build.mjs inyecta para /pilotos (mismo patrón que seo-meta.mjs/app.jsx:
// Google exige que el schema describa contenido visible en ESA página).
function PilotosFAQSection() {
  const faqs = [
    { q: "¿Cuánto puedo ganar como piloto?", a: "Entre $74 y $445 al mes, según cuántos viajes hagas en tu ruta diaria — sin desviarte un metro de tu camino habitual." },
    { q: "¿Qué documentos necesito para postularme?", a: "Cédula, licencia de conducir, RIF y carnet de circulación. Los subes dentro de la app después de llenar el formulario." },
    { q: "¿Cuánto tarda la verificación?", a: "Entre 24 y 48 horas después de enviar el formulario. Te contactamos por correo y WhatsApp con el resultado." },
    { q: "¿Tengo que dedicarme de tiempo completo?", a: "No. Viaje está pensado para tu ruta diaria habitual — al trabajo, la universidad, donde ya vayas todos los días. No cambias tu rutina." },
    { q: "¿Cuánto me quedo yo de cada viaje?", a: "El 90% del precio del viaje. Viaje cobra una comisión del 10%." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="sec">
      <div className="wrap-narrow">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>FAQ</div>
          <h2 className="h2" style={{ marginBottom: 48 }}>Preguntas de pilotos.</h2>
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
                  <span style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)" }}>{f.q}</span>
                  <span style={{
                    width: 32, height: 32, borderRadius: 999,
                    background: isOpen ? "var(--primary)" : "var(--line-2)",
                    color: isOpen ? "#fff" : "var(--ink-3)",
                    display: "grid", placeItems: "center", flexShrink: 0,
                    transition: "all .3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                  }}>+</span>
                </button>
                <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "max-height .5s var(--ease)" }}>
                  <p style={{ padding: "0 24px 24px", fontSize: 15, color: "var(--ink-3)", lineHeight: 1.6 }}>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PilotosHero() {
  return (
    <section style={{ position: "relative", padding: "120px 5vw 84px", overflow: "hidden", minHeight: "94vh", display: "flex", alignItems: "center" }}>
      {/* Fondo: carro 3D viajando (auto-rota como un video) */}
      <iframe
        src="/demo-pilotos"
        title="Maneja con Viaje — escena 3D"
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, pointerEvents: "none", zIndex: 0 }}
      />
      {/* Degradado para que el texto se lea sobre el 3D */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(90deg, rgba(7,13,24,.9) 0%, rgba(7,13,24,.55) 42%, rgba(7,13,24,.12) 72%, rgba(7,13,24,.35) 100%)",
      }} />
      <div className="wrap ph-grid" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }}>
        <div>
          <Reveal>
            <div className="h-eyebrow eyebrow" style={{ color: "#90CAF9" }}>Carpooling · Pilotos en Caracas</div>
            <h1 className="h1" style={{ marginTop: 24, marginBottom: 24, color: "#fff" }}>
              Tu carro,<br />tu ruta,<br />tu <em style={{ color: "#64B5F6", fontStyle: "italic" }}>ingreso</em>.
            </h1>
            <p className="lede" style={{ marginBottom: 32, color: "#bccadf" }}>
              Llena el formulario una vez. Lo revisamos en 24–48h. Empiezas a ganar entre $74 y $445 al mes sin desviarte un metro de tu ruta diaria.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Magnetic><a href="#postulacion" className="btn btn-primary btn-lg">Postularme ahora <ArrowRight /></a></Magnetic>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 20 }}>
              <a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dpilotos_hero" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png" alt="Disponible en Google Play" style={{ height: 48, width: "auto", display: "block" }} />
              </a>
              <a href="https://apps.apple.com/ve/app/viaje-app/id6806683135" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
                <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83" alt="Disponible en App Store" style={{ height: 48, width: "auto", display: "block" }} />
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <PilotEarningsCard />
        </Reveal>
      </div>
      <style>{`@media (max-width: 980px) { .ph-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}

function PilotEarningsCard() {
  // Interactive earnings simulator
  const TIPOS = [
    { id: "viajecito", label: "Viajecito", price: 0.55, hint: "Misma zona urbana" },
    { id: "viaje", label: "Viaje", price: 1.10, hint: "Con cerro o cambio de altitud" },
    { id: "el-viaje", label: "El Viaje", price: 3.30, hint: "Fuera del área urbana" },
  ];
  const [tipoIdx, setTipoIdx] = React.useState(0);
  const [trips, setTrips] = React.useState(2);
  const [pax, setPax] = React.useState(3);
  const [days, setDays] = React.useState(20);
  const tipo = TIPOS[tipoIdx];
  const perTripNet = tipo.price * pax * 0.90;
  const monthly = (trips * perTripNet * days).toFixed(0);

  return (
    <div style={{
      position: "relative", padding: 32, borderRadius: "var(--r-2xl)",
      background: "linear-gradient(160deg, rgba(21,101,192,.55) 0%, rgba(13,71,161,.58) 100%)",
      backdropFilter: "blur(18px) saturate(130%)", WebkitBackdropFilter: "blur(18px) saturate(130%)",
      border: "1px solid rgba(255,255,255,.18)",
      color: "#fff", boxShadow: "0 24px 70px -18px rgba(0,0,0,.55)", overflow: "hidden",
    }}>
      <svg viewBox="0 0 500 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .2 }}>
        <defs>
          <pattern id="pcg" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#pcg)" />
      </svg>
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#90CAF9", textTransform: "uppercase", letterSpacing: ".12em" }}>Calculadora de ingresos</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 18 }}>
          <span className="display" style={{ fontSize: 88, fontFamily: "var(--serif)", color: "#fff", lineHeight: 1 }}>${monthly}</span>
          <span style={{ fontSize: 16, color: "#90CAF9" }}>/mes</span>
        </div>
        <div style={{ fontSize: 13, color: "#B8D4F2", marginBottom: 28 }}>Estimado en base a tu actividad</div>

        {/* Selector de tipo de viaje */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "#90CAF9", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>Tipo de viaje</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {TIPOS.map((t, i) => (
              <button key={t.id} onClick={() => setTipoIdx(i)}
                style={{
                  padding: "10px 8px", borderRadius: 12, border: "none", cursor: "pointer",
                  textAlign: "center", transition: "all .2s",
                  background: tipoIdx === i ? "#fff" : "rgba(255,255,255,.10)",
                  color: tipoIdx === i ? "#0D47A1" : "#fff",
                }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>${t.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#90CAF9", marginTop: 8, fontStyle: "italic" }}>{tipo.hint}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <SliderRow label="Viajes por día" min={1} max={2} value={trips} onChange={setTrips} suffix={trips === 1 ? "viaje" : "viajes"} />
          <SliderRow label="Pasajeros por viaje" min={1} max={3} value={pax} onChange={setPax} suffix={pax === 1 ? "pasajero" : "pasajeros"} />
          <SliderRow label="Días al mes" min={5} max={25} value={days} onChange={setDays} suffix="días" />
        </div>

        <div style={{ marginTop: 28, padding: 16, borderRadius: 14, background: "rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#90CAF9", textTransform: "uppercase", letterSpacing: ".12em" }}>Por viaje ({pax} {pax === 1 ? "pasajero" : "pasajeros"})</div>
            <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "var(--serif)" }}>${perTripNet.toFixed(2)} netos</div>
          </div>
          <div style={{ fontSize: 11, padding: "6px 10px", borderRadius: 999, background: "rgba(34,197,94,.2)", color: "#86EFAC" }}>
            10% comisión Viaje
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderRow({ label, min, max, value, onChange, suffix }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "#90CAF9", textTransform: "uppercase", letterSpacing: ".1em" }}>{label}</span>
        <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--mono)" }}>{value} {suffix}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)}
        style={{
          width: "100%", appearance: "none", height: 6, borderRadius: 999,
          background: `linear-gradient(90deg, #64B5F6 ${(value-min)/(max-min)*100}%, rgba(255,255,255,.15) ${(value-min)/(max-min)*100}%)`,
          outline: "none", cursor: "pointer",
        }} />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 22px; height: 22px; border-radius: 999px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,.2);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px; height: 22px; border-radius: 999px;
          background: #fff; border: none;
          box-shadow: 0 4px 12px rgba(0,0,0,.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function BenefitsSection() {
  const benefits = [
    { ic: "🚗", t: "No es taxi", d: "No haces carreras. Solo llevas gente que ya iba a tu mismo lado." },
    { ic: "⏱️", t: "Tú decides el horario", d: "Publicas tu ruta cuando vas, y solo cuando vas. Sin presión." },
    { ic: "💼", t: "$74 a $445/mes", d: "Depende de tu ruta. Con 3 pasajeros 2 veces al día, 25 días al mes: $74 (Viajecito) a $445 (El Viaje)." },
    { ic: "🛡️", t: "Verificación gratuita", d: "Validamos identidad, licencia y antecedentes. Tarda 24–48h." },
    { ic: "🏦", t: "Cobro automático", d: "Al final del mes te transferimos tus ganancias por Pago Móvil." },
    { ic: "📍", t: "Sin desviarte", d: "Solo aparecen pasajeros que coinciden con tu ruta y horario." },
  ];
  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Beneficios</div>
          <h2 className="h2" style={{ maxWidth: 720, marginBottom: 60 }}>Por qué ser piloto en Viaje.</h2>
        </Reveal>
        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="ben-grid">
            {benefits.map((b) => (
              <Tilt key={b.t} max={5}>
                <div className="card card-hover tilt" style={{ padding: 28, height: "100%" }}>
                  <div style={{ fontSize: 28 }}>{b.ic}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 16, marginBottom: 8 }}>{b.t}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.5 }}>{b.d}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 880px) { .ben-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function PilotosCalculator() {
  return (
    <section className="sec" style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .35, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 40% at 70% 50%, rgba(30,136,229,.4), transparent 70%)" }} />
      <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ color: "var(--primary-light)", justifyContent: "center", display: "inline-flex" }}>Comisión transparente</div>
          <h2 className="h2" style={{ color: "#fff", marginTop: 24, marginBottom: 24, maxWidth: 760, margin: "24px auto" }}>
            Te quedas con el <em style={{ color: "#90CAF9", fontStyle: "italic" }}>90%</em> de cada viaje.
          </h2>
          <p className="lede" style={{ color: "#B8C4D6", margin: "0 auto 56px" }}>
            10% es la comisión Viaje. Sin meses gratuitos engañosos que se vuelven caros después.
          </p>
        </Reveal>

        {/* Visual breakdown bar */}
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", height: 80, borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 50px -20px rgba(30,136,229,.5)" }}>
            <Reveal style={{ flex: 90, background: "linear-gradient(135deg, #2196F3, #1565C0)", display: "grid", placeItems: "center", color: "#fff", fontFamily: "var(--serif)", fontSize: 28 }}>
              90% piloto
            </Reveal>
            <div style={{ flex: 10, background: "rgba(255,255,255,.08)", display: "grid", placeItems: "center", color: "#90CAF9", fontFamily: "var(--mono)", fontSize: 13 }}>
              10% Viaje
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 11, fontFamily: "var(--mono)", color: "var(--muted)" }}>
            <span>$0,00</span><span>De cada $0,55</span><span>$0,55</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PostulationForm() {
  return (
    <section id="postulacion" className="sec">
      <div className="wrap-narrow">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Postulación</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>Postúlate ahora.</h2>
          <p className="lede" style={{ marginBottom: 48 }}>Lo revisamos en 24–48 horas y te contactamos por correo y WhatsApp. Los documentos los subes directo desde el app.</p>
        </Reveal>
        <RegistroPiloto embedded />
      </div>
    </section>
  );
}

// (legacy form removed — now uses the stepper from forms.jsx)
function _LegacyPostulationForm_unused() {
  return null;
  /* eslint-disable */
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const full_name = (fd.get("full_name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    if (!full_name || !email || !phone) { setError("Completa los campos requeridos."); return; }
    const parts = [].filter(Boolean).join(" · ");
    setLoading(true);
    try { await submitPreReg({ kind: "piloto", full_name, email, phone, zone: null, message: parts }); setSubmitted(true); }
    catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <section id="postulacion" className="sec" style={{ display: "none" }}>
      <div className="wrap-narrow">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Postulación</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>Postúlate ahora.</h2>
          <p className="lede" style={{ marginBottom: 48 }}>Lo revisamos en 24–48 horas y te contactamos por correo y WhatsApp.</p>
        </Reveal>

        {!submitted ? (
          <form onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <FormGroup title="Datos personales" num="01">
              <div className="field-row">
                <div className="field"><label>Nombre completo *</label><input name="full_name" required placeholder="Carlos González" autoComplete="name" /></div>
                <div className="field"><label>Cédula</label><input name="cedula" placeholder="V-12.345.678" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Correo *</label><input name="email" type="email" required placeholder="carlos@gmail.com" autoComplete="email" inputMode="email" /></div>
                <div className="field"><label>Teléfono *</label><input name="phone" required placeholder="+58 412 555 1234" autoComplete="tel" inputMode="tel" /></div>
              </div>
            </FormGroup>

            <FormGroup title="Vehículo" num="02">
              <div className="field-row">
                <div className="field"><label>Marca</label><input name="marca" placeholder="Toyota" /></div>
                <div className="field"><label>Modelo</label><input name="modelo" placeholder="Corolla" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Año</label><input name="anio" placeholder="2018" inputMode="numeric" /></div>
                <div className="field"><label>Placa</label><input name="placa" placeholder="AB123CD" /></div>
              </div>
            </FormGroup>

            <FormGroup title="Licencia y experiencia" num="03">
              <div className="field">
                <label>¿Tienes licencia vigente?</label>
                <RadioGroup name="lic" options={["Sí, vigente", "No / vencida"]} />
              </div>
              <div className="field"><label>Años de experiencia</label><input name="experiencia" placeholder="5" inputMode="numeric" /></div>
            </FormGroup>

            <FormGroup title="Tu rutina" num="04">
              <div className="field"><label>Ruta diaria</label><input name="ruta" placeholder="Chacao → El Paraíso" /></div>
              <div className="field"><label>Horario</label><input name="horario" placeholder="L–V · 7:30am ida · 6:00pm vuelta" /></div>
              <div className="field"><label>¿Por qué quieres ser piloto?</label><textarea name="motivo" placeholder="Cuéntanos un poco..." /></div>
            </FormGroup>

            {error && (
              <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingTop: 16 }}>
              <p style={{ fontSize: 12, color: "var(--muted)", maxWidth: 380 }}>
                Al enviar aceptas los Términos y Condiciones y la Política de Privacidad.
              </p>
              <Magnetic>
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Enviando…" : "Enviar postulación"} {!loading && <ArrowRight />}
                </button>
              </Magnetic>
            </div>
          </form>
        ) : (
          <SubmitSuccess kind="piloto" />
        )}
      </div>
    </section>
  );
}

function FormGroup({ num, title, children }) {
  return (
    <div style={{ padding: 32, borderRadius: "var(--r-xl)", background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 22 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--primary)", letterSpacing: ".1em" }}>{num}</span>
        <h3 style={{ fontSize: 22, fontWeight: 700 }}>{title}</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  );
}

function RadioGroup({ name, options }) {
  const [sel, setSel] = React.useState(options[0]);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((o) => (
        <button key={o} type="button" onClick={() => setSel(o)}
          style={{
            padding: "10px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: sel === o ? "var(--primary)" : "var(--bg-soft)",
            color: sel === o ? "#fff" : "var(--ink-2)",
            transition: "all .2s",
            boxShadow: sel === o ? "0 4px 12px rgba(30,136,229,.3)" : "none",
          }}>{o}</button>
      ))}
    </div>
  );
}

function SubmitSuccess({ kind }) {
  return (
    <div style={{ padding: 56, borderRadius: "var(--r-2xl)", background: "linear-gradient(160deg, #E7F8EE 0%, #F0F6FE 100%)", border: "1px solid var(--line)", textAlign: "center" }}>
      <div style={{
        width: 80, height: 80, borderRadius: 999,
        background: "linear-gradient(135deg, #22C55E, #1E88E5)",
        color: "#fff", display: "grid", placeItems: "center", margin: "0 auto 24px",
        fontSize: 32, animation: "popIn .6s var(--ease-spring)",
      }}>✓</div>
      <h3 className="h3" style={{ marginBottom: 12 }}>¡Listo!</h3>
      <p style={{ fontSize: 15, color: "var(--ink-3)", maxWidth: 480, margin: "0 auto" }}>
        {kind === "piloto"
          ? "Recibimos tu postulación. La revisamos en 24–48h y te contactamos por correo y WhatsApp."
          : "Estás pre-registrado. Te avisamos por correo apenas Viaje esté disponible en tu zona."}
      </p>
    </div>
  );
}

window.Pilotos = Pilotos;
window.SubmitSuccess = SubmitSuccess;
window.FormGroup = FormGroup;
window.RadioGroup = RadioGroup;
