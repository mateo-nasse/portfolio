import { PixelArt } from './PixelArt'
import styles from './Firefly.module.css'

const sprite = {
  colors: { f: 'var(--c-firefly)', F: 'var(--c-firefly-dim)' },
  rows: ['.F.', 'FfF', '.F.'],
}

// Little loops a firefly wanders along, as offsets in --px. Every leg is 6 pixels long and either
// straight or exactly diagonal, so each step moves a whole pixel on both axes.
const loops = {
  a: [[6, -6], [12, -6], [6, 0]],
  b: [[-6, -6], [-6, -12], [0, -6]],
  c: [[0, -6], [6, -12], [6, -6]],
}

// `x`/`y` place it (any CSS length), `loop` picks a path, `seconds` is one lap, `delay` offsets it.
export function Firefly({ x, y, loop = 'a', seconds = 16, delay = 0 }) {
  const [[x1, y1], [x2, y2], [x3, y3]] = loops[loop]
  return (
    <span
      className={styles.firefly}
      aria-hidden="true"
      style={{
        left: x,
        top: y,
        '--x1': x1, '--y1': y1, '--x2': x2, '--y2': y2, '--x3': x3, '--y3': y3,
        '--dur': `${seconds}s`,
        '--delay': `${-delay}s`,
      }}
    >
      <PixelArt sprite={sprite} className={styles.light} />
    </span>
  )
}
