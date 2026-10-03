// Hero animated route map — Chacao → Altamira
function HeroMap() {
  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState(0); // 0: drawing, 1: car traveling, 2: arrived
  const ref = React.useRef(null);
  const timeRef = React.useRef(null);

  // Loop animation
  React.useEffect(() => {
    let start = performance.now();
    let raf;
    const loop = (t) => {
      const elapsed = (t - start) / 1000;
      const cycle = 7;
      const p = (elapsed % cycle) / cycle;
      setProgress(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Path string — stylized Caracas route
  const d = "M 80 360 C 160 320, 200 280, 260 260 S 380 250, 440 200 S 560 130, 640 110";
  const pathRef = React.useRef(null);
  const [carPos, setCarPos] = React.useState({ x: 80, y: 360, angle: 0 });
  const [pathLen, setPathLen] = React.useState(700);

  React.useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  React.useEffect(() => {
    if (!pathRef.current) return;
    // car position based on progress (after route is drawn)
    const drawT = 0.35;
    const driveT = .9;
    let p = 0;
    if (progress < drawT) p = 0;
    else if (progress < driveT) p = (progress - drawT) / (driveT - drawT);
    else p = 1;
    const len = pathRef.current.getTotalLength();
    const pt = pathRef.current.getPointAtLength(len * p);
    const pt2 = pathRef.current.getPointAtLength(Math.min(len, len * p + 1));
    const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
    setCarPos({ x: pt.x, y: pt.y, angle });
  }, [progress]);

  const drawProgress = Math.min(1, progress / 0.35);
  const arrived = progress > 0.9;

  return (
    <div ref={ref} style={{
      position: "relative",
      width: "100%",
      aspectRatio: "1.05 / 1",
      borderRadius: "var(--r-2xl)",
      overflow: "hidden",
      background: "linear-gradient(160deg, #F0F6FE 0%, #E0EDFC 60%, #DCEAFA 100%)",
      boxShadow: "var(--shadow-lg), inset 0 0 0 1px rgba(30,136,229,.1)",
    }}>
      {/* Map texture */}
      <svg viewBox="0 0 720 700" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(30,136,229,.08)" strokeWidth="1" />
          </pattern>
          <pattern id="grid-coarse" width="180" height="180" patternUnits="userSpaceOnUse">
            <path d="M 180 0 L 0 0 0 180" fill="none" stroke="rgba(30,136,229,.14)" strokeWidth="1" />
          </pattern>
          <linearGradient id="rgrad" x1="0" x2="1">
            <stop offset="0" stopColor="#22C55E" />
            <stop offset=".55" stopColor="#1E88E5" />
            <stop offset="1" stopColor="#1565C0" />
          </linearGradient>
          <filter id="rglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <rect width="720" height="700" fill="url(#grid)" />
        <rect width="720" height="700" fill="url(#grid-coarse)" />

        {/* Background "neighborhoods" */}
        <g opacity=".55">
          <rect x="120" y="240" width="180" height="120" rx="14" fill="rgba(30,136,229,.05)" />
          <rect x="340" y="160" width="220" height="120" rx="14" fill="rgba(30,136,229,.07)" />
          <rect x="500" y="60" width="180" height="100" rx="14" fill="rgba(30,136,229,.05)" />
        </g>

        {/* Other faint streets */}
        <g stroke="rgba(30,136,229,.18)" strokeWidth="1.4" fill="none">
          <path d="M 0 200 H 720" />
          <path d="M 0 440 H 720" />
          <path d="M 220 0 V 700" />
          <path d="M 480 0 V 700" />
        </g>

        {/* Route — drawing in then steady */}
        <path d={d} stroke="rgba(30,136,229,.18)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#rglow)" />
        <path
          ref={pathRef}
          d={d}
          stroke="url(#rgrad)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={pathLen}
          strokeDashoffset={pathLen * (1 - drawProgress)}
          style={{ transition: "stroke-dashoffset .1s linear" }}
        />

        {/* Origin pin (Chacao) */}
        <g transform="translate(80 360)">
          <circle r="22" fill="rgba(34,197,94,.18)" />
          <circle r="13" fill="#fff" stroke="#22C55E" strokeWidth="3" />
          <circle r="4" fill="#22C55E" />
        </g>

        {/* Destination pin (Altamira) */}
        <g transform="translate(640 110)" style={{ transition: "transform .4s var(--ease-spring)" }}>
          <circle r="22" fill="rgba(30,136,229,.18)" style={{ transformOrigin: "center", animation: arrived ? "popIn .4s var(--ease-spring)" : "none" }} />
          <circle r="13" fill="#fff" stroke="#1E88E5" strokeWidth="3" />
          <circle r="4" fill="#1E88E5" />
        </g>

        {/* Car traveling */}
        {drawProgress >= 1 && (
          <g transform={`translate(${carPos.x} ${carPos.y}) rotate(${carPos.angle})`}>
            <rect x="-16" y="-9" width="32" height="18" rx="6" fill="#0D47A1" />
            <rect x="-12" y="-6" width="20" height="9" rx="3" fill="#64B5F6" opacity=".6" />
            <circle cx="-9" cy="9" r="3" fill="#0A1628" />
            <circle cx="9" cy="9" r="3" fill="#0A1628" />
            {/* Trail */}
            <circle cx="-22" cy="0" r="3" fill="#1E88E5" opacity=".5" />
            <circle cx="-30" cy="0" r="2" fill="#1E88E5" opacity=".3" />
          </g>
        )}
      </svg>

      {/* Origin label */}
      <div style={{
        position: "absolute", left: "10%", top: "48%",
        transform: "translate(-10%, -120%)",
        background: "#fff", padding: "8px 14px", borderRadius: 999,
        boxShadow: "var(--shadow-md)",
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: 13, fontWeight: 600,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "#22C55E" }} />
        Chacao
      </div>

      {/* Destination label */}
      <div style={{
        position: "absolute", right: "8%", top: "10%",
        background: "#fff", padding: "8px 14px", borderRadius: 999,
        boxShadow: "var(--shadow-md)",
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: 13, fontWeight: 600,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "#1E88E5" }} />
        Altamira
      </div>

      {/* Floating ETA card — bottom left */}
      <div style={{
        position: "absolute", left: 20, bottom: 20,
        background: "rgba(255,255,255,.95)",
        backdropFilter: "blur(10px)",
        borderRadius: 18,
        padding: "14px 16px",
        boxShadow: "var(--shadow-md)",
        minWidth: 220,
        animation: "floatY 5s ease-in-out infinite",
      }}>
        <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: ".12em", textTransform: "uppercase" }}>
          Match en {Math.max(2, Math.round(8 - progress * 6))}s
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: "linear-gradient(135deg, #FFB74D, #F57C00)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>RG</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Rafael G.</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>★ 4.92 · Toyota Corolla</div>
          </div>
        </div>
      </div>

      {/* Top right pricetag */}
      <div style={{
        position: "absolute", right: 20, bottom: 20,
        background: "var(--ink)", color: "#fff",
        borderRadius: 18, padding: "12px 16px",
        boxShadow: "var(--shadow-md)",
        animation: "floatY 5s ease-in-out infinite .5s",
      }}>
        <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "#7BA8E8", letterSpacing: ".12em", textTransform: "uppercase" }}>Tu trayecto</div>
        <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--serif)" }}>$0,55</div>
      </div>

      <style>{`
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes popIn { 0%{transform:scale(.4);opacity:.4} 100%{transform:scale(1);opacity:1} }
      `}</style>
    </div>
  );
}

window.HeroMap = HeroMap;
