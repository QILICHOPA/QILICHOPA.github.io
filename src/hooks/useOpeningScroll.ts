import { useEffect } from 'react'

// Complete the first transition with one gesture, then restore ordinary scrolling.
export function useOpeningScroll() {
  useEffect(() => {
    const scrollArea = document.getElementById('main')
    const intro = document.getElementById('intro')
    if (!scrollArea || !intro) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lockedUntil = 0
    let wheelDistance = 0
    let lastWheelAt = 0
    let touchStart: { x: number; y: number } | null = null
    let touchConsumed = false

    const showIntro = () => {
      // Consume the remainder of this gesture, including trackpad momentum.
      lockedUntil = performance.now() + (preference.matches ? 250 : 900)
      intro.scrollIntoView({ behavior: preference.matches ? 'instant' : 'smooth', block: 'start' })
    }
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const now = performance.now()
      if (now < lockedUntil) {
        event.preventDefault()
        lockedUntil = Math.max(lockedUntil, now + 180)
        return
      }
      if (scrollArea.scrollTop > 2 || event.deltaY <= 0) return
      event.preventDefault()
      if (now - lastWheelAt > 180) wheelDistance = 0
      lastWheelAt = now
      wheelDistance += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scrollArea.clientHeight : 1)
      if (wheelDistance >= 12) {
        wheelDistance = 0
        showIntro()
      }
    }
    const onTouchStart = (event: TouchEvent) => {
      touchConsumed = false
      touchStart = event.touches.length === 1 && scrollArea.scrollTop <= 2
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
        event.preventDefault()
        touchConsumed = true
        showIntro()
      }
    }
    const onTouchEnd = () => { touchStart = null; touchConsumed = false }

    scrollArea.addEventListener('wheel', onWheel, { passive: false })
    scrollArea.addEventListener('touchstart', onTouchStart, { passive: true })
    scrollArea.addEventListener('touchmove', onTouchMove, { passive: false })
    scrollArea.addEventListener('touchend', onTouchEnd)
    scrollArea.addEventListener('touchcancel', onTouchEnd)
    return () => {
      scrollArea.removeEventListener('wheel', onWheel)
      scrollArea.removeEventListener('touchstart', onTouchStart)
      scrollArea.removeEventListener('touchmove', onTouchMove)
      scrollArea.removeEventListener('touchend', onTouchEnd)
      scrollArea.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])
}
