// Brand SVG primitives — Bimby green, Vorwerk red, Ciclo do Cliente diagram, social icons.
// Kept as stateless functional components so they're trivially reusable in PDF + UI.

const BIMBY_GREEN = "#2E9E60";
const BIMBY_GREEN_DARK = "#1f7a48";
const BIMBY_GREEN_TINT = "#E8F4E9"; // pale wash used behind the questionnaire blocks
const BIMBY_INK = "#222";
const VORWERK_RED = "#D9192C";
const PAPER = "#fff";
const HAIRLINE = "#cfd8d2";

function BimbyWordmark({ height = 28, color = BIMBY_GREEN }) {
  // Recreated wordmark — lowercase italic-ish "bimby" with the ® mark.
  // Approximated from the source — geometric-friendly sans-serif weight 800.
  return (
    <svg height={height} viewBox="0 0 220 80" xmlns="http://www.w3.org/2000/svg" aria-label="Bimby">
      <text
        x="0"
        y="62"
        fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="800"
        fontSize="68"
        fill={color}
        letterSpacing="-2"
      >
        bimby
      </text>
      <text x="190" y="28" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="20" fill={color}>
        ®
      </text>
    </svg>
  );
}

function BimbyLogoStacked({ width = 140 }) {
  // Centered stacked logo for the PDF footer: "bimby" wordmark above the small "by Vorwerk" tag.
  return (
    <svg width={width} viewBox="0 0 220 110" xmlns="http://www.w3.org/2000/svg" aria-label="Bimby by Vorwerk">
      <text
        x="50%"
        textAnchor="middle"
        y="62"
        fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="800"
        fontSize="60"
        fill={BIMBY_GREEN}
        letterSpacing="-1"
      >
        bimby
      </text>
      {/* "by Vorwerk" badge */}
      <g transform="translate(60, 78)">
        <rect width="100" height="22" rx="3" fill={VORWERK_RED} />
        <text
          x="50"
          y="16"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="12"
          letterSpacing="1"
          fill="#fff"
        >
          by VORWERK
        </text>
      </g>
    </svg>
  );
}

