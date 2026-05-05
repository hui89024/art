# 纹样库页面视觉升级实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保持现有功能不变的前提下，深化羊皮纸视觉风格，提升 Hero 区域、筛选栏+卡片区、详情弹窗三个区域的视觉品质。

**Architecture:** 所有改动集中在 `PatternLibraryView.vue` 一个文件中，通过添加 scoped style 块实现动画效果，模板结构调整布局结构。不改动 API 层、不改动其他组件。

**Tech Stack:** Vue 3 Composition API, Tailwind CSS 3, CSS keyframe animations

---

## 文件结构

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/views/PatternLibraryView.vue` | 修改 | 模板重构 + 新增 scoped style |

仅改动一个文件。所有三个区域的改动都在此文件内完成。

---

### Task 1: Hero 区域 — 窗花装饰 + 纹理背景

**Files:**
- Modify: `src/views/PatternLibraryView.vue:216-221` (template Hero section)

- [ ] **Step 1: 导入窗花图片资源**

在 `<script setup>` 顶部（第 2-9 行 imports 之后）添加窗花图片导入：

```javascript
import windowFlower18 from '@/assets/窗花018.png'
import windowFlower19 from '@/assets/窗花019.png'
```

- [ ] **Step 2: 替换 Hero 模板区域**

将原模板中的 SectionHero 调用：

```html
<SectionHero
  title="在线纹样库"
  subtitle="搜索、筛选、分页、详情一体化"
/>
```

替换为带装饰的 Hero 区域：

```html
<section class="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-pattern-bg via-pattern-loading to-pattern-bg">
  <!-- 窗花装饰 - 左上 -->
  <img
    :src="windowFlower18"
    alt=""
    class="pointer-events-none absolute -top-10 -left-10 w-[200px] opacity-[0.08] rotate-[-15deg] select-none"
  />
  <!-- 窗花装饰 - 右下 -->
  <img
    :src="windowFlower19"
    alt=""
    class="pointer-events-none absolute -bottom-8 -right-8 w-[180px] opacity-[0.1] rotate-[10deg] select-none"
  />

  <div class="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 text-center">
    <SectionHero
      kicker="纹样数据库"
      title="在线纹样库"
      subtitle="探索中国传统纹样的数字宝库"
    />
  </div>

  <!-- 底部渐变分隔线 -->
  <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pattern-border-warm to-transparent" />
</section>
```

- [ ] **Step 3: 构建验证**

```bash
npm run build
```

Expected: 构建成功，无报错。

---

### Task 2: 筛选栏 — 装饰线 + 按钮微光效果

**Files:**
- Modify: `src/views/PatternLibraryView.vue:223-272` (template filter section)
- Modify: `src/views/PatternLibraryView.vue` (新增 `<style scoped>` 块)

- [ ] **Step 1: 筛选栏容器加装饰线和内阴影**

将原筛选栏容器：

```html
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 rounded-2xl border border-pattern-border bg-pattern-bg/80 backdrop-blur p-4 mb-8">
```

替换为：

```html
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 rounded-2xl border border-pattern-border bg-pattern-bg/80 backdrop-blur shadow-inner p-4 mb-8 relative">
  <!-- 顶部装饰线 -->
  <div class="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-bamboo-light/60 via-bamboo-accent/30 to-transparent" />
```

并在该 `</div>` 结束标签前关闭装饰线 div（注意嵌套）。

- [ ] **Step 2: 查询按钮加 shimmer class**

将查询按钮：

```html
class="inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-bamboo-light text-pattern-cta-text text-xs font-bold tracking-[0.15em] hover:bg-bamboo-accent transition-colors"
```

替换为：

```html
class="btn-shimmer inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-bamboo-light text-pattern-cta-text text-xs font-bold tracking-[0.15em] hover:bg-bamboo-accent transition-colors overflow-hidden relative"
```

- [ ] **Step 3: 添加 scoped style 块**

在 `</template>` 结束标签之后、`</script>` 之前（或文件末尾），添加：

```html
<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.btn-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: none;
}

