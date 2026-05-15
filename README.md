# yyyyyynnn Portfolio — Paper Archive Retro Dock

个人作品集项目，核心视觉为“冷白纸本档案 + 复古电脑 + 开场终端归位”。静态 UI 已验收，后续进入动效增强、代码收口与文档维护阶段。

## 当前状态

- 技术栈：React 19、TypeScript、Vite、GSAP、@gsap/react。
- 页面结构：Home / Projects / Photos / About / Contact。
- 静态 UI 已验收，默认不得再重排 UI 布局。
- 01 Home：大标题 + 复古电脑 + 全屏终端归位。
- 02 Projects：大幅纸质项目板 + 三张项目档案卡 + 右侧截图区域。
- 03 Photos：大幅牛皮纸照片板 + 原始拍立得成品图拼贴。
- 04 About：4:5 艺术照 + About 档案卡。
- 05 Contact：展开式 contact sheet / 联系信息收尾区。
- generated-ui 已弃用并删除，不恢复，不重新生成。

## 项目结构

```text
yyyyyynnn-portfolio/
├─ public/
│  ├─ apple-touch-icon.png
│  ├─ favicon-32x32.png
│  └─ assets/
│     ├─ about/
│     │  └─ about-portrait.jpg
│     ├─ brand/
│     │  └─ nav-avatar-master.png
│     ├─ fonts/
│     │  └─ cormorant-garamond-latin-300-400.woff2
│     ├─ hero/
│     │  └─ retro-computer-terminal-dock.png
│     ├─ photos/
│     │  └─ landscapes/
│     ├─ projects/
│     └─ textures/
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ hooks/
│  ├─ sections/
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ docs/
│  ├─ prompts/
│  │  └─ CODEX_OPTIMIZE_PROMPT.md
│  ├─ review/
│  │  └─ DETAIL_REVIEW.md
│  └─ sources/
├─ package.json
├─ vite.config.ts
└─ README.md
```

## 修改边界

### 默认允许

- 动效增强。
- 代码收口。
- 文档维护。
- 明确指定范围内的 bug 修复。

### 默认禁止

- 重排已验收的 Home / Projects / Photos / About / Contact 静态布局。
- 修改动效 hooks，除非任务明确要求。
- 恢复 Cats。
- 新增 Tech Stack 独立区。
- 恢复 generated-ui。
- 新增 image generation。
- 删除真实素材或修改数据内容。

## Photos 处理规则

`public/assets/photos/landscapes/` 中的照片已经是处理好的拍立得成品图，图片文件本身包含白边 / 米白边 / 底部留白。

页面层只负责排版：

- 完整显示原图。
- 保留当前牛皮纸照片板与拼贴布局。
- 保留 `loading="lazy"` 与 `decoding="async"`。
- 使用 `object-fit: contain` 或自然 `width: 100%; height: auto;`。

不要：

- 二次制造厚拍立得外框。
- 使用 `object-fit: cover` 裁切原图。
- 用 `overflow: hidden` 吃掉图片白边。
- 使用 generated tape 遮挡照片边缘。

## 蓝色手写批注规则

仅允许：

- 英文短词。
- 英文短语。
- 箭头。
- 星号、圈注、下划线等轻量符号。

禁止：

- 中文批注。
- 中英混合长句。
- 乱码伪文字。
- 大面积蓝色涂鸦。

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
静态 UI 已验收，本轮只做动效增强 / 代码收口 / 文档维护，不重排 UI 布局，不修改 hooks，除非明确指定。
```
