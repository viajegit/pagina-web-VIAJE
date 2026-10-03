// Pre-compila los .jsx a .js plano (sin Babel CDN en producción).
// Cada archivo se transpila individualmente (no bundle) para mantener
// la estructura de scripts del index.html — los componentes siguen
// siendo globals (window.X), igual que con Babel-in-browser.
import { build } from "esbuild";
import {
  readdir,
  copyFile,
  mkdir,
  readFile,
  writeFile,
  rm,
} from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { PAGES } from "./seo-meta.mjs";

const SITE_URL = "https://www.viaje.com.ve";

const ROOT = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"),
);
const OUT = path.join(ROOT, "dist");

const JSX_FILES = [
  "hooks.jsx",
  "logo.jsx",
  "layout.jsx",
  "hero-map.jsx",
  "phone-mock.jsx",
  "home.jsx",
  "como-funciona.jsx",
  "tarifas.jsx",
  "pilotos.jsx",
  "nosotros.jsx",
  "blog-data.jsx",
  "blog.jsx",
  "forms.jsx",
  "track.jsx",
  "vi-widget.jsx",
  "descarga.jsx",
  "app.jsx",
];

async function main() {
  if (existsSync(OUT)) await rm(OUT, { recursive: true });
  await mkdir(OUT, { recursive: true });
  await mkdir(path.join(OUT, "assets"), { recursive: true });

  // 1) Transpilar cada .jsx → .js (sin bundle, sin minify-too-aggressive)
  await build({
    entryPoints: JSX_FILES.map((f) => path.join(ROOT, f)),
    outdir: OUT,
    bundle: false,
    minify: true,
    target: "es2018",
    loader: { ".jsx": "jsx" },
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  });

  // 2) Copiar assets, styles, favicon
  const assets = await readdir(path.join(ROOT, "assets"));
  await Promise.all(
    assets.map((f) =>
      copyFile(path.join(ROOT, "assets", f), path.join(OUT, "assets", f)),
    ),
  );
  await copyFile(path.join(ROOT, "styles.css"), path.join(OUT, "styles.css"));

  // Imágenes de Vi (widget web)
  if (existsSync(path.join(ROOT, "vi"))) {
    await mkdir(path.join(OUT, "vi"), { recursive: true });
    for (const f of await readdir(path.join(ROOT, "vi"))) {
      await copyFile(path.join(ROOT, "vi", f), path.join(OUT, "vi", f));
    }
  }
  if (existsSync(path.join(ROOT, "viaje-logo.svg"))) {
    await copyFile(
      path.join(ROOT, "viaje-logo.svg"),
      path.join(OUT, "viaje-logo.svg"),
    );
  }
  // Carpeta public/ → raíz del sitio. Aquí viven los logos que usan las
  // plantillas de correo (OTP, recuperación, founding): email-logo-azul.png, etc.
  // Sin esta copia quedaban 404 y los correos salían con el logo roto.
  if (existsSync(path.join(ROOT, "public"))) {
    // Copia recursiva: archivos sueltos (logos de correo) + subcarpetas (models/ con 3D)
    const copyDir = async (src, dst) => {
      await mkdir(dst, { recursive: true });
      for (const ent of await readdir(src, { withFileTypes: true })) {
        const s = path.join(src, ent.name),
          d = path.join(dst, ent.name);
        if (ent.isDirectory()) await copyDir(s, d);
        else await copyFile(s, d);
      }
    };
    await copyDir(path.join(ROOT, "public"), OUT);
  }
  if (existsSync(path.join(ROOT, "splash-loader.mp4"))) {
    await copyFile(
      path.join(ROOT, "splash-loader.mp4"),
      path.join(OUT, "splash-loader.mp4"),
    );
  }
  if (existsSync(path.join(ROOT, "splash-loader-vertical.mp4"))) {
    await copyFile(
      path.join(ROOT, "splash-loader-vertical.mp4"),
      path.join(OUT, "splash-loader-vertical.mp4"),
    );
  }

  // Páginas legales (privacidad / términos / eliminar cuenta) — públicas para usuarios,
  // Meta y las tiendas (Google Play exige una "Delete Account URL").
  for (const legal of [
    "privacidad.html",
    "terminos.html",
    "eliminar-cuenta.html",
    "soporte.html",
    "aliado.html",
  ]) {
    if (existsSync(path.join(ROOT, legal))) {
      await copyFile(path.join(ROOT, legal), path.join(OUT, legal));
    }
  }

  // 3) Reescribir index.html: quitar Babel CDN, usar react.production.min,
  //    cambiar .jsx → .js
  let html = await readFile(path.join(ROOT, "index.html"), "utf8");
  html = html
    .replace(
      /<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/,
      '<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>',
    )
    .replace(
      /<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/,
      '<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>',
    )
    .replace(
      /<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]+"[^>]*><\/script>\s*/,
      "",
    )
    .replace(/type="text\/babel" /g, "")
    .replace(/\.jsx"/g, '.js"');
  await writeFile(path.join(OUT, "index.html"), html);

  // 4) Prerender: una copia estática de index.html por ruta, con el
  //    <title>/<meta description>/OG/canonical correctos ya horneados en el
  //    HTML crudo. Necesario porque Google indexa el HTML sin ejecutar JS —
  //    el useEffect de app.jsx que actualiza estos tags en el cliente llega
  //    tarde para el snippet de búsqueda. Mismo <div id="root"> y mismos
  //    <script> que index.html, así que la hidratación funciona igual.
  await prerenderRoutes(html);

  console.log("✓ Web build completo →", OUT);
}

