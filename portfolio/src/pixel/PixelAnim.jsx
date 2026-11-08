import { PixelArt } from './PixelArt'

// Frame-by-frame sprite. All frames are drawn side by side in one strip, and CSS slides the
// strip one whole frame at a time (steps), so pixels never land between grid positions.
// With reduced motion, the first frame just stays put.
export function PixelAnim({ sprite, fps = 6, className, style }) {
  const { frames, colors } = sprite
  const cols = Math.max(...frames.flatMap((f) => f.map((r) => r.length)))
  const height = Math.max(...frames.map((f) => f.length))
  const n = frames.length
  const strip = {
    colors,
    rows: Array.from({ length: height }, (_, y) =>
      frames.map((f) => (f[y] ?? '').padEnd(cols, '.')).join(''),
    ),
  }

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: `calc(var(--px) * ${cols})`,
        height: `calc(var(--px) * ${height})`,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          '--shift': `calc(var(--px) * ${-cols * n})`,
          animation: `pixel-frames ${n / fps}s steps(${n}) infinite`,
        }}
      >
        <PixelArt sprite={strip} />
      </div>
    </div>
  )
}
