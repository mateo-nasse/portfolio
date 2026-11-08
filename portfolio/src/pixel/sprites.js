// Abstract decorations, drawn in code. Colours point at the CSS palette in index.css.

const c = {
  w: 'var(--c-paper)',
  y: 'var(--c-yellow)',
  o: 'var(--c-orange)',
  r: 'var(--c-red)',
  t: 'var(--c-teal)',
  p: 'var(--c-plum)',
  b: 'var(--c-ink-3)',
  k: 'var(--c-ink-2)',
  d: 'var(--c-paper-dim)',
  l: 'var(--c-brown)',
  L: 'var(--c-brown-dark)',
  g: 'var(--c-glow)',
  q: 'var(--c-plum-dark)',
  R: 'var(--c-red-dark)',
}

export const sparkle = {
  colors: c,
  rows: [
    '..y..',
    '..y..',
    'yywyy',
    '..y..',
    '..y..',
  ],
}

export const sparkleSmall = {
  colors: c,
  rows: [
    '.o.',
    'owo',
    '.o.',
  ],
}

export const diamond = {
  colors: c,
  rows: [
    '...o...',
    '..oyo..',
    '.oyyyo.',
    'oyywyyo',
    '.oyyyo.',
    '..oyo..',
    '...o...',
  ],
}

// Bullet used in lists.
export const bullet = {
  colors: c,
  rows: [
    '.o.',
    'oyo',
    '.o.',
  ],
}

export const closeX = {
  colors: c,
  rows: [
    'w.....w',
    '.w...w.',
    '..w.w..',
    '...w...',
    '..w.w..',
    '.w...w.',
    'w.....w',
  ],
}

export const arrowDown = {
  colors: c,
  rows: [
    'ooooooo',
    '.ooooo.',
    '..ooo..',
    '...o...',
  ],
}

// Stepped hills, one layer per sprite so layers can drift at different speeds (see RollingHills).
// The curves repeat every HILL_PERIOD columns, so sliding a layer by exactly one period loops
// seamlessly. Deterministic, so it looks the same on every visit.
const TAU = Math.PI * 2
export const HILL_PERIOD = 120
const hillShapes = {
  far: (x) => Math.round(13 + 3 * Math.sin((TAU * x) / 120 + 2) + 1.5 * Math.sin((TAU * x) / 24 + 0.5)),
  back: (x) => Math.round(9 + 3 * Math.sin((TAU * x) / 120) + 2 * Math.sin((TAU * x) / 40 + 1)),
  front: (x) => Math.round(4 + 2 * Math.sin((TAU * x) / 60 + 2) + 1.5 * Math.sin((TAU * x) / 20)),
}

// `cols` should cover the widest screen plus one period. `clearing` flattens the middle
// (for the campfire) and eases back into hills over a few columns.
export function hillLayer(layer, { cols = 840, height = 16, color = 'p', clearing = 0, flat = 3 } = {}) {
  let shape = hillShapes[layer]
  if (clearing) {
    const base = shape
    const mid = cols / 2
    const ease = 8
    shape = (x) => {
      const d = Math.abs(x - mid) - clearing
      if (d <= 0) return flat
      if (d >= ease) return base(x)
      return Math.round(flat + ((base(x) - flat) * d) / ease)
    }
  }
  const rows = Array.from({ length: height }, (_, y) => {
    let row = ''
    for (let x = 0; x < cols; x++) row += height - y <= shape(x) ? color : '.'
    return row
  })
  return { colors: c, rows }
}

