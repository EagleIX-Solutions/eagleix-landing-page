const C = "#e2cfb6";

/* ── refined operational architecture ──────────────────────────────
   Two-tier diagram inspired by luxury editorial systems:
   top row: four numbered cards with minimal connectors;
   bottom row: continuous feedback loop with calibrated nodes.
   All coordinates derive from a single horizontal grid. */

const VB_W = 1200;
const VB_H = 340;

const M = 42; // outer margin
const CARD_W = 246;
const CARD_H = 110;
const TOP_Y = 22;
const GAP = (VB_W - 2 * M - 4 * CARD_W) / 3; // gap between cards
const CARDS_X = [M, M + CARD_W + GAP, M + 2 * (CARD_W + GAP), M + 3 * (CARD_W + GAP)];

const TOP_DATA = [
  { n: "01", t: "CONTEXTO", d: "Liquidez, disponibilidade e instituições evoluem." },
  { n: "02", t: "LEITURA", d: "O P.A.T.H. relê o ambiente continuamente." },
  { n: "03", t: "DETERMINAÇÃO", d: "A estratégia de execução é redefinida em tempo real." },
  { n: "04", t: "EXECUÇÃO", d: "A execução evolui sem interrupções e sem recomeços." },
];

const BOT_Y = 224;
const BOT_LABELS = ["ENTRADA DE CONTEXTO", "LEITURA DO AMBIENTE", "DECISÃO DE ESTRATÉGIA", "FLUXO DE EXECUÇÃO"];
const BOT_DESCS = ["Ambiente em mudança", "Interpretação contínua", "Determinação da melhor rota", "Execução adaptativa"];
const BOT_X = CARDS_X.map((x) => x + CARD_W / 2);

