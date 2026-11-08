import { useEffect, useRef, useState } from 'react'
import { contact } from '../content'
import { Embers } from '../pixel/Embers'
import { Firefly } from '../pixel/Firefly'
import { PixelAnim } from '../pixel/PixelAnim'
import { RollingHills } from '../pixel/RollingHills'
import { PixelArt } from '../pixel/PixelArt'
import { ditherFade, glow, hillLayer, makeCampfire } from '../pixel/sprites'
import { useInView } from '../pixel/useInView'
import styles from './Contact.module.css'

// The hidden surprise: click the fire to add a log. Each log makes it a level bigger (taller
// flames, wider glow, a crackle of sparks), and every few seconds it burns back down a level.
const levels = [15, 18, 21, 24].map((flame, i) => ({
  flame,
  fire: makeCampfire(flame),
  light: glow(30 + i * 3),
  radius: 30 + i * 3,
}))
const BURN_DOWN_MS = 6000
const crackle = [[-6, -9], [-3, -12], [0, -15], [3, -12], [6, -9], [-6, -3], [6, -3]]
// Same hills as the top of the page. The far hills roll by slowly; the nearest stay still,
// with a clearing in the middle where the fire sits. A dither fades them into the footer.
const camp = [
  { sprite: hillLayer('far', { height: 18, color: 'b' }), seconds: 150 },
  { sprite: hillLayer('back', { height: 18, color: 'q' }), seconds: 110 },
  { sprite: hillLayer('front', { cols: 720, height: 18, color: 'p', clearing: 16 }), center: true },
]
const fade = ditherFade(['p', 'q'], { rows: 12 })
// The most fireflies on the page are here, around the fire (kept clear of the middle).
const campFlies = [
  { x: '18%', y: '40%', loop: 'a', seconds: 16, delay: 2 },
  { x: '33%', y: '24%', loop: 'c', seconds: 19, delay: 7 },
  { x: '68%', y: '34%', loop: 'b', seconds: 18, delay: 4 },
  { x: '82%', y: '48%', loop: 'a', seconds: 15, delay: 9 },
]

export function Contact() {
  return (
    <>
      <p className={styles.text}>{contact.text}</p>
      <ul className={styles.links}>
        {contact.links.map((l) => (
          <li key={l.label}>
            <span className={styles.label}>{l.label}</span>
            <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              {l.value}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

// The end of the page: a campfire with flickering light and embers. Sits outside the sections
// so the unlock wipe never clips it.
export function Campfire() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [level, setLevel] = useState(0)
  const [logs, setLogs] = useState(0)

  useEffect(() => {
    if (level === 0) return
    const timer = setTimeout(() => setLevel((l) => l - 1), BURN_DOWN_MS)
    return () => clearTimeout(timer)
  }, [level, logs])

  const addLog = () => {
    setLevel((l) => Math.min(l + 1, levels.length - 1))
    setLogs((n) => n + 1)
  }

  const { flame, fire, light, radius } = levels[level]

  return (
    <footer ref={ref} className={styles.scene} data-offscreen={!inView}>
      <div className={styles.camp}>
        <PixelAnim
          sprite={light}
          fps={3}
          className={styles.glow}
          style={{ marginLeft: `calc(var(--px) * ${-radius})` }}
        />
        <RollingHills layers={camp} className={styles.hills} />
        <button
          type="button"
          className={styles.fireButton}
          onClick={addLog}
          aria-label="Add a log to the fire"
        >
          <PixelAnim sprite={fire} fps={7 + level * 2} />
          {logs > 0 && (
            <span key={logs} className={styles.crackle} style={{ bottom: `calc(var(--px) * ${flame + 4})` }} aria-hidden="true">
              {crackle.map(([dx, dy], i) => (
                <span key={i} style={{ '--dx': dx, '--dy': dy }} />
              ))}
            </span>
          )}
        </button>
        <Embers
          count={8}
          spread={12}
          className={styles.embers}
          style={{ bottom: `calc(var(--px) * ${flame + 3})` }}
        />
        {campFlies.map((f, i) => (
          <Firefly key={i} {...f} />
        ))}
      </div>
      <div className={styles.fade} aria-hidden="true">
        <PixelArt sprite={fade} />
      </div>
      <p className={styles.footer}>{contact.footer}</p>
    </footer>
  )
}
