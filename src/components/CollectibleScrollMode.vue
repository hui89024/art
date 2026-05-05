<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { PhCaretLeft, PhCaretRight, PhBookOpen } from '@phosphor-icons/vue'
import { DURATION, EASING } from '@/composables/anime.config.js'
import { animate } from 'animejs'

const props = defineProps({
  items: { type: Array, default: () => [] },
  activeIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['select-item', 'open-story'])

const scrollRef = ref(null)
const scrollProgress = ref(0)
const currentIndex = ref(props.activeIndex)

// 横向滚动映射
const handleWheel = (e) => {
  if (!scrollRef.value) return
  e.preventDefault()
  scrollRef.value.scrollLeft += e.deltaY * 2
}

const updateProgress = () => {
  if (!scrollRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.value
  scrollProgress.value = scrollWidth <= clientWidth ? 0 : (scrollLeft / (scrollWidth - clientWidth)) * 100
}

const updateCurrentIndex = () => {
  if (!scrollRef.value || !props.items.length) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.value
  const itemWidth = scrollWidth / props.items.length
  const idx = Math.round(scrollLeft / itemWidth)
  currentIndex.value = Math.max(0, Math.min(idx, props.items.length - 1))
}

const scrollToItem = (index) => {
  if (!scrollRef.value || !props.items.length) return
  const itemWidth = scrollRef.value.scrollWidth / props.items.length
  scrollRef.value.scrollTo({
    left: itemWidth * index,
    behavior: 'smooth'
  })
}

const scrollByDirection = (dir) => {
  const next = currentIndex.value + dir
  if (next >= 0 && next < props.items.length) {
    scrollToItem(next)
  }
}

// 卡片入场动画
const cardRefs = ref([])

onMounted(async () => {
  await nextTick()
  if (scrollRef.value) {
    scrollRef.value.addEventListener('scroll', () => {
      updateProgress()
      updateCurrentIndex()
    }, { passive: true })
    scrollRef.value.addEventListener('wheel', handleWheel, { passive: false })
  }
})

onUnmounted(() => {
  if (scrollRef.value) {
    scrollRef.value.removeEventListener('wheel', handleWheel)
  }
})
</script>

<template>
  <div class="scroll-mode">
    <!-- 顶部装饰云纹带 -->
    <div class="cloud-band top" aria-hidden="true">
      <svg viewBox="0 0 1200 30" preserveAspectRatio="none" class="cloud-svg">
        <path d="M0,15 Q50,0 100,15 Q150,30 200,15 Q250,0 300,15 Q350,30 400,15 Q450,0 500,15 Q550,30 600,15 Q650,0 700,15 Q750,30 800,15 Q850,0 900,15 Q950,30 1000,15 Q1050,0 1100,15 Q1150,30 1200,15"
              fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
      </svg>
    </div>

    <!-- 横向滚动画布 -->
    <div class="scroll-viewport">
      <div class="scroll-track" ref="scrollRef" role="list" aria-label="卷轴长卷作品列表">
        <!-- 开卷引言 -->
        <div class="scroll-intro" role="presentation">
          <div class="intro-content">
            <div class="intro-seal">
              <div class="seal-border">
                <span class="seal-char">卷</span>
              </div>
            </div>
            <h2 class="intro-title">展 · 卷</h2>
            <p class="intro-subtitle">横向滑动，徐徐展开千年剪纸长卷</p>
            <div class="intro-arrow">
              <PhCaretRight class="w-5 h-5" />
            </div>
          </div>
        </div>

        <!-- 作品卡片 -->
        <article
          v-for="(item, index) in items"
          :key="item.id"
          class="scroll-card"
          role="listitem"
          :aria-label="`作品 ${index + 1}：${item.title}`"
          @click="emit('select-item', index)"
        >
          <!-- 作品大图区 -->
          <div class="card-artwork">
            <!-- 窗格边框装饰 -->
            <div class="frame-corner top-left" aria-hidden="true"></div>
            <div class="frame-corner top-right" aria-hidden="true"></div>
            <div class="frame-corner bottom-left" aria-hidden="true"></div>
            <div class="frame-corner bottom-right" aria-hidden="true"></div>

            <img
              :src="item.image"
              :alt="`${item.title} - ${item.desc}`"
              loading="lazy"
              decoding="async"
              class="artwork-img"
            />

            <!-- 序号标签 -->
            <div class="artwork-index">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
          </div>

          <!-- 作品信息区 -->
          <div class="card-info">
            <div class="info-header">
              <span class="info-theme-tag">{{ item.theme }}</span>
              <span class="info-code">{{ item.patternCode }}</span>
            </div>
            <h3 class="info-title">{{ item.title }}</h3>
            <p class="info-desc">{{ item.desc }}</p>
            <button
              class="info-btn"
              @click.stop="emit('open-story', item)"
              :aria-label="`查看 ${item.title} 的故事`"
            >
              <PhBookOpen class="w-4 h-4" aria-hidden="true" />
              <span>品读故事</span>
            </button>
          </div>
        </article>

        <!-- 收卷引言 -->
        <div class="scroll-outro" role="presentation">
          <div class="outro-content">
            <div class="outro-seal">
              <div class="seal-border">
                <span class="seal-char">终</span>
              </div>
            </div>
            <p class="outro-text">长卷至此，意犹未尽</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部进度指示器 -->
    <div class="scroll-progress" role="progressbar" :aria-valuenow="Math.round(scrollProgress)" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: scrollProgress + '%' }"></div>
        <!-- 节点标记 -->
        <div
          v-for="(item, index) in items"
          :key="'node-' + item.id"
          class="progress-node"
          :class="{ active: index === currentIndex }"
          :style="{ left: ((index + 1) / (items.length + 1) * 100) + '%' }"
          @click="scrollToItem(index)"
        >
          <span class="node-dot"></span>
        </div>
      </div>
      <div class="progress-label">
        <span class="label-current">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
        <span class="label-divider">/</span>
        <span class="label-total">{{ String(items.length).padStart(2, '0') }}</span>
      </div>
    </div>

    <!-- 左右导航按钮 -->
    <button
      class="scroll-nav-btn left"
      @click="scrollByDirection(-1)"
      :disabled="currentIndex === 0"
      aria-label="上一件作品"
    >
      <PhCaretLeft class="w-5 h-5" />
    </button>
    <button
      class="scroll-nav-btn right"
      @click="scrollByDirection(1)"
      :disabled="currentIndex === items.length - 1"
      aria-label="下一件作品"
    >
      <PhCaretRight class="w-5 h-5" />
    </button>
  </div>
</template>

<style scoped>
.scroll-mode {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #FEF2F2 0%, #FFFBEB 50%, #FFF7ED 100%);
  overflow: hidden;
}

/* 顶部云纹装饰带 */
.cloud-band {
  position: relative;
  z-index: 5;
  height: 2rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #DC2626;
}

.cloud-band.top {
  margin-top: 0.5rem;
}

.cloud-svg {
  width: 200%;
  height: 100%;
  animation: cloud-drift 30s linear infinite;
}

@keyframes cloud-drift {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* 横向滚动画布 */
.scroll-viewport {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.scroll-track {
  display: flex;
  gap: 0;
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 1rem 0;
}

.scroll-track::-webkit-scrollbar {
  display: none;
}

/* 开卷引言 */
.scroll-intro {
  flex: 0 0 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
}

.intro-content {
  text-align: center;
}

.intro-seal {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.seal-border {
  width: 4rem;
  height: 4rem;
  border: 3px solid #DC2626;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin-slow 20s linear infinite;
}

.seal-char {
  transform: rotate(-45deg);
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1.5rem;
  color: #DC2626;
  font-weight: 600;
}

.intro-title {
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 3rem;
  color: #991B1B;
  letter-spacing: 0.3em;
  margin-bottom: 0.75rem;
  text-shadow: 2px 2px 0px rgba(217, 119, 6, 0.15);
}

.intro-subtitle {
  font-size: 0.875rem;
  color: #B45309;
  opacity: 0.8;
  margin-bottom: 2rem;
}

.intro-arrow {
  color: #DC2626;
  animation: bounce-right 2s ease-in-out infinite;
}

@keyframes bounce-right {
  0%, 100% { transform: translateX(0); opacity: 0.6; }
  50% { transform: translateX(12px); opacity: 1; }
}

/* 作品卡片 */
.scroll-card {
  flex: 0 0 75vw;
  max-width: 75vw;
  display: flex;
  gap: 2.5rem;
  padding: 2rem 3rem;
  scroll-snap-align: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

/* 作品大图区 */
.card-artwork {
  flex: 0 0 55%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.frame-corner {
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-color: rgba(220, 38, 38, 0.25);
  border-style: solid;
  border-width: 0;
  z-index: 2;
  transition: border-color 0.3s;
}

.scroll-card:hover .frame-corner {
  border-color: rgba(220, 38, 38, 0.5);
}

.frame-corner.top-left { top: 0; left: 0; border-top-width: 2px; border-left-width: 2px; }
.frame-corner.top-right { top: 0; right: 0; border-top-width: 2px; border-right-width: 2px; }
.frame-corner.bottom-left { bottom: 0; left: 0; border-bottom-width: 2px; border-left-width: 2px; }
.frame-corner.bottom-right { bottom: 0; right: 0; border-bottom-width: 2px; border-right-width: 2px; }

.artwork-img {
  max-width: 100%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: 0.5rem;
  filter: drop-shadow(0 20px 40px rgba(154, 132, 98, 0.15));
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-card:hover .artwork-img {
  transform: scale(1.03);
}

.artwork-index {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.375rem 0.75rem;
  background: rgba(220, 38, 38, 0.9);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #FFFFFF;
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
}

/* 作品信息区 */
.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.info-theme-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border: 2px solid #DC2626;
  border-radius: 2px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #DC2626;
  letter-spacing: 0.1em;
  transform: rotate(-1deg);
}

.info-code {
  font-size: 0.75rem;
  color: #B45309;
  opacity: 0.7;
  letter-spacing: 0.05em;
}

.info-title {
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 2rem;
  color: #991B1B;
  letter-spacing: 0.05em;
  line-height: 1.3;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 0px rgba(217, 119, 6, 0.1);
}

.info-desc {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #78350F;
  opacity: 0.85;
  margin-bottom: 1.5rem;
  max-width: 28rem;
}

.info-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #DC2626, #B91C1C);
  color: #FFFFFF;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: fit-content;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.25);
}

.info-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.35);
  background: linear-gradient(135deg, #EF4444, #DC2626);
}

/* 收卷引言 */
.scroll-outro {
  flex: 0 0 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: end;
}

.outro-content {
  text-align: center;
}

.outro-seal {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.outro-text {
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1.125rem;
  color: #B45309;
  opacity: 0.7;
  letter-spacing: 0.2em;
}

/* 底部进度指示器 */
.scroll-progress {
  position: relative;
  z-index: 10;
  padding: 0.75rem 4rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.progress-track {
  flex: 1;
  height: 3px;
  background: rgba(220, 38, 38, 0.15);
  border-radius: 9999px;
  position: relative;
  overflow: visible;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #DC2626, #F59E0B);
  border-radius: 9999px;
  transition: width 0.15s ease-out;
}

.progress-node {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  padding: 6px;
}

.node-dot {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.3);
  transition: all 0.3s;
}

.progress-node.active .node-dot {
  width: 10px;
  height: 10px;
  background: #DC2626;
  box-shadow: 0 0 12px rgba(220, 38, 38, 0.5);
}

.progress-node:hover .node-dot {
  background: rgba(220, 38, 38, 0.6);
}

.progress-label {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.label-current {
  font-size: 1.25rem;
  font-weight: 300;
  color: #991B1B;
}

.label-divider {
  font-size: 0.875rem;
  color: rgba(153, 27, 27, 0.3);
}

.label-total {
  font-size: 0.875rem;
  font-weight: 300;
  color: rgba(153, 27, 27, 0.5);
}

/* 左右导航按钮 */
.scroll-nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: #991B1B;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
}

.scroll-nav-btn.left { left: 1.5rem; }
.scroll-nav-btn.right { right: 1.5rem; }

.scroll-nav-btn:hover:not(:disabled) {
  background: #DC2626;
  color: #FFFFFF;
  border-color: #DC2626;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.3);
}

.scroll-nav-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

/* 旋转动画 */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式 */
@media (max-width: 1024px) {
  .scroll-card {
    flex-direction: column;
    flex: 0 0 85vw;
    max-width: 85vw;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .card-artwork {
    flex: none;
    height: 45vh;
  }

  .artwork-img {
    max-height: 100%;
  }

  .info-title {
    font-size: 1.5rem;
  }

  .info-desc {
    font-size: 0.8125rem;
  }
}

@media (max-width: 768px) {
  .scroll-intro {
    flex: 0 0 80vw;
  }

  .intro-title {
    font-size: 2rem;
  }

  .scroll-card {
    flex: 0 0 90vw;
    max-width: 90vw;
    padding: 1rem;
  }

  .scroll-progress {
    padding: 0.5rem 1.5rem 1rem;
  }

  .scroll-nav-btn {
    width: 2.5rem;
    height: 2.5rem;
  }

  .scroll-nav-btn.left { left: 0.5rem; }
  .scroll-nav-btn.right { right: 0.5rem; }

  .cloud-band { display: none; }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .cloud-svg,
  .seal-border,
  .intro-arrow {
    animation: none !important;
  }

  .scroll-card:hover .artwork-img {
    transform: none;
  }

  .progress-fill {
    transition: none;
  }
}
</style>
