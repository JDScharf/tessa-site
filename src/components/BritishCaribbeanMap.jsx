import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamRzY2hhcmYiLCJhIjoiY2tpdHQxeWJuMHVwdzMycngwbDBuMTBuOSJ9.MryUfSfF2RytTy4-87FyFQ";

const TERRITORIES = [
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
  cream: "#f7e1d7",
  blush: "#edafb8",
  blushDeep: "#d9909c",
  stone: "#dedbd2",
  teal: "#4a5759",
  sageLight: "#b0c4b1",
};

const STYLE_OVERRIDES = [
  { layer: "water", prop: "fill-color", value: P.cream },
  { layer: "landuse", prop: "fill-color", value: "#e8c4bc" },
  { layer: "road-motorway-trunk", prop: "line-color", value: "#d4b8b0" },
  { layer: "road-primary", prop: "line-color", value: "#d4b8b0" },
  { layer: "road-secondary-tertiary", prop: "line-color", value: "#dcc8c0" },
  { layer: "road-street", prop: "line-color", value: "#e0ccc8" },
  { layer: "admin-0-boundary", prop: "line-color", value: P.teal },
  { layer: "admin-1-boundary", prop: "line-color", value: P.sageLight },
  { layer: "country-label", prop: "text-color", value: P.teal },
  { layer: "state-label", prop: "text-color", value: P.teal },
  { layer: "settlement-label", prop: "text-color", value: P.teal },
  { layer: "water-line-label", prop: "text-color", value: P.blushDeep },
  { layer: "water-point-label", prop: "text-color", value: P.blushDeep },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

export default function BritishCaribbeanMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const isMobile = useIsMobile();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTerritory, setActiveTerritory] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // ── Map initialisation ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-70, 22],
      zoom: isMobile ? 3.2 : 4.2,
      projection: "naturalEarth",
      dragRotate: false,
      touchPitch: false,
      touchZoomRotate: true,
    });

    mapRef.current = map;

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );
    if (!isMobile) {
      map.addControl(
        new mapboxgl.ScaleControl({ unit: "metric" }),
        "bottom-left",
      );
    }

    map.on("load", () => {
      STYLE_OVERRIDES.forEach(({ layer, prop, value }) => {
        try {
          map.setPaintProperty(layer, prop, value);
        } catch (_) {}
      });

      try {
        map.addLayer(
          {
            id: "bg-cream",
            type: "background",
            paint: { "background-color": P.cream },
          },
          map.getStyle().layers[0].id,
        );
      } catch (_) {}

      map.addSource("territories", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: TERRITORIES.map((t) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [t.lon, t.lat] },
            properties: { name: t.name, capital: t.capital },
          })),
        },
      });

      // Halo — scales with zoom
      map.addLayer({
        id: "territory-halo",
        type: "circle",
        source: "territories",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 10, 8, 18],
          "circle-color": P.blush,
          "circle-opacity": 0.2,
          "circle-stroke-width": 1,
          "circle-stroke-color": P.blushDeep,
          "circle-stroke-opacity": 0.4,
        },
      });

      // Dot — bigger tap target on mobile
      map.addLayer({
        id: "territory-dot",
        type: "circle",
        source: "territories",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 7, 8, 11],
          "circle-color": P.blush,
          "circle-stroke-width": 2,
          "circle-stroke-color": P.teal,
        },
      });

      // Label
      map.addLayer({
        id: "territory-label",
        type: "symbol",
        source: "territories",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 3, 9, 8, 13],
          "text-offset": [0, 1.8],
          "text-anchor": "top",
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": P.teal,
          "text-halo-color": P.cream,
          "text-halo-width": 1.5,
        },
      });

      // Desktop hover
      map.on("mouseenter", "territory-dot", (e) => {
        map.getCanvas().style.cursor = "pointer";
        setActiveTerritory(e.features[0].properties);
        setTooltipPos({ x: e.point.x, y: e.point.y });
        map.setPaintProperty("territory-halo", "circle-opacity", 0.38);
      });
      map.on("mouseleave", "territory-dot", () => {
        map.getCanvas().style.cursor = "";
        setActiveTerritory(null);
        map.setPaintProperty("territory-halo", "circle-opacity", 0.2);
      });

      // Click / tap — fly to territory
      map.on("click", "territory-dot", (e) => {
        const [lon, lat] = e.features[0].geometry.coordinates;
        map.flyTo({ center: [lon, lat], zoom: 7, speed: 1.2 });
        // Close dropdown if open on mobile
        setDropdownOpen(false);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flyTo = (t) => {
    mapRef.current?.flyTo({ center: [t.lon, t.lat], zoom: 7, speed: 1.2 });
    setDropdownOpen(false);
  };

  const resetView = () => {
    mapRef.current?.flyTo({
      center: [-70, 22],
      zoom: isMobile ? 3.2 : 4.2,
      speed: 0.9,
    });
    setDropdownOpen(false);
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    // 100dvh respects mobile browser chrome (address bar) correctly
    <div style={{ ...s.shell, height: "100dvh" }}>
      {/* Map base layer */}
      <div ref={mapContainer} style={s.map} />

      {/* ═══════════════════════════════════════════
          MOBILE layout — compact top bar + dropdown
          ═══════════════════════════════════════════ */}
      {isMobile && (
        <>
          {/* Top bar */}
          <div style={s.topBar}>
            <span style={s.topBarTitle}>British Caribbean Territories</span>
            <button
              style={s.topBarBtn}
              onClick={() => setDropdownOpen((o) => !o)}
              aria-expanded={dropdownOpen}
              aria-label="Toggle territory list"
            >
              {dropdownOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Dropdown panel */}
          {dropdownOpen && (
            // Tap outside to close
            <>
              <div
                style={s.dropdownBackdrop}
                onClick={() => setDropdownOpen(false)}
              />
              <div style={s.dropdown}>
                <p style={s.sidebarHeading}>Select a Territory</p>
                <ul style={s.ul}>
                  {TERRITORIES.map((t) => (
                    <li key={t.name} style={s.li} onClick={() => flyTo(t)}>
                      <span style={s.dot} />
                      <div>
                        <div style={s.tName}>{t.name}</div>
                        <div style={s.tCap}>Capital: {t.capital}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div style={s.divider} />
                <button
                  style={{ ...s.resetBtn, width: "100%" }}
                  onClick={resetView}
                >
                  ↩ Reset View
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* ═══════════════════════════════════════════
          DESKTOP layout — fixed left sidebar
          ═══════════════════════════════════════════ */}
      {!isMobile && (
        <>
          {/* Header gradient */}
          <div style={s.header}>
            <h1 style={s.title}>British Caribbean Territories</h1>
            <p style={s.sub}>British Overseas Territories of the Caribbean</p>
          </div>

          {/* Sidebar */}
          <div style={s.sidebar}>
            <p style={s.sidebarHeading}>Territories</p>
            <ul style={s.ul}>
              {TERRITORIES.map((t) => (
                <li
                  key={t.name}
                  style={s.li}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${P.blush}44`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                  onClick={() => flyTo(t)}
                >
                  <span style={s.dot} />
                  <div>
                    <div style={s.tName}>{t.name}</div>
                    <div style={s.tCap}>Capital: {t.capital}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div style={s.divider} />
            <div style={s.badge}>British Overseas Territory</div>
            <button
              style={s.resetBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${P.blush}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${P.blush}22`;
              }}
              onClick={resetView}
            >
              ↩ Reset View
            </button>
          </div>

          {/* Hover tooltip */}
          {activeTerritory && (
            <div
              style={{
                ...s.tooltip,
                left: tooltipPos.x + 16,
                top: tooltipPos.y - 10,
              }}
            >
              <div style={s.tooltipTitle}>{activeTerritory.name}</div>
              <div style={s.tooltipRow}>
                <span style={s.tooltipLabel}>Capital</span>
                {activeTerritory.capital}
              </div>
              <div style={s.tooltipRow}>
                <span style={s.tooltipLabel}>Status</span>British Overseas
                Territory
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────── */
const s = {
  shell: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: P.cream,
  },
  map: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  },

  // ── Mobile top bar ──
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    background: `${P.cream}f2`,
    borderBottom: `1px solid ${P.stone}`,
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 12px rgba(74,87,89,0.08)",
  },
  topBarTitle: {
    fontSize: "0.92rem",
    fontWeight: 700,
    color: P.teal,
    letterSpacing: "0.03em",
  },
  topBarBtn: {
    background: "none",
    border: `1.5px solid ${P.teal}`,
    borderRadius: "6px",
    color: P.teal,
    fontFamily: "Georgia, serif",
    fontSize: "1rem",
    width: "34px",
    height: "34px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  // Tap-outside backdrop
  dropdownBackdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 24,
  },

  // ── Mobile dropdown panel ──
  dropdown: {
    position: "absolute",
    top: "55px", // sits just below the top bar
    left: 0,
    right: 0,
    zIndex: 25,
    background: `${P.cream}fc`,
    borderBottom: `1px solid ${P.stone}`,
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 24px rgba(74,87,89,0.12)",
    padding: "14px 16px 18px",
    maxHeight: "60vh",
    overflowY: "auto",
  },

  // ── Desktop header ──
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: "20px 24px 60px",
    background: `linear-gradient(to bottom, ${P.cream}f8 0%, transparent 100%)`,
    pointerEvents: "none",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.6rem",
    fontWeight: 700,
    color: P.teal,
    letterSpacing: "0.04em",
  },
  sub: {
    margin: "5px 0 0",
    fontSize: "0.8rem",
    color: P.teal,
    fontStyle: "italic",
    opacity: 0.7,
    letterSpacing: "0.06em",
  },

  // ── Desktop sidebar ──
  sidebar: {
    position: "absolute",
    top: "90px",
    left: "16px",
    zIndex: 10,
    background: `${P.cream}f0`,
    border: `1px solid ${P.stone}`,
    borderRadius: "10px",
    padding: "16px 18px",
    minWidth: "215px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 20px rgba(74,87,89,0.1)",
  },

  // ── Shared ──
  sidebarHeading: {
    margin: "0 0 12px",
    fontSize: "0.68rem",
    fontWeight: 700,
    color: P.teal,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
  },
  ul: { listStyle: "none", margin: 0, padding: 0 },
  li: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "8px",
    cursor: "pointer",
    borderRadius: "6px",
    padding: "6px 8px",
    transition: "background 0.15s",
    background: "transparent",
  },
  dot: {
    flexShrink: 0,
    marginTop: "4px",
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: P.blush,
    border: `2px solid ${P.teal}`,
  },
  tName: {
    fontSize: "0.84rem",
    color: P.teal,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  tCap: { fontSize: "0.71rem", color: P.blushDeep, marginTop: "2px" },
  divider: { margin: "12px 0 10px", height: "1px", background: P.stone },
  badge: {
    padding: "4px 10px",
    background: `${P.blush}33`,
    border: `1px solid ${P.blush}`,
    borderRadius: "20px",
    fontSize: "0.65rem",
    color: P.teal,
    textAlign: "center",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  resetBtn: {
    marginTop: "10px",
    padding: "8px 0",
    background: `${P.blush}22`,
    border: `1px solid ${P.blush}`,
    borderRadius: "6px",
    color: P.teal,
    fontSize: "0.76rem",
    fontFamily: "Georgia, serif",
    cursor: "pointer",
    letterSpacing: "0.05em",
    transition: "background 0.15s",
    display: "block",
  },

  // ── Desktop tooltip ──
  tooltip: {
    position: "fixed",
    zIndex: 20,
    background: `${P.cream}f8`,
    border: `1px solid ${P.stone}`,
    borderRadius: "8px",
    padding: "10px 14px",
    pointerEvents: "none",
    backdropFilter: "blur(8px)",
    minWidth: "200px",
    boxShadow: "0 4px 20px rgba(74,87,89,0.15)",
  },
  tooltipTitle: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: P.teal,
    marginBottom: "6px",
    borderBottom: `1px solid ${P.stone}`,
    paddingBottom: "5px",
  },
  tooltipRow: {
    fontSize: "0.76rem",
    color: P.teal,
    marginTop: "4px",
    display: "flex",
    gap: "8px",
    opacity: 0.85,
  },
  tooltipLabel: {
    color: P.blushDeep,
    fontWeight: 600,
    minWidth: "52px",
  },
};
