# 经典展厅布局排版重新设计 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 CollectiblesView.vue 从统一画廊布局改造为三段式叙事性展厅（画廊→过渡→典藏），新增主题筛选功能。

**Architecture:** 单 `v-for` 循环渲染所有卡片，通过 `--index` / `--total-cards` CSS 自定义属性驱动比例过渡；筛选状态驱动 `computed` 派生数据流；FilterBar 独立为下拉组合筛选组件。

**Tech Stack:** Vue 3 `<script setup>`, Tailwind CSS 3, `color-mix(in oklab, ...)`, Vue `computed` + `ref`

---

### Task 1: 扩展数据模型 — fallbackPatterns 增加 theme 字段

**Files:**
- Modify: `src/data/siteContent.js`

- [ ] **Step 1: 为 fallbackPatterns 添加 theme 字段**

在 `src/data/siteContent.js` 中找到 `fallbackPatterns`（注意：该数组实际位于 `src/views/CollectiblesView.vue` 第 27-64 行，而非 siteContent.js。**当前 fallback 数据在 CollectiblesView.vue 内联定义，不在 siteContent.js**）。

为每个 fallback item 增加 `theme` 字段：

```js
const fallbackPatterns = [
  {
    id: '0001',
    title: '凤凰涅槃',
    patternCode: 'PHX-2024-001',
    image: pattern017,
    desc: '凤凰浴火重生于红纸金箔之间...',
    story: ['...'],
    theme: '瑞兽',          // 新增
  },
  {
    id: '0002',
    title: '匠心雕琢',
    patternCode: 'PHX-2024-002',
    image: pattern018,
    desc: '运用极细的镂空刀法...',
    story: ['...'],
    theme: '瑞兽',          // 新增
  },
  {
    id: 3,
    title: '非遗结晶',
    patternCode: 'PHX-2024-003',
    image: pattern019,
    desc: '它不仅是一件精美的剪纸艺术品...',
    story: ['...'],
    theme: '瑞兽',          // 新增
  }
]
```

- [ ] **Step 2: 同步更新 normalizePattern 函数**

在 `normalizePattern`（第 91-103 行）中增加 `theme` 字段归一化：

```js
const normalizePattern = (data, fallbackItem) => {
  const desc = `${data?.desc ?? fallbackItem.desc ?? ''}`.trim()
  const story = normalizeStory(data?.story, fallbackItem.story)

  return {
    id: `${data?.id ?? fallbackItem.id}`,
    title: `${data?.title ?? fallbackItem.title ?? '无标题作品'}`.trim() || '无标题作品',
    patternCode: `${data?.patternCode ?? fallbackItem.patternCode}`,
    image: `${data?.image ?? fallbackItem.image ?? ''}`,
    desc: desc || story[0] || '暂无描述',
    story,
    theme: `${data?.theme ?? fallbackItem.theme ?? '未分类'}`,   // 新增
  }
}
```

- [ ] **Step 3: 提交**

```bash
git add src/views/CollectiblesView.vue
git commit -m "feat(collectibles): add theme field to pattern data model"
```

---

### Task 2: 创建 FilterBar 组件

**Files:**
- Create: `src/components/FilterBar.vue`

- [ ] **Step 1: 编写 FilterBar 组件**

