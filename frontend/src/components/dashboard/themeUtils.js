export const t = {
  bg: 'var(--d-bg)',
  surface: 'var(--d-surface)',
  surfaceAlt: 'var(--d-surface-alt)',
  text: 'var(--d-text)',
  textSec: 'var(--d-text-sec)',
  textMut: 'var(--d-text-mut)',
  textDim: 'var(--d-text-dim)',
  border: 'var(--d-border)',
  borderSub: 'var(--d-border-sub)',
  hover: 'var(--d-hover)',
  chartGrid: 'var(--d-chart-grid)',
  chartTick: 'var(--d-chart-tick)',
  shadow: 'var(--d-shadow)',
  tooltipBg: 'var(--d-tooltip-bg)',
};

export const surface = (extra = '') =>
  `bg-[var(--d-surface)] border border-[var(--d-border)] rounded-2xl transition-colors duration-300 ${extra}`.trim();

export const surfaceAlt = (extra = '') =>
  `bg-[var(--d-surface-alt)] border border-[var(--d-border-sub)] rounded-xl transition-colors duration-300 ${extra}`.trim();

export const ThemedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-2.5 text-xs rounded-xl" style={{ backgroundColor: t.tooltipBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <p className="mb-1" style={{ color: t.textSec }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || p.stroke || t.text }} className="font-semibold">
            {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString('de-DE') : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
