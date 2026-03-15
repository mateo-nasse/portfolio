import React from 'react'

import styles from './Skills.module.css'
import skillGroups from '../../data/skills.json'

export const Skills = () => {
  return (
    <section id='skills' className={styles.container}>
      <h2 className={styles.title}>Skills</h2>

      <div className={styles.table}>
        {skillGroups.map((group, id) => (
          <div key={id} className={styles.row}>
            <span className={styles.category}>{group.category}</span>
            <ul className={styles.pills}>
              {group.skills.map((skill, i) => (
                <li key={i} className={styles.pill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}