.btn-shimmer:hover::after {
  animation: shimmer 0.6s ease-out;
}
</style>
```

- [ ] **Step 4: 构建验证**

```bash
npm run build
```

Expected: 构建成功，无报错。

---

### Task 3: 卡片区 — 悬停动效 + 渐变遮罩 + 标签样式

**Files:**
- Modify: `src/views/PatternLibraryView.vue:287-319` (template card grid)

- [ ] **Step 1: 卡片 article 加强悬停效果**

将原卡片：

```html
class="rounded-2xl border border-pattern-border bg-pattern-card overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
```

替换为：

```html
class="pattern-card rounded-2xl border border-pattern-border bg-pattern-card overflow-hidden transition-all duration-300 ease-out"
```

- [ ] **Step 2: 图片区加渐变遮罩**

将原图片区：

```html
<div class="aspect-[4/3] bg-pattern-media flex items-center justify-center">
  <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.patternCode" class="w-full h-full object-cover" />
  <div v-else class="text-xs text-pattern-empty">暂无图片</div>
</div>
```

替换为：

```html
<div class="pattern-card-image aspect-[4/3] bg-pattern-media flex items-center justify-center relative overflow-hidden">
  <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.patternCode" class="w-full h-full object-cover transition-[filter] duration-300" />
  <div v-else class="text-xs text-pattern-empty">暂无图片</div>
  <!-- 底部渐变遮罩 -->
  <div v-if="item.imageUrl" class="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-pattern-card to-transparent pointer-events-none" />
</div>
```

- [ ] **Step 3: 编码标题加竖线装饰**

将原编码标题：

```html
<h3 class="text-sm font-bold text-pattern-ink-alt truncate">{{ item.patternCode || '未命名编码' }}</h3>
```

替换为：

```html
<h3 class="text-sm font-bold text-pattern-ink-alt truncate border-l-2 border-bamboo-accent pl-3">{{ item.patternCode || '未命名编码' }}</h3>
```

- [ ] **Step 4: 标签药丸改为左边框彩色条样式**

将原标签区域：

```html
<div class="flex flex-wrap gap-2 text-[10px] text-pattern-label">
  <span v-if="item.mainCategory" class="px-2 py-1 rounded-full bg-pattern-tag">{{ item.mainCategory }}</span>
  <span v-if="item.style" class="px-2 py-1 rounded-full bg-pattern-tag">{{ item.style }}</span>
  <span v-if="item.region" class="px-2 py-1 rounded-full bg-pattern-tag">{{ item.region }}</span>
  <span v-if="item.period" class="px-2 py-1 rounded-full bg-pattern-tag">{{ item.period }}</span>
</div>
```

替换为：

```html
<div class="flex flex-wrap gap-2 text-[10px] text-pattern-label">
  <span v-if="item.mainCategory" class="px-2 py-1 rounded-md bg-white/40 border-l-[3px] border-bamboo-light">{{ item.mainCategory }}</span>
  <span v-if="item.style" class="px-2 py-1 rounded-md bg-white/40 border-l-[3px] border-pattern-ring">{{ item.style }}</span>
  <span v-if="item.region" class="px-2 py-1 rounded-md bg-white/40 border-l-[3px] border-pattern-placeholder">{{ item.region }}</span>
  <span v-if="item.period" class="px-2 py-1 rounded-md bg-white/40 border-l-[3px] border-pattern-label">{{ item.period }}</span>
</div>
```

- [ ] **Step 5: 在 scoped style 中添加卡片动效样式**

在已有的 `<style scoped>` 块中追加：

```css
.pattern-card {
  box-shadow: 0 1px 3px rgba(111, 97, 77, 0.06);
}

.pattern-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(111, 97, 77, 0.12);
}

.pattern-card:hover .pattern-card-image img {
  filter: brightness(1.05);
}
```

- [ ] **Step 6: 构建验证**

```bash
npm run build
```

Expected: 构建成功，无报错。

---

### Task 4: 详情弹窗 — 改为右侧滑入面板

**Files:**
- Modify: `src/views/PatternLibraryView.vue:82-83` (新增 script 状态)
- Modify: `src/views/PatternLibraryView.vue:184-211` (openDetail 函数)
- Modify: `src/views/PatternLibraryView.vue:344-400` (template modal section)

- [ ] **Step 1: 新增图片放大状态和 Esc 键支持**

在 `<script setup>` 中 `showDetail` 和 `activeDetail` 之后添加：

```javascript
const imageZoomed = ref(false)
```

- [ ] **Step 2: 修改 openDetail 函数支持 Esc 键监听**

在 `openDetail` 函数中，`showDetail.value = true` 之后添加 Esc 键监听。将原函数替换为：

```javascript
const onEscKey = (e) => {
  if (e.key === 'Escape') {
    showDetail.value = false
  }
}

