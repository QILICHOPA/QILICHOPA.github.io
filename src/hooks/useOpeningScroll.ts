import { useEffect } from 'react'

// Advance the opening panels with one gesture, then restore ordinary scrolling.
export function useOpeningScroll() {
  useEffect(() => {
    const scrollArea = document.getElementById('main')
    const intro = document.getElementById('intro')
    const introPanel = document.querySelector<HTMLElement>('.intro-panel')
    const about = document.getElementById('about')
    if (!scrollArea || !intro || !introPanel || !about) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lockedUntil = 0
    let wheelDistance = 0
    let lastWheelAt = 0
    let touchStart: { x: number; y: number } | null = null
    let touchConsumed = false

    const nextPanel = () => {
      if (scrollArea.scrollTop <= 2) return intro
      const viewportTop = scrollArea.getBoundingClientRect().top
      const introTop = intro.getBoundingClientRect().top - viewportTop
      const aboutTop = about.getBoundingClientRect().top - viewportTop
      // On smaller screens, let visitors read the entire portrait panel first.
      const unreadHeight = introTop + introPanel.offsetHeight - scrollArea.clientHeight
      // A few pixels of bottom padding should not require an extra gesture.
      return introTop <= 2 && unreadHeight <= 24 && aboutTop > 2 ? about : null
    }
    const showPanel = (target: HTMLElement) => {
      // This deadline is fixed: trackpad momentum must never extend the lock.
      lockedUntil = performance.now() + (preference.matches ? 0 : 900)
      wheelDistance = 0
      target.scrollIntoView({ behavior: preference.matches ? 'instant' : 'smooth', block: 'start' })
    }
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const now = performance.now()
      if (event.deltaY < 0 && now < lockedUntil) {
        lockedUntil = 0
        scrollArea.scrollTo({ top: scrollArea.scrollTop, behavior: 'instant' })
      }
      if (now < lockedUntil) {
        event.preventDefault()
        return
      }
      if (event.deltaY <= 0) return
      const target = nextPanel()
      if (!target) return
      event.preventDefault()
      if (now - lastWheelAt > 180) wheelDistance = 0
      lastWheelAt = now
      wheelDistance += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scrollArea.clientHeight : 1)
      if (wheelDistance >= 12) {
        showPanel(target)
      }
    }
    const onTouchStart = (event: TouchEvent) => {
      touchConsumed = false
      touchStart = event.touches.length === 1 && nextPanel()
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null
    }
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      if (touchConsumed) {
        event.preventDefault()
        return
      }
      if (!touchStart) return
      const deltaY = touchStart.y - event.touches[0].clientY
      const deltaX = touchStart.x - event.touches[0].clientX
      if (deltaY > 24 && deltaY > Math.abs(deltaX)) {
        const target = nextPanel()
        if (!target) return
        event.preventDefault()
        touchConsumed = true
        showPanel(target)
      }
    }
    const onTouchEnd = () => { touchStart = null; touchConsumed = false }
    const onNavigation = () => { lockedUntil = 0; wheelDistance = 0 }

    scrollArea.addEventListener('wheel', onWheel, { passive: false })
    scrollArea.addEventListener('touchstart', onTouchStart, { passive: true })
    scrollArea.addEventListener('touchmove', onTouchMove, { passive: false })
    scrollArea.addEventListener('touchend', onTouchEnd)
    scrollArea.addEventListener('touchcancel', onTouchEnd)
    window.addEventListener('hashchange', onNavigation)
    return () => {
      scrollArea.removeEventListener('wheel', onWheel)
      scrollArea.removeEventListener('touchstart', onTouchStart)
      scrollArea.removeEventListener('touchmove', onTouchMove)
      scrollArea.removeEventListener('touchend', onTouchEnd)
      scrollArea.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('hashchange', onNavigation)
    }
  }, [])
}
