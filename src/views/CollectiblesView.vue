<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { PhScroll, PhArchive, PhGridFour } from '@phosphor-icons/vue'
import { animate } from 'animejs'
import { useAnimate } from '@/composables/useAnimate.js'
import { DURATION, EASING, STAGGER_DELAY } from '@/composables/anime.config.js'
import { getPatterns, getPatternDetail } from '@/api/patterns.js'
import ChineseDivider from '@/components/ChineseDivider.vue'
import CollectibleScrollMode from '@/components/CollectibleScrollMode.vue'
import CollectibleCabinetMode from '@/components/CollectibleCabinetMode.vue'
import CollectiblePavilionMode from '@/components/CollectiblePavilionMode.vue'
import StoryModal from '@/components/StoryModal.vue'

import pattern017 from '@/assets/窗花017.png'
import pattern018 from '@/assets/窗花018.png'
import pattern019 from '@/assets/窗花019.png'

// ============ 浏览模式 ============
const viewMode = ref('pavilion') // 'scroll' | 'cabinet' | 'pavilion'

// ============ 通用状态 ============
const currentIndex = ref(0)
const showStory = ref(false)
const activePattern = ref(null)
const loading = ref(true)
const loadError = ref('')
const themeOptions = ['瑞兽', '花卉', '人物', '山水', '几何', '吉祥纹']
const selectedThemes = ref([])

// ============ 数据 ============
const DEFAULT_PATTERN_IDS = ['0001', '0002', '0003']
const patternIds = ref([...DEFAULT_PATTERN_IDS])

const fallbackPatterns = [
  {
    id: '0001',
    title: '凤凰涅槃',
    patternCode: 'PHX-2024-001',
    image: pattern017,
    desc: '凤凰浴火重生于红纸金箔之间，在传统技艺与现代审美之间架起桥梁。',
    story: [
      '凤凰浴火重生于红纸金箔之间，在传统技艺与现代审美之间架起桥梁。',
      '本作品"系列 01：凤凰"的灵感源自历代剪纸纹饰与神话故事。在古代文明中，凤凰被视为吉祥与重生的神圣图腾。',
      '这件作品中的每一片羽毛与纹路都经过匠人精心刻画，纸张层叠在光线照射下呈现出立体而灵动的观感。'
    ],
    theme: '瑞兽',
  },
  {
    id: '0002',
    title: '匠心雕琢',
    patternCode: 'PHX-2024-002',
    image: pattern018,
    desc: '运用极细的镂空刀法与多层错位叠纸技术，重新诠释了这一古老而优雅的传说。',
    story: [
      '匠心雕琢强调刀法与结构的秩序感，让传统纹样在当代空间中拥有更强的陈设价值。',
      '匠人以毫米级控制完成深浅层次，将"剪"与"刻"的节奏统一为可阅读的视觉语言。',
      '在自然光与侧光下，作品会产生不同阴影层次，呈现丰富且耐看的细节变化。'
    ],
    theme: '瑞兽',
  },
  {
    id: '0003',
    title: '非遗结晶',
    patternCode: 'PHX-2024-003',
    image: pattern019,
    desc: '它不仅是一件精美的剪纸艺术品，更是非遗技艺在当代生活中的延续与再生。',
    story: [
      '非遗结晶聚焦于传承价值：在保持传统工艺精神的前提下，探索更具时代感的表达方式。',
      '作品采用稳定的装裱与防护体系，兼顾收藏展示与长期保存的需求。',
      '当传统纹样走进现代居住空间，文化不再停留于陈列，而成为日常可感知的美学体验。'
    ],
    theme: '瑞兽',
  }
]

const fallbackById = fallbackPatterns.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {})

const patterns = ref([...fallbackPatterns])
activePattern.value = patterns.value[0]

const filteredPatterns = computed(() => {
  if (!selectedThemes.value.length) return patterns.value
  return patterns.value.filter(
    (p) => selectedThemes.value.includes(p.theme) || p.theme === '未分类'
  )
})