const openDetail = async (code) => {
  if (!code) return

  loadingDetail.value = true
  detailError.value = ''
  imageZoomed.value = false

  try {
    const detail = await getOpenPatternDetailByCode(code)
    activeDetail.value = {
      title: `${detail?.title ?? code}`,
      patternCode: `${detail?.patternCode ?? code}`,
      image: `${detail?.image ?? ''}`,
      desc: `${detail?.desc ?? ''}`,
      story: Array.isArray(detail?.story)
        ? detail.story.filter(Boolean)
        : `${detail?.story ?? ''}`
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),
    }
    showDetail.value = true
    document.addEventListener('keydown', onEscKey)
  } catch (error) {
    console.error(error)
    detailError.value = '详情加载失败，请稍后重试。'
  } finally {
    loadingDetail.value = false
  }
}
```

- [ ] **Step 3: 添加关闭面板时移除监听的逻辑**

在 script 中添加一个关闭函数：

```javascript
const closeDetail = () => {
  showDetail.value = false
  imageZoomed.value = false
  document.removeEventListener('keydown', onEscKey)
}
```

- [ ] **Step 4: 用 watch 替代手动监听（更优雅）**

移除步骤 2 中手动添加的 `document.addEventListener`，改为在 script 顶部添加 watch：

```javascript
import { computed, onMounted, ref, watch } from 'vue'
```

在 `activeDetail` 定义之后添加：

```javascript
watch(showDetail, (val) => {
  if (val) {
    document.addEventListener('keydown', onEscKey)
  } else {
    document.removeEventListener('keydown', onEscKey)
    imageZoomed.value = false
  }
})
```

同时简化 `openDetail`，移除其中的 `document.addEventListener` 调用，移除 `closeDetail` 函数（因为 watch 已处理）。最终 openDetail 为：

```javascript
const openDetail = async (code) => {
  if (!code) return

  loadingDetail.value = true
  detailError.value = ''

  try {
    const detail = await getOpenPatternDetailByCode(code)
    activeDetail.value = {
      title: `${detail?.title ?? code}`,
      patternCode: `${detail?.patternCode ?? code}`,
      image: `${detail?.image ?? ''}`,
      desc: `${detail?.desc ?? ''}`,
      story: Array.isArray(detail?.story)
        ? detail.story.filter(Boolean)
        : `${detail?.story ?? ''}`
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),
    }
    showDetail.value = true
  } catch (error) {
    console.error(error)
    detailError.value = '详情加载失败，请稍后重试。'
  } finally {
    loadingDetail.value = false
  }
}
```

- [ ] **Step 5: 替换详情弹窗模板**

将原 Teleport 块（第 344-400 行）整体替换为：

```html
<Teleport to="body">
  <!-- 遮罩层（注意：Teleport 不加 v-if，否则离开动画不生效） -->
  <Transition name="detail-overlay">
    <div
      v-if="showDetail"
      class="fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px]"
      @click.self="closeDetail"
    />
  </Transition>

  <!-- 侧边滑入面板 -->
  <Transition name="detail-panel">
    <div
      v-if="showDetail"
      class="fixed right-0 top-0 bottom-0 z-[71] w-full max-w-lg bg-pattern-modal border-l border-pattern-border shadow-2xl overflow-y-auto"
    >
      <!-- 头部 -->
      <div class="sticky top-0 z-10 bg-pattern-modal/95 backdrop-blur-sm border-b border-pattern-divider">
        <div class="p-6 md:p-8 flex items-start justify-between gap-4">
          <div>
            <h2 class="text-2xl font-bold text-pattern-ink">{{ activeDetail?.title || '纹样详情' }}</h2>
            <p class="mt-2 text-xs text-pattern-subtle-alt">编码：{{ activeDetail?.patternCode }}</p>
          </div>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-lg text-pattern-aux hover:text-pattern-ink hover:bg-pattern-hover transition-colors"
            @click="closeDetail"
          >
            ✕
          </button>
        </div>
        <!-- 头部装饰线 -->
        <div class="h-px bg-gradient-to-r from-bamboo-light/40 via-pattern-border-warm to-transparent" />
      </div>

      <!-- 内容区 -->
      <div class="p-6 md:p-8 space-y-6">
        <div v-if="detailError" class="rounded-xl border border-pattern-error-border bg-pattern-error-bg text-pattern-error-text text-sm px-4 py-3">
          {{ detailError }}
        </div>

        <div v-if="loadingDetail" class="h-32 rounded-xl border border-pattern-border bg-pattern-loading flex items-center justify-center text-pattern-muted gap-2">
          <PhSpinner class="w-4 h-4 animate-spin" />
          加载详情中...
        </div>

        <template v-else>
          <!-- 图片区（支持点击放大） -->
          <div
            v-if="activeDetail?.image"
            class="relative cursor-zoom-in overflow-hidden rounded-xl border border-pattern-border bg-white/50"
            :class="{ 'cursor-zoom-out': imageZoomed }"
            @click="imageZoomed = !imageZoomed"
          >
            <img
              :src="activeDetail.image"
              :alt="activeDetail.title"
              class="w-full max-h-[480px] object-contain transition-transform duration-300 ease-out"
              :class="{ 'scale-150': imageZoomed }"
            />
          </div>

          <p class="text-sm leading-7 text-pattern-text">{{ activeDetail?.desc || '暂无描述' }}</p>

          <!-- 故事区 -->
          <div v-if="activeDetail?.story?.length" class="space-y-4">
            <h3 class="text-sm font-bold text-pattern-ink-alt tracking-[0.12em] flex items-center gap-2">
              <span class="text-bamboo-accent">✦</span> 故事内容
            </h3>
            <div class="border-l-2 border-pattern-border-warm pl-4 space-y-4">
              <template v-for="(paragraph, index) in activeDetail.story" :key="index">
                <p class="text-sm leading-7 text-pattern-text-soft">
                  <span v-if="index === 0" class="text-2xl text-pattern-border-warm leading-none mr-1">❝</span>{{ paragraph }}<span v-if="index === activeDetail.story.length - 1" class="text-2xl text-pattern-border-warm leading-none ml-1">❞</span>
                </p>
                <div v-if="index < activeDetail.story.length - 1" class="border-b border-dashed border-pattern-border/50" />
              </template>
            </div>
          </div>

          <!-- 外部链接 -->
          <a
            v-if="tableUrl"
            :href="tableUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 h-10 rounded-xl border border-pattern-border-mid text-xs font-bold tracking-[0.15em] text-pattern-button-text-strong hover:bg-pattern-link-hover transition-colors"
          >
            打开网页信息页
            <PhArrowSquareOut class="w-4 h-4" />
          </a>
        </template>
      </div>
    </div>
  </Transition>
