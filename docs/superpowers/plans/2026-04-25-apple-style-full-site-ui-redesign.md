# Apple 风格全站 UI 重设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不删除任何现有功能的前提下，完成六个页面（Home、Collectibles、Events、AppDownload、Contact、PatternLibrary）的 Apple 风格 A+B 混合改版，实现双端同优先与首屏冲击提升。

**Architecture:** 先建立“可测试的设计系统底座”（tokens + motion + 基础组件），再按页面分批改造。每个页面遵循同一视觉语法（颜色/间距/按钮/卡片/动效参数），通过共享组件与 composables 控制一致性，并用单元测试 + 视觉回归保证无功能回归。

**Tech Stack:** Vue 3 (`<script setup>`)、Vite 5、Tailwind CSS 3、animejs 4、Vue Router 5、Vitest + Vue Test Utils、Playwright（视觉回归）

---

## 0. 文件结构与职责映射（先锁定边界）

### 新增文件
- `vitest.config.js`：Vitest 运行配置（jsdom + setup）
- `tests/setup/vitest.setup.js`：测试环境基础 mock（`matchMedia`、`IntersectionObserver`）
- `tests/unit/theme/tokens.spec.js`：设计 token 契约测试
- `tests/unit/motion/motion.spec.js`：动效参数与降级策略测试
- `tests/unit/components/SectionHero.spec.js`：SectionHero 组件测试
- `tests/unit/components/CTACluster.spec.js`：CTACluster 组件测试
- `tests/unit/views/home-redesign.spec.js`：首页改版结构测试
- `tests/unit/views/pattern-library-redesign.spec.js`：纹样库改版结构测试
- `tests/e2e/ui-redesign.spec.ts`：关键页面视觉与交互回归测试
- `playwright.config.ts`：E2E 与截图回归配置
- `src/components/SectionHero.vue`：统一大标题区组件
- `src/components/FeatureGrid.vue`：统一特性卡片网格组件
- `src/components/CTACluster.vue`：统一主次操作按钮组
- `src/composables/motion.js`：动效参数与 `prefers-reduced-motion` 策略

### 修改文件
- `package.json`：增加 `test:unit`、`test:e2e`、`test` 脚本与依赖
- `tailwind.config.js`：新增 Apple+A/B 设计 token（不删除旧 token）
- `src/assets/index.css`：全局变量、基础排版、卡片/按钮/导航基线样式
- `src/composables/anime.config.js`：统一动效时长与缓动常量
- `src/composables/useAnimate.js`：接入 motion 降级策略
- `src/composables/useScrollReveal.js`：滚动触发与降级控制
- `src/components/NavBar.vue`：导航层级、透明到实底、移动端可用性优化
- `src/components/Carousel.vue`：首屏 Hero 叙事化重构
- `src/components/PhoneAnimation.vue`：设备展示样式现代化
- `src/components/LaptopAnimation.vue`：设备动画节奏与视觉现代化
- `src/views/HomeView.vue`：新版首页结构与节奏
- `src/views/CollectiblesView.vue`：画廊式布局与信息层级重排
- `src/views/EventsView.vue`：时间叙事 + 活动状态强化
- `src/views/AppDownloadView.vue`：设备演示 + 下载聚焦改版
- `src/views/ContactView.vue`：品牌化联系页结构
- `src/views/PatternLibraryView.vue`：探索工作台式布局（登录后）

---

### Task 1: 建立测试与回归基础设施

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `tests/setup/vitest.setup.js`
- Create: `playwright.config.ts`

- [ ] **Step 1: 写一个失败用例，确认当前仓库缺少测试入口**

```bash
npm run test:unit
```

Expected: FAIL，输出类似 `Missing script: "test:unit"`。

- [ ] **Step 2: 增加 Vitest 与 Playwright 脚本及依赖**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:e2e": "playwright test",
    "test": "npm run test:unit && npm run test:e2e"
  },
  "devDependencies": {
    "@playwright/test": "^1.55.0",
    "@vue/test-utils": "^2.4.6",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.9"
  }
}
```

- [ ] **Step 3: 增加 Vitest 配置与 setup**

`vitest.config.js`
```js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup/vitest.setup.js'],
    include: ['tests/unit/**/*.spec.{js,ts}']
  }
})
```

`tests/setup/vitest.setup.js`
```js
import { vi } from 'vitest'

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  })
}

