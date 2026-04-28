// Variant A: Wizard — multi-step with progress bar.
// Steps follow the structure of the paper form.

const STEPS = [
  {
    id: "tipo",
    title: "Tipo de Experiência",
    subtitle: "Que tipo de momento Bimby® está a registar?",
    render: ({ data, set }) => (
      <>
        <Field label="Tipo de experiência">
          <Pills options={FORM_SCHEMA.tipoExperiencia.options} value={data.tipoExperiencia} onChange={(v) => set("tipoExperiencia", v)} />
        </Field>
        <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Data">
            <TextInput type="date" value={data.dataISO} onChange={(v) => {
              set("dataISO", v);
              if (v) {
                const [y, m, d] = v.split("-");
                set("data", `${d}${m}${y}`);
              }
            }} />
          </Field>
          <Field label="Loja"><TextInput value={data.loja} onChange={(v) => set("loja", v)} placeholder="Ex.: Loja Bimby Lisboa" /></Field>
          <Field label="Agente"><TextInput value={data.agente} onChange={(v) => set("agente", v)} /></Field>
          <Field label="Nº"><TextInput value={data.numero} onChange={(v) => set("numero", v)} /></Field>
        </div>
        <Field label="Receitas"><TextInput value={data.receitas} onChange={(v) => set("receitas", v)} placeholder="Receitas demonstradas / preparadas" /></Field>
      </>
    ),
  },
  {
    id: "cliente",
    title: "Dados do Cliente",
    subtitle: "Para podermos contactar o cliente.",
    render: ({ data, set }) => (
      <>
        <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <Field label="Nome"><TextInput value={data.nome} onChange={(v) => set("nome", v)} /></Field>
          <Field label="Telefone"><TextInput value={data.tel} onChange={(v) => set("tel", v)} validate="phone" placeholder="9 dígitos" /></Field>
        </div>
        <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
          <Field label="Email"><TextInput value={data.email} onChange={(v) => set("email", v)} validate="email" type="email" /></Field>
          <Field label="Morada"><TextInput value={data.morada} onChange={(v) => set("morada", v)} /></Field>
        </div>
        <div className="resp-3col" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
          <Field label="Localidade"><TextInput value={data.localidade} onChange={(v) => set("localidade", v)} /></Field>
          <Field label="Cód. Postal"><TextInput value={data.codPostal} onChange={(v) => set("codPostal", v)} validate="postal" placeholder="0000-000" /></Field>
          <Field label="Nº pessoas em casa"><TextInput value={data.numPessoas} onChange={(v) => set("numPessoas", v)} type="number" /></Field>
        </div>
        <Field label="Profissão"><TextInput value={data.profissao} onChange={(v) => set("profissao", v)} /></Field>
        <Field label="Como são os seus horários?">
          <Pills options={FORM_SCHEMA.horarios.options} value={data.horarios} onChange={(v) => set("horarios", v)} />
        </Field>
        <Field label="Disponibilidade"><TextInput value={data.disponibilidade} onChange={(v) => set("disponibilidade", v)} placeholder="Ex.: Tardes durante a semana" /></Field>
      </>
    ),
  },
  {
    id: "cozinha",
    title: "Hábitos de Cozinha",
    subtitle: "Conhecer melhor o dia-a-dia do cliente na cozinha.",
    render: ({ data, set }) => (
      <>
        <Field label="O que sabe ou ouviu sobre a Bimby® até agora?"><TextArea value={data.qSabe} onChange={(v) => set("qSabe", v)} /></Field>
        <Field label="Quem cozinha, habitualmente?"><TextInput value={data.qQuemCozinha} onChange={(v) => set("qQuemCozinha", v)} /></Field>
        <Field label="Indique duas coisas que mais gosta e menos gosta na cozinha"><TextArea value={data.qGostaMenosGosta} onChange={(v) => set("qGostaMenosGosta", v)} /></Field>
        <Field label="Quanto tempo gasta em média a cozinhar por dia/semana?"><TextInput value={data.qTempoCozinhar} onChange={(v) => set("qTempoCozinhar", v)} /></Field>
        <Field label="Que refeições prepara em casa?">
          <Pills multi options={FORM_SCHEMA.refeicoes.options} value={data.refeicoes} onChange={(v) => set("refeicoes", v)} />
        </Field>
        <Field label="Que tipo de pratos cozinha com mais frequência?">
          <Pills multi options={FORM_SCHEMA.pratosFrequencia.options} value={data.pratosFrequencia} onChange={(v) => set("pratosFrequencia", v)} />
        </Field>
        <Field label="Que tipo de produtos compra habitualmente?">
          <Pills multi options={FORM_SCHEMA.produtosCompra.options} value={data.produtosCompra} onChange={(v) => set("produtosCompra", v)} />
        </Field>
      </>
    ),
  },
  {
    id: "estilo",
    title: "Estilo de Vida",
    subtitle: "O que é importante para o cliente no dia a dia.",
    render: ({ data, set }) => (
      <>
        <Field label="Se fosse fácil e rápido, quais destes produtos passaria a fazer em casa?"><TextArea value={data.qPassariaFazer} onChange={(v) => set("qPassariaFazer", v)} /></Field>
        <Field label="Gostaria de conhecer uma forma mais económica para preparar as suas refeições?">
          <Pills options={FORM_SCHEMA.conhecerEconomica.options} value={data.conhecerEconomica} onChange={(v) => set("conhecerEconomica", v)} />
        </Field>
        <Field label="O que mudaria na sua rotina se pudesse cozinhar de forma mais rápida e eficiente?"><TextArea value={data.qMudariaRotina} onChange={(v) => set("qMudariaRotina", v)} /></Field>
        <Field label="Quais destes aspetos fazem mais sentido com o seu estilo de vida?">
          <Pills multi options={FORM_SCHEMA.estiloVida.options} value={data.estiloVida} onChange={(v) => set("estiloVida", v)} />
        </Field>
        <Field label="O que mais lhe desperta curiosidade sobre como a Bimby® pode transformar a sua experiência na cozinha?"><TextArea value={data.qDespertaCuriosidade} onChange={(v) => set("qDespertaCuriosidade", v)} /></Field>
      </>
    ),
  },
  {
    id: "experiencia",
    title: "Experiência Bimby®",
    subtitle: "Reações e benefícios que o cliente identificou.",
    render: ({ data, set }) => (
      <>
        <Field label="Qual das 7 Maravilhas Bimby® fez mais sentido para si? (pode escolher várias)">
          <Pills multi options={FORM_SCHEMA.maravilhas.options} value={data.maravilhas} onChange={(v) => set("maravilhas", v)} />
        </Field>
        <Field label="O que mais gostou desta experiência?"><TextArea value={data.qGostouExperiencia} onChange={(v) => set("qGostouExperiencia", v)} /></Field>
        <Field label="Como é que a Bimby® transformaria o seu dia a dia?"><TextArea value={data.qTransformaria} onChange={(v) => set("qTransformaria", v)} /></Field>
        <Field label="Qual acredita ser o maior benefício de ter uma Bimby® em sua casa?"><TextArea value={data.qBeneficio} onChange={(v) => set("qBeneficio", v)} /></Field>
      </>
    ),
  },
  {
    id: "proximos",
    title: "Próximos passos",
    subtitle: "Como continuar a relação e quem mais convidar.",
    render: ({ data, set }) => (
      <>
        <Field label="Como gostaria de ter a sua Bimby®?">
          <Pills options={FORM_SCHEMA.comoTer.options} value={data.comoTer} onChange={(v) => set("comoTer", v)} />
        </Field>
        <Field label="Pessoas a quem gostaria de oferecer esta experiência Bimby®">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, marginBottom: 6 }}>
            <TextInput value={data.partilhar1Nome} onChange={(v) => set("partilhar1Nome", v)} placeholder="Nome 1" />
            <TextInput value={data.partilhar1Tel} onChange={(v) => set("partilhar1Tel", v)} placeholder="Telefone" validate="phone" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
            <TextInput value={data.partilhar2Nome} onChange={(v) => set("partilhar2Nome", v)} placeholder="Nome 2" />
            <TextInput value={data.partilhar2Tel} onChange={(v) => set("partilhar2Tel", v)} placeholder="Telefone" validate="phone" />
          </div>
        </Field>
        <Field label="Qual a próxima experiência Bimby® que gostaria de ter?">
          <Pills options={FORM_SCHEMA.proximaExp.options} value={data.proximaExp} onChange={(v) => set("proximaExp", v)} />
        </Field>
        <Field label="Conhece alguém que poderia trabalhar connosco?">
          <TextInput value={data.conheceNome} onChange={(v) => set("conheceNome", v)} placeholder="Nome" />
        </Field>
      </>
    ),
  },
  {
    id: "assinatura",
    title: "Confirmação",
    subtitle: "Assinatura digital do cliente para concluir.",
    render: ({ data, set }) => (
      <>
        <div style={{
          background: "#f7f9f5",
          border: "1px solid #cfd8d2",
          borderRadius: 8,
          padding: 14,
          fontSize: 12,
          lineHeight: 1.55,
          color: "#444",
          marginBottom: 14,
        }}>
          A Vorwerk Premium Lda garante a mais rigorosa confidencialidade dos dados pessoais recolhidos,
          ao abrigo do RGPD. Ao assinar, o cliente confirma o consentimento para o tratamento dos seus dados
          no âmbito da experiência Bimby®.
        </div>
        <Field label="Assinatura do cliente">
          <SignaturePad value={data.assinatura} onChange={(v) => set("assinatura", v)} width={420} height={120} />
        </Field>
      </>
    ),
  },
];

