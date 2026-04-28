// Shared form controls for the online experiences (wizard, single-page, side-by-side)
// All of them write into one shared `data` object via setField(key, value).

const wizardStyles = {
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1f7a48",
    fontFamily: "Inter, sans-serif",
  },
  input: {
    border: "1px solid #cfd8d2",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
    color: "#222",
    background: "#fff",
    outline: "none",
  },
  inputBad: {
    borderColor: "#D9192C",
    boxShadow: "0 0 0 3px rgba(217,25,44,0.08)",
  },
  textarea: {
    minHeight: 70,
    resize: "vertical",
    fontFamily: "Inter, sans-serif",
  },
  optionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid #cfd8d2",
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
    color: "#222",
    fontFamily: "Inter, sans-serif",
    userSelect: "none",
    transition: "all 0.15s",
  },
  pillOn: {
    background: "#2E9E60",
    color: "#fff",
    borderColor: "#2E9E60",
    boxShadow: "0 1px 4px rgba(46,158,96,0.3)",
  },
};

function Field({ label, error, children }) {
  return (
    <div style={wizardStyles.field}>
      <label style={wizardStyles.label}>{label}</label>
      {children}
      {error && <span style={{ fontSize: 11, color: "#D9192C" }}>{error}</span>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", validate, ...rest }) {
  const [touched, setTouched] = React.useState(false);
  const bad = touched && validate && value && !validators[validate]?.(value);
  return (
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setTouched(true)}
      placeholder={placeholder}
      style={{ ...wizardStyles.input, ...(bad ? wizardStyles.inputBad : {}) }}
      {...rest}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ ...wizardStyles.input, ...wizardStyles.textarea }}
    />
  );
}

function Pills({ options, value, onChange, multi = false }) {
  const isOn = (id) => (multi ? (value || []).includes(id) : value === id);
  const toggle = (id) => {
    if (multi) {
      const cur = value || [];
      onChange(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
    } else {
      onChange(value === id ? "" : id);
    }
  };
  return (
    <div style={wizardStyles.optionRow}>
      {options.map((o) => {
        const on = isOn(o.id);
        return (
          <span
            key={o.id}
            onClick={() => toggle(o.id)}
            style={{ ...wizardStyles.pill, ...(on ? wizardStyles.pillOn : {}) }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: multi ? 3 : "50%",
                background: on ? "#fff" : "transparent",
                border: `1.5px solid ${on ? "#fff" : "#cfd8d2"}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {on && (
                multi ? (
                  <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4 L3 6 L7 1.5" stroke="#2E9E60" strokeWidth="1.5" fill="none" /></svg>
                ) : (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2E9E60" }} />
                )
              )}
            </span>
            {o.label}
          </span>
        );
      })}
    </div>
  );
}

Object.assign(window, { Field, TextInput, TextArea, Pills, wizardStyles });
