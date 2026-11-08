import { PixelArt } from '../pixel/PixelArt'
import { dither } from '../pixel/sprites'
import { useInView } from '../pixel/useInView'
import { useUnlock } from '../pixel/unlocks'
import { Motif } from './Motifs'
import { SideScenery } from './SideScenery'
import styles from './Section.module.css'

const divider = dither(720)

// Eight sparks that fly out from the section number when it unlocks. Distances in --px,
// multiples of 3 so each of the 3 animation steps lands on a whole pixel.
const burst = [
  [0, -6], [6, -6], [6, 0], [6, 6], [0, 6], [-6, 6], [-6, 0], [-6, -6],
]

export function Section({ id, index, title, children }) {
  const [ref, isUnlocked] = useUnlock(id)
  const inView = useInView(ref)

  return (
    <section
      id={id}
      ref={ref}
      className={styles.section}
      data-unlocked={isUnlocked}
      data-offscreen={!inView}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.divider}>
        <PixelArt sprite={divider} />
      </div>
      <div className={styles.titleRow}>
        <h2 id={`${id}-title`} className={styles.title}>
          <span className={styles.index}>
            {String(index).padStart(2, '0')}
            {isUnlocked && (
              <span className={styles.burst} aria-hidden="true">
                {burst.map(([dx, dy], i) => (
                  <span key={i} style={{ '--dx': dx, '--dy': dy }} />
                ))}
              </span>
            )}
          </span>
          {title}
        </h2>
        <div className={styles.motif}>
          <Motif id={id} />
        </div>
      </div>
      <div className={styles.body}>{children}</div>
      <SideScenery id={id} index={index} drawn={isUnlocked} />
    </section>
  )
}
