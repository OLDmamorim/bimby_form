// Schema for the Experiência Bimby form — shared across all variants and the PDF view.
// Single source of truth; lets us regenerate UIs and the PDF from one place.

const FORM_SCHEMA = {
  // Top-row context: tipo de experiência + meta (data, loja, agente)
  tipoExperiencia: {
    label: "Tipo de Experiência",
    options: [
      { id: "presencial_casa", label: "Presencial em casa" },
      { id: "presencial_loja", label: "Presencial na Loja" },
      { id: "demonstracao", label: "Demonstração" },
      { id: "visita_bimby", label: "Visita Bimby®" },
      { id: "visita_pos_venda", label: "Visita Pós-Venda" },
    ],
  },

  horarios: {
    label: "Como são os seus horários?",
    options: [
      { id: "flexivel", label: "Flexível" },
      { id: "fixo", label: "Fixo" },
      { id: "outro", label: "Outro" },
    ],
  },

  refeicoes: {
    label: "Que refeições prepara em casa?",
    options: [
      { id: "peq_almoco", label: "Peq. Almoço" },
      { id: "almoco", label: "Almoço" },
      { id: "lanche_snacks", label: "Lanche/Snacks" },
      { id: "jantar", label: "Jantar" },
      { id: "marmita", label: "Marmita" },
    ],
  },

  pratosFrequencia: {
    label: "Que tipo de pratos cozinha com mais frequência?",
    options: [
      { id: "sopas", label: "Sopas" },
      { id: "acompanhamentos", label: "Acompanhamentos" },
      { id: "estufados", label: "Estufados" },
      { id: "pratos_forno", label: "Pratos Forno" },
      { id: "sobremesas", label: "Sobremesas" },
    ],
  },

  produtosCompra: {
    label: "Que tipo de produtos compra habitualmente?",
    options: [
      { id: "sumos", label: "Sumos" },
      { id: "gelados", label: "Gelados" },
      { id: "iogurtes", label: "Iogurtes" },
      { id: "queijo_fresco", label: "Queijo Fresco" },
      { id: "bebidas_vegetais", label: "Bebidas Vegetais" },
      { id: "farinhas_alternativas", label: "Farinhas Alternativas" },
      { id: "pizza", label: "Pizza" },
      { id: "massa_quebrada", label: "Massa quebrada/folhada" },
      { id: "pao", label: "Pão" },
      { id: "salgados", label: "Salgados" },
      { id: "molhos", label: "Molhos" },
      { id: "compotas", label: "Compotas" },
      { id: "sopas_compra", label: "Sopas" },
      { id: "comidas_prontas", label: "Comidas Prontas" },
    ],
  },

  conhecerEconomica: {
    label: "Gostaria de conhecer uma forma mais económica para preparar as suas refeições?",
    options: [
      { id: "sim", label: "Sim" },
      { id: "nao", label: "Não" },
    ],
  },

  estiloVida: {
    label: "Quais destes aspetos fazem mais sentido com o seu estilo de vida?",
    options: [
      { id: "produtos_saudaveis", label: "Produtos e receitas saudáveis feitas em casa" },
      { id: "inspiracao", label: "Inspiração para variar a alimentação" },
      { id: "poucos_ingredientes", label: "Fazer uma receita com poucos ingredientes" },
      { id: "produtos_epoca", label: "Usar produtos da época (sazonais)" },
      { id: "porcoes", label: "Versatilidade para cozinhar doses pequenas ou maiores" },
      { id: "cozinha_chef", label: "Brilhar na cozinha tal como um chef" },
      { id: "todos_gostos", label: "Agradar a todos os gostos" },
    ],
  },

  maravilhas: {
    label: "Qual das 7 Maravilhas Bimby® fez mais sentido para si?",
    options: [
      { id: "feito_casa", label: "Confiamos no que é feito em casa" },
      { id: "janela_mundo", label: "As nossas cozinhas são uma janela para o mundo" },
      { id: "magia", label: "Podemos fazer magia com coisas simples" },
      { id: "mesa", label: "Há sempre lugar à mesa" },
      { id: "estacoes", label: "Todas as estações saudáveis" },
      { id: "modo_chef", label: "Podemos mudar para o modo chef num instante" },
      { id: "singularidade", label: "Celebramos a nossa singularidade" },
    ],
  },

  comoTer: {
    label: "Como gostaria de ter a sua Bimby®?",
    options: [
      { id: "pronto_pagamento", label: "Pronto pagamento" },
      { id: "mensalidades", label: "Mensalidades" },
      { id: "agente_embaixador", label: "Agente Embaixador" },
    ],
  },

  proximaExp: {
    label: "Qual a próxima experiência Bimby® que gostaria de ter?",
    options: [
      { id: "demonstracao", label: "Demonstração" },
      { id: "visita_pos_venda", label: "Visita Pós-venda" },
      { id: "aula_cozinha", label: "Aula de cozinha" },
      { id: "visita_bimby", label: "Visita Bimby®" },
      { id: "entrevista_agente", label: "Entrevista Agente Embaixador" },
    ],
  },
};

