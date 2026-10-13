import type { CSSProperties } from 'react'
import type { Project } from '../data/portfolio'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <article className="stack-card" style={{ '--card-index': index } as CSSProperties}>
      <header className="project-header">
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        <div><h3>{project.title}</h3><p>{project.category}</p></div>
        <button className="outline-button" onClick={() => onOpen(project)} aria-label={`查看项目 ${project.title}`}>查看作品 <span aria-hidden="true">↗</span></button>
      </header>
      <div className="project-images">
        {project.images.map((image, imageIndex) => <img key={`${image.src}-${imageIndex}`} src={image.src} alt={image.alt} loading="lazy" width="1400" height="875" />)}
      </div>
      <div className="project-footer"><span>概念作品 / 示例项目</span><span>{project.year}</span></div>
    </article>
  )
}
