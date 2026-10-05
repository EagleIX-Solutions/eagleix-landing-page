const C = "#e2cfb6";

/* ── one geometric system ──────────────────────────────────────
   Three perfectly horizontal planes on a single vertical axis.
   Every value derives from these constants — nothing hand-placed. */
const X0 = 48;                     // left edge of the layer plate
const W = 424;                     // layer width (the widest element)
const CX = X0 + W / 2;             // the single vertical axis
const R = 3;                       // shared corner radius

const W_STATE = W * 0.75;          // outer states: 75% of the layer
const XS = CX - W_STATE / 2;

const H_STATE = 32;                // shared thickness of both states
const H_LAYER = 78;               // protagonist band: reduced height only, for a more elegant proportion

const Y_INTENT = 88;
const GAP = 44;                    // consistent rhythm between the layer and execution planes
const CORE_GAP = 14;               // decision core sits closer to the layer
const TOP_DROP = 44;               // compressed distance from intent to decision core

const INTENT_BOTTOM = Y_INTENT + H_STATE;
const Y_LAYER = INTENT_BOTTOM + TOP_DROP + CORE_GAP;
const CORE_Y = Y_LAYER - CORE_GAP;
const OUT_Y = Y_LAYER + H_LAYER;
const Y_DEST = OUT_Y + GAP + 24;
const DEST_Y = Y_DEST + H_STATE / 2;
const VB_H = Y_DEST + H_STATE + 44;

/** identical cubic tension for every inbound curve */
const T = 0.55;
const flow = (x1: number, y1: number, x2: number, y2: number) => {
  const d = (y2 - y1) * T;
  return `M ${x1} ${y1} C ${x1} ${y1 + d}, ${x2} ${y2 - d}, ${x2} ${y2}`;
};

/** four evenly spaced origins inside the intent plane */
const SOURCES = [1, 2, 3, 4].map((i) => XS + (W_STATE * i) / 5);

/**
 * EAGLE Navigation Layer — proprietary decision mechanism.
 * Possibilities enter. Context is interpreted. One execution leaves.
 */
