<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import SectionHero from '@/components/SectionHero.vue'
import FilterBar from '@/components/FilterBar.vue'
import CollectibleDisplay from '../components/CollectibleDisplay.vue'
import StoryModal from '../components/StoryModal.vue'
import { ShieldCheck, Database } from 'lucide-vue-next'
import { animate } from 'animejs'
import { useAnimate } from '@/composables/useAnimate.js'
import { DURATION, EASING } from '@/composables/anime.config.js'
import { getPatterns, getPatternDetail } from '@/api/patterns.js'

import pattern017 from '../assets/窗花017.png'
import pattern018 from '../assets/窗花018.png'
import pattern019 from '../assets/窗花019.png'

const showStory = ref(false)
const activePattern = ref(null)
const leftColRefs = ref([])
const rightColRefs = ref([])
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
      '本作品”系列 01：凤凰”的灵感源自历代剪纸纹饰与神话故事。在古代文明中，凤凰被视为吉祥与重生的神圣图腾。',
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
      '匠人以毫米级控制完成深浅层次，将”剪”与”刻”的节奏统一为可阅读的视觉语言。',
      '在自然光与侧光下，作品会产生不同阴影层次，呈现丰富且耐看的细节变化。'
    ],
    theme: '瑞兽',
  },
  {
    id: 3,
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

const setLeftRef = (el, index) => {
  if (el) leftColRefs.value[index] = el
}

const setRightRef = (el, index) => {
  if (el) rightColRefs.value[index] = el
}

function openStory(item) {
  activePattern.value = item
  showStory.value = true
}

const animateSections = () => {
  leftColRefs.value = []
  rightColRefs.value = []

  nextTick(() => {
    filteredPatterns.value.forEach((_, index) => {
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

onMounted(async () => {
  await loadPatternDetails()
  await nextTick()
  animateSections()
})

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

    <Teleport to="body">
      <Transition :css="false" @enter="onStoryEnter" @leave="onStoryLeave">
        <StoryModal v-if="showStory" :artifact="activePattern" @close="showStory = false" />
      </Transition>
    </Teleport>
  </main>
</template>
