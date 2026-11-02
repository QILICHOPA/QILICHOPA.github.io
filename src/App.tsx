import { ContactSection } from './components/ContactSection'
import { KeychainHero } from './components/KeychainHero'
import { AboutSection } from './components/AboutSection'
import { WorksSection } from './components/WorksSection'
import { asset, profile } from './data/portfolio'
import { useScrollEffects } from './hooks/useScrollEffects'
import { useFitHeadline } from './hooks/useFitHeadline'
import { useDesktopPageScroll } from './hooks/useDesktopPageScroll'
import { navigationItems, useActiveNavigation } from './hooks/useActiveNavigation'
import './App.css'
import './components/OpeningTransition.css'

function App() {
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

        <ContactSection />
      </main>
    </>
  )
}

export default App