async function prerenderRoutes(baseHtml) {
  // Extraer los 3 posts del blog (slug/title/description) desde blog-data.jsx
  // sin parser JS: el archivo es solo `window.BLOG_POSTS = [ ...datos... ]`,
  // sin JSX ni imports, así que se puede evaluar directo con Function().
  const blogDataRaw = await readFile(path.join(ROOT, "blog-data.jsx"), "utf8");
  const blogPosts = new Function(
    "window",
    blogDataRaw + "\nreturn window.BLOG_POSTS;",
  )({});

  const routes = [
    // Las 8 páginas de marketing (menos "/", que ya quedó escrita arriba con
    // sus propios tags — no se toca).
    ...PAGES.filter((p) => p.path !== "/").map((p) => ({
      route: p.path,
      title: p.title,
      description: p.description,
      file: p.path.replace(/^\//, "") + ".html", // "/tarifas" → "tarifas.html"
    })),
    // Los 3 posts del blog.
    ...blogPosts.map((post) => ({
      route: `/blog/${post.slug}`,
      title: post.title + " · Viaje",
      description: post.description,
      file: `blog/${post.slug}.html`,
      // Datos para el JSON-LD BlogPosting (ver renderPageHtml) — mismo shape
      // que el <script> que BlogPost inyecta client-side en blog.jsx, para
      // que quede horneado en el HTML crudo y no dependa de JS.
      post: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
      },
    })),
  ];

  for (const r of routes) {
    const outPath = path.join(OUT, r.file);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, renderPageHtml(baseHtml, r));
  }
}

// OJO: cada entrada debe coincidir EXACTAMENTE con las preguntas visibles del
// FAQSection real de esa página (TarifasFAQSection en tarifas.jsx,
// PilotosFAQSection en pilotos.jsx) -- mismo principio que el bloqueo del
// FAQPage de home más abajo: el schema debe describir contenido presente en
// ESA página, nunca copiar/pegar preguntas de otra.
const FAQ_BY_ROUTE = {
  "/tarifas": [
    {
      q: "¿Por qué el precio cambia según la ruta?",
      a: "Depende de la zona geográfica del trayecto, no de la demanda ni la hora: Viajecito para la misma zona urbana, Viaje si cruzas cerro o cambio de altitud, El Viaje para recorridos fuera del área urbana.",
    },
    {
      q: "¿El precio sube en hora pico?",
      a: "No. Viaje no tiene tarifa dinámica: el precio es el mismo un lunes a las 7am que un viernes a las 6pm.",
    },
    {
      q: "¿Puedo pagar en bolívares?",
      a: "Sí. En efectivo puedes pagar en Bs o en USD directo al piloto. También hay Pago Móvil con validación automática y saldo VIP (wallet recargable).",
    },
    {
      q: "¿Hay que dar propina?",
      a: "No es obligatorio. El piloto ya recibe el 90% del precio del viaje; Viaje cobra una comisión del 10%.",
    },
    {
      q: "¿Cómo sé cuánto va a costar mi viaje antes de pedirlo?",
      a: "El precio se calcula automáticamente según la categoría de tu ruta y se muestra antes de confirmar — no hay recálculo después de iniciar el viaje.",
    },
    {
      q: "¿Es más económico que una app de transporte tradicional?",
      a: "Sí. Un viaje en Viaje cuesta entre $0,55 y $1,10 en la mayoría de las rutas dentro de Caracas, porque no es un servicio bajo demanda: es compartir una ruta que un piloto ya recorre todos los días.",
    },
  ],
  "/pilotos": [
    {
      q: "¿Cuánto puedo ganar como piloto?",
      a: "Entre $74 y $445 al mes, según cuántos viajes hagas en tu ruta diaria — sin desviarte un metro de tu camino habitual.",
    },
    {
      q: "¿Qué documentos necesito para postularme?",
      a: "Cédula, licencia de conducir, RIF y carnet de circulación. Los subes dentro de la app después de llenar el formulario.",
    },
    {
      q: "¿Cuánto tarda la verificación?",
      a: "Entre 24 y 48 horas después de enviar el formulario. Te contactamos por correo y WhatsApp con el resultado.",
    },
    {
      q: "¿Tengo que dedicarme de tiempo completo?",
      a: "No. Viaje está pensado para tu ruta diaria habitual — al trabajo, la universidad, donde ya vayas todos los días. No cambias tu rutina.",
    },
    {
      q: "¿Cuánto me quedo yo de cada viaje?",
      a: "El 90% del precio del viaje. Viaje cobra una comisión del 10%.",
    },
  ],
};