// ============ 工具函数 ============
const normalizeStory = (story, fallbackStory = []) => {
  if (Array.isArray(story)) {
    const normalized = story.map((item) => `${item ?? ''}`.trim()).filter(Boolean)
    return normalized.length ? normalized : fallbackStory
  }
  if (typeof story === 'string') {
    const normalized = story.split('\n').map((item) => item.trim()).filter(Boolean)
    return normalized.length ? normalized : fallbackStory
  }
  return fallbackStory
}

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
    theme: `${data?.theme ?? fallbackItem.theme ?? '未分类'}`,
  }
}

// ============ 模式切换 ============
const switchMode = (mode) => {
  viewMode.value = mode
  if (mode === 'cabinet') {
    currentIndex.value = 0
  }
}

// ============ 展柜模式交互 ============
const prevArtwork = () => {
  if (currentIndex.value > 0) currentIndex.value--
}

const nextArtwork = () => {
  if (currentIndex.value < filteredPatterns.value.length - 1) currentIndex.value++
}

const enterCabinetMode = (index) => {
  currentIndex.value = index
  viewMode.value = 'cabinet'
}

// ============ 故事弹窗 ============
function openStory(item) {
  activePattern.value = item
  showStory.value = true
}

// ============ 数据加载 ============
const loadPatternDetails = async () => {
  loading.value = true
  loadError.value = ''

  try {
    const listResponse = await getPatterns()
    const list = Array.isArray(listResponse)
      ? listResponse
      : Array.isArray(listResponse?.data)
        ? listResponse.data
        : []

    const remoteIds = list
      .map((item) => Number(item?.id))
      .filter((id) => Number.isFinite(id) && id > 0)

    patternIds.value = remoteIds.length ? remoteIds : [...DEFAULT_PATTERN_IDS]
  } catch (error) {
    console.warn('获取作品ID失败，使用默认ID:', error)
    patternIds.value = [...DEFAULT_PATTERN_IDS]
  }

  const settled = await Promise.allSettled(
    patternIds.value.map((id) => getPatternDetail(id))
  )

  let successCount = 0

  const merged = patternIds.value.map((id, index) => {
    const fallbackItem = fallbackById[id] ?? fallbackPatterns[0]
    const result = settled[index]

    if (result.status === 'fulfilled') {
      successCount += 1
      return normalizePattern(result.value, fallbackItem)
    }

    return normalizePattern({}, fallbackItem)
  })

  patterns.value = merged
  activePattern.value = merged[0] ?? null

  if (!successCount) {
    loadError.value = '未能获取线上作品详情，当前展示本地备选内容。'
  } else if (successCount < patternIds.value.length) {
    loadError.value = '部分作品详情加载失败，已使用备选内容补齐。'
  }

  loading.value = false
}

// ============ 键盘导航 ============
const handleKeydown = (e) => {
  if (showStory.value) return

  if (viewMode.value === 'cabinet') {
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        prevArtwork()
        break
      case 'ArrowRight':
        e.preventDefault()
        nextArtwork()
        break
      case 'Escape':
        viewMode.value = 'pavilion'
        break
      case ' ':
        e.preventDefault()
        if (filteredPatterns.value[currentIndex.value]) {
          openStory(filteredPatterns.value[currentIndex.value])
        }
        break
    }
  }
}

// ============ 故事弹窗动画 ============
function onStoryEnter(el, done) {
  const box = el.querySelector('[data-modal-box]')
  if (!box) { done(); return }
  let called = false
  const safeDone = () => { if (!called) { called = true; done() } }
  animate(box, {
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: DURATION.base,
    ease: EASING,
    onComplete: safeDone
  })
  setTimeout(safeDone, DURATION.base + 50)
}

function onStoryLeave(el, done) {
  const box = el.querySelector('[data-modal-box]')
  if (!box) { done(); return }
  let called = false
  const safeDone = () => { if (!called) { called = true; done() } }
  animate(box, {
    opacity: [1, 0],
    scale: [1, 0.97],
    duration: DURATION.fast,
    ease: EASING,
    onComplete: safeDone
  })
  setTimeout(safeDone, DURATION.fast + 50)
}

