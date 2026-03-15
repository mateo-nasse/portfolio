import React from 'react'

import styles from './Experience.module.css'
import history from '../../data/history.json'
import { getImageUrl } from '../../utils'

export const Experience = () => {
  return (
    <section id='experience' className={styles.container}>
      <h2 className={styles.title}>Experience</h2>

      <div className={styles.timeline}>
        {history.map((item, id) => (
          <div key={id} className={styles.entry}>

            <div className={styles.entryLeft}>
              <div className={styles.logoWrap}>
                <img
                  src={getImageUrl(item.imageSrc)}
                  alt={`${item.organisation} logo`}
                  className={styles.logo}
                />
              </div>
              <div className={styles.line} />
            </div>

            <div className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.role}>{item.role}</h3>
                  <p className={styles.company}>
                    {item.organisation}
                    <span className={styles.location}> · {item.location}</span>
                  </p>
                </div>
                <span className={styles.period}>
                  {item.startDate} – {item.endDate}
                </span>
              </div>

              <ul className={styles.bullets}>
                {item.experiences.map((exp, i) => (
                  <li key={i} className={styles.bullet}>
                    <span className={styles.bulletDot} />
                    {exp}
                  </li>
                ))}
              </ul>

              <div className={styles.tags}>
                {item.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}