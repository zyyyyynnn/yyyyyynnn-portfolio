# Portfolio Review Notes — Current Baseline

## Current Baseline

当前项目已从早期设计包进入实际 React + TypeScript + Vite 项目维护阶段。页面采用固定结构：

```text
01 Home
02 Projects
03 Photos
04 About
05 Contact
```

当前重点不是继续添加复杂动效或 generated-ui 素材，而是先把无动效静态页面排版打磨稳定。

## Current Project Structure

```text
src/
├─ components/
│  ├─ OpeningTerminal.tsx
│  ├─ RetroComputerDock.tsx
│  ├─ TerminalText.tsx
│  ├─ ImageWithFallback.tsx
│  ├─ PortraitFrame.tsx
│  ├─ SectionHeader.tsx
│  ├─ SiteNav.tsx
│  └─ Stamp.tsx
├─ data/
│  └─ portfolio.ts
├─ hooks/
│  ├─ useGsapReveal.ts
│  ├─ useProjectScroll.ts
│  └─ useTerminalDock.ts
├─ sections/
│  ├─ Hero.tsx
│  ├─ Projects.tsx
│  ├─ Landscapes.tsx
│  └─ AboutContact.tsx
├─ App.tsx
├─ index.css
└─ main.tsx
```

## Visual Direction

保留方向：

- 米白纸本档案质感。
- 复古电脑作为 Hero 视觉锚点。
- 全屏 terminal 输入后缩小归位到电脑屏幕。
- Projects 使用稳定项目档案卡。
- Photos 使用原始拍立得成品图。
- About 预留 4:5 艺术照。
- Contact 使用纸质回执卡气质。

避免方向：

- 不继续堆叠 generated-ui 生图素材。
- 不改成新主题。
- 不用复杂叠卡 / pin / scrub 掩盖静态布局问题。
- 不恢复 Cats。
- 不新增 Tech Stack 独立页面。

## Current Static UI Issues

### 1. Home

当前 Hero 仍应沿用左文右电脑结构。需要关注：

- 左侧大标题和右侧复古电脑的视觉重量是否平衡。
- 复古电脑是否偏小。
- kraft slab 是否像纸质底板，而不是孤立背景块。
- terminal note 是否过多或抢视线。

### 2. Projects

当前推荐方向是稳定的三张纵向 dossier cards，而不是复杂滚动抽屉。

需要关注：

- 三个项目是否完整可读。
- 截图区域是否存在感不足。
- CSS stamp 是否遮挡内容。
- 卡片间距是否统一。
- 技术标签是否过密。

### 3. Photos

用户提供的照片已经是处理好的拍立得成品图。页面不应重新制造拍立得厚边框。

需要关注：

- 原图边框是否被裁切。
- 是否使用 `object-fit: cover` 导致吃边。
- 是否有 `overflow: hidden` 裁掉白边。
- 是否拆成割裂的 feature + 长窄 board。
- 是否可以统一为更完整的照片墙。

### 4. About / Contact

需要作为页面收尾区稳定呈现。

需要关注：

- About 4:5 portrait frame 是否自然。
- Contact card 是否过窄或偏散。
- 两个区块是否形成统一收束，而不是散落。

## generated-ui Status

用户已删除 generated-ui 生图素材，原因是生图质量不满意。

当前规则：

- 不恢复 `public/assets/generated-ui/`。
- 不引用 `/assets/generated-ui/`。
- 不重新生成 image gen 素材。
- 不再保留 generated-ui manifest。
- 如果文档或代码仍出现 generated-ui 相关引用，应清理。

## Animation Status

当前项目已经接入 GSAP / @gsap/react。动效相关文件包括：

- `src/hooks/useTerminalDock.ts`
- `src/hooks/useGsapReveal.ts`
- `src/hooks/useProjectScroll.ts`

但当前阶段建议：

1. 先确认静态 UI 截图。
2. 静态布局满意后，再单独进行 GSAP 动效增强。
3. 不要在静态 UI 调整阶段频繁改动动画 hook。

## Validation Focus

```powershell
npm run lint
npm run build
npm run dev
```

手动检查：

1. Home 左右视觉重量平衡。
2. 复古电脑主体尺寸合适。
3. Projects 三张卡完整显示。
4. Photos 原始拍立得边框完整保留。
5. About / Contact 收尾稳定。
6. 无 generated-ui 残留引用。
7. 移动端无横向滚动。
8. 控制台无明显错误。

## Recommended Next Prompt Theme

```text
本轮只做静态 UI 排版优化，不修改动效 hooks，不恢复 generated-ui，不新增 image generation，不新增依赖。
```

如果静态版确认后，再使用：

```text
静态布局已确认，本轮只在现有布局基础上优化 GSAP 动效，不改 UI 结构。
```
