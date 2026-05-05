<template>
  <div
    class="event-carousel"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <!-- 全宽大图：首尾各克隆一张实现无缝 -->
    <div class="carousel-track" :style="trackStyle" @transitionend="onTransitionEnd">
      <div
        v-for="(event, index) in slides"
        :key="event.id || index"
        class="carousel-slide"
      >
        <img
          v-if="event.image"
          v-protect-image
          :src="event.image"
          :alt="event.title"
          class="carousel-image"
          loading="lazy"
        />
        <div v-else class="carousel-placeholder">
          <PhCalendar class="w-20 h-20 text-stone-400" />
        </div>
      </div>
    </div>

    <!-- 左右箭头 -->
    <button
      v-if="events.length > 1"
      class="carousel-arrow carousel-arrow--left"
      @click.stop="prev"
      aria-label="上一个"
    >
      <PhCaretLeft class="w-5 h-5" />
    </button>
    <button
      v-if="events.length > 1"
      class="carousel-arrow carousel-arrow--right"
      @click.stop="next"
      aria-label="下一个"
    >
      <PhCaretRight class="w-5 h-5" />
    </button>

    <!-- 右上角印章序号 -->
    <div class="carousel-seal" v-if="events.length > 1">
      <span class="carousel-seal-num">{{ chineseNum }}</span>
      <span class="carousel-seal-sep">／</span>
      <span class="carousel-seal-total">{{ chineseTotal }}</span>
    </div>

    <!-- 底部信息叠加层 -->
    <div class="carousel-overlay">
      <div class="carousel-content" :key="realIndex">
        <!-- 日期 -->
        <div class="carousel-date" v-if="formattedDate">
          <span>{{ formattedDate }}</span>
        </div>

        <!-- 朱红装饰线 -->
        <div class="carousel-divider"></div>

        <!-- 标题 -->
        <h2 class="carousel-title">{{ activeEvent?.title }}</h2>

        <!-- 描述 -->
        <p v-if="activeEvent?.desc" class="carousel-desc">{{ activeEvent.desc }}</p>

        <!-- 操作 -->
        <div class="carousel-actions">
          <button class="carousel-btn" @click.stop="$emit('select', activeEvent)">
            <span>了解详情</span>
            <PhArrowRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- 底部控制栏 -->
      <div class="carousel-controls" v-if="events.length > 1">
        <!-- 指示点 -->
        <div class="carousel-dots">
          <button
            v-for="(_, index) in events"
            :key="index"
            class="carousel-dot"
            :class="{ 'is-active': index === realIndex }"
            @click.stop="goTo(index)"
            :aria-label="`第 ${index + 1} 个活动`"
          ></button>
        </div>

        <!-- 计数 -->
        <div class="carousel-counter">
          {{ String(realIndex + 1).padStart(2, '0') }} / {{ String(events.length).padStart(2, '0') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { PhCalendar, PhArrowRight, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

const props = defineProps({
  events: { type: Array, default: () => [] },
  interval: { type: Number, default: 6000 }
})

defineEmits(['select'])

// 当前 slide 索引（含首尾克隆，0 = 尾部克隆，1 = 真实第一张，N = 真实最后一张，N+1 = 首部克隆）
const currentIndex = ref(1)
let autoTimer = null
let jumpTimer = null
let paused = false
const jumping = ref(false)

const TRANSITION_MS = 820 // 与 CSS transition 0.8s 一致，留 20ms 余量

const chineseNums = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾']

// 首尾各克隆一张
const slides = computed(() => {
  const list = props.events
  if (list.length <= 1) return list
  return [list[list.length - 1], ...list, list[0]]
})

// 真实索引（用于显示内容、指示点、计数）
const realIndex = computed(() => {
  const len = props.events.length
  if (!len) return 0
  const idx = currentIndex.value - 1
  return ((idx % len) + len) % len
})

const activeEvent = computed(() => props.events[realIndex.value] || null)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
  transition: jumping.value ? 'none' : undefined
}))

const chineseNum = computed(() => chineseNums[realIndex.value] || String(realIndex.value + 1))
const chineseTotal = computed(() => chineseNums[props.events.length - 1] || String(props.events.length))

const formattedDate = computed(() => {
  if (!activeEvent.value?.publishTime) return ''
  const date = new Date(activeEvent.value.publishTime)
  if (isNaN(date.getTime())) return ''
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
})

// transitionend 兜底（正常情况由定时器触发，此为双保险）
function onTransitionEnd() {
  snapIfNeeded()
}

function snapIfNeeded() {
  const len = props.events.length
  if (len <= 1) return
  // 滑到尾部克隆（真实第一张前面）→ 瞬跳到真实第一张
  if (currentIndex.value >= len + 1) {
    jumpTo(1)
  }
  // 滑到首部克隆（真实最后一张后面）→ 瞬跳到真实最后一张
  if (currentIndex.value <= 0) {
    jumpTo(len)
  }
}

function jumpTo(index) {
  if (jumpTimer) { clearTimeout(jumpTimer); jumpTimer = null }
  jumping.value = true
  currentIndex.value = index
  nextTick(() => {
    void document.body.offsetHeight // 强制 reflow 让瞬跳生效
    jumping.value = false
  })
}

function next() {
  const len = props.events.length
  if (!len) return
  if (jumpTimer) { clearTimeout(jumpTimer); jumpTimer = null }
  currentIndex.value++
  restartAutoTimer()
  // 定时器兜底：动画结束后强制跳转
  if (currentIndex.value >= len + 1) {
    jumpTimer = setTimeout(() => snapIfNeeded(), TRANSITION_MS)
  }
}