</Teleport>
```

- [ ] **Step 6: 在 scoped style 中添加面板过渡动画**

在 `<style scoped>` 块中追加：

```css
/* 遮罩淡入淡出 */
.detail-overlay-enter-active,
.detail-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.detail-overlay-enter-from,
.detail-overlay-leave-to {
  opacity: 0;
}

/* 面板滑入滑出 */
.detail-panel-enter-active {
  transition: transform 0.35s ease-out;
}
.detail-panel-leave-active {
  transition: transform 0.25s ease-in;
}
.detail-panel-enter-from {
  transform: translateX(100%);
}
.detail-panel-leave-to {
  transform: translateX(100%);
}
```

- [ ] **Step 7: 添加 closeDetail 函数引用**

确保模板中 `@click.self="closeDetail"` 和 `@click="closeDetail"` 能正确引用。如果步骤 3 中未添加 closeDetail，现在添加：

```javascript
const closeDetail = () => {
  showDetail.value = false
}
```

注意：`watch` 中已处理 `imageZoomed` 重置和键盘监听清理。

- [ ] **Step 8: 构建验证**

```bash
npm run build
```

Expected: 构建成功，无报错。

---

### Task 5: 最终构建验证

**Files:**
- None (仅验证)

- [ ] **Step 1: 完整构建**

```bash
npm run build
```

Expected: 构建成功，无警告无报错。

- [ ] **Step 2: 验证所有改动文件无语法错误**

```bash
node -e "const fs = require('fs'); const content = fs.readFileSync('src/views/PatternLibraryView.vue', 'utf-8'); console.log('File length:', content.length, 'lines'); console.log('Has scoped style:', content.includes('<style scoped>')); console.log('Has closeDetail:', content.includes('closeDetail')); console.log('Has imageZoomed:', content.includes('imageZoomed')); console.log('Has windowFlower:', content.includes('windowFlower'));"
```

Expected: 全部输出 `true`，文件长度 > 450 行。
