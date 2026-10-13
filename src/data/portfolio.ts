// 将图片放入 public/images/，然后在此替换文件名与个人资料。
export const asset = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`

export const profile = {
  name: 'ZLD',
  role: '三维设计师与视觉创作者',
  introduction: '毕业于北京林业大学，23年于北京快手科技公司实习游戏运营设计岗位，24-26年就职于深圳晞星智能科技公司，担任UI设计师职位',
  about: '我将充满好奇的想法变成有趣的视觉作品，用想象力和细节，创造你未曾见过的画面。',
  avatar: asset('avatar.png'),
  email: '', // 填写真实邮箱后，联系表单会打开邮件草稿；为空时复制留言。
}

export const gallery = [
  { src: asset('liquid.jpg'), alt: '橙色与紫色的抽象流体', position: '20% 50%' },
  { src: asset('dream.jpg'), alt: '柔和的彩色抽象曲面', position: '50% 30%' },
  { src: asset('flow.jpg'), alt: '蓝绿色与红色立体飘带', position: '30% 50%' },
  { src: asset('ribbons.jpg'), alt: '粉紫色立体雕塑', position: '70% 50%' },
  { src: asset('dream.jpg'), alt: '抽象曲面的细节', position: '90% 70%' },
  { src: asset('ribbons.jpg'), alt: '立体飘带的细节', position: '20% 70%' },
  { src: asset('liquid.jpg'), alt: '彩色流体的细节', position: '80% 50%' },
  { src: asset('flow.jpg'), alt: '立体曲面的细节', position: '70% 80%' },
]

export const services = [
  { title: '三维设计与艺术指导', summary: '构建想象中的世界，带来真实的感染力。', detail: '从创意构思到三维视觉，用造型、材质和光影把想法变成独特的画面。这里可以替换为你的服务内容。', tags: ['三维插画', '艺术指导', '动态设计'] },
  { title: '品牌与视觉设计', summary: '让品牌个性，看得见。', detail: '为品牌建立鲜明的视觉语言，让每个细节表达同一个故事。这里可以补充你的创作流程与擅长领域。', tags: ['视觉识别', '营销活动设计', '创意指导'] },
  { title: '数字体验设计', summary: '值得探索，也值得记住。', detail: '把内容、视觉与交互连接起来，创造清晰、流畅且令人印象深刻的数字体验。这里可以填写实际服务范围。', tags: ['网页设计', '交互设计', '原型设计'] },
]

export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  images: { src: string; alt: string }[]
  href?: string
}

// 以下均为示例项目，不代表真实客户或真实工作经历。
export const projects: Project[] = [
  { id: 'chroma', title: '色彩之境', category: '三维插画 / 艺术指导', year: '2026', description: '示例项目 · 一场关于色彩、流动与形态的视觉探索。在这里替换项目背景、你的角色、设计过程和最终成果。', images: [gallery[0], gallery[1], gallery[3]] },
  { id: 'fluid', title: '流动形态', category: '视觉探索 / 动态设计', year: '2026', description: '示例项目 · 将抽象曲线变成富有生命力的视觉语言。在这里讲述你的创作故事，并展示实际作品。', images: [gallery[2], gallery[3], gallery[0]] },
  { id: 'daydream', title: '白日梦', category: '创意指导 / 数字艺术', year: '2026', description: '示例项目 · 用柔和的材质与大胆的构图，描绘一个充满想象力的世界。在这里介绍项目亮点与交付成果。', images: [gallery[1], gallery[0], gallery[2]] },
]

// 留白式评价示例。替换为获得授权的真实评价后，可移除“示例评价”。
export const testimonials = [
  { initials: '01', name: '客户姓名', role: '创意合作伙伴', quote: '在这里放一段合作伙伴的真实反馈，分享他们对作品和合作过程的感受。', color: 'lilac' },
  { initials: '02', name: '客户姓名', role: '项目合作伙伴', quote: '在这里放一段真实评价，让访客更了解你的创作方式、沟通与协作。', color: 'lime' },
  { initials: '03', name: '客户姓名', role: '品牌合作伙伴', quote: '在这里写下对方的原话，并补充姓名与身份。当前内容为示例评价。', color: 'pink' },
]
