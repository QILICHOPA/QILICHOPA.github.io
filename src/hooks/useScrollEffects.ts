import { useEffect } from 'react'

export function useScrollEffects() {
  useEffect(() => {
    const scrollArea = document.getElementById('main')
    if (!scrollArea) return
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
      }, { root: scrollArea, threshold: 0.08 })
      document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
      document.documentElement.classList.add('motion-ready')

      const cards = Array.from(document.querySelectorAll<HTMLElement>('.stack-card'))
      const opening = document.querySelector<HTMLElement>('.opening-sequence')
      const intro = document.getElementById('intro')
      const introPanel = document.querySelector<HTMLElement>('.intro-panel')
      const about = document.getElementById('about')
      const aboutPanel = document.querySelector<HTMLElement>('.about-section')
      const works = document.getElementById('works')
      const clamp = (value: number) => Math.min(1, Math.max(0, value))
      let lastOpeningProgress = -1
      let lastAboutProgress = -1
      let lastWorksProgress = -1
      const updatePinOffset = () => {
        for (const { panel, property } of [
          { panel: introPanel, property: '--intro-pin-top' },
          { panel: aboutPanel, property: '--about-pin-top' },
        ]) {
          // A tall panel scrolls to its bottom before it becomes pinned.
          panel?.style.setProperty(property, `${Math.min(0, scrollArea.clientHeight - panel.offsetHeight)}px`)
        }
      }
      const panelObserver = new ResizeObserver(updatePinOffset)
      if (introPanel) panelObserver.observe(introPanel)
      if (aboutPanel) panelObserver.observe(aboutPanel)
      panelObserver.observe(scrollArea)
      updatePinOffset()
      opening?.classList.add('is-motion-ready')
      let frame = 0
      const update = () => {
        const viewportTop = scrollArea.getBoundingClientRect().top
        const viewportHeight = scrollArea.clientHeight
        if (opening && intro) {
          // The second panel moves in normal document flow over the sticky first
          // screen. Derive all visual phases from its actual viewport position.
          const progress = clamp(1 - (intro.getBoundingClientRect().top - viewportTop) / viewportHeight)
          if (progress !== lastOpeningProgress) {
            opening.style.setProperty('--opening-progress', progress.toFixed(4))
            opening.style.setProperty('--intro-title-progress', clamp((progress - 0.04) / 0.36).toFixed(4))
            opening.style.setProperty('--intro-avatar-progress', clamp((progress - 0.18) / 0.48).toFixed(4))
            opening.style.setProperty('--intro-copy-progress', clamp((progress - 0.38) / 0.46).toFixed(4))
            lastOpeningProgress = progress
          }
        }
        if (opening && about) {
          const progress = clamp(1 - (about.getBoundingClientRect().top - viewportTop) / viewportHeight)
          if (progress !== lastAboutProgress) {
            opening.style.setProperty('--about-progress', progress.toFixed(4))
            opening.style.setProperty('--about-title-progress', clamp((progress - 0.04) / 0.36).toFixed(4))
            opening.style.setProperty('--about-portrait-progress', clamp((progress - 0.18) / 0.48).toFixed(4))
            opening.style.setProperty('--about-copy-progress', clamp((progress - 0.38) / 0.46).toFixed(4))
            lastAboutProgress = progress
          }
        }
        if (opening && works) {
          const progress = clamp(1 - (works.getBoundingClientRect().top - viewportTop) / viewportHeight)
          if (progress !== lastWorksProgress) {
            opening.style.setProperty('--works-progress', progress.toFixed(4))
            for (const [index, key] of ['pad', 'mobile', 'web', 'motion'].entries()) {
              opening.style.setProperty(`--works-${key}-progress`, clamp((progress - .08 - index * .08) / .52).toFixed(4))
            }
            lastWorksProgress = progress
          }
        }
        const startAt = viewportTop + viewportHeight * 0.7
        cards.forEach((card, index) => {
          const next = cards[index + 1]
          const progress = next ? Math.min(1, Math.max(0, (startAt - next.getBoundingClientRect().top) / Math.max(1, startAt - viewportTop - 130))) : 0
          card.style.setProperty('--stack-progress', String(progress))
        })
        frame = 0
      }
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
      scrollArea.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      update()

      stop = () => {
        observer.disconnect()
        panelObserver.disconnect()
        introPanel?.style.removeProperty('--intro-pin-top')
        aboutPanel?.style.removeProperty('--about-pin-top')
        scrollArea.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
        cancelAnimationFrame(frame)
        document.documentElement.classList.remove('motion-ready')
        opening?.classList.remove('is-motion-ready')
        for (const property of ['--opening-progress', '--intro-title-progress', '--intro-avatar-progress', '--intro-copy-progress', '--about-progress', '--about-title-progress', '--about-portrait-progress', '--about-copy-progress', '--works-progress', '--works-pad-progress', '--works-mobile-progress', '--works-web-progress', '--works-motion-progress']) {
          opening?.style.removeProperty(property)
        }
        cards.forEach((card) => card.style.removeProperty('--stack-progress'))
      }
    }

    start()
    preference.addEventListener('change', start)
    return () => { stop(); preference.removeEventListener('change', start) }
  }, [])
}
