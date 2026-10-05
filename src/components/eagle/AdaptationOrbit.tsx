const C = "#e2cfb6";

const VB_W = 1280;
const VB_H = 664;
const CX = 640;
const CY = 318;
const RX = 432;
const RY = 198;
const NODE_R = 26;
/* perimeter approximation (Ramanujan) for the dashed travelling arc */
const PERIM =
  Math.PI *
  (3 * (RX + RY) - Math.sqrt((3 * RX + RY) * (RX + 3 * RY)));

/* icon paths drawn inside a 24x24 box centred on the node */
function Icon({ kind, x, y }: { kind: string; x: number; y: number }) {
  const common = {
    fill: "none",
    stroke: C,
    strokeOpacity: 0.85,
    strokeWidth: 1.05,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <g transform={`translate(${x - 11} ${y - 11}) scale(1.22)`}>
      {kind === "contexto" && (
        <>
          <circle cx="9" cy="9" r="7.2" {...common} />
          <circle cx="9" cy="9" r="3.4" {...common} />
          <circle cx="9" cy="9" r="0.9" fill={C} stroke="none" fillOpacity="0.9" />
        </>
      )}
      {kind === "leitura" && (
        <>
          <path d="M1.6 5.4 L9 1.8 L16.4 5.4 L9 9 Z" {...common} />
          <path d="M1.6 9 L9 12.6 L16.4 9" {...common} />
          <path d="M1.6 12.6 L9 16.2 L16.4 12.6" {...common} strokeOpacity={0.45} />
        </>
      )}
      {kind === "determinacao" && (
        <>
          <path d="M9 2.2 V6.4" {...common} />
          <path d="M3.4 15.6 V12.2 H14.6 V15.6" {...common} />
          <path d="M9 12.2 V6.4" {...common} />
          <circle cx="9" cy="4" r="1.7" {...common} />
          <circle cx="3.4" cy="15.6" r="1.7" {...common} />
          <circle cx="14.6" cy="15.6" r="1.7" {...common} />
        </>
      )}
      {kind === "execucao" && (
        <>
          <circle cx="9" cy="9" r="7.2" {...common} strokeOpacity={0.4} />
          <path d="M7.1 5.6 L13 9 L7.1 12.4 Z" {...common} />
        </>
      )}
    </g>
  );
}

type Stage = {
  n: string;
  t: string;
  lines: string[];
  icon: string;
  angle: number; // degrees, 0 = top, clockwise
  anchor: "middle" | "start" | "end";
};

const STAGES: Stage[] = [
  { n: "01", t: "Contexto", lines: ["Liquidez, disponibilidade", "e instituições evoluem."], icon: "contexto", angle: 0, anchor: "middle" },
  { n: "02", t: "Leitura", lines: ["O P.A.T.H. relê o", "ambiente continuamente."], icon: "leitura", angle: 90, anchor: "start" },
  { n: "03", t: "Determinação", lines: ["A estratégia de execução", "é redefinida em tempo real."], icon: "determinacao", angle: 180, anchor: "middle" },
  { n: "04", t: "Execução", lines: ["A execução evolui", "sem interrupções", "e sem recomeços."], icon: "execucao", angle: 270, anchor: "end" },
];

function pt(angleDeg: number, sx = 1, sy = 1) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + RX * sx * Math.cos(a), y: CY + RY * sy * Math.sin(a) };
}

