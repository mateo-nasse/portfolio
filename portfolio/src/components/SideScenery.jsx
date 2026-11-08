// Decoration for the empty space either side of a section, on wide screens only.
// The page is one night scene you walk down: stars thin out as you go, each section has a
// constellation that draws itself when the section unlocks, and fireflies get more common
// the closer you get to the campfire.
import { Constellation } from '../pixel/Constellation'
import { Firefly } from '../pixel/Firefly'
import { PixelArt } from '../pixel/PixelArt'
import styles from './SideScenery.module.css'

// Margin stars are cool and quiet, so the warm fireflies stand out against them.
const dot = { colors: { d: 'var(--c-paper-dim)' }, rows: ['d'] }
const smallStar = { colors: { d: 'var(--c-paper-dim)', w: 'var(--c-paper)' }, rows: ['.d.', 'dwd', '.d.'] }

// Per section: stars per side, which side gets the constellation, and fireflies in total
// (split across both sides, left first).
const scenery = {
  work: {
    stars: 4,
    constellation: { side: 'left', points: [[2, 2], [18, 4], [28, 16], [12, 22], [20, 36]] },
    fireflies: 0,
  },
  projects: {
    stars: 3,
    constellation: { side: 'right', points: [[4, 4], [26, 8], [6, 20], [28, 26], [14, 38]] },
    fireflies: 1,
  },
  about: {
    stars: 2,
    // A little house.
    constellation: { side: 'left', points: [[4, 30], [4, 12], [16, 2], [28, 12], [28, 30], [4, 30]] },
    fireflies: 2,
  },
  contact: { stars: 2, constellation: null, fireflies: 3 },
}

// Small seeded random generator, so every visit gets the same sky.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

function Side({ side, config, seed, drawn }) {
  const rand = seeded(seed)
  const stars = Array.from({ length: config.stars }, (_, i) => ({
    x: 10 + Math.round(rand() * 75),
    y: 8 + Math.round(rand() * 84),
    big: rand() > 0.6,
    delay: Math.round(rand() * 2400),
    key: i,
  }))
  const count = side === 'left' ? Math.ceil(config.fireflies / 2) : Math.floor(config.fireflies / 2)
  const flies = Array.from({ length: count }, () => ({
    x: 15 + Math.round(rand() * 65),
    y: 30 + Math.round(rand() * 60),
    loop: ['a', 'b', 'c'][Math.floor(rand() * 3)],
    seconds: 14 + Math.round(rand() * 8),
    delay: Math.round(rand() * 12),
  }))
  const hasConstellation = config.constellation?.side === side

  return (
    <div className={styles.side} data-side={side} aria-hidden="true">
      {stars.map((s) => (
        <PixelArt
          key={s.key}
          sprite={s.big ? smallStar : dot}
          className={styles.star}
          style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.delay}ms` }}
        />
      ))}
      {hasConstellation && (
        <Constellation points={config.constellation.points} drawn={drawn} className={styles.constellation} />
      )}
      {flies.map((f, i) => (
        <Firefly key={i} x={`${f.x}%`} y={`${f.y}%`} loop={f.loop} seconds={f.seconds} delay={f.delay} />
      ))}
    </div>
  )
}

export function SideScenery({ id, index, drawn }) {
  const config = scenery[id]
  if (!config) return null
  return (
    <>
      <Side side="left" config={config} seed={index * 2 + 1} drawn={drawn} />
      <Side side="right" config={config} seed={index * 2 + 2} drawn={drawn} />
    </>
  )
}
