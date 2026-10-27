import { useState } from 'react'
import { asset } from '../data/portfolio'
import { hasWorksDetail } from '../data/worksDetails'
import type { WorksDetailKey } from '../data/worksDetails'
import { WorksProjectDetail } from './WorksProjectDetail'
import { WorksVideoDetail } from './WorksVideoDetail'
import './WorksSection.css'

const folders = [
  {
    name: 'PAD', key: 'pad', width: 2294, height: 850,
    previews: [
      { key: 'pad-k12', alt: 'K12教育产品：英小伴', width: 880, height: 1057 },
      { key: 'pad-preschool', alt: '幼儿英语产品：英小芽', width: 843, height: 1014 },
    ],
  },
  {
    name: 'MOBILE', key: 'mobile', width: 1544, height: 974,
    previews: [
      { key: 'mobile-social', alt: '社交app视觉升级：际遇', width: 880, height: 1057 },
      { key: 'mobile-membership', alt: '会员体系0-1：即遇', width: 943, height: 1098 },
    ],
  },
  {
    name: 'WEB', key: 'web', width: 1920, height: 426,
    previews: [
      { key: 'web-scrm', alt: '健身课程管理平台：SCRM', width: 880, height: 1057 },
    ],
  },
  {
    name: 'MOTION', key: 'motion', width: 1918, height: 554,
    previews: [
      { key: 'motion-showreel', alt: '际遇SHOWREEL：动态视频', width: 813, height: 1009 },
      { key: 'motion-compilation', alt: '英小伴动效合集：还没放图', width: 899, height: 1070 },
    ],
  },
] as const

type DetailKey = WorksDetailKey | 'motion-showreel'
const hasDetail = (key: string): key is DetailKey => key === 'motion-showreel' || hasWorksDetail(key)

export function WorksSection() {
  const [expandedFolder, setExpandedFolder] = useState<typeof folders[number]['key'] | null>(null)
  const [selectedProject, setSelectedProject] = useState<DetailKey | null>(null)

  const closeDetail = () => {
    const triggerId = `open-${selectedProject}`
    setSelectedProject(null)
    requestAnimationFrame(() => document.getElementById(triggerId)?.focus({ preventScroll: true }))
  }

  return (
    <section id="works" className="works-section" aria-label="Works 作品分类">
      {selectedProject === 'motion-showreel' ? <WorksVideoDetail onClose={closeDetail} /> : selectedProject && <WorksProjectDetail key={selectedProject} projectKey={selectedProject} onClose={closeDetail} />}
      <div className="works-folders" hidden={selectedProject !== null}>
        {folders.map(({ name, key, width, height, previews }, index) => (
          <article className={`works-folder works-folder-${key}${expandedFolder === key ? ' is-expanded' : ''}`} key={key}>
            <div id={`${key}-previews`} className="works-previews" aria-hidden={expandedFolder !== key}>
              {previews.map(preview => hasDetail(preview.key) ? (
                <button id={`open-${preview.key}`} className={`works-preview works-preview-link works-preview-${preview.key}`} key={preview.key} type="button" aria-label={`查看 ${preview.alt}完整作品`} onClick={() => {
                  if (hasDetail(preview.key)) setSelectedProject(preview.key)
                }}>
                  <img src={asset(`works/${preview.key}.png`)} alt={preview.alt} width={preview.width} height={preview.height} draggable={false} />
                </button>
              ) : (
                <img className={`works-preview works-preview-${preview.key}`} key={preview.key} src={asset(`works/${preview.key}.png`)} alt={preview.alt} width={preview.width} height={preview.height} draggable={false} />
              ))}
            </div>
            <img src={asset(`works/folder-${key}.png`)} alt="" width={width} height={height} loading="lazy" />
            <img className="works-folder-active" src={asset(`works/folder-${key}-active.png`)} alt="" width={width} height={height} />
            <h2>
              <button className="works-folder-toggle" type="button" aria-expanded={expandedFolder === key} aria-controls={`${key}-previews`} onClick={() => setExpandedFolder(expanded => expanded === key ? null : key)}>
                <span>{String(index + 1).padStart(2, '0')}</span> {name}
              </button>
            </h2>
          </article>
        ))}
      </div>
    </section>
  )
}
