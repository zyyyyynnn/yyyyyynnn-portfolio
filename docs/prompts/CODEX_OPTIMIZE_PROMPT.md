# Clean Light Paper Archive Portfolio — Retro Computer Dock

## 0. 任务目标

在全新 Vite + React + TypeScript 项目中实现个人作品集网站。

当前确认视觉方向：

> Clean Light Paper Archive Portfolio  
> 干净亮色纸本档案式个人作品集

本版最重要的新增改动：

> Home 右侧原有纸卡废弃，改为“复古电脑 + 老式键盘”贴纸主体。  
> 开场终端命令运行完成后，不再 fade out，而是缩小归位到复古电脑屏幕内。

---

## 1. 输入文件

请先读取：

```text
docs/prototypes/PaperArchiveRetroDockPortfolio.jsx
docs/review/DETAIL_REVIEW.md
```

其中：

- `PaperArchiveRetroDockPortfolio.jsx` 是当前确认版交互与视觉原型。
- `DETAIL_REVIEW.md` 是本轮严格审查后的细节清单。

正式实现时请拆分为 TypeScript 组件，不要把整个 JSX 单文件直接塞进 `App.tsx`。

---

## 2. 技术栈

使用：

- Vite
- React
- TypeScript
- 原生 CSS

禁止：

- Tailwind
- Framer Motion
- UI 组件库
- 图标库
- 外部字体文件
- 额外动画库
- 复杂 canvas 动效

允许：

- CSS transition
- CSS keyframes
- IntersectionObserver
- 原生 DOM scroll listener，但必须清理事件监听

验证：

```powershell
npm install
npm run build
```

如果存在 lint 脚本，也执行：

```powershell
npm run lint
```

---

## 3. 最小工程结构

推荐：

```text
src/
  main.tsx
  App.tsx
  data/
    portfolio.ts
  hooks/
    useReveal.ts
    useProjectScroll.ts
    useTerminalDock.ts
  components/
    ImageWithFallback.tsx
    OpeningTerminal.tsx
    RetroComputerDock.tsx
    SectionHeader.tsx
    SiteNav.tsx
    Stamp.tsx
    TerminalText.tsx
  sections/
    Hero.tsx
    Projects.tsx
    Landscapes.tsx
    Cats.tsx
    AboutContact.tsx
  styles/
    global.css
```

约束：

- 不要引入路由。
- 不要引入状态管理库。
- 不要过度抽象。
- 组件拆分以清晰可维护为准。

---

## 4. 资源路径

本包已提供：

```text
public/assets/textures/paper-clean.jpg
public/assets/textures/kraft-clean.jpg
public/assets/hero/retro-computer-terminal-dock.png
```

用户后续需要补充：

```text
public/assets/projects/project-01-interview.png
public/assets/projects/project-02-meeting-room.png
public/assets/projects/project-03-procurement.png

public/assets/photos/landscapes/landscape-01-xiamen.jpg
public/assets/photos/landscapes/landscape-02-chongqing.jpg
public/assets/photos/landscapes/landscape-03-changsha.jpg
public/assets/photos/landscapes/landscape-04-guangzhou.jpg
public/assets/photos/landscapes/landscape-05-nanjing.jpg
public/assets/photos/landscapes/landscape-06-nanchang.jpg
public/assets/photos/landscapes/landscape-07-lijiang.jpg
public/assets/photos/landscapes/landscape-08-wuhan.jpg
public/assets/photos/landscapes/landscape-09-qingdao.jpg

public/assets/photos/cats/cat-01.png
public/assets/photos/cats/cat-02.png
public/assets/photos/cats/cat-03.png
public/assets/photos/cats/cat-04.png
public/assets/photos/cats/cat-05.png
public/assets/photos/cats/cat-06.png
```

图片缺失时必须显示纸张占位，不允许 broken image。

---

## 5. 真实纹理背景

优先使用真实纹理图片，不要纯 CSS 伪造。