/** Closed-loop orbital system — Contexto → Leitura → Determinação → Execução → Contexto */
export function AdaptationOrbit() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full overflow-visible"
      role="img"
      aria-label="Sistema orbital de adaptação contínua: contexto, leitura, determinação e execução"
    >
      <defs>
        <radialGradient id="adCore">
          <stop offset="0%" stopColor={C} stopOpacity="0.08" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* subtle circular guides */}
      <ellipse cx={CX} cy={CY} rx={RX + 52} ry={RY + 34} fill="none" stroke={C} strokeOpacity="0.06" strokeWidth="0.6" strokeDasharray="1 8" />
      <ellipse cx={CX} cy={CY} rx={RX - 118} ry={RY - 62} fill="none" stroke={C} strokeOpacity="0.07" strokeWidth="0.6" />

      {/* primary orbital path */}
      <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke={C} strokeOpacity="0.2" strokeWidth="0.8" />

      {/* slow, near-imperceptible motion — a single travelling arc */}
      <g className="eagle-sweep" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX}
          ry={RY}
          fill="none"
          stroke={C}
          strokeOpacity="0.3"
          strokeWidth="0.8"
          strokeDasharray={`58 ${PERIM - 58}`}
          strokeLinecap="round"
        />
      </g>

      {/* delicate directional indicators at the diagonals */}
      {[45, 135, 225, 315].map((a) => {
        const p = pt(a);
        const rot = (Math.atan2((RX / RY) * (p.y - CY), (RY / RX) * (p.x - CX)) * 180) / Math.PI + 90;
        return (
          <path
            key={a}
            d="M -4.2 -4.2 L 0 0 L -4.2 4.2"
            fill="none"
            stroke={C}
            strokeOpacity="0.4"
            strokeWidth="0.8"
            strokeLinecap="round"
            transform={`translate(${p.x} ${p.y}) rotate(${rot})`}
          />
        );
      })}

      {/* core */}
      <circle cx={CX} cy={CY} r="108" fill="url(#adCore)" />
      {[93, 73, 53].map((r, i) => (
        <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke={C} strokeOpacity={0.06 + i * 0.03} strokeWidth="0.6" />
      ))}
      <circle cx={CX} cy={CY} r="53" fill="#000" fillOpacity="0.5" stroke={C} strokeOpacity="0.28" strokeWidth="0.8" />
      <text x={CX} y={CY - 3} textAnchor="middle" fill={C} fillOpacity="0.95" fontSize="17" letterSpacing="4.2" fontWeight="300">
        P.A.T.H.
      </text>
      <text x={CX} y={CY + 16} textAnchor="middle" fill={C} fillOpacity="0.45" fontSize="9.4" letterSpacing="2.6" fontWeight="300">
        CONTINUOUS
      </text>
      <text x={CX} y={CY + 29} textAnchor="middle" fill={C} fillOpacity="0.45" fontSize="9.4" letterSpacing="2.6" fontWeight="300">
        ADAPTATION
      </text>

      {/* stages */}
      {STAGES.map((s) => {
        const p = pt(s.angle);
        const isTop = s.angle === 0;
        const isBottom = s.angle === 180;
        const isRight = s.angle === 90;

        let tx = p.x;
        let ty = p.y;
        if (isTop) ty = p.y - NODE_R - 62;
        else if (isBottom) ty = p.y + NODE_R + 40;
        else if (isRight) {
          tx = p.x + NODE_R + 30;
          ty = p.y - 22;
        } else {
          tx = p.x - NODE_R - 30;
          ty = p.y - 32;
        }

        return (
          <g key={s.n}>
            <circle cx={p.x} cy={p.y} r={NODE_R} fill="#000" fillOpacity="0.7" stroke={C} strokeOpacity="0.32" strokeWidth="0.8" />
            <Icon kind={s.icon} x={p.x} y={p.y} />

            <text x={tx} y={ty} textAnchor={s.anchor} fill={C} fillOpacity="0.5" fontSize="11" letterSpacing="3" fontWeight="300">
              {s.n}
            </text>
            <text x={tx} y={ty + 22} textAnchor={s.anchor} fill="#f2ece4" fillOpacity="0.95" fontSize="19.5" letterSpacing="0.2" fontWeight="300">
              {s.t}
            </text>
            {s.lines.map((line, i) => (
              <text
                key={line}
                x={tx}
                y={ty + 45 + i * 19}
                textAnchor={s.anchor}
                fill={C}
                fillOpacity="0.62"
                fontSize="14.5"
                letterSpacing="0.1"
                fontWeight="300"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
