<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { PhArrowSquareOut, PhMagnifyingGlass, PhSpinner } from '@phosphor-icons/vue'
import {
  searchOpenPatterns,
  getOpenPatternDetailByCode,
  getOpenPatternTableUrl,
} from '@/api/patterns.js'
import SectionHero from '@/components/SectionHero.vue'
import windowFlower17 from '@/assets/窗花017.png'
import windowFlower18 from '@/assets/窗花018.png'
import windowFlower19 from '@/assets/窗花019.png'
import windowFlower67 from '@/assets/窗花067.png'

const loading = ref(false)
const loadingDetail = ref(false)
const errorMessage = ref('')
const detailError = ref('')

const keyword = ref('')
const mainCategory = ref('')
const style = ref('')
const region = ref('')
const period = ref('')

const mainCategoryOptions = [
  { value: '', label: '全部分类' },
  { value: 'AN', label: '动物' },
  { value: 'PL', label: '植物' },
  { value: 'PE', label: '人物' },
  { value: 'LA', label: '风景' },
  { value: 'AB', label: '抽象' },
  { value: 'OR', label: '器物' },
  { value: 'SY', label: '符号' },
  { value: 'CE', label: '庆典' },
  { value: 'MY', label: '神话' },
  { value: 'OT', label: '其他' },
]

const styleOptions = [
  { value: '', label: '全部风格' },
  { value: 'TR', label: '传统' },
  { value: 'MO', label: '现代' },
  { value: 'FO', label: '民间' },
  { value: 'ET', label: '民族' },
  { value: 'GE', label: '几何' },
  { value: 'RE', label: '写实' },
  { value: 'DE', label: '装饰' },
  { value: 'MI', label: '复合' },
  { value: 'OT', label: '其他' },
]

const regionOptions = [
  { value: '', label: '全部地区' },
  { value: 'CN', label: '中国' },
  { value: 'YN', label: '云南' },
  { value: 'BJ', label: '北京' },
  { value: 'SH', label: '上海' },
  { value: 'GD', label: '广东' },
  { value: 'SX', label: '陕西' },
  { value: 'SD', label: '山东' },
  { value: 'ZJ', label: '浙江' },
  { value: 'OT', label: '其他地区' },
]

const periodOptions = [
  { value: '', label: '全部时期' },
  { value: 'XS', label: '先秦' },
  { value: 'QG', label: '秦汉' },
  { value: 'WS', label: '魏晋' },
  { value: 'TG', label: '隋唐' },
  { value: 'SG', label: '宋元' },
  { value: 'MG', label: '明清' },
  { value: 'MJ', label: '民国' },
  { value: 'XD', label: '现代' },
  { value: 'OT', label: '其他时期' },
]

const page = ref(0)
const size = ref(12)

const totalPages = ref(0)
const totalElements = ref(0)
const patterns = ref([])

const showDetail = ref(false)
const activeDetail = ref(null)
const imageZoomed = ref(false)

const onEscKey = (e) => {
  if (e.key === 'Escape') {
    showDetail.value = false
  }
}

watch(showDetail, (val) => {
  if (val) {
    document.addEventListener('keydown', onEscKey)
  } else {
    document.removeEventListener('keydown', onEscKey)
    imageZoomed.value = false
  }
})

const closeDetail = () => {
  showDetail.value = false
}

const hasData = computed(() => patterns.value.length > 0)
const canPrev = computed(() => page.value > 0)
const canNext = computed(() => totalPages.value ? page.value < totalPages.value - 1 : false)
const tableUrl = computed(() => {
  const code = activeDetail.value?.patternCode
  return code ? getOpenPatternTableUrl(code) : ''
})

const normalizePageData = (data) => {
  if (Array.isArray(data)) {
    return {
      content: data,
      totalPages: data.length ? 1 : 0,
      totalElements: data.length,
      number: 0,
      size: data.length || size.value,
    }
  }

  return {
    content: Array.isArray(data?.content) ? data.content : [],
    totalPages: Number.isFinite(data?.totalPages) ? data.totalPages : 0,
    totalElements: Number.isFinite(data?.totalElements) ? data.totalElements : 0,
    number: Number.isFinite(data?.number) ? data.number : page.value,
    size: Number.isFinite(data?.size) ? data.size : size.value,
  }
}