主背景：

```css
main {
  background-image:
    linear-gradient(rgba(244, 237, 223, .72), rgba(244, 237, 223, .72)),
    url("/assets/textures/paper-clean.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
```

局部牛皮纸：

```css
.kraft-slab,
.project-scroll-shell,
.photo-board {
  background-image:
    linear-gradient(rgba(158, 133, 100, .22), rgba(158, 133, 100, .22)),
    url("/assets/textures/kraft-clean.jpg");
  background-size: cover;
  background-position: center;
}
```

CSS 纸纹伪元素只能作为辅助，不能替代真实纹理图。

---

## 6. 色彩系统

使用：

```css
--paper-bg: #f4eddf;
--paper-bg-soft: #fbf6eb;
--paper: #f1e8d3;
--paper-card: #eee3ca;
--paper-warm: #e5d5b7;
--paper-aged: #d2bf9b;

--kraft: #876f56;
--kraft-soft: #9e8564;
--kraft-muted: #6d5843;
--kraft-deep: #6f5943;

--ink: #15110e;
--ink-soft: #3f3429;

--stamp-red: #7e1b22;
--stamp-red-deep: #5d151a;

--note-blue: #456da4;
--note-blue-soft: rgba(69, 109, 164, .72);

--display-serif: "Palatino Linotype", "Book Antiqua", Palatino, Georgia, "Times New Roman", serif;
```

---

## 7. Opening Terminal + Retro Computer Dock

这是本版核心，必须严格实现。

### 7.1 行为

开场不是 fade out。

完整流程：

```text
typing:
  全屏终端逐行输出命令

docking:
  最后一行 open home 输出后，终端窗口缩小并移动到 Hero 右侧复古电脑屏幕

docked:
  终端嵌入电脑屏幕，屏幕内显示静态 mini terminal

skipped:
  点击 Skip 或 reduced motion，直接显示 Hero 与静态电脑屏幕
```

建议状态：

```ts
type TerminalPhase = "typing" | "docking" | "docked" | "skipped";
```

### 7.2 终端文案

```text
yyyyyynnn@archive:~$ pnpm run boot:portfolio
> initializing paper archive...
> loading project metadata...
> indexing landscape captures...
> pinning cat stickers...
> composing hero layout...
> syncing terminal to device...
done.
yyyyyynnn@archive:~$ open home
```

### 7.3 归位计算

禁止使用写死 translate 数值。

必须读取：

```ts
terminalWindow.getBoundingClientRect()
retroScreen.getBoundingClientRect()
```

计算：

```ts
scale = Math.min(target.width / terminal.width, target.height / terminal.height)
translateX = targetCenterX - terminalCenterX
translateY = targetCenterY - terminalCenterY
```

然后应用：

```css
transform: translate3d(var(--x), var(--y), 0) scale(var(--scale));
```

### 7.4 终端真实感

要求：

- 深灰黑背景，不要纯黑。
- title bar 高度约 36px–44px。
- 左上角三个低饱和控制圆点。
- 1px 细边框。
- 极轻内阴影。
- 极轻 scanline，不超过 0.06 opacity。
- monospace 字体。
- 光标闪烁。
- 输出行 delay 略有差异。
- 不要 Matrix。
- 不要霓虹。
- 不要黑客风。

---

## 8. Retro Computer Hero 主体

Home 右侧原纸卡废弃。

新的 Hero 右侧主体是：

```text
public/assets/hero/retro-computer-terminal-dock.png
```

结构要求：

```tsx
<div className="retro-computer-wrap">
  <div className="retro-computer">
    <img src="/assets/hero/retro-computer-terminal-dock.png" />
    <div ref={screenRef} className="retro-screen" id="terminal-dock">
      <TerminalMini />
    </div>
  </div>
</div>
```

设计要求：

