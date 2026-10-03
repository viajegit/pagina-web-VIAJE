/* global React */
// Vi en la web. Dos modos:
//  - 'mini'  → chat pequeño de esquina (lo abre el botón flotante de abajo).
//  - 'full'  → experiencia inmersiva a pantalla completa (lo abre 'Habla con un asesor' del navbar, evento 'open-vi').
// Comparten la misma conversación. Llama a la edge function web-chat (modo venta). Global: window.ViWidget.
// v2: sessionId persistente en localStorage + CSAT al cerrar.

const WEB_CHAT_URL = "https://zkdsfakqqniydvxkxkit.supabase.co/functions/v1/web-chat";
const VI_EXPR = {
  saludo: "/vi/Vi-saludo.png", pensando: "/vi/Vi-pensando.png", sorprendida: "/vi/Vi-sorprendida.png",
  aprobando: "/vi/Vi-aprobando.png", tranquila: "/vi/Vi-tranquila.png", riendo: "/vi/Vi-riendo.png",
  guino: "/vi/Vi-guino.png", disculpa: "/vi/Vi-disculpa.png",
};
const BRAND = "#0280F9";

// Genera o recupera el sessionId persistente
function getOrCreateSessionId() {
  if (typeof localStorage === "undefined") return "web_" + Date.now();
  let sid = localStorage.getItem("vi_session_id");
  if (!sid) {
    sid = "web_" + (crypto.randomUUID ? crypto.randomUUID() : Date.now() + "_" + Math.random().toString(36).slice(2));
    localStorage.setItem("vi_session_id", sid);
  }
  return sid;
}

// Detecta de DÓNDE vino el visitante (UTM > referrer). Atribución de PRIMER TOQUE:
// se calcula una vez y se guarda; navegar dentro del sitio no la pisa.
function detectOrigin() {
  try {
    const p = new URLSearchParams(location.search || "");
    const src = p.get("utm_source");
    if (src) {
      const camp = p.get("utm_campaign");
      const med = p.get("utm_medium");
      return [src, camp, med && `(${med})`].filter(Boolean).join(" / ").slice(0, 200);
    }
    const ref = document.referrer || "";
    if (!ref) return "Directo";
    const h = new URL(ref).hostname.replace(/^www\./, "").toLowerCase();
    if (h.includes(location.hostname.replace(/^www\./, ""))) return "Directo";
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("facebook") || h === "fb.com" || h.includes("fb.me") || h.includes("l.facebook")) return "Facebook";
    if (h.includes("google")) return "Google";
    if (h.includes("tiktok")) return "TikTok";
    if (h.includes("t.co") || h.includes("twitter") || h === "x.com") return "Twitter/X";
    if (h.includes("youtube") || h.includes("youtu.be")) return "YouTube";
    if (h.includes("bing")) return "Bing";
    if (h.includes("wa.me") || h.includes("whatsapp")) return "WhatsApp";
    return h;
  } catch { return "Directo"; }
}
function getOrigin() {
  if (typeof localStorage === "undefined") return detectOrigin();
  let o = localStorage.getItem("vi_origin");
  if (!o) { o = detectOrigin(); try { localStorage.setItem("vi_origin", o); } catch (_) { /* */ } }
  return o;
}