// ============ 生命周期 ============
onMounted(async () => {
  await loadPatternDetails()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="collectibles-page">
    <!-- 页面标题区 -->
    <header class="page-header">
      <section class="collectibles-hero">
        <!-- 装饰性背景大字 -->
        <div class="hero-bg-chars" aria-hidden="true">
          <span class="hero-bg-char hero-bg-char--left">纸</span>
          <span class="hero-bg-char hero-bg-char--right">镂</span>
        </div>

        <div class="hero-content">
          <!-- 主标题 -->
          <h1 class="hero-title">非遗珍藏</h1>

          <!-- 朱红装饰线 -->
          <div class="hero-divider">
            <span class="hero-divider-dot"></span>
          </div>

          <!-- 副标题 -->
          <p class="hero-subtitle">千年剪纸，一纸风华</p>

          <!-- 意境文案 -->
          <p class="hero-desc">
            纸上乾坤，刀尖流转千年匠心。<br />
            每一件藏品都是时光与手艺的凝结，邀您驻足品鉴。
          </p>
        </div>
      </section>
    </header>

    <!-- 模式切换器 -->
    <div class="mode-switcher" :class="{ 'mode-switcher--fixed': viewMode === 'cabinet' }">
      <div class="mode-switcher-inner" role="tablist" aria-label="浏览模式">
        <button
          v-for="mode in [
            { id: 'pavilion', icon: PhGridFour, label: '百宝阁' },
            { id: 'scroll', icon: PhScroll, label: '卷轴长卷' },
            { id: 'cabinet', icon: PhArchive, label: '珍品展柜' },
          ]"
          :key="mode.id"
          :class="{ active: viewMode === mode.id }"
          role="tab"
          :aria-selected="viewMode === mode.id"
          :aria-controls="`mode-panel-${mode.id}`"
          @click="switchMode(mode.id)"
        >
          <component :is="mode.icon" class="w-4 h-4" aria-hidden="true" />
          <span>{{ mode.label }}</span>
        </button>
      </div>
    </div>

    <!-- 模式切换器占位 -->
    <div class="mode-switcher-spacer"></div>

    <!-- 百宝阁模式 -->
    <CollectiblePavilionMode
      v-if="viewMode === 'pavilion'"
      :items="filteredPatterns"
      :loading="loading"
      :loadError="loadError"
      :themeOptions="themeOptions"
      :selectedThemes="selectedThemes"
      @select-item="(idx) => enterCabinetMode(idx)"
      @open-story="openStory"
      @update:selectedThemes="selectedThemes = $event"
    />

    <!-- 卷轴长卷模式 -->
    <CollectibleScrollMode
      v-if="viewMode === 'scroll'"
      :items="filteredPatterns"
      :activeIndex="currentIndex"
      @select-item="(idx) => currentIndex = idx"
      @open-story="openStory"
    />

    <!-- 珍品展柜模式 -->
    <CollectibleCabinetMode
      v-if="viewMode === 'cabinet'"
      :items="filteredPatterns"
      :currentIndex="currentIndex"
      @prev="prevArtwork"
      @next="nextArtwork"
      @open-story="openStory"
      @exit="viewMode = 'pavilion'"
      @select-index="(idx) => currentIndex = idx"
    />

    <!-- 装饰分隔线 -->
    <ChineseDivider v-if="viewMode === 'pavilion'" />

    <!-- 故事弹窗 -->
    <Teleport to="body">
      <Transition :css="false" @enter="onStoryEnter" @leave="onStoryLeave">
        <StoryModal v-if="showStory" :artifact="activePattern" @close="showStory = false" />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.collectibles-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #FEF2F2 0%, #FFFBEB 50%, #FFF7ED 100%);
}

/* 页面标题区 */
.page-header {
  padding: 7rem 2rem 0;
  max-width: 1280px;
  margin: 0 auto;
}

/* ========== 藏品 Hero ========== */
.collectibles-hero {
  position: relative;
  padding: 2rem 0 3rem;
  overflow: hidden;
  text-align: center;
}

