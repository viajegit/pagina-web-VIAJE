// Helpers compartidos
function getUtmAndRef() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") || null,
      utm_medium: p.get("utm_medium") || null,
      utm_campaign: p.get("utm_campaign") || null,
      referer: document.referrer || null,
      user_agent: navigator.userAgent || null,
      ref: (p.get("ref") || "").trim().toUpperCase() || null,
    };
  } catch { return {}; }
}

async function submitPreReg(payload) {
  // Cliente resiliente: si el SDK de Supabase no cargó (CDN lento/bloqueado),
  // __getSupabase lo carga al vuelo antes de rendirse. Fallback al global viejo.
  const sb = window.__getSupabase ? await window.__getSupabase() : window.__SUPABASE__;
  if (!sb) throw new Error("Conexión no disponible. Revisa tu internet e intenta de nuevo.");
  const ctx = getUtmAndRef();
  const { data, error } = await sb.rpc("submit_preregistration", {
    p_kind: payload.kind,
    p_full_name: payload.full_name,
    p_email: payload.email,
    p_phone: payload.phone || null,
    p_zone: payload.zone || null,
    p_message: payload.message || null,
    p_utm_source: ctx.utm_source,
    p_utm_medium: ctx.utm_medium,
    p_utm_campaign: ctx.utm_campaign,
    p_referer: ctx.referer,
    p_user_agent: ctx.user_agent,
    p_first_name: payload.first_name || null,
    p_last_name: payload.last_name || null,
    p_gender: payload.gender || null,
    p_birth_date: payload.birth_date || null,
    p_home_address: payload.home_address || null,
    p_home_lat: payload.home_lat || null,
    p_home_lng: payload.home_lng || null,
    p_home_zone: payload.home_zone || null,
    p_work_address: payload.work_address || null,
    p_work_lat: payload.work_lat || null,
    p_work_lng: payload.work_lng || null,
    p_work_zone: payload.work_zone || null,
    p_schedule_in: payload.schedule_in || null,
    p_schedule_depart: payload.schedule_depart || null,
    p_schedule_out: payload.schedule_out || null,
    p_survey_answers: payload.survey_answers || null,
    p_referred_by_code: payload.referred_by_code || null,
  });
  if (error) throw new Error(error.message || "No pudimos guardar tu registro");
  return data;
}

// Proxy seguro a Google Places (Edge Function "places"). La API key vive en el
// servidor; aquí nunca se expone. Token de sesión = 1 cobro por autocomplete+details.
async function placesProxy(payload) {
  const sb = window.__getSupabase ? await window.__getSupabase() : window.__SUPABASE__;
  if (!sb) throw new Error("Conexión no disponible");
  const { data, error } = await sb.functions.invoke("places", { body: payload });
  if (error) throw error;
  return data || {};
}

function newSessionToken() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

// Sugerencias de dirección (Google Places, sesgado a Venezuela)
async function searchAddress(query, sessionToken) {
  if (!query || query.trim().length < 3) return [];
  try {
    const data = await placesProxy({ action: "autocomplete", q: query, sessionToken });
    return (data.suggestions || []).map(s => ({
      placeId: s.placeId,
      label: s.name,
      secondary: s.secondary,
      full: s.full || s.name,
    }));
  } catch { return []; }
}

// Coordenadas exactas del lugar elegido
async function placeDetails(placeId, sessionToken) {
  try {
    const d = await placesProxy({ action: "details", placeId, sessionToken });
    if (d.lat == null || d.lng == null) return null;
    return { address: d.address, lat: d.lat, lng: d.lng };
  } catch { return null; }
}

// Dirección a partir de coordenadas (al arrastrar el pin)
async function reverseGeocode(lat, lng) {
  try {
    const d = await placesProxy({ action: "reverse", lat, lng });
    return d.address || null;
  } catch { return null; }
}

// Carga el SDK de Google Maps JS una sola vez (idempotente). Vive en window
// porque forms/track/tarifas comparten scope global (babel standalone).
if (!window.ensureGoogleMaps) {
  window.ensureGoogleMaps = function (cb) {
    var KEY = "AIzaSyAI3xrQ14lhmh11MT7qsXjdYhR99V44IrY";
    if (window.google && window.google.maps) return cb();
    if (window.__gmapsCbs) { window.__gmapsCbs.push(cb); return; }
    window.__gmapsCbs = [cb];
    window.__gmapsReady = function () {
      (window.__gmapsCbs || []).forEach(function (f) { try { f(); } catch (e) {} });
      window.__gmapsCbs = null;
    };
    var s = document.createElement("script");
    s.src = "https://maps.googleapis.com/maps/api/js?key=" + KEY + "&callback=__gmapsReady&language=es&region=VE";
    s.async = true;
    s.onerror = function () { window.__gmapsCbs = null; };
    document.head.appendChild(s);
  };
}

