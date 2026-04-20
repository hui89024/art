# anime.js 动画集成设计文档

**项目**：剪艺数字艺术平台
**日期**：2026-04-13
**状态**：已确认，待实现

---

## 目标

为剪艺 Vue 3 SPA 引入 anime.js，实现三类动画效果：

1. **页面切换过渡**（路由跳转时交叉淡变）
2. **首屏组件入场**（页面加载后依次播放）
3. **滚动触发入场**（元素进入视口时触发，折叠区域）

动画风格：典雅舒缓，duration 800–1100ms，`easeInOutQuad` 曲线，与剪艺东方美学主题契合。

---

## 设计决策

| 问题 | 决策 | 原因 |
|------|------|------|
| 动画风格 | 典雅舒缓（slow ease-in-out） | 符合非遗/东方美学气质 |
| 滚动触发 | 混合（首屏加载 + 折叠区滚动） | 首屏内容立即播放，长页面按需触发 |
| 页面过渡 | 交叉淡变（400ms out + 600ms in） | 最克制优雅，不打断阅读节奏 |
| 集成方式 | Composable 封装 | 与现有 Composition API 风格一致，YAGNI |
| `prefers-reduced-motion` | 不实现 | 当前阶段不在范围内 |

---

## 架构

### 新增文件

```
src/
└── composables/
    ├── anime.config.js       # 全局 easing / duration 常量
    ├── useAnimate.js         # 入场 & 交互动画
    └── useScrollReveal.js    # IntersectionObserver 滚动触发
```

### 改动文件

| 文件 | 改动内容 |
|------|----------|
| `package.json` | 新增 `animejs` 依赖 |
| `src/App.vue` | `<RouterView v-slot>` 包裹 `<Transition>`，绑定 JS 钩子 |
| `src/views/HomeView.vue` | 调用 `useAnimate`（首屏）+ `useScrollReveal`（折叠区） |
| `src/views/CollectiblesView.vue` | 调用 `useAnimate`（首屏入场） |
| `src/components/NavBar.vue` | `staggerIn` 导航项入场 |
| `src/components/LoginModal.vue` | `scaleIn` / `fadeOut` 弹窗开关 |
| `src/components/StoryModal.vue` | 同 LoginModal |

---

## Composable API

### `src/composables/anime.config.js`

```js
export const EASING = 'easeInOutQuad'
export const DURATION = { fast: 500, base: 800, slow: 1100 }
```

### `useAnimate.js`

暴露方法：

| 方法 | 说明 | 默认 duration |
|------|------|--------------|
| `fadeIn(el, opts?)` | 透明度 0→1 | 800ms |
| `slideUp(el, opts?)` | translateY 40px→0 + fadeIn | 900ms |
| `staggerIn(els, opts?)` | 子元素逐个 slideUp，间隔可配 | 900ms，delay 80ms |
| `scaleIn(el, opts?)` | scale 0.92→1 + fadeIn，适合弹窗 | 800ms |

所有方法返回 anime.js `Animation` 实例。

### `useScrollReveal.js`

```js
const { reveal } = useScrollReveal()
reveal(el, { effect: 'slideUp', threshold: 0.15, once: true })
```

| 参数 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `effect` | `'fade'` \| `'slideUp'` \| `'stagger'` | `'slideUp'` | 入场效果 |
| `threshold` | `number` | `0.15` | 可见比例阈值 |
| `once` | `boolean` | `true` | 只触发一次 |

内部使用单例 `IntersectionObserver`，`onUnmounted` 自动 disconnect。

---

## 路由过渡实现

`src/App.vue` 使用 Vue `<Transition>` JS 钩子，完全由 anime.js 驱动：

```vue
<RouterView v-slot="{ Component }">
  <Transition :css="false" @leave="onLeave" @enter="onEnter">
    <component :is="Component" :key="$route.path" />
  </Transition>
</RouterView>
```

```js
function onLeave(el, done) {
  anime({ targets: el, opacity: [1, 0], duration: 400, easing: EASING, complete: done })
}
function onEnter(el, done) {
  anime({ targets: el, opacity: [0, 1], duration: 600, easing: EASING, complete: done })
}
```

- `:css="false"` 跳过 Vue CSS transition，动画引擎统一
- `done()` 回调确保旧页面在动画完成后才卸载，无闪烁

---

## 各组件动画清单

| 位置 | 触发时机 | 效果 | Composable |
|------|----------|------|-----------|
| NavBar 导航项 | 页面加载 | `staggerIn`，间隔 80ms | `useAnimate` |
| Hero 轮播 标题/副标题 | 页面加载 | `slideUp`，900ms | `useAnimate` |
| HomeView 工艺介绍区块 | 滚动进入 | `staggerIn`（卡片逐一） | `useScrollReveal` |
| HomeView 文创周边区 | 滚动进入 | `slideUp` | `useScrollReveal` |
| CollectiblesView 藏品卡片 | 页面加载 | `staggerIn`，间隔 60ms | `useAnimate` |
| LoginModal 开启 | 点击登录 | `scaleIn` + `fadeIn` | `useAnimate` |
| LoginModal 关闭 | 点击关闭/遮罩 | opacity 反向淡出 | `useAnimate` |
| StoryModal 开启/关闭 | 点击作品 | 同 LoginModal | `useAnimate` |
| 路由切换 | 导航跳转 | 交叉淡变（400ms out + 600ms in） | App.vue 钩子 |

---

## 依赖

```bash
npm install animejs
```

anime.js v4 支持 ES Module 按需导入，bundle 增量约 **+16 KB gzip**。

---

## 范围边界

**不在本次范围内：**
- `prefers-reduced-motion` 无障碍支持
- Carousel 内部幻灯片切换动画（已有实现，不覆盖）
- LaptopAnimation / PhoneAnimation 组件（已有 CSS 3D 动画，不覆盖）
- 任何新增路由或页面
