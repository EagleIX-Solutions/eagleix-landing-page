import { Inbox, Cog, Play, Scan, Layers, Network, Zap } from "lucide-react";
import { Reveal } from "@/components/eagle/Reveal";

type Stage = { n: string; t: string; d: string; Icon: typeof Inbox };

const BEFORE: Stage[] = [
  { n: "01", t: "RECEBE", d: "Processa transações.", Icon: Inbox },
  { n: "02", t: "PROCESSA", d: "Sistemas desconectados.", Icon: Cog },
];

const CORE: Stage[] = [
  { n: "03", t: "COMPREENDE", d: "Lê o contexto antes de executar.", Icon: Scan },
  { n: "04", t: "INTERPRETA", d: "Uma camada operacional.", Icon: Layers },
  { n: "05", t: "DETERMINA", d: "Múltiplas instituições e trilhos.", Icon: Network },
  { n: "06", t: "ADAPTA", d: "Uma única lógica de execução.", Icon: Zap },
];

const AFTER: Stage[] = [
  { n: "07", t: "EXECUTA", d: "Determinada pelo instante.", Icon: Play },
];

function StageBlock({
  stage,
  accent,
}: {
  stage: Stage;
  accent: boolean;
}) {
  const { n, t, d, Icon } = stage;
  return (
    <div className="flex flex-col items-start text-left">
      <span
        className={`grid shrink-0 place-items-center rounded-full border bg-background ${
          accent
            ? "h-[2.6rem] w-[2.6rem] border-[#e2cfb6]/55"
            : "h-[2.1rem] w-[2.1rem] border-muted-foreground/40"
        }`}
      >
        <Icon
          strokeWidth={1.1}
          className={`h-[54%] w-[54%] ${accent ? "text-[#e2cfb6]" : "text-muted-foreground"}`}
        />
      </span>
      <span className="mt-[clamp(0.6rem,1.5vh,1rem)] text-[9px] font-light tracking-[0.3em] text-muted-foreground/55">
        {n}
      </span>
      <h4
        className={`mt-1.5 text-[11.5px] font-light tracking-[0.22em] ${
          accent ? "text-[#e2cfb6]" : "text-muted-foreground"
        }`}
      >
        {t}
      </h4>
      <p
        className={`mt-2 max-w-[180px] text-[11.5px] font-light leading-[1.6] ${
          accent ? "text-muted-foreground/85" : "text-muted-foreground/65"
        }`}
      >
        {d}
      </p>
    </div>
  );
}

export function OperatingComparison() {
  return (
    <div className="relative">
      {/* one continuous connector — passes through every stage */}
      <svg
        viewBox="0 0 1000 8"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-[1.05rem] right-[9%] top-[2.55rem] hidden h-2 overflow-visible lg:block"
        aria-hidden
      >
        <path id="eagle-flow-path" d="M0 4 H1000" fill="none" stroke="#e2cfb6" strokeOpacity="0.22" strokeWidth="0.7" />
        <circle r="1.9" fill="#e2cfb6" opacity="0.85">
          <animateMotion dur="16s" repeatCount="indefinite" calcMode="linear" path="M0 4 H1000" />
        </circle>
      </svg>

      <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 lg:grid-cols-[0.85fr_0.85fr_3.4fr_0.85fr] lg:gap-x-[clamp(1.5rem,3vw,3rem)]">
        {BEFORE.map((s, i) => (
          <Reveal key={s.t} delay={i * 90} className="lg:pt-[1.5rem]">
            <StageBlock stage={s} accent={false} />
          </Reveal>
        ))}

        {/* EAGLE OPERATING LOGIC — internal infrastructure module */}
        <Reveal
          delay={200}
          className="col-span-2 lg:col-span-1"
        >
          <div className="relative border border-[#e2cfb6]/22 bg-[#e2cfb6]/[0.015] px-[clamp(1rem,2vw,1.9rem)] pb-[clamp(1rem,2.2vh,1.6rem)] pt-[1.25rem]">
            <p className="absolute -top-6 left-0 text-[9.5px] font-light tracking-[0.32em] text-[#e2cfb6]/80">
              EAGLE IX OPERATING LOGIC
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-[clamp(0.9rem,1.6vw,1.8rem)]">
              {CORE.map((s) => (
                <StageBlock key={s.t} stage={s} accent />
              ))}
            </div>
          </div>
        </Reveal>

        {AFTER.map((s) => (
          <Reveal key={s.t} delay={320} className="lg:pt-[1.25rem]">
            <StageBlock stage={s} accent />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