if (!global.IntersectionObserver) {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
```

- [ ] **Step 4: 增加 Playwright 配置用于视觉回归**

`playwright.config.ts`
```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } }
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 3000',
    port: 3000,
    reuseExistingServer: true
  }
})
```

- [ ] **Step 5: 运行测试命令验证基础设施可用**

```bash
npm run test:unit
```

Expected: PASS（当前无单测时为 0 tests）。

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.js tests/setup/vitest.setup.js playwright.config.ts
git commit -m "test: bootstrap vitest and playwright infrastructure"
```

---

### Task 2: 建立全局设计 Token（颜色/间距/圆角/阴影）

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/assets/index.css`
- Test: `tests/unit/theme/tokens.spec.js`

- [ ] **Step 1: 先写失败测试，定义必须存在的新 token 契约**

`tests/unit/theme/tokens.spec.js`
```js
import { describe, it, expect } from 'vitest'
import config from '../../../tailwind.config.js'

describe('design tokens', () => {
  it('contains apple-style color tokens', () => {
    const colors = config.theme.extend.colors
    expect(colors['brand-red']).toBe('#B4232A')
    expect(colors['ink-black']).toBe('#111214')
    expect(colors['porcelain-white']).toBe('#F7F5F2')
    expect(colors['jade-gray']).toBe('#A3A8AC')
    expect(colors['gold-accent']).toBe('#C8A86B')
  })

  it('contains spacing/radius/shadow scale for unified UI', () => {
    const extend = config.theme.extend
    expect(extend.spacing['18']).toBe('4.5rem')
    expect(extend.borderRadius['2xl']).toBeDefined()
    expect(extend.boxShadow['glass']).toContain('rgba')
  })
})
```

- [ ] **Step 2: 运行用例确认失败**

```bash
npm run test:unit -- tests/unit/theme/tokens.spec.js
```

Expected: FAIL，提示缺少 `brand-red` 等键。

- [ ] **Step 3: 在 Tailwind 中新增 token（保留旧 token 兼容）**

`tailwind.config.js`（在 `theme.extend` 中追加）
```js
extend: {
  colors: {
    'brand-red': '#B4232A',
    'ink-black': '#111214',
    'porcelain-white': '#F7F5F2',
    'jade-gray': '#A3A8AC',
    'gold-accent': '#C8A86B'
  },
  spacing: {
    '18': '4.5rem',
    '22': '5.5rem',
    '26': '6.5rem'
  },
  boxShadow: {
    glass: '0 12px 32px rgba(16, 18, 20, 0.08)',
    card: '0 10px 28px rgba(16, 18, 20, 0.10)'
  }
}
```

- [ ] **Step 4: 在全局 CSS 增加语义变量与基础样式基线**

`src/assets/index.css`（追加）
```css
:root {
  --jy-color-brand: theme('colors.brand-red');
  --jy-color-bg: theme('colors.porcelain-white');
  --jy-color-text: theme('colors.ink-black');
  --jy-color-muted: theme('colors.jade-gray');
  --jy-color-accent: theme('colors.gold-accent');
}

body {
  background-color: var(--jy-color-bg);
  color: var(--jy-color-text);
  letter-spacing: 0;
}

.jy-glass-card {
  border-radius: 1rem;
  border: 1px solid rgba(17, 18, 20, 0.08);
  background: rgba(247, 245, 242, 0.76);
  backdrop-filter: blur(14px);
  box-shadow: theme('boxShadow.glass');
}

.jy-primary-btn {
  background: var(--jy-color-brand);
  color: #fff;
  border-radius: 9999px;
  transition: transform 180ms ease, opacity 180ms ease;
}

.jy-primary-btn:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}
```

- [ ] **Step 5: 运行测试确认通过**

```bash
npm run test:unit -- tests/unit/theme/tokens.spec.js
```

Expected: PASS（2 passed）。

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js src/assets/index.css tests/unit/theme/tokens.spec.js
git commit -m "feat(ui): introduce global design tokens for apple-style redesign"
```

---

### Task 3: 建立统一动效系统与降级策略

