<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import SectionHero from '@/components/SectionHero.vue'
import FilterBar from '@/components/FilterBar.vue'
import CollectibleDisplay from '../components/CollectibleDisplay.vue'
import StoryModal from '../components/StoryModal.vue'
import { Theater, Images, LayoutGrid, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-vue-next'
import { animate } from 'animejs'
import { useAnimate } from '@/composables/useAnimate.js'
import { DURATION, EASING } from '@/composables/anime.config.js'
import { getPatterns, getPatternDetail } from '@/api/patterns.js'

import pattern017 from '../assets/窗花017.png'
import pattern018 from '../assets/窗花018.png'
import pattern019 from '../assets/窗花019.png'

// 浏览模式
const viewMode = ref('theater') // 'theater' | 'gallery' | 'masonry'
const showModeMenu = ref(false)

// 沉浸剧场模式状态
const currentIndex = ref(0)
const isZoomed = ref(false)
const infoExpanded = ref(false)
const isFullscreen = ref(false)

// 数据状态
const showStory = ref(false)
const activePattern = ref(null)
const loading = ref(true)
const loadError = ref('')
const themeOptions = ['瑞兽', '花卉', '人物', '山水', '几何', '吉祥纹']
const selectedThemes = ref([])
const { slideUp } = useAnimate()

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

const currentArtwork = computed(() => {
  return filteredPatterns.value[currentIndex.value] || null
})

// 工具函数
const normalizeStory = (story, fallbackStory = []) => {
  if (Array.isArray(story)) {
    const normalized = story.map((item) => `${item ?? ''}`.trim()).filter(Boolean)
    return normalized.length ? normalized : fallbackStory
  }

  if (typeof story === 'string') {
    const normalized = story
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
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

// 沉浸剧场模式方法
const prevArtwork = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    isZoomed.value = false
  }
}

const nextArtwork = () => {
  if (currentIndex.value < filteredPatterns.value.length - 1) {
    currentIndex.value++
    isZoomed.value = false
  }
}

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value
}

const toggleInfo = () => {
  infoExpanded.value = !infoExpanded.value
}

const exitTheater = () => {
  viewMode.value = 'masonry'
}

// 模式切换
const switchMode = (mode) => {
  viewMode.value = mode
  showModeMenu.value = false
  if (mode === 'theater') {
    currentIndex.value = 0
    isZoomed.value = false
    infoExpanded.value = false
  }
}

// 进入沉浸剧场模式
const enterTheaterMode = (item) => {
  const index = filteredPatterns.value.findIndex(p => p.id === item.id)
  if (index !== -1) {
    currentIndex.value = index
    viewMode.value = 'theater'
    isZoomed.value = false
    infoExpanded.value = false
  }
}

function openStory(item) {
  activePattern.value = item
  showStory.value = true
}

// 数据加载
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

// 键盘导航
const handleKeydown = (e) => {
  if (viewMode.value !== 'theater') return

  switch(e.key) {
    case 'ArrowLeft':
      prevArtwork()
      break
    case 'ArrowRight':
      nextArtwork()
      break
    case 'Escape':
      exitTheater()
      break
    case ' ':
      e.preventDefault()
      toggleInfo()
      break
    case 'f':
    case 'F':
      // 全屏切换（浏览器原生）
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.()
      } else {
        document.exitFullscreen?.()
      }
      break
  }
}

onMounted(async () => {
  await loadPatternDetails()
  window.addEventListener('keydown', handleKeydown)
})

// 清理
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// 动画钩子
function onStoryEnter(el, done) {
  const box = el.querySelector('[data-modal-box]')
  if (!box) {
    done()
    return
  }
  let called = false
  const safeDone = () => {
    if (!called) {
      called = true
      done()
    }
  }
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
  if (!box) {
    done()
    return
  }
  let called = false
  const safeDone = () => {
    if (!called) {
      called = true
      done()
    }
  }
  animate(box, {
    opacity: [1, 0],
    scale: [1, 0.97],
    duration: DURATION.fast,
    ease: EASING,
    onComplete: safeDone
  })
  setTimeout(safeDone, DURATION.fast + 50)
}
</script>