export function NavigationLayerDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[660px] select-none">
      <svg viewBox={`0 0 520 ${VB_H}`} className="w-full overflow-visible" role="img"
        aria-label="Mecanismo da Navigation Layer da EAGLE IX: intenção, interpretação de contexto e execução determinada">
        <defs>
          <linearGradient id="nlLayer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C} stopOpacity="0.17" />
            <stop offset="55%" stopColor={C} stopOpacity="0.05" />
            <stop offset="100%" stopColor={C} stopOpacity="0.13" />
          </linearGradient>
          <linearGradient id="nlState" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C} stopOpacity="0.075" />
            <stop offset="100%" stopColor={C} stopOpacity="0.025" />
          </linearGradient>
          <linearGradient id="nlIn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C} stopOpacity="0.04" />
            <stop offset="100%" stopColor={C} stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="nlCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C} stopOpacity="0.8" />
            <stop offset="45%" stopColor={C} stopOpacity="0.14" />
            <stop offset="100%" stopColor={C} stopOpacity="0" />
          </radialGradient>
          <clipPath id="nlBand">
            <rect x={X0} y={Y_LAYER} width={W} height={H_LAYER} rx={R} />
          </clipPath>
        </defs>

        {/* ── 01 · intenção ─────────────────────────────────── */}
        <text x={XS} y={Y_INTENT - 18} fill={C} fillOpacity="0.62" fontSize="8.5" letterSpacing="3.4" fontWeight="300">
          01 · INTENÇÃO
        </text>
        <rect x={XS} y={Y_INTENT} width={W_STATE} height={H_STATE} rx={R}
          fill="url(#nlState)" stroke={C} strokeOpacity="0.42" strokeWidth="0.9" />
        {SOURCES.map((x) => (
          <g key={`s${x}`}>
            <circle cx={x} cy={Y_INTENT + H_STATE / 2} r="2.4" fill={C} fillOpacity="0.75" />
            <line x1={x} y1={Y_INTENT + H_STATE / 2} x2={x} y2={INTENT_BOTTOM} stroke={C} strokeOpacity="0.3" strokeWidth="0.7" />
          </g>
        ))}
        <text x={XS + W_STATE} y={Y_INTENT - 18} textAnchor="end" fill={C} fillOpacity="0.42"
          fontSize="8.5" letterSpacing="3.4" fontWeight="300">
          CAMINHOS POSSÍVEIS
        </text>

        {/* ── converging possibilities: static curve family ─── */}
        <g fill="none">
          {SOURCES.map((x) => {
            const d = flow(x, INTENT_BOTTOM, CX, CORE_Y);
            return (
              <path key={`f${x}`} d={d} stroke={C} strokeOpacity="0.22" strokeWidth="0.9" />
            );
          })}
        </g>

        {/* ── decision core — focal point, above the layer ──── */}
        <g>
          <circle cx={CX} cy={CORE_Y} r="26" fill="url(#nlCore)" />
          <circle cx={CX} cy={CORE_Y} r="9" fill="none" stroke={C} strokeOpacity="0.6" strokeWidth="0.8" />
          <circle cx={CX} cy={CORE_Y} r="3.6" fill={C} />
        </g>

        {/* ── single line entering the layer ────────────────── */}
        <line x1={CX} y1={CORE_Y + 9} x2={CX} y2={Y_LAYER} stroke={C} strokeOpacity="0.7" strokeWidth="1.1" />

        {/* ── 02 · the layer ────────────────────────────────── */}
        <text x={X0} y={Y_LAYER - 18} fill={C} fillOpacity="0.62" fontSize="8.5" letterSpacing="3.4" fontWeight="300">
          02 · CONTEXTO
        </text>
        <rect x={X0} y={Y_LAYER} width={W} height={H_LAYER} rx={R}
          fill="url(#nlLayer)" stroke={C} strokeOpacity="0.85" strokeWidth="1.3" />

        {/* internal typography — optically centred on both axes */}
        <g clipPath="url(#nlBand)">
          <text x={CX} y={Y_LAYER + H_LAYER / 2 + 2} textAnchor="middle" fill={C} fillOpacity="0.98"
            fontSize="12" letterSpacing="5" fontWeight="300">
            NAVIGATION LAYER
          </text>
          <text x={CX} y={Y_LAYER + H_LAYER / 2 + 22} textAnchor="middle" fill={C} fillOpacity="0.5"
            fontSize="7.8" letterSpacing="2.4" fontWeight="300">
            COMPREENDE · INTERPRETA · DETERMINA · ADAPTA
          </text>
        </g>

        {/* ── single determined output ──────────────────────── */}
        <g fill="none">
          <path d={`M ${CX} ${OUT_Y} L ${CX} ${DEST_Y}`} stroke={C} strokeOpacity="0.85" strokeWidth="1.3" />
          <path className="eagle-trace-live" d={`M ${CX} ${OUT_Y} L ${CX} ${DEST_Y}`} stroke={C} strokeWidth="2" strokeOpacity="1"
            strokeDasharray="26 620" style={{ animation: "eagle-trace 6.5s cubic-bezier(.4,0,.2,1) infinite" }} />
        </g>
        <text x={XS + W_STATE} y={Y_DEST - 18} textAnchor="end" fill={C} fillOpacity="0.42"
          fontSize="8.5" letterSpacing="3.4" fontWeight="300">
          EXECUÇÃO ÚNICA
        </text>

        {/* ── 03 · execução determinada ─────────────────────── */}
        <text x={XS} y={Y_DEST - 18} fill={C} fillOpacity="0.62" fontSize="8.5" letterSpacing="3.4" fontWeight="300">
          03 · EXECUÇÃO
        </text>
        <rect x={XS} y={Y_DEST} width={W_STATE} height={H_STATE} rx={R}
          fill="url(#nlState)" stroke={C} strokeOpacity="0.6" strokeWidth="1" />
        <circle cx={CX} cy={DEST_Y} r="3.4" fill={C} />
        <circle cx={CX} cy={DEST_Y} r="9.5" fill="none" stroke={C} strokeOpacity="0.5" />
        <text x={CX} y={Y_DEST + H_STATE + 26} textAnchor="middle" fill={C} fillOpacity="0.85"
          fontSize="8.5" letterSpacing="3.4" fontWeight="300">
          DESTINO · EXECUÇÃO DETERMINADA
        </text>
      </svg>

      <dl className="mt-10 grid grid-cols-3 text-[10px] font-light leading-[1.9] tracking-[0.22em]">
        {[
          ["BANCOS", "MOVIMENTAM CAPITAL", false],
          ["INSTITUIÇÕES", "CONECTAM REDES", false],
          ["EAGLE IX", "DETERMINA A EXECUÇÃO", true],
        ].map(([a, b, active]) => (
          <div key={a as string}
            className={`border-t pt-4 pr-6 ${active ? "border-[#e2cfb6]/60" : "border-[#e2cfb6]/15"}`}>
            <dt className={active ? "text-[#e2cfb6]" : "text-[#e2cfb6]/55"}>{a}</dt>
            <dd className={active ? "text-[#e2cfb6]/70" : "text-muted-foreground"}>{b}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
