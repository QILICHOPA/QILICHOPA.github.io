import { useEffect, useRef, useState } from 'react'
import { asset } from '../data/portfolio'
import './WorksProjectDetail.css'
import './WorksVideoDetail.css'

const formatTime = (seconds: number) => {
  const time = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0))
  return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`
}

export function WorksVideoDetail({ onClose }: { onClose: () => void }) {
  const detailRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playRef = useRef<HTMLButtonElement>(null)
  const expandRef = useRef<HTMLButtonElement>(null)
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const seekingRef = useRef(false)
  const keyboardRef = useRef(false)
  const [controlsVisible, setControlsVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState('')

  const hideControls = () => {
    const controls = playerRef.current?.querySelector('.works-video-controls')
    if (!seekingRef.current && !(keyboardRef.current && controls?.contains(document.activeElement))) setControlsVisible(false)
  }

  const revealControls = () => {
    clearTimeout(controlsTimer.current)
    setControlsVisible(true)
    controlsTimer.current = setTimeout(hideControls, 2500)
  }

  useEffect(() => {
    const finishSeeking = () => {
      if (!seekingRef.current) return
      seekingRef.current = false
      revealControls()
    }
    window.addEventListener('pointerup', finishSeeking)
    window.addEventListener('pointercancel', finishSeeking)
    return () => {
      clearTimeout(controlsTimer.current)
      window.removeEventListener('pointerup', finishSeeking)
      window.removeEventListener('pointercancel', finishSeeking)
    }
  }, [])

  useEffect(() => {
    const section = detailRef.current?.closest('section')
    const video = videoRef.current
    const player = playerRef.current
    section?.scrollIntoView({ behavior: 'instant', block: 'start' })
    player?.show()
    playRef.current?.focus({ preventScroll: true })
    revealControls()
    const main = document.getElementById('main')
    const pauseWhenOutside = () => {
      if (!section || !main || player?.matches(':modal')) return
      const bounds = section.getBoundingClientRect()
      const viewport = main.getBoundingClientRect()
      // Anchors leave 20px of the previous section visible above the next one.
      if (bounds.bottom <= viewport.top + 24 || bounds.top >= viewport.bottom - 24) video?.pause()
    }
    main?.addEventListener('scroll', pauseWhenOutside, { passive: true })
    window.addEventListener('resize', pauseWhenOutside)
    const pauseWhenHidden = () => { if (document.hidden) video?.pause() }
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => {
      main?.removeEventListener('scroll', pauseWhenOutside)
      window.removeEventListener('resize', pauseWhenOutside)
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      video?.pause()
      player?.close()
    }
  }, [])

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return
    if (!video.paused) { video.pause(); return }
    setError('')
    try {
      await video.play()
    } catch (cause) {
      if (!(cause instanceof DOMException && cause.name === 'AbortError')) setError('视频暂时无法播放，请重试。')
    }
  }

  const expand = () => {
    const player = playerRef.current
    if (!player) return
    player.close()
    player.showModal()
    setExpanded(true)
  }

  const collapse = () => {
    const player = playerRef.current
    if (!player) return
    player.close()
    player.show()
    setExpanded(false)
    expandRef.current?.focus({ preventScroll: true })
  }

  return (
    <div ref={detailRef} className="works-detail works-detail-motion" onKeyDown={event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (playerRef.current?.matches(':modal')) collapse()
        else onClose()
      }
    }}>
      <aside className="works-detail-side">
        <h2><span>04</span><span className="works-detail-category">MOT<br />ION</span></h2>
        <button type="button" className="works-detail-back" onClick={onClose} aria-label="返回作品分类" title="返回作品分类（Esc）">
          <span className="works-detail-back-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M25 24v-7a7 7 0 0 0-7-7H7" /><path d="m13 4-6 6 6 6" /></svg></span>
          <span className="works-detail-back-label">BACK</span>
        </button>
      </aside>
      <div className="works-video-layout">
        <div className="works-video-slot">
          <dialog ref={playerRef} className={`works-video-player${expanded ? ' is-expanded' : ''}${playing ? ' is-playing' : ''}${started ? ' has-started' : ''}${controlsVisible ? ' controls-visible' : ''}`} data-inline-video={expanded ? undefined : 'true'} data-page-scroll="contained" role={expanded ? 'dialog' : 'region'} aria-label="际遇 SHOWREEL 视频播放器" aria-modal={expanded ? true : undefined} onPointerEnter={revealControls} onPointerMove={revealControls} onPointerDown={() => { keyboardRef.current = false; revealControls() }} onPointerLeave={hideControls} onFocusCapture={revealControls} onBlurCapture={revealControls} onCancel={event => { event.preventDefault(); collapse() }} onKeyDown={event => {
            keyboardRef.current = true
            revealControls()
            if ((event.target as HTMLElement).closest('button, input') || event.altKey || event.ctrlKey || event.metaKey) return
            if (event.key === ' ' || event.key === 'k') {
              event.preventDefault()
              void togglePlayback()
            }
          }}>
            <video ref={videoRef} src={`${import.meta.env.BASE_URL}videos/motion-showreel.mp4`} width={1280} height={720} playsInline preload="metadata" aria-label="际遇动态设计作品，时长约 63 秒" onLoadedMetadata={event => setDuration(event.currentTarget.duration)} onDurationChange={event => setDuration(event.currentTarget.duration)} onTimeUpdate={event => setTime(event.currentTarget.currentTime)} onPlay={() => { setPlaying(true); setStarted(true) }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError('视频加载失败，请刷新页面重试。')} />
            <button ref={playRef} type="button" className="works-video-toggle" aria-label={playing ? '暂停视频' : '播放视频'} onClick={() => void togglePlayback()}>
              {playing ? <span className="works-video-pause" aria-hidden="true" /> : <img src={asset('works/motion/play.png')} width={140} height={140} alt="" draggable={false} />}
            </button>
            {expanded && <button type="button" className="works-video-return" onClick={collapse}><img src={asset('works/motion/back.png')} width={68} height={68} alt="" />返回</button>}
            <div className="works-video-controls">
              <span className="works-video-time">{formatTime(time)}</span>
              <input className="works-video-seek" type="range" min={0} max={Number.isFinite(duration) && duration > 0 ? duration : 1} step={0.1} value={time} disabled={!duration || !Number.isFinite(duration)} aria-label="视频播放进度" aria-valuetext={`${formatTime(time)} / ${formatTime(duration)}`} style={{ background: `linear-gradient(to right, currentColor ${duration ? time / duration * 100 : 0}%, var(--video-track) ${duration ? time / duration * 100 : 0}%)` }} onPointerDown={() => { seekingRef.current = true }} onChange={event => {
                const video = videoRef.current
                if (!video) return
                const nextTime = Number(event.target.value)
                video.currentTime = nextTime
                setTime(nextTime)
                revealControls()
              }} />
              <span className="works-video-time">{formatTime(duration)}</span>
              <button ref={expandRef} type="button" className="works-video-expand" onClick={expanded ? collapse : expand} aria-label={expanded ? '缩小视频' : '放大视频'} title={expanded ? '缩小视频' : '放大视频'} aria-expanded={expanded}>
                {expanded ? <svg className="works-video-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true"><path d="m21 3-7 7m0-6v6h6M3 21l7-7m-6 0h6v6" /></svg> : <img src={asset('works/motion/expand.png')} width={64} height={64} alt="" draggable={false} />}
              </button>
            </div>
            {error && <p className="works-video-error" role="alert">{error}</p>}
          </dialog>
        </div>
      </div>
      <img className="works-detail-folder-edge" src={asset('works/motion-detail-edge.png')} width={3840} height={253} alt="" draggable={false} />
      <footer className="works-detail-copyright works-video-copyright">Copyright © 2026 张露丹</footer>
    </div>
  )
}
