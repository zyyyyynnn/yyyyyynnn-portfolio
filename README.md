# yyyyyynnn Portfolio — Paper Archive Retro Dock

个人作品集项目，核心视觉为“米白纸本档案 + 复古电脑 + 开场终端归位”。当前阶段以保留原设计为前提，优先优化无动效静态 UI 排版；动效增强后续单独处理。

## 当前状态

- 技术栈：React 19、TypeScript、Vite、GSAP、@gsap/react。
- 页面结构：Home / Projects / Photos / About / Contact。
- 开场体验：全屏终端窗口输入后缩小归位到复古电脑屏幕。
- 项目展示：三张稳定的项目档案卡。
- 摄影展示：使用已处理好的拍立得成品照片。
- About：预留 4:5 艺术照区域。
- generated-ui 生图素材已弃用并删除，不再恢复或接入。

## 项目结构

```text
yyyyyynnn-portfolio/
├─ public/
│  └─ assets/
│     ├─ hero/
│     │  └─ retro-computer-terminal-dock.png
│     ├─ photos/
│     │  └─ landscapes/
│     ├─ projects/
│     └─ textures/
├─ src/
│  ├─ components/
│  │  ├─ OpeningTerminal.tsx
│  │  ├─ RetroComputerDock.tsx
│  │  ├─ TerminalText.tsx
│  │  ├─ ImageWithFallback.tsx
│  │  ├─ PortraitFrame.tsx
│  │  ├─ SectionHeader.tsx
│  │  ├─ SiteNav.tsx
│  │  └─ Stamp.tsx
│  ├─ data/
│  │  └─ portfolio.ts
│  ├─ hooks/
│  │  ├─ useGsapReveal.ts
│  │  ├─ useProjectScroll.ts
│  │  └─ useTerminalDock.ts
│  ├─ sections/
│  │  ├─ Hero.tsx
│  │  ├─ Projects.tsx
│  │  ├─ Landscapes.tsx
│  │  └─ AboutContact.tsx
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ docs/
│  ├─ prompts/
│  │  └─ CODEX_OPTIMIZE_PROMPT.md
│  ├─ prototypes/
│  │  └─ PaperArchiveRetroDockPortfolio.jsx
│  └─ review/
│     └─ DETAIL_REVIEW.md
├─ package.json
├─ vite.config.ts
└─ README.md
```

## 页面结构

```text
01 Home      - 复古电脑 + 开场终端归位
02 Projects  - 三张项目档案卡
03 Photos    - 原始拍立得成品照片墙
04 About     - 4:5 艺术照预留 + 身份档案卡
05 Contact   - 联系方式纸质回执卡
```

## 设计原则

### 必须保留

- 原始“米白纸本档案”视觉方向。
- Hero 左侧大标题 `I ship code, I catch light.`。
- 右侧复古电脑主体与屏幕归位设定。
- Projects 三个真实项目。
- Photos 风景 / 旅行照片。
- About 4:5 艺术照预留。
- Contact 联系方式。

### 禁止方向

- 不恢复 Cats 内容。
- 不新增独立 Tech Stack 区块。
- 不改成 SaaS、霓虹、赛博朋克、玻璃拟态或暗黑科技风。
- 不继续接入 generated-ui 生图素材。
- 不用 image generation 重新生成 UI 组件。
- 不使用远程图片或 Base64 大图。
- 不在蓝色手写批注中使用中文。

## Photos 处理规则

`public/assets/photos/landscapes/` 中的照片已经是处理好的拍立得成品图，图片文件本身包含白边 / 米白边 / 底部留白。

因此页面层只负责排版：

- 完整显示原图。
- 使用轻微旋转、阴影和错落排列。
- 保留 `loading="lazy"` 与 `decoding="async"`。
- 使用 `object-fit: contain` 或自然 `width: 100%; height: auto;`。

不要：

- 二次制造厚拍立得外框。
- 使用 `object-fit: cover` 裁切原图。
- 用 `overflow: hidden` 吃掉图片白边。
- 使用 generated tape 遮挡照片边缘。

## 当前优化优先级

1. 静态 UI 排版优化。
2. Hero 左右视觉重量平衡。
3. Projects 项目卡截图区域与信息层级优化。
4. Photos 统一照片墙重排，保留原始拍立得完整边框。
5. About / Contact 收尾区域稳定化。
6. 后续单独处理 GSAP 动效增强。

## 本地命令

```powershell
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Codex 修改建议

后续让 Codex 执行任务时，建议先限定范围：

```text
本轮只做静态 UI 排版优化，不修改动效 hooks，不恢复 generated-ui，不新增 image generation，不新增依赖。
```

若需要动效增强，应另开一轮：

```text
静态布局已确认，本轮只在现有布局基础上优化 GSAP 动效，不改 UI 结构。
```
