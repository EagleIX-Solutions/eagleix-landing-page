import { useState } from "react";

const C = "#e2cfb6";

const STAGES = [
  { title: "COMPREENDER", text: "Observar continuamente infraestrutura, liquidez, disponibilidade, instituições e sinais operacionais." },
  { title: "INTERPRETAR", text: "Transformar sinais fragmentados em contexto operacional." },
  { title: "RACIOCINAR", text: "Avaliar continuamente todas as estratégias de execução disponíveis." },
  { title: "DETERMINAR", text: "Estabelecer a estratégia de execução mais adequada para aquele instante." },
  { title: "ADAPTAR", text: "Ajustar continuamente a execução enquanto as condições evoluem." },
];

const R = 118;
const CX = 175;
const CY = 175;

/** Living cognition core — the P.A.T.H. operational brain. */
export function PathCore() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState<number | null>(null);

  const current = held ?? active;
  const pos = STAGES.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / STAGES.length;
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
  });

  return (
    <div className="flex flex-col items-center gap-5 md:gap-6 lg:gap-7 pt-2 md:pt-4">
      <svg viewBox="0 0 350 350" className="w-[78%] sm:w-full max-w-[380px] flex-shrink-0 overflow-visible" role="img"
        aria-label="Núcleo cognitivo do P.A.T.H.">
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor={C} stopOpacity="0.22" />
            <stop offset="60%" stopColor={C} stopOpacity="0.04" />
            <stop offset="100%" stopColor={C} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C} stopOpacity="0" />
            <stop offset="100%" stopColor={C} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <circle cx={CX} cy={CY} r={R + 46} fill="url(#coreGlow)" />

        {/* machined rings — clear stroke hierarchy */}
        {[
          { r: R + 34, o: 0.2, w: 0.7, d: "1 7" },
          { r: R, o: 0.42, w: 1 },
          { r: R - 60, o: 0.16, w: 0.7 },
        ].map(({ r, o, w, d }) => (
          <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke={C} strokeOpacity={o} strokeWidth={w} strokeDasharray={d} />
        ))}

        {/* continuous sweep — the system is always reading */}
        <g className="eagle-sweep" style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <line x1={CX} y1={CY} x2={CX + R + 34} y2={CY} stroke="url(#sweepGrad)" strokeWidth="1" />
        </g>

        {/* chords between stages */}
        {pos.map((p, i) =>
          pos.map((q, j) =>
            j > i ? (
              <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={C}
                strokeWidth="0.7"
                strokeOpacity={i === current || j === current ? 0.42 : 0.12}
              />
            ) : null,
          ),
        )}

        {/* core */}
        <circle cx={CX} cy={CY} r="26" fill="#000" fillOpacity="0.55" stroke={C} strokeOpacity="0.7" strokeWidth="1" />
        <circle cx={CX} cy={CY} r="6" fill={C} fillOpacity="0.95" />
        <text x={CX} y={CY + 46} textAnchor="middle" fill={C} fillOpacity="0.7" fontSize="8.5" letterSpacing="3.6" fontWeight="300">
          P.A.T.H.
        </text>

        {/* stage nodes */}
        {pos.map((p, i) => {
          const on = i === current;
          const anchor = p.x > CX + 6 ? "start" : p.x < CX - 6 ? "end" : "middle";
          const dx = anchor === "start" ? 18 : anchor === "end" ? -18 : 0;
          const dy = p.y < CY ? -18 : 24;
          return (
            <g key={STAGES[i].title} onMouseEnter={() => setHeld(i)} onMouseLeave={() => setHeld(null)}
              style={{ cursor: "pointer" }}>
              <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
              <circle cx={p.x} cy={p.y} r={on ? 7 : 4.5} fill={on ? C : "#000"} stroke={C}
                strokeOpacity={on ? 1 : 0.7}
              />
              {on && <circle cx={p.x} cy={p.y} r="15" fill="none" stroke={C} strokeOpacity="0.45"
              />}
              <text x={p.x + dx} y={p.y + (anchor === "middle" ? dy : 3)} textAnchor={anchor}
                fill={C} fillOpacity={on ? 1 : 0.58} fontSize="9" letterSpacing="3.4" fontWeight="300"
              >
                {STAGES[i].title}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex w-full max-w-md flex-col items-center text-center">
        <span className="text-[10px] font-light tabular-nums tracking-[0.3em] text-[#e2cfb6]/70">
          {String(current + 1).padStart(2, "0")} / 05
        </span>
        <span className="mt-4 h-px w-16 bg-[#e2cfb6]/25" />
        <h3 className="mt-6 text-[11px] font-light tracking-[0.4em] text-[#e2cfb6]">
          {STAGES[current].title}
        </h3>
        <p className="mx-auto mt-5 min-h-[4.5rem] max-w-[24rem] text-sm font-light leading-[1.85] text-muted-foreground md:text-[15px]">
          {STAGES[current].text}
        </p>
        <div className="mx-auto mt-6 flex w-full max-w-[18rem] gap-1.5">
          {STAGES.map((s, i) => (
            <button key={s.title} aria-label={s.title} onClick={() => setHeld(i)}
              className={`h-px flex-1 ${i === current ? "bg-[#e2cfb6]" : "bg-[#e2cfb6]/30"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
