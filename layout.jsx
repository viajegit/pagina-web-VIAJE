function Nav() {
  const route = useRoute();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Cerrar menú al cambiar de ruta
  React.useEffect(() => { setMenuOpen(false); }, [route]);
  const openVi = () => window.dispatchEvent(new Event("open-vi"));
  // Bloquear scroll del body cuando menú abierto
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/como-funciona", label: "Cómo funciona" },
    { to: "/tarifas", label: "Tarifas" },
    { to: "/pilotos", label: "Sé piloto" },
    { to: "/nosotros", label: "Nosotros" },
    { to: "/blog", label: "Blog" },
    { to: "/contacto", label: "Contacto" },
  ];

  // Sobre el hero oscuro de la página de pilotos (sin scroll), el nav usa texto claro.
  const lightOnDark = route === "/pilotos" && !scrolled;

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 80,
        background: scrolled
          ? "rgba(255,255,255,.92)"
          : (lightOnDark ? "linear-gradient(180deg, rgba(7,13,24,.62) 0%, rgba(7,13,24,0) 100%)" : "rgba(255,255,255,.0)"),
        backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(10,22,40,.06)" : "1px solid transparent",
        transition: "background .3s var(--ease), border-color .3s var(--ease), backdrop-filter .3s var(--ease)",
        padding: "14px 5vw",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1480, margin: "0 auto" }}>
          <a href="/" onClick={(e) => { e.preventDefault(); window.navigate("/"); }} style={{ display: "flex" }}><Logo size={34} white={lightOnDark} /></a>

          {/* Desktop links */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {links.map((l) => {
              const active = route === l.to;
              return (
                <a key={l.to} href={l.to} onClick={(e) => { e.preventDefault(); window.navigate(l.to); }}
                  style={{
                    position: "relative", padding: "10px 14px", fontSize: 14,
                    fontWeight: active ? 700 : 500,
                    color: active
                      ? (lightOnDark ? "#fff" : "var(--primary)")
                      : (lightOnDark ? "rgba(255,255,255,.82)" : "var(--ink-2)"),
                    borderRadius: 999, transition: "color .2s",
                  }}>
                  {l.label}
                  {active && <span style={{
                    position: "absolute", left: 14, right: 14, bottom: 4, height: 2,
                    background: "var(--primary)", borderRadius: 999,
                    animation: "underBar .4s var(--ease)",
                  }} />}
                </a>
              );
            })}
            <button onClick={openVi}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "9px 14px", fontSize: 14, fontWeight: 600,
                color: lightOnDark ? "#fff" : "var(--primary)",
                background: lightOnDark ? "rgba(255,255,255,.10)" : "rgba(2,128,249,.08)",
                border: lightOnDark ? "1px solid rgba(255,255,255,.22)" : "1px solid rgba(2,128,249,.22)",
                borderRadius: 999, cursor: "pointer", marginLeft: 4,
                transition: "color .2s, background .2s, border-color .2s",
              }}>
              💬 Habla con un asesor
            </button>
            <Magnetic strength={8}>
              <a href="/registro" onClick={(e) => { e.preventDefault(); window.navigate("/registro"); }} className="btn btn-primary btn-sm" style={{ marginLeft: 12 }}>
                Pre-registrarme
                <ArrowRight size={14} />
              </a>
            </Magnetic>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Abrir menú"
            style={{
              display: "none", background: "transparent", border: "none", padding: 8,
              cursor: "pointer", zIndex: 9999, position: "relative",
            }}>
            <div style={{ width: 26, height: 18, position: "relative" }}>
              <span style={{
                position: "absolute", top: menuOpen ? 8 : 0, left: 0, width: 26, height: 2,
                background: lightOnDark ? "#fff" : "var(--ink)", borderRadius: 2,
                transform: menuOpen ? "rotate(45deg)" : "none",
                transition: "all .3s var(--ease)",
              }} />
              <span style={{
                position: "absolute", top: 8, left: 0, width: 26, height: 2,
                background: lightOnDark ? "#fff" : "var(--ink)", borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity .2s var(--ease)",
              }} />
              <span style={{
                position: "absolute", top: menuOpen ? 8 : 16, left: 0, width: 26, height: 2,
                background: lightOnDark ? "#fff" : "var(--ink)", borderRadius: 2,
                transform: menuOpen ? "rotate(-45deg)" : "none",
                transition: "all .3s var(--ease)",
              }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Backdrop oscuro · click cierra · solo aparece con menú abierto */}
      <div
        className="nav-mobile-backdrop"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)",
          zIndex: 8999,
          display: "none",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity .25s var(--ease)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      />

      {/* Mobile drawer lateral · slide desde derecha · 85% ancho máx 380px */}
      <aside
        className="nav-mobile-drawer"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "85%", maxWidth: 380, height: "100vh",
          background: "#FFFFFF",
          zIndex: 9000,
          display: "none",
          flexDirection: "column",
          padding: "20px 24px 32px",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform .3s var(--ease)",
          boxShadow: "-12px 0 40px rgba(15,23,42,.12)",
          overflow: "hidden auto",
        }}>
        {/* Header del drawer con X */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <Logo size={28} />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            style={{
              background: "transparent", border: "none", padding: 8,
              cursor: "pointer", width: 40, height: 40,
              borderRadius: 999, display: "grid", placeItems: "center",
              color: "var(--ink)", fontSize: 22, lineHeight: 1,
            }}>
            ×
          </button>
        </div>

        {/* Links */}
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {links.map((l) => {
            const active = route === l.to;
            return (
              <a key={l.to} href={l.to} onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.navigate(l.to); }}
                style={{
                  padding: "16px 4px", fontSize: 22, fontWeight: 600,
                  color: active ? "var(--primary)" : "var(--ink)",
                  borderBottom: "1px solid #F1F5F9",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  textDecoration: "none",
                }}>
                <span>{l.label}</span>
                <span style={{ fontSize: 16, color: active ? "var(--primary)" : "#CBD5E1" }}>→</span>
              </a>
            );
          })}
          <button onClick={() => { setMenuOpen(false); openVi(); }}
            style={{
              padding: "16px 4px", fontSize: 22, fontWeight: 600, color: "var(--primary)",
              borderBottom: "1px solid #F1F5F9", background: "transparent", border: "none",
              borderBottomColor: "#F1F5F9", borderBottomWidth: 1, borderBottomStyle: "solid",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              textAlign: "left", cursor: "pointer", width: "100%",
            }}>
            <span>💬 Habla con un asesor</span>
            <span style={{ fontSize: 16, color: "var(--primary)" }}>→</span>
          </button>
        </nav>

        {/* CTA */}
        <a href="/registro" onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.navigate("/registro"); }} className="btn btn-primary btn-lg"
          style={{ marginTop: 24, justifyContent: "center", padding: "16px 22px", fontSize: 16, width: "100%" }}>
          Pre-registrarme <ArrowRight size={16} />
        </a>

        {/* Footer */}
        <div style={{ marginTop: "auto", paddingTop: 32, fontSize: 12, color: "var(--muted)" }}>
          <div><a href="mailto:hola@viaje.com.ve" style={{ color: "var(--muted)" }}>hola@viaje.com.ve</a></div>
          <div style={{ marginTop: 4 }}>Caracas, Venezuela 🇻🇪</div>
        </div>
      </aside>

      <style>{`
        @keyframes underBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (max-width: 880px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: block !important; }
          .nav-mobile-drawer { display: flex !important; }
          .nav-mobile-backdrop { display: block !important; }
        }
      `}</style>
    </>
  );
}

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "var(--ink)",
      color: "#A8B5CC",
      padding: "80px 5vw 40px",
      position: "relative",
      overflow: "hidden",
    }}>
      <FooterBg />
      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, paddingBottom: 56 }}
          className="footer-grid">
          <div>
            <Logo size={36} white />
            <p style={{ marginTop: 18, fontSize: 14, color: "#7E8FAA", maxWidth: 320, lineHeight: 1.6 }}>
              Innovando experiencias. Conectamos tu ruta diaria con conductores que ya van por ahí.
            </p>
            <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "rgba(255,255,255,.06)", borderRadius: 999, fontSize: 12, color: "#fff" }}>
              <span className="pulse-dot" /> Ya disponible en Caracas
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dfooter" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png" alt="Disponible en Google Play" style={{ height: 44, width: "auto", display: "block" }} />
              </a>
              <a href="https://apps.apple.com/ve/app/viaje-app/id6806683135" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
                <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83" alt="Disponible en App Store" style={{ height: 44, width: "auto", display: "block" }} />
              </a>
            </div>
          </div>
          {[
            { t: "Producto", l: [["Cómo funciona", "/como-funciona"], ["Tarifas", "/tarifas"], ["Sé piloto", "/registro-piloto"], ["Nosotros", "/nosotros"], ["Blog", "/blog"]] },
            { t: "Empezar", l: [["Pre-registrarme", "/registro"], ["Postularme", "/registro-piloto"], ["Contacto", "/contacto"]] },
            { t: "Compañía", l: [["hola@viaje.com.ve", "mailto:hola@viaje.com.ve", true], ["soporte@viaje.com.ve", "mailto:soporte@viaje.com.ve", true], ["Instagram", "https://www.instagram.com/viaje.ve/", true], ["Caracas, VE 🇻🇪", "#", true]] },
          ].map((c) => (
            <div key={c.t}>
              <div style={{ fontSize: 11, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".14em", color: "#5C6E8A", marginBottom: 18 }}>{c.t}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {c.l.map(([label, to, ext]) => (
                  <li key={label}>
                    <a href={to}
                      onClick={ext ? undefined : (e) => { e.preventDefault(); window.navigate(to); }}
                      target={to.startsWith("http") ? "_blank" : undefined}
                      rel={to.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="under-grow"
                      style={{ fontSize: 14, color: "#C8D3E5" }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.08)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "#5C6E8A", flexWrap: "wrap", gap: 16,
        }}>
          <div>© 2026 Viaje · Hecho en Caracas</div>
          <div style={{ fontFamily: "var(--mono)" }}>v0.2 · innovando experiencias</div>
        </div>
        <div style={{
          paddingTop: 14, marginTop: 14, borderTop: "1px solid rgba(255,255,255,.06)",
          fontSize: 11, color: "#4C5D78",
        }}>
          Detrás de Viaje está la Asociación Civil Juventud Internacional de Desarrollo (JID) · RIF J-50068009-0
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterBg() {
  return (
    <svg viewBox="0 0 1400 420" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .14 }}>
      <defs>
        <linearGradient id="fglow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1E88E5" stopOpacity="0" />
          <stop offset=".5" stopColor="#1E88E5" stopOpacity=".7" />
          <stop offset="1" stopColor="#1E88E5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#fglow)" strokeWidth="1">
        <path d="M0 100 C 250 50, 500 200, 750 130 S 1200 80, 1400 200" />
        <path d="M0 220 C 200 280, 600 180, 900 250 S 1250 320, 1400 280" />
        <path d="M0 340 C 300 380, 700 320, 1000 360 S 1300 380, 1400 360" />
      </g>
      <g fill="#1E88E5">
        <circle cx="180" cy="86" r="2" />
        <circle cx="540" cy="170" r="2" />
        <circle cx="920" cy="125" r="2" />
        <circle cx="270" cy="262" r="2" />
        <circle cx="780" cy="218" r="2" />
        <circle cx="1180" cy="290" r="2" />
      </g>
    </svg>
  );
}

function MobileStickyCTA() {
  return (
    <>
      <div className="mobile-sticky-cta" style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 90,
        display: "none", gap: 10, padding: "10px 14px",
        background: "var(--bg-card, #fff)", borderTop: "1px solid var(--line)",
        boxShadow: "0 -8px 24px rgba(10,22,40,.08)",
      }}>
        <a href="https://wa.me/584164178875" target="_blank" rel="noopener noreferrer" aria-label="Llamar o escribir por WhatsApp"
          style={{
            width: 46, flexShrink: 0, display: "grid", placeItems: "center",
            borderRadius: "var(--r-md)", background: "var(--bg-soft)",
            boxShadow: "inset 0 0 0 1px var(--line)", fontSize: 20,
          }}>📞</a>
        <a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dsticky_cta%26utm_campaign%3Dmobile_bar"
          target="_blank" rel="noopener noreferrer" className="btn btn-primary"
          style={{ flex: 1, justifyContent: "center", padding: "10px 6px", fontSize: 13 }}>
          Google Play
        </a>
        <a href="https://apps.apple.com/ve/app/viaje-app/id6806683135"
          target="_blank" rel="noopener noreferrer" className="btn btn-primary"
          style={{ flex: 1, justifyContent: "center", padding: "10px 6px", fontSize: 13 }}>
          App Store
        </a>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-cta { display: flex !important; }
          .page { padding-bottom: 68px; }
        }
      `}</style>
    </>
  );
}

function Layout({ children }) {
  return (
    <div className="page">
      <Nav />
      <main className="page-enter" key={window.location.pathname}>{children}</main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

Object.assign(window, { Layout, Nav, Footer, ArrowRight });
