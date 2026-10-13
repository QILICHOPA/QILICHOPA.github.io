import { useEffect } from 'react'

// 长标题缩小字号，短标题拉开词间距，保持单行并铺满内容区。
export function useFitHeadline(name: string) {
  useEffect(() => {
    const title = document.getElementById('hero-title')
    if (!title) return
    let active = true
    const fit = () => {
      if (!active || !title.clientWidth) return
      title.style.fontSize = ''
      title.style.wordSpacing = '0px'
      const range = document.createRange()
      range.selectNodeContents(title)
      const width = range.getBoundingClientRect().width
      if (width > title.clientWidth) {
        const size = parseFloat(getComputedStyle(title).fontSize)
        title.style.fontSize = `${size * title.clientWidth / width}px`
      }
      const gaps = (title.textContent?.trim().split(/\s+/).length ?? 0) - 1
      if (gaps > 0) {
        const remaining = Math.max(0, title.clientWidth - range.getBoundingClientRect().width)
        title.style.wordSpacing = `${remaining / gaps}px`
      }
    }
    fit()
    // Re-measure after the custom font loads and whenever the container changes.
    void document.fonts.ready.then(fit)
    const observer = new ResizeObserver(fit)
    observer.observe(title)
    window.addEventListener('resize', fit)
    return () => {
      active = false
      observer.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [name])
}
