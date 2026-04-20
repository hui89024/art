# anime.js 动画集成实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为剪艺 Vue 3 SPA 引入 anime.js，实现路由过渡（交叉淡变）、首屏入场动画（stagger/slideUp）、滚动触发入场动画（IntersectionObserver）及弹窗开关动画（scaleIn）。

**Architecture:** 新增两个 Vue 3 Composable（`useAnimate.js`、`useScrollReveal.js`）+ 共享常量文件（`anime.config.js`），路由过渡在 `App.vue` 层通过 Vue `<Transition>` JS 钩子实现，弹窗动画通过父组件包裹 `<Transition>` 实现，无需修改 Modal 组件内部结构。

**Tech Stack:** Vue 3 Composition API、anime.js v3、Vue Router `<Transition>` JS hooks、IntersectionObserver API

---

## 文件变更总览

| 操作 | 文件 | 说明 |
|------|------|------|
| 新建 | `src/composables/anime.config.js` | 共享 easing/duration 常量 |
| 新建 | `src/composables/useAnimate.js` | fadeIn / slideUp / staggerIn / scaleIn |
| 新建 | `src/composables/useScrollReveal.js` | IntersectionObserver 滚动触发入场 |
| 修改 | `src/App.vue` | RouterView 包裹 Transition，绑定路由过渡钩子 |
| 修改 | `src/components/NavBar.vue` | 导航链接 staggerIn 入场 |
| 修改 | `src/views/HomeView.vue` | 产品区 slideUp/staggerIn，工艺区 scrollReveal |
| 修改 | `src/views/CollectiblesView.vue` | 左右列 slideUp 入场 + StoryModal Transition 包裹 |
| 修改 | `package.json` | 新增 animejs 依赖（通过 npm install） |

> **注意：** `NavBar.vue` 已包含 LoginModal 的 Teleport 挂载，LoginModal 的 Transition 将在此处添加。

---

### Task 1: 安装 anime.js 并创建共享配置

**Files:**
- Modify: `package.json`（npm install 自动更新）
- Create: `src/composables/anime.config.js`

- [ ] **Step 1: 安装 anime.js**

```bash
cd /home/devbox/project && npm install animejs
```

预期输出：`added 1 package` 或类似，无报错。

- [ ] **Step 2: 验证安装**

```bash
node -e "import('animejs').then(m => console.log('anime.js ok:', typeof m.default))"
```

预期输出：`anime.js ok: function`

- [ ] **Step 3: 创建共享配置文件**

创建 `src/composables/anime.config.js`：

```js
// 全局动画常量 —— 典雅舒缓风格
export const EASING = 'easeInOutQuad'

export const DURATION = {
  fast: 500,   // 快速反馈（弹窗关闭）
  base: 800,   // 标准入场
  slow: 1100   // 强调性入场
}

export const STAGGER_DELAY = 80  // stagger 间隔 ms
```

- [ ] **Step 4: 验证 Vite 能解析 animejs**

```bash
cd /home/devbox/project && npm run build 2>&1 | tail -5
```

预期：构建成功，无 `Cannot resolve module 'animejs'` 报错。

---

### Task 2: 创建 `useAnimate.js` Composable

**Files:**
- Create: `src/composables/useAnimate.js`

- [ ] **Step 1: 创建 composable 文件**

创建 `src/composables/useAnimate.js`：

