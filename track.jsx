// Página pública /track/:token — tracking anónimo de un viaje compartido
// Consume RPC get_shared_trip_status (público, sin auth, válida 30 min).
// Renderiza mapa Google + estado del viaje + datos del piloto + botón SOS.

if (typeof window !== "undefined" && !window.ensureGoogleMaps) {
  window.ensureGoogleMaps = function (cb) {
    var KEY = "AIzaSyAI3xrQ14lhmh11MT7qsXjdYhR99V44IrY";
    if (window.google && window.google.maps) return cb();
    if (window.__gmapsCbs) { window.__gmapsCbs.push(cb); return; }
    window.__gmapsCbs = [cb];
    window.__gmapsReady = function () { (window.__gmapsCbs || []).forEach(function (f) { try { f(); } catch (e) {} }); window.__gmapsCbs = null; };
    var s = document.createElement("script");
    s.src = "https://maps.googleapis.com/maps/api/js?key=" + KEY + "&callback=__gmapsReady&language=es&region=VE";
    s.async = true; s.onerror = function () { window.__gmapsCbs = null; };
    document.head.appendChild(s);
  };
}

function TrackTrip({ token }) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [now, setNow] = React.useState(new Date());
  const mapRef = React.useRef(null);
  const mapObjRef = React.useRef(null);
  const pilotMarkerRef = React.useRef(null);

  // Fetch + polling cada 15s
  const fetchStatus = React.useCallback(async () => {
    try {
      const sb = window.__getSupabase ? await window.__getSupabase() : window.__SUPABASE__;
      const { data: result, error: err } = await sb.rpc("get_shared_trip_status", {
        p_token: token,
      });
      if (err) throw err;
      if (!result || (Array.isArray(result) && result.length === 0)) {
        setError("Enlace inválido o expirado");
        return;
      }
      const row = Array.isArray(result) ? result[0] : result;
      setData(row);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("No se pudo cargar el viaje");
    }
  }, [token]);

  React.useEffect(() => {
    fetchStatus();
    const i = setInterval(fetchStatus, 15000);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => { clearInterval(i); clearInterval(t); };
  }, [fetchStatus]);

  // Setup mapa Google Maps cuando hay coords
  React.useEffect(() => {
    if (!data || !window.ensureGoogleMaps) return;
    const oLat = Number(data.origin_lat);
    const oLng = Number(data.origin_lng);
    const dLat = Number(data.destination_lat);
    const dLng = Number(data.destination_lng);
    if (!oLat || !oLng) return;

    window.ensureGoogleMaps(() => {
      const g = window.google;
      const dot = (color, scale) => ({
        path: g.maps.SymbolPath.CIRCLE,
        fillColor: color, fillOpacity: 1,
        strokeColor: "#fff", strokeWeight: 2, scale: scale || 7,
      });

      if (!mapObjRef.current && mapRef.current) {
        const map = new g.maps.Map(mapRef.current, {
          center: { lat: oLat, lng: oLng },
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "greedy",
          clickableIcons: false,
        });
        mapObjRef.current = map;
        // Origen (verde)
        new g.maps.Marker({ position: { lat: oLat, lng: oLng }, map, icon: dot("#16A34A") });
        // Destino (rojo)
        if (dLat && dLng) {
          new g.maps.Marker({ position: { lat: dLat, lng: dLng }, map, icon: dot("#DC2626") });
          const b = new g.maps.LatLngBounds();
          b.extend({ lat: oLat, lng: oLng });
          b.extend({ lat: dLat, lng: dLng });
          map.fitBounds(b, 60);
        }
      }

      // Marker del piloto (azul, en vivo)
      if (data.pilot_lat && data.pilot_lng && mapObjRef.current) {
        const pLat = Number(data.pilot_lat);
        const pLng = Number(data.pilot_lng);
        if (!pilotMarkerRef.current) {
          pilotMarkerRef.current = new g.maps.Marker({
            position: { lat: pLat, lng: pLng },
            map: mapObjRef.current,
            icon: dot("#0280F9", 9),
            zIndex: 999,
          });
        } else {
          pilotMarkerRef.current.setPosition({ lat: pLat, lng: pLng });
        }
      }
    });
  }, [data]);

  const statusLabel = {
    "open":         "Esperando salida",
    "in-progress":  "En camino",
    "completed":    "Finalizado",
    "cancelled":    "Cancelado",
  };

  if (error) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🚫</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>Enlace no válido</h1>
        <p style={{ color: "#64748B", maxWidth: 380 }}>
          Este enlace ya expiró o nunca fue válido. Los enlaces de tracking duran 30 minutos por seguridad.
        </p>
        <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>Volver al inicio</Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, animation: "pulse 1.5s ease-in-out infinite" }}>📍</div>
          <p style={{ color: "#64748B", marginTop: 12 }}>Cargando viaje...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 16px 60px", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".2em", color: "#64748B", marginBottom: 6 }}>
          Compartido por Viaje
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
          {data.passenger_name ? `Viaje de ${data.passenger_name}` : "Tracking de viaje"}
        </h1>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginTop: 10, padding: "6px 14px", borderRadius: 999,
          background: data.trip_status === "in-progress" ? "#DCFCE7" : "#E6F1FE",
          color: data.trip_status === "in-progress" ? "#15803D" : "#0280F9",
          fontSize: 12, fontWeight: 700,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: 999,
            background: data.trip_status === "in-progress" ? "#16A34A" : "#0280F9",
            animation: data.trip_status === "in-progress" ? "pulse 1.5s ease-in-out infinite" : "none",
          }} />
          {statusLabel[data.trip_status] ?? data.trip_status}
        </div>
      </div>

      {/* Mapa */}
      <div ref={mapRef} style={{
        width: "100%", height: 360,
        borderRadius: 18, overflow: "hidden",
        border: "1px solid #E5E9F2",
        boxShadow: "0 4px 24px rgba(2,128,249,.10)",
        marginBottom: 22,
      }} />

      {/* Datos del piloto */}
      <div style={{
        background: "#fff", border: "1px solid #E5E9F2", borderRadius: 16,
        padding: 18, marginBottom: 14, boxShadow: "0 2px 12px rgba(15,23,42,.04)",
      }}>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".14em", color: "#64748B", marginBottom: 10 }}>
          Piloto
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 999,
            background: "linear-gradient(135deg, #0280F9 0%, #0A69E0 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, color: "#fff", fontWeight: 800,
          }}>
            {(data.pilot_name ?? "P")[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{data.pilot_name ?? "—"}</div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
              {data.vehicle_brand ?? ""} {data.vehicle_model ?? ""} · {data.vehicle_plate ?? "—"}
              {data.vehicle_color ? ` · ${data.vehicle_color}` : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Ruta */}
      <div style={{
        background: "#fff", border: "1px solid #E5E9F2", borderRadius: 16,
        padding: 18, marginBottom: 14, boxShadow: "0 2px 12px rgba(15,23,42,.04)",
      }}>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".14em", color: "#64748B", marginBottom: 14 }}>
          Ruta
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#16A34A", marginTop: 5, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>ORIGEN</div>
            <div style={{ fontSize: 14, color: "#0F172A", lineHeight: 1.4 }}>{data.origin_address ?? "—"}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#DC2626", marginTop: 5, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>DESTINO</div>
            <div style={{ fontSize: 14, color: "#0F172A", lineHeight: 1.4 }}>{data.destination_address ?? "—"}</div>
          </div>
        </div>
      </div>

      {/* Aviso seguridad */}
      <div style={{
        background: "linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 100%)",
        border: "1px solid #FECACA", borderRadius: 16,
        padding: 16, fontSize: 13, color: "#7C2D12", lineHeight: 1.5,
      }}>
        <strong style={{ color: "#991B1B" }}>🚨 Si esta persona te pide ayuda:</strong> llama al <strong>171</strong> (emergencias) o
        contacta a Viaje en <a href="mailto:soporte@viaje.com.ve" style={{ color: "#0280F9", fontWeight: 700 }}>soporte@viaje.com.ve</a>.
        Enlace válido por 30 minutos.
      </div>

      <div style={{ textAlign: "center", marginTop: 22, fontSize: 11, color: "#94A3B8", fontFamily: "var(--mono)" }}>
        Actualizado {now.toLocaleTimeString("es-VE")} · refresca cada 15s
      </div>
    </div>
  );
}

window.TrackTrip = TrackTrip;