// Ordered (Bayer) dither that fades through `ramp` (e.g. ['r', 'R'] = red, then dark red)
// and finally into the background, row by row. Used under the hills so they melt into the
// page instead of ending in a hard edge.
const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]
export function ditherFade(ramp, { cols = 720, rows = 16 } = {}) {
  const tones = [...ramp, '.']
  return {
    colors: c,
    rows: Array.from({ length: rows }, (_, y) => {
      // How far down the ramp this row is: band = which pair of tones, mix = how far between them.
      const t = ((y + 1) / (rows + 1)) * (tones.length - 1)
      const band = Math.floor(t)
      const mix = t - band
      let row = ''
      for (let x = 0; x < cols; x++) {
        row += BAYER4[y % 4][x % 4] < (1 - mix) * 16 ? tones[band] : tones[band + 1]
      }
      return row
    }),
  }
}

// Two-row checkerboard strip, a dithered divider between sections.
export function dither(cols = 720, color = 'b') {
  const a = Array.from({ length: cols }, (_, i) => (i % 2 ? '.' : color)).join('')
  const b = Array.from({ length: cols }, (_, i) => (i % 2 ? color : '.')).join('')
  return { colors: c, rows: [a, b] }
}

// ---------- Animated sprites: { colors, frames: rows[][] } for PixelAnim ----------

// A streak for the shooting star. Head bottom-right, it travels 2 across for every 1 down.
export const shootingStar = {
  colors: c,
  rows: [
    'pp........',
    '..oo......',
    '....oo....',
    '......yy..',
    '........yw',
  ],
}

// Campfire, 4 frames. Flames are generated from a height curve plus a little per-frame wobble,
// then coloured from the outside in: red edge, orange, yellow, white-hot core.
// `flame` is the flame height in pixels; bigger values make a bigger fire (same pixel size).
export function makeCampfire(flame = 15) {
  const W = 23
  const base = flame + 2
  const mid = 11
  // Two logs crossing in an X, with glowing coals between them.
  const logs = Array.from({ length: 5 }, (_, y) => {
    const row = Array(W).fill('.')
    const a = 1 + (4 - y) * 3
    const b = W - 1 - a - 3
    for (const start of [a, b]) {
      for (let x = start; x < start + 4; x++) row[x] = x === start || x === start + 3 ? 'L' : 'l'
    }
    if (y === 0) for (let x = 8; x <= 14; x++) if (row[x] === '.') row[x] = x % 2 ? 'o' : 'r'
    if (y === 1) for (let x = 10; x <= 12; x++) if (row[x] === '.') row[x] = 'r'
    return row.join('')
  })
  const frames = [0, 1, 2, 3].map((f) => {
    // Flame silhouette: a rounded peak, a gentle per-frame sway, and a tip that leans left/right.
    const lean = [0, 1, 0, -1][f]
    const heightAt = (x) => {
      const d = Math.abs(x - mid - lean * 0.6)
      if (d > 8) return 0
      const h = flame * (1 - Math.pow(d / 9, 1.4)) + 1.2 * Math.sin(x * 0.9 + f * 1.6)
      return Math.max(0, Math.round(h))
    }
    const filled = Array.from({ length: base + 1 }, (_, y) =>
      Array.from({ length: W }, (_, x) => base - y < heightAt(x)),
    )
    // Distance from each flame cell to the outside (breadth-first), used for colour layers.
    const dist = filled.map((r) => r.map(() => Infinity))
    const queue = []
    for (let y = 0; y <= base; y++) {
      for (let x = 0; x < W; x++) {
        const edge =
          !filled[y][x] ||
          [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
            const nx = x + dx
            const ny = y + dy
            // The bottom row sits on the coals, so it doesn't count as an outside edge.
            if (ny > base) return false
            return nx < 0 || nx >= W || ny < 0 || !filled[ny][nx]
          })
        if (filled[y][x] && edge) {
          dist[y][x] = 1
          queue.push([x, y])
        }
      }
    }
    while (queue.length) {
      const [x, y] = queue.shift()
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx
        const ny = y + dy
        if (nx < 0 || nx >= W || ny < 0 || ny > base || !filled[ny][nx]) continue
        if (dist[ny][nx] > dist[y][x] + 1) {
          dist[ny][nx] = dist[y][x] + 1
          queue.push([nx, ny])
        }
      }
    }
    const grid = filled.map((r, y) =>
      r.map((on, x) => {
        if (!on) return '.'
        const e = dist[y][x]
        if (e === 1) return 'r'
        if (e === 2) return 'o'
        if (e >= 5) return 'w'
        return 'y'
      }),
    )
    // A couple of loose sparks above the flames, in different spots each frame.
    for (const [sx, lift] of [[[8, 2], [13, 3]], [[12, 2], [9, 4]], [[14, 3], [10, 2]], [[9, 3], [12, 4]]][f]) {
      const sy = base - heightAt(sx) - lift
      if (sy >= 0) grid[sy][sx] = 'y'
    }
    return [...grid.map((r) => r.join('')), ...logs]
  })
  return { colors: c, frames }
}