// "Ciclo do Cliente" pinwheel diagram — 4 colored quadrants with letters D / V / AC / VM,
// a central Bimby silhouette, and orbital labels. Approximated from the source image.
function CicloCliente({ size = 150 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;
  const inner = size * 0.16;

  // Quadrant arc helper
  const arc = (startAngle, endAngle) => {
    const s = ((startAngle - 90) * Math.PI) / 180;
    const e = ((endAngle - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const xi1 = cx + inner * Math.cos(s);
    const yi1 = cy + inner * Math.sin(s);
    const xi2 = cx + inner * Math.cos(e);
    const yi2 = cy + inner * Math.sin(e);
    return `M ${xi1} ${yi1} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 0 0 ${xi1} ${yi1} Z`;
  };

  const quadrants = [
    { d: arc(315, 45), color: "#F4B23A", letter: "D", lx: cx, ly: cy - r * 0.7 },         // top — yellow
    { d: arc(45, 135), color: "#7CB342", letter: "V", lx: cx + r * 0.7, ly: cy + 6 },      // right — green
    { d: arc(135, 225), color: "#D9192C", letter: "AC", lx: cx, ly: cy + r * 0.78 },        // bottom — red
    { d: arc(225, 315), color: "#E89B3C", letter: "VM", lx: cx - r * 0.7, ly: cy + 6 },     // left — orange
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      {/* outer circular tags around the wheel */}
      <g fontFamily="Inter, sans-serif" fontSize={size * 0.05} fontWeight="700" fill={BIMBY_INK} opacity="0.55">
        <text x={cx} y={size * 0.07} textAnchor="middle">DEMONSTRAÇÃO</text>
        <g transform={`rotate(90, ${cx}, ${cy})`}>
          <text x={cx} y={size * 0.07} textAnchor="middle">VISITA BIMBY</text>
        </g>
        <g transform={`rotate(180, ${cx}, ${cy})`}>
          <text x={cx} y={size * 0.07} textAnchor="middle">AULA DE COZINHA</text>
        </g>
        <g transform={`rotate(270, ${cx}, ${cy})`}>
          <text x={cx} y={size * 0.07} textAnchor="middle">VISITA À SUA MEDIDA</text>
        </g>
      </g>

      {/* quadrants */}
      {quadrants.map((q, i) => (
        <path key={i} d={q.d} fill={q.color} />
      ))}

      {/* white separator lines between quadrants */}
      <g stroke="#fff" strokeWidth="3">
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} />
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
      </g>

      {/* center white disc with stylized Bimby silhouette */}
      <circle cx={cx} cy={cy} r={inner * 1.05} fill="#fff" />
      <g transform={`translate(${cx - size * 0.07}, ${cy - size * 0.08})`}>
        {/* tiny Bimby silhouette */}
        <rect x={size * 0.04} y="0" width={size * 0.06} height={size * 0.04} rx="1" fill="#444" />
        <rect x={size * 0.02} y={size * 0.04} width={size * 0.1} height={size * 0.06} rx="1.5" fill="#444" />
        <rect x={size * 0.025} y={size * 0.1} width={size * 0.09} height={size * 0.05} rx="1" fill="#bbb" />
      </g>

      {/* quadrant letters */}
      <g fontFamily="Inter, sans-serif" fontWeight="800" fontSize={size * 0.11} fill="#fff" textAnchor="middle">
        <text x={quadrants[0].lx} y={quadrants[0].ly} dy="0.35em">D</text>
        <text x={quadrants[1].lx} y={quadrants[1].ly} dy="0.35em">V</text>
        <text x={quadrants[2].lx} y={quadrants[2].ly} dy="0.35em">AC</text>
        <text x={quadrants[3].lx} y={quadrants[3].ly} dy="0.35em">VM</text>
      </g>
    </svg>
  );
}

// Tiny social icons strip for the PDF footer
function SocialIcons({ size = 20, color = VORWERK_RED }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {/* facebook */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z" />
      </svg>
      {/* twitter / x */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 7l-3.5 4.5L16.5 17h-2.6l-2.7-3.6L8 17H6.5l3.9-4.7L6.7 7h2.6l2.4 3.3L14.4 7H16z" fill="#fff" />
      </svg>
      {/* instagram */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" fill="#fff" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
      </svg>
      {/* youtube */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M10 9l5 3-5 3z" fill="#fff" />
      </svg>
      {/* pinterest */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <circle cx="12" cy="12" r="10" />
        <path d="M11 7c2.5 0 4 1.7 4 4 0 2.4-1.4 4-3.4 4-.7 0-1.3-.4-1.5-.8 0 0-.4 1.5-.5 1.8-.2.6-.7 1.4-1 1.9-.3-.9-.4-2 .1-3l1-3.4s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.5 1.1 1.2 0 .7-.5 1.8-.7 2.8-.2.8.4 1.5 1.2 1.5 1.5 0 2.4-1.9 2.4-3.6 0-2-1.4-3.4-3.5-3.4-2.4 0-4 1.8-4 3.9 0 .8.3 1.7.7 2.2.1.1.1.2 0 .3 0 .2-.2.7-.2.8 0 .1-.1.2-.3.1-1.1-.5-1.7-2-1.7-3.3 0-2.6 1.9-5 5.6-5z" fill="#fff" />
      </svg>
      {/* whatsapp */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16.5 13.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.1-.5 0-.6-.3-1.2-.6-1.7-1.1-.4-.4-.8-.9-1.1-1.4-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4 0-.1.1-.3 0-.4-.1-.1-.5-1.2-.7-1.6-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.5.2-.5.5-.8 1.1-.7 1.8.1.7.4 1.4.8 2 .8 1.3 1.9 2.4 3.3 3 .4.2.7.3 1 .4.4.1.8.1 1.2.1.4 0 .8-.2 1.1-.4.4-.3.7-.7.8-1.1.1-.3 0-.5 0-.6 0-.1-.2-.1-.3-.2z" fill="#fff" />
      </svg>
    </div>
  );
}

window.BIMBY_GREEN = BIMBY_GREEN;
window.BIMBY_GREEN_DARK = BIMBY_GREEN_DARK;
window.BIMBY_GREEN_TINT = BIMBY_GREEN_TINT;
window.BIMBY_INK = BIMBY_INK;
window.VORWERK_RED = VORWERK_RED;
window.HAIRLINE = HAIRLINE;
window.PAPER = PAPER;
Object.assign(window, { BimbyWordmark, BimbyLogoStacked, CicloCliente, SocialIcons });