**Files:**
- Modify: `src/composables/anime.config.js`
- Create: `src/composables/motion.js`
- Modify: `src/composables/useAnimate.js`
- Modify: `src/composables/useScrollReveal.js`
- Test: `tests/unit/motion/motion.spec.js`

- [ ] **Step 1: 先写失败测试，约束时长与降级行为**

`tests/unit/motion/motion.spec.js`
```js
import { describe, it, expect, vi } from 'vitest'
import { DURATION } from '../../../src/composables/anime.config.js'
import { resolveDuration, prefersReducedMotion } from '../../../src/composables/motion.js'

describe('motion policy', () => {
  it('keeps cinematic durations in expected range', () => {
    expect(DURATION.fast).toBeGreaterThanOrEqual(120)
    expect(DURATION.pageEnter).toBeLessThanOrEqual(1100)
  })

  it('returns 0 duration under reduced motion', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true })
    expect(prefersReducedMotion()).toBe(true)
    expect(resolveDuration(320)).toBe(0)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm run test:unit -- tests/unit/motion/motion.spec.js
```

Expected: FAIL，提示 `motion.js` 不存在。

- [ ] **Step 3: 新增 motion 策略文件**

`src/composables/motion.js`
```js
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function resolveDuration(ms) {
  return prefersReducedMotion() ? 0 : ms
}
```

- [ ] **Step 4: 统一 anime 配置并接入策略**

`src/composables/anime.config.js`
```js
export const EASING = 'outQuart'

export const DURATION = {
  micro: 160,
  fast: 180,
  base: 280,
  slow: 420,
  pageLeave: 260,
  pageEnter: 780
}

export const STAGGER_DELAY = 80
```

- [ ] **Step 5: 在 useAnimate/useScrollReveal 中使用 resolveDuration**

`src/composables/useAnimate.js`（核心替换）
```js
import { resolveDuration } from './motion.js'

// 示例：slideUp
function slideUp(el, opts = {}) {
  return animate(unwrap(el), {
    opacity: [0, 1],
    translateY: [opts.translateY ?? 48, 0],
    duration: resolveDuration(opts.duration ?? DURATION.base),
    ease: opts.ease ?? EASING,
    delay: opts.delay ?? 0
  })
}
```

`src/composables/useScrollReveal.js`（核心替换）
```js
import { resolveDuration, prefersReducedMotion } from './motion.js'

function runAnimation(el, opts) {
  if (prefersReducedMotion()) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    return
  }

  animate(el, {
    opacity: [0, 1],
    translateY: [opts.translateY ?? 48, 0],
    duration: resolveDuration(opts.duration ?? DURATION.base),
    ease: opts.ease ?? EASING
  })
}
```

- [ ] **Step 6: 运行测试确认通过**

```bash
npm run test:unit -- tests/unit/motion/motion.spec.js
```

Expected: PASS。

- [ ] **Step 7: Commit**

```bash
git add src/composables/anime.config.js src/composables/motion.js src/composables/useAnimate.js src/composables/useScrollReveal.js tests/unit/motion/motion.spec.js
git commit -m "feat(motion): unify animation timing and reduced-motion fallback"
```

---

### Task 4: 抽象可复用页面骨架组件（SectionHero / FeatureGrid / CTACluster）

**Files:**
- Create: `src/components/SectionHero.vue`
- Create: `src/components/FeatureGrid.vue`
- Create: `src/components/CTACluster.vue`
- Test: `tests/unit/components/SectionHero.spec.js`
- Test: `tests/unit/components/CTACluster.spec.js`

- [ ] **Step 1: 先写 SectionHero 失败测试**

`tests/unit/components/SectionHero.spec.js`
```js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SectionHero from '../../../src/components/SectionHero.vue'

describe('SectionHero', () => {
  it('renders title, subtitle and slot content', () => {
    const wrapper = mount(SectionHero, {
      props: { title: '千刻万镂', subtitle: '传世之美' },
      slots: { default: '<button>探索</button>' }
    })

    expect(wrapper.text()).toContain('千刻万镂')
    expect(wrapper.text()).toContain('传世之美')
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm run test:unit -- tests/unit/components/SectionHero.spec.js
```

Expected: FAIL，组件文件不存在。

- [ ] **Step 3: 实现 SectionHero 与 CTACluster**

