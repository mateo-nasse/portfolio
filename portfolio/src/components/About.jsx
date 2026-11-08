import { about } from '../content'
import { PixelArt } from '../pixel/PixelArt'
import { bullet } from '../pixel/sprites'
import styles from './About.module.css'

export function About() {
  return (
    <>
      <div className={styles.story}>
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <h3 className={styles.subtitle}>How I work</h3>
      <ul className={styles.items}>
        {about.howIWork.map((item) => (
          <li key={item.title} className={styles.item}>
            <PixelArt sprite={bullet} className={styles.bullet} />
            <div>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
