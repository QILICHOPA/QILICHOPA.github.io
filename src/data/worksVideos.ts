export const worksVideos = {
  'motion-showreel': {
    title: '际遇 SHOWREEL',
    file: 'motion-showreel.mp4',
    width: 1280,
    height: 720,
    description: '际遇动态设计作品，时长约 63 秒',
  },
  'motion-compilation': {
    title: '英小伴动效合集',
    file: 'motion-compilation.mp4',
    width: 1938,
    height: 1680,
    description: '英小伴动效合集，时长约 82 秒',
  },
} as const

export type WorksVideoKey = keyof typeof worksVideos

export function hasWorksVideo(key: string): key is WorksVideoKey {
  return Object.hasOwn(worksVideos, key)
}
