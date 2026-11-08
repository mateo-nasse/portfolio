import styles from './Embers.module.css'

// Sparks that drift up, sway a pixel left and right, and cool from yellow to red before vanishing.
// Positions and timings are fixed (not random) so the scene is the same on every visit.
// `spread` is how wide the source is, in --px units, centred on the container.
const presets = [
  { x: 0.1, h: 22, dur: 3.8, delay: 0.0 },
  { x: 0.35, h: 30, dur: 4.6, delay: 1.3 },
  { x: 0.55, h: 18, dur: 3.2, delay: 2.1 },
  { x: 0.8, h: 26, dur: 4.2, delay: 0.7 },
  { x: 0.45, h: 34, dur: 5.0, delay: 3.0 },
  { x: 0.2, h: 20, dur: 3.5, delay: 3.7 },
  { x: 0.65, h: 28, dur: 4.4, delay: 4.4 },
  { x: 0.9, h: 16, dur: 3.0, delay: 2.6 },
]

// `offset` picks a different slice of the presets, so neighbouring clusters don't move in sync.
export function Embers({ count = 6, spread = 16, offset = 0, className, style }) {
  const picked = Array.from({ length: count }, (_, i) => presets[(i * 3 + offset * 2) % presets.length])

  return (
    <div
      className={`${styles.embers} ${className ?? ''}`}
      style={{ width: `calc(var(--px) * ${spread})`, ...style }}
      aria-hidden="true"
    >
      {picked.map((p, i) => (
        <span
          key={i}
          className={styles.ember}
          style={{
            left: `calc(var(--px) * ${Math.round(p.x * (spread - 1))})`,
            '--h': p.h,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
          }}
        >
          <span className={styles.spark} />
        </span>
      ))}
    </div>
  )
}