function renderPageHtml(baseHtml, { route, title, description, post }) {
  const url = SITE_URL + route;
  let out = baseHtml;

  // El FAQPage de index.html corresponde a las preguntas visibles SOLO en la
  // home -- hornearlo igual en cada página (tarifas, pilotos, blog/*, etc.)
  // viola la guía de datos estructurados de Google (el schema debe describir
  // contenido presente en ESA página) y arriesga que Google descarte el
  // structured data del sitio entero. Se quita aquí; la home lo conserva
  // porque esta función nunca se llama para "/" (se escribe aparte, arriba).
  out = out.replace(
    /\s*<!-- FAQ para resultados destacados en Google -->\s*<script type="application\/ld\+json">[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?<\/script>/,
    "",
  );

  // Si esta ruta tiene su propio FAQSection visible (ver FAQ_BY_ROUTE arriba),
  // se hornea su propio FAQPage -- nunca el mismo bloque que se acaba de quitar.
  if (FAQ_BY_ROUTE[route]) {
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_BY_ROUTE[route].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    out = out.replace(
      "</head>",
      `  <script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>\n</head>`,
    );
  }

  out = out.replace(
    /<title>Viaje · Innovando Experiencias<\/title>/,
    `<title>${title}</title>`,
  );
  out = out.replace(
    /<meta name="description" content="Viaje conecta tu ruta diaria con conductores que ya van por ahí\. Caracas a \$0,55 por trayecto\." \/>/,
    `<meta name="description" content="${description}" />`,
  );
  out = out.replace(
    /<meta property="og:title" content="Viaje · Innovando Experiencias" \/>/,
    `<meta property="og:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta property="og:description" content="Viaje conecta tu ruta diaria con conductores que ya van por ahí\. Carpooling en Caracas desde \$0,55 por trayecto\." \/>/,
    `<meta property="og:description" content="${description}" />`,
  );
  out = out.replace(
    /<meta property="og:url" content="https:\/\/www\.viaje\.com\.ve\/" \/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  out = out.replace(
    /<meta name="twitter:title" content="Viaje · Innovando Experiencias" \/>/,
    `<meta name="twitter:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta name="twitter:description" content="Carpooling en Caracas desde \$0,55 por trayecto\." \/>/,
    `<meta name="twitter:description" content="${description}" />`,
  );

  // index.html no trae <link rel="canonical"> — se agrega aquí si falta.
  if (/<link rel="canonical"/.test(out)) {
    out = out.replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${url}" />`,
    );
  } else {
    out = out.replace(
      "</head>",
      `  <link rel="canonical" href="${url}" />\n</head>`,
    );
  }

  // Posts del blog: agregar un 4º bloque JSON-LD (BlogPosting) además de los
  // 3 genéricos (Organization/MobileApplication/FAQPage) que ya trae
  // index.html. Mismo shape que el que BlogPost inyecta client-side en
  // blog.jsx, pero horneado en el HTML crudo — Google no ejecuta JS de forma
  // confiable para el snippet de búsqueda. No se toca en páginas no-blog.
  if (post) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: "Viaje" },
      publisher: {
        "@type": "Organization",
        name: "Viaje",
        logo: {
          "@type": "ImageObject",
          url: "https://www.viaje.com.ve/email-logo-azul.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/${post.slug}`,
      },
      image: "https://www.viaje.com.ve/email-logo-azul.png",
    };
    out = out.replace(
      "</head>",
      `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`,
    );
  }

  return out;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
