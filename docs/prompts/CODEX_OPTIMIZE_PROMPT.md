# Codex Optimize Prompt — Static UI First

本项目当前阶段应优先维护原始设计方向，并先完成无动效静态 UI 排版优化。动效增强应在静态截图确认后单独处理。

## 项目定位

个人作品集首页，视觉核心为：

```text
米白纸本档案
+
复古电脑
+
终端窗口缩小归位到电脑屏幕
+
项目档案卡
+
原始拍立得照片墙
```

## 技术环境

- React 19
- TypeScript
- Vite
- GSAP / @gsap/react
- CSS 主导视觉样式
- 不新增依赖
- 不恢复 generated-ui 生图素材

## 页面结构

```text
01 Home      - retro computer + terminal dock
02 Projects  - stable project dossier cards
03 Photos    - original polaroid photo archive
04 About     - 4:5 portrait placeholder + identity note
05 Contact   - paper receipt contact card
```

## 当前设计原则

### Home

- 保留大标题：`I ship code, I catch light.`
- 保留中文副标题。
- 保留右侧复古电脑。
- 保留全屏 terminal 缩小归位到电脑屏幕的主设定。
- 允许调整 Hero 静态排版：电脑尺寸、纸板位置、左右视觉重量。
- 本轮静态优化不应重写开场动画逻辑。

### Projects

- 保留三个真实项目。
- 使用稳定纵向项目档案卡。
- 不恢复复杂 pin、scrub、叠卡、抽屉式 z-index 动效。
- 项目卡必须完整可读。
- 截图区域要有足够存在感，但不能遮挡内容。
- 技术栈仅作为项目卡片内部标签展示。

### Photos

用户提供的风景照片素材本身已经是处理好的拍立得成品图。

必须：

- 完整展示原图。
- 保留原图中的拍立得白边 / 米白边 / 底部留白。
- 使用统一照片墙 / collage 排版。
- 使用轻微阴影、旋转、错落。
- 保留 `loading="lazy"` 和 `decoding="async"`。

禁止：

- 不二次制造厚拍立得外框。
- 不使用 `object-fit: cover` 裁切原图。
- 不使用 `overflow: hidden` 吃掉原图边框。
- 不用 generated tape 遮挡照片边缘。
- 不拆成割裂的 feature card + 长窄 board。

### About

- 保留 4:5 艺术照预留。
- 当前不放假头像。
- 如果没有 `public/assets/about/about-portrait.jpg`，使用 CSS 纸张占位。
- About 文案保持简洁。

### Contact

- 保留邮箱、GitHub、Douyin、QQ Email、WeChat。
- 保持纸质回执卡气质。
- Copy 状态用 CSS 或已有逻辑即可。
- 不添加复杂表单。

## generated-ui 规则

用户已删除 generated-ui 生图素材，原因是生图质量不满意。

因此：

- 不恢复 `public/assets/generated-ui/`。
- 不引用 `/assets/generated-ui/`。
- 不新增 `manifest.json`。
- 不再调用 image generation。
- 不使用 GPT Image 2 生成 UI 组件。
- 纸张、胶带、印章、阴影、批注均优先用 CSS 实现。

需要全局清理残留：

```powershell
rg -n "generated-ui|gpt-image|GPT Image|image gen|mac-terminal-frame|terminal-window-noise|terminal-dock-glow|hero-paper-desk-layer|folder-stack-base|folder-tab-archive|archived-stamp-red|polaroid-tape-set|blue-annotation-arrows|about-portrait-placeholder|contact-receipt-paper|paper-shadow-soft" .
```

## 蓝色手写批注规则

允许：

- 英文短词
- 英文短语
- 箭头
- 星号
- 圈注
- 下划线

示例：

```text
dock here
light note
travel frame
city trace
identity note
copy receipt
```

禁止：

- 中文手写批注
- 中英混合长句
- 乱码伪文字
- 大面积蓝色涂鸦

## 当前推荐执行顺序

1. 只做静态 UI 排版优化。
2. 优化 Hero 左右视觉平衡。
3. 优化 Projects 卡片信息层级和截图区域。
4. 将 Photos 调整为统一照片墙，完整显示原始拍立得图。
5. 收束 About / Contact 视觉关系。
6. 清理 generated-ui 残留引用。
7. 运行 `npm run lint`。
8. 运行 `npm run build`。
9. 截图确认后，另开一轮处理 GSAP 动效。

## 禁止方向

- 不恢复 Cats。
- 不新增 Tech Stack 独立页面。
- 不把设计改成 SaaS landing page。
- 不改成霓虹、赛博朋克、玻璃拟态、暗黑科技风。
- 不新增依赖。
- 不新增 image generation。
- 不在静态 UI 优化轮里重写动效 hooks。

## 验证清单

```powershell
npm run lint
npm run build
npm run dev
```

手动检查：

1. Home 首屏左右视觉平衡。
2. 复古电脑主体不显得过小。
3. Projects 三张卡完整可读。
4. Projects 截图区不弱、不空。
5. Photos 是统一照片墙。
6. 原始拍立得照片边框完整显示。
7. About 4:5 预留区域稳定。
8. Contact 可读且不散。
9. 无 generated-ui 残留引用。
10. 移动端无横向滚动。
