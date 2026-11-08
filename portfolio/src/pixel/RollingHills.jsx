import { PixelArt } from './PixelArt'
import { HILL_PERIOD } from './sprites'

// Layers of hills stacked at the bottom of their container, back layer first.
// Each layer with a `seconds` value drifts left by one full period in that time, one whole
// pixel per step, then loops. Slower at the back, faster at the front, like slow waves.
// A layer without `seconds` stays still. `center` keeps a still layer centred on the page.
export function RollingHills({ layers, className }) {
  const height = Math.max(...layers.map((l) => l.sprite.rows.length))

  return (
    <div className={className} aria-hidden="true">
      <div style={{ position: 'relative', height: `calc(var(--px) * ${height})`, overflow: 'hidden' }}>
      {layers.map(({ sprite, seconds, center }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: center ? '50%' : 0,
            marginLeft: center ? `calc(var(--px) * ${-sprite.rows[0].length / 2})` : 0,
            '--shift': `calc(var(--px) * ${-HILL_PERIOD})`,
            animation: seconds ? `pixel-frames ${seconds}s steps(${HILL_PERIOD}) infinite` : undefined,
          }}
        >
          <PixelArt sprite={sprite} />
        </div>
      ))}
      </div>
    </div>
  )
}
