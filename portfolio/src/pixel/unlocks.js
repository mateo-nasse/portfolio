// Tracks which sections have been unlocked by scrolling, so the header counter can show progress.
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

const unlocked = new Set()
const listeners = new Set()
let snapshot = 0

function unlock(id) {
  if (unlocked.has(id)) return
  unlocked.add(id)
  snapshot = unlocked.size
  listeners.forEach((l) => l())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useUnlockedCount() {
  return useSyncExternalStore(subscribe, () => snapshot)
}

// Returns a ref for the section and whether it has been unlocked yet.
// Once unlocked, it stays unlocked.
export function useUnlock(id) {
  const ref = useRef(null)
  const [isUnlocked, setUnlocked] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setUnlocked(true)
      unlock(id)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setUnlocked(true)
          unlock(id)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return [ref, isUnlocked]
}
