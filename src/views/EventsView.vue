<script setup>
import { onMounted, ref, computed } from 'vue'
import { ArrowUp, Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { getEvents } from '@/api/events.js'

const loading = ref(true)
const error = ref('')
const events = ref([])
const activeIndex = ref(0)

const openEventLink = (url) => {
  if (!url) return
  window.open(url, '_blank', 'noopener,noreferrer')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToIndex = (index) => {
  if (index < 0 || index >= events.value.length) return
  activeIndex.value = index
}

const nextEvent = () => {
  if (activeIndex.value < events.value.length - 1) {
    activeIndex.value++
  }
}

const prevEvent = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--
  }
}

const activeEvent = computed(() => events.value[activeIndex.value] || null)

const formatDate = (dateString) => {
  if (!dateString) return { day: '--', month: '--', year: '----' }
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return { day: '--', month: '--', year: '----' }

  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('zh-CN', { month: 'short' }),
    year: date.getFullYear()
  }
}

const loadEvents = async () => {
  loading.value = true
  error.value = ''

  try {
    const list = await getEvents()
    events.value = Array.isArray(list) ? list : []
    activeIndex.value = 0
  } catch (e) {
    events.value = []
    error.value = '活动内容加载失败，请稍后重试。'
    console.warn('加载活动列表失败:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadEvents()
})
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-16 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200/50 text-blue-600 text-sm font-medium mb-6">
          <Calendar class="w-4 h-4" />
          <span>Featured Events</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          特色活动
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto">
          时间叙事与现场体验
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="relative max-w-7xl mx-auto px-6 pb-24">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="glass-card p-8 text-center"
      >
        <div class="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p class="text-slate-600">正在加载活动内容...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="glass-card p-8 text-center border-red-200/50"
      >
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!events.length"
        class="glass-card p-8 text-center"
      >
        <p class="text-slate-600">暂无活动内容。</p>
      </div>

      <!-- Events Display -->
      <div v-else class="space-y-8">
        <!-- Featured Event Card -->
        <article
          v-if="activeEvent"
          class="glass-card overflow-hidden group cursor-pointer"
          @click="activeEvent.url && openEventLink(activeEvent.url)"
        >
          <div class="grid md:grid-cols-2 gap-0">
            <!-- Image -->
            <div class="relative aspect-video md:aspect-auto overflow-hidden">
              <img
                v-if="activeEvent.image"
                :src="activeEvent.image"
                :alt="activeEvent.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
              >
                <Calendar class="w-16 h-16 text-slate-400" />
              </div>

              <!-- Date Badge -->
              <div class="absolute top-4 right-4 glass-badge">
                <div class="text-2xl font-bold text-slate-900">
                  {{ formatDate(activeEvent.publishTime).day }}
                </div>
                <div class="text-xs text-slate-600 uppercase">
                  {{ formatDate(activeEvent.publishTime).month }}
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-8 md:p-12 flex flex-col justify-center">
              <div class="text-sm text-blue-600 font-medium mb-3">
                {{ formatDate(activeEvent.publishTime).year }}
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {{ activeEvent.title }}
              </h2>
              <p v-if="activeEvent.desc" class="text-slate-600 mb-6 line-clamp-3">
                {{ activeEvent.desc }}
              </p>
              <a
                v-if="activeEvent.url"
                :href="activeEvent.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group/link"
                @click.stop
              >
                <span>查看详情</span>
                <ExternalLink class="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
        </article>

        <!-- Navigation Controls -->
        <div class="flex items-center justify-center gap-4">
          <button
            type="button"
            class="glass-button"
            :disabled="activeIndex === 0"
            :class="{ 'opacity-50 cursor-not-allowed': activeIndex === 0 }"
            aria-label="上一条活动"
            @click="prevEvent"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <!-- Indicators -->
          <div class="flex items-center gap-2" role="tablist" aria-label="活动列表">
            <button
              v-for="(event, index) in events"
              :key="event.id || `event-${index}`"
              type="button"
              role="tab"
              :aria-selected="index === activeIndex"
              :aria-label="`切换到活动 ${index + 1}`"
              class="indicator"
              :class="{ 'is-active': index === activeIndex }"
              @click="goToIndex(index)"
            >
              <span class="sr-only">活动 {{ index + 1 }}</span>
            </button>
          </div>

          <button
            type="button"
            class="glass-button"
            :disabled="activeIndex === events.length - 1"
            :class="{ 'opacity-50 cursor-not-allowed': activeIndex === events.length - 1 }"
            aria-label="下一条活动"
            @click="nextEvent"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>

        <!-- Event Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <article
            v-for="(event, index) in events"
            :key="event.id || `grid-${index}`"
            class="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            @click="goToIndex(index)"
          >
            <div class="relative aspect-video overflow-hidden">
              <img
                v-if="event.image"
                :src="event.image"
                :alt="event.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
              >
                <Calendar class="w-12 h-12 text-slate-400" />
              </div>
            </div>
            <div class="p-6">
              <div class="text-xs text-blue-600 font-medium mb-2">
                {{ formatDate(event.publishTime).day }} {{ formatDate(event.publishTime).month }} {{ formatDate(event.publishTime).year }}
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                {{ event.title }}
              </h3>
              <p v-if="event.desc" class="text-sm text-slate-600 line-clamp-2">
                {{ event.desc }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Scroll to Top Button -->
    <button
      type="button"
      class="fixed right-6 bottom-6 glass-button w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-label="返回顶部"
      @click="scrollToTop"
    >
      <ArrowUp class="w-5 h-5" />
    </button>
  </main>
</template>

<style scoped>
/* Glassmorphism Components */
.glass-card {
  @apply bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.glass-badge {
  @apply bg-white/80 backdrop-blur-md border border-white/50 rounded-xl px-4 py-2 text-center shadow-lg;
}

.glass-button {
  @apply bg-white/60 backdrop-blur-md border border-white/50 rounded-full p-3 text-slate-700 hover:bg-white/80 hover:text-slate-900 transition-all duration-200 shadow-md hover:shadow-lg;
}

/* Indicators */
.indicator {
  @apply w-2 h-2 rounded-full bg-slate-300 transition-all duration-200 hover:bg-slate-400;
}

.indicator.is-active {
  @apply w-8 bg-blue-600;
}

/* Utilities */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .glass-card {
    @apply rounded-xl;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
