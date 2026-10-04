function Home() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(HeroSection, null),
    React.createElement(TickerSection, null),
    React.createElement(StatsSection, null),
    React.createElement(HowItWorksSection, null),
    React.createElement(PilotsSection, null),
    React.createElement(FeaturesSection, null),
    React.createElement(TarifasSection, null),
    React.createElement(FAQSection, null),
    React.createElement(FinalCTASection, null),
  );
}
function HeroSection() {
  return React.createElement(
    "section",
    {
      style: {
        position: "relative",
        padding: "80px 5vw 100px",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      },
    },
    React.createElement("div", { className: "map-grid map-grid-fade" }),
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "-10%",
        right: "-10%",
        width: 600,
        height: 600,
        background:
          "radial-gradient(circle, rgba(30,136,229,.18), transparent 60%)",
        filter: "blur(20px)",
        pointerEvents: "none",
      },
    }),
    React.createElement(
      "div",
      {
        className: "wrap",
        style: { position: "relative", zIndex: 2, width: "100%" },
      },
      React.createElement(
        "div",
        {
          className: "hero-grid",
          style: {
            display: "grid",
            gridTemplateColumns: "1.1fr .9fr",
            gap: 64,
            alignItems: "center",
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            Reveal,
            null,
            React.createElement(
              "div",
              { className: "h-eyebrow eyebrow" },
              "\u{1F1FB}\u{1F1EA} Carpooling verificado \xB7 Caracas",
            ),
          ),
          React.createElement(
            Reveal,
            null,
            React.createElement(
              "h1",
              { className: "h1", style: { marginTop: 24, marginBottom: 24 } },
              "Tu ruta DIARIASS1,",
              React.createElement("br", null),
              React.createElement(
                "span",
                {
                  style: {
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: 12,
                    flexWrap: "wrap",
                  },
                },
                "ahora ",
                React.createElement(
                  "em",
                  {
                    style: {
                      fontStyle: "italic",
                      color: "var(--primary)",
                      position: "relative",
                    },
                  },
                  "compartida",
                  React.createElement(RouteUnderline, null),
                ),
                ".",
              ),
            ),
          ),
          React.createElement(
            Reveal,
            null,
            React.createElement(
              "p",
              { className: "lede", style: { marginBottom: 36 } },
              "El carpooling que conecta tu camino al trabajo con conductores que ya pasan por ah\xED.",
              " ",
              React.createElement(
                "strong",
                { style: { color: "var(--ink)", fontWeight: 600 } },
                "Hasta 10\xD7 m\xE1s barato",
              ),
              " que un taxi, desde $0,55 por trayecto.",
            ),
          ),
          React.createElement(
            Reveal,
            null,
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  alignItems: "center",
                },
              },
              React.createElement(
                Magnetic,
                { strength: 10 },
                React.createElement(
                  "a",
                  {
                    href: "https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dhome_hero",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn btn-primary btn-lg",
                  },
                  "Descargar en Google Play ",
                  React.createElement(ArrowRight, null),
                ),
              ),
              React.createElement(
                Magnetic,
                { strength: 10 },
                React.createElement(
                  "a",
                  {
                    href: "https://apps.apple.com/ve/app/viaje-app/id6806683135",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn btn-primary btn-lg",
                  },
                  "Descargar en App Store ",
                  React.createElement(ArrowRight, null),
                ),
              ),
              React.createElement(
                Magnetic,
                { strength: 6 },
                React.createElement(
                  Link,
                  {
                    to: "/registro-piloto",
                    className: "btn btn-outline btn-lg",
                  },
                  "Quiero ser piloto",
                ),
              ),
            ),
          ),
          React.createElement(
            Reveal,
            { stagger: !0 },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 24,
                  marginTop: 44,
                  flexWrap: "wrap",
                },
              },
              [
                ["Verificaci\xF3n de pilotos", "\u{1F6E1}\uFE0F"],
                ["Match en segundos", "\u23F1\uFE0F"],
                ["Tracking GPS en vivo", "\u{1F4CD}"],
              ].map(([e, a]) =>
                React.createElement(
                  "div",
                  {
                    key: e,
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 13,
                      color: "var(--ink-3)",
                      fontWeight: 500,
                    },
                  },
                  React.createElement("span", { style: { fontSize: 16 } }, a),
                  e,
                ),
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          {
            className: "hero-right",
            style: {
              position: "relative",
              display: "grid",
              placeItems: "center",
            },
          },
          React.createElement(HeroMap, null),
          React.createElement(
            "div",
            {
              style: {
                position: "absolute",
                bottom: -40,
                right: -10,
                zIndex: 3,
                display: "none",
              },
              className: "hero-phone-show",
            },
            React.createElement(PhoneMock, null),
          ),
        ),
      ),
    ),
    React.createElement(
      "style",
      null,
      `
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `,
    ),
  );
}
function RouteUnderline() {
  return React.createElement(
    "svg",
    {
      viewBox: "0 0 280 14",
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -10,
        width: "100%",
        height: 14,
        overflow: "visible",
      },
      preserveAspectRatio: "none",
    },
    React.createElement("path", {
      d: "M 4 10 C 60 2, 120 14, 180 6 S 260 2, 276 8",
      stroke: "var(--primary)",
      strokeWidth: "3",
      fill: "none",
      strokeLinecap: "round",
      pathLength: "100",
      style: {
        strokeDasharray: 100,
        strokeDashoffset: 100,
        animation: "drawLine 1.6s var(--ease) .6s forwards",
      },
    }),
    React.createElement(
      "style",
      null,
      "@keyframes drawLine { to { stroke-dashoffset: 0; } }",
    ),
  );
}
function TickerSection() {
  const e = [
      "El Para\xEDso \u2192 Chacao \xB7 $0,55",
      "Sabana Grande \u2192 Altamira \xB7 $0,55",
      "Catia \u2192 Plaza Venezuela \xB7 $0,55",
      "Caracas \u2192 Petare \xB7 $1,10",
      "La Urbina \u2192 Las Mercedes \xB7 $0,55",
      "El Valle \u2192 La Castellana \xB7 $0,55",
      "Los Palos Grandes \u2192 Chacao \xB7 $0,55",
      "Caracas \u2192 Los Teques \xB7 $3,30",
    ],
    a = [...e, ...e];
  return React.createElement(
    "section",
    {
      style: {
        padding: "32px 0",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-soft)",
      },
    },
    React.createElement(
      "div",
      { className: "marquee" },
      React.createElement(
        "div",
        { className: "marquee-track" },
        a.map((o, t) =>
          React.createElement(
            "span",
            {
              key: t,
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--ink-2)",
                fontWeight: 500,
              },
            },
            React.createElement("span", {
              style: {
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "var(--primary)",
              },
            }),
            o,
          ),
        ),
      ),
    ),
  );
}
function StatsSection() {
  const e = [
    {
      v: 0.55,
      prefix: "$",
      decimals: 2,
      label: "por trayecto",
      note: "10\xD7 m\xE1s barato que un taxi",
    },
    {
      v: 10,
      suffix: "\xD7",
      label: "m\xE1s barato",
      note: "vs otras apps, taxis",
    },
    { v: 450, prefix: "$", label: "al mes", note: "ganancia m\xE1xima piloto" },
    { v: 3, label: "pasajeros m\xE1x", note: "por cada viaje compartido" },
  ];
  return React.createElement(
    "section",
    { className: "sec" },
    React.createElement(
      "div",
      { className: "wrap" },
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          { className: "h-eyebrow eyebrow", style: { marginBottom: 14 } },
          "Los n\xFAmeros",
        ),
        React.createElement(
          "h2",
          { className: "h2", style: { maxWidth: 720, marginBottom: 60 } },
          "Lo que pagas, lo que ganas, lo que ahorras.",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--line)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            border: "1px solid var(--line)",
          },
          className: "stats-grid",
        },
        e.map((a, o) =>
          React.createElement(
            Reveal,
            {
              key: o,
              as: "div",
              style: {
                background: "var(--surface)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minHeight: 180,
              },
            },
            React.createElement(
              "div",
              {
                className: "display",
                style: {
                  fontSize: 64,
                  color: "var(--primary)",
                  lineHeight: 1,
                  fontFamily: "var(--serif)",
                },
              },
              React.createElement(CountUp, {
                to: a.v,
                decimals: a.decimals || 0,
                prefix: a.prefix || "",
                suffix: a.suffix || "",
              }),
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginTop: 8,
                },
              },
              a.label,
            ),
            React.createElement(
              "div",
              { style: { fontSize: 13, color: "var(--muted)" } },
              a.note,
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      "style",
      null,
      "@media (max-width: 880px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }",
    ),
  );
}
function HowItWorksSection() {
  const e = React.useRef(null),
    a = useScrollProgress(e),
    o = [
      {
        n: "01",
        t: "Configura tu ruta",
        d: "Pones tu casa y tu trabajo una vez. Eliges horario. Lo guardamos por 6 meses y olv\xEDdate.",
        img: React.createElement(StepRoute, null),
      },
      {
        n: "02",
        t: "Busca pilotos cerca",
        d: "Te mostramos conductores que pasan por tu zona, en tu horario. Ves su foto, veh\xEDculo y rating.",
        img: React.createElement(StepMatch, null),
      },
      {
        n: "03",
        t: "Paga y viaja",
        d: "Pagas con tu saldo VIP, recargado al instante. Tracking GPS en vivo. Bot\xF3n de emergencia siempre listo.",
        img: React.createElement(StepRide, null),
      },
    ],
    t = Math.min(2, Math.floor(a * 3.4));
  return React.createElement(
    "section",
    {
      ref: e,
      className: "sec",
      style: {
        background: "var(--ink)",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      },
    },
    React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        opacity: 0.35,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 60% 40% at 20% 30%, rgba(30,136,229,.35), transparent 70%)",
      },
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        opacity: 0.25,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(100,181,246,.3), transparent 70%)",
      },
    }),
    React.createElement(
      "div",
      { className: "wrap", style: { position: "relative" } },
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          {
            className: "h-eyebrow eyebrow",
            style: { color: "var(--primary-light)", marginBottom: 14 },
          },
          "C\xF3mo funciona",
        ),
        React.createElement(
          "h2",
          {
            className: "h2",
            style: { color: "#fff", maxWidth: 760, marginBottom: 80 },
          },
          "Tres pasos. Sin enredos.",
        ),
      ),
      React.createElement(
        "div",
        {
          className: "how-desktop",
          style: {
            gridTemplateColumns: ".9fr 1.1fr",
            gap: 80,
            alignItems: "start",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              position: "sticky",
              top: 120,
              height: "60vh",
              display: "grid",
              placeItems: "center",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                position: "relative",
                width: "100%",
                maxWidth: 460,
                aspectRatio: "1/1",
              },
            },
            o.map((r, i) =>
              React.createElement(
                "div",
                {
                  key: i,
                  style: {
                    position: "absolute",
                    inset: 0,
                    opacity: i === t ? 1 : 0,
                    transform:
                      i === t
                        ? "scale(1) translateY(0)"
                        : i < t
                          ? "scale(.9) translateY(-30px)"
                          : "scale(.9) translateY(30px)",
                    transition: "all .7s var(--ease)",
                  },
                },
                r.img,
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 32 } },
          o.map((r, i) =>
            React.createElement(
              "div",
              {
                key: i,
                style: {
                  padding: 36,
                  borderRadius: "var(--r-xl)",
                  background:
                    i === t ? "rgba(30,136,229,.15)" : "rgba(255,255,255,.03)",
                  border:
                    i === t
                      ? "1px solid rgba(100,181,246,.4)"
                      : "1px solid rgba(255,255,255,.06)",
                  transition: "all .5s var(--ease)",
                  transform: i === t ? "scale(1)" : "scale(.98)",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "baseline",
                    gap: 18,
                    marginBottom: 14,
                  },
                },
                React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--mono)",
                      fontSize: 13,
                      color: "var(--primary-light)",
                      letterSpacing: ".1em",
                    },
                  },
                  r.n,
                ),
                React.createElement(
                  "h3",
                  { className: "h3", style: { color: "#fff" } },
                  r.t,
                ),
              ),
              React.createElement(
                "p",
                {
                  style: {
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "#B8C4D6",
                    maxWidth: 520,
                  },
                },
                r.d,
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          className: "how-mobile",
          style: { flexDirection: "column", gap: 40 },
        },
        o.map((r, i) =>
          React.createElement(
            "div",
            {
              key: i,
              style: {
                padding: 24,
                borderRadius: "var(--r-xl)",
                background: "rgba(30,136,229,.12)",
                border: "1px solid rgba(100,181,246,.25)",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  width: "100%",
                  aspectRatio: "1/1",
                  maxHeight: 320,
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 20,
                },
              },
              r.img,
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  marginBottom: 10,
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "var(--primary-light)",
                    letterSpacing: ".1em",
                  },
                },
                r.n,
              ),
              React.createElement(
                "h3",
                {
                  style: {
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                  },
                },
                r.t,
              ),
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "#B8C4D6",
                  margin: 0,
                },
              },
              r.d,
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      "style",
      null,
      `
        @media (max-width: 980px) {
          .how-desktop { display: none !important; }
          .how-mobile { display: flex !important; }
        }
      `,
    ),
  );
}
function StepRoute() {
  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        borderRadius: "var(--r-2xl)",
        background: "linear-gradient(160deg, #1565C0 0%, #0D47A1 100%)",
        padding: 32,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 30px 80px -20px rgba(13,71,161,.5)",
      },
    },
    React.createElement(
      "svg",
      {
        viewBox: "0 0 400 400",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        },
      },
      React.createElement(
        "defs",
        null,
        React.createElement(
          "pattern",
          {
            id: "sgrid",
            width: "30",
            height: "30",
            patternUnits: "userSpaceOnUse",
          },
          React.createElement("path", {
            d: "M 30 0 L 0 0 0 30",
            fill: "none",
            stroke: "rgba(255,255,255,.08)",
            strokeWidth: "1",
          }),
        ),
      ),
      React.createElement("rect", {
        width: "400",
        height: "400",
        fill: "url(#sgrid)",
      }),
      React.createElement("path", {
        d: "M 60 320 L 60 200 L 200 200 L 200 80 L 340 80",
        stroke: "rgba(255,255,255,.2)",
        strokeWidth: "3",
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      React.createElement(
        "g",
        null,
        React.createElement("circle", {
          cx: "60",
          cy: "320",
          r: "14",
          fill: "#22C55E",
          stroke: "#fff",
          strokeWidth: "3",
        }),
        React.createElement(
          "text",
          {
            x: "80",
            y: "324",
            fill: "#fff",
            fontSize: "12",
            fontFamily: "var(--mono)",
            fontWeight: "600",
          },
          "CASA",
        ),
      ),
      React.createElement(
        "g",
        null,
        React.createElement("circle", {
          cx: "340",
          cy: "80",
          r: "14",
          fill: "#1E88E5",
          stroke: "#fff",
          strokeWidth: "3",
        }),
        React.createElement(
          "text",
          {
            x: "260",
            y: "68",
            fill: "#fff",
            fontSize: "12",
            fontFamily: "var(--mono)",
            fontWeight: "600",
          },
          "TRABAJO",
        ),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          position: "absolute",
          bottom: 24,
          left: 24,
          right: 24,
          padding: 14,
          borderRadius: 16,
          background: "rgba(255,255,255,.1)",
          backdropFilter: "blur(10px)",
          color: "#fff",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 10,
            fontFamily: "var(--mono)",
            color: "#90CAF9",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          },
        },
        "Horario guardado",
      ),
      React.createElement(
        "div",
        { style: { fontSize: 14, fontWeight: 600, marginTop: 4 } },
        "L\u2013V \xB7 7:30am ida \xB7 6:00pm vuelta",
      ),
    ),
  );
}
function StepMatch() {
  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        borderRadius: "var(--r-2xl)",
        background: "linear-gradient(160deg, #1976D2 0%, #1565C0 100%)",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 30px 80px -20px rgba(13,71,161,.5)",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          fontSize: 11,
          fontFamily: "var(--mono)",
          color: "#90CAF9",
          textTransform: "uppercase",
          letterSpacing: ".12em",
        },
      },
      "3 pilotos cerca de ti",
    ),
    [
      {
        n: "Rafael G.",
        c: "Toyota Corolla",
        r: "\u2605 4.92",
        t: "8 min",
        price: "$0,55",
      },
      {
        n: "Carla M.",
        c: "Chevrolet Aveo",
        r: "\u2605 4.88",
        t: "12 min",
        price: "$0,55",
      },
      {
        n: "Luis P.",
        c: "Ford Fiesta",
        r: "\u2605 4.97",
        t: "15 min",
        price: "$0,55",
      },
    ].map((e, a) =>
      React.createElement(
        "div",
        {
          key: a,
          style: {
            padding: 14,
            borderRadius: 14,
            background: "rgba(255,255,255,.95)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            animation: `slideIn .5s var(--ease) ${a * 0.15}s both`,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              width: 38,
              height: 38,
              borderRadius: 999,
              background: [
                "linear-gradient(135deg, #FFB74D, #F57C00)",
                "linear-gradient(135deg, #BA68C8, #7B1FA2)",
                "linear-gradient(135deg, #4DB6AC, #00796B)",
              ][a],
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 12,
            },
          },
          e.n
            .split(" ")
            .map((o) => o[0])
            .join(""),
        ),
        React.createElement(
          "div",
          { style: { flex: 1 } },
          React.createElement(
            "div",
            { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)" } },
            e.n,
          ),
          React.createElement(
            "div",
            { style: { fontSize: 11, color: "var(--muted)" } },
            e.c,
            " \xB7 ",
            e.r,
          ),
        ),
        React.createElement(
          "div",
          { style: { textAlign: "right" } },
          React.createElement(
            "div",
            { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)" } },
            e.price,
          ),
          React.createElement(
            "div",
            { style: { fontSize: 11, color: "var(--muted)" } },
            e.t,
          ),
        ),
      ),
    ),
    React.createElement(
      "style",
      null,
      "@keyframes slideIn { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform: none } }",
    ),
  );
}
function StepRide() {
  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        borderRadius: "var(--r-2xl)",
        background: "linear-gradient(160deg, #2196F3 0%, #1565C0 100%)",
        padding: 32,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 30px 80px -20px rgba(13,71,161,.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },
    React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        {
          style: {
            fontSize: 11,
            fontFamily: "var(--mono)",
            color: "#90CAF9",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          },
        },
        "En camino \xB7 ETA 6 min",
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 16,
            padding: 18,
            borderRadius: 16,
            background: "rgba(255,255,255,.95)",
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 12 } },
          React.createElement(
            "div",
            {
              style: {
                width: 44,
                height: 44,
                borderRadius: 999,
                background: "linear-gradient(135deg, #FFB74D, #F57C00)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontWeight: 700,
              },
            },
            "RG",
          ),
          React.createElement(
            "div",
            { style: { flex: 1 } },
            React.createElement(
              "div",
              { style: { fontSize: 14, fontWeight: 700, color: "var(--ink)" } },
              "Rafael G.",
            ),
            React.createElement(
              "div",
              { style: { fontSize: 12, color: "var(--muted)" } },
              "Toyota Corolla \xB7 AB123CD",
            ),
          ),
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 4 } },
            React.createElement(
              "div",
              {
                style: {
                  padding: "6px 10px",
                  borderRadius: 8,
                  background: "var(--bg-soft)",
                  fontSize: 11,
                  fontWeight: 600,
                },
              },
              "Chat",
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "14px 16px",
          borderRadius: 14,
          background: "rgba(255,255,255,.12)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 10,
        },
      },
      React.createElement("span", { style: { fontSize: 20 } }, "\u{1F4B3}"),
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { style: { fontSize: 12, fontWeight: 700 } },
          "Saldo VIP",
        ),
        React.createElement(
          "div",
          { style: { fontSize: 11, opacity: 0.85 } },
          "Recarga al instante, paga sin efectivo",
        ),
      ),
    ),
  );
}
function PilotsSection() {
  return React.createElement(
    "section",
    { className: "sec" },
    React.createElement(
      "div",
      { className: "wrap" },
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          },
          className: "split-grid",
        },
        React.createElement(
          Reveal,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "h-eyebrow eyebrow", style: { marginBottom: 14 } },
              "Para conductores",
            ),
            React.createElement(
              "h2",
              { className: "h2", style: { marginBottom: 24 } },
              "Convierte tu ruta diaria en ",
              React.createElement(
                "em",
                { style: { color: "var(--primary)", fontStyle: "italic" } },
                "ingresos",
              ),
              ".",
            ),
            React.createElement(
              "p",
              { className: "lede", style: { marginBottom: 32 } },
              "\xBFVas todos los d\xEDas en carro al trabajo? Lleva hasta 3 personas que van por tu misma ruta y gana entre $60 y $450 al mes sin desviarte un metro.",
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginBottom: 32,
                },
              },
              [
                ["Sin filas, sin esperar carreras lejanas", "\u2713"],
                ["T\xFA decides cu\xE1ndo publicar tu ruta", "\u2713"],
                ["Cobro autom\xE1tico al final del mes", "\u2713"],
                ["Verificaci\xF3n gratuita en 24\u201348h", "\u2713"],
              ].map(([e, a]) =>
                React.createElement(
                  "div",
                  {
                    key: e,
                    style: { display: "flex", alignItems: "center", gap: 10 },
                  },
                  React.createElement(
                    "span",
                    {
                      style: {
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: "var(--green-bg)",
                        color: "var(--green)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 13,
                        fontWeight: 700,
                      },
                    },
                    a,
                  ),
                  React.createElement(
                    "span",
                    { style: { fontSize: 15, color: "var(--ink-2)" } },
                    e,
                  ),
                ),
              ),
            ),
            React.createElement(
              Magnetic,
              null,
              React.createElement(
                Link,
                { to: "/registro-piloto", className: "btn btn-primary btn-lg" },
                "Postularme como piloto ",
                React.createElement(ArrowRight, null),
              ),
            ),
          ),
        ),
        React.createElement(
          Reveal,
          null,
          React.createElement(
            "div",
            {
              style: {
                position: "relative",
                borderRadius: "var(--r-2xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--line-2)",
                aspectRatio: "4 / 3",
                background: "#0a1322",
              },
            },
            React.createElement("iframe", {
              src: "/demo-pilotos",
              title: "Maneja con Viaje \u2014 escena 3D",
              loading: "lazy",
              style: {
                width: "100%",
                height: "100%",
                border: 0,
                display: "block",
              },
            }),
          ),
        ),
      ),
    ),
    React.createElement(
      "style",
      null,
      "@media (max-width: 980px) { .split-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }",
    ),
  );
}
function EarningsCard() {
  const [e, a] = React.useState(0),
    [, o] = useReveal(0.3),
    t = React.useRef(null),
    [r, i] = React.useState(!1);
  (React.useEffect(() => {
    if (!t.current) return;
    const n = new IntersectionObserver(([s]) => s.isIntersecting && i(!0), {
      threshold: 0.3,
    });
    return (n.observe(t.current), () => n.disconnect());
  }, []),
    React.useEffect(() => {
      if (!r) return;
      let n = 0;
      const s = setInterval(() => {
        (n++,
          a(n),
          n >= 12 &&
            (clearInterval(s),
            setTimeout(() => {
              a(0);
            }, 1200)));
      }, 220);
      return () => clearInterval(s);
    }, [r]));
  const d = 0.55 * 0.9,
    l = (e * d).toFixed(2);
  return React.createElement(
    "div",
    {
      ref: t,
      style: {
        position: "relative",
        padding: 36,
        borderRadius: "var(--r-2xl)",
        background: "linear-gradient(160deg, #fff 0%, #F0F6FE 100%)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--line-2)",
        overflow: "hidden",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          pointerEvents: "none",
        },
      },
      React.createElement(
        "svg",
        { viewBox: "0 0 500 400", style: { width: "100%", height: "100%" } },
        React.createElement("path", {
          d: "M 0 320 C 80 280, 160 300, 220 240 S 360 180, 500 120",
          stroke: "rgba(30,136,229,.15)",
          strokeWidth: "2",
          fill: "none",
        }),
        React.createElement("path", {
          d: "M 0 280 C 100 260, 180 200, 280 200 S 420 160, 500 80",
          stroke: "rgba(30,136,229,.1)",
          strokeWidth: "2",
          fill: "none",
        }),
      ),
    ),
    React.createElement(
      "div",
      { style: { position: "relative" } },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          },
        },
        React.createElement("div", { className: "eyebrow" }, "Hoy \xB7 Lunes"),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 11,
              fontFamily: "var(--mono)",
              padding: "4px 10px",
              borderRadius: 999,
              background: "var(--green-bg)",
              color: "var(--green)",
            },
          },
          React.createElement("span", {
            className: "pulse-dot",
            style: {
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: 6,
              width: 6,
              height: 6,
            },
          }),
          " En l\xEDnea",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginTop: 16,
          },
        },
        React.createElement(
          "div",
          {
            className: "display tabular",
            style: {
              fontSize: 80,
              color: "var(--primary)",
              fontFamily: "var(--serif)",
            },
          },
          "$",
          l,
        ),
      ),
      React.createElement(
        "div",
        { style: { fontSize: 14, color: "var(--muted)", marginBottom: 28 } },
        "Ganancia simulada hoy",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 6,
            marginBottom: 28,
            flexWrap: "wrap",
          },
        },
        Array.from({ length: 12 }).map((n, s) =>
          React.createElement("div", {
            key: s,
            style: {
              flex: 1,
              minWidth: 14,
              height: 36,
              borderRadius: 6,
              background:
                s < e
                  ? "linear-gradient(180deg, var(--primary), var(--primary-dark))"
                  : "var(--line)",
              transition: "background .3s",
              transform: s < e ? "scaleY(1)" : "scaleY(.6)",
              transformOrigin: "bottom",
            },
          }),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          },
        },
        [
          ["Viajes", e],
          ["Pasajeros", e * 2],
          ["Km", (e * 7.4).toFixed(0)],
        ].map(([n, s]) =>
          React.createElement(
            "div",
            {
              key: n,
              style: {
                padding: "12px 14px",
                borderRadius: 12,
                background: "rgba(255,255,255,.6)",
                border: "1px solid var(--line-2)",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 11,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                },
              },
              n,
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: "var(--serif)",
                  color: "var(--ink)",
                },
              },
              s,
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 24,
            padding: 14,
            borderRadius: 14,
            background: "rgba(34,197,94,.08)",
            border: "1px solid rgba(34,197,94,.2)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          },
        },
        React.createElement(
          "span",
          {
            style: {
              width: 32,
              height: 32,
              borderRadius: 999,
              background: "var(--green)",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
            },
          },
          "\u2191",
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: { fontSize: 13, fontWeight: 600, color: "var(--ink)" } },
            "Proyecci\xF3n mensual: $89 \u2013 $450",
          ),
          React.createElement(
            "div",
            { style: { fontSize: 12, color: "var(--muted)" } },
            "Depende de qu\xE9 tan seguido publiques tu ruta.",
          ),
        ),
      ),
    ),
  );
}
function FeaturesSection() {
  const e = [
    {
      ic: "\u{1F31F}",
      t: "Karma points",
      d: "Gana puntos cada viaje, califica bien y ayuda a tu comunidad. Sube de tier (Pana, Ch\xE9vere, Maestro) y desbloquea beneficios reales.",
      tag: "Comunidad",
    },
    {
      ic: "\u{1F319}",
      t: "Modo nocturno seguro",
      d: "De 10pm a 5am la app pide c\xF3digo de confirmaci\xF3n al subir, comparte tu viaje en vivo con un contacto de emergencia y bloquea publicar viajes a pasajeros sin verificaci\xF3n reciente.",
      tag: "Seguridad",
    },
    {
      ic: "\u{1F4F8}",
      t: "Foto del destino",
      d: "Al llegar, el pasajero sube una foto del lugar donde lo dejaron. Queda como prueba de finalizaci\xF3n y como capa extra de tranquilidad para sus contactos.",
      tag: "Seguridad",
    },
    {
      ic: "\u{1F50D}",
      t: "Verificaci\xF3n Truora",
      d: "Cruzamos cada piloto con Truora \u2014 el servicio que validan los bancos venezolanos para confirmar identidad y antecedentes. C\xE9dula, biometr\xEDa facial y r\xE9cord antes de aprobar.",
      tag: "Verificaci\xF3n",
    },
    {
      ic: "\u{1F441}\uFE0F",
      t: "Modo Senior",
      d: "Tipograf\xEDa 2\xD7 m\xE1s grande, botones extra grandes, sin animaciones. La app entera se reconfigura para que tus abuelos puedan usarla sin ayuda.",
      tag: "Accesibilidad",
    },
    {
      ic: "\u{1F4E1}",
      t: "Tracking GPS en vivo",
      d: "Mientras el viaje est\xE1 activo, la ubicaci\xF3n del piloto se transmite cada pocos segundos. Tu familia puede ver en tiempo real d\xF3nde vas, sin instalarse la app.",
      tag: "Seguridad",
    },
  ];
  return React.createElement(
    "section",
    {
      className: "sec",
      style: {
        background: "var(--bg-soft)",
        position: "relative",
        overflow: "hidden",
      },
    },
    React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        opacity: 0.5,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(30,136,229,.10), transparent 70%)",
      },
    }),
    React.createElement(
      "div",
      { className: "wrap", style: { position: "relative" } },
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          { className: "h-eyebrow eyebrow", style: { marginBottom: 14 } },
          "Lo que nos hace distintos",
        ),
        React.createElement(
          "h2",
          { className: "h2", style: { maxWidth: 760, marginBottom: 18 } },
          "M\xE1s que un viaje. ",
          React.createElement(
            "em",
            { style: { color: "var(--primary)", fontStyle: "italic" } },
            "Una comunidad.",
          ),
        ),
        React.createElement(
          "p",
          { className: "lede", style: { maxWidth: 680, marginBottom: 56 } },
          "Construimos cada funci\xF3n pensando en la realidad venezolana \u2014 desde c\xF3mo viajan los adultos mayores hasta c\xF3mo proteger a quien sale del trabajo a las 11pm.",
        ),
      ),
      React.createElement(
        Reveal,
        { stagger: !0 },
        React.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            },
            className: "feat-grid",
          },
          e.map((a) =>
            React.createElement(
              Tilt,
              { key: a.t, max: 5 },
              React.createElement(
                "div",
                {
                  className: "card card-hover tilt",
                  style: { padding: 28, height: "100%", position: "relative" },
                },
                React.createElement(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: 16,
                      right: 16,
                      fontSize: 10,
                      fontFamily: "var(--mono)",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "var(--primary-50)",
                      color: "var(--primary)",
                    },
                  },
                  a.tag,
                ),
                React.createElement(
                  "div",
                  { style: { fontSize: 32, marginBottom: 16 } },
                  a.ic,
                ),
                React.createElement(
                  "h3",
                  {
                    style: { fontSize: 19, fontWeight: 700, marginBottom: 10 },
                  },
                  a.t,
                ),
                React.createElement(
                  "p",
                  {
                    style: {
                      fontSize: 14,
                      color: "var(--ink-3)",
                      lineHeight: 1.55,
                    },
                  },
                  a.d,
                ),
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          {
            style: {
              marginTop: 40,
              padding: "18px 24px",
              borderRadius: 14,
              background: "var(--surface)",
              border: "1px solid var(--line-2)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            },
          },
          React.createElement("span", { style: { fontSize: 18 } }, "\u2713"),
          React.createElement(
            "span",
            { style: { fontSize: 13, color: "var(--ink-3)" } },
            React.createElement(
              "b",
              { style: { color: "var(--ink)" } },
              "Verificaci\xF3n obligatoria.",
            ),
            " Ning\xFAn piloto publica viajes sin tener c\xE9dula, licencia, RIF y carnet de circulaci\xF3n verificados. Sin excepciones.",
          ),
        ),
      ),
    ),
    React.createElement(
      "style",
      null,
      "@media (max-width: 880px) { .feat-grid { grid-template-columns: 1fr !important; } }",
    ),
  );
}
function TarifasSection() {
  const e = [
      { name: "Viaje", price: "$0,55", val: 0.55, brand: !0 },
      { name: "Apps de transporte por demanda", price: "$3\u20135", val: 4 },
      { name: "Taxi tradicional", price: "$5\u20138", val: 6.5 },
    ],
    a = 8;
  return React.createElement(
    "section",
    { className: "sec", style: { background: "var(--bg-soft)" } },
    React.createElement(
      "div",
      { className: "wrap" },
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          { className: "h-eyebrow eyebrow", style: { marginBottom: 14 } },
          "Tarifas",
        ),
        React.createElement(
          "h2",
          { className: "h2", style: { marginBottom: 24, maxWidth: 720 } },
          "Mismo trayecto. Diferencia ",
          React.createElement(
            "em",
            { style: { color: "var(--primary)", fontStyle: "italic" } },
            "real",
          ),
          ".",
        ),
        React.createElement(
          "p",
          { className: "lede", style: { marginBottom: 60 } },
          "El Para\xEDso \u2192 Chacao. Esto es lo que pagar\xEDas hoy mismo en cada servicio.",
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 22 } },
        e.map((o, t) =>
          React.createElement(CompetitorRow, {
            key: o.name,
            ...o,
            max: a,
            delay: t * 150,
          }),
        ),
      ),
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 14,
              marginTop: 56,
              flexWrap: "wrap",
            },
          },
          React.createElement(
            Magnetic,
            null,
            React.createElement(
              Link,
              { to: "/tarifas", className: "btn btn-primary btn-lg" },
              "Ver planes completos ",
              React.createElement(ArrowRight, null),
            ),
          ),
          React.createElement(
            "span",
            {
              style: {
                fontSize: 13,
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
              },
            },
            "Pago en efectivo, Pago M\xF3vil o saldo VIP \xB7 Tasa BCV autom\xE1tica",
          ),
        ),
      ),
    ),
  );
}
function CompetitorRow({
  name: e,
  price: a,
  val: o,
  brand: t,
  max: r,
  delay: i,
}) {
  const [d, l] = useReveal(0.3),
    n = (o / r) * 100;
  return React.createElement(
    "div",
    {
      ref: d,
      style: {
        display: "grid",
        gridTemplateColumns: "160px 1fr 100px",
        alignItems: "center",
        gap: 20,
        opacity: l ? 1 : 0,
        transform: l ? "none" : "translateY(12px)",
        transition: `opacity .6s var(--ease) ${i}ms, transform .6s var(--ease) ${i}ms`,
      },
      className: "comp-row",
    },
    React.createElement(
      "div",
      {
        style: {
          fontSize: 16,
          fontWeight: t ? 800 : 600,
          color: t ? "var(--primary)" : "var(--ink-2)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        },
      },
      t && React.createElement(Mark, { size: 22 }),
      e,
    ),
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          height: 44,
          background: "var(--line-2)",
          borderRadius: 22,
          overflow: "hidden",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            height: "100%",
            width: l ? `${n}%` : "0%",
            background: t
              ? "linear-gradient(90deg, #22C55E 0%, #1E88E5 100%)"
              : "linear-gradient(90deg, #E5EAF2 0%, #C8D3E5 100%)",
            borderRadius: 22,
            transition: `width 1.1s var(--ease) ${i + 200}ms`,
            position: "relative",
          },
        },
        t &&
          React.createElement("div", {
            style: {
              position: "absolute",
              inset: 0,
              opacity: 0.6,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.6), transparent)",
              animation: "shimmer 2.5s linear infinite",
              borderRadius: 22,
            },
          }),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          fontSize: 22,
          fontWeight: 800,
          color: t ? "var(--primary)" : "var(--ink-2)",
          textAlign: "right",
          fontFamily: "var(--serif)",
        },
      },
      a,
    ),
    React.createElement(
      "style",
      null,
      `
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @media (max-width: 700px) {
          .comp-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `,
    ),
  );
}
function FAQSection() {
  const e = [
      {
        q: "\xBFEs un servicio de taxi?",
        a: "No. Viaje es transporte colaborativo: el piloto ya iba a hacer ese trayecto y se lleva a alguien que va en su misma direcci\xF3n. No hay carreras ni desv\xEDos.",
      },
      {
        q: "\xBFC\xF3mo pago?",
        a: "Tres opciones: efectivo (en Bs o USD al final del viaje), Pago M\xF3vil con validaci\xF3n autom\xE1tica de la referencia, o saldo VIP (wallet recargable con Pago M\xF3vil).",
      },
      {
        q: "\xBFC\xF3mo me convierto en piloto?",
        a: "Llenas el formulario en /pilotos con tus datos, los del veh\xEDculo y subes tus documentos. Validamos identidad, licencia y antecedentes en 24\u201348h.",
      },
      {
        q: "\xBFEs seguro?",
        a: "Todos los pilotos pasan verificaci\xF3n. Cada viaje tiene tracking GPS en vivo, bot\xF3n de emergencia conectado con soporte y autoridades, y calificaci\xF3n mutua.",
      },
      {
        q: "\xBFFunciona fuera de Caracas?",
        a: "Por ahora lanzamos en Caracas, Distrito Capital y zonas cercanas (Los Teques, Guarenas, La Guaira). Otras ciudades en 2026.",
      },
    ],
    [a, o] = React.useState(0);
  return React.createElement(
    "section",
    { className: "sec" },
    React.createElement(
      "div",
      { className: "wrap-narrow" },
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          { className: "h-eyebrow eyebrow", style: { marginBottom: 14 } },
          "FAQ",
        ),
        React.createElement(
          "h2",
          { className: "h2", style: { marginBottom: 48 } },
          "Preguntas frecuentes.",
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 4 } },
        e.map((t, r) => {
          const i = a === r;
          return React.createElement(
            "div",
            {
              key: r,
              style: {
                borderRadius: "var(--r-md)",
                background: i ? "var(--bg-soft)" : "transparent",
                border: "1px solid " + (i ? "var(--line)" : "transparent"),
                transition: "background .3s, border-color .3s",
              },
            },
            React.createElement(
              "button",
              {
                onClick: () => o(i ? -1 : r),
                style: {
                  width: "100%",
                  padding: "22px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                },
              },
              React.createElement(
                "span",
                {
                  style: { fontSize: 18, fontWeight: 600, color: "var(--ink)" },
                },
                t.q,
              ),
              React.createElement(
                "span",
                {
                  style: {
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: i ? "var(--primary)" : "var(--line-2)",
                    color: i ? "#fff" : "var(--ink-3)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    transition: "all .3s",
                    transform: i ? "rotate(45deg)" : "rotate(0)",
                  },
                },
                "+",
              ),
            ),
            React.createElement(
              "div",
              {
                style: {
                  maxHeight: i ? 200 : 0,
                  overflow: "hidden",
                  transition: "max-height .5s var(--ease)",
                },
              },
              React.createElement(
                "p",
                {
                  style: {
                    padding: "0 24px 24px",
                    fontSize: 15,
                    color: "var(--ink-3)",
                    lineHeight: 1.6,
                  },
                },
                t.a,
              ),
            ),
          );
        }),
      ),
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          {
            style: {
              marginTop: 36,
              padding: "26px 28px",
              borderRadius: "var(--r-md)",
              background: "var(--bg-soft)",
              border: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 18,
              flexWrap: "wrap",
            },
          },
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { style: { fontSize: 18, fontWeight: 700, color: "var(--ink)" } },
              "\xBFTe qued\xF3 otra duda?",
            ),
            React.createElement(
              "div",
              {
                style: { fontSize: 14.5, color: "var(--ink-3)", marginTop: 4 },
              },
              "Vi, nuestra asesora, te responde al instante. \u{1F4AC}",
            ),
          ),
          React.createElement(
            "button",
            {
              onClick: () => window.dispatchEvent(new Event("open-vi")),
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "13px 22px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(2,128,249,.3)",
              },
            },
            "\u{1F4AC} Habla con un asesor",
          ),
        ),
      ),
    ),
  );
}
function FinalCTASection() {
  return React.createElement(
    "section",
    {
      style: {
        padding: "140px 5vw",
        background:
          "linear-gradient(160deg, #0D47A1 0%, #1565C0 50%, #1E88E5 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      },
    },
    React.createElement(
      "svg",
      {
        viewBox: "0 0 1400 600",
        preserveAspectRatio: "xMidYMid slice",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.3,
        },
      },
      React.createElement(
        "defs",
        null,
        React.createElement(
          "linearGradient",
          { id: "ctagrad", x1: "0", x2: "1" },
          React.createElement("stop", {
            offset: "0",
            stopColor: "#64B5F6",
            stopOpacity: "0",
          }),
          React.createElement("stop", {
            offset: ".5",
            stopColor: "#fff",
            stopOpacity: ".6",
          }),
          React.createElement("stop", {
            offset: "1",
            stopColor: "#64B5F6",
            stopOpacity: "0",
          }),
        ),
        React.createElement(
          "pattern",
          {
            id: "ctaGrid",
            width: "50",
            height: "50",
            patternUnits: "userSpaceOnUse",
          },
          React.createElement("path", {
            d: "M 50 0 L 0 0 0 50",
            fill: "none",
            stroke: "rgba(255,255,255,.08)",
            strokeWidth: "1",
          }),
        ),
      ),
      React.createElement("rect", {
        width: "1400",
        height: "600",
        fill: "url(#ctaGrid)",
      }),
      React.createElement("path", {
        d: "M 0 400 C 280 320, 560 480, 840 360 S 1200 240, 1400 320",
        stroke: "url(#ctagrad)",
        strokeWidth: "3",
        fill: "none",
      }),
      React.createElement("path", {
        d: "M 0 500 C 200 460, 500 540, 800 500 S 1200 460, 1400 480",
        stroke: "url(#ctagrad)",
        strokeWidth: "2",
        fill: "none",
      }),
    ),
    React.createElement(
      "div",
      {
        className: "wrap",
        style: { position: "relative", textAlign: "center" },
      },
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          {
            className: "h-eyebrow eyebrow",
            style: {
              color: "#90CAF9",
              justifyContent: "center",
              display: "inline-flex",
            },
          },
          "Ya disponible en Caracas",
        ),
      ),
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "h2",
          {
            className: "h2",
            style: {
              color: "#fff",
              marginTop: 24,
              marginBottom: 32,
              fontSize: "clamp(40px, 6vw, 88px)",
            },
          },
          "S\xE9 de los ",
          React.createElement(
            "em",
            { style: { fontStyle: "italic", color: "#90CAF9" } },
            "primeros",
          ),
          React.createElement("br", null),
          "en usar Viaje.",
        ),
      ),
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "p",
          {
            style: {
              fontSize: 18,
              color: "#C8D3E5",
              maxWidth: 580,
              margin: "0 auto 40px",
            },
          },
          "Desc\xE1rgala ahora y pide tu primer viaje hoy mismo. Si vas en carro al trabajo, tambi\xE9n puedes postularte como piloto.",
        ),
      ),
      React.createElement(
        Reveal,
        null,
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            },
          },
          React.createElement(
            Magnetic,
            { strength: 12 },
            React.createElement(
              "a",
              {
                href: "https://play.google.com/store/apps/details?id=ve.viaje.app&referrer=utm_source%3Dviaje_web%26utm_medium%3Dcta%26utm_campaign%3Dhome_bottom",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "btn btn-lg",
                style: { background: "#fff", color: "var(--primary-dark)" },
              },
              "Descargar en Google Play ",
              React.createElement(ArrowRight, null),
            ),
          ),
          React.createElement(
            Magnetic,
            { strength: 12 },
            React.createElement(
              "a",
              {
                href: "https://apps.apple.com/ve/app/viaje-app/id6806683135",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "btn btn-lg",
                style: { background: "#fff", color: "var(--primary-dark)" },
              },
              "Descargar en App Store ",
              React.createElement(ArrowRight, null),
            ),
          ),
          React.createElement(
            Magnetic,
            { strength: 6 },
            React.createElement(
              Link,
              {
                to: "/registro-piloto",
                className: "btn btn-lg",
                style: {
                  background: "rgba(255,255,255,.1)",
                  color: "#fff",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,.3)",
                },
              },
              "Quiero ser piloto",
            ),
          ),
        ),
      ),
    ),
  );
}
window.Home = Home;
