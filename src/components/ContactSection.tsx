import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { asset } from '../data/portfolio'
import './ContactSection.css'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const scrollArea = document.getElementById('main')
    if (!section || !scrollArea) return

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= .7)
    }, { root: scrollArea, threshold: [0, .7] })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section ref={sectionRef} id="contact" className="contact-permit-section" aria-labelledby="contact-title">
        <h2 id="contact-title" className="contact-accessible-copy">联系张露丹</h2>
        <p className="contact-accessible-copy">UI/UX DESIGNER。使用微信扫描工牌上的二维码，与我联系。</p>
        <img className="contact-folder" src={asset('contact/folder.png')} alt="" width="3840" height="1152" loading="lazy" draggable={false} />
      </section>
      {createPortal(
        // A viewport layer keeps the pivot at the screen's top edge, above the
        // fixed navigation and outside the main scrolling area's clipping.
        <div className={`contact-badge-layer${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
          <div className="contact-badge-hanger">
            <div className="contact-badge-swing">
              <img className="contact-badge-image" src={asset('contact/work-permit.png')} alt="张露丹的工牌：UI/UX DESIGNER，附微信联系二维码" width="1738" height="2606" draggable={false} />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
