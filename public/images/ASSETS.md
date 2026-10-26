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

## 头像生成提示（内置 ImageGen）

Use case: stylized-concept. Asset type: transparent hero avatar for a personal creative portfolio website. Create one polished original 3D cartoon floating head of a friendly young adult male creative, expressive large brown eyes, thick dark brows, tousled wavy dark brown hair, warm tan skin, tiny silver hoop earring. Head only, front facing, subtle three-quarter turn, relaxed confident expression. High-end soft clay/Pixar-like stylized 3D rendering, physically shaded soft skin and sculpted hair with subtle glossy highlights, soft key light and cool blue rim light to look good on a pure black website. Centered symmetrical square composition, whole hair and chin fully visible, occupying 80 percent of frame. Truly transparent background, clean alpha edges. No neck, no shoulders, no body, no text, no logos, no pedestal, no background, no extra objects. This is a replaceable illustrative placeholder, not a portrait of any real person.
