import { useRef } from 'react'
import { intro } from '../content'
import { Embers } from '../pixel/Embers'
import { PixelArt } from '../pixel/PixelArt'
import { RollingHills } from '../pixel/RollingHills'
import { arrowDown, diamond, ditherFade, hillLayer, shootingStar, sparkle, sparkleSmall } from '../pixel/sprites'
import { useInView } from '../pixel/useInView'
import styles from './Hero.module.css'

// Three layers of hills: the further back, the darker and slower, like slow waves.
// Below them, a dither fades the front colour into the page.
const horizon = [
  { sprite: hillLayer('far', { height: 20, color: 'q' }), seconds: 130 },
  { sprite: hillLayer('back', { height: 20, color: 'p' }), seconds: 90 },
  { sprite: hillLayer('front', { height: 20, color: 'r' }), seconds: 60 },
]
const fade = ditherFade(['r', 'R'], { rows: 16 })

// Positions are in --px units so decorations sit on the same grid as everything else.
const stars = [
  { sprite: sparkle, top: 20, left: 70, delay: 0 },
  { sprite: sparkleSmall, top: 34, left: 86, delay: 600 },
  { sprite: sparkleSmall, top: 12, left: 52, delay: 1200 },
  { sprite: sparkle, top: 52, left: 92, delay: 1800 },
  { sprite: sparkleSmall, top: 60, left: 64, delay: 900 },
]

// Little clusters of embers drifting up off the hills.
const emberSpots = [12, 38, 61, 84]

export function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section
      id="top"
      ref={ref}
      className={styles.hero}
      data-offscreen={!inView}
      aria-labelledby="hero-title"
    >
      <div className={styles.sky} aria-hidden="true">
        {stars.map((s, i) => (
          <PixelArt
            key={i}
            sprite={s.sprite}
            className={styles.star}
            style={{
              top: `calc(var(--px) * ${s.top})`,
              left: `${s.left}%`,
              animationDelay: `${s.delay}ms`,
            }}
          />
        ))}
        <PixelArt sprite={shootingStar} className={styles.shootingStar} />
      </div>

      <div className={styles.content}>
        <PixelArt sprite={diamond} className={styles.diamond} />
        <h1 id="hero-title" className={styles.title}>
          {intro.greeting}
        </h1>
        {intro.lines.map((line) => (
          <p key={line} className={styles.line}>
            {line}
          </p>
        ))}
        <a href="#work" className={styles.hint}>
          <span>Scroll to unlock</span>
          <PixelArt sprite={arrowDown} className={styles.arrow} />
        </a>
      </div>

      <div className={styles.horizon} aria-hidden="true">
        <RollingHills layers={horizon} />
        <PixelArt sprite={fade} />
      </div>
      {emberSpots.map((left, i) => (
        <Embers
          key={left}
          count={3}
          spread={10}
          className={styles.embers}
          style={{ left: `${left}%` }}
          offset={i}
        />
      ))}
    </section>
  )
}
