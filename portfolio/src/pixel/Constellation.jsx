import styles from './Constellation.module.css'

// A few stars joined by dotted lines, all on the --px grid. When `drawn` turns true, the dots
// appear one after another along the path, then the stars light up.
// `points` are [x, y] in grid cells; lines connect them in order.

const STEP_MS = 35
const START_MS = 650 // after the section title has wiped in

function linePixels([x0, y0], [x1, y1]) {
  // Bresenham, so every dot sits on a whole grid cell.
  const out = []
  const dx = Math.abs(x1 - x0)
  const dy = -Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx + dy
  let x = x0
  let y = y0
  for (;;) {
    out.push([x, y])
    if (x === x1 && y === y1) break
    const e2 = 2 * err
    if (e2 >= dy) { err += dy; x += sx }
    if (e2 <= dx) { err += dx; y += sy }
  }
  return out
}

export function Constellation({ points, drawn, className, style }) {
  const near = (x, y) => points.some(([px, py]) => Math.abs(px - x) + Math.abs(py - y) <= 2)
  const dots = []
  for (let i = 0; i < points.length - 1; i++) {
    linePixels(points[i], points[i + 1]).forEach(([x, y], j) => {
      // Dotted: every other cell, and leave a gap around each star.
      if (j % 2 === 0 && !near(x, y)) dots.push([x, y])
    })
  }
  const w = Math.max(...points.map((p) => p[0])) + 2
  const h = Math.max(...points.map((p) => p[1])) + 2
  const doneMs = START_MS + dots.length * STEP_MS

  return (
    <svg
      className={`${styles.constellation} ${className ?? ''}`}
      data-drawn={drawn}
      viewBox={`-1 -1 ${w + 1} ${h + 1}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      style={{
        width: `calc(var(--px) * ${w + 1})`,
        height: `calc(var(--px) * ${h + 1})`,
        '--done': `${doneMs}ms`,
        ...style,
      }}
    >
      {dots.map(([x, y], i) => (
        <rect
          key={`d${i}`}
          className={styles.dot}
          x={x}
          y={y}
          width={1}
          height={1}
          style={{ animationDelay: `${START_MS + i * STEP_MS}ms` }}
        />
      ))}
      {points.map(([x, y], i) => (
        <g key={`s${i}`} className={styles.star}>
          <rect x={x} y={y - 1} width={1} height={3} />
          <rect x={x - 1} y={y} width={3} height={1} />
        </g>
      ))}
    </svg>
  )
}
