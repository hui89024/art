<script setup>
import { onMounted, ref, watch } from 'vue'
import { ArrowUp, Building, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { getEvents } from '@/api/events.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { DURATION, STAGGER_DELAY } from '@/composables/anime.config.js'

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

const normalizeIndex = (index) => {
  const total = events.value.length
  if (!total) return 0
  return (index % total + total) % total
}

const goToIndex = (index) => {
  activeIndex.value = normalizeIndex(index)
}

const nextEvent = () => {
  if (!events.value.length) return
  goToIndex(activeIndex.value + 1)
}

const prevEvent = () => {
  if (!events.value.length) return
  goToIndex(activeIndex.value - 1)
}

const getRelativeOffset = (index) => {
  const total = events.value.length
  if (!total) return 0

  let diff = index - activeIndex.value
  const half = Math.floor(total / 2)

  if (diff > half) diff -= total
  if (diff < -half) diff += total

  return diff
}

const getCardStyle = (index) => {
  const offset = getRelativeOffset(index)
  const absOffset = Math.abs(offset)
  const direction = Math.sign(offset)

  if (absOffset > 1) {
    return {
      opacity: 0,
      zIndex: 1,
      transform: `translate(-50%, -50%) translateX(${direction * 52}%) scale(0.74)`,
      pointerEvents: 'none',
    }
  }

  const translateX = absOffset === 0 ? 0 : direction * 36
  const translateY = absOffset === 0 ? 0 : 10
  const scale = absOffset === 0 ? 1 : 0.82
  const opacity = absOffset === 0 ? 1 : 0.62

  return {
    opacity,
    zIndex: absOffset === 0 ? 40 : 30,
    transform: `translate(-50%, -50%) translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`,
    pointerEvents: 'auto',
  }
}

const safeDate = (eventItem, index) => {
  const normalized = eventItem?.publishTime ? new Date(eventItem.publishTime) : null
  if (normalized && !Number.isNaN(normalized.getTime())) return normalized

  const fallback = new Date()
  fallback.setDate(fallback.getDate() - index * 2)
  return fallback
}

const getDay = (eventItem, index) => `${safeDate(eventItem, index).getDate()}`.padStart(2, '0')

const getYearMonth = (eventItem, index) => {
  const date = safeDate(eventItem, index)
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  return `${year}.${month}`
}

const handleCardClick = (eventItem, index) => {
  if (index !== activeIndex.value) {
    goToIndex(index)
    return
  }

  if (eventItem?.url) {
    openEventLink(eventItem.url)
  }
}

const handleCardKeydown = (event, eventItem, index) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  handleCardClick(eventItem, index)
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

const headerRef = ref(null)
const cardsRef = ref(null)
const { reveal } = useScrollReveal()

onMounted(() => {
  loadEvents()
  if (headerRef.value) {
    reveal(headerRef, { duration: DURATION.slow, threshold: 0.2 })
  }
})

watch(loading, (val) => {
  if (!val && cardsRef.value) {
    reveal(cardsRef, {
      effect: 'stagger',
      duration: DURATION.base,
      delay: STAGGER_DELAY,
      threshold: 0.1,
      once: true,
    })
  }
})
</script>

<template>
  <main class="pt-32 pb-24 min-h-screen bg-transparent flex flex-col relative overflow-hidden font-sans">
    <div class="w-full max-w-[1180px] mx-auto px-6 lg:px-10">
      <header ref="headerRef" class="flex items-center justify-between mb-12">
        <div class="flex items-center gap-3">
          <Building class="w-6 h-6 text-bamboo-base" />
          <div class="flex items-baseline gap-2">
            <h1 class="text-2xl md:text-3xl font-bold tracking-wide text-ink-base">特色活动</h1>
            <span class="text-sm text-bamboo-muted tracking-wider">/ Featured activities</span>
          </div>
        </div>
        <button
          type="button"
          class="flex items-center gap-1 text-sm text-bamboo-base hover:text-ink-base transition-colors tracking-wide group"
        >
          查看更多
          <ChevronRight class="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </header>

      <div
        v-if="loading"
        class="rounded-xl border border-line-soft bg-paper-soft px-6 py-8 text-sm text-stone-text"
      >
        正在加载活动内容...
      </div>

      <div
        v-else-if="error"
        class="rounded-xl border border-line-rose bg-rose-soft px-6 py-8 text-sm text-rose-text"
      >
        {{ error }}
      </div>

      <div
        v-else-if="!events.length"
        class="rounded-xl border border-line-soft bg-paper-soft px-6 py-8 text-sm text-stone-text"
      >
        暂无活动内容。
      </div>

      <section v-else ref="cardsRef" class="carousel-shell">
        <div class="carousel-stage" aria-label="特色活动轮播">
          <div class="carousel-stack" role="region" aria-live="polite">
            <article
              v-for="(eventItem, index) in events"
              :key="eventItem.id || `event-${index + 1}`"
              class="event-card"
              :class="{ 'is-active': index === activeIndex, 'is-clickable': !!eventItem.url }"
              :style="getCardStyle(index)"
              :tabindex="index === activeIndex && eventItem.url ? 0 : -1"
              :aria-label="eventItem.url ? `查看活动：${eventItem.title}` : eventItem.title"
              @click="handleCardClick(eventItem, index)"
              @keydown="handleCardKeydown($event, eventItem, index)"
            >
              <div class="event-card__media">
                <img
                  v-if="eventItem.image"
                  :src="eventItem.image"
                  :alt="eventItem.title"
                  loading="lazy"
                />
                <div
                  v-else
                  class="w-full h-full bg-paper-muted flex items-center justify-center text-bamboo-muted text-sm"
                >
                  暂无图片
                </div>
              </div>

              <div class="event-card__footer">
                <h2 class="event-card__title">{{ eventItem.title }}</h2>
                <a
                  v-if="eventItem.url"
                  class="event-card__link"
                  :href="eventItem.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop
                >
                  查看详情
                </a>
              </div>

              <div class="event-card__date">
                <p class="event-card__day">{{ getDay(eventItem, index) }}</p>
                <p class="event-card__year-month">{{ getYearMonth(eventItem, index) }}</p>
              </div>
            </article>
          </div>
        </div>

        <div class="carousel-controls">
          <button
            type="button"
            class="carousel-nav"
            aria-label="上一条活动"
            @click="prevEvent"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <div class="carousel-indicators" aria-label="轮播指示器">
            <button
              v-for="(eventItem, index) in events"
              :key="`indicator-${eventItem.id || index}`"
              type="button"
              class="carousel-indicator"
              :class="{ 'is-active': index === activeIndex }"
              :aria-label="`切换到第 ${index + 1} 条活动`"
              @click="goToIndex(index)"
            >
              <span class="sr-only">第 {{ index + 1 }} 条</span>
            </button>
          </div>

          <button
            type="button"
            class="carousel-nav"
            aria-label="下一条活动"
            @click="nextEvent"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>

    <button type="button" class="to-top" @click="scrollToTop">
      <ArrowUp class="w-4 h-4" />
      TOP
    </button>
  </main>
</template>

<style scoped>
.carousel-shell {
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(123, 95, 66, 0.24);
  background:
    radial-gradient(circle at 16% 22%, rgba(255, 250, 241, 0.86), transparent 40%),
    radial-gradient(circle at 82% 76%, rgba(245, 226, 195, 0.48), transparent 43%),
    linear-gradient(140deg, rgba(248, 236, 217, 0.9), rgba(241, 226, 201, 0.78));
  box-shadow: 0 26px 40px rgba(90, 66, 45, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.72);
  overflow: hidden;
  padding: 1.2rem 1rem 1.35rem;
}

.carousel-stage {
  position: relative;
  min-height: clamp(300px, 34vw, 430px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-stack {
  position: relative;
  width: 100%;
  height: clamp(280px, 32vw, 390px);
}

.event-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(100%, clamp(260px, 52vw, 660px));
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  border: 1px solid rgba(90, 68, 49, 0.22);
  background: linear-gradient(145deg, #f8ecd9, #f4e4cd);
  box-shadow: 0 16px 34px rgba(87, 62, 42, 0.14);
  overflow: hidden;
  transform-origin: center;
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 360ms ease;
  cursor: pointer;
}

.event-card.is-active {
  border-color: rgba(95, 73, 55, 0.45);
  box-shadow: 0 24px 42px rgba(83, 60, 40, 0.2);
}

.event-card__media {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.event-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.event-card.is-active .event-card__media img {
  transform: scale(1.03);
}

.event-card__footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 1.05rem 1.15rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.42rem;
  background: linear-gradient(to top, rgba(248, 236, 217, 0.96) 0%, rgba(248, 236, 217, 0.82) 56%, transparent 100%);
}

.event-card__title {
  color: #3f2f22;
  font-size: clamp(0.86rem, 1.05vw, 1.05rem);
  line-height: 1.45;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-card__link {
  font-size: 0.74rem;
  color: #8a6d4f;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.event-card__link:hover {
  color: #5a4431;
}

.event-card__date {
  position: absolute;
  z-index: 3;
  right: 0.72rem;
  top: 0.72rem;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: 1px solid rgba(123, 95, 66, 0.34);
  background: rgba(255, 246, 232, 0.93);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 18px rgba(90, 67, 45, 0.12);
}

.event-card__day {
  font-size: 1rem;
  line-height: 1;
  color: #543f2b;
  font-weight: 700;
}

.event-card__year-month {
  margin-top: 0.14rem;
  font-size: 0.52rem;
  letter-spacing: 0.09em;
  color: #6b533d;
}

.carousel-controls {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.95rem;
}

.carousel-nav {
  z-index: 55;
  width: 2.45rem;
  height: 2.45rem;
  border-radius: 999px;
  border: 1px solid rgba(95, 73, 55, 0.34);
  background: rgba(255, 249, 240, 0.92);
  color: #5a4431;
  box-shadow: 0 10px 24px rgba(88, 63, 43, 0.16);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.24s ease, border-color 0.24s ease, background-color 0.24s ease;
}

.carousel-nav:hover {
  transform: scale(1.06);
  border-color: rgba(95, 73, 55, 0.52);
  background: rgba(255, 249, 240, 0.98);
}

.carousel-indicators {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.carousel-indicator {
  width: 0.58rem;
  height: 0.58rem;
  background: rgba(122, 95, 69, 0.38);
  border: 1px solid transparent;
  transform: rotate(45deg);
  transition: all 0.24s ease;
}

.carousel-indicator:hover {
  background: rgba(95, 73, 55, 0.58);
}

.carousel-indicator.is-active {
  background: #5a4431;
  border-color: rgba(255, 243, 224, 0.72);
  box-shadow: 0 0 0 3px rgba(90, 68, 49, 0.16);
}

.to-top {
  position: fixed;
  right: 1.7rem;
  bottom: 1.8rem;
  z-index: 50;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1px solid rgba(95, 73, 55, 0.32);
  background: rgba(255, 251, 244, 0.9);
  color: #5a4431;
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.08rem;
  transition: all 0.24s ease;
  cursor: pointer;
}

.to-top:hover {
  transform: translateY(-2px);
  border-color: rgba(95, 73, 55, 0.55);
}

@media (max-width: 1024px) {
  .carousel-nav {
    width: 2.3rem;
    height: 2.3rem;
  }

  .carousel-controls {
    gap: 0.78rem;
  }
}

@media (max-width: 768px) {
  .carousel-shell {
    padding: 0.9rem 0.6rem 1.05rem;
  }

  .carousel-stage {
    min-height: 268px;
  }

  .carousel-stack {
    height: 250px;
  }

  .event-card {
    width: min(100%, 91vw);
    border-radius: 14px;
  }

  .event-card__footer {
    padding: 0.86rem 0.9rem;
  }

  .carousel-nav {
    width: 2.1rem;
    height: 2.1rem;
  }

  .to-top {
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
