// Draws a sprite from rows of characters. Every cell is exactly one --px,
// so all art on the site shares the same pixel size.
//
//   <PixelArt sprite={sprites.sparkle} />
//
// A sprite is { rows: string[], colors: { [char]: cssColor } }. '.' is transparent.

function toRuns(rows, colors) {
  const runs = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      let end = x + 1
      while (end < row.length && row[end] === ch) end++
      if (ch !== '.' && ch !== ' ' && colors[ch]) {
        runs.push({ x, y, w: end - x, fill: colors[ch] })
      }
      x = end
    }
  })
  return runs
}

export function PixelArt({ sprite, className, style }) {
  const { rows, colors } = sprite
  const cols = Math.max(...rows.map((r) => r.length))
  const runs = toRuns(rows, colors)

  return (
    <svg
      className={className}
      viewBox={`0 0 ${cols} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      style={{
        width: `calc(var(--px) * ${cols})`,
        height: `calc(var(--px) * ${rows.length})`,
        display: 'block',
        ...style,
      }}
    >
      {runs.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  )
}