```js
import anime from 'animejs'
import { EASING, DURATION, STAGGER_DELAY } from './anime.config.js'

/**
 * useAnimate — 入场与交互动画
 * 所有方法接受 HTMLElement | Ref<HTMLElement> | string（CSS 选择器）
 * 返回 anime.js Animation 实例
 */
export function useAnimate() {
  /**
   * 将 ref 或 HTMLElement 解包为真实 DOM 节点
   * @param {HTMLElement|import('vue').Ref|string} el
   * @returns {HTMLElement|string}
   */
  function unwrap(el) {
    if (el && typeof el === 'object' && 'value' in el) return el.value
    return el
  }

  /**
   * 透明度淡入 0 → 1
   */
  function fadeIn(el, opts = {}) {
    return anime({
      targets: unwrap(el),
      opacity: [0, 1],
      duration: opts.duration ?? DURATION.base,
      easing: opts.easing ?? EASING,
      delay: opts.delay ?? 0
    })
  }

  /**
   * 向上滑入 + 淡入（translateY 40px → 0）
   */
  function slideUp(el, opts = {}) {
    return anime({
      targets: unwrap(el),
      opacity: [0, 1],
      translateY: [40, 0],
      duration: opts.duration ?? DURATION.base + 100,
      easing: opts.easing ?? EASING,
      delay: opts.delay ?? 0
    })
  }

  /**
   * 子元素逐个 slideUp（用于列表/卡片组）
   * @param {HTMLElement|Ref} parent  —— 父容器，子元素为动画对象
   * @param {object} opts
   * @param {number} [opts.delay=80]  —— 每个子元素的额外延迟
   */
  function staggerIn(parent, opts = {}) {
    const el = unwrap(parent)
    if (!el) return
    return anime({
      targets: el.children,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: opts.duration ?? DURATION.base,
      easing: opts.easing ?? EASING,
      delay: anime.stagger(opts.delay ?? STAGGER_DELAY)
    })
  }

  /**
   * 缩放淡入 0.92 → 1（适合弹窗、卡片聚焦）
   */
  function scaleIn(el, opts = {}) {
    return anime({
      targets: unwrap(el),
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: opts.duration ?? DURATION.base,
      easing: opts.easing ?? EASING,
      delay: opts.delay ?? 0
    })
  }

  /**
   * 淡出（用于弹窗关闭）
   */
  function fadeOut(el, opts = {}) {
    return anime({
      targets: unwrap(el),
      opacity: [1, 0],
      scale: opts.scale ? [1, 0.95] : undefined,
      duration: opts.duration ?? DURATION.fast,
      easing: opts.easing ?? EASING,
      delay: opts.delay ?? 0
    })
  }

  return { fadeIn, slideUp, staggerIn, scaleIn, fadeOut }
}
```

- [ ] **Step 2: 快速构建验证语法无误**

```bash
cd /home/devbox/project && npm run build 2>&1 | grep -E "error|Error|warning" | head -10
```

预期：无错误输出（warning 可忽略）。

---

### Task 3: 创建 `useScrollReveal.js` Composable

**Files:**
- Create: `src/composables/useScrollReveal.js`

> **注意：** HomeView.vue 已有一个 IntersectionObserver 监听 `.reveal` 和 `.js-accessory-card` 类。本 composable 使用 ref 传参，不使用 class 选择器，两者不会冲突。

- [ ] **Step 1: 创建 composable 文件**

创建 `src/composables/useScrollReveal.js`：

