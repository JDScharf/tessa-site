import { useEffect, useRef, useState } from "react";

const BRITISH_CARIBBEAN_TERRITORIES = [
  {
    name: "Cayman Islands",
    lon: -81.2546,
    lat: 19.3133,
    capital: "George Town",
  },
  {
    name: "British Virgin Islands",
    lon: -64.6282,
    lat: 18.4207,
    capital: "Road Town",
  },
  {
    name: "Turks & Caicos Islands",
    lon: -71.7979,
    lat: 21.694,
    capital: "Cockburn Town",
  },
  { name: "Anguilla", lon: -63.0686, lat: 18.2206, capital: "The Valley" },
  { name: "Montserrat", lon: -62.1874, lat: 16.7425, capital: "Plymouth" },
  { name: "Bermuda", lon: -64.7505, lat: 32.3078, capital: "Hamilton" },
];

const P = {
  pink: "#edafb8",
  blush: "#f7e1d7",
  stone: "#dedbd2",
  sage: "#b0c4b1",
  teal: "#4a5759",
};

export default function BritishCaribbeanMap() {
  const mapRef = useRef(null);
  const viewRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Step 1: wait for the div to actually be in the DOM
  useEffect(() => {
    setReady(true);
  }, []);

  // Step 2: initialise ArcGIS only once the div is confirmed mounted
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    if (!window.require) {
      console.error(
        "ArcGIS JS API not loaded. Add the script tag to public/index.html.",
      );
      return;
    }

    window.require(
      [
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Zoom",
      ],
      function (esriConfig, Map, MapView, Graphic, GraphicsLayer, Zoom) {
        esriConfig.apiKey =
          "AAPK3850a9ec91324a028768557dfc40d4ffvcIaUta3f0VFXfQzaX-fRYTub_0wRicii4v_tCY7CXnPSWbfsb44_DLmQKj3rJHv";

        const map = new Map({ basemap: "arcgis-dark-gray" });

        const view = new MapView({
          map,
          container: mapRef.current, // ← direct DOM ref, not a string ID
          center: [-70, 22],
          zoom: 5,
          ui: { components: [] }, // clear defaults; we add Zoom manually
        });

        viewRef.current = view;

        // Graphics layer for territory markers
        const gl = new GraphicsLayer({
          title: "British Caribbean Territories",
        });
        map.add(gl);

        const popupTemplate = {
          title: "{name}",
          content:
            "<b>Capital:</b> {capital}<br/><b>Status:</b> British Overseas Territory",
        };

        BRITISH_CARIBBEAN_TERRITORIES.forEach((t) => {
          const pt = { type: "point", longitude: t.lon, latitude: t.lat };

          // Outer halo
          gl.add(
            new Graphic({
              geometry: pt,
              symbol: {
                type: "simple-marker",
                color: [176, 196, 177, 60],
                size: "24px",
                outline: { color: P.sage, width: 1.5 },
              },
            }),
          );

          // Main dot — carries the popup
          gl.add(
            new Graphic({
              geometry: pt,
              symbol: {
                type: "simple-marker",
                color: P.pink,
                size: "13px",
                outline: { color: P.teal, width: 2 },
              },
              attributes: { name: t.name, capital: t.capital },
              popupTemplate,
            }),
          );

          // Label
          gl.add(
            new Graphic({
              geometry: pt,
              symbol: {
                type: "text",
                color: P.blush,
                haloColor: P.teal,
                haloSize: "2px",
                text: t.name,
                font: { size: 11, weight: "bold", family: "Georgia, serif" },
                yoffset: -22,
              },
            }),
          );
        });

        view.ui.add(new Zoom({ view }), "top-right");
      },
    );

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [ready]);

  return (
    <div style={s.shell}>
      {/* ── The map MUST be the first child so it occupies the full shell ── */}
      <div ref={mapRef} style={s.map} />

      {/* ── Overlays sit above the map via z-index ── */}
      <div style={s.header}>
        <h1 style={s.title}>British Caribbean Territories</h1>
        <p style={s.sub}>British Overseas Territories of the Caribbean</p>
      </div>

      <div style={s.sidebar}>
        <p style={s.sidebarHeading}>Territories</p>
        <ul style={s.ul}>
          {BRITISH_CARIBBEAN_TERRITORIES.map((t) => (
            <li key={t.name} style={s.li}>
              <span style={s.dot} />
              <div>
                <div style={s.tName}>{t.name}</div>
                <div style={s.tCap}>Capital: {t.capital}</div>
              </div>
            </li>
          ))}
        </ul>
        <div style={s.badge}>British Overseas Territory</div>
      </div>
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────── */
const s = {
  shell: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },

  // Map fills the entire shell — z-index 0, behind everything
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },

  // Header gradient — z-index 10, above the map
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: "18px 24px 50px",
    background: `linear-gradient(to bottom, ${P.teal}ee 0%, transparent 100%)`,
    pointerEvents: "none",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.7rem",
    fontWeight: 700,
    color: P.blush,
    letterSpacing: "0.04em",
    textShadow: `0 2px 10px ${P.teal}`,
  },
  sub: {
    margin: "5px 0 0",
    fontSize: "0.82rem",
    color: P.stone,
    fontStyle: "italic",
    letterSpacing: "0.06em",
  },

  // Sidebar — z-index 10, above the map, pointer-events on
  sidebar: {
    position: "absolute",
    top: "90px",
    left: "16px",
    zIndex: 10,
    background: `${P.teal}dd`,
    border: `1px solid ${P.sage}55`,
    borderRadius: "10px",
    padding: "16px 18px",
    minWidth: "215px",
    backdropFilter: "blur(8px)",
  },
  sidebarHeading: {
    margin: "0 0 12px",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: P.sage,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
  },
  ul: { listStyle: "none", margin: 0, padding: 0 },
  li: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "10px",
  },
  dot: {
    flexShrink: 0,
    marginTop: "4px",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: P.pink,
    border: `2px solid ${P.teal}`,
    boxShadow: `0 0 0 2px ${P.sage}55`,
  },
  tName: {
    fontSize: "0.85rem",
    color: P.blush,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  tCap: { fontSize: "0.72rem", color: P.stone, marginTop: "2px" },
  badge: {
    marginTop: "14px",
    padding: "5px 10px",
    background: `${P.sage}22`,
    border: `1px solid ${P.sage}66`,
    borderRadius: "20px",
    fontSize: "0.68rem",
    color: P.sage,
    textAlign: "center",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
};
