import { work } from '../content'
import { PixelArt } from '../pixel/PixelArt'
import { bullet } from '../pixel/sprites'
import styles from './Work.module.css'

export function Work() {
  const [current, ...past] = work

  return (
    <>
      <Job job={current} featured />
      {past.map((job) => (
        <Job key={job.company} job={job} />
      ))}
    </>
  )
}

function Job({ job, featured = false }) {
  return (
    <article className={`${styles.job} ${featured ? `pixel-box ${styles.featured}` : ''}`}>
      <header className={styles.head}>
        <h3 className={styles.company}>{job.company}</h3>
        <p className={styles.role}>{job.role}</p>
        <p className={styles.meta}>
          {job.when} <span aria-hidden="true">/</span> {job.where}
        </p>
      </header>
      <p className={styles.summary}>{job.summary}</p>
      {job.items.length > 0 && (
        <ul className={styles.items}>
          {job.items.map((item) => (
            <li key={item.title} className={styles.item}>
              <PixelArt sprite={bullet} className={styles.bullet} />
              <div>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
