import { useEffect, useRef, useState } from 'react'

export const navigationItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'works', label: 'WORKS' },
  { id: 'contact', label: 'CONTACT' },
] as const

type NavigationId = typeof navigationItems[number]['id']

export function useActiveNavigation() {
  const [activeId, setActiveId] = useState<NavigationId>('home')
  const pending = useRef<{ id: NavigationId; until: number } | null>(null)

  useEffect(() => {
    const scrollArea = document.getElementById('main')
    if (!scrollArea) return
    let frame = 0
    const update = () => {
      frame = 0
      const threshold = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 0) + 24
      const sections = navigationItems.flatMap(({ id }) => {
        const section = document.getElementById(id)
        return section ? [{ id, top: section.getBoundingClientRect().top }] : []
      }).sort((a, b) => a.top - b.top)
      const atBottom = scrollArea.scrollTop > 0 && scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 2

      if (pending.current) {
        const target = sections.find(({ id }) => id === pending.current?.id)
        if (!atBottom && performance.now() < pending.current.until && target && (target.top < -24 || target.top > threshold)) return
        pending.current = null
      }

      const current = atBottom ? sections.at(-1) : sections.filter(({ top }) => top <= threshold).at(-1)
      setActiveId(current?.id ?? 'home')
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    scrollArea.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    const initialTarget = document.getElementById(window.location.hash.slice(1))
    if (initialTarget && initialTarget !== scrollArea && scrollArea.contains(initialTarget)) {
      initialTarget.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    update()
    return () => {
      cancelAnimationFrame(frame)
      scrollArea.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
    }
  }, [])

  const selectTab = (id: NavigationId) => {
    pending.current = { id, until: performance.now() + 1500 }
    setActiveId(id)
  }

  return { activeId, selectTab }
}
