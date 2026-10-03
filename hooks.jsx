// Reveal-on-scroll hook
function useReveal(threshold = 0.15) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, as = "div", stagger = false, className = "", ...rest }) {
  const [ref, inView] = useReveal();
  const Tag = as;
  const cls = (stagger ? "reveal-stagger " : "reveal ") + (inView ? "in " : "") + className;
  return <Tag ref={ref} className={cls.trim()} {...rest}>{children}</Tag>;
}

// Count up number on view
function CountUp({ to, duration = 1600, prefix = "", suffix = "", decimals = 0, format }) {
  const [ref, inView] = useReveal(0.4);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const display = format ? format(val) : val.toFixed(decimals);
  return <span ref={ref} className="tabular">{prefix}{display}{suffix}</span>;
}

// Magnetic button — subtle pull toward cursor
function Magnetic({ children, strength = 18, className = "", ...rest }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    setT({ x: x * strength, y: y * strength });
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ display: "inline-block", transform: `translate(${t.x}px, ${t.y}px)`, transition: "transform .3s var(--ease-spring)" }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}

// Tilt card on mouse
function Tilt({ children, max = 8, ...rest }) {
  const ref = React.useRef(null);
  const [s, setS] = React.useState({ rx: 0, ry: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        setS({ rx: -(y - .5) * max * 2, ry: (x - .5) * max * 2 });
      }}
      onMouseLeave={() => setS({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1200px) rotateX(${s.rx}deg) rotateY(${s.ry}deg)`,
        transition: "transform .3s var(--ease)",
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// Scroll progress hook (within an element)
function useScrollProgress(ref) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.8;
      const scrolled = vh - r.top;
      setP(Math.max(0, Math.min(1, scrolled / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

// Custom cursor blob (desktop only)
function CursorBlob() {
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [on, setOn] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    const onMove = (e) => { setPos({ x: e.clientX, y: e.clientY }); setOn(true); };
    const onOut = () => setOn(false);
    const onOver = (e) => {
      const t = e.target;
      setHover(t.matches?.("a,button,input,textarea,select,[role='button'],.tilt"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("mouseover", onOver, true);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseover", onOver, true);
    };
  }, []);
  return (
    <div className={"cursor-blob " + (on ? "on" : "")}
      style={{
        left: pos.x, top: pos.y,
        width: hover ? 44 : 16, height: hover ? 44 : 16,
        background: hover ? "rgba(30,136,229,.18)" : "var(--primary)",
        mixBlendMode: hover ? "normal" : "multiply",
      }} />
  );
}

// Router de RUTAS REALES (History API) — SEO-friendly. Cada página es una URL
// real (viaje.com.ve/tarifas) que Google indexa por separado. Vercel sirve
// index.html para estas rutas (ver vercel.json) y aquí el cliente renderiza.
function normalizePath(p) {
  if (!p) return "/";
  const clean = p.replace(/\/+$/, ""); // quitar slash final salvo raíz
  return clean === "" ? "/" : clean;
}

function useRoute() {
  const [route, setRoute] = React.useState(() => normalizePath(window.location.pathname));
  React.useEffect(() => {
    const onChange = () => {
      setRoute(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("popstate", onChange);     // atrás/adelante del navegador
    window.addEventListener("vj:navigate", onChange);  // navegación interna (pushState)
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener("vj:navigate", onChange);
    };
  }, []);
  return route;
}

function navigate(path) {
  if (normalizePath(window.location.pathname) === normalizePath(path)) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("vj:navigate"));
}

function Link({ to, className = "", style, children, ...rest }) {
  const isExternal = typeof to === "string" && /^(https?:|mailto:|tel:)/.test(to);
  return (
    <a href={to} className={className} style={style}
      onClick={(e) => {
        // Respetar abrir-en-nueva-pestaña, clic central y enlaces externos
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        if (isExternal) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >{children}</a>
  );
}

Object.assign(window, { useReveal, Reveal, CountUp, Magnetic, Tilt, useScrollProgress, CursorBlob, useRoute, navigate, Link });
