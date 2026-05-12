# 首页核心作品数据真实化实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页核心作品卡片从静态数据改为从API获取真实数据

**Architecture:** 在HomeView.vue中添加数据加载逻辑，使用getPatterns() API获取藏品列表前3条，失败时静默降级到本地fallback数据

**Tech Stack:** Vue 3 Composition API, fetch API, CSS shimmer animation

---

## 文件变更

- Modify: `src/views/HomeView.vue`

---

## Task 1: 添加响应式状态和导入API

**Files:**
- Modify: `src/views/HomeView.vue:287-299`

- [ ] **Step 1: 添加getPatterns导入**

```javascript
import { getPatterns } from '@/api/patterns.js'
```

在现有导入语句后添加。

- [ ] **Step 2: 添加响应式状态变量**

```javascript
const loading = ref(true)
const homePatterns = ref([])
```

在现有ref声明后添加（约第311行附近）。

- [ ] **Step 3: 验证导入无报错**

Run: `npm run build`
Expected: 构建成功，无导入错误

---

## Task 2: 创建数据映射函数

**Files:**
- Modify: `src/views/HomeView.vue` (script setup部分)

- [ ] **Step 1: 添加normalizeHomePattern函数**

在openProtocol函数后添加：

```javascript
const normalizeHomePattern = (item, fallback, index) => {
  return {
    id: item?.id ?? fallback.id,
    title: item?.title ?? fallback.title,
    patternCode: item?.patternCode ?? fallback.patternCode,
    image: item?.imageUrl ?? item?.image ?? fallback.image,
    desc: item?.desc ?? item?.description ?? fallback.desc,
    theme: item?.theme ?? item?.mainCategory ?? fallback.theme,
  }
}
```

- [ ] **Step 2: 验证函数定义无报错**

Run: `npm run build`
Expected: 构建成功

---

## Task 3: 创建数据加载函数

**Files:**
- Modify: `src/views/HomeView.vue` (script setup部分)

- [ ] **Step 1: 添加loadHomePatterns函数**

在normalizeHomePattern函数后添加：

```javascript
const loadHomePatterns = async () => {
  loading.value = true

  try {
    const response = await getPatterns()
    const list = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
        ? response.data
        : []

    const remoteItems = list.slice(0, 3)

    homePatterns.value = fallbackPatterns.map((fallback, index) => {
      const remoteItem = remoteItems[index]
      return normalizeHomePattern(remoteItem, fallback, index)
    })
  } catch (error) {
    console.warn('获取首页作品数据失败，使用本地数据:', error)
    homePatterns.value = [...fallbackPatterns]
  } finally {
    loading.value = false
  }
}
```

- [ ] **Step 2: 验证函数定义无报错**

Run: `npm run build`
Expected: 构建成功

---

## Task 4: 更新onMounted调用数据加载

**Files:**
- Modify: `src/views/HomeView.vue:323-352`

- [ ] **Step 1: 在onMounted中调用loadHomePatterns**

在onMounted函数开头添加：

```javascript
onMounted(async () => {
  // 加载首页作品数据
  await loadHomePatterns()

  // 原有IntersectionObserver逻辑...
  observer = new IntersectionObserver((entries) => {
    // ...
  }, { threshold: 0.15 })

  // ...其余代码保持不变
})
```

- [ ] **Step 2: 验证页面加载无报错**

Run: `npm run build`
Expected: 构建成功

---

## Task 5: 添加骨架屏模板

**Files:**
- Modify: `src/views/HomeView.vue:32-98`

- [ ] **Step 1: 在产品区域开头添加骨架屏**

在`<div ref="productCardsRef">`之前添加：

```html
<!-- 骨架屏加载状态 -->
<div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div v-for="i in 3" :key="i" class="bg-paper-light rounded-2xl overflow-hidden border border-paper-dark/60">
    <div class="aspect-[4/3] bg-paper-muted animate-pulse"></div>
    <div class="p-8 space-y-4">
      <div class="h-4 bg-paper-muted rounded w-24 animate-pulse"></div>
      <div class="h-8 bg-paper-muted rounded w-32 animate-pulse"></div>
      <div class="h-16 bg-paper-muted rounded animate-pulse"></div>
      <div class="flex justify-end pt-6">
        <div class="h-10 bg-paper-muted rounded w-20 animate-pulse"></div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 验证骨架屏显示**

Run: `npm run build`
Expected: 构建成功，页面加载时显示骨架屏

---

## Task 6: 更新卡片数据绑定

**Files:**
- Modify: `src/views/HomeView.vue:34-97`

- [ ] **Step 1: 将第一个卡片改为动态数据**

```html
<!-- Card 1 -->
<div v-if="!loading" class="group relative bg-paper-light rounded-2xl overflow-hidden border border-paper-dark/60 hover:border-paper-dark/70 transition-colors flex flex-col">
  <div class="relative aspect-[4/3] overflow-hidden bg-paper-muted flex justify-center items-center p-8">
    <img v-protect-image :src="homePatterns[0]?.image" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="作品图片">
  </div>
  <div class="p-8 flex-1 flex flex-col">
    <p class="text-bamboo-base text-[13px] font-bold uppercase tracking-[0.2em] mb-3">{{ homePatterns[0]?.theme }}</p>
    <div class="flex justify-between items-start mb-4">
      <h4 class="text-2xl font-medium text-ink-base">{{ homePatterns[0]?.title }}</h4>
      <span class="text-bamboo-base group-hover:text-ink-base transition-colors cursor-pointer">↗</span>
    </div>
    <p class="text-bamboo-dark text-xs leading-relaxed mb-8">
      {{ homePatterns[0]?.desc }}
    </p>
    <div class="flex justify-end items-center border-t border-paper-dark/60 pt-6 mt-auto">
      <button @click="router.push('/collectibles')" class="border border-paper-dark/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-bamboo-deep hover:bg-paper-hover/70 transition-colors">
        详情
      </button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 将第二个卡片改为动态数据**