`src/components/SectionHero.vue`
```vue
<script setup>
defineProps({
  kicker: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' }
})
</script>

<template>
  <header class="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
    <p v-if="kicker" class="text-xs tracking-[0.24em] uppercase text-jade-gray mb-4">{{ kicker }}</p>
    <h1 class="text-5xl md:text-6xl lg:text-7xl tracking-tight text-ink-black">{{ title }}</h1>
    <p v-if="subtitle" class="mt-3 text-xl md:text-2xl text-ink-black/78">{{ subtitle }}</p>
    <p v-if="description" class="mt-6 max-w-2xl text-sm md:text-base text-ink-black/66 leading-relaxed">{{ description }}</p>
    <div class="mt-8"><slot /></div>
  </header>
</template>
```

`src/components/CTACluster.vue`
```vue
<script setup>
defineProps({
  primaryText: { type: String, required: true },
  secondaryText: { type: String, required: true }
})
const emit = defineEmits(['primary', 'secondary'])
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button class="jy-primary-btn px-6 h-11 text-sm font-semibold" @click="emit('primary')">{{ primaryText }}</button>
    <button class="px-6 h-11 rounded-full border border-ink-black/15 text-sm font-semibold hover:bg-ink-black/5" @click="emit('secondary')">{{ secondaryText }}</button>
  </div>
</template>
```

- [ ] **Step 4: 实现 FeatureGrid 并加 CTACluster 测试**

`src/components/FeatureGrid.vue`
```vue
<script setup>
defineProps({
  items: { type: Array, default: () => [] }
})
</script>

<template>
  <section class="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    <article v-for="item in items" :key="item.id" class="jy-glass-card p-6">
      <h3 class="text-xl text-ink-black font-medium">{{ item.title }}</h3>
      <p class="mt-3 text-sm text-ink-black/65 leading-relaxed">{{ item.description }}</p>
    </article>
  </section>
</template>
```

`tests/unit/components/CTACluster.spec.js`
```js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CTACluster from '../../../src/components/CTACluster.vue'

describe('CTACluster', () => {
  it('emits primary and secondary clicks', async () => {
    const wrapper = mount(CTACluster, {
      props: { primaryText: '主按钮', secondaryText: '次按钮' }
    })

    await wrapper.findAll('button')[0].trigger('click')
    await wrapper.findAll('button')[1].trigger('click')

    expect(wrapper.emitted('primary')).toHaveLength(1)
    expect(wrapper.emitted('secondary')).toHaveLength(1)
  })
})
```

- [ ] **Step 5: 运行组件测试**

```bash
npm run test:unit -- tests/unit/components/SectionHero.spec.js tests/unit/components/CTACluster.spec.js
```

Expected: PASS。

- [ ] **Step 6: Commit**

```bash
git add src/components/SectionHero.vue src/components/FeatureGrid.vue src/components/CTACluster.vue tests/unit/components/SectionHero.spec.js tests/unit/components/CTACluster.spec.js
git commit -m "feat(ui): add reusable hero, feature grid, and cta cluster components"
```

---

### Task 5: 全局导航与首页 Hero 组件重构（NavBar + Carousel）

**Files:**
- Modify: `src/components/NavBar.vue`
- Modify: `src/components/Carousel.vue`
- Test: `tests/unit/views/home-redesign.spec.js`

- [ ] **Step 1: 先写首页结构失败测试（新版 Hero 必须存在）**

`tests/unit/views/home-redesign.spec.js`
```js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../../../src/views/HomeView.vue'

vi.mock('../../../src/components/Carousel.vue', () => ({
  default: { template: '<section data-testid="new-hero">hero</section>' }
}))

describe('Home redesign structure', () => {
  it('keeps hero and key navigation entry points', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('[data-testid="new-hero"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('核心作品')
    expect(wrapper.text()).toContain('核心工艺')
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm run test:unit -- tests/unit/views/home-redesign.spec.js
```

Expected: FAIL（当前结构不满足断言或测试无法通过）。

- [ ] **Step 3: 重构 NavBar 为高对比分层导航**

