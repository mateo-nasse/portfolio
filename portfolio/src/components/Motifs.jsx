// One small animated motif per section, shown next to the section title.
import { PixelArt } from '../pixel/PixelArt'
import { PixelAnim } from '../pixel/PixelAnim'
import { diagram, equaliser, mug } from '../pixel/sprites'
import styles from './Motifs.module.css'

// Work: a tiny diagram, with a pixel travelling along the connector from one box to the other.
function DiagramMotif() {
  return (
    <div className={styles.diagram}>
      <PixelArt sprite={diagram} />
      <span className={styles.packet} />
    </div>
  )
}

export function Motif({ id }) {
  switch (id) {
    case 'work':
      return <DiagramMotif />
    case 'projects':
      return <PixelAnim sprite={equaliser} fps={5} />
    case 'about':
      return <PixelAnim sprite={mug} fps={3} />
    default:
      return null
  }
}
