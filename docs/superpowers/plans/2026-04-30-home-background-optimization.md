# 首页背景优化实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为剪艺数字艺术平台首页添加分层叠加背景效果，包含纸张+布料纹理和视差滚动

**Architecture:** 使用CSS多层背景叠加实现纹理效果，JavaScript composable实现视差滚动，Vue组件封装背景逻辑

**Tech Stack:** Vue 3, CSS3 (gradients, transforms), JavaScript (requestAnimationFrame)

---

## 文件结构

### 新增文件
- `src/components/ParallaxBackground.vue` - 背景组件，管理纹理层和视差滚动
- `src/composables/useParallax.js` - 视差滚动逻辑封装

### 修改文件
- `src/views/HomeView.vue` - 集成背景组件

---

### Task 1: 创建 useParallax composable

**Files:**
- Create: `src/composables/useParallax.js`

- [ ] **Step 1: 创建 useParallax.js 基础结构**

```javascript
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useParallax(options = {}) {
  const {
    speed = 0.5,
    enabled = true
  } = options

  const scrollY = ref(0)
  const isReducedMotion = ref(false)
  let animationId = null
  let element = null

  const updateScroll = () => {
    if (!enabled || isReducedMotion.value) return
    scrollY.value = window.pageYOffset
    if (element) {
      element.style.transform = `translateY(${scrollY.value * speed}px)`
    }
    animationId = requestAnimationFrame(updateScroll)
  }

  const start = (el) => {
    element = el
    if (enabled && !isReducedMotion.value) {
      animationId = requestAnimationFrame(updateScroll)
    }
  }

  const stop = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  onMounted(() => {
    // 检查用户是否偏好减少动画
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    isReducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener('change', (e) => {
      isReducedMotion.value = e.matches
    })
  })

  onBeforeUnmount(() => {
    stop()
  })

  return {
    scrollY,
    isReducedMotion,
    start,
    stop
  }
}
```

- [ ] **Step 2: 验证文件创建**

Run: `ls -la src/composables/useParallax.js`
Expected: 文件存在且可读

- [ ] **Step 3: 提交 composable**

```bash
git add src/composables/useParallax.js
git commit -m "feat: add useParallax composable for parallax scrolling"
```

---

### Task 2: 创建 ParallaxBackground 组件

**Files:**
- Create: `src/components/ParallaxBackground.vue`

- [ ] **Step 1: 创建 ParallaxBackground.vue 基础结构**

```vue
<template>
  <div class="parallax-background" aria-hidden="true">
    <div ref="textureLayer" class="texture-layer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useParallax } from '@/composables/useParallax.js'

const props = defineProps({
  speed: {
    type: Number,
    default: 0.5
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

const textureLayer = ref(null)
const { start, stop } = useParallax({
  speed: props.speed,
  enabled: props.enabled
})

onMounted(() => {
  if (textureLayer.value) {
    start(textureLayer.value)
  }
})

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped>
.parallax-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.texture-layer {
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  will-change: transform;
  background:
    /* 布料纹理 */
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.03) 2px,
      rgba(255, 255, 255, 0.03) 4px
    ),
    /* 纸张纹理 */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23f5f0eb'/%3E%3Crect width='1' height='1' fill='%23e8e0d8' opacity='0.3'/%3E%3C/svg%3E") repeat,
    /* 底色 */
    linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%);
}

/* 响应式处理 */
@media (max-width: 768px) {
  .texture-layer {
    background:
      /* 简化的布料纹理 */
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 3px,
        rgba(255, 255, 255, 0.02) 3px,
        rgba(255, 255, 255, 0.02) 6px
      ),
      /* 底色 */
      linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%);
  }
}

/* 无障碍支持 */
@media (prefers-reduced-motion: reduce) {
  .texture-layer {
    transform: none !important;
  }
}
</style>
```

- [ ] **Step 2: 验证文件创建**

Run: `ls -la src/components/ParallaxBackground.vue`
Expected: 文件存在且可读

- [ ] **Step 3: 提交组件**

```bash
git add src/components/ParallaxBackground.vue
git commit -m "feat: add ParallaxBackground component with texture layers"
```

---

### Task 3: 集成背景组件到 HomeView

**Files:**
- Modify: `src/views/HomeView.vue`

- [ ] **Step 1: 在 HomeView 中导入并使用 ParallaxBackground**

在 `src/views/HomeView.vue` 的 `<script setup>` 部分添加导入：

```javascript
import ParallaxBackground from '../components/ParallaxBackground.vue'
```

在 `<template>` 部分的最开始添加背景组件：

```vue
<template>
  <main class="min-h-screen bg-transparent flex flex-col font-sans text-ink-base">
    <!-- 背景层 -->
    <ParallaxBackground :speed="0.5" :enabled="true" />

    <!-- Hero Section -->
    <Carousel />
    <!-- ... 其他内容 ... -->
  </main>
</template>
```

- [ ] **Step 2: 验证修改**

Run: `grep -n "ParallaxBackground" src/views/HomeView.vue`
Expected: 显示导入和使用的位置

- [ ] **Step 3: 提交集成**

```bash
git add src/views/HomeView.vue
git commit -m "feat: integrate ParallaxBackground into HomeView"
```

---

### Task 4: 测试和验证

**Files:**
- Test: 手动测试和性能验证

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 服务器启动成功，无错误

- [ ] **Step 2: 验证背景效果**

在浏览器中访问首页，检查：
- 纹理层正常显示纸张和布料效果
- 视差滚动在桌面端正常工作
- 响应式布局在不同设备上正常显示

- [ ] **Step 3: 性能测试**

使用浏览器开发者工具检查：
- 首屏加载时间不增加超过100ms
- 滚动帧率保持60fps
- 内存使用在合理范围内

- [ ] **Step 4: 无障碍测试**

检查 `prefers-reduced-motion` 媒体查询：
- 启用减少动画偏好时，背景应为静态
- 背景不影响文字可读性

- [ ] **Step 5: 最终提交**

```bash
git add .
git commit -m "feat: complete home background optimization with parallax and textures"
```

---

## 验收标准

### 功能验收
- [ ] 纹理层正常显示纸张和布料效果
- [ ] 视差滚动在桌面端正常工作
- [ ] 响应式布局在不同设备上正常显示
- [ ] 无障碍支持正常工作

### 性能验收
- [ ] 首屏加载时间不增加超过100ms
- [ ] 滚动帧率保持60fps
- [ ] 内存使用在合理范围内

### 兼容性验收
- [ ] 现代浏览器（Chrome、Firefox、Safari、Edge）正常显示
- [ ] 旧版浏览器降级为静态背景
- [ ] 移动端设备正常显示

---

*实现计划完成，准备进入执行阶段。*