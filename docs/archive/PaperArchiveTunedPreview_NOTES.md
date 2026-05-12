# PaperArchiveTunedPreview 当前确认版说明

这是当前确认的视觉方向，用于交给 Codex 继续工程化实现。

## 已确认的核心方向

- Clean Light Paper Archive Portfolio
- reference-02-paper-sketch主导：米白纹理纸质感、扫描感、细线、蓝色手写批注
- reference-01-kraft-type只取：牛皮纸局部底板、打字机风格、复古编号印章
- 首页不出现网格分割线
- Projects 区改为“单项目卡片滚动抽离”动效
- 终端开场为接近全屏黑色 terminal
- 风景照片按拍立得陈列
- 猫猫图按撕纸贴纸散落

## 本版需要保留的设计细节

### 1. 米白纹理纸背景

不是纯色，不是简单噪点。需要组合：
- 米白底色
- 轻微纸纤维
- 极轻扫描暗角
- 轻微纵向纹理
- 不能变成旧报纸、废纸板、脏黄纸

推荐变量：

```css
--paper-bg: #f4eddf;
--paper-bg-soft: #fbf6eb;
--paper: #f1e8d3;
--paper-card: #eee3ca;
--paper-warm: #e5d5b7;
--paper-aged: #d2bf9b;
```

### 2. 牛皮纸

上一版太淡，本版已加深。只作为局部底板，不铺满全站。

```css
--kraft: #876f56;
--kraft-soft: #9e8564;
--kraft-muted: #6d5843;
--kraft-deep: #6f5943;
```

使用位置：
- Hero 右侧 archive card 后方
- Projects 大段局部背景
- Photos 局部底板
- 少量标签、胶带、小装饰

### 3. 标题字体

标题不能只是普通 Georgia。使用系统衬线组合：

```css
--display-serif: "Palatino Linotype", "Book Antiqua", Palatino, Georgia, "Times New Roman", serif;
```

标题可加非常轻的墨迹压印感：

```css
text-shadow: .7px 0 rgba(21,17,14,.18),
             -.45px 0 rgba(21,17,14,.08),
             0 .6px rgba(21,17,14,.08);
```

### 4. 红色印章

必须做旧，不要纯色按钮红。

```css
--stamp-red: #7e1b22;
--stamp-red-deep: #5d151a;
```

印章背景要包含斑驳点、内圈线、轻微旋转。

### 5. 蓝色手写批注

自然融入纸面，不能覆盖项目 GitHub 链接。

```css
--note-blue: #456da4;
--note-blue-soft: rgba(69, 109, 164, .72);
```

Projects 内的蓝色注释要放在左下/边缘，并设置：
- max-width
- opacity
- pointer-events: none
- 不压住链接

### 6. Projects 新动效

Projects 不再使用“一大两小”的卡片布局。改为：

- 一个项目单独占据一个大组件卡片
- 桌面端 sticky scroll narrative
- 滑动时上一个项目卡片向上抽离
- 下一个项目卡片从下方渐显
- 左侧显示当前项目编号和项目目录
- 移动端降级为普通纵向卡片
- reduced motion 下关闭抽离动画

建议结构：

```text
project-scroll-shell
  project-scroll-stage
    project-index-panel
    project-card-stage
      project-scroll-card x 3
```

### 7. 明确禁止

- 首页不要网格分割线
- 不要蓝色 guide line 覆盖 Hero
- 不要用 body/html overflow hidden
- Cats 越界只能在 Cats section 容器 overflow hidden
- 不要 Comic Sans
- 不要外部字体文件
- 不要 Tailwind / Framer Motion / UI 库

