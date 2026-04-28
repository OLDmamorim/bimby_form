// PDFForm — pixel-perfect replica of the source paper form, A4 portrait.
// Tuned to fit ALL content within 794×1123 (96dpi A4) without overflow.

const PDF_W = 794;
const PDF_H = 1123;

function UL({ value, width = 100, dotted = false, style = {} }) {
  return (
    <span
      style={{
        display: "inline-block",
        width,
        borderBottom: `1px ${dotted ? "dotted" : "solid"} ${BIMBY_INK}`,
        minHeight: 12,
        padding: "0 2px",
        fontSize: 9.5,
        lineHeight: "12px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        verticalAlign: "baseline",
        color: BIMBY_INK,
        ...style,
      }}
    >
      {value || "\u00A0"}
    </span>
  );
}

function CharBox({ ch }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 11,
        height: 13,
        border: `0.8px solid ${BIMBY_INK}`,
        textAlign: "center",
        fontSize: 9,
        lineHeight: "12px",
        marginRight: 1,
      }}
    >
      {ch || "\u00A0"}
    </span>
  );
}

function CharBoxRow({ value = "", length, separators = {} }) {
  const chars = (value || "").padEnd(length, " ").slice(0, length).split("");
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {chars.map((c, i) => (
        <React.Fragment key={i}>
          <CharBox ch={c.trim() ? c : ""} />
          {separators[i] && <span style={{ margin: "0 1px", fontSize: 9 }}>{separators[i]}</span>}
        </React.Fragment>
      ))}
    </span>
  );
}

function Radio({ checked }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        border: `1.1px solid ${BIMBY_GREEN}`,
        background: checked ? BIMBY_GREEN : "transparent",
        marginRight: 3,
        flexShrink: 0,
        verticalAlign: "middle",
      }}
    />
  );
}

function Opt({ checked, label, accent = false }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", marginRight: 8, fontSize: 9, color: BIMBY_INK, lineHeight: 1.3 }}>
      <Radio checked={checked} />
      <span style={{ color: accent ? VORWERK_RED : BIMBY_INK }}>{label}</span>
    </span>
  );
}

// Question with green label + underlined answer rows
function Q({ label, value, lines = 1 }) {
  const valLines = String(value || "").split("\n");
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 1, lineHeight: 1.2 }}>
        {label}
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            borderBottom: `0.8px solid ${BIMBY_INK}`,
            minHeight: 12,
            fontSize: 9,
            color: BIMBY_INK,
            lineHeight: "12px",
            padding: "0 2px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {valLines[i] || "\u00A0"}
        </div>
      ))}
    </div>
  );
}

function Lbl({ children }) {
  return <span style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9 }}>{children}</span>;
}

function PhotoHeader({ imageUrl }) {
  return (
    <div
      style={{
        position: "relative",
        height: 130,
        background: imageUrl
          ? `url(${imageUrl}) center/cover`
          : `linear-gradient(135deg, #c4ddd0 0%, #8fb89e 50%, #6b8e7a 100%)`,
        overflow: "hidden",
      }}
    >
      {!imageUrl && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.45)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
        }}>
          [ Foto: Bimby® em ambiente de cozinha ]
        </div>
      )}
      {/* White rounded curve overlapping the bottom */}
      <div style={{
        position: "absolute",
        left: -40, right: -40, bottom: -30,
        height: 60,
        background: "#fff",
        borderTopLeftRadius: "50% 100%",
        borderTopRightRadius: "50% 100%",
      }} />
    </div>
  );
}

