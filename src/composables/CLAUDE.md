[根目录](../../CLAUDE.md) > [src](../) > **composables**

# composables — 组合式能力复用层

---

## 模块职责

抽离动画、滚动触发与统一时序配置，减少页面/组件重复实现。

---

## 入口与启动

- `anime.config.js`：全局动画常量入口。
- `useAnimate.js`：供 `NavBar`、`CollectiblesView` 等直接调用。
- `useScrollReveal.js`：供 `HomeView`、`EventsView` 按视口触发动画。

---

## 对外接口

### anime.config.js
- `EASING`
- `DURATION`
- `STAGGER_DELAY`

### useAnimate.js
- `fadeIn`
- `slideUp`
- `staggerIn`
- `scaleIn`
- `fadeOut`

### useScrollReveal.js
- `reveal(elRef, opts)`
  - 支持 `fade/slideUp/stagger`
  - 支持 `once: false` 重复触发（离开视口后重置）

---

## 关键依赖与配置

- 依赖：`animejs`
- 默认缓动：`outQuad`
- 页面切换与弹窗动画统一依赖 `DURATION` 常量

---

## 数据模型

- `DURATION` 为毫秒配置对象：`fast/base/slow/pageLeave/pageEnter`
- `reveal` 配置模型：`effect/threshold/once/duration/delay/translateY`

---

## 测试与质量

当前无测试。

建议：
- 单测 `unwrap` 与 `reveal` 在 ref/HTMLElement/空值场景下行为；
- 验证 `once=false` 时重入触发逻辑；
- 为动画参数提供快照或契约测试，防止无意修改节奏。

---

## 常见问题 (FAQ)

### 1) 动画抖动或 done 重复触发如何处理？
页面层应使用 safeDone 包装（当前 `App.vue`、`NavBar.vue`、`CollectiblesView.vue` 已实现类似保护）。

### 2) 想统一提速动画？
先改 `anime.config.js`，再做少量组件微调。

---

## 相关文件清单

- `src/composables/anime.config.js`
- `src/composables/useAnimate.js`
- `src/composables/useScrollReveal.js`

---

## 变更记录 (Changelog)

| 时间 | 操作 | 说明 |
|------|------|------|
| 2026-04-24T11:14:37 | 初始化创建 | 新增 composables 模块文档，梳理动画 API 与时序配置 |
