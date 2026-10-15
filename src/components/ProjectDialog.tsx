import { useEffect, useRef } from 'react'
import type { Project } from '../data/portfolio'

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !project) return
    dialog.showModal()
    const scrollArea = document.getElementById('main')
    const previous = scrollArea?.style.overflow
    if (scrollArea) scrollArea.style.overflow = 'hidden'
    return () => {
      dialog.close()
      if (scrollArea) scrollArea.style.overflow = previous ?? ''
    }
  }, [project])

  return (
    <dialog className="project-dialog" ref={ref} onClose={onClose} aria-labelledby="dialog-title" onClick={(event) => { if (event.target === event.currentTarget) ref.current?.close() }}>
      {project && <div className="dialog-content">
        <button className="dialog-close" onClick={() => ref.current?.close()} aria-label="关闭项目详情">×</button>
        <p className="eyebrow">概念作品 / {project.year}</p>
        <h2 id="dialog-title">{project.title}</h2>
        <p className="dialog-category">{project.category}</p>
        <p className="dialog-description">{project.description}</p>
        {project.images.map((image, index) => <img key={`${image.src}-${index}`} src={image.src} alt={image.alt} loading="lazy" />)}
        {project.href && <a className="outline-button" href={project.href} target="_blank" rel="noopener noreferrer">访问作品 ↗</a>}
      </div>}
    </dialog>
  )
}