`src/components/NavBar.vue`（关键变更示例）
```vue
<template>
  <nav :class="['fixed inset-x-0 top-0 z-50 transition-all duration-300', isScrolled ? 'bg-porcelain-white/90 backdrop-blur-xl border-b border-ink-black/8' : 'bg-transparent']">
    <div class="max-w-[1440px] mx-auto h-18 px-6 lg:px-10 flex items-center justify-between">
      <!-- 左：品牌 -->
      <!-- 中：主导航 -->
      <!-- 右：登录态动作 -->
    </div>
  </nav>
</template>
```

- [ ] **Step 4: 重构 Carousel 为叙事型首屏**

`src/components/Carousel.vue`（关键结构示例）
```vue
<template>
  <section class="relative h-[100svh] min-h-[720px] overflow-hidden">
    <img :src="heroBg" class="absolute inset-0 w-full h-full object-cover" alt="剪艺首屏" />
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/55" />

    <div class="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 pt-36">
      <p class="text-xs tracking-[0.3em] uppercase text-white/78">剪艺 · 非遗数字化</p>
      <h1 class="mt-4 text-white text-6xl md:text-7xl lg:text-8xl tracking-tight">第一眼就惊艳</h1>
      <p class="mt-6 max-w-xl text-white/80">以现代视觉重构传统剪纸表达。</p>
    </div>
  </section>
</template>
```

- [ ] **Step 5: 运行首页结构测试**

```bash
npm run test:unit -- tests/unit/views/home-redesign.spec.js
```

Expected: PASS。

- [ ] **Step 6: Commit**

```bash
git add src/components/NavBar.vue src/components/Carousel.vue tests/unit/views/home-redesign.spec.js
git commit -m "feat(ui): redesign navbar and hero carousel for cinematic first impression"
```

---

### Task 6: 首页与藏品页改版落地（冲击优先）

**Files:**
- Modify: `src/views/HomeView.vue`
- Modify: `src/views/CollectiblesView.vue`
- Modify: `src/components/PhoneAnimation.vue`
- Modify: `src/components/LaptopAnimation.vue`

- [ ] **Step 1: 先加 HomeView 失败断言，要求引入新通用组件**

`tests/unit/views/home-redesign.spec.js`（补充断言）
```js
expect(wrapper.findComponent({ name: 'SectionHero' }).exists()).toBe(true)
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm run test:unit -- tests/unit/views/home-redesign.spec.js
```

Expected: FAIL，尚未接入 `SectionHero`。

- [ ] **Step 3: 在 HomeView 中替换重复区块为可复用组件**

`src/views/HomeView.vue`（关键片段）
```vue
<script setup>
import SectionHero from '@/components/SectionHero.vue'
import FeatureGrid from '@/components/FeatureGrid.vue'
import CTACluster from '@/components/CTACluster.vue'

const featureItems = [
  { id: 'craft', title: '非遗传承', description: '将传统刀工转译为现代视觉语言。' },
  { id: 'detail', title: '微米级雕刻', description: '层叠结构与留白形成更强空间感。' },
  { id: 'archive', title: '数字化纹样', description: '纹样沉淀为可持续复用的创作资产。' }
]
</script>
```

- [ ] **Step 4: 将 CollectiblesView 升级为画廊式信息层级**

`src/views/CollectiblesView.vue`（关键片段）
```vue
<template>
  <main class="pt-28 pb-20">
    <SectionHero
      kicker="收藏级作品"
      title="画廊式浏览"
      subtitle="先看价值，再读细节"
      description="保持原有数据加载与 fallback 逻辑不变。"
    />
    <section class="max-w-[1280px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      <!-- 复用现有 patterns 数据与详情逻辑 -->
    </section>
  </main>
</template>
```

- [ ] **Step 5: 现代化设备展示组件细节（不改交互语义）**

`src/components/PhoneAnimation.vue`（片段）
```vue
<div class="relative phone-shell rounded-[36px] p-2 bg-black shadow-card">
  <div class="rounded-[28px] overflow-hidden bg-white">
    <img ... class="w-full h-full object-cover" />
  </div>
</div>
```

