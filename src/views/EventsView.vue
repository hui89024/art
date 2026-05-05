<script setup>
import { onMounted, ref } from 'vue'
import { PhArrowUp, PhCalendar } from '@phosphor-icons/vue'
import { getEvents } from '@/api/events.js'
import EventModal from '@/components/EventModal.vue'
import EventCarousel from '@/components/EventCarousel.vue'

const loading = ref(true)
const error = ref('')
const events = ref([])
const showModal = ref(false)
const selectedEvent = ref(null)

const openEventModal = (event) => {
  selectedEvent.value = event
  showModal.value = true
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

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
    <section class="relative pt-32 pb-20 px-6 overflow-hidden">
      <!-- 装饰性书法背景字 -->
      <div class="hero-bg-chars" aria-hidden="true">
        <span class="hero-bg-char hero-bg-char--left">剪</span>
        <span class="hero-bg-char hero-bg-char--right">艺</span>
      </div>

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <!-- 主标题 -->
        <h1 class="hero-title mb-5">
          特色活动
        </h1>

        <!-- 朱红装饰线 -->
        <div class="hero-divider">
          <span class="hero-divider-dot"></span>
        </div>

        <!-- 副标题 -->
        <p class="hero-subtitle mb-6">
          时间叙事与现场体验
        </p>

        <!-- 意境文案 -->
        <p class="hero-desc">
          每一场活动，都是剪纸艺术与当代生活的对话。<br class="hidden md:inline" />
          从指尖非遗到数字展陈，邀您共赴一场跨越时空的纸上传奇。
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
        <!-- 轮播大图 -->
        <div class="carousel-frame">
          <EventCarousel
            :events="events"
            @select="openEventModal"
          />
        </div>

        <!-- 活动简介 -->
        <div class="py-8">
          <h2 class="font-serif text-2xl md:text-3xl font-bold text-slate-800">更多活动</h2>
        </div>

        <!-- Event Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <article
            v-for="(event, index) in events"
            :key="event.id || `grid-${index}`"
            class="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            @click="openEventModal(event)"
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
                <PhCalendar class="w-12 h-12 text-slate-400" />
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

    <!-- 活动详情弹窗 -->
    <EventModal
      v-model:visible="showModal"
      :event="selectedEvent"
    />

    <!-- Scroll to Top Button -->
    <button
      type="button"
      class="fixed right-6 bottom-6 glass-button w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-label="返回顶部"
      @click="scrollToTop"
    >
      <PhArrowUp class="w-5 h-5" />
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

/* ========== Carousel Frame ========== */
.carousel-frame {
  border: 2px solid rgba(220, 38, 38, 0.15);
  border-radius: 16px;
  padding: 6px;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.03), rgba(217, 119, 6, 0.03));
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
}

/* ========== Hero Section ========== */

/* 装饰性背景大字 */
.hero-bg-chars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-bg-char {
  position: absolute;
  font-family: 'Noto Serif SC', 'Noto Serif TC', serif;
  font-weight: 900;
  font-size: clamp(180px, 25vw, 320px);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(220, 38, 38, 0.06);
  user-select: none;
}

.hero-bg-char--left {
  left: -5%;
  top: -10%;
  transform: rotate(-12deg);
  animation: hero-char-float 8s ease-in-out infinite alternate;
}

.hero-bg-char--right {
  right: -5%;
  bottom: -15%;
  transform: rotate(8deg);
  animation: hero-char-float 8s ease-in-out infinite alternate-reverse;
}

@keyframes hero-char-float {
  from { transform: rotate(-12deg) translateY(0); }
  to { transform: rotate(-12deg) translateY(-12px); }
}

/* 主标题渐变 */
.hero-title {
  font-family: 'Noto Serif SC', 'Noto Serif TC', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.2;
  background: linear-gradient(135deg, #1e293b 0%, #334155 40%, #DC2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 朱红装饰线 */
.hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.hero-divider::before,
.hero-divider::after {
  content: '';
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.4));
}

.hero-divider::after {
  background: linear-gradient(90deg, rgba(220, 38, 38, 0.4), transparent);
}

.hero-divider-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #DC2626;
  box-shadow: 0 0 8px rgba(220, 38, 38, 0.3);
}

/* 副标题 */
.hero-subtitle {
  font-family: 'Noto Serif SC', 'Noto Serif TC', serif;
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  font-weight: 500;
  color: #475569;
  letter-spacing: 0.15em;
}

/* 意境文案 */
.hero-desc {
  font-size: 15px;
  color: #64748b;
  line-height: 2;
  max-width: 480px;
  margin: 0 auto;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .glass-card {
    @apply rounded-xl;
  }

  .hero-bg-char {
    font-size: 140px;
    -webkit-text-stroke-width: 0.5px;
  }

  .hero-bg-char--left {
    left: -15%;
    top: -5%;
  }

  .hero-bg-char--right {
    right: -15%;
    bottom: -10%;
  }

  .hero-desc br {
    display: none;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .hero-bg-char {
    animation: none !important;
  }
}
</style>
