# 可替换的占位素材

当前所有图片用于作品集初始化示例，人物、项目和评价均非真实资料。

| 文件 | 来源 |
| --- | --- |
| `avatar.png` | 使用内置 ImageGen 生成的透明背景 3D 风格头像 |
| `ribbons.jpg` | [Milad Fakurian / Unsplash](https://unsplash.com/photos/a-close-up-of-a-colorful-object-on-a-black-background-KLnyXKDpcKo) |
| `flow.jpg` | [Faded Gallery / Unsplash](https://unsplash.com/photos/a-close-up-of-a-cell-phone-with-a-black-background-nEatfFMN1TU) |
| `liquid.jpg` | [Irene Demetri / Unsplash](https://unsplash.com/photos/a-purple-and-orange-liquid-swirl-background-1hs6wOdw3iw) |
| `dream.jpg` | [Unsplash 图片源](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe) |

替换时，将新素材放入此目录，并修改 `src/data/portfolio.ts`。头像建议使用正方形透明 PNG；作品建议使用高分辨率横向图片，CSS 会以 `object-fit: cover` 裁切展示。

## Works 文件夹切图

用户提供的原始透明 PNG，直接复制使用，保留原有颜色和轮廓：

| 文件 | 原始文件 |
| --- | --- |
| `works/folder-pad.png` | `Rectangle_3@2x.png` |
| `works/folder-mobile.png` | `Rectangle_4@2x.png` |
| `works/folder-web.png` | `Rectangle_3_1@2x.png` |
| `works/folder-motion.png` | `Rectangle_6@2x.png` |
| `works/folder-pad-active.png` | 点击后粉色状态的 `Rectangle_3@2x.png` |
| `works/pad-k12.png` | `Group_4@2x.png`，K12 教育产品卡片 |
| `works/pad-preschool.png` | `Group_5@2x.png`，幼儿英语产品卡片 |
| `works/folder-mobile-active.png` | `多个切图 (5)/Rectangle_4@2x.png`，MOBILE 浅紫色状态 |
| `works/mobile-social.png` | `多个切图 (5)/Group_4@2x.png`，社交 app 视觉升级 |
| `works/mobile-membership.png` | `多个切图 (5)/Group_5@2x.png`，会员体系 0-1 |
| `works/folder-web-active.png` | `多个切图 (6)/Rectangle_3@2x.png`，WEB 蓝色状态 |
| `works/web-scrm.png` | `多个切图 (6)/Group_4@2x.png`，健身课程管理平台 |
| `works/folder-motion-active.png` | `多个切图 (7)/Rectangle_6@2x.png`，MOTION 亮紫色状态 |
| `works/motion-showreel.png` | `多个切图 (7)/Group_4@2x.png`，际遇 SHOWREEL |
| `works/motion-compilation.png` | `多个切图 (7)/Group_5@2x.png`，英小伴动效合集占位卡片 |

## K12 教育产品完整作品

`works/pad-k12/` 来自用户提供的 `长图zip/01 pad/k12教育产品/`，共 28 张 PNG，按文件尾部数字排序（2–9、11–30），转为质量 92 的 WebP。保留 1920px 原始宽度及各张原始高度；文件名与原始编号对应，未裁剪内容。展示顺序和尺寸记录在 `src/data/k12Slides.json`。

## MOBILE 完整作品

- `works/mobile-social/` 来自用户提供的 `长图zip/02 mobile/社交app视觉升级/`，共 29 张 JPG，按原始编号 4–32 排列。
- `works/mobile-membership/` 来自用户提供的 `长图zip/02 mobile/会员体系0-1/`，共 15 张 JPG，按原始编号 34–48 排列。
- 两组图片均保留原始宽高及完整内容，转为质量 92 的 WebP。对应尺寸和顺序记录在 `src/data/mobile-socialSlides.json`、`src/data/mobile-membershipSlides.json`。
- `works/mobile-detail-edge.png` 为用户提供的 `Rectangle_6@2x.png` 原图（3840 × 253），保留透明度，用作 MOBILE 详情页的紫色文件夹底边。

## WEB 完整作品

- `works/web-scrm/` 来自用户提供的 `长图zip/03 web/`，共 20 张 JPG，按原始编号 49–68 排列。
- 全部图片保留 3297 × 1854 原始尺寸和完整内容，转为质量 92 的 WebP；顺序与尺寸记录在 `src/data/web-scrmSlides.json`。
- `works/web-detail-edge.png` 为用户提供的 `Rectangle_6@2x (1).png` 原图（3840 × 253），保留透明度和阴影，用作 WEB 详情页的蓝色文件夹底边。

## MOTION 视频与控件

- `../videos/motion-showreel.mp4` 为用户提供的 `5897_raw.MP4` 原视频，直接复制使用，保留音轨。
- `works/motion-detail-edge.png` 来自 `多个切图 (2)/Rectangle_6@2x.png`（3840 × 253），保留透明度与阴影。
- `works/motion/play.png` 来自 `多个切图 (2)/视频播放_1@2x.png`（140 × 140）。
- `works/motion/expand.png` 来自 `多个切图 (2)/放大_1@2x.png`（64 × 64）。
- `works/motion/back.png` 来自 `返回-copy_1@2x.png`（68 × 68），用于放大视图的白色返回箭头。

## 头像生成提示（内置 ImageGen）

Use case: stylized-concept. Asset type: transparent hero avatar for a personal creative portfolio website. Create one polished original 3D cartoon floating head of a friendly young adult male creative, expressive large brown eyes, thick dark brows, tousled wavy dark brown hair, warm tan skin, tiny silver hoop earring. Head only, front facing, subtle three-quarter turn, relaxed confident expression. High-end soft clay/Pixar-like stylized 3D rendering, physically shaded soft skin and sculpted hair with subtle glossy highlights, soft key light and cool blue rim light to look good on a pure black website. Centered symmetrical square composition, whole hair and chin fully visible, occupying 80 percent of frame. Truly transparent background, clean alpha edges. No neck, no shoulders, no body, no text, no logos, no pedestal, no background, no extra objects. This is a replaceable illustrative placeholder, not a portrait of any real person.
