# Codex Optimize Prompt - Paper Archive Portfolio

目标：在现有 React + TypeScript + Vite 项目上维护一个克制的个人作品集：首页结构为 Home / Projects / Photos / About / Contact。

## 页面结构

```text
01 Home      - retro computer + terminal dock
02 Projects  - project archive drawer cards
03 Photos    - landscape photography polaroid board
04 About     - identity note card
05 Contact   - terminal receipt contact card
```

## 保留方向

- 米白纸本档案馆质感。
- 复古电脑作为 Hero 视觉锚点。
- WAAPI 负责开场 terminal 缩小归位到电脑屏幕。
- GSAP / ScrollTrigger 负责滚动入场、项目切换、照片墙 stagger。
- Projects 保留三个真实项目，技术栈只作为项目卡片内部标签。
- Photos 只展示风景 / 旅行记忆，不新增独立题材。
- About / Contact 作为文末档案卡收束页面。

## 终端文案

```text
yyyyyynnn@archive:~$ pnpm run boot:portfolio
> initializing paper archive...
> loading project metadata...
> indexing landscape captures...
> arranging photo fragments...
> composing hero layout...
> syncing terminal to device...
done.
yyyyyynnn@archive:~$ open home
```

## 禁止方向

- 不新增独立 Tech Stack 页面。
- 不加入额外动效库；仅允许 gsap 和 @gsap/react。
- 不改成霓虹、赛博朋克、玻璃拟态、SaaS landing page。
- 不引入远程图片或 Base64 大图。
- 不把旅行 / 风景照片内容删除。
