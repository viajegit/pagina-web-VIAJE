function Mark({ size = 36, white = false }) {
  const src = white ? "assets/logo-transparente.svg" : "assets/logo-azul.svg";
  return (
    <img src={src} alt="" width={size} height={size}
      style={{ display: "block", width: size, height: size, objectFit: "contain" }} />
  );
}

function Logo({ size = 36, white = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Mark size={size} white={white} />
      <span style={{
        fontSize: size * .62,
        fontWeight: 800,
        letterSpacing: "-.02em",
        color: white ? "#fff" : "var(--ink)",
      }}>Viaje</span>
    </div>
  );
}

window.Mark = Mark;
window.Logo = Logo;
