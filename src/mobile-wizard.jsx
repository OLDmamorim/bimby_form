// MobileWizard — full-screen card-by-card experience for phones.
// Each step takes the entire viewport. Sticky top bar (exit + progress + step counter)
// and sticky bottom bar (Anterior / Seguinte / Exportar PDF on last step).

function MobileWizard({ data, setField, onExit, onExport }) {
  const steps = window.STEPS || [];
  const [step, setStep] = React.useState(() => {
    const s = parseInt(localStorage.getItem("bimby-mobile-step") || "0", 10);
    return Math.min(Math.max(0, s), steps.length - 1);
  });
  const total = steps.length;
  const cur = steps[step];
  const pct = ((step + 1) / total) * 100;
  const isLast = step === total - 1;

  React.useEffect(() => {
    localStorage.setItem("bimby-mobile-step", String(step));
    // scroll body to top on step change
    const body = document.querySelector(".mw-body");
    if (body) body.scrollTop = 0;
  }, [step]);

  // Lock body scroll while in mobile wizard
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const next = () => setStep((s) => Math.min(total - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const confirmExit = () => {
    if (confirm("Sair do formulário? Os dados ficam guardados.")) onExit && onExit();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000,
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        background: "linear-gradient(135deg, #2E9E60, #1f7a48)",
        color: "#fff",
        padding: "14px 16px 12px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <button
            onClick={confirmExit}
            aria-label="Sair"
            style={{
              width: 40, height: 40, borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.12)",
              color: "#fff", fontSize: 20, cursor: "pointer", lineHeight: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >×</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, opacity: 0.85, letterSpacing: 1, textTransform: "uppercase" }}>
              Experiência Bimby®
            </div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>
              Passo {step + 1} de {total}
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm("Limpar todos os dados deste formulário?")) {
                localStorage.removeItem("bimby-form-v1");
                localStorage.removeItem("bimby-mobile-step");
                location.reload();
              }
            }}
            style={{
              padding: "8px 12px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.12)",
              color: "#fff", fontSize: 11, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >Limpar</button>
        </div>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>{cur.title}</h2>
        <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>{cur.subtitle}</div>
        <div style={{
          height: 4, background: "rgba(255,255,255,0.25)",
          borderRadius: 2, marginTop: 12, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${pct}%`, background: "#fff",
            transition: "width 0.3s ease",
          }} />
        </div>
      </div>

      {/* Step dots (small visual cue) */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 6,
        padding: "10px 16px", flexShrink: 0,
        background: "#fafbfa", borderBottom: "1px solid #eef0ec",
      }}>
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            aria-label={`Ir para passo ${i + 1}: ${s.title}`}
            style={{
              width: i === step ? 22 : 8, height: 8,
              borderRadius: 4, border: "none",
              background: i === step ? "#2E9E60" : (i < step ? "#9bc7ad" : "#dde3df"),
              cursor: "pointer",
              padding: 0,
              transition: "all 0.25s",
            }}
          />
        ))}
      </div>

      {/* Body — scrollable */}
      <div className="mw-body" style={{
        flex: 1, overflowY: "auto",
        padding: "20px 16px 24px",
        WebkitOverflowScrolling: "touch",
      }}>
        <div className="mw-step-content">
          {cur.render({ data, set: setField })}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        flexShrink: 0,
        padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
        borderTop: "1px solid #eef0ec",
        background: "#fff",
        display: "flex",
        gap: 10,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.04)",
      }}>
        <button
          onClick={prev}
          disabled={step === 0}
          style={{
            flex: "0 0 auto",
            padding: "14px 18px",
            borderRadius: 10,
            border: "1px solid #cfd8d2",
            background: "#fff",
            color: "#1f7a48",
            fontSize: 14,
            fontWeight: 600,
            cursor: step === 0 ? "not-allowed" : "pointer",
            opacity: step === 0 ? 0.35 : 1,
            fontFamily: "inherit",
            minHeight: 48,
          }}
        >← Anterior</button>
        {!isLast ? (
          <button
            onClick={next}
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: 10,
              border: "none",
              background: "#2E9E60",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              minHeight: 48,
            }}
          >Seguinte →</button>
        ) : (
          <button
            onClick={onExport}
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: 10,
              border: "none",
              background: "#D9192C",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              minHeight: 48,
            }}
          >📄 Exportar PDF</button>
        )}
      </div>

      <style>{`
        .mw-step-content > * + * { margin-top: 18px; }
        .mw-step-content .resp-2col,
        .mw-step-content .resp-3col {
          grid-template-columns: 1fr !important;
          gap: 14px !important;
        }
        .mw-step-content input,
        .mw-step-content textarea,
        .mw-step-content select {
          font-size: 16px !important; /* prevents iOS zoom */
          padding: 12px 14px !important;
          min-height: 48px;
        }
        .mw-step-content textarea { min-height: 96px; }
        .mw-step-content label { font-size: 14px; }
      `}</style>
    </div>
  );
}

window.MobileWizard = MobileWizard;