function ViWidget() {
  const [mode, setMode] = React.useState(null); // null | 'mini' | 'full' | 'csat'
  const [hint, setHint] = React.useState(true);
  const [msgs, setMsgs] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [expr, setExpr] = React.useState("saludo");
  const [greeted, setGreeted] = React.useState(false);
  const threadRef = React.useRef(null);

  // sessionId persistente (se genera una sola vez por dispositivo)
  const sessionId = React.useMemo(() => getOrCreateSessionId(), []);
  // origen de primer toque (UTM/referrer) — se manda con cada mensaje del chat
  const origin = React.useMemo(() => getOrigin(), []);

  // Estado CSAT
  const [hadReply, setHadReply] = React.useState(false);
  const [csatDone, setCsatDone] = React.useState(() => {
    try { return localStorage.getItem("vi_csat_done_" + getOrCreateSessionId()) === "1"; } catch { return false; }
  });
  const [csatSending, setCsatSending] = React.useState(false);
  const [csatThanks, setCsatThanks] = React.useState(false);
  // Modo previo antes de mostrar CSAT (para saber si volver a mini o full)
  const prevModeRef = React.useRef(null);

  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const on = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  // Navbar abre el modal grande
  React.useEffect(() => {
    const openFull = () => setMode("full");
    window.addEventListener("open-vi", openFull);
    return () => window.removeEventListener("open-vi", openFull);
  }, []);

  // ESC cierra; y si el usuario navega por el menú (cambia el hash), también cerramos
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    const onHash = () => setMode(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("hashchange", onHash); };
  }, [hadReply, csatDone]); // re-registrar cuando cambian para capturar el valor actual

  // Bloquear scroll del body SOLO en modo full (el mini no debe bloquear)
  React.useEffect(() => {
    document.body.style.overflow = (mode === "full" || mode === "csat") ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mode]);

  React.useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [msgs, sending, mode]);

  React.useEffect(() => {
    if (mode && mode !== "csat" && !greeted) {
      setGreeted(true);
      setExpr("saludo");
      setMsgs([{ role: "bot", text: "¡Hola! 👋 Soy *Vi*, tu asesora de Viaje. Cuéntame qué te gustaría saber: cómo funciona, cuánto puedes ahorrar o ganar, si es seguro... ¡lo que quieras! 💙" }]);
    }
  }, [mode, greeted]);

  // Lógica de cierre con CSAT
  function handleClose() {
    if (hadReply && !csatDone) {
      prevModeRef.current = mode;
      setMode("csat");
    } else {
      setMode(null);
    }
  }

  async function sendCsat(stars) {
    if (csatSending) return;
    setCsatSending(true);
    try {
      await fetch(WEB_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "csat", sessionId, stars }),
      });
    } catch (_) { /* no bloquea */ }
    // Marcar como hecho
    try { localStorage.setItem("vi_csat_done_" + sessionId, "1"); } catch { /* */ }
    setCsatDone(true);
    setCsatThanks(true);
    // Mostrar "¡Gracias!" 1.3s y luego cerrar
    setTimeout(() => {
      setCsatSending(false);
      setCsatThanks(false);
      setMode(null);
    }, 1300);
  }

  function skipCsat() {
    setMode(null);
  }

  async function send(text) {
    const q = (text != null ? text : input).trim();
    if (!q || sending) return;
    setInput("");
    setHint(false);
    const next = [...msgs, { role: "user", text: q }];
    setMsgs(next);
    setSending(true);
    setExpr("pensando");
    try {
      const history = next.slice(-8).map(m => ({ role: m.role, text: m.text }));
      const res = await fetch(WEB_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history, sessionId, origin }),
      });
      const data = await res.json().catch(() => ({}));
      const reply = (data && data.ok && data.reply) ? data.reply : "Disculpa, se me cruzó el cable un momentito 🙈. ¿Me lo repites?";
      const action = (data && data.action) || "answer";
      setMsgs(m => [...m, { role: "bot", text: reply }]);
      if (data && data.ok && data.reply) setHadReply(true);
      setExpr(action === "handoff" ? "disculpa"
        : (/jaja|jeje|gracias|genial|excelente|fino|nota|wow/i.test(q) ? "riendo"
          : (/registr|descarg|quiero|me anim|interes/i.test(q) ? "aprobando" : "tranquila")));
    } catch (e) {
      setMsgs(m => [...m, { role: "bot", text: "Disculpa, tuve un problemita de conexión. Intenta de nuevo 🙏" }]);
      setExpr("disculpa");
    } finally {
      setSending(false);
    }
  }

  function fmt(t) {
    return String(t).split(/(\*[^*]+\*)/g).map((p, i) =>
      p.startsWith("*") && p.endsWith("*") ? React.createElement("b", { key: i }, p.slice(1, -1)) : React.createElement(React.Fragment, { key: i }, p)
    );
  }

  const quicks = ["¿Cómo funciona?", "¿Cuánto puedo ganar?", "¿Es seguro?", "¿Cómo me registro?"];

  // Panel CSAT
  function renderCsat(compact) {
    const containerStyle = compact ? S.csatPanelC : S.csatPanel;
    if (csatThanks) {
      return React.createElement("div", { style: { ...containerStyle, ...S.csatThanks } },
        React.createElement("img", { src: VI_EXPR.guino, alt: "Vi", style: compact ? S.csatImgC : S.csatImg }),
        React.createElement("div", { style: S.csatThanksText }, "¡Gracias! 🫶")
      );
    }
    return React.createElement("div", { style: containerStyle },
      React.createElement("img", { src: VI_EXPR.aprobando, alt: "Vi", style: compact ? S.csatImgC : S.csatImg }),
      React.createElement("div", { style: S.csatTitle }, "¿Qué tal te atendí? 💛"),
      React.createElement("div", { style: S.csatSub }, "Tu opinión me ayuda a mejorar"),
      React.createElement("div", { style: S.csatStars },
        [1, 2, 3, 4, 5].map(n =>
          React.createElement("button", {
            key: n,
            style: { ...S.starBtn, opacity: csatSending ? 0.5 : 1 },
            onClick: () => sendCsat(n),
            disabled: csatSending,
            "aria-label": `${n} estrella${n > 1 ? "s" : ""}`,
          }, "⭐")
        )
      ),
      React.createElement("button", { style: S.csatSkip, onClick: skipCsat }, "Ahora no")
    );
  }

  // Thread + footer (reutilizable). compact = chat pequeño.
  function renderChat(compact) {
    const bub = compact ? S.bubbleC : S.bubble;
    const th = compact ? S.threadC : S.thread;
    return React.createElement(React.Fragment, null,
      React.createElement("div", { style: th, ref: threadRef },
        msgs.map((m, i) =>
          React.createElement("div", { key: i, style: { ...S.row, justifyContent: m.role === "user" ? "flex-end" : "flex-start" } },
            React.createElement("div", { style: { ...bub, ...(m.role === "user" ? S.bubbleUser : S.bubbleBot) } }, fmt(m.text))
          )
        ),
        sending && React.createElement("div", { style: { ...S.row, justifyContent: "flex-start" } },
          React.createElement("div", { style: { ...bub, ...S.bubbleBot, ...S.typing } }, "Vi está escribiendo…")
        ),
        msgs.length <= 1 && !sending && React.createElement("div", { style: S.quicks },
          quicks.map((q, i) => React.createElement("button", { key: i, style: compact ? S.quickC : S.quick, onClick: () => send(q) }, q))
        )
      ),
      React.createElement("div", { style: compact ? S.footerC : S.footer },
        React.createElement("input", {
          style: compact ? S.inputC : S.input, value: input, placeholder: "Escríbele a Vi…", autoFocus: !isMobile,
          onChange: e => setInput(e.target.value), onKeyDown: e => { if (e.key === "Enter") send(); },
        }),
        React.createElement("button", { style: { ...(compact ? S.sendC : S.send), opacity: (sending || !input.trim()) ? 0.5 : 1 }, onClick: () => send(), disabled: sending || !input.trim(), "aria-label": "Enviar" }, "➤")
      )
    );
  }

  return React.createElement(React.Fragment, null,
    // ===== Lanzador flotante =====
    !mode && React.createElement("div", { style: S.launcherWrap },
      hint && React.createElement("div", { style: S.hintBubble, onClick: () => setMode("mini") },
        "¿Hablamos? Soy Vi 💬",
        React.createElement("span", { style: S.hintClose, onClick: (e) => { e.stopPropagation(); setHint(false); } }, "✕")
      ),
      React.createElement("button", { style: S.launcher, onClick: () => setMode("mini"), "aria-label": "Conversar con Vi" },
        React.createElement("img", { src: VI_EXPR.saludo, alt: "Vi", style: S.launcherImg }),
        React.createElement("span", { style: S.launcherDot })
      )
    ),

    // ===== MINI (chat de esquina) =====
    mode === "mini" && React.createElement("div", { style: isMobile ? S.miniMobile : S.mini },
      React.createElement("div", { style: S.miniHeader },
        React.createElement("div", { style: S.miniAvatar }, React.createElement("img", { src: VI_EXPR[expr] || VI_EXPR.saludo, alt: "Vi", style: S.miniImg })),
        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
          React.createElement("div", { style: S.miniName }, "Vi"),
          React.createElement("div", { style: S.miniSub }, "Tu asesora de Viaje · en línea")
        ),
        React.createElement("button", { style: S.miniExpand, onClick: () => setMode("full"), title: "Ampliar" }, "⤢"),
        React.createElement("button", { style: S.miniClose, onClick: handleClose, "aria-label": "Cerrar" }, "✕")
      ),
      renderChat(true)
    ),

    // ===== FULL (pantalla completa, debajo del navbar para que el menú siga visible) =====
    mode === "full" && React.createElement("div", { style: S.screen },
      React.createElement("div", { style: isMobile ? S.layoutMobile : S.layout },
        // Stage
        React.createElement("div", { style: isMobile ? S.stageMobile : S.stage },
          React.createElement("div", { style: isMobile ? S.avatarBoxMobile : S.avatarBox },
            React.createElement("div", { style: S.halo }),
            React.createElement("img", { src: VI_EXPR[expr] || VI_EXPR.saludo, alt: "Vi", style: isMobile ? S.avatarMobile : S.avatar, className: "vi-float" })
          ),
          React.createElement("div", { style: isMobile ? S.stageTextMobile : null },
            React.createElement("div", { style: isMobile ? S.stageNameMobile : S.stageName }, "Vi"),
            React.createElement("div", { style: S.stageRole }, "Tu asesora de Viaje"),
            React.createElement("div", { style: S.onlineRow }, React.createElement("span", { style: S.onlineDot }), "en línea ahora"),
            React.createElement("button", { style: S.fullCloseBtn, onClick: handleClose, "aria-label": "Cerrar" }, "✕ Cerrar")
          )
        ),
        // Chat
        React.createElement("div", { style: S.chat }, renderChat(false))
      )
    ),

    // ===== CSAT (overlay encima del modo anterior) =====
    mode === "csat" && React.createElement("div", { style: S.csatOverlay },
      React.createElement("div", { style: isMobile ? S.csatBoxMobile : S.csatBox },
        renderCsat(isMobile)
      )
    )
  );
}

