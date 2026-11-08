import { useEffect, useState } from 'react'
import { projects } from '../content'
import { ProjectDialog } from './ProjectDialog'
import styles from './Projects.module.css'

// Each popup has its own link (#projects/<id>), so a single project can be shared directly.
const idFromHash = () => {
  const match = window.location.hash.match(/^#projects\/(.+)$/)
  return match && projects.some((p) => p.details?.id === match[1]) ? match[1] : null
}

export function Projects() {
  const [openId, setOpenId] = useState(idFromHash)

  useEffect(() => {
    const onHash = () => setOpenId(idFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const open = (id) => {
    history.replaceState(null, '', `#projects/${id}`)
    setOpenId(id)
  }

  const close = () => {
    history.replaceState(null, '', '#projects')
    setOpenId(null)
  }

  const openProject = projects.find((p) => p.details?.id === openId)

  return (
    <>
      <ul className={styles.list}>
        {projects.map((p) => (
          <li key={p.name} className={`pixel-box ${styles.project}`}>
            <h3 className={styles.name}>{p.name}</h3>
            <p className={styles.meta}>
              {p.when} <span aria-hidden="true">/</span> {p.tools}
            </p>
            <p className={styles.text}>{p.text}</p>
            <div className={styles.actions}>
              {p.details && (
                <button type="button" className={styles.more} onClick={() => open(p.details.id)}>
                  Read more
                  <span className="visually-hidden"> about {p.name}</span>
                </button>
              )}
              {p.link && (
                <a href={p.link.href} target="_blank" rel="noreferrer">
                  {p.link.label}
                  <span className="visually-hidden"> (opens {p.name} in a new tab)</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
      {openProject && <ProjectDialog key={openProject.details.id} project={openProject} onClose={close} />}
    </>
  )
}
