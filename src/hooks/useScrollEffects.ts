import { useEffect } from 'react'

export function useScrollEffects() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let stop = () => {}

    const start = () => {
      stop()
      if (preference.matches) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.08 })
      document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
      document.documentElement.classList.add('motion-ready')

      const cards = Array.from(document.querySelectorAll<HTMLElement>('.stack-card'))
      let frame = 0
      const update = () => {
        const startAt = window.innerHeight * 0.7
        cards.forEach((card, index) => {
          const next = cards[index + 1]
          const progress = next ? Math.min(1, Math.max(0, (startAt - next.getBoundingClientRect().top) / Math.max(1, startAt - 130))) : 0
          card.style.setProperty('--stack-progress', String(progress))
        })
        frame = 0
      }
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      update()

      stop = () => {
        observer.disconnect()
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
        cancelAnimationFrame(frame)
        document.documentElement.classList.remove('motion-ready')
        cards.forEach((card) => card.style.removeProperty('--stack-progress'))
      }
    }

    start()
    preference.addEventListener('change', start)
    return () => { stop(); preference.removeEventListener('change', start) }
  }, [])
}
