if (typeof window !== "undefined" && !window.ensureGoogleMaps) {
  window.ensureGoogleMaps = function (cb) {
    var KEY = "AIzaSyAI3xrQ14lhmh11MT7qsXjdYhR99V44IrY";
    if (window.google && window.google.maps) return cb();
    if (window.__gmapsCbs) { window.__gmapsCbs.push(cb); return; }
    window.__gmapsCbs = [cb];
    window.__gmapsReady = function () { (window.__gmapsCbs || []).forEach(function (f) { try { f(); } catch (e) {} }); window.__gmapsCbs = null; };
    var s = document.createElement("script");
    s.src = "https://maps.googleapis.com/maps/api/js?key=" + KEY + "&callback=__gmapsReady&language=es&region=VE";
    s.async = true; s.onerror = function () { window.__gmapsCbs = null; };
    document.head.appendChild(s);
  };
}

function Tarifas() {
  return (
    <>
      <TarifasHero />
      <PlansSection />
      <ZonesMap />
      <ComparisonBig />
      <PaymentsSection />
      <TarifasFAQSection />
      <TarifasCTA />
    </>
  );
}

// OJO: estas 5 preguntas deben coincidir EXACTAMENTE con el schema FAQPage
// que build.mjs inyecta para /tarifas (mismo patrón que seo-meta.mjs/app.jsx:
// Google exige que el schema describa contenido visible en ESA página).
function TarifasFAQSection() {
  const faqs = [
    { q: "¿Por qué el precio cambia según la ruta?", a: "Depende de la zona geográfica del trayecto, no de la demanda ni la hora: Viajecito para la misma zona urbana, Viaje si cruzas cerro o cambio de altitud, El Viaje para recorridos fuera del área urbana." },
    { q: "¿El precio sube en hora pico?", a: "No. Viaje no tiene tarifa dinámica: el precio es el mismo un lunes a las 7am que un viernes a las 6pm." },
    { q: "¿Puedo pagar en bolívares?", a: "Sí. En efectivo puedes pagar en Bs o en USD directo al piloto. También hay Pago Móvil con validación automática y saldo VIP (wallet recargable)." },
    { q: "¿Hay que dar propina?", a: "No es obligatorio. El piloto ya recibe el 90% del precio del viaje; Viaje cobra una comisión del 10%." },
    { q: "¿Cómo sé cuánto va a costar mi viaje antes de pedirlo?", a: "El precio se calcula automáticamente según la categoría de tu ruta y se muestra antes de confirmar — no hay recálculo después de iniciar el viaje." },
    { q: "¿Es más económico que una app de transporte tradicional?", a: "Sí. Un viaje en Viaje cuesta entre $0,55 y $1,10 en la mayoría de las rutas dentro de Caracas, porque no es un servicio bajo demanda: es compartir una ruta que un piloto ya recorre todos los días." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap-narrow">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>FAQ</div>
          <h2 className="h2" style={{ marginBottom: 48 }}>Preguntas sobre tarifas.</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderRadius: "var(--r-md)",
                background: isOpen ? "var(--bg-card, #fff)" : "transparent",
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

function TarifasHero() {
  return (
    <section style={{ position: "relative", padding: "100px 5vw 60px", overflow: "hidden" }}>
      <div className="map-grid map-grid-fade" />
      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Tarifas de carpooling · Caracas + Distrito Capital</div>
          <h1 className="h1" style={{ marginTop: 24, marginBottom: 24, maxWidth: 900, margin: "24px auto 24px" }}>
            Precio fijo. Sin <em style={{ color: "var(--primary)", fontStyle: "italic" }}>sorpresas</em>.
          </h1>
          <p className="lede" style={{ margin: "0 auto" }}>
            Mismo precio para todos. Sin tarifa dinámica, sin recargos en hora pico, sin "ay, está lloviendo".
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PlansSection() {
  const plans = [
    {
      name: "Viajecito", price: "0,55", trips: "Rutas cortas dentro de la misma zona",
      ex: ["El Paraíso → Chacao", "Sabana Grande → Las Mercedes", "La Castellana → La Urbina"],
      featured: true,
    },
    {
      name: "Viaje", price: "1,10", trips: "Entre zonas con cerro o cambio de altitud",
      ex: ["San Bernardino → El Hatillo", "La Trinidad → Petare", "Catia → Chacao"],
    },
    {
      name: "El Viaje", price: "3,30", trips: "Recorridos largos fuera del área urbana",
      ex: ["Caracas → La Guaira", "Caracas → Los Teques", "Caracas → Guarenas"],
    },
  ];
  return (
    <section className="sec-sm">
      <div className="wrap">
        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="plans-grid">
            {plans.map((p) => <PlanCard key={p.name} {...p} />)}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 880px) { .plans-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function PlanCard({ name, price, trips, ex, featured }) {
  return (
    <Tilt max={4}>
      <div style={{
        padding: 36, borderRadius: "var(--r-2xl)",
        background: featured ? "linear-gradient(160deg, #1565C0 0%, #0D47A1 100%)" : "var(--surface)",
        color: featured ? "#fff" : "var(--ink)",
        boxShadow: featured ? "var(--shadow-blue)" : "var(--shadow-md)",
        border: featured ? "1px solid rgba(100,181,246,.3)" : "1px solid var(--line-2)",
        position: "relative", overflow: "hidden",
        transition: "transform .3s var(--ease), box-shadow .3s",
        height: "100%",
      }} className="tilt">
        {featured && (
          <div style={{ position: "absolute", top: 16, right: 16, fontSize: 11, fontFamily: "var(--mono)", padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,.16)", color: "#fff", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Más usado
          </div>
        )}
        {featured && (
          <svg viewBox="0 0 300 300" style={{ position: "absolute", right: -60, bottom: -60, width: 300, height: 300, opacity: .12 }}>
            <circle cx="150" cy="150" r="140" fill="none" stroke="#fff" strokeWidth="1" />
            <circle cx="150" cy="150" r="100" fill="none" stroke="#fff" strokeWidth="1" />
            <circle cx="150" cy="150" r="60" fill="none" stroke="#fff" strokeWidth="1" />
          </svg>
        )}
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: featured ? "#90CAF9" : "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{name}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 16 }}>
            <span className="display" style={{ fontSize: 80, fontFamily: "var(--serif)", color: featured ? "#fff" : "var(--primary)", lineHeight: 1 }}>${price}</span>
          </div>
          <div style={{ fontSize: 14, color: featured ? "#B8D4F2" : "var(--muted)", marginTop: 8, marginBottom: 28 }}>{trips}</div>
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: featured ? "#90CAF9" : "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Ejemplos</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {ex.map((e) => (
              <li key={e} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: featured ? "#E3F2FD" : "var(--ink-3)" }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: featured ? "#90CAF9" : "var(--primary)" }} />
                {e}
              </li>
            ))}
          </ul>
          {[
            "Hasta 3 pasajeros por viaje",
            "Tracking GPS en vivo",
            "Calificación mutua",
            "Pago en efectivo, PM o VIP",
            "Conversión BCV automática",
          ].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 13, color: featured ? "#C8D3E5" : "var(--ink-3)", borderBottom: featured ? "1px solid rgba(255,255,255,.08)" : "1px solid var(--line-2)" }}>
              <span style={{ width: 16, height: 16, borderRadius: 999, background: featured ? "rgba(100,181,246,.25)" : "var(--primary-50)", color: featured ? "#fff" : "var(--primary)", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 700 }}>✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>
    </Tilt>
  );
}

function ZonesMap() {
  // Google Maps con zonas (pills de color por categoría de tarifa)
  const mapRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const ZONES = [
    // VIAJECITO (azul) — Caracas urbana
    { cat: "viajecito", lng: -66.8526, lat: 10.4961, name: "Chacao" },
    { cat: "viajecito", lng: -66.9233, lat: 10.4870, name: "El Paraíso" },
    { cat: "viajecito", lng: -66.8745, lat: 10.4926, name: "Sabana Grande" },
    { cat: "viajecito", lng: -66.8475, lat: 10.4969, name: "Altamira" },
    { cat: "viajecito", lng: -66.8638, lat: 10.4811, name: "Las Mercedes" },
    { cat: "viajecito", lng: -66.8536, lat: 10.5000, name: "La Castellana" },
    // VIAJE (amarillo) — con cerro o cambio de altitud
    { cat: "viaje", lng: -66.8044, lat: 10.4769, name: "Petare" },
    { cat: "viaje", lng: -66.9412, lat: 10.5108, name: "Catia" },
    { cat: "viaje", lng: -66.8189, lat: 10.4275, name: "El Hatillo" },
    { cat: "viaje", lng: -66.8447, lat: 10.4444, name: "La Trinidad" },
    { cat: "viaje", lng: -66.8927, lat: 10.5103, name: "San Bernardino" },
    // EL VIAJE (rojo) — fuera del área urbana
    { cat: "el-viaje", lng: -66.9347, lat: 10.6017, name: "La Guaira" },
    { cat: "el-viaje", lng: -67.0411, lat: 10.3439, name: "Los Teques" },
    { cat: "el-viaje", lng: -66.6178, lat: 10.4717, name: "Guarenas" },
  ];

  const COLORS = {
    "viajecito": { bg: "#1E88E5", border: "#0D47A1", text: "#fff" },
    "viaje":     { bg: "#F59E0B", border: "#B45309", text: "#fff" },
    "el-viaje":  { bg: "#DC2626", border: "#7F1D1D", text: "#fff" },
  };

  React.useEffect(() => {
    if (!containerRef.current || !window.ensureGoogleMaps) return;
    let cancelled = false;
    window.ensureGoogleMaps(() => {
      if (cancelled || mapRef.current || !containerRef.current) return;
      const g = window.google;
      const map = new g.maps.Map(containerRef.current, {
        center: { lat: 10.49, lng: -66.88 },
        zoom: 10.2,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
        clickableIcons: false,
      });
      mapRef.current = map;
      const info = new g.maps.InfoWindow();

      ZONES.forEach((z) => {
        const c = COLORS[z.cat];
        const w = Math.max(54, z.name.length * 7 + 24);
        const h = 24;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">`
          + `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="11" fill="${c.bg}" stroke="${c.border}" stroke-width="2"/>`
          + `<text x="${w / 2}" y="${h / 2 + 4}" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="${c.text}" text-anchor="middle">${z.name}</text></svg>`;
        const marker = new g.maps.Marker({
          position: { lat: z.lat, lng: z.lng },
          map,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
            anchor: new g.maps.Point(w / 2, h / 2),
          },
        });
        const price = z.cat === "viajecito" ? "Viajecito · $0,55" : z.cat === "viaje" ? "Viaje · $1,10" : "El Viaje · $3,30";
        marker.addListener("click", () => {
          info.setContent(
            `<div style="font-family:sans-serif;padding:2px 4px;">
              <div style="font-weight:700;color:#0F172A;font-size:13px;">${z.name}</div>
              <div style="font-size:11px;color:#64748B;margin-top:2px;">${price}</div>
            </div>`
          );
          info.open(map, marker);
        });
      });
    });

    return () => { cancelled = true; mapRef.current = null; };
  }, []);

  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Mapa de zonas</div>
          <h2 className="h2" style={{ marginBottom: 24, maxWidth: 720 }}>
            Cada zona tiene su <em style={{ color: "var(--primary)", fontStyle: "italic" }}>tarifa</em>.
          </h2>
          <p className="lede" style={{ marginBottom: 40, maxWidth: 680 }}>
            La categoría depende de la geografía real — no de la distancia. Subir cerro o salir del área urbana cambia la tarifa.
          </p>
        </Reveal>

        <Reveal>
          <div style={{
            position: "relative", borderRadius: "var(--r-2xl)",
            border: "1px solid var(--line-2)", overflow: "hidden",
            boxShadow: "var(--shadow-md)",
          }}>
            <div ref={containerRef} style={{ width: "100%", height: 520 }} />

            {/* Leyenda */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center",
              padding: "18px 24px", background: "var(--surface)", borderTop: "1px solid var(--line-2)",
            }}>
              {[
                { cat: "viajecito", label: "Viajecito · $0,55", desc: "Misma zona urbana" },
                { cat: "viaje", label: "Viaje · $1,10", desc: "Con cerro o cambio de altitud" },
                { cat: "el-viaje", label: "El Viaje · $3,30", desc: "Fuera del área urbana" },
              ].map((l) => {
                const c = COLORS[l.cat];
                return (
                  <div key={l.cat} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 18, height: 18, borderRadius: 999, background: c.bg, border: `2px solid ${c.border}` }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{l.label}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{l.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComparisonBig() {
  const competitors = [
    { name: "Viaje", price: "$0,55", val: 0.55, brand: true },
    { name: "Apps de transporte por demanda", price: "$3 – $5", val: 4 },
    { name: "Taxi tradicional", price: "$5 – $8", val: 6.5 },
  ];
  const max = 8;
  return (
    <section className="sec" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Comparación</div>
          <h2 className="h2" style={{ marginBottom: 24, maxWidth: 720 }}>
            Compara con la <em style={{ color: "var(--primary)", fontStyle: "italic" }}>competencia</em>.
          </h2>
          <p className="lede" style={{ marginBottom: 60 }}>Mismo trayecto en El Paraíso → Chacao. Aquí está la diferencia real.</p>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {competitors.map((c, i) => <CompetitorRow key={c.name} {...c} max={max} delay={i * 150} />)}
        </div>
        <Reveal>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 28 }}>
            ¿Quieres ver los números completos, con capturas de cada app? Léelos en{" "}
            <Link to="/blog/taxi-ridery-o-viaje-caracas" style={{ color: "var(--primary)", fontWeight: 600 }}>
              cuánto pagas realmente por moverte en Caracas
            </Link>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PaymentsSection() {
  const methods = [
    { ic: "💳", t: "Saldo VIP", d: "Recargas tu wallet con Pago Móvil y descuentas cada viaje desde ahí. Tasa BCV calculada automáticamente." },
  ];
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>Método de pago</div>
          <h2 className="h2" style={{ marginBottom: 60, maxWidth: 720 }}>Así pagas tus viajes.</h2>
        </Reveal>
        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="pay-grid">
            {methods.map((m) => (
              <Tilt key={m.t} max={5}>
                <div className="card card-hover tilt" style={{ padding: 32, gridColumn: "span 1" }}>
                  <div style={{ fontSize: 36, marginBottom: 18 }}>{m.ic}</div>
                  <h3 className="h3" style={{ fontSize: 22, marginBottom: 8 }}>{m.t}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.5 }}>{m.d}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`
        .pay-grid { max-width: 380px; }
        @media (max-width: 880px) { .pay-grid { grid-template-columns: 1fr !important; max-width: 100%; } }
      `}</style>
    </section>
  );
}

function TarifasCTA() {
  return (
    <section className="sec">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="h2" style={{ marginBottom: 24 }}>¿Listo para ahorrar en transporte?</h2>
          <p className="lede" style={{ margin: "0 auto 36px" }}>Ya está disponible en Google Play — descárgala y pide tu primer viaje hoy.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dtarifas_cta" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                Descargar en Google Play <ArrowRight />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://apps.apple.com/ve/app/viaje-app/id6806683135" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                Descargar en App Store <ArrowRight />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Tarifas = Tarifas;
