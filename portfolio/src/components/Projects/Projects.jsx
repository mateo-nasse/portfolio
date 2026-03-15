import React from 'react'

import styles from './Projects.module.css'
import projects from '../../data/projects.json'
import { ProjectCard } from './ProjectCard'

export const Projects = () => {
  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section className={styles.container} id='projects'>
      <h2 className={styles.title}>Projects</h2>

      {featured.length > 0 && (
        <div className={styles.featuredRow}>
          {featured.map((project, id) => (
            <ProjectCard key={id} project={project} />
          ))}
        </div>
      )}

      <div className={styles.grid}>
        {rest.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      </div>
    </section>
  )
}