```html
<!-- Card 2 -->
<div v-if="!loading" class="group relative bg-paper-light rounded-2xl overflow-hidden border border-paper-dark/60 hover:border-paper-dark/70 transition-colors flex flex-col">
  <div class="relative aspect-[4/3] overflow-hidden bg-paper-muted flex justify-center items-center p-8">
    <img v-protect-image :src="homePatterns[1]?.image" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="作品图片">
  </div>
  <div class="p-8 flex-1 flex flex-col">
    <p class="text-bamboo-base text-[13px] font-bold uppercase tracking-[0.2em] mb-3">{{ homePatterns[1]?.theme }}</p>
    <div class="flex justify-between items-start mb-4">
      <h4 class="text-2xl font-medium text-ink-base">{{ homePatterns[1]?.title }}</h4>
      <span class="text-bamboo-base group-hover:text-ink-base transition-colors cursor-pointer">↗</span>
    </div>
    <p class="text-bamboo-dark text-xs leading-relaxed mb-8">
      {{ homePatterns[1]?.desc }}
    </p>
    <div class="flex justify-end items-center border-t border-paper-dark/60 pt-6 mt-auto">
      <button @click="router.push('/collectibles')" class="border border-paper-dark/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-bamboo-deep hover:bg-paper-hover/70 transition-colors">
        详情
      </button>
    </div>
  </div>
</div>
```

- [ ] **Step 3: 将第三个卡片改为动态数据**

```html
<!-- Card 3 -->
<div v-if="!loading" class="group relative bg-paper-light rounded-2xl overflow-hidden border border-paper-dark/60 hover:border-paper-dark/70 transition-colors flex flex-col">
  <div class="relative aspect-[4/3] overflow-hidden bg-paper-muted flex justify-center items-center p-8">
    <img v-protect-image :src="homePatterns[2]?.image" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="作品图片">
  </div>
  <div class="p-8 flex-1 flex flex-col">
    <p class="text-bamboo-base text-[13px] font-bold uppercase tracking-[0.2em] mb-3">{{ homePatterns[2]?.theme }}</p>
    <div class="flex justify-between items-start mb-4">
      <h4 class="text-2xl font-medium text-ink-base">{{ homePatterns[2]?.title }}</h4>
      <span class="text-bamboo-base group-hover:text-ink-base transition-colors cursor-pointer">↗</span>
    </div>
    <p class="text-bamboo-dark text-xs leading-relaxed mb-8">
      {{ homePatterns[2]?.desc }}
    </p>
    <div class="flex justify-end items-center border-t border-paper-dark/60 pt-6 mt-auto">
      <button @click="router.push('/collectibles')" class="border border-paper-dark/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-bamboo-deep hover:bg-paper-hover/70 transition-colors">
        详情
      </button>
    </div>
  </div>
</div>
```

- [ ] **Step 4: 验证卡片渲染**

Run: `npm run build`
Expected: 构建成功，卡片显示动态数据

---

## Task 7: 添加shimmer动画样式

**Files:**
- Modify: `src/views/HomeView.vue` (style scoped部分)

- [ ] **Step 1: 添加shimmer动画CSS**

在style scoped部分添加：

```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.animate-pulse {
  animation: shimmer 1.5s infinite;
  background: linear-gradient(90deg, #FEF2F2 25%, #FEE2E2 50%, #FEF2F2 75%);
  background-size: 200% 100%;
}
```

- [ ] **Step 2: 验证动画效果**

Run: `npm run build`
Expected: 构建成功，骨架屏有shimmer动画

---

## Task 8: 最终验证和构建

- [ ] **Step 1: 运行完整构建**

Run: `npm run build`
Expected: 构建成功，无报错

- [ ] **Step 2: 验证功能完整性**

检查项：
- 页面加载时显示骨架屏
- API成功时渲染真实数据
- API失败时显示fallback数据
- 卡片样式与现有一致
- 点击跳转正常

- [ ] **Step 3: 提交代码**

```bash
git add src/views/HomeView.vue
git commit -m "feat: 首页核心作品数据改为从API获取"
```

---

## 验证清单

- [ ] 骨架屏正常显示
- [ ] API数据正常渲染
- [ ] Fallback降级正常
- [ ] 卡片样式一致
- [ ] 点击行为正常
- [ ] 构建通过
