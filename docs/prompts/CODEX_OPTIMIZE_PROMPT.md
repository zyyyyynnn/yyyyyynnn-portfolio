# Codex Optimize Prompt — Locked Static UI Baseline

当前静态 UI 已验收。项目进入“动效增强 / 代码收口 / 文档维护”阶段。

除非用户明确指定，不修改 UI 布局，不重排 Hero / Projects / Photos / About / Contact，不改已验收的视觉数值。

## 项目定位

个人作品集首页，视觉核心为：

```text
冷白纸本档案
+
复古电脑
+
全屏终端归位
+
项目档案卡
+
原始拍立得照片拼贴
```

## 技术环境

- React 19
- TypeScript
- Vite
- GSAP / @gsap/react
- CSS 主导视觉样式
- 不新增依赖
- 不恢复 generated-ui 生图素材

## 已验收页面基线

```text
01 Home      - 大标题 + 复古电脑 + 全屏终端归位
02 Projects  - 大幅纸质项目板 + 三张项目档案卡 + 右侧截图区域
03 Photos    - 大幅牛皮纸照片板 + 原始拍立得成品图拼贴
04 About     - 4:5 艺术照 + About 档案卡
05 Contact   - 展开式 contact sheet / 联系信息收尾区
```

## 默认修改边界

允许：

- GSAP 动效增强。
- CSS 代码整理。
- 文档维护。
- 明确指定范围内的 bug 修复。

禁止：

- 默认继续优化静态 UI 排版。
- 默认调整 Hero / Projects / Photos / About / Contact 视觉布局。
- 修改动效 hooks，除非明确指定。
- 恢复 Cats。
- 新增 Tech Stack 独立区。
- 新增依赖。
- 新增 image generation。

## generated-ui 规则

generated-ui 已弃用并删除，原因是生图质量不符合当前页面基线。

因此：

- 不恢复 `public/assets/generated-ui/`。
- 不引用 `/assets/generated-ui/`。
- 不新增 `manifest.json`。
- 不再调用 image generation。
- 不使用 GPT Image 生成 UI 组件。
- 纸张、胶带、印章、阴影、批注均优先用 CSS 或现有真实素材实现。

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

## 下一轮推荐方向

```text
静态布局已锁定。本轮只在现有布局基础上优化 GSAP 动效，不改 UI 结构。
```

或：

```text
静态布局已锁定。本轮只做 CSS / 文档 / 代码收口，不改 UI 视觉数值。
```

## 验证清单

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
