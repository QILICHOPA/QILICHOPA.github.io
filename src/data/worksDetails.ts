import k12Slides from './k12Slides.json'
import socialSlides from './mobile-socialSlides.json'
import membershipSlides from './mobile-membershipSlides.json'
import webSlides from './web-scrmSlides.json'

export const worksDetails = {
  'pad-k12': {
    number: '01', category: 'PAD', title: 'K12教育产品',
    slides: k12Slides, edge: null,
  },
  'mobile-social': {
    number: '02', category: 'MOBILE', title: '社交app视觉升级',
    slides: socialSlides, edge: 'works/mobile-detail-edge.png',
  },
  'mobile-membership': {
    number: '02', category: 'MOBILE', title: '会员体系0–1',
    slides: membershipSlides, edge: 'works/mobile-detail-edge.png',
  },
  'web-scrm': {
    number: '03', category: 'WEB', title: '健身课程管理平台 SCRM',
    slides: webSlides, edge: 'works/web-detail-edge.png',
  },
} as const

export type WorksDetailKey = keyof typeof worksDetails

export function hasWorksDetail(key: string): key is WorksDetailKey {
  return Object.hasOwn(worksDetails, key)
}