```js
import { onUnmounted } from 'vue'
import anime from 'animejs'
import { EASING, DURATION, STAGGER_DELAY } from './anime.config.js'

/**
 * useScrollReveal — 滚动触发入场动画
 * 使用 IntersectionObserver，元素进入视口时触发 anime.js 动画
 */
export function useScrollReveal() {
  /** @type {IntersectionObserver|null} */
  let observer = null

  /** 所有已注册元素及其配置 @type {Map<Element, object>} */
  const registry = new Map()

  function getOrCreateObserver(threshold) {
    // 每次调用 reveal 时懒创建 observer（threshold 统一用第一次传入的值）
    if (observer) return observer

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const opts = registry.get(entry.target)
        if (!opts) return
        runAnimation(entry.target, opts)
        // once: true —— 触发后停止观察
        if (opts.once !== false) observer.unobserve(entry.target)
      })
    }, { threshold: threshold ?? 0.15 })

    return observer
  }

  function runAnimation(el, opts) {
    const effect = opts.effect ?? 'slideUp'

    if (effect === 'stagger') {
      anime({
        targets: el.children,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: opts.duration ?? DURATION.base,
        easing: opts.easing ?? EASING,
        delay: anime.stagger(opts.delay ?? STAGGER_DELAY)
      })
      return
    }

    const props = {
      targets: el,
      opacity: [0, 1],
      duration: opts.duration ?? DURATION.base,
      easing: opts.easing ?? EASING
    }

    if (effect === 'slideUp') {
      props.translateY = [40, 0]
    }

    anime(props)
  }

  /**
   * 注册一个元素，进入视口时播放动画
   * @param {import('vue').Ref<HTMLElement>|HTMLElement} elRef
   * @param {object} [opts]
   * @param {'fade'|'slideUp'|'stagger'} [opts.effect='slideUp']
   * @param {number} [opts.threshold=0.15]  可见比例阈值
   * @param {boolean} [opts.once=true]      只触发一次
   * @param {number} [opts.duration]        覆盖默认 duration
   * @param {number} [opts.delay]           stagger 间隔（effect='stagger' 时）
   */
  function reveal(elRef, opts = {}) {
    const el = elRef && 'value' in elRef ? elRef.value : elRef
    if (!el) return

    const threshold = opts.threshold ?? 0.15

    // 设置初始隐藏状态（anime 动画前）
    el.style.opacity = '0'
    if ((opts.effect ?? 'slideUp') !== 'fade') {
      el.style.transform = 'translateY(40px)'
    }
    // effect='stagger' 时隐藏所有子元素
    if (opts.effect === 'stagger') {
      Array.from(el.children).forEach((child) => {
        child.style.opacity = '0'
        child.style.transform = 'translateY(40px)'
      })
      el.style.opacity = ''
      el.style.transform = ''
    }

    registry.set(el, { once: true, ...opts })
    getOrCreateObserver(threshold).observe(el)
  }

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    registry.clear()
  })

  return { reveal }
}
```

- [ ] **Step 2: 构建验证**

```bash
cd /home/devbox/project && npm run build 2>&1 | grep -E "error|Error" | head -5
```

预期：无错误。

---

### Task 4: 路由切换过渡（App.vue）

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: 修改 App.vue**

将 `src/App.vue` 全量替换为：

```vue
<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import anime from 'animejs'
import { EASING } from './composables/anime.config.js'

function onLeave(el, done) {
  anime({
    targets: el,
    opacity: [1, 0],
    duration: 400,
    easing: EASING,
    complete: done
  })
}

function onEnter(el, done) {
  anime({
    targets: el,
    opacity: [0, 1],
    duration: 600,
    easing: EASING,
    complete: done
  })
}
</script>

<template>
  <div class="min-h-screen flex flex-col relative bg-evasion-black text-white selection:bg-accent/30 selection:text-white overflow-x-hidden antialiased">
    <NavBar />
    <RouterView v-slot="{ Component }">
      <Transition :css="false" @leave="onLeave" @enter="onEnter">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </div>
</template>
```

- [ ] **Step 2: 开发服务器验证**

```bash
cd /home/devbox/project && npm run dev &
sleep 3 && echo "Dev server running"
```

打开浏览器 `http://localhost:3000`，点击导航栏「经典展厅」链接，观察：
- 首页淡出（约 400ms）
- 藏品页淡入（约 600ms）
- 无白屏/闪烁

---

### Task 5: NavBar 导航链接入场动画

**Files:**
- Modify: `src/components/NavBar.vue`

> 目标：页面加载后，中部导航链接（`.hidden.lg:flex` 容器内的子元素）依次 staggerIn。

- [ ] **Step 1: 在 NavBar.vue 中引入 useAnimate 并添加 ref**

找到 `src/components/NavBar.vue` 的 `<script setup>` 块，在现有 import 后追加：

```js
import { ref, onMounted, onUnmounted } from 'vue'        // 已存在，勿重复
import { RouterLink, useRouter } from 'vue-router'        // 已存在，勿重复
import { getStoredAuth, clearAuth } from '../services/authService'  // 已存在
import LoginModal from './LoginModal.vue'                 // 已存在
import anime from 'animejs'                               // 新增
import { useAnimate } from '../composables/useAnimate.js' // 新增
import { EASING, DURATION } from '../composables/anime.config.js' // 新增
```

在现有 `ref` 声明后追加：

```js
const navLinksRef = ref(null)
const { staggerIn } = useAnimate()
```

