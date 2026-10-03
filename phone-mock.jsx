// Phone mock that ties into the hero — shows live ride matching
function PhoneMock() {
  const [step, setStep] = React.useState(0); // 0 search, 1 matched, 2 enroute
  React.useEffect(() => {
    const iv = setInterval(() => setStep((s) => (s + 1) % 3), 3200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: 280, height: 580,
      borderRadius: 44,
      background: "linear-gradient(180deg, #0A1628, #1A2942)",
      padding: 10,
      boxShadow: "0 40px 100px -20px rgba(13,71,161,.5), 0 0 0 8px rgba(10,22,40,.06)",
      transform: "rotate(-2deg)",
    }}>
      <div style={{
        width: "100%", height: "100%",
        borderRadius: 36,
        background: "#F0F6FE",
        overflow: "hidden", position: "relative",
      }}>
        {/* Notch */}
        <div style={{
          position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
          width: 88, height: 24, background: "#0A1628", borderRadius: 999, zIndex: 5,
        }} />

        {/* Status */}
        <div style={{ padding: "16px 22px 10px", display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "var(--mono)", color: "#3D4F6B" }}>
          <span>9:41</span><span>●●● ▮</span>
        </div>

        {/* Top bar */}
        <div style={{ padding: "0 18px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: "#fff", boxShadow: "var(--shadow-sm)", display: "grid", placeItems: "center" }}>
            <Mark size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>Hola</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Maria</div>
          </div>
        </div>

        {/* Mini map */}
        <div style={{
          margin: "14px 14px 10px", height: 200, borderRadius: 22,
          background: "linear-gradient(140deg, #DCEAFA, #BBDEFB)",
          position: "relative", overflow: "hidden",
        }}>
          <svg viewBox="0 0 250 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs>
              <pattern id="pgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30,136,229,.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="250" height="200" fill="url(#pgrid)" />
            <path d="M 30 160 C 80 130, 110 110, 160 80 S 220 40, 230 30"
              stroke="#1E88E5" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="30" cy="160" r="6" fill="#22C55E" stroke="#fff" strokeWidth="2.5" />
            <circle cx="230" cy="30" r="6" fill="#1E88E5" stroke="#fff" strokeWidth="2.5" />
            {step >= 1 && (
              <g style={{ animation: "pulseCar 1.6s ease-in-out infinite" }}>
                <circle cx="130" cy="100" r="14" fill="rgba(30,136,229,.2)" />
                <rect x="120" y="92" width="20" height="14" rx="4" fill="#0D47A1" transform="rotate(-30 130 99)" />
              </g>
            )}
          </svg>
        </div>

        {/* Action card */}
        <div style={{
          margin: "0 14px", padding: 16, borderRadius: 22, background: "#fff",
          boxShadow: "0 12px 32px -12px rgba(13,71,161,.18)",
          transition: "all .4s var(--ease)",
        }}>
          {step === 0 && (
            <div>
              <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>Buscando pilotos…</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: "#22C55E", animation: "blink 1s infinite" }} />
                <div style={{ fontSize: 14, fontWeight: 700 }}>Chacao → Altamira</div>
              </div>
              <div style={{ marginTop: 10, height: 4, background: "var(--bg-soft)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "60%", background: "linear-gradient(90deg, #1E88E5, #64B5F6)", borderRadius: 999, animation: "indet 1.4s ease-in-out infinite" }} />
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "#22C55E", textTransform: "uppercase", letterSpacing: ".1em", display: "flex", alignItems: "center", gap: 6 }}>
                ✓ Match en 4 seg
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: "linear-gradient(135deg, #FFB74D, #F57C00)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>RG</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Rafael G.</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>★ 4.92 · Toyota Corolla</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "var(--serif)" }}>$0,55</div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--primary)", textTransform: "uppercase", letterSpacing: ".1em" }}>En camino · ETA 6 min</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: "linear-gradient(135deg, #FFB74D, #F57C00)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>RG</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Rafael G.</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>Llegando en 1.2 km</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                <button style={{ flex: 1, padding: "8px 0", borderRadius: 10, background: "var(--bg-soft)", fontSize: 11, fontWeight: 600 }}>Llamar</button>
                <button style={{ flex: 1, padding: "8px 0", borderRadius: 10, background: "var(--primary)", color: "#fff", fontSize: 11, fontWeight: 600 }}>Chat</button>
              </div>
            </div>
          )}
        </div>

        {/* Stepper dots */}
        <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
          {[0,1,2].map((i) => (
            <span key={i} style={{
              width: i === step ? 18 : 6, height: 6, borderRadius: 999,
              background: i === step ? "var(--primary)" : "rgba(10,22,40,.18)",
              transition: "width .3s var(--ease)",
            }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes indet { 0%{transform:translateX(-100%)} 100%{transform:translateX(170%)} }
        @keyframes pulseCar { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      `}</style>
    </div>
  );
}

window.PhoneMock = PhoneMock;