// Open-ended text fields (single-line and multi-line). Kept short so we can iterate later.
const TEXT_FIELDS = {
  // header
  data: { label: "Data" },
  loja: { label: "Loja" },
  agente: { label: "Agente" },
  receitas: { label: "Receitas" },
  nome: { label: "Nome" },
  tel: { label: "TEL", validate: "phone" },
  numero: { label: "Nº" },
  email: { label: "@", validate: "email" },
  morada: { label: "Morada" },
  localidade: { label: "Localidade" },
  codPostal: { label: "Cód. Postal", validate: "postal" },
  numPessoas: { label: "Nº de pessoas em casa" },
  profissao: { label: "Profissão" },
  disponibilidade: { label: "Disponibilidade" },

  // questionnaire — left column
  qSabe: { label: "O que sabe ou ouviu sobre a Bimby® até agora?", multi: true },
  qQuemCozinha: { label: "Quem cozinha, habitualmente?", multi: true },
  qGostaMenosGosta: { label: "Indique duas coisas que mais gosta e menos gosta na cozinha.", multi: true },
  qTempoCozinhar: { label: "Quanto tempo gasta em média a cozinhar por dia/semana?", multi: true },
  qPassariaFazer: { label: "Se fosse fácil e rápido, quais destes produtos passaria a fazer em casa?", multi: true },
  qMudariaRotina: { label: "O que mudaria na sua rotina se pudesse cozinhar de forma mais rápida e eficiente?", multi: true },
  qDespertaCuriosidade: {
    label: "O que mais lhe desperta curiosidade sobre como a Bimby® pode transformar a sua experiência na cozinha?",
    multi: true,
  },

  // questionnaire — right column
  qGostouExperiencia: { label: "O que mais gostou desta experiência?", multi: true },
  qTransformaria: { label: "Como é que a Bimby® transformaria o seu dia a dia?", multi: true },
  qBeneficio: { label: "Qual acredita ser o maior benefício de ter uma Bimby® em sua casa?", multi: true },

  // partilhar nomes
  partilhar1Nome: { label: "Nome" },
  partilhar1Tel: { label: "Telefone", validate: "phone" },
  partilhar2Nome: { label: "Nome" },
  partilhar2Tel: { label: "Telefone", validate: "phone" },

  // conhece alguém
  conheceNome: { label: "Nome" },

  // assinatura
  assinatura: { label: "Assinatura", signature: true },
};

// Helpers
const validators = {
  phone: (v) => !v || /^[\d\s+()-]{6,}$/.test(v),
  email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  postal: (v) => !v || /^\d{4}-?\d{3}$/.test(v),
};

window.FORM_SCHEMA = FORM_SCHEMA;
window.TEXT_FIELDS = TEXT_FIELDS;
window.validators = validators;