在现有 `onMounted` 中追加（紧接 `updateAuth()` 之后）：

```js
onMounted(() => {
  updateAuth()
  window.addEventListener('scroll', handleScroll)
  // 新增：导航链接入场动画
  if (navLinksRef.value) {
    staggerIn(navLinksRef, { delay: 80, duration: DURATION.base })
  }
})
```

- [ ] **Step 2: 给导航链接容器绑定 ref**

在 `<template>` 中找到：

```html
<div class="hidden lg:flex items-center space-x-10 text-[10px] uppercase tracking-[0.2em] font-bold text-[#888888]">
```

改为：

```html
<div ref="navLinksRef" class="hidden lg:flex items-center space-x-10 text-[10px] uppercase tracking-[0.2em] font-bold text-[#888888]">
```

- [ ] **Step 3: 浏览器验证**

刷新 `http://localhost:3000`，观察顶部导航链接（核心作品、工艺技法、经典展厅、文创周边）在页面加载后依次从下方滑入。

---

### Task 6: LoginModal 开关动画（NavBar.vue 层）

**Files:**
- Modify: `src/components/NavBar.vue`

> 在 NavBar.vue 的 `<Teleport>` 处包裹 `<Transition>`，用 anime.js JS 钩子驱动弹窗 scaleIn 和 fadeOut。

- [ ] **Step 1: 在 NavBar.vue script 中添加弹窗动画钩子函数**

在 `navLinksRef` 声明之后追加：

```js
function onModalEnter(el, done) {
  const box = el.querySelector('.relative.w-full')
  if (!box) { done(); return }
  anime({
    targets: box,
    opacity: [0, 1],
    scale: [0.92, 1],
    duration: DURATION.base,
    easing: EASING,
    complete: done
  })
}

function onModalLeave(el, done) {
  const box = el.querySelector('.relative.w-full')
  if (!box) { done(); return }
  anime({
    targets: box,
    opacity: [1, 0],
    scale: [1, 0.95],
    duration: DURATION.fast,
    easing: EASING,
    complete: done
  })
}
```

- [ ] **Step 2: 用 Transition 包裹 Teleport 内的 LoginModal**

找到 NavBar.vue template 中：

```html
  <Teleport to="body">
    <LoginModal :is-open="showLogin" @close="showLogin = false" @login-success="updateAuth" />
  </Teleport>
```

改为：

```html
  <Teleport to="body">
    <Transition :css="false" @enter="onModalEnter" @leave="onModalLeave">
      <LoginModal v-if="showLogin" @close="showLogin = false" @login-success="updateAuth" />
    </Transition>
  </Teleport>
```

> **注意：** 原 `LoginModal` 的 `isOpen` prop 不再需要，改为 `v-if` 控制挂载。同时需更新 `LoginModal.vue` 移除 `isOpen` prop 的依赖（见 Step 3）。

- [ ] **Step 3: 更新 LoginModal.vue 移除 isOpen prop**

打开 `src/components/LoginModal.vue`，找到：

```js
const props = defineProps({
  isOpen: Boolean
})
```

改为：

```js
const props = defineProps({})
```

找到 template 中：

```html
<div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
```

改为：

```html
<div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
```

- [ ] **Step 4: 浏览器验证**

点击「立即探索」按钮：观察登录弹窗从中心缩放淡入（约 800ms）。
点击遮罩或 X 按钮：观察弹窗缩放淡出（约 500ms）后消失。

---

### Task 7: HomeView 首屏动画（产品卡片区）

**Files:**
- Modify: `src/views/HomeView.vue`

> 目标：「核心作品」区块的标题和 3 列产品卡片在首页加载后依次 slideUp/staggerIn。
> 该区块已在首屏，使用 `useAnimate`（非 scrollReveal）。

- [ ] **Step 1: 在 HomeView.vue script 中引入 useAnimate**

找到 HomeView.vue 的 `<script setup>` 块顶部，追加：

```js
import { useAnimate } from '../composables/useAnimate.js'
import { DURATION } from '../composables/anime.config.js'
```