```vue
<script setup>
import { ref, computed } from 'vue'
import { ChevronDown, X } from 'lucide-vue-next'

const props = defineProps({
  options: { type: Array, default: () => [] },
  selected: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:selected'])

const open = ref(false)
const dropdownRef = ref(null)

const allSelected = computed(() => props.selected.length === props.options.length)
const toggleAll = () => {
  emit('update:selected', allSelected.value ? [] : [...props.options])
}
const toggleOption = (opt) => {
  const next = props.selected.includes(opt)
    ? props.selected.filter((o) => o !== opt)
    : [...props.selected, opt]
  emit('update:selected', next)
}
const removeOption = (opt) => {
  emit('update:selected', props.selected.filter((o) => o !== opt))
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- 下拉触发器 -->
    <button
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-hex-e3d6c2 bg-white/60 backdrop-blur-sm text-hex-7a6a50 text-sm font-medium hover:border-hex-c9b289 transition-colors"
      @click="open = !open"
    >
      主题筛选
      <ChevronDown
        class="w-4 h-4 transition-transform duration-200"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <!-- 已选标签 -->
    <div v-if="selected.length" class="flex flex-wrap gap-2 mt-2">
      <span
        v-for="opt in selected"
        :key="opt"
        class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-hex-f0e8d8 border border-hex-d8c7ab text-hex-7a6a50 text-xs font-medium"
      >
        {{ opt }}
        <button
          class="hover:text-hex-b4232a transition-colors"
          @click="removeOption(opt)"
        >
          <X class="w-3 h-3" />
        </button>
      </span>
      <button
        v-if="selected.length"
        class="text-xs text-hex-a08b6d hover:text-hex-7a6a50 transition-colors ml-1"
        @click="emit('update:selected', [])"
      >
        清除全部
      </button>
    </div>

    <!-- 下拉面板 -->
    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-30"
        @click="open = false"
      ></div>
      <div
        v-if="open"
        class="absolute top-full left-0 mt-1 z-40 w-56 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-hex-e3d6c2 p-2"
      >
        <button
          class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-hex-7a6a50 hover:bg-hex-f5efe5 transition-colors"
          @click="toggleAll"
        >
          <span class="w-4 h-4 rounded border border-hex-c4b28f flex items-center justify-center text-[10px]"
            :class="allSelected ? 'bg-hex-b4232a text-white border-hex-b4232a' : ''"
          >✓</span>
          {{ allSelected ? '取消全选' : '全选' }}
        </button>
        <div class="h-px bg-hex-e7dbc9 my-1"></div>
        <div class="max-h-48 overflow-y-auto">
          <button
            v-for="opt in options"
            :key="opt"
            class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-hex-6f614d hover:bg-hex-f5efe5 transition-colors"
            @click="toggleOption(opt)"
          >
            <span
              class="w-4 h-4 rounded border flex items-center justify-center text-[10px] transition-colors"
              :class="selected.includes(opt)
                ? 'bg-hex-b4232a text-white border-hex-b4232a'
                : 'border-hex-c4b28f'"
            >✓</span>
            {{ opt }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/FilterBar.vue
git commit -m "feat(ui): create FilterBar multi-select dropdown component"
```

---

### Task 3: CollectiblesView — 添加筛选状态与计算属性

**Files:**
- Modify: `src/views/CollectiblesView.vue`

- [ ] **Step 1: 新增 import 和响应式状态**

在 `<script setup>` 顶部（第 1 行后）增加 import：

```js
import FilterBar from '@/components/FilterBar.vue'
```

在 `const showStory = ref(false)` 附近新增状态：

```js
const themeOptions = ['瑞兽', '花卉', '人物', '山水', '几何', '吉祥纹']
const selectedThemes = ref([])
```

- [ ] **Step 2: 添加 computed 筛选逻辑**

在 `const patterns = ref([...fallbackPatterns])` 之后新增：

```js
const filteredPatterns = computed(() => {
  if (!selectedThemes.value.length) return patterns.value
  return patterns.value.filter(
    (p) => selectedThemes.value.includes(p.theme) || p.theme === '未分类'
  )
})

const displayItems = computed(() => {
  const items = filteredPatterns.value
  if (selectedThemes.value.length > 0) {
    return items.map((item, i) => ({ kind: 'card', item, cardIndex: i }))
  }
  const result = []
  let cardIndex = 0
  const groups = {}
  for (const item of items) {
    const theme = item.theme || '未分类'
    if (!groups[theme]) {
      groups[theme] = []
      result.push({ kind: 'separator', theme })
    }
    groups[theme].push(item)
    result.push({ kind: 'card', item, cardIndex: cardIndex++ })
  }
  return result
})
```

- [ ] **Step 3: 更新 `animateSections` 使用 `filteredPatterns` 而非 `patterns`**