<template>
  <!-- 模式切换器 -->
  <div class="mode-switcher">
    <button
      v-for="mode in [
        { id: 'theater', icon: Theater, label: '沉浸剧场' },
        { id: 'gallery', icon: Images, label: '横向画廊' },
        { id: 'masonry', icon: LayoutGrid, label: '瀑布流探索' }
      ]"
      :key="mode.id"
      :class="{ active: viewMode === mode.id }"
      @click="switchMode(mode.id)"
    >
      <component :is="mode.icon" class="w-4 h-4" />
      <span>{{ mode.label }}</span>
    </button>
  </div>

  <!-- 沉浸剧场模式 -->
  <div v-if="viewMode === 'theater'" class="theater-mode">
    <div class="theater-backdrop"></div>

    <!-- 关闭按钮 -->
    <button
      @click="exitTheater"
      class="fixed top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      aria-label="退出沉浸模式"
    >
      <X class="w-5 h-5" />
    </button>

    <!-- 作品展示区 -->
    <div class="artwork-stage" role="img" :aria-label="`作品：${currentArtwork?.title}`">
      <Transition name="fade-scale" mode="out-in">
        <img
          v-if="currentArtwork"
          :key="currentArtwork.id"
          :src="currentArtwork.image"
          :alt="`${currentArtwork.title} - ${currentArtwork.desc}`"
          :class="{ zoomed: isZoomed }"
          class="artwork-image"
          @click="toggleZoom"
          loading="eager"
        />
      </Transition>
    </div>

    <!-- 导航控制 -->
    <nav class="theater-controls" aria-label="作品导航">
      <button
        @click="prevArtwork"
        :disabled="currentIndex === 0"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
        aria-label="上一件作品"
      >
        <ChevronLeft class="w-4 h-4 inline mr-1" aria-hidden="true" />
        上一件
      </button>
      <span aria-live="polite" aria-atomic="true">第 {{ currentIndex + 1 }} 件，共 {{ filteredPatterns.length }} 件</span>
      <button
        @click="nextArtwork"
        :disabled="currentIndex === filteredPatterns.length - 1"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === filteredPatterns.length - 1 }"
        aria-label="下一件作品"
      >
        下一件
        <ChevronRight class="w-4 h-4 inline ml-1" aria-hidden="true" />
      </button>
    </nav>

    <!-- 信息卡片 -->
    <div v-if="currentArtwork" :class="{ expanded: infoExpanded }" class="info-card">
      <button
        @click="toggleInfo"
        class="w-full flex items-center justify-between mb-3 cursor-pointer"
      >
        <h3 class="font-serif">{{ currentArtwork.title }}</h3>
        <span class="text-xs text-text-secondary">{{ infoExpanded ? '收起' : '展开' }}</span>
      </button>

      <div v-show="infoExpanded" class="space-y-3">
        <p class="text-sm">藏品编号：{{ currentArtwork.patternCode }}</p>
        <p class="text-sm">主题：{{ currentArtwork.theme }}</p>
        <p class="leading-relaxed">{{ currentArtwork.desc }}</p>
        <div class="flex gap-3 pt-3">
          <button
            @click="openStory(currentArtwork)"
            class="px-4 py-2 bg-museum-dark text-white rounded-lg text-sm hover:bg-museum-mid transition-colors"
          >
            查看故事
          </button>
          <button
            @click="toggleZoom"
            class="px-4 py-2 border border-border-light rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <component :is="isZoomed ? ZoomOut : ZoomIn" class="w-4 h-4" />
            {{ isZoomed ? '缩小' : '放大' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 横向画廊模式 -->
  <div v-else-if="viewMode === 'gallery'" class="gallery-mode">
    <SectionHero
      kicker="主题馆藏"
      title="横向画廊"
      subtitle="滑动浏览，沉浸体验"
    />

    <div class="gallery-scroll" role="list" aria-label="作品画廊">
      <article
        v-for="(item, index) in filteredPatterns"
        :key="item.id"
        class="gallery-card"
        role="listitem"
        @click="enterTheaterMode(item)"
        @keydown.enter="enterTheaterMode(item)"
        @keydown.space.prevent="enterTheaterMode(item)"
        tabindex="0"
        :aria-label="`作品 ${index + 1}：${item.title}`"
      >
        <img
          :src="item.image"
          :alt="`${item.title} - ${item.desc}`"
          loading="lazy"
          decoding="async"
        />
        <div class="card-info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.patternCode }}</p>
        </div>
      </article>
    </div>
  </div>

  <!-- 瀑布流探索模式 -->
  <main v-else class="pt-28 pb-20 min-h-screen bg-transparent">
    <SectionHero
      kicker="主题馆藏"
      title="沉浸展厅"
      subtitle="探索传统剪纸艺术之美"
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

    <div
      v-if="loading"
      class="w-full max-w-[1280px] mx-auto z-10 px-6 lg:px-10 py-16 text-sm text-hex-8f7b5f"
    >
      正在加载作品详情...
    </div>

    <div
      v-if="loadError"
      class="w-full max-w-[1280px] mx-auto z-10 px-6 lg:px-10 py-4 text-xs text-hex-a08b6d"
    >
      {{ loadError }}
    </div>

    <div
      v-if="!loading && !filteredPatterns.length"
      class="w-full max-w-[1280px] mx-auto z-10 px-6 lg:px-10 py-16 text-sm text-hex-8f7b5f"
    >
      <template v-if="selectedThemes.length">暂无匹配作品，请尝试其他主题筛选。</template>
      <template v-else>暂无可展示作品。</template>
    </div>

    <!-- 瀑布流网格 -->
    <div v-if="!loading && filteredPatterns.length" class="masonry-grid" role="list" aria-label="作品展示">
      <article
        v-for="(item, index) in filteredPatterns"
        :key="item.id"
        class="masonry-item"
        role="listitem"
        @click="enterTheaterMode(item)"
        @keydown.enter="enterTheaterMode(item)"
        @keydown.space.prevent="enterTheaterMode(item)"
        tabindex="0"
        :aria-label="`作品 ${index + 1}：${item.title}`"
      >
        <img
          :src="item.image"
          :alt="`${item.title} - ${item.desc}`"
          loading="lazy"
          decoding="async"
        />
        <div class="masonry-overlay">
          <h3>{{ item.title }}</h3>
          <p class="text-xs mt-1 opacity-80">{{ item.patternCode }}</p>
        </div>
      </article>
    </div>
  </main>

  <!-- 故事弹窗 -->
  <Teleport to="body">
    <Transition :css="false" @enter="onStoryEnter" @leave="onStoryLeave">
      <StoryModal v-if="showStory" :artifact="activePattern" @close="showStory = false" />
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 瀑布流布局使用 CSS Grid */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 7rem 2rem 4rem;
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .masonry-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 5rem 1rem 3rem;
  }
}
</style>