在现有 `ref` 声明区域追加：

```js
const productHeadingRef = ref(null)
const productCardsRef = ref(null)
const { slideUp, staggerIn } = useAnimate()
```

- [ ] **Step 2: 在 onMounted 末尾追加首屏动画**

找到 HomeView.vue 的 `onMounted` 函数（已有 observer 和 accessoriesTrackRef 的代码），在其末尾（`}` 前）追加：

```js
  // 产品区首屏入场动画
  if (productHeadingRef.value) {
    slideUp(productHeadingRef, { delay: 100, duration: DURATION.slow })
  }
  if (productCardsRef.value) {
    staggerIn(productCardsRef, { delay: 120, duration: DURATION.base })
  }
```

- [ ] **Step 3: 给产品区 heading 和 cards 容器绑定 ref**

在 HomeView.vue template 中，找到「核心作品」区块的标题容器：

```html
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
```

改为：

```html
      <div ref="productHeadingRef" class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
```

找到产品 3 列 grid 容器：

```html
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
```

改为：

```html
      <div ref="productCardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-6">
```

- [ ] **Step 4: 浏览器验证**

刷新 `http://localhost:3000`，观察：
- 「千刻万镂，传世之美。」标题向上滑入
- 3 件产品卡片依次（间隔 120ms）向上滑入

---

### Task 8: HomeView 滚动触发动画（工艺区）

**Files:**
- Modify: `src/views/HomeView.vue`

> 目标：`#technology` 区块的 4 列工艺卡片在滚动进入视口时 staggerIn。

- [ ] **Step 1: 在 HomeView.vue script 引入 useScrollReveal**

追加 import（与 Task 7 同一处，勿重复 useAnimate import）：

```js
import { useScrollReveal } from '../composables/useScrollReveal.js'
```

追加 ref 和 reveal：

```js
const techCardsRef = ref(null)
const { reveal } = useScrollReveal()
```

- [ ] **Step 2: 在 onMounted 末尾注册 scrollReveal**

在 `onMounted` 末尾（产品区动画之后）追加：

```js
  // 工艺区滚动触发入场
  if (techCardsRef.value) {
    reveal(techCardsRef, { effect: 'stagger', threshold: 0.1, delay: 100 })
  }
```

- [ ] **Step 3: 给工艺卡片 grid 绑定 ref**

找到 `#technology` 区块内的 4 列 grid：

```html
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

改为：

```html
      <div ref="techCardsRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

- [ ] **Step 4: 浏览器验证**

在 `http://localhost:3000` 向下滚动到「核心工艺」区块，观察 4 列卡片依次从下方滑入（而非直接出现）。

---

### Task 9: CollectiblesView 入场动画 + StoryModal 动画

**Files:**
- Modify: `src/views/CollectiblesView.vue`

> 目标：进入 `/collectibles` 后，左侧展台列和右侧信息列依次 slideUp 入场；StoryModal 开关时 scaleIn/fadeOut。

- [ ] **Step 1: 引入 composable 和 anime**

在 `src/views/CollectiblesView.vue` 的 `<script setup>` 中，追加：

```js
import { ref, onMounted } from 'vue'   // 已有 ref，追加 onMounted
import anime from 'animejs'
import { useAnimate } from '../composables/useAnimate.js'
import { EASING, DURATION } from '../composables/anime.config.js'
```

追加 ref 声明：

```js
const leftColRef = ref(null)
const rightColRef = ref(null)
const { slideUp } = useAnimate()
```

- [ ] **Step 2: onMounted 入场动画**

追加 `onMounted`：

```js
onMounted(() => {
  slideUp(leftColRef, { delay: 100, duration: DURATION.base })
  slideUp(rightColRef, { delay: 260, duration: DURATION.base })
})
```

- [ ] **Step 3: 给左右两列绑定 ref**

找到左列容器：

```html
      <div class="flex-1 flex items-center justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 relative">
```

改为：

```html
      <div ref="leftColRef" class="flex-1 flex items-center justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 relative">
```

找到右列容器：

```html
      <div class="flex-1 flex flex-col justify-center p-8 lg:p-20 space-y-10 relative">
```