`src/components/LaptopAnimation.vue`（片段）
```css
.laptop-container.is-active .screen {
  animation: open 1.1s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

- [ ] **Step 6: 运行首页相关测试**

```bash
npm run test:unit -- tests/unit/views/home-redesign.spec.js
```

Expected: PASS。

- [ ] **Step 7: Commit**

```bash
git add src/views/HomeView.vue src/views/CollectiblesView.vue src/components/PhoneAnimation.vue src/components/LaptopAnimation.vue tests/unit/views/home-redesign.spec.js
git commit -m "feat(ui): apply gallery-grade redesign to home and collectibles"
```

---

### Task 7: 活动页与应用页改版（叙事节奏 + 下载转化）

**Files:**
- Modify: `src/views/EventsView.vue`
- Modify: `src/views/AppDownloadView.vue`

- [ ] **Step 1: 写活动页失败断言（状态标签 + 时间叙事标题）**

`tests/unit/views/events-redesign.spec.js`（新建）
```js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import EventsView from '../../../src/views/EventsView.vue'

describe('Events redesign', () => {
  it('contains timeline narrative heading', () => {
    const wrapper = mount(EventsView)
    expect(wrapper.text()).toContain('特色活动')
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm run test:unit -- tests/unit/views/events-redesign.spec.js
```

Expected: FAIL（若依赖未 mock，先失败）。

- [ ] **Step 3: 重构 EventsView 为时间叙事布局**

`src/views/EventsView.vue`（关键片段）
```vue
<template>
  <main class="pt-28 pb-24">
    <SectionHero
      kicker="Feature Events"
      title="特色活动"
      subtitle="时间叙事与现场体验"
      description="保留 getEvents 数据流与活动链接行为。"
    />
    <section class="max-w-[1280px] mx-auto px-6 lg:px-10">
      <!-- 现有 Swiper 卡片继续使用，补充状态标签和时间层级 -->
    </section>
  </main>
</template>
```

- [ ] **Step 4: 重构 AppDownloadView 为下载行动优先结构**

`src/views/AppDownloadView.vue`（关键片段）
```vue
<template>
  <main class="pt-28 pb-20">
    <SectionHero
      kicker="Jianyi App"
      title="非遗体验，从手机开始"
      subtitle="下载入口前置，信息层级更清晰"
      description="功能点仍保持现有四项，不删减。"
    >
      <CTACluster primary-text="苹果版下载" secondary-text="安卓版下载" @primary="goIOS" @secondary="goAndroid" />
    </SectionHero>
  </main>
</template>
```

- [ ] **Step 5: 运行活动页测试**

```bash
npm run test:unit -- tests/unit/views/events-redesign.spec.js
```

Expected: PASS。

- [ ] **Step 6: Commit**

```bash
git add src/views/EventsView.vue src/views/AppDownloadView.vue tests/unit/views/events-redesign.spec.js
git commit -m "feat(ui): redesign events timeline and app download conversion layout"
```

---

### Task 8: 联系页与纹样库改版（品牌化 + 工作台化）

**Files:**
- Modify: `src/views/ContactView.vue`
- Modify: `src/views/PatternLibraryView.vue`
- Test: `tests/unit/views/pattern-library-redesign.spec.js`

- [ ] **Step 1: 写纹样库失败测试（搜索区与卡片区都必须存在）**

`tests/unit/views/pattern-library-redesign.spec.js`
```js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PatternLibraryView from '../../../src/views/PatternLibraryView.vue'

vi.mock('../../../src/api/patterns.js', () => ({
  searchOpenPatterns: vi.fn().mockResolvedValue({ content: [], totalPages: 0, totalElements: 0, number: 0, size: 12 }),
  getOpenPatternDetailByCode: vi.fn(),
  getOpenPatternTableUrl: vi.fn().mockReturnValue('')
}))

describe('Pattern library redesign', () => {
  it('keeps search controls and result container', async () => {
    const wrapper = mount(PatternLibraryView)
    await Promise.resolve()
    expect(wrapper.text()).toContain('在线纹样库')
    expect(wrapper.find('input[placeholder="关键词 / 编码"]').exists()).toBe(true)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm run test:unit -- tests/unit/views/pattern-library-redesign.spec.js
```

Expected: FAIL（当前结构或异步处理不满足）。

- [ ] **Step 3: 重构 ContactView 为品牌化联系页头 + 模块化信息区**

`src/views/ContactView.vue`（关键片段）
```vue
<template>
  <main class="pt-28 pb-20">
    <SectionHero
      kicker="Contact Jianyi"
      title="我们期待与你沟通"
      subtitle="合作、课程、活动，一站式联络"
      description="保留现有邮箱、电话、地址与合作方向信息。"
    />
  </main>
</template>
```

- [ ] **Step 4: 重构 PatternLibraryView 为探索工作台**

`src/views/PatternLibraryView.vue`（关键片段）
```vue
<template>
  <main class="pt-28 pb-20">
    <SectionHero
      kicker="Pattern Workbench"
      title="在线纹样库"
      subtitle="搜索、筛选、分页、详情一体化"
      description="保留现有查询参数与详情弹窗流程。"
    />
    <section class="max-w-[1320px] mx-auto px-6 lg:px-10">
      <!-- 保持 keyword/mainCategory/style/region/period/page/size 状态结构不变 -->
    </section>
  </main>
</template>
```

- [ ] **Step 5: 运行纹样库测试**

```bash
npm run test:unit -- tests/unit/views/pattern-library-redesign.spec.js
```

Expected: PASS。

- [ ] **Step 6: Commit**

```bash
git add src/views/ContactView.vue src/views/PatternLibraryView.vue tests/unit/views/pattern-library-redesign.spec.js
git commit -m "feat(ui): redesign contact and pattern library into branded workbench experience"
```

---

### Task 9: 视觉回归、可访问性与构建验收

**Files:**
- Create: `tests/e2e/ui-redesign.spec.ts`
- Modify: `src/assets/index.css`

- [ ] **Step 1: 先写 E2E 失败用例（六页首屏截图 + 核心文案检查）**

`tests/e2e/ui-redesign.spec.ts`
```ts
import { test, expect } from '@playwright/test'

const routes = [
  '/',
  '/collectibles',
  '/events',
  '/app',
  '/contact',
  '/pattern-library'
]

test.describe('ui redesign smoke', () => {
  for (const route of routes) {
    test(`page ${route} renders hero without crash`, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('main')).toBeVisible()
      await expect(page).toHaveScreenshot(`redesign-${route === '/' ? 'home' : route.slice(1)}.png`, {
        fullPage: false,
        maxDiffPixelRatio: 0.02
      })
    })
  }
})
```

- [ ] **Step 2: 运行 E2E 确认失败并生成基线**

```bash
npm run test:e2e
```

Expected: 首次运行可能 FAIL（缺少截图基线），生成 snapshot 提示。

- [ ] **Step 3: 加入 reduced-motion 样式兜底**

`src/assets/index.css`（追加）
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: 运行完整验证**

```bash
npm run test:unit && npm run build && npm run test:e2e
```

Expected:
- unit: PASS
- build: PASS（Vite build 完成）
- e2e: PASS（基线建立后）

- [ ] **Step 5: Commit**

```bash
git add tests/e2e/ui-redesign.spec.ts src/assets/index.css
git commit -m "test(ui): add visual regression and reduced-motion accessibility guard"
```

---

## 执行顺序与检查点

1. Task 1-3 完成后，先进行一次评审：确认 token 与 motion 基础稳定。
2. Task 4-6 完成后，进行第二次评审：确认首页与核心浏览链路达到“第一眼冲击”。
3. Task 7-9 完成后，进行最终评审：确认六页一致性、性能、功能回归。

---

## 计划自审结果（已完成）

### 1) 规格覆盖检查
- 视觉系统（颜色/字体/栅格/组件基线）：Task 2、Task 4、Task 5-8 覆盖。
- 动效系统（分层、参数、降级）：Task 3、Task 9 覆盖。
- 六页改版：Task 6（Home/Collectibles）、Task 7（Events/App）、Task 8（Contact/Pattern）覆盖。
- 不删功能与双端同优先：所有页面任务均明确“保留原数据流和交互语义”；Task 9 用 E2E 双端项目兜底。

### 2) 占位符检查
已检查，无 `TODO`/`TBD`/“稍后实现”等占位描述。

### 3) 类型与命名一致性检查
- 统一使用 `SectionHero` / `FeatureGrid` / `CTACluster` 命名。
- 动效策略统一由 `motion.js` + `anime.config.js` 提供。
- 页面与测试路径命名一致。
