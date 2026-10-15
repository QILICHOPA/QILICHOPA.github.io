import { useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import './KeychainHero.css'

type CutoutAsset = {
  file: string
  sourceWidth: number
  sourceHeight: number
  frame: [number, number, number, number]
}

type Charm = CutoutAsset & {
  id: string
  label: string
  english: string
  color: string
  width: number
  anchor: [number, number]
  pin: [number, number]
  angle: number
  spread: number
  layer: number
  silhouette: string
}

// Keep the supplied PNGs untouched and fully visible. These frames define the
// positioning coordinates so pendants rotate around their metal connectors.
const clasp: CutoutAsset = {
  file: 'clasp.png', sourceWidth: 802, sourceHeight: 820,
  frame: [242, 32, 320, 749],
}

const charms: Charm[] = [
  {
    id: 'motion', label: '动态设计', english: 'MOTION DESIGN', color: '#c7dce0',
    file: 'motion.png', sourceWidth: 543, sourceHeight: 705, frame: [28, 160, 483, 507],
    width: 268, anchor: [367, 316], pin: [0.977, 0.016], angle: 0, spread: 14, layer: 1,
    silhouette: 'polygon(98% 0, 100% 3%, 67% 25%, 79% 29%, 80% 37%, 44% 100%, 0 84%, 0 77%, 36% 6%, 61% 17%)',
  },
  {
    id: 'ip', label: 'IP 设计', english: 'CHARACTER DESIGN', color: '#ffdf26',
    file: 'ip.png', sourceWidth: 702, sourceHeight: 858, frame: [75, 60, 604, 701],
    width: 272, anchor: [383, 327], pin: [0.95, 0.01], angle: 0, spread: 8, layer: 2,
    silhouette: 'polygon(94% 0, 98% 0, 67% 28%, 100% 92%, 98% 100%, 3% 76%, 0 69%, 60% 25%, 62% 20%)',
  },
  {
    id: 'visual', label: '视觉设计', english: 'VISUAL DESIGN', color: '#e7edf0',
    file: 'visual.png', sourceWidth: 1195, sourceHeight: 1194, frame: [414, 69, 457, 978],
    width: 177, anchor: [404, 336], pin: [0.569, 0.004], angle: 0, spread: -3, layer: 3,
    silhouette: 'polygon(54% 0, 61% 0, 63% 18%, 87% 20%, 100% 27%, 100% 36%, 54% 96%, 41% 100%, 18% 99%, 0 92%, 0 84%, 39% 22%, 55% 19%)',
  },
  {
    id: 'ai', label: 'AI 创作', english: 'AI EXPLORATION', color: '#ffde21',
    file: 'ai.png', sourceWidth: 998, sourceHeight: 892, frame: [311, 152, 549, 601],
    width: 265, anchor: [423, 327], pin: [0.035, 0.013], angle: 0, spread: -12, layer: 4,
    silhouette: 'polygon(0 0, 5% 0, 18% 32%, 30% 19%, 75% 16%, 100% 32%, 100% 74%, 63% 100%, 25% 100%, 5% 78%, 0 53%, 13% 40%)',
  },
  {
    id: 'heart', label: '与我联系', english: 'LET’S CONNECT', color: '#bd80ff',
    file: 'heart.png', sourceWidth: 689, sourceHeight: 787, frame: [75, 253, 470, 374],
    width: 244, anchor: [446, 301], pin: [0.015, 0.104], angle: 0, spread: -18, layer: 1,
    silhouette: 'polygon(0 7%, 5% 6%, 40% 29%, 62% 0, 83% 0, 100% 30%, 100% 82%, 80% 100%, 43% 94%, 23% 73%, 24% 50%)',
  },
]

function Cutout({ asset, priority = false }: { asset: CutoutAsset; priority?: boolean }) {
  const [x, y, width, height] = asset.frame
  return (
    <span className="keychain-cutout" style={{ aspectRatio: `${width} / ${height}` }}>
      <img
        src={`${import.meta.env.BASE_URL}images/keychain/${asset.file}`}
        alt=""
        width={asset.sourceWidth}
        height={asset.sourceHeight}
        draggable={false}
        fetchPriority={priority ? 'high' : undefined}
        style={{
          width: `${asset.sourceWidth / width * 100}%`,
          left: `${-x / width * 100}%`,
          top: `${-y / height * 100}%`,
        }}
      />
    </span>
  )
}

function nudge(event: MouseEvent<HTMLButtonElement>) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const swing = event.currentTarget.closest('.keychain-charm')?.querySelector('.charm-swing')
  swing?.getAnimations().forEach((animation) => animation.cancel())
  swing?.animate([
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-7deg)', offset: 0.18 },
    { transform: 'rotate(5deg)', offset: 0.4 },
    { transform: 'rotate(-2deg)', offset: 0.65 },
    { transform: 'rotate(0deg)' },
  ], { duration: 1400, easing: 'ease-in-out' })
}

export function KeychainHero() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="keychain-hero" aria-labelledby="keychain-title">
      <div className="keychain-scene">
        <p className="keychain-side-note"><span>A COLLECTION OF VISUAL WORKS</span></p>
        <div className="keychain-art" role="group" aria-label="由金属扣与五个设计挂件组成的钥匙串，点击挂件可轻轻拨动，爱心通往联系方式">
          <div className="keychain-rig">
          <div className="keychain-clasp" aria-hidden="true"><Cutout asset={clasp} priority /></div>
          {charms.map((charm, index) => {
            const height = charm.width * charm.frame[3] / charm.frame[2]
            const style = {
              width: `${charm.width / 8}%`,
              left: `${(charm.anchor[0] - charm.width * charm.pin[0]) / 8}%`,
              top: `${(charm.anchor[1] - height * charm.pin[1]) / 8}%`,
              '--charm-origin': `${charm.pin[0] * 100}% ${charm.pin[1] * 100}%`,
              '--charm-angle': `${charm.angle}deg`,
              '--charm-spread': `${charm.spread}deg`,
              '--charm-period': `${4.4 + index * 0.37}s`,
              '--charm-phase': `${-index * 0.83}s`,
              '--charm-delay': `${index * 0.11 + 0.15}s`,
              '--charm-layer': charm.layer,
              '--charm-shape': charm.silhouette,
            } as CSSProperties
            const interaction = {
              onPointerEnter: () => setActive(charm.id),
              onPointerLeave: () => setActive(null),
              onFocus: () => setActive(charm.id),
              onBlur: () => setActive(null),
            }
            return (
              <div key={charm.id} className={`keychain-charm charm-${charm.id}${active === charm.id ? ' is-active' : ''}`} style={style}>
                <span className="charm-swing">
                  <span className="charm-idle">
                  {charm.id === 'heart' ? (
                    <a className="charm-control" href="#contact" aria-label="紫色爱心：与我联系" {...interaction}>
                      <Cutout asset={charm} />
                    </a>
                  ) : (
                    <button className="charm-control" type="button" aria-label={`轻拨${charm.label}挂件`} {...interaction} onClick={(event) => { setActive(charm.id); nudge(event) }}>
                      <Cutout asset={charm} />
                    </button>
                  )}
                  </span>
                </span>
              </div>
            )
          })}
          </div>
        </div>
        <p className="keychain-edition"><span>2024  — 2026</span></p>
      </div>
    </section>
  )
}