function prev() {
  const len = props.events.length
  if (!len) return
  if (jumpTimer) { clearTimeout(jumpTimer); jumpTimer = null }
  currentIndex.value--
  restartAutoTimer()
  if (currentIndex.value <= 0) {
    jumpTimer = setTimeout(() => snapIfNeeded(), TRANSITION_MS)
  }
}

function goTo(index) {
  if (index === realIndex.value) return
  if (jumpTimer) { clearTimeout(jumpTimer); jumpTimer = null }
  currentIndex.value = index + 1
  restartAutoTimer()
}

function startAutoTimer() {
  stopAutoTimer()
  if (props.events.length <= 1) return
  autoTimer = setInterval(() => {
    if (!paused) next()
  }, props.interval)
}

function stopAutoTimer() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null }
}

function restartAutoTimer() { stopAutoTimer(); startAutoTimer() }
function pause() { paused = true }
function resume() { paused = false }

watch(() => props.events, () => {
  currentIndex.value = 1
  restartAutoTimer()
}, { immediate: true })

onMounted(() => startAutoTimer())
onUnmounted(() => { stopAutoTimer(); if (jumpTimer) clearTimeout(jumpTimer) })
</script>

<style scoped>
/* ========== 容器 ========== */
.event-carousel {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 7;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f5f0;
  cursor: pointer;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 12px 40px -8px rgba(0, 0, 0, 0.1);
}

/* ========== 大图 ========== */
.carousel-track {
  position: absolute;
  inset: 0;
  display: flex;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 12s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.carousel-slide.is-active .carousel-image {
  transform: scale(1.04);
}

.carousel-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0ebe3, #e8e0d4);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========== 箭头 ========== */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
}

.event-carousel:hover .carousel-arrow {
  opacity: 1;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.35);
  border-color: rgba(220, 38, 38, 0.5);
  color: #DC2626;
  transform: translateY(-50%) scale(1.08);
}

.carousel-arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.carousel-arrow--left { left: 24px; }
.carousel-arrow--right { right: 24px; }

/* ========== 印章序号 ========== */
.carousel-seal {
  position: absolute;
  top: 28px;
  right: 28px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border: 2px solid #DC2626;
  padding: 12px 14px 10px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-family: 'Noto Serif SC', 'Noto Serif TC', serif;
  animation: seal-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.carousel-seal-num {
  font-size: 22px;
  font-weight: 700;
  color: #DC2626;
  line-height: 1.2;
}

.carousel-seal-sep {
  font-size: 12px;
  color: rgba(220, 38, 38, 0.4);
  line-height: 1;
}

.carousel-seal-total {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.2;
}

/* ========== 底部信息叠加 ========== */
.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  padding: 0 48px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.carousel-content {
  animation: content-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 日期 */
.carousel-date {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

/* 朱红装饰线 */
.carousel-divider {
  width: 48px;
  height: 2px;
  background: #DC2626;
  margin-bottom: 16px;
  position: relative;
  box-shadow: 0 1px 4px rgba(220, 38, 38, 0.3);
}

.carousel-divider::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 32px;
  height: 1px;
  background: rgba(220, 38, 38, 0.5);
}

/* 标题 */
.carousel-title {
  font-family: 'Noto Serif SC', 'Noto Serif TC', serif;
  font-size: 34px;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
  max-width: 600px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* 描述 */
.carousel-desc {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  max-width: 520px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
}

/* 操作按钮 */
.carousel-actions {
  margin-top: 20px;
}

.carousel-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #DC2626;
  background: transparent;
  border: 1.5px solid #DC2626;
  border-radius: 4px;
  padding: 10px 24px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.04em;
}

.carousel-btn:hover {
  background: #DC2626;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.carousel-btn:active {
  transform: translateY(0);
}

/* ========== 底部控制栏 ========== */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

/* 指示点 */
.carousel-dots {
  display: flex;
  align-items: center;
  gap: 10px;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
}

.carousel-dot.is-active {
  background: #DC2626;
  border-color: #DC2626;
  transform: scale(1.2);
}

.carousel-dot:hover:not(.is-active) {
  border-color: rgba(255, 255, 255, 0.7);
}

/* 计数器 */
.carousel-counter {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.12em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

/* 入场动画 */
@keyframes content-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes seal-in {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}

/* ========== 移动端 ========== */
@media (max-width: 768px) {
  .event-carousel {
    aspect-ratio: 16 / 9;
    border-radius: 8px;
  }

  .carousel-overlay {
    padding: 0 20px 24px;
  }

  .carousel-seal {
    top: 16px;
    right: 16px;
    padding: 8px 10px 6px;
  }

  .carousel-seal-num {
    font-size: 18px;
  }

  .carousel-seal-total {
    font-size: 12px;
  }

  .carousel-title {
    font-size: 22px;
    max-width: 100%;
  }

  .carousel-desc {
    font-size: 13px;
    -webkit-line-clamp: 1;
    max-width: 100%;
  }

  .carousel-arrow {
    width: 36px;
    height: 36px;
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .carousel-arrow--left { left: 12px; }
  .carousel-arrow--right { right: 12px; }

  .carousel-btn {
    padding: 8px 18px;
    font-size: 13px;
  }

  .carousel-divider {
    width: 36px;
    margin-bottom: 12px;
  }

  .carousel-divider::after {
    width: 24px;
  }
}

/* ========== 无障碍 ========== */
@media (prefers-reduced-motion: reduce) {
  .carousel-track { transition-duration: 0.01ms !important; }
  .carousel-image { transition-duration: 0.01ms !important; transform: none !important; }
  .carousel-content { animation: none !important; }
  .carousel-seal { animation: none !important; }
}
</style>
