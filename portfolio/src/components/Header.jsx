import { useState } from 'react'
import { cvUrl, sections } from '../content'
import { useUnlockedCount } from '../pixel/unlocks'
import styles from './Header.module.css'

// Calm mode stops every animation on the page. Stored so it sticks between visits
// (index.html applies it before the first paint).
function useCalm() {
  const [calm, setCalm] = useState(() => 'calm' in document.documentElement.dataset)
  const toggle = () => {
    const next = !calm
    if (next) document.documentElement.dataset.calm = ''
    else delete document.documentElement.dataset.calm
    try {
      localStorage.setItem('calm', next ? '1' : '0')
    } catch {
      // Private browsing can block storage; the switch still works for this visit.
    }
    setCalm(next)
  }
  return [calm, toggle]
}

export function Header() {
  const count = useUnlockedCount()
  const total = sections.length
  const [calm, toggleCalm] = useCalm()

  return (
    <header className={styles.header}>
      <a href="#top" className={styles.mark} aria-label="Back to top">
        MN
      </a>
      <nav aria-label="Sections" className={styles.nav}>
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
          {cvUrl && (
            <li>
              <a href={cvUrl} className={styles.cv}>
                CV
              </a>
            </li>
          )}
        </ul>
      </nav>
      <button
        type="button"
        className={styles.calm}
        aria-pressed={calm}
        onClick={toggleCalm}
        title={calm ? 'Animations are off' : 'Turn animations off'}
      >
        <span className={styles.switch} data-on={calm} aria-hidden="true" />
        Calm
      </button>
      <div className={styles.progress} role="status" aria-live="polite">
        <span className="visually-hidden">
          {count} of {total} sections unlocked
        </span>
        <span className={styles.cells} aria-hidden="true">
          {sections.map((s, i) => (
            <span key={s.id} className={styles.cell} data-filled={i < count} />
          ))}
        </span>
      </div>
    </header>
  )
}
