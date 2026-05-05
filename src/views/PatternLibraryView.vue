<script setup>
import { computed, onMounted, ref } from 'vue'
import { PhArrowSquareOut, PhMagnifyingGlass, PhSpinner } from '@phosphor-icons/vue'
import {
  searchOpenPatterns,
  getOpenPatternDetailByCode,
  getOpenPatternTableUrl,
} from '@/api/patterns.js'
import SectionHero from '@/components/SectionHero.vue'

const loading = ref(false)
const loadingDetail = ref(false)
const errorMessage = ref('')
const detailError = ref('')

const keyword = ref('')
const mainCategory = ref('')
const style = ref('')
const region = ref('')
const period = ref('')

const page = ref(0)
const size = ref(12)

const totalPages = ref(0)
const totalElements = ref(0)
const patterns = ref([])

const showDetail = ref(false)
const activeDetail = ref(null)

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
  <main class="pt-28 pb-20">
    <SectionHero
      title="在线纹样库"
      subtitle="搜索、筛选、分页、详情一体化"
      description="保留现有查询参数与详情弹窗流程。"
    />

    <section class="max-w-[1320px] mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 rounded-2xl border border-pattern-border bg-pattern-bg/80 backdrop-blur p-4 mb-8">
        <input
          v-model="keyword"
          type="text"
          placeholder="关键词 / 编码"
          class="xl:col-span-2 h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink placeholder:text-pattern-placeholder focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        />
        <input
          v-model="mainCategory"
          type="text"
          placeholder="主分类"
          class="h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink placeholder:text-pattern-placeholder focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        />
        <input
          v-model="style"
          type="text"
          placeholder="风格"
          class="h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink placeholder:text-pattern-placeholder focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        />
        <input
          v-model="region"
          type="text"
          placeholder="地区"
          class="h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink placeholder:text-pattern-placeholder focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        />
        <input
          v-model="period"
          type="text"
          placeholder="时期"
          class="h-11 px-4 rounded-xl border border-pattern-border bg-white/80 text-sm text-pattern-ink placeholder:text-pattern-placeholder focus:outline-none focus:ring-2 focus:ring-pattern-ring"
        />

        <div class="xl:col-span-6 flex flex-wrap items-center gap-3 pt-1">
          <button
            @click="applySearch"
            class="inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-bamboo-light text-pattern-cta-text text-xs font-bold tracking-[0.15em] hover:bg-bamboo-accent transition-colors"
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
          class="rounded-2xl border border-pattern-border bg-pattern-card overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div class="aspect-[4/3] bg-pattern-media flex items-center justify-center">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.patternCode" class="w-full h-full object-cover" />
            <div v-else class="text-xs text-pattern-empty">暂无图片</div>
          </div>

          <div class="p-4 space-y-3">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-sm font-bold text-pattern-ink-alt truncate">{{ item.patternCode || '未命名编码' }}</h3>
              <button
                @click="openDetail(item.patternCode)"
                class="text-[11px] px-3 h-7 rounded-lg border border-pattern-border-warm text-pattern-button-accent hover:bg-pattern-hover-soft transition-colors"
              >
                详情
              </button>
            </div>

            <p class="text-xs leading-5 text-hex-8d7a5f line-clamp-3">{{ item.description }}</p>

            <div class="flex flex-wrap gap-2 text-[10px] text-pattern-label">
              <span v-if="item.mainCategory" class="px-2 py-1 rounded-full bg-pattern-tag">{{ item.mainCategory }}</span>
              <span v-if="item.style" class="px-2 py-1 rounded-full bg-pattern-tag">{{ item.style }}</span>
              <span v-if="item.region" class="px-2 py-1 rounded-full bg-pattern-tag">{{ item.region }}</span>
              <span v-if="item.period" class="px-2 py-1 rounded-full bg-pattern-tag">{{ item.period }}</span>
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
      <div
        v-if="showDetail"
        class="fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px] p-4 flex items-center justify-center"
        @click.self="showDetail = false"
      >
        <div class="w-full max-w-3xl max-h-[85vh] overflow-auto rounded-2xl bg-pattern-modal border border-pattern-border shadow-2xl">
          <div class="p-6 md:p-8 border-b border-pattern-divider flex items-start justify-between gap-4">
            <div>
              <h2 class="text-2xl font-bold text-pattern-ink">{{ activeDetail?.title || '纹样详情' }}</h2>
              <p class="mt-2 text-xs text-pattern-subtle-alt">编码：{{ activeDetail?.patternCode }}</p>
            </div>
            <button class="text-pattern-aux hover:text-pattern-ink" @click="showDetail = false">关闭</button>
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
              <img
                v-if="activeDetail?.image"
                :src="activeDetail.image"
                :alt="activeDetail.title"
                class="w-full max-h-[480px] object-contain rounded-xl border border-pattern-border bg-white/50"
              />

              <p class="text-sm leading-7 text-pattern-text">{{ activeDetail?.desc || '暂无描述' }}</p>

              <div v-if="activeDetail?.story?.length" class="space-y-3">
                <h3 class="text-sm font-bold text-pattern-ink-alt tracking-[0.12em]">故事内容</h3>
                <p v-for="(paragraph, index) in activeDetail.story" :key="index" class="text-sm leading-7 text-pattern-text-soft">
                  {{ paragraph }}
                </p>
              </div>

              <a
                v-if="tableUrl"
                :href="tableUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 h-10 rounded-xl border border-pattern-border-mid text-xs font-bold tracking-[0.15em] text-pattern-button-text-strong hover:bg-pattern-link-hover"
              >
                打开网页信息页
                <PhArrowSquareOut class="w-4 h-4" />
              </a>
            </template>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>