```js
const animateSections = () => {
  leftColRefs.value = []
  rightColRefs.value = []

  nextTick(() => {
    filteredPatterns.value.forEach((_, index) => {   // 改为 filteredPatterns
      const leftEl = leftColRefs.value[index]
      const rightEl = rightColRefs.value[index]
      const baseDelay = index * 120

      if (leftEl) {
        slideUp(leftEl, { delay: 100 + baseDelay, duration: DURATION.base })
      }
      if (rightEl) {
        slideUp(rightEl, { delay: 240 + baseDelay, duration: DURATION.base })
      }
    })
  })
}
```

- [ ] **Step 4: 提交**

```bash
git add src/views/CollectiblesView.vue
git commit -m "feat(collectibles): add filter state and grouped display computed"
```

---

### Task 4: CollectiblesView — 更新模板（FilterBar + 分组网格）

**Files:**
- Modify: `src/views/CollectiblesView.vue`（template 部分，第 243-355 行）

- [ ] **Step 1: 添加 SectionHero 和 FilterBar（替换原有 SectionHero）**

将当前第 244-250 行替换为：

```html
<main class="pt-28 pb-20 min-h-screen bg-transparent flex flex-col relative overflow-hidden font-sans text-hex-6f614d">
  <SectionHero
    kicker="主题馆藏"
    title="沉浸展厅"
    subtitle="先看价值，再读细节"
  />

  <!-- 筛选栏 -->
  <div class="sticky top-28 z-20 w-full bg-[#F7F5F2]/80 backdrop-blur-md border-b border-hex-e7dbc9">
    <div class="max-w-[1280px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
      <FilterBar
        :options="themeOptions"
        :selected="selectedThemes"
        @update:selected="selectedThemes = $event"
      />
      <span class="text-xs text-hex-a08b6d font-medium">
        共 {{ filteredPatterns.length }} 件作品
      </span>
    </div>
  </div>
```

- [ ] **Step 2: 替换 grid 区域为分组渲染**

将当前第 273-347 行（`<template v-if="!loading && patterns.length">` 及其内部所有内容）替换为：

