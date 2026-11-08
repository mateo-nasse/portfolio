import { useEffect, useState } from 'react'

// Whether the element behind `ref` is on screen. Used to pause animations that are out of view.
export function useInView(ref, rootMargin = '100px') {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
