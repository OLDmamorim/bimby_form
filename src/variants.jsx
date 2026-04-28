// Variant B: Single-Page (WYSIWYG-ish) — one long flowing form.
// Variant C: Split — form on left, live PDF preview on right.

function SinglePageVariant({ data, setField }) {
  return (
    <div style={{
      maxWidth: 760,
      margin: "0 auto",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      padding: 32,
      fontFamily: "Inter, sans-serif",
    }}>
      <h2 style={{ color: "#2E9E60", margin: "0 0 4px", fontSize: 24 }}>Experiência Bimby®</h2>
      <p style={{ margin: "0 0 24px", color: "#666", fontSize: 13 }}>
        Preencha o formulário e exporte o PDF no fim. Os dados são guardados automaticamente.
      </p>

      {STEPS.map((s, i) => (
        <details key={s.id} open={i < 2} style={{
          marginBottom: 12,
          border: "1px solid #eef0ec",
          borderRadius: 10,
          overflow: "hidden",
        }}>
          <summary style={{
            padding: "14px 18px",
            background: "#f7f9f5",
            cursor: "pointer",
            fontWeight: 600,
            color: "#1f7a48",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            listStyle: "none",
          }}>
            <span>
              <span style={{
                display: "inline-block",
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#2E9E60",
                color: "#fff",
                textAlign: "center",
                lineHeight: "22px",
                fontSize: 11,
                marginRight: 10,
              }}>{i + 1}</span>
              {s.title}
            </span>
            <span style={{ fontSize: 11, color: "#888" }}>{s.subtitle}</span>
          </summary>
          <div style={{ padding: 20 }}>
            {s.render({ data, set: setField })}
          </div>
        </details>
      ))}

      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button
          onClick={() => {
            if (confirm("Limpar todos os dados?")) {
              localStorage.removeItem("bimby-form");
              location.reload();
            }
          }}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #cfd8d2",
            background: "#fff",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Limpar
        </button>
        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 22px",
            borderRadius: 8,
            border: "none",
            background: "#D9192C",
            color: "#fff",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          📄 Exportar PDF
        </button>
      </div>
    </div>
  );
}

function SplitVariant({ data, setField }) {
  const [step, setStep] = React.useState(0);
  const cur = STEPS[step];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20,
      maxWidth: 1400,
      margin: "0 auto",
      fontFamily: "Inter, sans-serif",
      alignItems: "start",
    }}>
      {/* Left: form */}
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        overflow: "hidden",
        position: "sticky",
        top: 20,
      }}>
        <div style={{ background: "#1f7a48", color: "#fff", padding: "16px 22px" }}>
          <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 1, textTransform: "uppercase" }}>Experiência Bimby®</div>
          <h2 style={{ margin: "4px 0 0", fontSize: 18 }}>{cur.title}</h2>
        </div>

        {/* Step pills */}
        <div style={{ display: "flex", gap: 4, padding: "12px 16px", borderBottom: "1px solid #eef0ec", flexWrap: "wrap" }}>
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid " + (i === step ? "#2E9E60" : "#eef0ec"),
                background: i === step ? "#2E9E60" : "#fff",
                color: i === step ? "#fff" : "#444",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {i + 1}. {s.title}
            </button>
          ))}
        </div>

        <div style={{ padding: 22, maxHeight: 600, overflowY: "auto" }}>
          {cur.render({ data, set: setField })}
        </div>

        <div style={{ padding: 14, borderTop: "1px solid #eef0ec", display: "flex", justifyContent: "space-between", background: "#fafbfa" }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            style={{ padding: "8px 14px", border: "1px solid #cfd8d2", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}
          >← Anterior</button>
          <button
            onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : window.print()}
            style={{ padding: "8px 14px", border: "none", borderRadius: 6, background: step < STEPS.length - 1 ? "#2E9E60" : "#D9192C", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
          >
            {step < STEPS.length - 1 ? "Seguinte →" : "📄 Exportar PDF"}
          </button>
        </div>
      </div>

      {/* Right: live PDF preview, scaled down */}
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Pré-visualização do PDF</div>
        <div style={{
          width: PDF_W * 0.62,
          height: PDF_H * 0.62,
          overflow: "hidden",
          borderRadius: 6,
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          background: "#fff",
        }}>
          <div style={{ transform: "scale(0.62)", transformOrigin: "top left", width: PDF_W, height: PDF_H }}>
            <PDFForm data={data} signatureDataUrl={data.assinatura} />
          </div>
        </div>
      </div>
    </div>
  );
}

window.SinglePageVariant = SinglePageVariant;
window.SplitVariant = SplitVariant;
