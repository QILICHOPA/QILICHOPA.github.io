import { useState } from 'react'
import { ChromeStar } from './components/ChromeStar'
import { ContactForm } from './components/ContactForm'
import { ProjectCard } from './components/ProjectCard'
import { ProjectDialog } from './components/ProjectDialog'
import { KeychainHero } from './components/KeychainHero'
import { AboutSection } from './components/AboutSection'
import { WorksSection } from './components/WorksSection'
import { asset, gallery, profile, projects, testimonials } from './data/portfolio'
import type { Project } from './data/portfolio'
import { useScrollEffects } from './hooks/useScrollEffects'
import { useFitHeadline } from './hooks/useFitHeadline'
import { useDesktopPageScroll } from './hooks/useDesktopPageScroll'
import { navigationItems, useActiveNavigation } from './hooks/useActiveNavigation'
import './App.css'
import './components/OpeningTransition.css'

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [paused, setPaused] = useState(false)
  const { activeId, selectTab } = useActiveNavigation()
  useScrollEffects()
  useDesktopPageScroll()
  useFitHeadline(profile.name)

  return (
    <>
      <a className="skip-link" href="#main">跳转到主要内容</a>
      <header className="site-header entry-header shell">
        <a className="wordmark" href="#home" aria-label="返回首页">{profile.name.toUpperCase()} WORKSPACE</a>
        <nav aria-label="主导航">{navigationItems.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={activeId === id ? 'location' : undefined} onClick={() => selectTab(id)}><span>{label}</span></a>)}</nav>
      </header>
      <main id="main" tabIndex={-1}>
        <div id="home" className="opening-sequence">
          <div className="opening-pin">
            <div className="opening-visual">
              <KeychainHero />
            </div>
          </div>
          <div id="intro" className="intro-stage">
            <section className="intro-panel" aria-labelledby="hero-title">
              <div className="hero shell">
                <h2 id="hero-title">HI, I'M {profile.name.toUpperCase()}</h2>
                <div className="hero-side hero-copy"><p>{profile.introduction}</p></div>

                <div className="avatar-stage"><div className="intro-avatar-reveal"><div className="avatar-float"><img className="avatar-image" src={profile.avatar} alt="创作者的三维风格头像" width="1254" height="1254" loading="lazy" /></div></div></div>
                <div className="hero-side hero-contact"><a className="contact-image-button" href="#contact"><img src={asset('contact-button.png')} alt="CONTACT ME" width="340" height="96" /></a></div>
              </div>
            </section>
            <div id="about" className="about-stage">
              <AboutSection />
              <WorksSection />
            </div>
          </div>
        </div>

        <section id="playground" className="playground shell" aria-label="作品视觉拼贴">
          <div className="section-kicker reveal"><span>VISUAL PLAYGROUND</span><span>一些视觉实验</span></div>
          <div className="gallery-grid">{gallery.map((image, index) => <div className="gallery-tile reveal" key={`${image.src}-${index}`}><img src={image.src} alt={image.alt} style={{ objectPosition: image.position }} loading="lazy" width="700" height="500" /></div>)}</div>
        </section>

        <section id="projects" className="projects-section shell" aria-labelledby="projects-title">
          <div className="section-kicker reveal"><span>精选作品 / 02</span><span>概念作品集</span></div>
          <h2 id="projects-title" className="display-title reveal">精选<br /><span className="outlined-type">作品</span></h2>
          <div className="project-stack">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />)}</div>
        </section>

        <section id="customers" className="feedback-section" data-paused={paused} aria-labelledby="feedback-title">
          <div className="shell feedback-heading"><div><p className="eyebrow">听听合作伙伴怎么说</p><h2 id="feedback-title" className="display-title">合作反馈</h2></div><button className="motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? '播放评价滚动 ▶' : '暂停评价滚动 Ⅱ'}</button></div>
          {[0, 1].map((row) => <div className={`testimonial-rail rail-${row}`} key={row}><div className="testimonial-track">{[...testimonials, ...testimonials].map((item, index) => <article className="testimonial" key={`${row}-${index}`} aria-hidden={index >= testimonials.length || row === 1 ? true : undefined}><p className="testimonial-label">示例评价</p><p className="testimonial-quote">{item.quote}</p><div className="testimonial-person"><span className={`initial-avatar ${item.color}`}>{item.initials}</span><div><h3>{item.name}</h3><p>{item.role}</p></div><span className="quote-mark" aria-hidden="true">”</span></div></article>)}</div></div>)}
        </section>

        <section id="contact" className="contact-section light-panel" aria-labelledby="contact-title">
          <div className="shell contact-inner"><ChromeStar /><div className="contact-copy reveal"><p className="eyebrow">有个想法想聊聊？</p><h2 id="contact-title" className="display-title">一起<br />聊聊<br />创意</h2>{profile.email ? <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} ↗</a> : <p className="contact-email">好创意，从一句你好开始。</p>}<div className="purple-orb" aria-hidden="true" /></div><ContactForm /></div>
          <footer className="site-footer shell"><span>© {new Date().getFullYear()} {profile.name.toUpperCase()} · 示例作品集</span><a href="#home">返回顶部 ↑</a></footer>
        </section>
      </main>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

export default App