.collectibles-hero .hero-bg-chars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.collectibles-hero .hero-bg-char {
  position: absolute;
  font-family: 'Noto Serif SC', 'Noto Serif TC', serif;
  font-weight: 900;
  font-size: clamp(180px, 25vw, 320px);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(220, 38, 38, 0.06);
  user-select: none;
}

.collectibles-hero .hero-bg-char--left {
  left: -5%;
  top: -10%;
  transform: rotate(-12deg);
  animation: collectibles-char-float 8s ease-in-out infinite alternate;
}

.collectibles-hero .hero-bg-char--right {
  right: -5%;
  bottom: -15%;
  transform: rotate(8deg);
  animation: collectibles-char-float 8s ease-in-out infinite alternate-reverse;
}

@keyframes collectibles-char-float {
  from { transform: rotate(-12deg) translateY(0); }
  to { transform: rotate(-12deg) translateY(-12px); }
}

.collectibles-hero .hero-content {
  position: relative;
  z-index: 10;
}

.collectibles-hero .hero-title {
  font-family: 'Noto Serif SC', 'Noto Serif TC', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.2;
  margin-bottom: 1.25rem;
  background: linear-gradient(135deg, #1e293b 0%, #334155 40%, #DC2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.collectibles-hero .hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 1.25rem;
}

.collectibles-hero .hero-divider::before,
.collectibles-hero .hero-divider::after {
  content: '';
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.4));
}

.collectibles-hero .hero-divider::after {
  background: linear-gradient(90deg, rgba(220, 38, 38, 0.4), transparent);
}

.collectibles-hero .hero-divider-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #DC2626;
  box-shadow: 0 0 8px rgba(220, 38, 38, 0.3);
}

.collectibles-hero .hero-subtitle {
  font-family: 'Noto Serif SC', 'Noto Serif TC', serif;
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  font-weight: 500;
  color: #475569;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
}

.collectibles-hero .hero-desc {
  font-size: 15px;
  color: #64748b;
  line-height: 2;
  max-width: 420px;
  margin: 0 auto;
}

/* 模式切换器 - 新中式胶囊设计 */
.mode-switcher {
  position: sticky;
  top: 5rem;
  z-index: 40;
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;
  background: rgba(254, 242, 242, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(220, 38, 38, 0.1);
}

.mode-switcher--fixed {
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
}


.mode-switcher-spacer {
  display: none;
}

.mode-switcher--fixed + .mode-switcher-spacer {
  display: block;
  height: 4.5rem;
}

.mode-switcher-inner {
  display: flex;
  gap: 0.25rem;
  padding: 0.375rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 9999px;
  box-shadow: 0 4px 24px rgba(220, 38, 38, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
}

.mode-switcher-inner button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #B45309;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.mode-switcher-inner button:hover {
  color: #991B1B;
  background: rgba(220, 38, 38, 0.08);
}

.mode-switcher-inner button.active {
  color: #FFFFFF;
  background: linear-gradient(135deg, #DC2626, #B91C1C);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 5.5rem 1rem 0;
  }

  .mode-switcher {
    padding: 0.75rem 1rem;
  }

  .mode-switcher--fixed + .mode-switcher-spacer {
    height: 3.5rem;
  }

  .mode-switcher-inner button {
    padding: 0.5rem 0.875rem;
    font-size: 0.75rem;
  }

  .mode-switcher-inner button span {
    display: none;
  }

  .collectibles-hero .hero-bg-char {
    font-size: 140px;
    -webkit-text-stroke-width: 0.5px;
  }

  .collectibles-hero .hero-bg-char--left {
    left: -15%;
    top: -5%;
  }

  .collectibles-hero .hero-bg-char--right {
    right: -15%;
    bottom: -10%;
  }

  .collectibles-hero .hero-desc br {
    display: none;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .mode-switcher-inner button {
    transition: none;
  }

  .collectibles-hero .hero-bg-char {
    animation: none !important;
  }
}
</style>