function WizardVariant({ data, setField }) {
  const [step, setStep] = React.useState(0);
  const total = STEPS.length;
  const cur = STEPS[step];
  const pct = ((step + 1) / total) * 100;

  return (
    <div style={{
      maxWidth: 720,
      margin: "0 auto",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Header band */}
      <div style={{
        background: "linear-gradient(135deg, #2E9E60, #1f7a48)",
        padding: "20px 28px",
        color: "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 1, textTransform: "uppercase" }}>
            Experiência Bimby®
          </div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            Passo {step + 1} de {total}
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{cur.title}</h2>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{cur.subtitle}</div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginTop: 14, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#fff", transition: "width 0.3s" }} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 28, maxHeight: 520, overflowY: "auto" }}>
        {cur.render({ data, set: setField })}
      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 28px",
        borderTop: "1px solid #eef0ec",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fafbfa",
      }}>
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #cfd8d2",
            background: "#fff",
            cursor: step === 0 ? "not-allowed" : "pointer",
            opacity: step === 0 ? 0.4 : 1,
            fontSize: 13,
            fontFamily: "Inter, sans-serif",
          }}
        >
          ← Anterior
        </button>
        {step < total - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              border: "none",
              background: "#2E9E60",
              color: "#fff",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Seguinte →
          </button>
        ) : (
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
              fontFamily: "Inter, sans-serif",
            }}
          >
            📄 Exportar PDF
          </button>
        )}
      </div>
    </div>
  );
}

window.WizardVariant = WizardVariant;
window.STEPS = STEPS;
