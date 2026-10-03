// Blog de Viaje — lista de notas (/blog) y detalle de nota (/blog/:slug).
// Contenido en window.BLOG_POSTS (ver blog-data.jsx). Sin bundler: todo global.

function formatBlogDate(iso) {
  try {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("es-VE", { day: "numeric", month: "long", year: "numeric" });
  } catch (e) {
    return iso;
  }
}

/* ---------- LISTA (/blog) ---------- */
function Blog() {
  const posts = window.BLOG_POSTS || [];
  return (
    <>
      <BlogHero />
      <section className="sec-sm">
        <div className="wrap">
          <Reveal stagger>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="blog-grid">
              {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
            </div>
          </Reveal>
        </div>
        <style>{`@media (max-width: 880px) { .blog-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
      <BlogCTA />
    </>
  );
}

function BlogHero() {
  return (
    <section style={{ position: "relative", padding: "100px 5vw 60px", overflow: "hidden" }}>
      <div className="map-grid map-grid-fade" />
      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Reveal>
          <div className="h-eyebrow eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Blog</div>
          <h1 className="h1" style={{ marginTop: 24, marginBottom: 24, maxWidth: 900, margin: "24px auto 24px" }}>
            Guías y <em style={{ color: "var(--primary)", fontStyle: "italic" }}>noticias</em> sobre moverte en Caracas.
          </h1>
          <p className="lede" style={{ margin: "0 auto" }}>
            Carpooling, tarifas y todo lo que hay detrás de Viaje.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BlogCard({ post }) {
  return (
    <Tilt max={4}>
      <Link to={"/blog/" + post.slug} className="card card-hover tilt" style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit" }}>
        <div style={{
          display: "inline-flex", alignSelf: "flex-start", fontSize: 11, fontFamily: "var(--mono)",
          textTransform: "uppercase", letterSpacing: ".08em", color: "var(--primary)",
          background: "var(--primary-50)", padding: "5px 10px", borderRadius: 999, marginBottom: 16,
        }}>
          {post.tag}
        </div>
        <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h3>
        <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55, marginBottom: 20, flex: 1 }}>{post.excerpt}</p>
        <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 8 }}>
          <span>{formatBlogDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} de lectura</span>
        </div>
      </Link>
    </Tilt>
  );
}

/* ---------- DETALLE (/blog/:slug) ---------- */
function BlogPost({ slug }) {
  const posts = window.BLOG_POSTS || [];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔎</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--ink)", marginBottom: 8 }}>Enlace no válido</h1>
        <p style={{ color: "var(--muted)", maxWidth: 380 }}>
          No encontramos esta nota. Puede que se haya movido o el enlace esté mal escrito.
        </p>
        <Link to="/blog" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>Ver todas las notas</Link>
      </div>
    );
  }

  // El JSON-LD (BlogPosting) de este post ya viene horneado en el HTML
  // estático por build.mjs/renderPageHtml -- no se duplica aquí client-side.

  return (
    <>
      <section style={{ position: "relative", padding: "100px 5vw 40px", overflow: "hidden" }}>
        <div className="map-grid map-grid-fade" />
        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div className="h-eyebrow eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>{post.tag}</div>
            <h1 className="h1" style={{ fontSize: "clamp(32px, 5vw, 56px)", marginTop: 24, marginBottom: 20 }}>{post.title}</h1>
            <div style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <span>{formatBlogDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} de lectura</span>
              <span>·</span>
              <ShareButton title={post.title} />
            </div>
          </Reveal>
        </div>
      </section>

      <article className="sec-sm">
        <div className="wrap" style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal stagger>
            {/* El primer párrafo responde la intención de búsqueda de una vez;
                el resumen y el CTA van justo después, antes del resto del
                contenido, para el lector que no piensa quedarse a leer todo. */}
            <BlogContentBlocks blocks={post.content.slice(0, 1)} />
            {post.keyTakeaways && <TLDRBox items={post.keyTakeaways} />}
            <InlinePlayStoreCTA campaign={"blog_" + post.slug} />
            <BlogContentBlocks blocks={post.content.slice(1)} />
          </Reveal>
          {post.related && post.related.length > 0 && (
            <RelatedPosts slugs={post.related} currentSlug={post.slug} />
          )}
        </div>
      </article>

      <BlogCTA />
    </>
  );
}

function ShareButton({ title }) {
  const [copied, setCopied] = React.useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch (e) { /* usuario canceló */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { /* clipboard no disponible */ }
  };

  return (
    <button onClick={share} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      color: "var(--muted)", fontSize: 13, fontWeight: 500,
    }}>
      {copied ? "✓ Enlace copiado" : "↗ Compartir"}
    </button>
  );
}

function TLDRBox({ items }) {
  return (
    <div style={{
      background: "var(--bg-soft)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)",
      padding: "24px 28px", margin: "8px 0 32px",
    }}>
      <div className="h-eyebrow eyebrow" style={{ marginBottom: 14 }}>En resumen</div>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10, margin: 0, paddingLeft: 0, listStyle: "none" }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--primary)", marginTop: 8, flexShrink: 0 }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InlinePlayStoreCTA({ campaign }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", margin: "0 0 36px" }}>
      <Magnetic>
        <a
          href={"https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dinline_cta%26utm_campaign%3D" + campaign}
          target="_blank" rel="noopener noreferrer" className="btn btn-primary"
        >
          Descargar en Google Play <ArrowRight />
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href="https://apps.apple.com/ve/app/viaje-app/id6806683135"
          target="_blank" rel="noopener noreferrer" className="btn btn-primary"
        >
          Descargar en App Store <ArrowRight />
        </a>
      </Magnetic>
    </div>
  );
}

function RelatedPosts({ slugs, currentSlug }) {
  const posts = (window.BLOG_POSTS || []).filter((p) => slugs.includes(p.slug) && p.slug !== currentSlug);
  if (!posts.length) return null;
  return (
    <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
      <h2 className="h3" style={{ marginBottom: 20 }}>Sigue leyendo</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {posts.map((p) => (
          <Link key={p.slug} to={"/blog/" + p.slug} className="card card-hover" style={{ padding: 20, textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ fontSize: 11, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--primary)", marginBottom: 8 }}>{p.tag}</div>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.35 }}>{p.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BlogInlineText({ text }) {
  if (typeof text === "string") return text;
  return text.map((part, i) =>
    typeof part === "string" ? (
      <span key={i}>{part}</span>
    ) : (
      <a
        key={i}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "underline" }}
      >
        {part.t}
      </a>
    )
  );
}

function BlogContentBlocks({ blocks }) {
  return (
    <>
      {(blocks || []).map((b, i) => {
        if (b.type === "h2") {
          return <h2 key={i} className="h3" style={{ marginTop: 40, marginBottom: 16 }}>{b.text}</h2>;
        }
        if (b.type === "list") {
          return (
            <ul key={i} style={{ display: "flex", flexDirection: "column", gap: 12, margin: "0 0 24px", paddingLeft: 0, listStyle: "none" }}>
              {b.items.map((it, j) => (
                <li key={j} style={{ display: "flex", gap: 12, fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--primary)", marginTop: 11, flexShrink: 0 }} />
                  <span><BlogInlineText text={it} /></span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "table") {
          return (
            <div key={i} style={{ overflowX: "auto", marginBottom: 28 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                <thead>
                  <tr>
                    {b.headers.map((h, hi) => (
                      <th key={hi} style={{
                        textAlign: "left", padding: "10px 16px", background: "var(--bg-soft)",
                        color: "var(--ink-3)", fontSize: 12, fontWeight: 600, textTransform: "uppercase",
                        letterSpacing: ".04em", borderBottom: "1px solid var(--line)", whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{
                          padding: "12px 16px", borderBottom: "1px solid var(--line-2)",
                          color: ci === 0 ? "var(--ink)" : "var(--ink-2)", fontWeight: ci === 0 ? 600 : 400,
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink-2)", marginBottom: 24 }}><BlogInlineText text={b.text} /></p>
        );
      })}
    </>
  );
}

/* ---------- CTA compartido ---------- */
function BlogCTA() {
  return (
    <section className="sec">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="h2" style={{ marginBottom: 24 }}>¿Te interesa?</h2>
          <p className="lede" style={{ margin: "0 auto 36px" }}>Ya está disponible en Caracas. Descárgala y pide tu primer viaje, o postúlate como piloto si vas en carro al trabajo.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic><a href="https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dblog_cta" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Descargar en Google Play <ArrowRight /></a></Magnetic>
            <Magnetic><a href="https://apps.apple.com/ve/app/viaje-app/id6806683135" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Descargar en App Store <ArrowRight /></a></Magnetic>
            <Magnetic><Link to="/registro-piloto" className="btn btn-outline btn-lg">Ser piloto</Link></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Blog = Blog;
window.BlogPost = BlogPost;
