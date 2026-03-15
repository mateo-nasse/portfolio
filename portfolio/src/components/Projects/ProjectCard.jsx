import React from 'react'

import styles from './ProjectCard.module.css'
import { getImageUrl } from '../../utils'

export const ProjectCard = ({ project: { title, imageSrc, description, skills, demo, source, demoAv, sourceAv, featured, type, period, highlights } }) => {

  const links = (
    <div className={styles.links}>
      <a
        href={demo}
        className={`${styles.link} ${demoAv ? styles.linkAv : styles.linkDisabled}`}
        {...(!demoAv && { tabIndex: -1, 'aria-disabled': true })}
        target="_blank"
        rel="noopener noreferrer"
      >
        Demo
      </a>
      <a
        href={source}
        className={`${styles.link} ${sourceAv ? styles.linkAv : styles.linkDisabled}`}
        {...(!sourceAv && { tabIndex: -1, 'aria-disabled': true })}
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
      </a>
    </div>
  )

  if (featured) {
    return (
      <div className={styles.featuredCard}>
        <div className={styles.featuredImageWrap}>
          <img src={getImageUrl(imageSrc)} alt={`${title} preview`} className={styles.featuredImage} />
        </div>

        <div className={styles.featuredBody}>
          <div className={styles.featuredTop}>
            <div>
              <div className={styles.featuredBadge}>Featured</div>
              <h3 className={styles.featuredTitle}>{title}</h3>
              {(type || period) && (
                <p className={styles.meta}>{type}{type && period && <span className={styles.sep}> · </span>}{period}</p>
              )}
            </div>
            {links}
          </div>

          <p className={styles.description}>{description}</p>

          {highlights && highlights.length > 0 && (
            <ul className={styles.highlights}>
              {highlights.map((h, i) => (
                <li key={i} className={styles.highlight}>
                  <span className={styles.check}>✓</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <ul className={styles.skillList}>
            {skills.map((skill, id) => (
              <li key={id} className={styles.skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={getImageUrl(imageSrc)} alt={`${title} preview`} className={styles.image} />
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h3 className={styles.title}>{title}</h3>
            {(type || period) && (
              <p className={styles.meta}>{type}{type && period && <span className={styles.sep}> · </span>}{period}</p>
            )}
          </div>
          {links}
        </div>

        <p className={styles.description}>{description}</p>

        <ul className={styles.skillList}>
          {skills.map((skill, id) => (
            <li key={id} className={styles.skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}