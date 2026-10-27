import { useEffect } from 'react'
import { getPageStops, nextPageStop, PageWheelGesture } from './pageScroll'

export function useDesktopPageScroll() {
  useEffect(() => {
    const area = document.getElementById('main')
    if (!area) return
    const desktop = window.matchMedia('(min-width: 1001px) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const panels = [
      ['#home', '.opening-pin'],
      ['#intro', '.intro-panel'],
      ['#about', '.about-section'],
      ...['works', 'playground', 'projects', 'customers', 'contact'].map(id => [`#${id}`, `#${id}`]),
    ].flatMap(([anchor, content]) => {
      const element = area.querySelector<HTMLElement>(anchor)
      const panel = area.querySelector<HTMLElement>(content)
      return element && panel ? [{ element, panel }] : []
    })
    let frame = 0
    let direction = 0
    const gesture = new PageWheelGesture()

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      direction = 0
      gesture.reset()
    }
    const stops = () => {
      const origin = area.getBoundingClientRect().top + area.clientTop
      return getPageStops(panels.map(({ element, panel }) => ({
        // Measure flow anchors, not sticky panels whose rectangles move.
        top: area.scrollTop + element.getBoundingClientRect().top - origin,
        height: panel.offsetHeight,
      })), area.clientHeight, area.scrollHeight - area.clientHeight)
    }
    const turnPage = (target: number, now: number) => {
      cancelAnimationFrame(frame)
      frame = 0
      const start = area.scrollTop
      if (reducedMotion.matches) {
        area.scrollTo({ top: target, behavior: 'instant' })
        return
      }
      const animate = (time: number) => {
        const progress = Math.min(1, (time - now) / 580)
        area.scrollTo({ top: start + (target - start) * (1 - (1 - progress) ** 3), behavior: 'instant' })
        frame = progress < 1 ? requestAnimationFrame(animate) : 0
      }
      frame = requestAnimationFrame(animate)
    }
    const onWheel = (event: WheelEvent) => {
      if (!desktop.matches || event.defaultPrevented || !event.cancelable || event.ctrlKey || event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.deltaY === 0 || document.querySelector('dialog[open]:not([data-inline-video])')) return
      // Textareas and any nested scrollable content keep their own input.
      let element = event.target instanceof Element ? event.target : null
      while (element && element !== area) {
        if (element.matches('[data-page-scroll="contained"]')) {
          stop()
          return
        }
        if (element.matches('input, textarea, select, [contenteditable]:not([contenteditable="false"])') ||
          (element.scrollHeight > element.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(element).overflowY))) return
        element = element.parentElement
      }
      const now = performance.now()
      const nextDirection = Math.sign(event.deltaY)
      event.preventDefault()
      const distance = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? area.clientHeight : 1)
      const newGesture = gesture.shouldTurn(distance, now)
      // No queued turns: a second input during this animation cannot fire later.
      if (!newGesture || (frame !== 0 && direction === nextDirection)) return
      direction = nextDirection
      const target = nextPageStop(stops(), area.scrollTop, direction)
      turnPage(target, now)
    }
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href^="#"]')) stop()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (!desktop.matches || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey ||
        (event.target instanceof Element && event.target.closest('input, textarea, select, button, a, [contenteditable], [data-page-scroll="contained"]')) ||
        document.querySelector('dialog[open]:not([data-inline-video])')) return
      const keys: Record<string, number> = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, ' ': event.shiftKey ? -1 : 1 }
      const keyDirection = keys[event.key]
      if (!keyDirection && event.key !== 'Home' && event.key !== 'End') return
      event.preventDefault()
      if (event.repeat && frame) return
      stop()
      const positions = stops()
      const target = event.key === 'Home' ? 0 : event.key === 'End' ? positions.at(-1)! : nextPageStop(positions, area.scrollTop, keyDirection)
      turnPage(target, performance.now())
    }

    // The fixed header belongs to the page too: wheel input over it must work.
    document.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', stop)
    area.addEventListener('touchstart', stop, { passive: true })
    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', stop)
    window.addEventListener('resize', stop)
    desktop.addEventListener('change', stop)
    reducedMotion.addEventListener('change', stop)
    return () => {
      stop()
      document.removeEventListener('wheel', onWheel)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', stop)
      area.removeEventListener('touchstart', stop)
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', stop)
      window.removeEventListener('resize', stop)
      desktop.removeEventListener('change', stop)
      reducedMotion.removeEventListener('change', stop)
    }
  }, [])
}