const normalizePatternItem = (item, index) => ({
  id: `${item?.id ?? item?.patternCode ?? index}`,
  patternCode: `${item?.patternCode ?? ''}`,
  imageUrl: `${item?.imageUrl ?? item?.image ?? ''}`,
  description: `${item?.description ?? item?.desc ?? ''}`.trim() || '暂无描述',
  mainCategory: `${item?.mainCategory ?? ''}`,
  style: `${item?.style ?? ''}`,
  region: `${item?.region ?? ''}`,
  period: `${item?.period ?? ''}`,
})

const fetchPatterns = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await searchOpenPatterns({
      keyword: keyword.value,
      mainCategory: mainCategory.value,
      style: style.value,
      region: region.value,
      period: period.value,
      page: page.value,
      size: size.value,
      sort: 'patternCode,asc',
    })

    const pageData = normalizePageData(response)
    patterns.value = pageData.content.map(normalizePatternItem)
    totalPages.value = pageData.totalPages
    totalElements.value = pageData.totalElements
    page.value = pageData.number
    size.value = pageData.size
  } catch (error) {
    console.error(error)
    patterns.value = []
    totalPages.value = 0
    totalElements.value = 0
    errorMessage.value = '纹样数据加载失败，请稍后重试。'
  } finally {
    loading.value = false
  }
}

const applySearch = async () => {
  page.value = 0
  await fetchPatterns()
}

const resetFilters = async () => {
  keyword.value = ''
  mainCategory.value = ''
  style.value = ''
  region.value = ''
  period.value = ''
  page.value = 0
  await fetchPatterns()
}

const goPrev = async () => {
  if (!canPrev.value) return
  page.value -= 1
  await fetchPatterns()
}

const goNext = async () => {
  if (!canNext.value) return
  page.value += 1
  await fetchPatterns()
}

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

onMounted(fetchPatterns)
</script>

