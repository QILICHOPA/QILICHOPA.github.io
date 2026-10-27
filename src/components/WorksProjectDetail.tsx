import { useEffect, useRef, useState } from 'react'
import { asset } from '../data/portfolio'
import { worksDetails } from '../data/worksDetails'
import type { WorksDetailKey } from '../data/worksDetails'
import './WorksProjectDetail.css'

export function WorksProjectDetail({ projectKey, onClose }: { projectKey: WorksDetailKey; onClose: () => void }) {
  const { number, category, title, slides, edge } = worksDetails[projectKey]
  const galleryRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState({ offset: 0, visible: 1, hasMore: false })

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return
    gallery.closest('section')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    gallery.focus({ preventScroll: true })
    const updateProgress = () => {
      setProgress({
        offset: gallery.scrollTop / Math.max(1, gallery.scrollHeight - gallery.clientHeight),
        visible: Math.min(1, gallery.clientHeight / Math.max(1, gallery.scrollHeight)),
        hasMore: gallery.scrollHeight - gallery.clientHeight - gallery.scrollTop > 2,
      })
    }
    const observer = new ResizeObserver(updateProgress)
    observer.observe(gallery)
    updateProgress()
    gallery.addEventListener('scroll', updateProgress, { passive: true })
    return () => {
      observer.disconnect()
      gallery.removeEventListener('scroll', updateProgress)
    }
  }, [])

  const thumbHeight = Math.max(8, progress.visible * 100)

  return (
    <div className={`works-detail works-detail-${category.toLowerCase()}`} onKeyDown={event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }}>
      <aside className="works-detail-side">
        <h2 id="works-detail-title"><span>{number}</span><span className="works-detail-category">{category === 'MOBILE' ? <>MOB<br />ILE</> : category}</span></h2>
        <button type="button" className="works-detail-back" onClick={onClose} aria-label="返回作品分类" title="返回作品分类（Esc）">
          <span className="works-detail-back-symbol" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M25 24v-7a7 7 0 0 0-7-7H7" /><path d="m13 4-6 6 6 6" /></svg>
          </span>
          <span className="works-detail-back-label">BACK</span>
        </button>
      </aside>
      <div ref={galleryRef} className="works-detail-gallery" role="region" aria-label={`${title}，完整作品图片，可上下滚动浏览`} tabIndex={0} data-page-scroll="contained">
        {slides.map((slide, index) => (
          <img key={slide.file} src={asset(`works/${projectKey}/${slide.file}`)} alt={`${title}设计展示 ${index + 1} / ${slides.length}`} width={slide.width} height={slide.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
        ))}
        <footer className="works-detail-copyright">Copyright © 2026 张露丹</footer>
      </div>
      <div className="works-detail-progress" aria-hidden="true">
        <span style={{ height: `${thumbHeight}%`, top: `${progress.offset * (100 - thumbHeight)}%` }} />
      </div>
      {edge ? <img className="works-detail-folder-edge" src={asset(edge)} width={3840} height={253} alt="" draggable={false} /> : <svg className="works-detail-folder-edge" viewBox="0 0 1920 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90V22Q0 0 22 0H438Q446 0 454 5L520 43Q528 48 540 48H1888Q1920 48 1920 80V90Z" fill="#fa83ff" />
      </svg>}
      <div className="works-detail-scroll-hint" data-visible={progress.hasMore} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 7 7 7 7-7M5 13l7 7 7-7" /></svg>
      </div>
    </div>
  )
}