改为：

```html
      <div ref="rightColRef" class="flex-1 flex flex-col justify-center p-8 lg:p-20 space-y-10 relative">
```

- [ ] **Step 4: 添加 StoryModal 动画钩子函数**

在 script 中追加：

```js
function onStoryEnter(el, done) {
  const box = el.querySelector('.relative.w-full')
  if (!box) { done(); return }
  anime({
    targets: box,
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: DURATION.base,
    easing: EASING,
    complete: done
  })
}

function onStoryLeave(el, done) {
  const box = el.querySelector('.relative.w-full')
  if (!box) { done(); return }
  anime({
    targets: box,
    opacity: [1, 0],
    scale: [1, 0.97],
    duration: DURATION.fast,
    easing: EASING,
    complete: done
  })
}
```

- [ ] **Step 5: 用 Transition 包裹 StoryModal**

找到：

```html
    <Teleport to="body">
      <StoryModal :is-open="showStory" @close="showStory = false" />
    </Teleport>
```

改为：

```html
    <Teleport to="body">
      <Transition :css="false" @enter="onStoryEnter" @leave="onStoryLeave">
        <StoryModal v-if="showStory" @close="showStory = false" />
      </Transition>
    </Teleport>
```

- [ ] **Step 6: 更新 StoryModal.vue 移除 isOpen prop**

打开 `src/components/StoryModal.vue`，找到：

```js
const props = defineProps({
  isOpen: Boolean
})
```

改为：

```js
const props = defineProps({})
```

找到 template 中：

```html
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
```

改为：

```html
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
```

- [ ] **Step 7: 浏览器验证**

1. 访问 `http://localhost:3000/collectibles`，观察左右两列依次滑入。
2. 点击「作品详情」按钮，观察 StoryModal 从中心缩放淡入。
3. 点击 X 或遮罩，观察弹窗缩放淡出。

---

### Task 10: 最终整合验证

**Files:** 无新增文件

- [ ] **Step 1: 生产构建验证**

```bash
cd /home/devbox/project && npm run build 2>&1
```

预期：构建成功，输出类似：
```
✓ built in X.XXs
dist/assets/index-XXXXX.js    XXX kB │ gzip: XX kB
```

无 `ERROR` 或 `error` 输出。

- [ ] **Step 2: 完整流程验证（开发服务器）**

```bash
npm run dev
```

打开 `http://localhost:3000`，按顺序验证：

| # | 操作 | 预期结果 |
|---|------|----------|
| 1 | 刷新首页 | 导航链接依次滑入 |
| 2 | 等待首屏 | 产品标题 + 3 张卡片依次滑入 |
| 3 | 向下滚动 | 工艺区 4 列卡片滚动触发滑入 |
| 4 | 点击「立即探索」 | 登录弹窗 scaleIn 出现 |
| 5 | 关闭登录弹窗 | 弹窗 scaleOut 消失 |
| 6 | 点击「经典展厅」 | 首页淡出 → 藏品页淡入（路由过渡） |
| 7 | 藏品页加载后 | 左右列依次滑入 |
| 8 | 点击「作品详情」 | StoryModal scaleIn 出现 |
| 9 | 关闭 StoryModal | 弹窗 scaleOut 消失 |
| 10 | 点击「核心作品」 | 藏品页淡出 → 首页淡入（路由过渡） |

- [ ] **Step 3: 停止开发服务器**

```bash
kill $(lsof -ti:3000) 2>/dev/null || true
```

---

## 备注：Hero Carousel 入场动画

规格动画清单列出了"Hero 轮播 标题/副标题 → slideUp → useAnimate"，但本计划未修改 `Carousel.vue`。

**原因：** `Carousel.vue` 已通过 `isVisible` ref（100ms 延迟后设为 `true`）实现 CSS 入场动画，功能上等效于 slideUp 效果；规格"范围边界"同时说明"Carousel 内部幻灯片切换动画（已有实现，不覆盖）"。若后续需要将 Carousel 入场动画统一迁移至 anime.js，可单独作为追加任务实现。