export function AdaptationBlueprint() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full overflow-visible"
      role="img"
      aria-label="Arquitetura operacional da EAGLE IX: quatro etapas de execução e ciclo contínuo de retroalimentação"
    >
      <defs>
        <linearGradient id="oaCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C} stopOpacity="0.045" />
          <stop offset="100%" stopColor={C} stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="oaLoop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C} stopOpacity="0" />
          <stop offset="8%" stopColor={C} stopOpacity="0.14" />
          <stop offset="92%" stopColor={C} stopOpacity="0.14" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── top row: four numbered cards ───────────────────────────── */}
      {TOP_DATA.map((card, i) => {
        const x = CARDS_X[i];
        return (
          <g key={card.n}>
            {/* card plate */}
            <rect
              x={x}
              y={TOP_Y}
              width={CARD_W}
              height={CARD_H}
              rx="1"
              fill="url(#oaCard)"
              stroke={C}
              strokeOpacity="0.18"
              strokeWidth="0.8"
            />
            {/* corner accents */}
            {[
              [x, TOP_Y, 1, 1],
              [x + CARD_W, TOP_Y, -1, 1],
              [x, TOP_Y + CARD_H, 1, -1],
              [x + CARD_W, TOP_Y + CARD_H, -1, -1],
            ].map(([px, py, sx, sy], k) => (
              <path
                key={k}
                d={`M ${px + sx * 10} ${py} H ${px} V ${py + sy * 10}`}
                fill="none"
                stroke={C}
                strokeOpacity="0.42"
                strokeWidth="0.8"
              />
            ))}

            {/* number */}
            <text
              x={x + 18}
              y={TOP_Y + 26}
              fill={C}
              fillOpacity="0.4"
              fontSize="9"
              letterSpacing="1.2"
              fontWeight="300"
            >
              {card.n}
            </text>

            {/* title */}
            <text
              x={x + 18}
              y={TOP_Y + 54}
              fill={C}
              fillOpacity="0.92"
              fontSize="12"
              letterSpacing="2.4"
              fontWeight="300"
            >
              {card.t}
            </text>

            {/* description */}
            <text
              x={x + 18}
              y={TOP_Y + 80}
              fill={C}
              fillOpacity="0.55"
              fontSize="11"
              letterSpacing="0.3"
              fontWeight="300"
            >
              {card.d}
            </text>
          </g>
        );
      })}

      {/* ── connectors between top cards ─────────────────────────── */}
      {CARDS_X.slice(0, 3).map((x, i) => {
        const x1 = x + CARD_W;
        const x2 = CARDS_X[i + 1];
        const cx = (x1 + x2) / 2;
        const cy = TOP_Y + CARD_H / 2;
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={cy}
              x2={x2}
              y2={cy}
              stroke={C}
              strokeOpacity="0.16"
              strokeWidth="0.8"
            />
            <rect
              x={cx - 3}
              y={cy - 3}
              width="6"
              height="6"
              fill="background"
              stroke={C}
              strokeOpacity="0.5"
              strokeWidth="0.8"
            />
          </g>
        );
      })}

      {/* ── bottom row: continuous feedback loop ──────────────────── */}
      {/* loop field */}
      <rect
        x={M - 10}
        y={BOT_Y - 12}
        width={VB_W - 2 * M + 20}
        height={120}
        rx="1"
        fill="url(#oaLoop)"
        stroke={C}
        strokeOpacity="0.08"
        strokeWidth="0.8"
      />

      {/* bottom horizontal spine */}
      <line
        x1={M}
        y1={BOT_Y + 52}
        x2={VB_W - M}
        y2={BOT_Y + 52}
        stroke={C}
        strokeOpacity="0.16"
        strokeWidth="0.8"
      />

      {/* nodes and labels */}
      {BOT_LABELS.map((label, i) => {
        const cx = BOT_X[i];
        return (
          <g key={label}>
            {/* vertical stem from label to spine */}
            <line
              x1={cx}
              y1={BOT_Y - 6}
              x2={cx}
              y2={BOT_Y + 52}
              stroke={C}
              strokeOpacity="0.14"
              strokeWidth="0.8"
            />

            {/* square node on spine */}
            <rect
              x={cx - 3.5}
              y={BOT_Y + 52 - 3.5}
              width="7"
              height="7"
              fill="background"
              stroke={C}
              strokeOpacity="0.55"
              strokeWidth="0.8"
            />

            {/* label */}
            <text
              x={cx}
              y={BOT_Y + 12}
              textAnchor="middle"
              fill={C}
              fillOpacity="0.85"
              fontSize="9.5"
              letterSpacing="2"
              fontWeight="300"
            >
              {label}
            </text>

            {/* description */}
            <text
              x={cx}
              y={BOT_Y + 30}
              textAnchor="middle"
              fill={C}
              fillOpacity="0.4"
              fontSize="9"
              letterSpacing="0.2"
              fontWeight="300"
            >
              {BOT_DESCS[i]}
            </text>
          </g>
        );
      })}

      {/* arrows between bottom labels */}
      {BOT_X.slice(0, 3).map((cx, i) => {
        const nextX = BOT_X[i + 1];
        const mid = (cx + nextX) / 2;
        const y = BOT_Y + 52;
        return (
          <g key={i}>
            <line
              x1={cx + 8}
              y1={y}
              x2={nextX - 12}
              y2={y}
              stroke={C}
              strokeOpacity="0.2"
              strokeWidth="0.8"
            />
            <path
              d={`M ${nextX - 12} ${y - 3} L ${nextX - 6} ${y} L ${nextX - 12} ${y + 3} Z`}
              fill={C}
              fillOpacity="0.35"
            />
          </g>
        );
      })}

      {/* bottom center label */}
      <text
        x={VB_W / 2}
        y={BOT_Y + 92}
        textAnchor="middle"
        fill={C}
        fillOpacity="0.55"
        fontSize="9"
        letterSpacing="3"
        fontWeight="300"
      >
        CICLO CONTÍNUO DE RETROALIMENTAÇÃO
      </text>
    </svg>
  );
}
