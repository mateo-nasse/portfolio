import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { PixelArt } from '../pixel/PixelArt'
import { closeX } from '../pixel/sprites'
import styles from './ProjectDialog.module.css'

// A pixel-art window with the longer story of a project. Uses the native <dialog>, so focus is
// kept inside while it's open, Esc closes it, and focus goes back to the button that opened it.
export function ProjectDialog({ project, onClose }) {
  const ref = useRef(null)
  const { details } = project
  const titleId = `dialog-${details.id}-title`
  const sections = details.sections.filter((s) => s.text)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const close = () => ref.current?.close()

  return createPortal(
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      // Clicking the dimmed backdrop (outside the window) closes it.
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className={`pixel-box ${styles.window}`}>
        <header className={styles.bar}>
          <h2 id={titleId} className={styles.title}>
            {project.name}
          </h2>
          <button type="button" className={styles.close} onClick={close} aria-label="Close">
            <PixelArt sprite={closeX} />
          </button>
        </header>

        <div className={styles.content}>
          <figure className={styles.figure}>
            <div className={`pixel-box ${styles.frame}`}>
              <img src={details.image.src} alt={details.image.alt} />
            </div>
            <figcaption className={styles.caption}>{details.image.caption}</figcaption>
          </figure>

          <p className={styles.meta}>
            {project.when} <span aria-hidden="true">/</span> {project.tools}
          </p>

          {sections.map((s) => (
            <section key={s.title} className={styles.section}>
              <h3 className={styles.sectionTitle}>{s.title}</h3>
              <p>{s.text}</p>
            </section>
          ))}

          {project.link && (
            <a className={styles.link} href={project.link.href} target="_blank" rel="noreferrer">
              {project.link.label}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </dialog>,
    document.body,
  )
}
