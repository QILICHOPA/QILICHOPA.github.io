import { asset } from '../data/portfolio'
import './AboutSection.css'

const designTools = [
  { name: 'Photoshop', image: 'photoshop' },
  { name: 'Figma', image: 'figma' },
  { name: 'Sketch', image: 'sketch' },
  { name: 'After Effects', image: 'after-effects' },
  { name: 'Principle', image: 'principle' },
  { name: 'Blender', image: 'blender' },
]

const experience = [
  {
    period: '2024--至今',
    company: '深圳晞星智能科技',
    role: 'UI 视觉设计师',
    summary: '负责 K12 教育产品英小伴平板端、小程序端整体 UI&UX 设计工作，独立承担产品视觉改版、新模块 0-1 搭建、IP 设计、界面动效、教师 / 家长小程序界面设计工作。',
    details: [
      '主导英小伴平板端 1.0-2.0 全量视觉改版，完成色彩、圆角、图标、组件规范搭建，重构首页、课程体系、练习模块等核心页面，输出完整设计规范文档，提升儿童用户易用性与品牌识别度。',
      '负责产品 IP 形象设计与全场景落地，完成猫头鹰、狐狸两套 IP 三视图、多情绪表情、延展物料，将 IP 融入弹窗、任务提示、成功反馈、空状态等全界面场景，强化品牌陪伴感。',
      '独立完成口语助教、自然拼读两大核心模块从 0-1 设计落地，结合少儿寓教于乐诉求，设计闯关地图、PK 对战、扭蛋抽题等游戏化交互玩法，优化学生自主练习体验。',
      '完成教师 & 家长端小程序界面设计，包含班级管理、作业管理、学生学情报告、数据统计看板等模块，兼顾教师办公效率与家长查看学情的使用场景。',
      '负责 app 内各种交互动效设计、平板开关机动画设计。',
    ],
  },
  {
    period: '2023.09--2024',
    company: '北京快手科技',
    role: '游戏运营设计（实习）',
    details: [
      '参与快手游戏运营侧和平精英、金铲铲、王者荣耀等游戏活动视觉物料、活动页面、弹窗、运营素材设计，理解业务运营诉求，输出符合游戏调性的视觉物料，协同运营落地。',
      '参与快手游戏直播间资源位设计、礼物视觉，以及挂件等。',
    ],
  },
]

export function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-layout shell">
        <div className="about-visual">
          <div className="about-portrait">
            <img className="about-folder-back" src={asset('about/folder-back.webp')} alt="" width="850" height="652" loading="lazy" />
            <img className="about-portrait-photo" src={asset('about/portrait.webp')} alt="张露丹的个人照片" width="574" height="771" loading="lazy" />
            <img className="about-folder-front" src={asset('about/folder-front.webp')} alt="" width="816" height="446" loading="lazy" />
          </div>
          <div className="about-toolbox" aria-label="常用设计软件">
            <ul className="about-tools">
              {designTools.map(({ name, image }) => (
                <li key={image}>
                  <img src={asset(`about/${image}.webp`)} alt="" width="60" height="60" loading="lazy" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
            <span className="about-tools-more">MORE...</span>
          </div>
        </div>
        <div className="about-copy">
          <h2 id="about-title">HI I’m 张露丹</h2>
          <div className="about-profile">
            <p>女/25/<a href="tel:18780679091">18780679091</a>/UIUX</p>
            <p>北京林业大学/数字媒体艺术</p>
          </div>
          <h3 className="about-experience-title">work experience</h3>
          <div className="about-experience">
            {experience.map(({ period, company, role, summary, details }) => (
              <article className="about-job" key={company}>
                <h4 className="about-job-heading">
                  <span className="about-job-period">{period}</span>
                  <span>{company}<span className="about-job-divider"> | </span>{role}</span>
                </h4>
                {summary && <p>{summary}</p>}
                <ol>{details.map((detail) => <li key={detail}>{detail}</li>)}</ol>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
