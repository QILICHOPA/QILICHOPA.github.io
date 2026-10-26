# QILICHOPA.github.io

个人作品集展示网站，使用 React + TypeScript + Vite，部署到 GitHub Pages。

## 本地开发

推荐使用 Node.js 24（见 `.nvmrc`），最低支持 Node.js 22.12。

```bash
npm ci
npm run dev
```

访问终端输出的本地地址，默认是 http://localhost:5173。

```bash
npm run typecheck # 检查 TypeScript
npm run lint      # 使用 Oxlint 检查代码
npm run build     # 类型检查并构建到 dist/
npm run preview   # 本地预览生产构建
node --test tests/pageScroll.test.ts # 翻屏落点与手势识别回归检查
```

## 项目结构

```text
src/
  components/               # 作品卡片、详情弹窗、联系表单与装饰
  data/portfolio.ts          # 个人资料、图片、服务、作品与评价
  hooks/useScrollEffects.ts  # 滚动显现与卡片层叠
  App.tsx                    # 首屏、拼贴、服务、作品、评价与联系
  App.css                    # 首页样式和响应式布局
  index.css                  # 全局样式
  main.tsx                   # React 入口
public/                      # 静态资源
.github/workflows/deploy.yml # 自动构建和发布
```

## 替换作品集内容

- 编辑 `src/data/portfolio.ts` 中的 `profile`，替换姓名、介绍和头像路径。头像使用透明背景 PNG，图片放在 `public/images/` 中。
- 编辑 `gallery` 替换首屏下方的八张拼贴图片；编辑 `projects` 替换项目标题、说明和图片。每个项目的三张图片会排成一大两小的拼贴，点击按钮打开详情弹窗。填写可选 `href` 后，详情中显示外部作品链接。
- 编辑 `services` 和 `testimonials` 替换服务与评价。所有案例和评价都是示例，请替换为真实内容，并移除相应示例标签。
- `profile.email` 为空时，联系表单校验输入并复制留言；填写真实邮箱后，提交将打开预填内容的邮件草稿，由访客自行发送。GitHub Pages 没有表单后端，因此当前不会自动发送邮件。
- 编辑 `index.html`，更新网页标题、描述和语言；在 `public/` 中替换图标或添加作品资源。
- `public/` 下的资源在代码中可用 `${import.meta.env.BASE_URL}文件名` 引用；`src/` 下的资源可使用 `import`。

所有人物资料与作品都是初始化占位内容，发布正式作品集前请替换。

## 版式与动效

首页新增黑底钥匙串入口，原头像介绍与作品展示顺延到第二屏。`src/components/KeychainHero.tsx` 中配置金属扣和五个挂件的切图、连接点、尺寸与角度；样式位于同目录的 `KeychainHero.css`。切图来自用户提供的六张 PNG，原文件保存在 `public/images/keychain/`，仅在页面中通过 CSS 裁去透明留白。

钥匙串挂件从左到右为动态设计、IP 设计、视觉设计、AI、与我联系；从底到顶为动态设计与联系爱心同层、IP 设计、视觉设计、AI。钥匙串与五个挂件持续轻微摆动，挂件使用不同周期和相位。鼠标悬停在钥匙串上时，挂件向两侧进一步展开，移开后平滑收回；悬停单个挂件显示名称，点击可再次拨动。键盘聚焦也可展开，窄屏降低展开幅度并预留摆动空间。紫色爱心跳转到联系区。底部“向下探索”和顶部“关于我”跳转到 `#intro`，`#home` 指向新的钥匙串首屏。首版未接入作品分类筛选。窄屏调整钥匙串比例并隐藏侧边注释；开启“减少动态效果”时停用摆动。

前两屏使用覆盖式转场：第二屏沿原生滚动从下方覆盖钥匙串首屏，不额外设置停留距离；钥匙串同步缩小、变暗，个人介绍的标题、头像和说明依次显现。两屏统一纯黑背景，第二屏为直角。顶部导航固定显示，独立于首屏缩放和渐隐；内容与锚点预留导航高度。第二屏至少占满一个视口，文字较多时自然增高；之后继续正常浏览作品。结构与视觉样式位于 `src/components/OpeningTransition.css`，滚动进度统一在 `src/hooks/useScrollEffects.ts` 的动画帧中更新。开启“减少动态效果”时，取消首屏固定和滚动变换，保留顶部导航与全部内容。

Works 分类屏位于 About 后方，导航 `WORKS` 跳转到 `#works`。`src/components/WorksSection.tsx` 与同名 CSS 使用用户提供的透明 PNG，组成 PAD、MOBILE、WEB、MOTION 四个错位叠放的文件夹，保留大面积黑色留白；素材保存在 `public/images/works/`。点击分类后，文件夹分别切换为粉色、浅紫色、蓝色和亮紫色，标题变黑，对应的 2 / 2 / 1 / 2 张作品卡片从文件夹后方向上探出，多张卡片错峰出现。每次只展开一个分类，切换时自动收起上一项，再次点击当前分类可收起；支持键盘 Enter / Space，以及减少动态效果偏好。卡片本身暂不添加交互，原有示例项目仍在下方。