function PDFForm({ data = {}, signatureDataUrl = "", imageUrl = "assets/header-photo.jpg" }) {
  const v = (k) => data[k] || "";
  const isOn = (group, id) => Array.isArray(data[group]) ? data[group].includes(id) : data[group] === id;

  const dateStr = (v("data") || "").replace(/\D/g, "").padEnd(8, " ").slice(0, 8);
  const codPostal = (v("codPostal") || "").replace(/\D/g, "").padEnd(7, " ").slice(0, 7);

  return (
    <div
      className="pdf-form"
      style={{
        width: PDF_W,
        height: PDF_H,
        background: PAPER,
        fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
        color: BIMBY_INK,
        position: "relative",
        boxShadow: "0 2px 30px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <PhotoHeader imageUrl={imageUrl} />

      {/* Body */}
      <div style={{ position: "relative", padding: "0 24px", marginTop: -10 }}>
        <h1 style={{
          color: BIMBY_GREEN, fontSize: 20, fontWeight: 700,
          textAlign: "center", margin: "0 0 8px 0",
        }}>
          Experiência Bimby<sup style={{ fontSize: 11 }}>®</sup>
        </h1>

        {/* Tipo + Data row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 250px", gap: "2px 6px", marginBottom: 4 }}>
          <Opt checked={isOn("tipoExperiencia", "presencial_casa")} label={<>Presencial <b>em casa</b></>} />
          <Opt checked={isOn("tipoExperiencia", "presencial_loja")} label={<>Presencial <b>na Loja</b></>} />
          <div />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Lbl>Data:</Lbl>
            <CharBoxRow value={dateStr} length={8} separators={{ 1: ".", 3: ".", 7: "" }} />
          </div>

          <Opt checked={isOn("tipoExperiencia", "demonstracao")} label="Demonstração" />
          <Opt checked={isOn("tipoExperiencia", "visita_bimby")} label={<>Visita <b style={{ color: VORWERK_RED }}>Bimby®</b></>} />
          <Opt checked={isOn("tipoExperiencia", "visita_pos_venda")} label="Visita Pós-Venda" />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Lbl>Loja:</Lbl><UL value={v("loja")} width={195} />
          </div>
        </div>

        {/* Receitas + Agente + Nº */}
        <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center" }}>
          <Lbl>Receitas:</Lbl><UL value={v("receitas")} width={300} />
          <Lbl>Agente:</Lbl><UL value={v("agente")} width={170} />
          <Lbl>Nº:</Lbl><UL value={v("numero")} width={45} />
        </div>

        {/* Nome + TEL */}
        <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center" }}>
          <Lbl>Nome:</Lbl><UL value={v("nome")} width={420} />
          <Lbl>TEL</Lbl>
          <CharBoxRow value={(v("tel") || "").replace(/\D/g, "")} length={9} />
        </div>

        {/* @ + Morada */}
        <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center" }}>
          <Lbl>@:</Lbl><UL value={v("email")} width={310} />
          <Lbl>Morada:</Lbl><UL value={v("morada")} width={290} />
        </div>

        {/* Localidade + CP + Nº pessoas */}
        <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center" }}>
          <Lbl>Localidade:</Lbl><UL value={v("localidade")} width={210} />
          <Lbl>Cód. Postal:</Lbl>
          <CharBoxRow value={codPostal} length={7} separators={{ 3: "-" }} />
          <Lbl>Nº de pessoas em casa:</Lbl><UL value={v("numPessoas")} width={50} />
        </div>

        {/* Profissão + horários */}
        <div style={{ display: "flex", gap: 8, marginBottom: 2, alignItems: "center", flexWrap: "wrap" }}>
          <Lbl>Profissão:</Lbl><UL value={v("profissao")} width={155} />
          <Lbl>Como são os seus horários?</Lbl>
          <Opt checked={isOn("horarios", "flexivel")} label="Flexível" />
          <Opt checked={isOn("horarios", "fixo")} label="Fixo" />
          <Opt checked={isOn("horarios", "outro")} label="Outro" />
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center", paddingLeft: 232 }}>
          <Lbl>Disponibilidade</Lbl><UL value={v("disponibilidade")} width={420} />
        </div>

        {/* Ciclo do Cliente */}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 }}>
          <div style={{ width: 110, textAlign: "center", flexShrink: 0 }}>
            <div style={{ color: BIMBY_GREEN, fontSize: 11, fontWeight: 700, lineHeight: 1.1, marginBottom: 2 }}>
              Ciclo do<br />Cliente
            </div>
            <CicloCliente size={100} />
          </div>
          <div style={{ flex: 1, fontSize: 8.5, lineHeight: 1.3, color: BIMBY_INK }}>
            <p style={{ margin: "2px 0 4px" }}>
              <b>Ser Cliente Bimby® é fazer parte de um ciclo de momentos especiais.</b>
            </p>
            <p style={{ margin: "1px 0" }}>
              <span style={{ color: BIMBY_GREEN, fontWeight: 700 }}>Demonstração </span>
              Mostramos-lhe os benefícios da Bimby®.
            </p>
            <p style={{ margin: "1px 0" }}>
              <span style={{ color: VORWERK_RED, fontWeight: 700 }}>Visita Pós-Venda </span>
              Ajudamos a dar os primeiros passos.
            </p>
            <p style={{ margin: "1px 0" }}>
              <span style={{ color: BIMBY_GREEN, fontWeight: 700 }}>Aula de Cozinha </span>
              Preparamos receitas deliciosas para si e damos-lhe a conhecer os Espaços Vorwerk ou Lojas e Estúdios.
            </p>
            <p style={{ margin: "1px 0" }}>
              <span style={{ color: VORWERK_RED, fontWeight: 700 }}>Visita à sua Medida </span>
              Oferecemos-lhe dicas e aconselhamento personalizado sobre os novos acessórios Bimby®.
            </p>
            <p style={{ margin: "3px 0 0", fontStyle: "italic" }}>
              Aproveite cada um destes momentos e descubra como tirar o máximo partido da sua Bimby®.
            </p>
          </div>
        </div>

        {/* Two-column questionnaire */}
        <div style={{
          background: BIMBY_GREEN_TINT,
          padding: "8px 10px",
          borderRadius: 6,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}>
          {/* LEFT */}
          <div>
            <Q label="O que sabe ou ouviu sobre a Bimby® até agora?" value={v("qSabe")} lines={1} />
            <Q label="Quem cozinha, habitualmente?" value={v("qQuemCozinha")} lines={1} />
            <Q label="Indique duas coisas que mais gosta e menos gosta na cozinha." value={v("qGostaMenosGosta")} lines={1} />
            <Q label="Quanto tempo gasta em média a cozinhar por dia/semana?" value={v("qTempoCozinhar")} lines={1} />

            <div style={{ marginTop: 4, marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2 }}>
                Que refeições prepara em casa?
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1px 4px" }}>
                {FORM_SCHEMA.refeicoes.options.map((o) => (
                  <Opt key={o.id} checked={isOn("refeicoes", o.id)} label={o.label} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2 }}>
                Que tipo de pratos cozinha com mais frequência?
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1px 4px" }}>
                {FORM_SCHEMA.pratosFrequencia.options.map((o) => (
                  <Opt key={o.id} checked={isOn("pratosFrequencia", o.id)} label={o.label} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2 }}>
                Que tipo de produtos compra habitualmente?
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px 2px" }}>
                {FORM_SCHEMA.produtosCompra.options.map((o) => (
                  <Opt key={o.id} checked={isOn("produtosCompra", o.id)} label={o.label} />
                ))}
              </div>
            </div>

            <Q label="Se fosse fácil e rápido, quais destes produtos passaria a fazer em casa?" value={v("qPassariaFazer")} lines={1} />

            <div style={{ marginTop: 4, marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2, lineHeight: 1.2 }}>
                Gostaria de conhecer uma forma mais económica<br />para preparar as suas refeições?
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Opt checked={isOn("conhecerEconomica", "sim")} label="Sim" />
                <Opt checked={isOn("conhecerEconomica", "nao")} label="Não" />
              </div>
            </div>

            <Q label="O que mudaria na sua rotina se pudesse cozinhar de forma mais rápida e eficiente?" value={v("qMudariaRotina")} lines={1} />

            <div style={{ marginTop: 4, marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2 }}>
                Quais destes aspetos fazem mais sentido com o seu estilo de vida?
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {FORM_SCHEMA.estiloVida.options.map((o) => (
                  <Opt key={o.id} checked={isOn("estiloVida", o.id)} label={o.label} />
                ))}
              </div>
            </div>

            <Q label="O que mais lhe desperta curiosidade sobre como a Bimby® pode transformar a sua experiência na cozinha?" value={v("qDespertaCuriosidade")} lines={1} />
          </div>

          {/* RIGHT */}
          <div>
            <div style={{ position: "relative", marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2 }}>
                Qual das 7 Maravilhas Bimby® fez mais sentido para si?
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingRight: 60 }}>
                {FORM_SCHEMA.maravilhas.options.map((o) => (
                  <Opt key={o.id} checked={isOn("maravilhas", o.id)} label={o.label} />
                ))}
              </div>
              <div style={{
                position: "absolute", right: 0, top: 14,
                width: 50, height: 50, borderRadius: "50%",
                border: `1.2px solid ${BIMBY_GREEN}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 700, color: BIMBY_GREEN,
              }}>
                Poupança
              </div>
            </div>

            <Q label="O que mais gostou desta experiência?" value={v("qGostouExperiencia")} lines={1} />
            <Q label="Como é que a Bimby® transformaria o seu dia a dia?" value={v("qTransformaria")} lines={1} />
            <Q label="Qual acredita ser o maior benefício de ter uma Bimby® em sua casa?" value={v("qBeneficio")} lines={1} />

            <div style={{ marginTop: 4, marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2 }}>
                Como gostaria de ter a sua Bimby®?
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {FORM_SCHEMA.comoTer.options.map((o) => (
                  <Opt key={o.id} checked={isOn("comoTer", o.id)} label={o.label} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2, lineHeight: 1.2 }}>
                Pode partilhar comigo o nome das primeiras duas pessoas a quem<br />gostaria de oferecer esta experiência Bimby®?
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1px 4px" }}>
                <div><span style={{ color: BIMBY_GREEN, fontSize: 8 }}>Nome </span><UL value={v("partilhar1Nome")} width={130} /></div>
                <div><span style={{ color: BIMBY_GREEN, fontSize: 8 }}>Telefone </span><UL value={v("partilhar1Tel")} width={90} /></div>
                <div><span style={{ color: BIMBY_GREEN, fontSize: 8 }}>Nome </span><UL value={v("partilhar2Nome")} width={130} /></div>
                <div><span style={{ color: BIMBY_GREEN, fontSize: 8 }}>Telefone </span><UL value={v("partilhar2Tel")} width={90} /></div>
              </div>
            </div>

            <div style={{ marginTop: 4, marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2 }}>
                Qual a próxima experiência Bimby® que gostaria de ter?
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px 4px" }}>
                {FORM_SCHEMA.proximaExp.options.map((o) => (
                  <Opt key={o.id} checked={isOn("proximaExp", o.id)} label={o.label} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 3 }}>
              <div style={{ color: BIMBY_GREEN, fontWeight: 600, fontSize: 9, marginBottom: 2 }}>
                Conhece alguém que poderia trabalhar connosco?
              </div>
              <div>
                <span style={{ color: BIMBY_GREEN, fontSize: 8 }}>Nome </span>
                <UL value={v("conheceNome")} width={300} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer: legal + signature */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 10, marginTop: 6 }}>
          <p style={{ fontSize: 6, lineHeight: 1.3, margin: 0, textAlign: "justify", color: "#444" }}>
            A Vorwerk Premium Lda, enquanto entidade responsável pelo tratamento, garante a mais rigorosa
            confidencialidade dos dados pessoais recolhidos. À luz do Regulamento (EU) 2016/679 do Parlamento
            Europeu e do Conselho, de 27.04.2016, bem como da Lei nº 58/2019 relativo à proteção de dados (RGPD)
            o tratamento dos dados obtidos através do presente documento informativo do potencial Cliente ou
            indiretamente através do Agente) só será lícito mediante a receção do consentimento do seu Titular,
            que, para o efeito, e, assim querendo, dever-se-á proceder ao registo do mesmo no VORyou seguindo
            os procedimentos usualmente definidos. A recolha desta Declaração de Consentimento por parte do
            Cliente é da responsabilidade do Agente Credenciado Vorwerk. O potencial Cliente deverá confirmar
            esse consentimento, respondendo ao email que lhe é enviado após registo no VORyou. Se este processo
            não ficar concluído de 30 dias o Agente ficará impedido de contactar o prospecto para a finalidade em causa.
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", paddingBottom: 2 }}>
            <div style={{ display: "flex", alignItems: "flex-end", fontSize: 9, width: "100%" }}>
              <Lbl>Assinatura:&nbsp;</Lbl>
              <span style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "flex-end",
                justifyContent: "center",
                borderBottom: `0.8px solid ${BIMBY_INK}`,
                height: 32,
                position: "relative",
                marginLeft: 4,
              }}>
                {signatureDataUrl && (
                  <img src={signatureDataUrl} alt="" style={{
                    maxHeight: 30,
                    maxWidth: "100%",
                    objectFit: "contain",
                    display: "block",
                  }} />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
          <div style={{ fontSize: 8, color: BIMBY_INK }}>Original (Agente)</div>
          <BimbyLogoStacked width={100} />
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 8, color: BIMBY_INK }}>bimby.pt | @bimbyportugal</span>
            <SocialIcons size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

window.PDFForm = PDFForm;
window.PDF_W = PDF_W;
window.PDF_H = PDF_H;
