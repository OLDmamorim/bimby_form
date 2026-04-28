# Bimby — Experiência Bimby® (Formulário Online)

Formulário online para Agentes Bimby preencherem com clientes (em casa ou na loja, em tablet/portátil), com exportação para PDF pixel-perfect.

## Funcionalidades

- 3 modos de preenchimento: **Wizard multi-passo**, **Página única**, **Lado-a-lado com pré-visualização**
- Autosave automático em `localStorage` (preenchimento sobrevive a recarregamentos)
- Validação leve (telefone, email, código postal)
- Assinatura digital em canvas (rato/dedo)
- Exportação para PDF idêntico à folha original (`Cmd/Ctrl+P` → Guardar como PDF)

## Como usar

1. Abrir `Experiência Bimby.html` no browser
2. Escolher modo de preenchimento (botão no topo)
3. Preencher com o cliente
4. Clicar **"Pré-visualizar PDF"** para confirmar
5. Clicar **"Exportar PDF"** → no diálogo de impressão:
   - **Margens: Nenhuma**
   - **Gráficos de fundo: Ativar** ✅
   - **Escala: 100%**
   - **Destino: Guardar como PDF**

## Estrutura

```
.
├── Experiência Bimby.html    # Entry point
├── src/                      # Componentes React
│   ├── schema.jsx            # Schema das opções
│   ├── brand.jsx             # Logos e gráficos SVG
│   ├── form-controls.jsx     # Inputs reutilizáveis
│   ├── signature-pad.jsx     # Canvas de assinatura
│   ├── pdf-form.jsx          # Réplica pixel-perfect do PDF
│   ├── variant-wizard.jsx    # Modo wizard
│   └── variants.jsx          # Modos página única + split
├── assets/
│   └── header-photo.jpg      # Foto do cabeçalho
└── design-canvas.jsx         # (não usado em produção)
```

## Stack

- HTML + CSS + React 18 (via Babel standalone — sem build step)
- Tudo client-side, sem backend
- Funciona offline depois de carregado uma vez

## Deploy

Site estático puro — basta servir os ficheiros. Compatível com:
- Netlify, Vercel, Cloudflare Pages, GitHub Pages
- Qualquer servidor HTTP estático
