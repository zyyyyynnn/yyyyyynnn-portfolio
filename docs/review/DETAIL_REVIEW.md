# Paper Archive Retro Dock Portfolio — Confirmed Details Review

## 结论

本次包已把“复古电脑 + 键盘”作为 Home 右侧主体，替代原有 paper card。开场终端也从 fade out 改为“运行命令后缩小归位到复古电脑屏幕”。

## 已保留 / 已补齐的关键细节

### 1. 复古电脑代替原纸卡

已移除 Hero 右侧原有 `paper-card hero-card` 视觉主体。

新主体为：

```text
public/assets/hero/retro-computer-terminal-dock.png
```

在原型中对应：

```jsx
<RetroComputerDock />
```

它承担两个职责：

- Hero 右下角长期视觉锚点。
- 开场终端动画的归位目标。

### 2. 终端归位动画

已从旧版：

```text
全屏终端 → fade out → Hero 出现
```

改为：

```text
全屏终端运行命令 → 计算 retro-screen DOMRect → 终端窗口缩小移动 → 嵌入复古电脑屏幕 → Hero 完整显现
```

关键结构：

```jsx
<div className="retro-computer" id="terminal-dock">
  <img src="/assets/hero/retro-computer-terminal-dock.png" />
  <div ref={screenRef} className="retro-screen" />
</div>
```

终端归位不使用写死 translate，而是读取：

```js
terminalWindow.getBoundingClientRect()
targetScreen.getBoundingClientRect()
```

然后计算：

- translateX
- translateY
- scale

### 3. 终端状态机

已使用以下状态：

```ts
"typing" | "docking" | "docked" | "skipped"
```

阶段含义：

- `typing`：全屏终端逐行输出。
- `docking`：终端缩小归位到电脑屏幕。
- `docked`：电脑屏幕内显示静态 mini terminal。
- `skipped`：点击 Skip 或 reduced motion 直接显示静态电脑屏幕。

### 4. 更逼真的终端

已补齐：

- 深灰黑终端底，不是纯黑。
- title bar。
- 左上角三个低饱和控制圆点。
- 细边框。
- 内阴影。
- 极轻 scanline。
- monospace 字体。
- blink cursor。
- 真实一些的命令文案。

命令文案：

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

### 5. 归位后屏幕内容

复古电脑屏幕归位后，不是空屏。

屏幕内保留静态 mini terminal，只显示最后几行输出，并带有安静闪烁光标。

### 6. 真实背景纹理

已使用真实图片纹理：

```text
public/assets/textures/paper-clean.jpg
public/assets/textures/kraft-clean.jpg
```

用途：

- `paper-clean.jpg`：全站主背景。
- `kraft-clean.jpg`：Hero 局部牛皮纸底板、Projects 背景、Photos 背景。

CSS 伪元素纸纹仅作为辅助，不再替代真实纹理图。

### 7. Projects 区没有回退

已保留新版 Projects：

- 一个项目单独占据一个大组件卡片。
- 上一个项目向上抽离。
- 下一个项目从下方渐显。
- 左侧项目编号同步变化。
- 移动端降级为纵向卡片。
- reduced motion 下关闭抽离动效。

### 8. 图片命名已统一

猫猫命名统一为：

```text
cat-01.png
cat-02.png
cat-03.png
cat-04.png
cat-05.png
cat-06.png
```

风景命名统一为：

```text
landscape-01-xiamen.jpg
landscape-02-chongqing.jpg
landscape-03-changsha.jpg
landscape-04-guangzhou.jpg
landscape-05-nanjing.jpg
landscape-06-nanchang.jpg
landscape-07-lijiang.jpg
landscape-08-wuhan.jpg
landscape-09-qingdao.jpg
```

### 9. 明确未做的事

- 没有生成完整 Vite 工程。
- 没有执行 `npm run build`。
- 没有包含项目截图、风景图、猫图原始资产，除非你手动放入对应路径。
- 当前复古电脑素材是你提供的图片文件，已按项目路径打包；如果后续导出透明 PNG，可以同路径替换。

## 仍需 Codex 实现时重点检查

1. `.retro-screen` 的定位是否准确覆盖电脑屏幕。
2. 终端归位后是否与屏幕严丝合缝。
3. 移动端是否直接跳过复杂 docking 或保持可接受的简化体验。
4. 如果把 retro image 换成透明 PNG，是否同步调整屏幕 overlay 百分比。
5. 图片缺失时是否显示 fallback，不出现 broken image。

