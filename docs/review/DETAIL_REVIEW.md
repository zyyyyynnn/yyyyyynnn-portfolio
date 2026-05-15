# Portfolio Review Notes — Accepted Static UI Baseline

## Baseline Status

当前静态 UI 已验收。项目进入“动效增强 / 代码收口 / 文档维护”阶段。

默认不得继续重排 UI 布局；除非用户明确指定，不修改 Hero / Projects / Photos / About / Contact 的已验收视觉数值。

## Accepted Page Baseline

```text
01 Home      - 大标题 + 复古电脑 + 全屏终端归位
02 Projects  - 大幅纸质项目板 + 三张项目档案卡 + 右侧截图区域
03 Photos    - 大幅牛皮纸照片板 + 原始拍立得成品图拼贴
04 About     - 4:5 艺术照 + About 档案卡
05 Contact   - 展开式 contact sheet / 联系信息收尾区
```

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

- 冷白纸本档案质感。
- 复古电脑作为 Home 视觉锚点。
- 全屏 terminal 输入后缩小归位到电脑屏幕。
- Projects 使用三张项目档案卡与右侧截图区域。
- Photos 使用大幅牛皮纸照片板与原始拍立得成品图。
- About 使用 4:5 艺术照与档案卡。
- Contact 使用展开式 contact sheet 作为页面收尾。

避免方向：

- 不继续堆叠 generated-ui 生图素材。
- 不改成新主题。
- 不恢复 Cats。
- 不新增 Tech Stack 独立页面。
- 不在未指定时继续调整静态布局。

## generated-ui Status

generated-ui 已弃用并删除。

当前规则：

- 不恢复 `public/assets/generated-ui/`。
- 不引用 `/assets/generated-ui/`。
- 不重新生成 image gen 素材。
- 不再保留 generated-ui manifest。
- 文档中只允许保留“禁止恢复 / 已弃用”的说明。

## Animation Status

项目已经接入 GSAP / @gsap/react。动效相关文件包括：

- `src/hooks/useTerminalDock.ts`
- `src/hooks/useGsapReveal.ts`
- `src/hooks/useProjectScroll.ts`

后续如需增强动效，应另开任务，并在不重排已验收静态 UI 的前提下进行。

## Validation Focus

```powershell
npm run lint
npm run build
npm run dev
```

手动检查：

1. Home / Projects / Photos / About / Contact 与已验收视觉基线一致。
2. 无 generated-ui 资源引用。
3. 无 Cats 内容恢复。
4. 蓝色手写批注仅为英文短词、箭头或符号。
5. 移动端无横向滚动。
