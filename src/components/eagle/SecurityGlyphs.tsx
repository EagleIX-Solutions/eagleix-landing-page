const S = {
  fill: "none",
  stroke: "#e2cfb6",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden {...S}>
      {children}
    </svg>
  );
}

/* 1 — distributed architecture */
export const GlyphMesh = () => (
  <Glyph>
    <path d="M16 5 L25.5 10.5 L25.5 21.5 L16 27 L6.5 21.5 L6.5 10.5 Z" opacity={0.85} />
    <path d="M16 5 L16 27 M6.5 10.5 L25.5 21.5 M25.5 10.5 L6.5 21.5" opacity={0.28} />
    <circle cx="16" cy="5" r="1.4" /><circle cx="25.5" cy="10.5" r="1.4" />
    <circle cx="25.5" cy="21.5" r="1.4" /><circle cx="16" cy="27" r="1.4" />
    <circle cx="6.5" cy="21.5" r="1.4" /><circle cx="6.5" cy="10.5" r="1.4" />
  </Glyph>
);

/* 2 — security by design */
export const GlyphSecure = () => (
  <Glyph>
    <rect x="6" y="6" width="20" height="20" opacity={0.7} />
    <rect x="11" y="11" width="10" height="10" opacity={0.45} />
    <path d="M16 11 V6 M16 26 V21 M11 16 H6 M26 16 H21" opacity={0.5} />
    <circle cx="16" cy="16" r="1.5" />
  </Glyph>
);

/* 3 — regulatory compliance */
export const GlyphCompliance = () => (
  <Glyph>
    <path d="M8 4 H20 L24 8 V28 H8 Z" opacity={0.75} />
    <path d="M20 4 V8 H24" opacity={0.6} />
    <path d="M11.5 12 H18 M11.5 16 H20" opacity={0.4} />
    <circle cx="16" cy="22.5" r="3.5" opacity={0.85} />
    <path d="M14.4 22.5 L15.6 23.7 L17.8 21.3" />
  </Glyph>
);

/* 4 — global infrastructure */
export const GlyphGlobe = () => (
  <Glyph>
    <circle cx="16" cy="16" r="11" opacity={0.8} />
    <ellipse cx="16" cy="16" rx="5" ry="11" opacity={0.35} />
    <path d="M5.6 12.5 H26.4 M5.6 19.5 H26.4" opacity={0.35} />
    <circle cx="16" cy="5" r="1.2" /><circle cx="21" cy="19.5" r="1.2" /><circle cx="10.2" cy="12.5" r="1.2" />
  </Glyph>
);

/* 5 — continuous evolution */
export const GlyphEvolution = () => (
  <Glyph>
    <circle cx="16" cy="16" r="10.5" strokeDasharray="3.2 4.4" opacity={0.6} />
    <circle cx="16" cy="16" r="5.5" opacity={0.8} />
    <path d="M16 5.5 V10.5 M16 21.5 V26.5" opacity={0.5} />
    <circle cx="26.5" cy="16" r="1.4" />
  </Glyph>
);

/* 6 — observability & traceability */
export const GlyphTrace = () => (
  <Glyph>
    <path d="M5 24 L11.5 24 L14.5 14 L18 26 L21 19 L27 19" opacity={0.85} />
    <path d="M5 7 V27 H27" opacity={0.4} />
    <circle cx="18" cy="26" r="1.3" /><circle cx="14.5" cy="14" r="1.3" />
  </Glyph>
);

/* Institutional illustration — layered infrastructure enclosure */
export function SecurityDiagram() {
  return (
    <svg viewBox="0 0 620 420" className="w-full" aria-hidden fill="none">
      <defs>
        <linearGradient id="sec-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2cfb6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e2cfb6" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* outer perimeter */}
      <rect x="40" y="30" width="540" height="360" stroke="#e2cfb6" strokeOpacity="0.16" />
      <rect x="80" y="62" width="460" height="296" stroke="#e2cfb6" strokeOpacity="0.12" strokeDasharray="2 6" />

      {/* corner ticks */}
      {[
        [40, 30, 1, 1], [580, 30, -1, 1], [40, 390, 1, -1], [580, 390, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <path key={i} d={`M${x} ${y + 16 * (sy as number)} L${x} ${y} L${x + 16 * (sx as number)} ${y}`} stroke="#e2cfb6" strokeOpacity="0.45" />
      ))}

      {/* concentric containment rings */}
      <circle cx="310" cy="210" r="132" stroke="#e2cfb6" strokeOpacity="0.14" />
      <circle cx="310" cy="210" r="96" stroke="#e2cfb6" strokeOpacity="0.2" />
      <circle cx="310" cy="210" r="60" stroke="url(#sec-edge)" />

      {/* radial structure */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12 - Math.PI / 2;
        const x1 = 310 + Math.cos(a) * 60, y1 = 210 + Math.sin(a) * 60;
        const x2 = 310 + Math.cos(a) * 132, y2 = 210 + Math.sin(a) * 132;
        return (
          <g key={i}>
            <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke="#e2cfb6" strokeOpacity={i % 3 === 0 ? 0.28 : 0.1} />
            {i % 3 === 0 && <rect x={x2 - 2.5} y={y2 - 2.5} width="5" height="5" stroke="#e2cfb6" strokeOpacity="0.55" />}
          </g>
        );
      })}

      {/* core */}
      <rect x="290" y="190" width="40" height="40" stroke="#e2cfb6" strokeOpacity="0.6" />
      <rect x="303" y="203" width="14" height="14" stroke="#e2cfb6" strokeOpacity="0.85" />
      <circle cx="310" cy="210" r="2" fill="#e2cfb6" fillOpacity="0.9" />

      {/* base rules */}
      <path d="M40 210 H178 M442 210 H580" stroke="#e2cfb6" strokeOpacity="0.12" />
      <path d="M310 30 V78 M310 342 V390" stroke="#e2cfb6" strokeOpacity="0.12" />
    </svg>
  );
}