About 在宽度超过 1000px、视口高度至少 600px 的桌面窗口中固定占满导航下方的一屏。较矮窗口增加工作经历列宽，并随高度收紧字号、标题间距、照片尺寸与上下留白，保留全部工作经历；下一次翻屏直接进入 Works。手机与高度不足 600px 的窗口保留内容自然增高，保证文字完整可读。样式位于 `src/components/AboutSection.css`。

About 到 Works 延续前两屏的覆盖转场，About 内容同步缩小、变暗，文件夹依次进入。桌面端（宽度超过 1000px 且使用精细指针）通过 `useDesktopPageScroll` 统一整屏翻页：一次纵向滚轮手势在 580 毫秒内对齐下一屏，上滑回到上一屏；方向键、翻页键与空格也使用相同落点。落点根据实际导航下方的可用高度计算，较长章节增加分页与末尾阅读位置，介绍页头像随可用高度收缩。同一手势的惯性输入持续多久都只触发一次翻页；240 毫秒无输入，或惯性衰减后出现明确的新加速，才识别为下一次同向手势。小幅反向抖动不翻页，有意反向则可以立即中断；动画期间的同向输入不会排队到结束后执行。导航、拖动滚动条和调整窗口均可中断动画。手机与触摸操作保留原生连续滚动，表单和项目弹窗独立滚动。导航锚点保留平滑定位，开启“减少动态效果”时直接定位。

启动开发服务器后，可打开 `/tests/scroll-browser.html` 并点击 `Run scroll checks`。该测试页向真实页面发送定时滚轮事件流，检查三秒惯性不连翻、两次独立滑动、动画期间不排队、反向中断和小幅抖动，并采样停稳后的位置是否发生漂移；测试页不参与生产构建。

参考 [Pinterest 视频](https://ca.pinterest.com/pin/211174979561877/) 的版式：黑色超大标题与头像首屏、圆角彩色拼贴、浅色服务区、滚动层叠作品、双行评价滚动和浅色联系区。

头像是透明 PNG，通过 CSS 漂浮与鼠标跟随呈现立体感，替换为图片即可保留效果；当前未引入真实三维模型或 WebGL。项目卡片使用 sticky 定位与滚动缩放；服务可展开，评价滚动可暂停，项目弹窗支持 Escape 关闭。

桌面与手机使用不同的排版；系统开启“减少动态效果”时，自动关闭连续动画、头像偏转和滚动缩放。页面素材保存在本地，不依赖外部图片服务。素材来源与头像生成提示见 `public/images/ASSETS.md`。

移动适配以视口宽度判断，不依赖触屏检测：1000px 及以下使用双行导航和移动布局，四个导航入口始终显示。首屏钥匙串按可用视口缩放、居中；介绍区按内容自然增高，避免小屏压缩头像或裁切文字。600–1000px 宽且高度不超过 600px 时，介绍区采用图文并排；高度不超过 600px 的窄屏取消作品卡片粘滞，方便完整阅读。页面同时预留刘海、横屏两侧和底部安全区；表单保持 16px 输入字号，弹窗限制在可见视口内。

介绍区桌面端使用网格排版：标题独占一行，个人介绍、头像和 Contact Me 按钮分别占据三列，文字与按钮跟随可用列宽缩放，不再使用固定向上偏移。1001–1440px 的导航字号和间距随宽度调整；手机和平板的章节标题限制最大字号。所有宽度下，视口高度不超过 760px 时取消作品卡片粘滞；首屏钥匙串也随可用高度缩放，适配较矮的笔记本屏幕。

桌面布局以 **1920 × 1080** 为最大设计尺寸：页面容器最大宽 1920px，所有屏幕尺寸的内容区均占容器宽度的 90%，左右各留白 5%（1920px 下内容宽 1728px，两侧各 96px）。更宽的屏幕居中展示；整页高度由内容决定，可正常滚动。在 1920 × 1080 视口下，导航高 88px，首屏最小高 992px。1440px 及以上宽度使用大屏图片尺寸，1000px、680px 和 360px 断点继续适配较小屏幕；首屏标题居中，较短时拉开词间距，空间不足时自动缩小字号。

## 发布到 GitHub Pages

1. 在 [仓库 Pages 设置](https://github.com/QILICHOPA/QILICHOPA.github.io/settings/pages) 的 **Build and deployment → Source** 中选择 **GitHub Actions**。
2. 提交并推送项目到 `main` 分支。
3. 在仓库 **Actions** 页面查看 `Build and deploy portfolio` 工作流；成功后可访问 https://qilichopa.github.io/。

```bash
git add .
git commit -m "Initialize React TypeScript portfolio"
git push origin main
```

后续推送到 `main` 会自动更新网站。Pull Request 只构建检查，不发布；也可从 Actions 页面手动运行部署。

当前仓库是 `QILICHOPA.github.io` 用户站点，`vite.config.ts` 的 `base` 为 `/`。如果改成其他仓库的项目站点，需要改为 `/<仓库名>/`。部署配置参考 [Vite 官方 GitHub Pages 指南](https://vite.dev/guide/static-deploy.html#github-pages)。

首页采用锚点导航，无需额外路由配置。以后添加多个页面时，可使用 HashRouter，避免 GitHub Pages 刷新深层路径时返回 404。