```html
<template v-if="!loading && filteredPatterns.length">
  <section class="max-w-[1280px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
    <template v-for="entry in displayItems" :key="entry.kind === 'separator' ? 'sep-' + entry.theme : entry.item.id">
      <!-- 主题分组分隔标题 -->
      <div
        v-if="entry.kind === 'separator'"
        class="col-span-full flex items-center gap-4 py-8"
      >
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-hex-e3d6c2 to-transparent"></div>
        <span class="text-hex-a08b6d text-xs font-bold tracking-[0.3em] uppercase px-4">
          —— {{ entry.theme }} ——
        </span>
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-hex-e3d6c2 to-transparent"></div>
      </div>

      <!-- 作品卡片 -->
      <article
        v-else
        :style="{ '--index': entry.cardIndex, '--total-cards': filteredPatterns.length }"
        class="collectible-card flex flex-col border border-hex-e3d6c2 rounded-2xl overflow-hidden"
      >
        <div
          :ref="(el) => setLeftRef(el, entry.cardIndex)"
          class="flex-1 flex items-center justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-hex-e3d6c2 relative"
        >
          <CollectibleDisplay
            :image="entry.item.image"
            :title="entry.item.title"
            @open-story="openStory(entry.item)"
          />
        </div>

        <div
          :ref="(el) => setRightRef(el, entry.cardIndex)"
          class="flex-1 flex flex-col justify-center p-8 lg:p-20 space-y-10 relative"
        >
          <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-hex-f6efe2 border border-hex-e1d2bb text-hex-9a8461 text-xs tracking-widest w-fit uppercase font-bold">
            <div class="w-2 h-2 rounded-full bg-hex-b89e75 animate-pulse"></div>
            作品档案
          </div>

          <h1 class="text-5xl md:text-7xl font-black font-display tracking-tight text-hex-7a6a50 uppercase mb-2">
            {{ entry.item.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <span class="px-4 py-2 rounded-full bg-hex-f7f0e2 border border-hex-d8c7a8 text-hex-917d5d">纯手工雕刻</span>
            <span class="px-4 py-2 rounded-full bg-hex-fdf8ef border border-hex-dfcfb4 text-hex-9f8d73">非遗传承</span>
          </div>

          <p class="text-hex-928067 text-sm leading-relaxed mt-8 font-light max-w-md">
            {{ entry.item.desc }}
          </p>

          <div class="pt-8 border-t border-hex-e7dbc9 space-y-8 max-w-md">
            <div class="flex items-start gap-5 group">
              <div class="w-14 h-14 rounded-2xl bg-hex-f8f2e6 flex items-center justify-center border border-hex-d6c4a3 text-hex-9a8563 group-hover:border-hex-c9b28a transition-all duration-300">
                <ShieldCheck class="w-6 h-6" />
              </div>
              <div class="pt-1">
                <h4 class="text-hex-7d6c52 font-bold text-sm uppercase tracking-widest mb-1">馆藏级认证</h4>
                <p class="text-xs text-hex-a29278 font-light">防伪溯源，专属收藏证书</p>
              </div>
            </div>

            <div class="flex items-start gap-5 group">
              <div class="w-14 h-14 rounded-2xl bg-hex-f8f2e6 flex items-center justify-center border border-hex-d6c4a3 text-hex-9a8563 group-hover:border-hex-c9b28a transition-all duration-300">
                <Database class="w-6 h-6" />
              </div>
              <div class="pt-1">
                <h4 class="text-hex-7d6c52 font-bold text-sm uppercase tracking-widest mb-1">装裱工艺</h4>
                <p class="text-xs text-hex-a29278 font-light">无酸装裱，防紫外线亚克力镜面</p>
              </div>
            </div>
          </div>

          <button
            @click="openStory(entry.item)"
            class="mt-8 px-12 py-5 relative overflow-hidden group w-fit rounded-full border border-hex-d8c7ab hover:border-hex-c9b289 transition-colors duration-500 bg-hex-f7efe0"
          >
            <div class="relative z-10 flex items-center gap-4">
              <span class="text-hex-7f6d52 font-bold tracking-[0.2em] text-xs uppercase group-hover:text-hex-6f5f48 transition-colors">作品详情</span>
              <div class="w-6 h-[1px] bg-hex-c4b28f group-hover:w-10 group-hover:bg-hex-b79f77 transition-all duration-300"></div>
            </div>
          </button>
        </div>
      </article>
    </template>
  </section>
</template>
```

- [ ] **Step 2b: 更新空状态提示**

将当前第 266-271 行的空状态判断从 `!patterns.length` 改为 `!filteredPatterns.length`：

```html
<div
  v-if="!loading && !filteredPatterns.length"
  class="w-full max-w-[1280px] mx-auto z-10 px-6 lg:px-10 py-16 text-sm text-hex-8f7b5f"
>
  <template v-if="selectedThemes.length">暂无匹配作品，请尝试其他主题筛选。</template>
  <template v-else>暂无可展示作品。</template>
</div>
```

- [ ] **Step 3: 提交**

```bash
git add src/views/CollectiblesView.vue
git commit -m "feat(collectibles): add FilterBar and grouped grid layout"
```

---

### Task 5: 添加画廊→典藏 CSS 过渡样式

**Files:**
- Modify: `src/views/CollectiblesView.vue`（添加 `<style>` 块）
- Modify: `src/assets/index.css`（添加全局 .collectible-card 样式）

- [ ] **Step 1: 在 CollectiblesView.vue 底部添加 scoped style**

在文件末尾（`</template>` 之后）添加：

