# Portfolio Design Package — Retro Computer Dock

## 包内容

```text
portfolio_design_package_v3_retro_dock/
├─ README.md
├─ public/
│  └─ assets/
│     ├─ textures/
│     │  ├─ paper-clean.jpg
│     │  └─ kraft-clean.jpg
│     └─ hero/
│        └─ retro-computer-terminal-dock.png
└─ docs/
   ├─ prompts/
   │  └─ CODEX_OPTIMIZE_PROMPT.md
   ├─ prototypes/
   │  └─ PaperArchiveRetroDockPortfolio.jsx
   └─ review/
      └─ DETAIL_REVIEW.md
```

## 这版新增

- 复古电脑 + 老式键盘贴纸主体替代 Home 右侧原纸卡。
- 开场终端运行后缩小归位到复古电脑屏幕。
- 终端窗口逼真度增强。
- 归位后屏幕内保留 mini terminal。
- 使用真实米白纸纹与牛皮纸纹图片。
- 保留 Projects 单项目滚动抽离设计。
- 统一猫图命名为 `cat-01.png` 到 `cat-06.png`。

## 推荐 Codex 使用方式

第一轮只让 Codex 读文件和 plan：

```text
请先读取：
docs/prompts/CODEX_OPTIMIZE_PROMPT.md
docs/prototypes/PaperArchiveRetroDockPortfolio.jsx
docs/review/DETAIL_REVIEW.md

不要立即改文件。先输出：
1. 文件结构
2. 组件拆分方案
3. 图片路径匹配检查
4. 开场终端归位到 retro-screen 的实现方案
5. retro-screen overlay 定位方案
6. Projects 单卡片滚动抽离动效实现方案
7. 响应式与 prefers-reduced-motion 降级方案
8. build 验证步骤
```
