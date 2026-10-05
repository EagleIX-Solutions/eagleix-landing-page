import { useCallback, useEffect, useState } from "react";

const ITEMS: { label: string; id: string }[] = [
  { label: "Home", id: "hero" },
  { label: "Context", id: "camadas" },
  { label: "Navigation Layer", id: "navigation-layer" },
  { label: "P.A.T.H.", id: "path" },
  { label: "Decision", id: "compreende" },
  { label: "Execution", id: "execucao" },
  { label: "Trust and Security", id: "seguranca" },
  { label: "Origin", id: "fundador" },
  { label: "Contact", id: "contato" },
];

export function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = ITEMS[0].id;
      for (const item of ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-6 top-6 z-[70] flex h-8 w-9 flex-col items-end justify-center gap-[7px] opacity-70 transition-opacity duration-500 hover:opacity-100 md:right-10 md:top-8"
      >
        <span className="block h-px w-9 bg-foreground/80" />
        <span className="block h-px w-9 bg-foreground/80" />
        <span className="block h-px w-9 bg-foreground/80" />
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <nav
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-6 top-[4.25rem] w-[15rem] border border-[#e2cfb6]/15 bg-[#050504]/95 px-6 py-5 backdrop-blur-sm transition-all duration-300 md:right-10 md:top-[5.25rem] ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <div className="flex flex-col items-start gap-3.5">
            {ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={`text-left text-[0.9rem] font-thin leading-none tracking-[0.01em] transition-opacity duration-300 ${
                  active === item.id
                    ? "text-[#e2cfb6] opacity-100"
                    : "text-foreground opacity-40 hover:opacity-75"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