export const campfire = makeCampfire(15)

// Firelight: a dithered disc that shifts its checker pattern each frame, so it seems to flicker.
export function glow(radius = 22) {
  const size = radius * 2 + 1
  const frame = (offset) =>
    Array.from({ length: Math.round(size / 2) }, (_, y) =>
      Array.from({ length: size }, (_, x) => {
        const dist = Math.hypot(x - radius, (y - radius / 2) * 2)
        if (dist > radius) return '.'
        if (dist < radius * 0.45) return 'g'
        return (x + y + offset) % 2 === 0 ? 'g' : '.'
      }).join(''),
    )
  return { colors: c, frames: [frame(0), frame(1)] }
}

// Work motif: a tiny diagram. Two boxes and a connector; a pixel travels along it (see Motifs).
export const diagram = {
  colors: c,
  rows: [
    'tttttttt......................',
    't......t......................',
    't.dddd.toooooooooooooo........',
    't......t.............o........',
    't.ddd..t.............o........',
    'tttttttt.............o........',
    '.....................o........',
    '.....................o........',
    '....................ooo.......',
    '.....................o........',
    '.................yyyyyyyyy....',
    '.................y.......y....',
    '.................y.dddd..y....',
    '.................y.......y....',
    '.................y.ddd...y....',
    '.................yyyyyyyyy....',
  ],
}

// Projects motif: an equaliser, for the audio tool.
export const equaliser = (() => {
  const heights = [
    [3, 6, 8, 5, 7, 4, 2],
    [5, 8, 6, 7, 4, 6, 3],
    [7, 5, 9, 4, 6, 8, 5],
    [4, 7, 5, 8, 9, 5, 6],
  ]
  const H = 10
  const frames = heights.map((bars) =>
    Array.from({ length: H }, (_, y) => {
      const level = H - y
      return bars
        .map((h) => {
          if (level > h) return '..'
          const ch = level <= 3 ? 'r' : level <= 6 ? 'o' : 'y'
          return ch + ch
        })
        .join('.')
    }),
  )
  return { colors: c, frames }
})()

// About motif: a mug with steam curling up, 3 frames.
export const mug = (() => {
  const body = [
    '..oooooooo....',
    '..ollllllo....',
    '..oooooooooo..',
    '..oooooooo..o.',
    '..oooooooo..o.',
    '..oooooooooo..',
    '..rooooooo....',
    '...rrrrrr.....',
  ]
  const steam = [
    [
      '....d.........',
      '...d...d......',
      '...d..d.......',
      '....d.d.......',
      '....d..d......',
      '...d...d......',
      '..............',
    ],
    [
      '.......d......',
      '....d..d......',
      '.....d..d.....',
      '.....d..d.....',
      '....d..d......',
      '....d...d.....',
      '..............',
    ],
    [
      '...d..........',
      '....d...d.....',
      '....d...d.....',
      '...d...d......',
      '...d..d.......',
      '....d..d......',
      '..............',
    ],
  ]
  return { colors: c, frames: steam.map((s) => [...s, ...body]) }
})()
