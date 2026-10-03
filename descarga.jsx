function Descarga() {
  return (
    <section style={{ position: "relative", padding: "100px 5vw 100px", overflow: "hidden", minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="map-grid map-grid-fade" />
      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 640 }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Viaje ya está disponible</div>
          <h1 className="h1" style={{ marginTop: 24, marginBottom: 16, fontSize: "clamp(36px, 6vw, 56px)" }}>
            Descarga <em style={{ color: "var(--primary)", fontStyle: "italic" }}>Viaje</em>
          </h1>
          <p className="lede" style={{ margin: "0 auto 12px" }}>
            Ya puedes descargarla y crear tu cuenta. El lanzamiento oficial está por venir — te avisaremos cuando puedas empezar a pedir y dar viajes.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
            <a
              href="https://apps.apple.com/ve/app/viaje-app/id6806683135"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                padding: "32px 40px", borderRadius: 20, background: "var(--bg-card, #fff)",
                boxShadow: "inset 0 0 0 1px var(--line)", textDecoration: "none", minWidth: 220,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>iPhone</span>
              <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83" alt="Disponible en App Store" style={{ height: 44, width: "auto" }} />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dqr_banner%26utm_medium%3Doffline%26utm_campaign%3Duniversidades"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                padding: "32px 40px", borderRadius: 20, background: "var(--bg-card, #fff)",
                boxShadow: "inset 0 0 0 1px var(--line)", textDecoration: "none", minWidth: 220,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>Android</span>
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png" alt="Disponible en Google Play" style={{ height: 44, width: "auto" }} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Descarga });
