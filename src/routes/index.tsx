import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, Headphones, Lock, Phone } from "lucide-react";
import { useRef, useState } from "react";
import heroImg from "@/assets/eagle-hero.png";
import logoImg from "@/assets/eagle-logo.png";
import eagleMark from "@/assets/eagle-mark.png";
import founderPortrait from "@/assets/founder-portrait.png";
import section2Bg from "@/assets/section2-bg-v3.png.asset.json";
import section12Bg from "@/assets/section-12-background.png.asset.json";
import section10Bg from "@/assets/section-10-background.png.asset.json";
import continuousAdaptationBg from "@/assets/continuous-adaptation-bg.png.asset.json";
import { Reveal, SectionLabel } from "@/components/eagle/Reveal";
import { FloatingMenu } from "@/components/eagle/FloatingMenu";
import { NavigationLayerDiagram } from "@/components/eagle/NavigationLayerDiagram";
import { PathCore } from "@/components/eagle/PathCore";
import { OperatingComparison } from "@/components/eagle/OperatingComparison";
import {
  GlyphMesh,
  GlyphSecure,
  GlyphCompliance,
  GlyphGlobe,
  GlyphEvolution,
  GlyphTrace,
} from "@/components/eagle/SecurityGlyphs";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EAGLE IX — Infraestrutura de decisão para pagamentos" },
      {
        name: "description",
        content:
          "Camada de infraestrutura para roteamento, decisão e otimização de transações em tempo real.",
      },
      { property: "og:title", content: "EAGLE IX — Payment Infrastructure" },
      {
        property: "og:description",
        content: "Infraestrutura crítica para decisão e otimização de pagamentos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SecurityCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden bg-background ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 200px at ${pos.x}% ${pos.y}%, rgba(226,207,182,0.12) 0%, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(226,207,182,0.14)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Index() {
  const initialForm = {
    nome: "",
    empresa: "",
    cargo: "",
    email: "",
    telefone: "",
    volume: "",
    mensagem: "",
  };
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleField = (k: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    if (!form.nome.trim() || !form.empresa.trim() || !form.cargo.trim() || !form.email.trim() || !form.volume || !form.mensagem.trim()) {
      setErrorMsg("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("Informe um e-mail válido.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mbdbkoly", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nome: form.nome,
          Empresa: form.empresa,
          Cargo: form.cargo,
          "E-mail corporativo": form.email,
          Telefone: form.telefone,
          "Volume mensal de transações": form.volume,
          "Como podemos ajudar?": form.mensagem,
          _replyto: form.email,
          _from_name: form.nome,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setErrorMsg("Não foi possível enviar. Tente novamente.");
    }
  };

  return (
    <div className="bg-background text-foreground">
    <FloatingMenu />
    <section id="hero" className="eagle-depth relative flex eagle-screen flex-col overflow-hidden">
      {/* Hero background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})`, opacity: 0.7 }}
        aria-hidden
      />
      {/* architectural micro-grid */}
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      {/* Pulsing horizon glow */}
      <div
        className="eagle-breathe pointer-events-none absolute left-1/2 top-1/2 h-56 w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/25 to-background/85"
        aria-hidden
      />
      {/* signature hairline column — EAGLE grid behaviour */}
      <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent md:block" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent md:block" aria-hidden />

      {/* Nav */}
      <header className="relative z-10 flex flex-shrink-0 items-center justify-between px-2 pt-3 pb-4 md:px-4 md:pt-4">
        <img
          src={logoImg}
          alt="EAGLE IX Financial Systems"
          className="h-14 w-auto md:h-24 -ml-3 -mt-3 md:-ml-6 md:-mt-6"
          style={{ mixBlendMode: "lighten" }}
        />
        <nav className="flex items-center gap-8 pr-4 md:pr-8 -mt-4 md:-mt-12">
        </nav>
      </header>


      {/* Hero content */}
      <main className="relative z-10 grid flex-1 min-h-0 grid-cols-1 items-start px-6 pt-6 pb-10 md:grid-cols-[1fr_auto] md:px-12 md:pt-16">
        <div className="flex flex-col justify-start max-w-2xl">
          <Reveal>
            <p className="mb-7 text-[10px] font-light tracking-[0.35em] text-muted-foreground">
              THE NAVIGATION LAYER BEHIND EVERY CRITICAL TRANSACTION
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-3xl font-thin leading-[1.02] tracking-[-0.02em] text-foreground md:text-6xl lg:text-7xl">
              Beyond <span className="text-primary/90">Execution.</span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 max-w-md border-l border-foreground/15 pl-6">
              <p className="text-sm font-light leading-[1.85] text-muted-foreground md:text-[15px]">
                Durante décadas, a infraestrutura financeira operou sobre caminhos predefinidos.
              </p>
              <p className="mt-4 text-sm font-light leading-[1.85] text-muted-foreground md:text-[15px]">
                O amanhã começa pelo contexto operacional.
              </p>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <p className="mt-7 text-[10px] font-light tracking-[0.4em] text-muted-foreground md:text-xs">
              POWERED BY P.A.T.H
            </p>
          </Reveal>


          <Reveal delay={500} className="mt-9 flex flex-wrap items-center gap-6 md:gap-8">
            <button
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="eagle-btn group flex cursor-pointer items-center gap-4 px-6 py-3 text-[10px] font-light tracking-[0.35em] text-foreground"
            >
              <span className="relative z-10">FALAR COM ESPECIALISTA</span>
              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-700 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById('path')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative cursor-pointer pb-1 text-[10px] font-light tracking-[0.35em] text-foreground"
            >
              ENTENDER O P.A.T.H.
              <span className="absolute bottom-0 left-0 h-px w-full bg-foreground/30" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full" />
            </button>
          </Reveal>
        </div>

        {/* Right live metrics */}
        <aside className="hidden flex-col justify-start pt-4 md:pt-4 gap-9 pl-10 text-right md:flex">
          {[
            { l: "TPS", v: "48.230" },
            { l: "LATÊNCIA", v: "17MS" },
            { l: "UPTIME", v: "99.999%" },
            { l: "MALHA", v: "12 REGIÕES" },
          ].map((m, i) => (
            <Reveal key={m.l} delay={600 + i * 120} className="space-y-2">
              <div className="text-[10px] font-light tracking-[0.35em] text-muted-foreground">
                {m.l}
              </div>
              <div className="text-sm font-light tracking-[0.15em] text-foreground tabular-nums">
                {m.v}
              </div>
              <div className="ml-auto h-px w-8 bg-foreground/30" />
            </Reveal>
          ))}
        </aside>
      </main>

      {/* Footer trust strip */}
      <footer className="relative z-10 flex-shrink-0 border-t border-border/40 px-6 py-4 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[10px] font-light tracking-[0.3em] text-muted-foreground">
            <span>PCI-DSS LEVEL 1</span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="hidden md:inline">ISO 27001</span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="hidden md:inline">LGPD COMPLIANT</span>
          </div>
          <div className="text-[10px] font-light tracking-[0.3em] text-muted-foreground">
            EAGLE IX · FINANCIAL SYSTEMS · MMXXVI
          </div>
        </div>
      </footer>
    </section>

    {/* ===================== P.A.T.H. ARCHITECTURE SECTION ===================== */}
    <section id="arquitetura" className="relative flex eagle-screen items-center overflow-hidden border-t border-foreground/10 px-6 py-12 md:py-0 md:pl-16 md:pr-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-right"
        style={{ backgroundImage: `url(${section2Bg.url})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" aria-hidden />
      <Reveal className="relative z-10 w-full max-w-3xl">
        <div className="mb-8 h-px w-12 bg-[#e2cfb6]/60" />
        <h2 className="text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
          Durante décadas, a infraestrutura financeira dependeu de caminhos predefinidos.
        </h2>

        <div className="mt-9 h-px w-12 bg-foreground/20" />

        <p className="mt-8 text-lg font-thin leading-[1.5] text-muted-foreground md:mt-10 md:text-2xl">
          Amanhã, a execução financeira começará pelo contexto operacional.
        </p>
      </Reveal>
    </section>

    {/* ===================== SECTION 3: EXECUTION CONTEXT — asymmetric split ===================== */}
    <section id="camadas" className="relative flex eagle-screen flex-col overflow-hidden border-t border-foreground/10 px-6 py-12 md:px-12 md:py-0">
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1200px] flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="max-w-md">
          <SectionLabel>EXECUTION CONTEXT</SectionLabel>
          <h2 className="mt-8 text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
            Toda transação tem um destino.
          </h2>
          <p className="mt-6 text-lg font-light leading-[1.6] text-foreground md:text-2xl">
            Nenhuma execução financeira deveria nascer determinada.
          </p>
          <div className="mt-9 h-px w-12 bg-foreground/25" />
          <p className="mt-6 text-sm font-light leading-[1.85] text-muted-foreground md:text-[15px]">
            Porque cada contexto operacional exige sua própria estratégia de execução.
          </p>
        </Reveal>

        <div className="md:border-l md:border-foreground/10 md:pl-14">
          {[
            "Durante décadas, acreditamos que toda execução poderia seguir o mesmo caminho. Hoje sabemos que não.",
            "Liquidez muda. Infraestrutura muda. Instituições evoluem.",
            "Condições operacionais mudam continuamente.",
            "Mas a maior parte da infraestrutura continua respondendo da mesma forma.",
            "Cada execução acontece em um contexto diferente. Cada contexto exige um caminho diferente.",
          ].map((text, i) => (
            <Reveal key={text} delay={i * 110} className="flex items-center gap-6 border-b border-foreground/10 py-4 last:border-b-0">
              <span className="w-8 flex-shrink-0 text-[10px] font-light leading-relaxed tracking-[0.3em] tabular-nums text-muted-foreground/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[46ch] text-sm font-light leading-[1.85] text-muted-foreground md:text-[15px]">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ===================== SECTION 4: NAVIGATION LAYER — proprietary diagram, half screen ===================== */}
    <section id="navigation-layer" className="relative flex eagle-screen flex-col overflow-hidden border-t border-foreground/10 px-6 py-12 md:px-12 md:py-0">
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:gap-24">
        {/* Minimal text */}
        <Reveal className="max-w-[26rem]">
          <SectionLabel>NAVIGATION LAYER</SectionLabel>
          <h2 className="mt-8 text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
            The first Navigation Layer for Financial Execution.
          </h2>
          <div className="mt-9 h-px w-12 bg-foreground/25" />
          <p className="mt-7 max-w-[24rem] text-sm font-light leading-[1.85] text-muted-foreground md:text-[15px]">
            Entre a intenção do pagamento e o destino existe um espaço que nunca pertenceu a ninguém.
            <span className="text-foreground"> É nesse espaço que a EAGLE IX opera.</span>
          </p>
        </Reveal>

        {/* Proprietary layer diagram */}
        <Reveal delay={180} className="w-full">
          <NavigationLayerDiagram />
        </Reveal>
      </div>
    </section>

    {/* ===================== SECTION 5: P.A.T.H. — vertical timeline ===================== */}
    <section id="path" className="relative flex eagle-screen flex-col overflow-hidden border-t border-foreground/10 px-6 py-12 md:px-12 md:py-0">
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:gap-24">
        <Reveal className="max-w-[26rem]">
          <SectionLabel>P.A.T.H.</SectionLabel>
          <h2 className="mt-8 text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
            The proprietary technology powering the Navigation Layer.
          </h2>
          <p className="mt-7 max-w-[24rem] text-sm font-light leading-[1.85] text-muted-foreground md:text-[15px]">
            Toda categoria nasce sobre uma tecnologia fundamental. Na EAGLE IX, essa tecnologia é o P.A.T.H.
          </p>
          <p className="mt-4 max-w-[24rem] text-sm font-light leading-[1.85] text-muted-foreground md:text-[15px]">
            O P.A.T.H. não escolhe rotas. Antes que qualquer execução aconteça, ele constrói uma compreensão completa do
            contexto operacional da transação.
          </p>
          <div className="mt-9 h-px w-12 bg-foreground/25" />
          <p className="mt-6 text-lg font-light leading-[1.6] text-foreground md:text-2xl">
            O capital se move. <span className="text-foreground">O P.A.T.H. determina como.</span>
          </p>
        </Reveal>

        {/* Cognitive process visualization */}
        <Reveal delay={180} className="w-full">
          <PathCore />
        </Reveal>
      </div>
    </section>

    {/* ===================== SECTION 6: CONTEXTUAL EXECUTION — minimal statement ===================== */}
    <section id="contextual" className="relative flex eagle-screen flex-col items-center justify-center overflow-hidden border-t border-foreground/10 px-6 py-16 text-center md:px-12 md:py-0">
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <Reveal className="relative mx-auto w-full max-w-4xl">
        <span className="text-[10px] font-light tracking-[0.45em] text-[#e2cfb6]">CONTEXTUAL EXECUTION</span>
        <h2 className="mt-8 text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
          How EAGLE IX operates.
        </h2>
        <div className="mx-auto mt-9 h-px w-12 bg-foreground/25" />

        <div className="mt-12 space-y-6">
          <p className="text-lg font-light leading-relaxed text-muted-foreground md:text-2xl">
            Em vez de executar regras estáticas...
          </p>
          <p className="text-lg font-light leading-relaxed text-muted-foreground md:text-2xl">
            A EAGLE IX <span className="text-foreground">interpreta continuamente o contexto.</span>
          </p>
          <p className="text-lg font-light leading-relaxed text-muted-foreground md:text-2xl">
            <span className="text-foreground">Determina o melhor caminho.</span>
          </p>
          <p className="text-lg font-light leading-relaxed text-muted-foreground md:text-2xl">
            Orienta <span className="text-foreground">cada execução até sua conclusão.</span>
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-light tracking-[0.32em] text-muted-foreground">
          <span>NÃO É ROTEAMENTO</span>
          <span className="h-px w-6 bg-foreground/20" />
          <span>NÃO É AUTOMAÇÃO</span>
          <span className="h-px w-6 bg-foreground/20" />
          <span className="text-foreground/90">É UMA NOVA FORMA DE EXECUTAR INFRAESTRUTURA FINANCEIRA</span>
        </div>
      </Reveal>
    </section>

    {/* ===================== SECTION 6.5: SEGURANÇA OPERACIONAL ===================== */}
    <section
      id="seguranca"
      className="relative flex eagle-screen flex-col overflow-hidden border-t border-foreground/10 px-6 md:px-12"
    >
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center md:py-4">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel>SEGURANÇA OPERACIONAL</SectionLabel>
            <h2 className="mt-8 max-w-3xl text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
              Projetada para ambientes onde a confiança é inegociável.
            </h2>
            <p className="mt-7 max-w-2xl text-sm font-light leading-[1.7] text-muted-foreground md:text-[15px]">
              A EAGLE IX combina arquitetura resiliente, rigor regulatório e tecnologia de classe mundial para garantir
              que cada execução aconteça com segurança, continuidade e integridade operacional.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-foreground/10 bg-foreground/10 sm:grid-cols-2 md:mt-14 md:grid-cols-3">
          {[
            {
              Icon: GlyphMesh,
              t: "Arquitetura Resiliente",
              d: "Alta disponibilidade e continuidade operacional.",
            },
            {
              Icon: GlyphSecure,
              t: "Segurança por Design",
              d: "Proteção incorporada desde a concepção.",
            },
            {
              Icon: GlyphCompliance,
              t: "Conformidade Regulatória",
              d: "Alinhado aos requisitos do ecossistema financeiro.",
            },
            {
              Icon: GlyphGlobe,
              t: "Infraestrutura Global",
              d: "Parceiros de tecnologia e infraestrutura de ponta.",
            },
            {
              Icon: GlyphEvolution,
              t: "Evolução Contínua",
              d: "Atualização permanente frente às melhores práticas.",
            },
            {
              Icon: GlyphTrace,
              t: "Governança e Rastreabilidade",
              d: "Observabilidade e integridade em todas as etapas.",
            },
          ].map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 90} className="flex flex-col">
              <SecurityCard className="flex flex-col p-4 md:min-h-0 md:p-5">
                <Icon />
                <div className="mt-3 md:mt-4">
                  <h3 className="text-sm font-light tracking-[0.02em] text-foreground md:text-[15px]">{t}</h3>
                  <p className="mt-1.5 text-sm font-light leading-[1.7] text-muted-foreground md:text-[15px]">{d}</p>
                </div>
              </SecurityCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ===================== SECTION 7: CONTINUOUS ADAPTATION — editorial statement ===================== */}
    <section
      id="adaptation"
      className="relative flex eagle-screen items-center justify-center overflow-hidden border-t border-foreground/10 px-6 md:px-12"
    >
      <img
        src={continuousAdaptationBg.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        style={{ opacity: 0.6 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/70" aria-hidden />
      <div className="relative flex flex-col items-center justify-center text-center">
        <span className="mb-8 h-px w-16 bg-[#e2cfb6]/25" />
        <h2 className="max-w-[14ch] text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
          Continuous adaptation throughout every financial execution.
        </h2>
        <span className="mt-8 h-px w-16 bg-foreground/15" />
      </div>
    </section>

    {/* ===================== SECTION 8: OPERATING LOGIC — dense comparison ===================== */}
    <section id="compreende" className="relative flex eagle-screen flex-col overflow-hidden border-t border-foreground/10 px-6 py-12 md:px-12 md:py-0">
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-[1100px] flex-1 flex-col justify-center">
        <Reveal>
        <SectionLabel>OPERATING LOGIC</SectionLabel>
        <h2 className="mt-8 max-w-3xl text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
          Infraestrutura que compreende o contexto antes de executar uma transação.
        </h2>
        <p className="mt-7 max-w-xl text-sm font-light leading-[1.75] text-muted-foreground md:text-[15px]">
          A limitação não está na execução.{" "}
          <span className="text-foreground">Está na decisão antes da execução.</span>
        </p>
        </Reveal>

        {/* Architectural narrative — one continuous reading path */}
        <div className="mt-[clamp(2.4rem,6vh,4.4rem)]">
          <OperatingComparison />
        </div>

        <Reveal className="mx-auto mt-[clamp(1.4rem,3.4vh,2.4rem)] max-w-2xl text-center">
          <p className="text-sm font-light leading-[1.7] text-muted-foreground md:text-[15px]">
            Porque infraestrutura não deveria apenas processar.
          </p>
          <p className="mt-1.5 text-sm font-light leading-[1.7] text-foreground md:text-[15px]">
            Ela deveria compreender. Depois determinar.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ===================== SECTION 9: EVERY EXECUTION — monumental statement ===================== */}
    <section id="execucao" className="relative flex eagle-screen flex-col justify-center overflow-hidden border-t border-foreground/10 px-6 py-16 md:px-12 md:py-0">
      <img
        src={section10Bg.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.3] object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/80" aria-hidden />
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />


      {/* editorial plate: the composition itself carries the reading order */}
      <div className="relative mx-auto w-full max-w-[1100px] md:pl-[9%] md:pr-[3%]">
        <Reveal>
          <SectionLabel>EVERY EXECUTION</SectionLabel>
          <h2 className="mt-8 max-w-3xl text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
            Toda execução financeira
            <br />
            começa diferente.
          </h2>
        </Reveal>

        {/* structural rule — part of the grid, not an ornament */}
        <div className="relative mt-[clamp(3rem,10vh,7rem)] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* the turn: node, descent and bridge into the right column */}
          <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
            <span className="absolute left-[calc(50%-1.5rem)] top-0 h-[3.5rem] w-px bg-foreground/20" />
            <span className="absolute left-[calc(50%-1.5rem)] top-[3.5rem] h-px w-12 bg-foreground/20" />
            <span className="absolute left-[calc(50%-1.5rem)] top-0 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 bg-foreground/60" />
          </div>

          <Reveal className="border-t border-foreground/10 pt-6">
            <span className="block text-sm font-light leading-[1.9] text-muted-foreground md:text-[15px]">
              Instituições diferentes. Liquidez diferente. Restrições diferentes. Rotas de execução diferentes.
              Infraestruturas tradicionais assumem — o P.A.T.H. compreende.
            </span>
          </Reveal>

          <Reveal delay={160} className="border-t border-foreground/10 pt-6 md:mt-[3.5rem]">
            <span className="block text-sm font-light leading-[1.9] text-foreground md:text-[15px]">
              A Execution Logic determina. A Continuous Adaptation acompanha. O capital chega ao destino.
            </span>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ===================== SECTION 10: ORIGIN — editorial founder ===================== */}
    <section id="fundador" className="relative flex eagle-screen flex-col overflow-hidden border-t border-foreground/10 px-6 py-12 md:px-12 md:py-0">
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1200px] flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[340px_1fr] md:gap-14 lg:gap-20">

        <Reveal className="w-full max-w-[420px] lg:max-w-none">
          <div className="eagle-ticks eagle-portrait-live relative overflow-hidden border border-foreground/10 grayscale-[35%]">
            <img
              src={founderPortrait}
              alt="Daniel Ribeiro, fundador e CEO da EAGLE IX"
              className="h-full w-full max-h-[46vh] object-cover object-[50%_25%]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
          <div className="mt-5 flex items-baseline justify-between border-t border-foreground/10 pt-4">
            <p className="text-[15px] font-light tracking-wide text-foreground">Daniel Ribeiro</p>
            <p className="text-[10px] font-light tracking-[0.35em] text-muted-foreground">FOUNDER &amp; CEO</p>
          </div>
        </Reveal>

        <Reveal delay={160} className="lg:pl-4">
          <SectionLabel>ORIGIN</SectionLabel>
          <h2 className="mt-8 text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
            Construída a partir de uma convicção.
          </h2>

          <div className="mt-8 space-y-4 lg:text-justify">
            <p className="text-sm font-light leading-[1.9] text-muted-foreground md:text-[15px]">
              Antes da EAGLE IX existir como tecnologia, ela existia como uma ideia. A de que a infraestrutura financeira
              não deveria continuar executando caminhos predefinidos. Ela deveria compreender o contexto operacional antes de agir.
            </p>
            <p className="text-sm font-light leading-[1.9] text-muted-foreground md:text-[15px]">
              Após anos projetando infraestruturas para ecossistemas complexos de pagamentos, Daniel Ribeiro chegou a uma
              conclusão. O maior limite da indústria nunca foi velocidade. Foi a execução financeira estática.
            </p>
          </div>

          <ol className="mt-9 space-y-4 border-l border-foreground/10 pl-7">
            {[
              "Dessa convicção nasceu o P.A.T.H.",
              "O P.A.T.H. tornou possível a Contextual Execution.",
              "A Contextual Execution tornou possível a primeira Navigation Layer para Execução Financeira.",
            ].map((t, i) => (
              <li key={t} className="flex items-center gap-5">
                <span className="text-[10px] font-light tabular-nums text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm font-light leading-[1.9] text-muted-foreground md:text-[15px]">{t}</p>
              </li>
            ))}
          </ol>

          <p className="mt-9 text-sm font-light text-foreground md:text-[15px]">Essa é a EAGLE IX.</p>
        </Reveal>
      </div>
    </section>

    {/* ===================== SECTION 11: THE FUTURE — editorial manifesto ===================== */}
    <section id="futuro" className="relative flex eagle-screen flex-col overflow-hidden border-t border-foreground/10 px-6 md:px-12">
      <img
        src={section12Bg.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/70" aria-hidden />
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="eagle-breathe pointer-events-none absolute left-1/2 top-1/2 h-64 w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.06] blur-[130px]" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-center">
        <Reveal>
          <SectionLabel>BEYOND EXECUTION</SectionLabel>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="mt-8 text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:text-4xl lg:text-[2.6rem]">
            The future belongs to Contextual Execution.
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-10 max-w-[52ch] text-sm font-light leading-[1.9] text-muted-foreground md:mt-14 md:text-[15px]">
            Durante décadas, a infraestrutura financeira concentrou seus esforços em mover capital cada vez mais rápido.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <p className="mt-12 max-w-[52ch] text-sm font-light leading-[1.9] text-foreground md:mt-16 md:text-[15px]">
            A próxima geração será definida por quem conseguir compreender o contexto da transação antes da execução. Determinar
            continuamente como cada execução acontece. Adaptar cada decisão à realidade operacional.
          </p>
        </Reveal>

        <Reveal delay={480}>
          <div className="mt-14 max-w-[36ch] md:mt-20">
            <p className="text-lg font-light tracking-tight text-foreground md:text-2xl">Beyond Execution.</p>
            <p className="mt-5 text-lg font-light leading-[1.6] text-muted-foreground md:text-2xl">
              O capital se move. <span className="text-[#e2cfb6]">O P.A.T.H. determina como.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ===================== SECTION 12: VAMOS CONVERSAR ===================== */}
    <section id="contato" className="relative flex eagle-screen flex-col overflow-hidden border-t border-foreground/10 px-6 pt-3 pb-3 md:px-12 md:pt-4 md:pb-5">
      <div className="eagle-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        {/* Section header */}
        <div className="mb-4 flex items-center gap-5">
          <span className="text-[10px] font-light tracking-[0.4em] text-muted-foreground">VAMOS CONVERSAR</span>
          <span className="h-px w-20 bg-foreground/15" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-start gap-[clamp(0.75rem,2.5vh,1.5rem)] pt-[clamp(0.25rem,2vh,2rem)]">
          {/* Heading */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-thin leading-[1.18] tracking-[-0.015em] text-foreground md:whitespace-nowrap md:text-4xl lg:text-[2.6rem]">
              Escale sem comprometer a <span className="italic text-foreground">execução.</span>
            </h2>
            <div className="mt-5 h-px w-12 bg-foreground/25" />
          </div>

          {/* Form */}
          <div className="w-full max-w-[56rem]">
            <div className="eagle-surface eagle-ticks p-[clamp(0.75rem,2vh,1.5rem)] backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-4">
                <h3 className="text-[12px] font-light tracking-[0.35em] text-foreground">FALE COM UM ESPECIALISTA</h3>
                <span className="h-px flex-1 bg-foreground/15" />
              </div>
              <p className="mb-6 text-sm font-light leading-relaxed tracking-wide text-muted-foreground md:text-[15px]">
                Preencha o formulário e um especialista da Eagle IX entra em contato em até 1 dia útil.
              </p>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-3 border border-foreground/15 bg-background/60 px-6 py-10 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/30">
                    <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-[12px] font-light tracking-[0.25em] text-foreground">MENSAGEM ENVIADA</h4>
                  <p className="max-w-sm text-sm font-light leading-relaxed text-muted-foreground md:text-[15px]">
                    Recebemos sua solicitação. Um especialista da Eagle IX entrará em contato em até 1 dia útil.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { k: "nome", ph: "Nome", required: true },
                    { k: "empresa", ph: "Empresa", required: true },
                    { k: "cargo", ph: "Cargo", required: true },
                    { k: "email", ph: "E-mail corporativo", type: "email", required: true },
                    { k: "telefone", ph: "Telefone (opcional)" },
                  ].map((f) => (
                    <input
                      key={f.k}
                      name={f.k === "email" ? "email" : f.k}
                      type={f.type ?? "text"}
                      placeholder={f.ph}
                      value={form[f.k as keyof typeof initialForm]}
                      onChange={handleField(f.k as keyof typeof initialForm)}
                      required={f.required}
                      className="eagle-input px-4 py-[clamp(0.5rem,1.1vh,0.75rem)] text-[15px] font-light text-foreground placeholder:text-muted-foreground/70"
                    />
                  ))}
                  <select
                    className="eagle-input px-4 py-[clamp(0.5rem,1.1vh,0.75rem)] text-[15px] font-light text-muted-foreground"
                    value={form.volume}
                    onChange={handleField("volume")}
                    required
                  >
                    <option value="" disabled>Volume mensal de transações (faixa)</option>
                    <option>Até R$ 1M</option>
                    <option>R$ 1M – R$ 10M</option>
                    <option>R$ 10M – R$ 100M</option>
                    <option>Acima de R$ 100M</option>
                  </select>
                  <textarea
                    placeholder="Como podemos ajudar?"
                    rows={2}
                    value={form.mensagem}
                    onChange={handleField("mensagem")}
                    required
                    className="eagle-input resize-none px-4 py-[clamp(0.5rem,1.1vh,0.75rem)] text-[15px] font-light text-foreground placeholder:text-muted-foreground/70 sm:col-span-2"
                  />
                  {errorMsg && (
                    <p className="sm:col-span-2 text-[12px] font-light text-red-400/90">{errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="eagle-btn eagle-btn-live group mt-2 flex items-center justify-center gap-4 bg-[#e2cfb6] px-6 py-4 text-[12px] font-light tracking-[0.35em] text-background disabled:opacity-60 sm:col-span-2"
                  >
                    <span className="relative z-10">{status === "loading" ? "ENVIANDO..." : "ENVIAR"}</span>
                    <ArrowRight className="relative z-10 h-4 w-4" />
                  </button>
                  <div className="sm:col-span-2 flex items-center gap-2 text-[10px] font-light text-muted-foreground">
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                    <span>Ao enviar, você concorda com a nossa <a className="text-foreground underline-offset-2 hover:underline" href="#">Política de Privacidade</a>.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom — channels */}
        <div className="mt-[clamp(0.5rem,1.5vh,1.5rem)] border-t border-foreground/10 pt-[clamp(0.5rem,1.2vh,1rem)]">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <h3 className="text-[10px] font-light tracking-[0.3em] text-muted-foreground">CANAIS DIRETOS</h3>
              <span className="h-px flex-1 bg-foreground/10" />
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { Icon: Mail, t: "Comercial", d: "contato@eagleix.com.br" },
                { Icon: Phone, t: "Comercial", d: "+55 11 99409-3407" },
                { Icon: Headphones, t: "Suporte de clientes", d: "24/7 via portal autenticado" },
              ].map(({ Icon, t, d }) => (
                <div key={`${t}-${d}`} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.2} />
                  <div>
                    <h4 className="text-[10px] font-light text-foreground">{t}</h4>
                    <p className="text-[10px] font-light text-muted-foreground">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