```vue
<style scoped>
.collectible-card {
  /* 比例过渡变量 */
  --gallery-ratio: 0.4;
  --transition-ratio: 0.3;
  --progress: clamp(0,
    ((var(--index) + 1) / var(--total-cards) - var(--gallery-ratio)) / var(--transition-ratio),
    1);

  /* 画廊风格 (progress=0) → 典藏风格 (progress=1) 插值 */
  --gallery-bg: #FBF9F6;
  --archive-bg: #F0E8D8;
  background: color-mix(in oklab,
    var(--gallery-bg),
    var(--archive-bg) calc(var(--progress) * 100%));

  --gallery-border: #E3D6C2;
  --archive-border: #C4A87A;
  border-color: color-mix(in oklab,
    var(--gallery-border),
    var(--archive-border) calc(var(--progress) * 100%));

  box-shadow: 0 2px 8px rgba(154, 132, 98, calc(0.06 + var(--progress) * 0.14));
  transition: box-shadow 0.3s ease;
}

.collectible-card:hover {
  box-shadow: 0 2px 8px rgba(154, 132, 98, calc(0.10 + var(--progress) * 0.20));
}
</style>

<style>
/* 全局/非 scoped：用于 CollectibleDisplay 投影随过渡加深 */
.collectible-card[style*="--progress"] .collectible-display-wrapper {
  --pedestal-shadow: 0 24px 45px rgba(154, 132, 98, calc(0.22 + var(--progress) * 0.13));
  box-shadow: var(--pedestal-shadow);
}
</style>
```

**注意：** CollectibleDisplay 没有 `.collectible-display-wrapper` 类名，上面的样式仅作为示意。实际 CollectibleDisplay 的 shadow 由其内部 `shadow-[0_24px_45px_rgba(154,132,98,0.22)]` 控制。如需随过渡加深，可将该 shadow 改为使用 CSS 变量：

- 在 CollectibleDisplay.vue 中将阴影改为：`shadow-[0_24px_45px_rgba(154,132,98,var(--pedestal-opacity,0.22))]`
- 但这需要穿透 scoped 边界。**更简单的方案：暂不改变 CollectibleDisplay 投影**，保持统一。昴君可在后续迭代中精细化调整。

- [ ] **Step 2: 在 index.css 添加响应式比例覆盖**

在 `src/assets/index.css` 末尾添加：

```css
/* 经典展厅：响应式过渡比例 (md: 2列) */
@media (min-width: 768px) {
  .collectible-card {
    --gallery-ratio: 0.45;
    --transition-ratio: 0.25;
  }
}

/* (xl: 3列) */
@media (min-width: 1280px) {
  .collectible-card {
    --gallery-ratio: 0.5;
    --transition-ratio: 0.2;
  }
}
```

- [ ] **Step 3: 提交**

```bash
git add src/views/CollectiblesView.vue src/assets/index.css
git commit -m "feat(collectibles): add gallery-to-archive CSS gradient transition"
```

---

### Task 6: 构建验证

**Files:**
- None（运行命令验证）

- [ ] **Step 1: 启动开发服务器或执行生产构建**

```bash
npm run build 2>&1
```

预期输出：构建成功，无报错。

- [ ] **Step 2: 修复任何构建错误**

如果构建失败，修复后重新构建。

- [ ] **Step 3: 提交最终构建修复（如有）**

```bash
git add -A
git commit -m "fix: resolve build errors from gallery redesign"
```

---

## 自检清单

对照设计规范逐项检查：

- [x] **FilterBar** — 下拉多选、已选标签、全选/取消全选、点击外部关闭
- [x] **筛选状态** — `selectedThemes` 驱动 `filteredPatterns`，"未分类"始终显示
- [x] **主题分组** — 无筛选时显示分隔标题，有筛选时隐藏
- [x] **比例过渡** — `--index / --total-cards` 驱动，`color-mix` 实现背景/边框/阴影插值
- [x] **响应式** — md 列 45%/25%/30%，xl 列 50%/20%/30%
- [x] **空状态** — 筛选结果为空时显示"暂无匹配作品"
- [x] **SectionHero** — 文案改为"主题馆藏 / 沉浸展厅"
- [x] **YAGNI** — 未引入新依赖、未修改鉴权、未影响其他页面