const S = {
  launcherWrap: { position: "fixed", right: 20, bottom: 20, zIndex: 9000, display: "flex", alignItems: "center", gap: 10 },
  hintBubble: { background: "#fff", color: "#0F172A", padding: "10px 14px", borderRadius: 14, boxShadow: "0 8px 28px rgba(2,128,249,0.20)", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "Inter, sans-serif", maxWidth: 200 },
  hintClose: { color: "#94A3B8", fontSize: 11, cursor: "pointer", padding: "0 2px" },
  launcher: { position: "relative", width: 64, height: 64, borderRadius: "50%", border: "none", background: `radial-gradient(circle at 50% 35%, #2b95ff, ${BRAND})`, cursor: "pointer", boxShadow: "0 10px 30px rgba(2,128,249,0.45)", padding: 0, overflow: "visible" },
  launcherImg: { width: 60, height: 60, objectFit: "contain", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))", transform: "translateY(-2px)" },
  launcherDot: { position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: "#22C55E", border: "2px solid #fff" },

  // MINI
  mini: { position: "fixed", right: 20, bottom: 20, width: 380, height: 560, maxHeight: "82vh", zIndex: 9000, background: "#fff", borderRadius: 20, boxShadow: "0 24px 70px rgba(15,23,42,0.28)", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "Inter, sans-serif", border: "1px solid #E2E8F0", animation: "viPop .22s ease-out" },
  miniMobile: { position: "fixed", left: 0, right: 0, bottom: 0, top: "12vh", zIndex: 9000, background: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "Inter, sans-serif", boxShadow: "0 -10px 40px rgba(15,23,42,0.2)" },
  miniHeader: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: `linear-gradient(135deg, ${BRAND}, #096BE2)`, color: "#fff" },
  miniAvatar: { width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 },
  miniImg: { width: 42, height: 42, objectFit: "contain", transform: "translateY(1px)" },
  miniName: { fontWeight: 800, fontSize: 16, lineHeight: 1.1 },
  miniSub: { fontSize: 11, opacity: 0.9, marginTop: 2 },
  miniExpand: { background: "rgba(255,255,255,0.18)", color: "#fff", border: "none", width: 30, height: 30, borderRadius: 8, cursor: "pointer", fontSize: 15, flexShrink: 0 },
  miniClose: { background: "rgba(255,255,255,0.18)", color: "#fff", border: "none", width: 30, height: 30, borderRadius: 8, cursor: "pointer", fontSize: 13, flexShrink: 0 },

  // FULL — z-index 70 (debajo del navbar z80) para que el menú de la página siga visible y clickeable.
  screen: { position: "fixed", inset: 0, zIndex: 70, background: "#EEF4FB", fontFamily: "Inter, sans-serif", animation: "viFade .25s ease-out" },
  layout: { display: "flex", height: "100%", width: "100%", paddingTop: 66, boxSizing: "border-box" },
  layoutMobile: { display: "flex", flexDirection: "column", height: "100%", width: "100%", paddingTop: 60, boxSizing: "border-box" },
  stage: { width: "40%", maxWidth: 460, background: `linear-gradient(160deg, #2b95ff 0%, ${BRAND} 45%, #064AA8 100%)`, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, position: "relative", overflow: "hidden" },
  avatarBox: { position: "relative", width: 320, height: 320, display: "flex", alignItems: "center", justifyContent: "center" },
  avatar: { width: 300, height: 300, objectFit: "contain", position: "relative", zIndex: 2, filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.28))" },
  halo: { position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.35), rgba(255,255,255,0) 70%)", zIndex: 1 },
  stageName: { fontWeight: 900, fontSize: 40, lineHeight: 1, textAlign: "center", letterSpacing: "-0.02em" },
  stageRole: { fontSize: 16, opacity: 0.92, textAlign: "center", marginTop: 6 },
  onlineRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 12, fontSize: 13, background: "rgba(255,255,255,0.15)", padding: "5px 12px", borderRadius: 999 },
  onlineDot: { width: 9, height: 9, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 0 3px rgba(74,222,128,0.3)" },
  stageMobile: { display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: `linear-gradient(135deg, #2b95ff, ${BRAND})`, color: "#fff", flexShrink: 0 },
  avatarBoxMobile: { position: "relative", width: 104, height: 104, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  avatarMobile: { width: 104, height: 104, objectFit: "contain", position: "relative", zIndex: 2, filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))" },
  stageTextMobile: { minWidth: 0 },
  stageNameMobile: { fontWeight: 900, fontSize: 26, lineHeight: 1 },
  chat: { flex: 1, display: "flex", flexDirection: "column", background: "#F6F9FC", minWidth: 0, minHeight: 0 },
  fullCloseBtn: { marginTop: 18, background: "rgba(255,255,255,0.18)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: 600 },

  // Chat común
  row: { display: "flex" },
  bubbleUser: { background: BRAND, color: "#fff", borderTopRightRadius: 6 },
  bubbleBot: { background: "#fff", color: "#1E293B", border: "1px solid #E6EDF5", borderTopLeftRadius: 6 },
  typing: { color: "#94A3B8", fontStyle: "italic" },
  quicks: { display: "flex", flexWrap: "wrap", gap: 9, marginTop: 8 },

  // Full sizes
  thread: { flex: 1, overflowY: "auto", padding: "26px clamp(16px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: 14, maxWidth: 820, width: "100%", margin: "0 auto" },
  bubble: { maxWidth: "80%", padding: "14px 18px", borderRadius: 18, fontSize: 16.5, lineHeight: 1.55, whiteSpace: "pre-wrap", wordBreak: "break-word", boxShadow: "0 2px 10px rgba(15,23,42,0.05)" },
  quick: { background: "#E9F3FE", color: BRAND, border: "1px solid #CFE6FD", borderRadius: 999, padding: "10px 16px", fontSize: 14.5, fontWeight: 700, cursor: "pointer" },
  footer: { display: "flex", gap: 10, padding: "14px clamp(16px, 4vw, 48px)", borderTop: "1px solid #E6EDF5", background: "#fff", maxWidth: 820, width: "100%", margin: "0 auto", boxSizing: "border-box" },
  input: { flex: 1, border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "14px 18px", fontSize: 16, outline: "none", fontFamily: "Inter, sans-serif" },
  send: { width: 52, borderRadius: 14, border: "none", background: BRAND, color: "#fff", fontSize: 18, cursor: "pointer", flexShrink: 0 },

  // Mini (compact) sizes
  threadC: { flex: 1, overflowY: "auto", padding: "14px", background: "#F6F9FC", display: "flex", flexDirection: "column", gap: 9 },
  bubbleC: { maxWidth: "82%", padding: "9px 13px", borderRadius: 14, fontSize: 14, lineHeight: 1.45, whiteSpace: "pre-wrap", wordBreak: "break-word" },
  quickC: { background: "#E9F3FE", color: BRAND, border: "1px solid #CFE6FD", borderRadius: 999, padding: "7px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" },
  footerC: { display: "flex", gap: 8, padding: 10, borderTop: "1px solid #EEF2F6", background: "#fff" },
  inputC: { flex: 1, border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif" },
  sendC: { width: 44, borderRadius: 12, border: "none", background: BRAND, color: "#fff", fontSize: 16, cursor: "pointer", flexShrink: 0 },

  // CSAT overlay
  csatOverlay: { position: "fixed", inset: 0, zIndex: 9100, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", animation: "viFade .2s ease-out" },
  csatBox: { background: "#fff", borderRadius: 24, padding: "40px 36px", maxWidth: 380, width: "90%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, boxShadow: "0 24px 70px rgba(15,23,42,0.28)" },
  csatBoxMobile: { background: "#fff", borderRadius: 24, padding: "32px 24px", maxWidth: 340, width: "92%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, boxShadow: "0 24px 70px rgba(15,23,42,0.28)" },
  csatPanel: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%" },
  csatPanelC: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" },
  csatImg: { width: 100, height: 100, objectFit: "contain" },
  csatImgC: { width: 80, height: 80, objectFit: "contain" },
  csatTitle: { fontWeight: 800, fontSize: 20, color: "#0F172A", textAlign: "center" },
  csatSub: { fontSize: 13, color: "#64748B", textAlign: "center", marginTop: -4 },
  csatStars: { display: "flex", gap: 8, marginTop: 6 },
  starBtn: { background: "none", border: "none", fontSize: 32, cursor: "pointer", padding: "2px 4px", lineHeight: 1, transition: "transform .1s" },
  csatSkip: { marginTop: 4, background: "none", border: "none", color: "#94A3B8", fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "Inter, sans-serif" },
  csatThanks: { justifyContent: "center", minHeight: 160 },
  csatThanksText: { fontWeight: 800, fontSize: 24, color: BRAND, textAlign: "center" },
};

if (typeof document !== "undefined" && !document.getElementById("vi-anim")) {
  const st = document.createElement("style");
  st.id = "vi-anim";
  st.textContent = "@keyframes viFade{from{opacity:0}to{opacity:1}}@keyframes viPop{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}@keyframes viFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.vi-float{animation:viFloat 4s ease-in-out infinite}";
  document.head.appendChild(st);
}

window.ViWidget = ViWidget;