// Mini-mapa Google Maps con pin draggable. Se monta solo cuando hay lat/lng.
function MiniMapPicker({ lat, lng, onMove }) {
  const ref = React.useRef(null);
  const mapRef = React.useRef(null);
  const markerRef = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !lat || !lng) return;
    let cancelled = false;
    window.ensureGoogleMaps(() => {
      if (cancelled || mapRef.current || !ref.current) return;
      const g = window.google;
      const map = new g.maps.Map(ref.current, {
        center: { lat, lng },
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
        clickableIcons: false,
      });
      mapRef.current = map;
      const marker = new g.maps.Marker({
        position: { lat, lng },
        map,
        draggable: true,
        title: "Tu casa",
      });
      markerRef.current = marker;
      marker.addListener("dragend", () => {
        const p = marker.getPosition();
        map.panTo(p);
        onMove({ lat: p.lat(), lng: p.lng() });
      });
      map.addListener("click", (e) => {
        marker.setPosition(e.latLng);
        map.panTo(e.latLng);
        onMove({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
    });

    return () => {
      cancelled = true;
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Si lat/lng cambian externamente (autocomplete escogió otra), recentrar
  React.useEffect(() => {
    if (mapRef.current && markerRef.current && lat && lng) {
      const pos = { lat, lng };
      markerRef.current.setPosition(pos);
      mapRef.current.panTo(pos);
    }
  }, [lat, lng]);

  return (
    <div style={{ marginTop: 10, borderRadius: 12, overflow: "hidden", border: "1px solid var(--line-2)" }}>
      <div ref={ref} style={{ width: "100%", height: 220 }} />
      <div style={{ background: "#FEF3C7", borderTop: "1px solid #FCD34D", padding: "8px 12px", fontSize: 12, color: "#92400E", fontWeight: 700, textAlign: "center" }}>
        👆 Mueve el pin azul exactamente sobre tu casa (muchas casas no salen por nombre)
      </div>
    </div>
  );
}

function AddressField({ label, value, lat, lng, onChange, placeholder, required }) {
  const [results, setResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const debounceRef = React.useRef(null);
  const sessionRef = React.useRef(newSessionToken());

  React.useEffect(() => {
    if (!value || value.length < 3 || lat) { setResults([]); setOpen(false); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const r = await searchAddress(value, sessionRef.current);
      setResults(r);
      setOpen(r.length > 0);
      setLoading(false);
    }, 400);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [value, lat]);

  const choose = async (r) => {
    setOpen(false);
    setLoading(true);
    // Mostramos el texto ya; buscamos las coordenadas exactas
    onChange({ address: r.full || r.label, lat: null, lng: null });
    const det = await placeDetails(r.placeId, sessionRef.current);
    sessionRef.current = newSessionToken();
    if (det) onChange({ address: det.address || r.full || r.label, lat: det.lat, lng: det.lng });
    setLoading(false);
  };

  return (
    <div className="field" style={{ position: "relative" }}>
      <label>{label} {required && "*"}</label>
      <input
        required={required}
        value={value || ""}
        onChange={(e) => onChange({ address: e.target.value, lat: null, lng: null })}
        placeholder={placeholder}
        autoComplete="off"
      />
      {lat && (
        <span style={{ fontSize: 11, color: "#16A34A", marginTop: 2 }}>
          ✓ Ubicación seleccionada — ajústala con el pin abajo
        </span>
      )}
      {lat && lng && (
        <MiniMapPicker
          lat={lat}
          lng={lng}
          onMove={async ({ lat: nl, lng: nlg }) => {
            onChange({ address: value, lat: nl, lng: nlg });
            const addr = await reverseGeocode(nl, nlg);
            if (addr) onChange({ address: addr, lat: nl, lng: nlg });
          }}
        />
      )}
      {open && results.length > 0 && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4,
          background: "var(--surface)", border: "1px solid var(--line-2)",
          borderRadius: 10, boxShadow: "var(--shadow-lg)", zIndex: 10, maxHeight: 240, overflowY: "auto",
        }}>
          {results.map((r, i) => (
            <div
              key={r.placeId || i}
              onClick={() => choose(r)}
              style={{ padding: "10px 14px", cursor: "pointer", fontSize: 13, color: "var(--ink)", borderBottom: i < results.length - 1 ? "1px solid var(--line-2)" : "none" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-soft)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ fontWeight: 600 }}>📍 {r.label}</div>
              {r.secondary && <div style={{ fontSize: 11, color: "var(--muted)", marginLeft: 20 }}>{r.secondary}</div>}
            </div>
          ))}
        </div>
      )}
      {loading && <span style={{ fontSize: 11, color: "var(--muted)" }}>Buscando…</span>}
    </div>
  );
}

function StepBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 999,
          background: i <= step ? "var(--primary)" : "var(--line-2)",
          transition: "background 300ms",
        }} />
      ))}
    </div>
  );
}