<template>
  <main class="pb-20">
    <section class="hero-section relative overflow-hidden -mt-28 pt-[calc(7rem+5rem)] md:pt-[calc(7rem+8rem)] pb-20 md:pb-28">
      <!-- 底纹纹理层 -->
      <div class="hero-texture absolute inset-0 pointer-events-none" />

      <!-- 窗花装饰 - 左上 -->
      <img
        v-protect-image
        :src="windowFlower17"
        alt=""
        class="pointer-events-none absolute -top-16 -left-14 w-[280px] opacity-[0.14] rotate-[-20deg] select-none"
      />
      <!-- 窗花装饰 - 左中 -->
      <img
        v-protect-image
        :src="windowFlower67"
        alt=""
        class="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-20 w-[220px] opacity-[0.07] rotate-[5deg] select-none hidden md:block"
      />
      <!-- 窗花装饰 - 右下 -->
      <img
        v-protect-image
        :src="windowFlower18"
        alt=""
        class="pointer-events-none absolute -bottom-12 -right-12 w-[260px] opacity-[0.15] rotate-[12deg] select-none"
      />
      <!-- 窗花装饰 - 右上 -->
      <img
        v-protect-image
        :src="windowFlower19"
        alt=""
        class="pointer-events-none absolute -top-8 -right-20 w-[180px] opacity-[0.08] rotate-[-8deg] select-none hidden md:block"
      />

      <div class="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 text-center">
        <SectionHero
          title="在线纹样库"
          subtitle="探索中国传统纹样的数字宝库"
        />
        <!-- 传统纹样分隔线 -->
        <div class="flex items-center justify-center gap-4 mt-6 mb-5">
          <div class="w-16 h-px bg-gradient-to-r from-transparent to-pattern-border-warm" />
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rotate-45 bg-bamboo-accent/60" />
            <span class="w-2 h-2 rotate-45 border border-pattern-border-warm" />
            <span class="w-1.5 h-1.5 rotate-45 bg-bamboo-accent/60" />
          </div>
          <div class="w-16 h-px bg-gradient-to-l from-transparent to-pattern-border-warm" />
        </div>
        <!-- 描述段落 -->
        <p class="max-w-2xl mx-auto text-sm md:text-base leading-7 text-pattern-text/80 tracking-wide">
          汇集中国传统剪纸纹样精华，涵盖动物、植物、人物、神话等十大类别，跨越先秦至现代数千年历史，为您呈现中华纹样艺术的数字宝库。
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pattern-border-warm to-transparent" />
    </section>

    <section class="max-w-[1320px] mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 rounded-2xl border border-pattern-border bg-pattern-bg/80 backdrop-blur shadow-inner p-4 mb-8 relative">
        <div class="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-bamboo-light/60 via-bamboo-accent/30 to-transparent" />
        <input
          v-model="keyword"
          type="text"
          placeholder="关键词 / 编码"
          class="xl:col-span-2 h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink placeholder:text-pattern-placeholder focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        />
        <select
          v-model="mainCategory"
          class="h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        >
          <option v-for="opt in mainCategoryOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
        <select
          v-model="style"
          class="h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        >
          <option v-for="opt in styleOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
        <select
          v-model="region"
          class="h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        >
          <option v-for="opt in regionOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
        <select
          v-model="period"
          class="h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        >
          <option v-for="opt in periodOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>

        <div class="xl:col-span-6 flex flex-wrap items-center gap-3 pt-1">
          <button
            @click="applySearch"
            class="btn-shimmer inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-bamboo-light text-pattern-cta-text text-xs font-bold tracking-[0.15em] hover:bg-bamboo-accent transition-colors overflow-hidden relative"
          >
            <PhMagnifyingGlass class="w-4 h-4" />
            查询
          </button>
          <button
            @click="resetFilters"
            class="px-5 h-10 rounded-xl border border-pattern-border-strong text-pattern-button-text text-xs font-bold tracking-[0.15em] hover:bg-pattern-hover transition-colors"
          >
            重置
          </button>
          <span class="text-xs text-pattern-subtle">共 {{ totalElements }} 条</span>
        </div>
      </div>

      <div v-if="loading" class="h-40 rounded-2xl border border-pattern-border bg-pattern-loading flex items-center justify-center text-pattern-muted gap-2">
        <PhSpinner class="w-4 h-4 animate-spin" />
        加载中...
      </div>

      <div v-else-if="errorMessage" class="h-40 rounded-2xl border border-pattern-error-border bg-pattern-error-bg flex items-center justify-center text-pattern-error-text">
        {{ errorMessage }}
      </div>

      <div v-else-if="!hasData" class="h-40 rounded-2xl border border-pattern-border bg-pattern-loading flex items-center justify-center text-pattern-muted">
        当前条件下暂无纹样数据
      </div>

      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <article
          v-for="item in patterns"
          :key="item.id"
          class="pattern-card rounded-2xl border border-pattern-border bg-pattern-card overflow-hidden transition-all duration-300 ease-out"
        >
          <div class="pattern-card-image aspect-[4/3] bg-pattern-media flex items-center justify-center relative overflow-hidden">
            <img v-if="item.imageUrl" v-protect-image :src="item.imageUrl" :alt="item.patternCode" class="w-full h-full object-cover transition-[filter] duration-300" />
            <div v-else class="text-xs text-pattern-empty">暂无图片</div>
          </div>

          <div class="p-4 space-y-3">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-sm font-bold text-pattern-ink-alt truncate border-l-2 border-bamboo-accent pl-3">{{ item.patternCode || '未命名编码' }}</h3>
              <button
                @click="openDetail(item.patternCode)"
                class="text-[11px] px-3 h-7 rounded-lg border border-pattern-border-warm text-pattern-button-accent hover:bg-pattern-hover-soft transition-colors whitespace-nowrap flex-shrink-0"
              >
                详情
              </button>
            </div>

            <p class="text-xs leading-5 text-hex-8d7a5f line-clamp-3">{{ item.description }}</p>

            <div class="flex flex-wrap gap-2 text-[10px] text-pattern-label">
              <span v-if="item.mainCategory" class="px-2 py-1 rounded-md bg-white/40 border-l-[3px] border-bamboo-light">{{ item.mainCategory }}</span>
              <span v-if="item.style" class="px-2 py-1 rounded-md bg-white/40 border-l-[3px] border-pattern-ring">{{ item.style }}</span>
              <span v-if="item.region" class="px-2 py-1 rounded-md bg-white/40 border-l-[3px] border-pattern-placeholder">{{ item.region }}</span>
              <span v-if="item.period" class="px-2 py-1 rounded-md bg-white/40 border-l-[3px] border-pattern-label">{{ item.period }}</span>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-8 flex items-center justify-center gap-4">
        <button
          :disabled="!canPrev || loading"
          @click="goPrev"
          class="px-4 h-9 rounded-lg border border-pattern-border-strong text-xs font-bold tracking-[0.12em] text-pattern-button-text disabled:opacity-40"
        >
          上一页
        </button>

        <span class="text-xs text-pattern-subtle">
          第 {{ totalPages ? page + 1 : 0 }} / {{ totalPages || 0 }} 页
        </span>

        <button
          :disabled="!canNext || loading"
          @click="goNext"
          class="px-4 h-9 rounded-lg border border-pattern-border-strong text-xs font-bold tracking-[0.12em] text-pattern-button-text disabled:opacity-40"
        >
          下一页
        </button>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="detail-overlay">
        <div
          v-if="showDetail"
          class="fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px]"
          @click.self="closeDetail"
        />
      </Transition>

      <Transition name="detail-panel">
        <div
          v-if="showDetail"
          class="fixed right-0 top-0 bottom-0 z-[71] w-full max-w-lg bg-pattern-modal border-l border-pattern-border shadow-2xl overflow-y-auto"
        >
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
            <div class="h-px bg-gradient-to-r from-bamboo-light/40 via-pattern-border-warm to-transparent" />
          </div>

          <div class="p-6 md:p-8 space-y-6">
            <div v-if="detailError" class="rounded-xl border border-pattern-error-border bg-pattern-error-bg text-pattern-error-text text-sm px-4 py-3">
              {{ detailError }}
            </div>

            <div v-if="loadingDetail" class="h-32 rounded-xl border border-pattern-border bg-pattern-loading flex items-center justify-center text-pattern-muted gap-2">
              <PhSpinner class="w-4 h-4 animate-spin" />
              加载详情中...
            </div>

            <template v-else>
              <div
                v-if="activeDetail?.image"
                class="relative cursor-zoom-in overflow-hidden rounded-xl border border-pattern-border bg-white/50"
                :class="{ 'cursor-zoom-out': imageZoomed }"
                @click="imageZoomed = !imageZoomed"
              >
                <img
                  v-protect-image
                  :src="activeDetail.image"
                  :alt="activeDetail.title"
                  class="w-full max-h-[480px] object-contain transition-transform duration-300 ease-out"
                  :class="{ 'scale-150': imageZoomed }"
                />
              </div>

              <p class="text-sm leading-7 text-pattern-text">{{ activeDetail?.desc || '暂无描述' }}</p>

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
  </main>
</template>

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

.hero-section {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(213,194,162,0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 30%, rgba(182,168,143,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(150,173,146,0.08) 0%, transparent 40%),
    linear-gradient(180deg, #f9f3e8 0%, #f4ebdc 50%, #f9f3e8 100%);
}

.hero-texture {
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 39px,
      rgba(213,194,162,0.08) 39px,
      rgba(213,194,162,0.08) 40px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 39px,
      rgba(213,194,162,0.06) 39px,
      rgba(213,194,162,0.06) 40px
    );
}

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

.detail-overlay-enter-active,
.detail-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.detail-overlay-enter-from,
.detail-overlay-leave-to {
  opacity: 0;
}

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
</style>
