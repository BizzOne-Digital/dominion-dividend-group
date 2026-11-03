/** Gold rising bars + sweeping curve, inspired by the DDG emblem. Pure SVG, scales to any width. */
export function GrowthGraphic({ className }: { className?: string }) {
  const bars = [
    { x: 470, h: 70 },
    { x: 522, h: 110 },
    { x: 574, h: 160 },
    { x: 626, h: 222 },
    { x: 678, h: 300 },
  ]
  const base = 360
  return (
    <svg viewBox="0 0 800 420" className={className} aria-hidden="true" preserveAspectRatio="xMaxYMax meet">
      <defs>
        <linearGradient id="bar-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d641a" />
          <stop offset="0.35" stopColor="#f3d98a" />
          <stop offset="0.6" stopColor="#d9ab4c" />
          <stop offset="1" stopColor="#7a5414" />
        </linearGradient>
        <linearGradient id="bar-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
        <mask id="bar-mask">
          <rect width="800" height="420" fill="url(#bar-fade)" />
        </mask>
        <linearGradient id="curve-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c99a38" stopOpacity="0" />
          <stop offset="0.35" stopColor="#e7c56b" stopOpacity="0.9" />
          <stop offset="0.8" stopColor="#f6e3a3" />
          <stop offset="1" stopColor="#c99a38" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="bar-glow" cx="0.5" cy="1" r="0.8">
          <stop offset="0" stopColor="#e7c56b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e7c56b" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="600" cy={base + 10} rx="260" ry="60" fill="url(#bar-glow)" />

      <g mask="url(#bar-mask)">
        {bars.map((b, i) => (
          <g
            key={b.x}
            className="animate-rise"
            style={{ transformOrigin: `${b.x + 18}px ${base}px`, animationDelay: `${300 + i * 140}ms` }}
          >
            <rect x={b.x} y={base - b.h} width="36" height={b.h} fill="url(#bar-gold)" />
            <rect x={b.x} y={base - b.h} width="36" height="3" fill="#fbecc0" opacity="0.9" />
            <rect x={b.x + 36} y={base - b.h + 6} width="7" height={b.h - 6} fill="#5c3f0d" opacity="0.55" />
          </g>
        ))}
      </g>

      <path d={`M0 ${base + 48} C 220 ${base + 40}, 420 ${base + 30}, 560 ${base - 10} S 760 ${base - 120}, 800 ${base - 170}`} fill="none" stroke="url(#curve-gold)" strokeWidth="5" strokeLinecap="round" />
      <path d={`M0 ${base + 60} C 240 ${base + 54}, 440 ${base + 44}, 580 ${base + 8} S 770 ${base - 96}, 800 ${base - 140}`} fill="none" stroke="url(#curve-gold)" strokeWidth="1.5" opacity="0.6" />
    </svg>
  )
}
