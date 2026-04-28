// SignaturePad — minimal canvas signature input.
// Saves PNG dataURL via onChange. Clearing is exposed via a clear button.

function SignaturePad({ value, onChange, width = 360, height = 100 }) {
  const canvasRef = React.useRef(null);
  const drawing = React.useRef(false);
  const last = React.useRef({ x: 0, y: 0 });
  const isEmpty = React.useRef(!value);

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    // Hi-DPI
    const dpr = window.devicePixelRatio || 1;
    c.width = width * dpr;
    c.height = height * dpr;
    c.style.width = width + "px";
    c.style.height = height + "px";
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#222";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, width, height);
      img.src = value;
      isEmpty.current = false;
    }
  }, []);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  };

  const start = (e) => {
    e.preventDefault();
    drawing.current = true;
    last.current = pos(e);
  };
  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    isEmpty.current = false;
  };
  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    onChange?.(canvasRef.current.toDataURL("image/png"));
  };

  const clear = () => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    isEmpty.current = true;
    onChange?.("");
  };

  return (
    <div style={{ display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
        style={{
          border: `1px dashed ${HAIRLINE}`,
          borderRadius: 6,
          background: "#fff",
          cursor: "crosshair",
          display: "block",
          touchAction: "none",
        }}
      />
      <button
        type="button"
        onClick={clear}
        style={{
          marginTop: 6,
          fontSize: 11,
          color: "#666",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Limpar assinatura
      </button>
    </div>
  );
}

window.SignaturePad = SignaturePad;