function Registro() {
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({
    first_name: "", last_name: "", email: "", phone: "",
    gender: "", birth_date: "",
    home_address: "", home_lat: null, home_lng: null,
    work_address: "", work_lat: null, work_lng: null,
    schedule_in: "", schedule_depart: "", schedule_out: "",
    message: "",
    survey_q1: "", survey_q2: "", survey_q3: "", survey_q4: "",
    survey_q5: "", survey_q5_universidad: "", survey_q5_otro: "",
    referred_by_code: "",
  });
  const u = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Prellenar el codigo de referido si llego por link (?ref=CODIGO), sin pisar
  // lo que el usuario ya haya escrito a mano.
  React.useEffect(() => {
    const ref = getUtmAndRef().ref;
    if (ref) setForm((f) => (f.referred_by_code ? f : { ...f, referred_by_code: ref }));
  }, []);

  const validateStep0 = () => {
    if (!form.first_name.trim()) return "Tu nombre es obligatorio";
    if (!form.last_name.trim()) return "Tu apellido es obligatorio";
    if (!form.email.trim()) return "El correo es obligatorio";
    if (!form.phone.trim()) return "El teléfono es obligatorio";
    if (!form.gender) return "Selecciona tu género";
    if (!form.birth_date) return "Indica tu fecha de nacimiento";
    return null;
  };
  const validateStep1 = () => {
    if (!form.home_address.trim()) return "Indica tu dirección de casa";
    if (!form.schedule_depart) return "Indica la hora en que sales de casa";
    return null;
  };
  const validateStep2 = () => {
    if (!form.work_address.trim()) return "Indica tu dirección de trabajo/estudio";
    if (!form.schedule_in) return "Indica tu hora de entrada al trabajo";
    if (!form.schedule_out) return "Indica tu hora de salida del trabajo";
    return null;
  };

  const next = () => {
    setError(null);
    const err = step === 0 ? validateStep0() : step === 1 ? validateStep1() : step === 2 ? validateStep2() : null;
    if (err) { setError(err); return; }
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => { setError(null); setStep(s => s - 1); };

  const finalSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const stepErr = validateStep2();
    if (stepErr) { setError(stepErr); return; }
    setLoading(true);
    try {
      const survey = {
        q1: form.survey_q1 || null,
        q2: form.survey_q2 || null,
        q3: form.survey_q3 || null,
        q4: form.survey_q4 || null,
        q5: form.survey_q5 || null,
        q5_universidad: form.survey_q5 === "Universidad" ? (form.survey_q5_universidad || null) : null,
        q5_detalle:
          form.survey_q5 === "Otra" ? (form.survey_q5_otro || null)
          : form.survey_q5_universidad === "Otra" ? (form.survey_q5_otro || null)
          : null,
      };
      const hasSurvey = Object.values(survey).some(Boolean);
      await submitPreReg({
        kind: "pasajero",
        full_name: `${form.first_name} ${form.last_name}`.trim(),
        ...form,
        survey_answers: hasSurvey ? survey : null,
      });
      if (window.gtag) window.gtag("event", "preregistro_completado", { kind: "pasajero" });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Algo salió mal. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section style={{ position: "relative", padding: "100px 5vw 120px", minHeight: "70vh", overflow: "hidden" }}>
        <div className="wrap-narrow"><SubmitSuccess kind="pasajero" /></div>
      </section>
    );
  }

  return (
    <section style={{ position: "relative", padding: "100px 5vw 120px", minHeight: "70vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: -200, width: 800, height: 800,
        background: "radial-gradient(circle, rgba(30,136,229,.12), transparent 60%)", pointerEvents: "none" }} />
      <div className="wrap-narrow" style={{ position: "relative" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow">Pre-registro · Pasajero</div>
          <h1 className="h1" style={{ marginTop: 24, marginBottom: 12 }}>
            Sé de los <em style={{ color: "var(--primary)", fontStyle: "italic" }}>primeros</em>.
          </h1>
          <p className="lede" style={{ marginBottom: 36 }}>
            Cargas tus datos ahora y cuando descargues la app solo necesitas verificar tu teléfono. Sin volver a empezar.
          </p>
        </Reveal>

        <div style={{ padding: 36, borderRadius: "var(--r-2xl)", background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)" }}>
          <StepBar step={step} total={3} />
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 24 }}>
            Paso {step + 1} de 3 · {step === 0 ? "Datos personales" : step === 1 ? "Tu casa" : "Tu trabajo/estudio"}
          </div>

          {step === 0 && (
            <form onSubmit={(e) => { e.preventDefault(); next(); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="field-row">
                <div className="field"><label>Nombre *</label><input required value={form.first_name} onChange={u("first_name")} placeholder="María" autoComplete="given-name" /></div>
                <div className="field"><label>Apellido *</label><input required value={form.last_name} onChange={u("last_name")} placeholder="Pérez" autoComplete="family-name" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Correo *</label><input type="email" required value={form.email} onChange={u("email")} placeholder="maria@gmail.com" autoComplete="email" inputMode="email" /></div>
                <div className="field"><label>Teléfono *</label><input required value={form.phone} onChange={u("phone")} placeholder="+58 412 555 1234" autoComplete="tel" inputMode="tel" /></div>
              </div>
              <div className="field">
                <label>Género *</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["M", "Masculino"], ["F", "Femenino"], ["X", "Prefiero no decirlo"]].map(([v, lbl]) => (
                    <button key={v} type="button" onClick={() => setForm(f => ({ ...f, gender: v }))}
                      style={{
                        flex: 1, padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                        border: `1px solid ${form.gender === v ? "var(--primary)" : "var(--line-2)"}`,
                        background: form.gender === v ? "var(--primary)" : "var(--surface)",
                        color: form.gender === v ? "#fff" : "var(--ink)",
                        fontWeight: 600, fontSize: 14, transition: "all 200ms",
                      }}>{lbl}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Fecha de nacimiento *</label>
                <input type="date" required value={form.birth_date} onChange={u("birth_date")} max={new Date(Date.now() - 14 * 365 * 86400_000).toISOString().slice(0, 10)} />
                <span style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Debes tener mínimo 14 años.</span>
              </div>
              {error && <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>}
              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
                <Magnetic><button type="submit" className="btn btn-primary btn-lg">Siguiente <ArrowRight /></button></Magnetic>
              </div>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); next(); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <AddressField
                label="Dirección de tu casa"
                required
                value={form.home_address}
                lat={form.home_lat}
                lng={form.home_lng}
                onChange={({ address, lat, lng }) => setForm(f => ({ ...f, home_address: address, home_lat: lat, home_lng: lng }))}
                placeholder="Edificio, calle, urbanización"
              />
              <div className="field-row">
                <div className="field">
                  <label>Hora de salida de casa *</label>
                  <input type="time" required value={form.schedule_depart} onChange={u("schedule_depart")} />
                  <span style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Ej: 7:00 am</span>
                </div>
              </div>
              {error && <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
                <button type="button" onClick={prev} className="btn btn-ghost btn-lg">← Atrás</button>
                <Magnetic><button type="submit" className="btn btn-primary btn-lg">Siguiente <ArrowRight /></button></Magnetic>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={finalSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <AddressField
                label="Dirección de tu trabajo o estudio"
                required
                value={form.work_address}
                lat={form.work_lat}
                lng={form.work_lng}
                onChange={({ address, lat, lng }) => setForm(f => ({ ...f, work_address: address, work_lat: lat, work_lng: lng }))}
                placeholder="Oficina, universidad, comercio"
              />
              <div className="field-row">
                <div className="field">
                  <label>Hora de entrada al trabajo *</label>
                  <input type="time" required value={form.schedule_in} onChange={u("schedule_in")} />
                </div>
                <div className="field">
                  <label>Hora de salida del trabajo *</label>
                  <input type="time" required value={form.schedule_out} onChange={u("schedule_out")} />
                </div>
              </div>

              <div style={{ height: 1, background: "var(--line)", margin: "4px 0" }} />

              <div className="field">
                <label>¿Qué transporte usas actualmente para ir y volver? (opcional)</label>
                <select value={form.survey_q1} onChange={u("survey_q1")}>
                  <option value="">Selecciona una opción</option>
                  <option value="Metro">Metro</option>
                  <option value="Metrobús / BusCaracas">Metrobús / BusCaracas</option>
                  <option value="Por puesto / buseta">Por puesto / buseta</option>
                  <option value="Taxi o mototaxi">Taxi o mototaxi</option>
                  <option value="Uber / InDriver">Uber / InDriver</option>
                  <option value="Vehículo propio">Vehículo propio</option>
                  <option value="Moto propia">Moto propia</option>
                  <option value="Carpooling informal">Carpooling informal</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="field">
                <label>¿Cuánto gastas en transporte al mes? (opcional)</label>
                <select value={form.survey_q2} onChange={u("survey_q2")}>
                  <option value="">Selecciona un rango</option>
                  <option value="Menos de $5">Menos de $5</option>
                  <option value="$5 – $20">$5 – $20</option>
                  <option value="$20 – $50">$20 – $50</option>
                  <option value="$50 – $100">$50 – $100</option>
                  <option value="Más de $100">Más de $100</option>
                  <option value="No lo sé exactamente">No lo sé exactamente</option>
                </select>
              </div>

              <div className="field">
                <label>¿Qué cambios harías en el transporte venezolano? (opcional)</label>
                <textarea
                  value={form.survey_q3}
                  onChange={u("survey_q3")}
                  placeholder="Cuéntanos con tus palabras…"
                  style={{ minHeight: 80 }}
                />
              </div>

              <div className="field">
                <label>¿Crees que Viaje ayudará en tu día a día? (opcional)</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    ["Sí, definitivamente", "Sí, definitivamente"],
                    ["Probablemente sí", "Probablemente sí"],
                    ["No estoy seguro/a", "No estoy seguro/a"],
                  ].map(([v, lbl]) => (
                    <button key={v} type="button" onClick={() => setForm(f => ({ ...f, survey_q4: v }))}
                      style={{
                        flex: 1, minWidth: 120, padding: "11px 14px", borderRadius: 10, cursor: "pointer",
                        border: `1px solid ${form.survey_q4 === v ? "var(--primary)" : "var(--line-2)"}`,
                        background: form.survey_q4 === v ? "var(--primary)" : "var(--surface)",
                        color: form.survey_q4 === v ? "#fff" : "var(--ink)",
                        fontWeight: 600, fontSize: 13, transition: "all 200ms",
                      }}>{lbl}</button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>¿Cómo te enteraste de Viaje? (opcional)</label>
                <select
                  value={form.survey_q5}
                  onChange={(e) => setForm(f => ({ ...f, survey_q5: e.target.value, survey_q5_universidad: "", survey_q5_otro: "" }))}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Recomendado">Recomendado por alguien</option>
                  <option value="Universidad">Universidad</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>

              {form.survey_q5 === "Universidad" && (
                <div className="field">
                  <label>¿Cuál universidad?</label>
                  <select
                    value={form.survey_q5_universidad}
                    onChange={(e) => setForm(f => ({ ...f, survey_q5_universidad: e.target.value, survey_q5_otro: "" }))}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Universidad Simón Bolívar (USB)">Universidad Simón Bolívar (USB)</option>
                    <option value="Universidad Central de Venezuela (UCV)">Universidad Central de Venezuela (UCV)</option>
                    <option value="Universidad Santa María (USM)">Universidad Santa María (USM)</option>
                    <option value="Otra">Otra</option>
                  </select>
                </div>
              )}

              {(form.survey_q5 === "Otra" || form.survey_q5_universidad === "Otra") && (
                <div className="field">
                  <label>Cuéntanos cómo te enteraste</label>
                  <input
                    value={form.survey_q5_otro}
                    onChange={u("survey_q5_otro")}
                    placeholder="Ej: Instagram, un flyer, una charla..."
                  />
                </div>
              )}

              <div className="field">
                <label>¿Tienes el código de referido de un amigo? (opcional)</label>
                <input
                  value={form.referred_by_code}
                  onChange={(e) => setForm(f => ({ ...f, referred_by_code: e.target.value.toUpperCase() }))}
                  placeholder="Ej: FRKXJX"
                  maxLength={6}
                  style={{ textTransform: "uppercase" }}
                />
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                  Si un amigo ya usa Viaje, coloca su código aquí y cuando te registres <b>ambos ganan Karma</b>. 🎉
                </div>
              </div>

              <div className="field">
                <label>¿Algo más que quieras contarnos? (opcional)</label>
                <textarea value={form.message} onChange={u("message")} placeholder="Comentarios sobre tu ruta diaria, qué te frustra del transporte hoy..." />
              </div>

              {error && <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
                <button type="button" onClick={prev} className="btn btn-ghost btn-lg">← Atrás</button>
                <Magnetic>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
                    {loading ? "Guardando…" : "Pre-registrarme"} {!loading && <ArrowRight />}
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Contacto() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({ full_name: "", email: "", subject: "", message: "" });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.full_name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Completa los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      await submitPreReg({
        kind: "contacto",
        full_name: form.full_name,
        email: form.email,
        message: (form.subject ? `[${form.subject}] ` : "") + form.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Algo salió mal. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ position: "relative", padding: "100px 5vw 120px", overflow: "hidden" }}>
      <div className="map-grid map-grid-fade" />
      <div className="wrap ct-grid" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60 }}>
        <div>
          <Reveal>
            <div className="h-eyebrow eyebrow">Contacto</div>
            <h1 className="h1" style={{ marginTop: 24, marginBottom: 24 }}>
              ¿En qué te <em style={{ color: "var(--primary)", fontStyle: "italic" }}>ayudamos</em>?
            </h1>
            <p className="lede" style={{ marginBottom: 36 }}>
              Escríbenos por el canal que prefieras. Respondemos en menos de 24h.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Correo", v: "hola@viaje.com.ve", href: "mailto:hola@viaje.com.ve" },
                { label: "Soporte", v: "soporte@viaje.com.ve", href: "mailto:soporte@viaje.com.ve" },
                { label: "Ubicación", v: "Caracas, Venezuela 🇻🇪" },
              ].map((c) => (
                <div key={c.label} style={{ padding: 18, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line-2)", boxShadow: "var(--shadow-sm)" }}>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="under-grow" style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)" }}>{c.v}</a>
                  ) : (
                    <span style={{ fontSize: 17, fontWeight: 600 }}>{c.v}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          {!submitted ? (
            <form onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 18, padding: 36, borderRadius: "var(--r-2xl)", background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)" }}>
              <div className="field"><label>Nombre *</label><input required value={form.full_name} onChange={update("full_name")} placeholder="Tu nombre" autoComplete="name" /></div>
              <div className="field"><label>Correo *</label><input type="email" required value={form.email} onChange={update("email")} placeholder="tu@correo.com" autoComplete="email" inputMode="email" /></div>
              <div className="field"><label>Asunto</label><input value={form.subject} onChange={update("subject")} placeholder="¿De qué quieres hablar?" /></div>
              <div className="field"><label>Mensaje *</label><textarea required value={form.message} onChange={update("message")} placeholder="Cuéntanos…" /></div>
              {error && (
                <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <Magnetic>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "wait" : "pointer" }}>
                    {loading ? "Enviando…" : "Enviar mensaje"} {!loading && <ArrowRight />}
                  </button>
                </Magnetic>
              </div>
            </form>
          ) : (
            <SubmitSuccess kind="pasajero" />
          )}
        </Reveal>
      </div>
      <style>{`@media (max-width: 980px) { .ct-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}

function RegistroPiloto({ embedded = false } = {}) {
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({
    // Paso 1 — Datos personales
    first_name: "", last_name: "", email: "", phone: "",
    gender: "", birth_date: "", cedula: "",
    // Paso 2 — Casa
    home_address: "", home_lat: null, home_lng: null,
    schedule_depart: "",
    // Paso 3 — Trabajo
    work_address: "", work_lat: null, work_lng: null,
    schedule_in: "", schedule_out: "",
    // Paso 4 — Vehículo
    vehicle_brand: "", vehicle_model: "", vehicle_year: "", vehicle_plate: "",
    license_valid: "", years_experience: "",
    message: "",
  });
  const u = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const v0 = () => {
    if (!form.first_name.trim()) return "Tu nombre es obligatorio";
    if (!form.last_name.trim()) return "Tu apellido es obligatorio";
    if (!form.email.trim()) return "El correo es obligatorio";
    if (!form.phone.trim()) return "El teléfono es obligatorio";
    if (!form.gender) return "Selecciona tu género";
    if (!form.birth_date) return "Indica tu fecha de nacimiento";
    return null;
  };
  const v1 = () => {
    if (!form.home_address.trim()) return "Indica tu dirección de casa";
    if (!form.schedule_depart) return "Indica tu hora de salida de casa";
    return null;
  };
  const v2 = () => {
    if (!form.work_address.trim()) return "Indica tu dirección de trabajo/estudio";
    if (!form.schedule_in) return "Indica tu hora de entrada";
    if (!form.schedule_out) return "Indica tu hora de salida";
    return null;
  };
  const v3 = () => {
    if (!form.vehicle_brand.trim()) return "Indica la marca del vehículo";
    if (!form.vehicle_model.trim()) return "Indica el modelo del vehículo";
    if (!form.vehicle_year.trim()) return "Indica el año del vehículo";
    if (!form.license_valid) return "Indica si tu licencia está vigente";
    return null;
  };

  const next = () => {
    setError(null);
    const err = step === 0 ? v0() : step === 1 ? v1() : step === 2 ? v2() : null;
    if (err) { setError(err); return; }
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => { setError(null); setStep(s => s - 1); };

  const finalSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const err = v3();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const vehicleDesc = [
        `Vehículo: ${form.vehicle_brand} ${form.vehicle_model} ${form.vehicle_year}`,
        form.vehicle_plate && `Placa: ${form.vehicle_plate}`,
        form.cedula && `Cédula: ${form.cedula}`,
        `Licencia: ${form.license_valid}`,
        form.years_experience && `${form.years_experience} años de experiencia`,
        form.message,
      ].filter(Boolean).join(" · ");

      await submitPreReg({
        kind: "piloto",
        full_name: `${form.first_name} ${form.last_name}`.trim(),
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        gender: form.gender,
        birth_date: form.birth_date,
        home_address: form.home_address,
        home_lat: form.home_lat,
        home_lng: form.home_lng,
        work_address: form.work_address,
        work_lat: form.work_lat,
        work_lng: form.work_lng,
        schedule_in: form.schedule_in,
        schedule_depart: form.schedule_depart,
        schedule_out: form.schedule_out,
        message: vehicleDesc,
      });
      if (window.gtag) window.gtag("event", "preregistro_completado", { kind: "piloto" });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Algo salió mal. Intenta de nuevo.");
    } finally { setLoading(false); }
  };

  if (submitted) {
    const wrapper = embedded ? "div" : "section";
    return embedded ? (
      <div className="wrap-narrow"><SubmitSuccess kind="piloto" /></div>
    ) : (
      <section style={{ position: "relative", padding: "100px 5vw 120px", minHeight: "70vh", overflow: "hidden" }}>
        <div className="wrap-narrow"><SubmitSuccess kind="piloto" /></div>
      </section>
    );
  }

  const formCard = (
        <div style={{ padding: 36, borderRadius: "var(--r-2xl)", background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)" }}>
          <StepBar step={step} total={4} />
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 24 }}>
            Paso {step + 1} de 4 · {step === 0 ? "Datos personales" : step === 1 ? "Tu casa" : step === 2 ? "Tu trabajo/estudio" : "Tu vehículo"}
          </div>

          {step === 0 && (
            <form onSubmit={(e) => { e.preventDefault(); next(); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="field-row">
                <div className="field"><label>Nombre *</label><input required value={form.first_name} onChange={u("first_name")} placeholder="José" autoComplete="given-name" /></div>
                <div className="field"><label>Apellido *</label><input required value={form.last_name} onChange={u("last_name")} placeholder="Romero" autoComplete="family-name" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Correo *</label><input type="email" required value={form.email} onChange={u("email")} placeholder="jose@gmail.com" autoComplete="email" inputMode="email" /></div>
                <div className="field"><label>Teléfono *</label><input required value={form.phone} onChange={u("phone")} placeholder="+58 414 555 1234" autoComplete="tel" inputMode="tel" /></div>
              </div>
              <div className="field">
                <label>Género *</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["M", "Masculino"], ["F", "Femenino"], ["X", "Prefiero no decirlo"]].map(([v, lbl]) => (
                    <button key={v} type="button" onClick={() => setForm(f => ({ ...f, gender: v }))}
                      style={{
                        flex: 1, padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                        border: `1px solid ${form.gender === v ? "var(--primary)" : "var(--line-2)"}`,
                        background: form.gender === v ? "var(--primary)" : "var(--surface)",
                        color: form.gender === v ? "#fff" : "var(--ink)",
                        fontWeight: 600, fontSize: 14, transition: "all 200ms",
                      }}>{lbl}</button>
                  ))}
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Fecha de nacimiento *</label>
                  <input type="date" required value={form.birth_date} onChange={u("birth_date")} max={new Date(Date.now() - 18 * 365 * 86400_000).toISOString().slice(0, 10)} />
                  <span style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Mínimo 18 años para ser piloto.</span>
                </div>
                <div className="field">
                  <label>Cédula (opcional)</label>
                  <input value={form.cedula} onChange={u("cedula")} placeholder="V-12.345.678" />
                </div>
              </div>
              {error && <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>}
              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
                <Magnetic><button type="submit" className="btn btn-primary btn-lg">Siguiente <ArrowRight /></button></Magnetic>
              </div>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); next(); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <AddressField
                label="Dirección de tu casa"
                required
                value={form.home_address}
                lat={form.home_lat}
                lng={form.home_lng}
                onChange={({ address, lat, lng }) => setForm(f => ({ ...f, home_address: address, home_lat: lat, home_lng: lng }))}
                placeholder="Edificio, calle, urbanización"
              />
              <div className="field-row">
                <div className="field">
                  <label>Hora de salida de casa *</label>
                  <input type="time" required value={form.schedule_depart} onChange={u("schedule_depart")} />
                  <span style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Ej: 7:00 am</span>
                </div>
              </div>
              {error && <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
                <button type="button" onClick={prev} className="btn btn-ghost btn-lg">← Atrás</button>
                <Magnetic><button type="submit" className="btn btn-primary btn-lg">Siguiente <ArrowRight /></button></Magnetic>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); next(); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <AddressField
                label="Dirección de tu trabajo o estudio"
                required
                value={form.work_address}
                lat={form.work_lat}
                lng={form.work_lng}
                onChange={({ address, lat, lng }) => setForm(f => ({ ...f, work_address: address, work_lat: lat, work_lng: lng }))}
                placeholder="Oficina, universidad, comercio"
              />
              <div className="field-row">
                <div className="field">
                  <label>Hora de entrada *</label>
                  <input type="time" required value={form.schedule_in} onChange={u("schedule_in")} />
                </div>
                <div className="field">
                  <label>Hora de salida *</label>
                  <input type="time" required value={form.schedule_out} onChange={u("schedule_out")} />
                </div>
              </div>
              {error && <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
                <button type="button" onClick={prev} className="btn btn-ghost btn-lg">← Atrás</button>
                <Magnetic><button type="submit" className="btn btn-primary btn-lg">Siguiente <ArrowRight /></button></Magnetic>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={finalSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="field-row">
                <div className="field"><label>Marca del vehículo *</label><input required value={form.vehicle_brand} onChange={u("vehicle_brand")} placeholder="Toyota" /></div>
                <div className="field"><label>Modelo *</label><input required value={form.vehicle_model} onChange={u("vehicle_model")} placeholder="Corolla" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Año *</label><input required value={form.vehicle_year} onChange={u("vehicle_year")} placeholder="2018" inputMode="numeric" /></div>
                <div className="field"><label>Placa</label><input value={form.vehicle_plate} onChange={u("vehicle_plate")} placeholder="AB123CD" /></div>
              </div>
              <div className="field">
                <label>¿Tu licencia de conducir está vigente? *</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["Sí, vigente", "Sí, vigente"], ["No / vencida", "No / vencida"]].map(([v, lbl]) => (
                    <button key={v} type="button" onClick={() => setForm(f => ({ ...f, license_valid: v }))}
                      style={{
                        flex: 1, padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                        border: `1px solid ${form.license_valid === v ? "var(--primary)" : "var(--line-2)"}`,
                        background: form.license_valid === v ? "var(--primary)" : "var(--surface)",
                        color: form.license_valid === v ? "#fff" : "var(--ink)",
                        fontWeight: 600, fontSize: 14,
                      }}>{lbl}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Años de experiencia manejando (opcional)</label>
                <input value={form.years_experience} onChange={u("years_experience")} placeholder="5" inputMode="numeric" />
              </div>
              <div className="field">
                <label>¿Algo más que quieras contarnos? (opcional)</label>
                <textarea value={form.message} onChange={u("message")} placeholder="Días que manejas, cuántos pasajeros sueles llevar, comentarios..." />
              </div>
              {error && <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 12, borderRadius: 10, fontSize: 14, border: "1px solid #FCA5A5" }}>{error}</div>}
              <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, padding: 14, fontSize: 13, color: "#1E40AF" }}>
                📱 <b>Documentos:</b> cédula, licencia, RIF y carnet de circulación los subes <b>directamente desde el app</b> cuando la descargues. No los necesitamos aquí.
              </div>
              <div style={{ background: "#FEF9C3", border: "1px solid #FDE68A", borderRadius: 10, padding: 14, fontSize: 13, color: "#78350F" }}>
                ⭐ <b>Founding Pilot:</b> los primeros 100 pilotos aprobados reciben karma inicial alto + prioridad en el match.
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
                <button type="button" onClick={prev} className="btn btn-ghost btn-lg">← Atrás</button>
                <Magnetic>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
                    {loading ? "Guardando…" : "Quiero ser piloto"} {!loading && <ArrowRight />}
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </div>
  );

  if (embedded) {
    return <div className="wrap-narrow" style={{ position: "relative" }}>{formCard}</div>;
  }

  return (
    <section style={{ position: "relative", padding: "100px 5vw 120px", minHeight: "70vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: -200, width: 800, height: 800,
        background: "radial-gradient(circle, rgba(30,136,229,.12), transparent 60%)", pointerEvents: "none" }} />
      <div className="wrap-narrow" style={{ position: "relative" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow">Pre-registro · Piloto</div>
          <h1 className="h1" style={{ marginTop: 24, marginBottom: 12 }}>
            Sé de los <em style={{ color: "var(--primary)", fontStyle: "italic" }}>primeros pilotos</em>.
          </h1>
          <p className="lede" style={{ marginBottom: 36 }}>
            Cargas tus datos ahora. Cuando descargues la app solo subes tus documentos (cédula, licencia, RIF, carnet de circulación) y empiezas a ganar.
          </p>
        </Reveal>
        {formCard}
      </div>
    </section>
  );
}

window.Registro = Registro;
window.RegistroPiloto = RegistroPiloto;
window.Contacto = Contacto;