- 复古电脑 + 老式键盘是 Hero 右侧视觉锚点。
- 替代原有纸卡。
- 下方/后方可保留局部牛皮纸底板。
- 不再出现原 paper archive card。
- 电脑整体像贴纸物件，服从纸本档案视觉。
- 不要再额外加现代显示器或浏览器窗口。
- 不要把键盘独立拆出来，使用图片中的组合主体。

屏幕 overlay：

当前素材屏幕位置大致为：

```css
.retro-screen {
  left: 28.2%;
  top: 19.7%;
  width: 45.8%;
  height: 31%;
}
```

Codex 实现时可以微调，但必须确保 mini terminal 精准覆盖黑色屏幕区域。

---

## 9. Hero 内容

保留：

```text
I ship code,
I catch light.

写代码，也记录光线落下来的方式。
yyyyyynnn
```

要求：

- 左侧大标题。
- 右侧复古电脑。
- 不放头像。
- 不出现首页网格分割线。
- 不再出现原右侧纸卡。
- 标题使用 `--display-serif`。
- 可用轻微 text-shadow 模拟印刷压印。

---

## 10. Projects 区

必须保留新版：

> 一个项目单独占据一个大组件卡片。滑动时，上一个项目组件向上抽离，渐渐显现出下一个项目组件。

要求：

- 桌面端 sticky scroll narrative。
- 左侧项目编号和目录同步变化。
- 当前卡片位于主视觉区域。
- 上一个卡片向上抽离。
- 下一个卡片从下方渐显。
- 移动端降级为普通纵向项目卡片。
- reduced motion 下关闭抽离动画。
- 不使用 Framer Motion。
- 不做 3D 翻转。
- 不做滚动劫持。

---

## 11. Projects 数据

使用原型中的项目数据。GitHub 链接必须可点击。

项目截图缺失时显示 fallback，不要 broken image。

---

## 12. Photos 区

要求：

- 用户提供拍立得式风景图。
- 页面只负责陈列。
- 每行 3 张。
- 轻微旋转 -4deg 到 4deg。
- 不做横向滚动。
- 不出现横向滚动条。
- 拍立得框米白，不要纯白。
- 保留回形针、胶带、少量批注。

---

## 13. Cats 区

要求：

- 用户提供带撕纸边的猫猫贴纸图。
- 页面只负责散落陈列。
- 桌面端自由散落。
- 移动端降级为网格。
- Cats section 可 `overflow: hidden`。
- 禁止给 body/html 添加 `overflow: hidden`。
- 不出现横向滚动条。

---

## 14. About / Contact

About：

```text
在校生，写代码，也用手机记录一些光线和猫。
喜欢把系统设计和取景角度同等认真地对待：
一边整理逻辑，一边收集日常的形状。
```

Contact：

```ts
{
  primaryEmail: "ww7296298@gmail.com",
  secondaryEmail: "1974447317@qq.com",
  github: "https://github.com/zyyyyynnn",
  githubLabel: "github.com/zyyyyynnn",
  douyin: "ynzhang0118",
  wechat: "13312244867"
}
```

规则：

- Gmail 作为主 CTA，mailto。
- GitHub 链接。
- Douyin 用户名。
- QQ Email Copy。
- WeChat Copy，不直接明文显示。
- 复制成功显示 Copied。

---

## 15. 响应式与 reduced motion

必须：

- 375px 移动端可读。
- 移动端 Projects 降级纵向卡片。
- 移动端 retro computer 不溢出。
- 移动端终端可选择直接跳过 docking 或简化。
- `prefers-reduced-motion` 下关闭 docking、scroll extraction、reveal 动效。
- 所有图片有 alt。
- 所有 button 可键盘聚焦。
- 链接有明确文本或 aria-label。

---

## 16. 最终输出

完成后输出：

```text
1. 新增/修改文件清单
2. 实现摘要
3. build 验证结果
4. 图片替换说明
5. 未验证项与原因
```

不要声称未执行的验证已经通过。

