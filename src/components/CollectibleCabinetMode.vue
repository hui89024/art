<script setup>
import { ref, computed, watch } from 'vue'
import { PhCaretLeft, PhCaretRight, PhX, PhMagnifyingGlassPlus, PhMagnifyingGlassMinus, PhBookOpen, PhInfo } from '@phosphor-icons/vue'
import { animate } from 'animejs'
import { DURATION, EASING } from '@/composables/anime.config.js'

const props = defineProps({
  items: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['prev', 'next', 'open-story', 'exit', 'select-index'])

const isZoomed = ref(false)
const infoExpanded = ref(false)
const artworkRef = ref(null)

const currentArtwork = computed(() => {
  return props.items[props.currentIndex] || null
})

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value
}

const toggleInfo = () => {
  infoExpanded.value = !infoExpanded.value
}

// 作品切换动画
watch(() => props.currentIndex, () => {
  isZoomed.value = false
  if (artworkRef.value) {
    animate(artworkRef.value, {
      opacity: [0, 1],
      scale: [0.92, 1],
      translateY: [30, 0],
      duration: DURATION.base,
      ease: EASING,
    })
  }
})
</script>

<template>
  <div class="cabinet-mode">
    <!-- 背景装饰层 -->
    <div class="cabinet-backdrop" aria-hidden="true">
      <!-- 聚光灯光晕 -->
      <div class="spotlight"></div>
      <!-- 印章阵列 -->
      <div class="seal-array">
        <div v-for="i in 6" :key="i" class="seal-ghost" :style="{ animationDelay: (i * 1.5) + 's' }">
          <div class="seal-diamond">
            <span>{{ ['匠', '心', '传', '承', '非', '遗'][i - 1] }}</span>
          </div>
        </div>
      </div>
      <!-- 四角窗格装饰 -->
      <div class="corner-deco top-left"></div>
      <div class="corner-deco top-right"></div>
      <div class="corner-deco bottom-left"></div>
      <div class="corner-deco bottom-right"></div>
    </div>

    <!-- 顶部工具栏 -->
    <header class="cabinet-header">
      <div class="header-brand">
        <span class="brand-dot"></span>
        <span class="brand-text">珍品展柜</span>
      </div>
      <div class="header-counter" aria-live="polite" aria-atomic="true">
        <span class="counter-current">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
        <span class="counter-divider">/</span>
        <span class="counter-total">{{ String(items.length).padStart(2, '0') }}</span>
      </div>
      <button @click="emit('exit')" class="header-close" aria-label="退出展柜模式">
        <PhX class="w-5 h-5" />
      </button>
    </header>

    <!-- 展柜主体 -->
    <div class="cabinet-stage">
      <!-- 左右导航热区 -->
      <button
        class="nav-hotzone left"
        @click="emit('prev')"
        :disabled="currentIndex === 0"
        aria-label="上一件作品"
      >
        <PhCaretLeft class="w-8 h-8" />
      </button>

      <!-- 作品展示区 -->
      <div class="artwork-showcase" v-if="currentArtwork" ref="artworkRef">
        <!-- 展台底座 -->
        <div class="pedestal-top" aria-hidden="true"></div>

        <!-- 作品图片 -->
        <div
          class="artwork-frame"
          role="img"
          :aria-label="`作品：${currentArtwork.title}`"
          @click="toggleZoom"
        >
          <div class="frame-glow"></div>
          <img
            v-protect-image
            :src="currentArtwork.image"
            :alt="`${currentArtwork.title} - ${currentArtwork.desc}`"
            :class="{ zoomed: isZoomed }"
            class="artwork-image"
          />
          <!-- 四角金饰 -->
          <div class="frame-ornament top-left"></div>
          <div class="frame-ornament top-right"></div>
          <div class="frame-ornament bottom-left"></div>
          <div class="frame-ornament bottom-right"></div>
        </div>

        <!-- 展台底座 -->
        <div class="pedestal-base" aria-hidden="true">
          <div class="pedestal-line"></div>
          <div class="pedestal-label">
            <span>{{ currentArtwork.patternCode }}</span>
          </div>
          <div class="pedestal-line"></div>
        </div>
      </div>

      <!-- 右导航热区 -->
      <button
        class="nav-hotzone right"
        @click="emit('next')"
        :disabled="currentIndex === items.length - 1"
        aria-label="下一件作品"
      >
        <PhCaretRight class="w-8 h-8" />
      </button>
    </div>

    <!-- 底部信息面板 -->
    <div class="cabinet-panel" :class="{ expanded: infoExpanded }" v-if="currentArtwork">
      <!-- 面板触发器 -->
      <button class="panel-toggle" @click="toggleInfo" :aria-expanded="infoExpanded">
        <span class="toggle-title">{{ currentArtwork.title }}</span>
        <PhInfo class="w-4 h-4 toggle-icon" :class="{ rotated: infoExpanded }" />
      </button>

      <!-- 展开内容 -->
      <div class="panel-content" v-show="infoExpanded">
        <div class="panel-grid">
          <div class="panel-meta">
            <div class="meta-item">
              <span class="meta-label">藏品编号</span>
              <span class="meta-value">{{ currentArtwork.patternCode }}</span>
            </div>
          </div>
          <div class="panel-desc">
            <p>{{ currentArtwork.desc }}</p>
          </div>
          <div class="panel-actions">
            <button @click="emit('open-story', currentArtwork)" class="action-btn primary">
              <PhBookOpen class="w-4 h-4" aria-hidden="true" />
              <span>品读故事</span>
            </button>
            <button @click="toggleZoom" class="action-btn secondary">
              <component :is="isZoomed ? PhMagnifyingGlassMinus : PhMagnifyingGlassPlus" class="w-4 h-4" aria-hidden="true" />
              <span>{{ isZoomed ? '缩小' : '放大' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部缩略图导航 -->
    <nav class="cabinet-thumbnails" aria-label="作品缩略图导航">
      <div class="thumbnails-track">
        <button
          v-for="(item, index) in items"
          :key="item.id"
          class="thumb-item"
          :class="{ active: index === currentIndex }"
          :aria-label="`第 ${index + 1} 件作品：${item.title}`"
          @click="emit('select-index', index)"
        >
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <div class="thumb-indicator"></div>
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.cabinet-mode {
  position: fixed;
  inset: 0;
  padding-top: 4.5rem;
  z-index: 30;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1C0A0A 0%, #2D0A0A 40%, #1A0505 100%);
  overflow: hidden;
}

/* 背景装饰层 */
.cabinet-backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.spotlight {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 70%;
  background: radial-gradient(ellipse at center, rgba(220, 38, 38, 0.08) 0%, rgba(245, 158, 11, 0.04) 30%, transparent 60%);
}

.seal-array {
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  opacity: 0.04;
  padding: 10%;
}

.seal-ghost {
  animation: seal-float 8s ease-in-out infinite;
}

.seal-diamond {
  width: 3rem;
  height: 3rem;
  border: 2px solid #DC2626;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.seal-diamond span {
  transform: rotate(-45deg);
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1rem;
  color: #DC2626;
}

@keyframes seal-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.04; }
  50% { transform: translateY(-10px) scale(1.05); opacity: 0.08; }
}

/* 四角窗格装饰 */
.corner-deco {
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-color: rgba(220, 38, 38, 0.12);
  border-style: solid;
  border-width: 0;
}

.corner-deco.top-left { top: 2rem; left: 2rem; border-top-width: 2px; border-left-width: 2px; }
.corner-deco.top-right { top: 2rem; right: 2rem; border-top-width: 2px; border-right-width: 2px; }
.corner-deco.bottom-left { bottom: 2rem; left: 2rem; border-bottom-width: 2px; border-left-width: 2px; }
.corner-deco.bottom-right { bottom: 2rem; right: 2rem; border-bottom-width: 2px; border-right-width: 2px; }

/* 顶部工具栏 */
.cabinet-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.brand-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #DC2626;
  box-shadow: 0 0 12px rgba(220, 38, 38, 0.6);
}

.brand-text {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.header-counter {
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
  font-variant-numeric: tabular-nums;
}

.counter-current {
  font-size: 1.75rem;
  font-weight: 300;
  color: #FEE2E2;
  letter-spacing: -0.02em;
}

.counter-divider {
  font-size: 1rem;
  color: rgba(254, 226, 226, 0.2);
  margin: 0 0.25rem;
}

.counter-total {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(254, 226, 226, 0.4);
}

.header-close {
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-close:hover {
  background: rgba(220, 38, 38, 0.15);
  color: #FEE2E2;
  transform: rotate(90deg);
}

/* 展柜主体 */
.cabinet-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 5;
  min-height: 0;
}

/* 导航热区 */
.nav-hotzone {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
}

.nav-hotzone.left { left: 0; }
.nav-hotzone.right { right: 0; }

.nav-hotzone:hover:not(:disabled) {
  color: rgba(255, 255, 255, 0.4);
}

.nav-hotzone.left:hover:not(:disabled) {
  background: linear-gradient(to right, rgba(28, 10, 10, 0.6), transparent);
}

.nav-hotzone.right:hover:not(:disabled) {
  background: linear-gradient(to left, rgba(28, 10, 10, 0.6), transparent);
}

.nav-hotzone:disabled {
  cursor: default;
  opacity: 0.2;
}

/* 作品展示区 */
.artwork-showcase {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60%;
  max-height: 75%;
}

.pedestal-top {
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent);
  margin-bottom: 1rem;
}

.artwork-frame {
  position: relative;
  cursor: zoom-in;
}

.frame-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130%;
  height: 130%;
  background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 60%);
  pointer-events: none;
}

.artwork-image {
  display: block;
  max-width: 100%;
  max-height: 55vh;
  object-fit: contain;
  border-radius: 0.25rem;
  filter: drop-shadow(0 0 40px rgba(245, 158, 11, 0.15));
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;
}

.artwork-image.zoomed {
  transform: scale(1.5);
  cursor: zoom-out;
}

/* 四角金饰 */
.frame-ornament {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-color: rgba(245, 158, 11, 0.4);
  border-style: solid;
  border-width: 0;
  z-index: 2;
}

.frame-ornament.top-left { top: -0.5rem; left: -0.5rem; border-top-width: 2px; border-left-width: 2px; }
.frame-ornament.top-right { top: -0.5rem; right: -0.5rem; border-top-width: 2px; border-right-width: 2px; }
.frame-ornament.bottom-left { bottom: -0.5rem; left: -0.5rem; border-bottom-width: 2px; border-left-width: 2px; }
.frame-ornament.bottom-right { bottom: -0.5rem; right: -0.5rem; border-bottom-width: 2px; border-right-width: 2px; }

/* 展台底座 */
.pedestal-base {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 80%;
}

.pedestal-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent);
}

.pedestal-label {
  font-size: 0.6875rem;
  color: rgba(245, 158, 11, 0.5);
  letter-spacing: 0.15em;
  font-variant-numeric: tabular-nums;
}

/* 底部信息面板 */
.cabinet-panel {
  position: relative;
  z-index: 10;
  background: rgba(28, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(220, 38, 38, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #FEE2E2;
}

.toggle-title {
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
}

.toggle-icon {
  color: rgba(245, 158, 11, 0.6);
  transition: transform 0.3s;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.panel-content {
  padding: 0 2rem 1.5rem;
  max-height: 30vh;
  overflow-y: auto;
}

.panel-grid {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: start;
}

.panel-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(245, 158, 11, 0.5);
}

.meta-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #FEE2E2;
  letter-spacing: 0.05em;
}

.panel-desc p {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: rgba(254, 226, 226, 0.7);
}

.panel-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  white-space: nowrap;
}

.action-btn.primary {
  background: linear-gradient(135deg, #DC2626, #B91C1C);
  color: #FFFFFF;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(254, 226, 226, 0.7);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(220, 38, 38, 0.1);
  color: #FEE2E2;
}

/* 底部缩略图导航 */
.cabinet-thumbnails {
  position: relative;
  z-index: 10;
  padding: 0.75rem 2rem 1.25rem;
}

.thumbnails-track {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0.25rem;
}

.thumbnails-track::-webkit-scrollbar {
  display: none;
}

.thumb-item {
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  border-radius: 0.375rem;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0;
  background: none;
}

.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
  transition: opacity 0.3s;
}

.thumb-item:hover img {
  opacity: 0.65;
}

.thumb-item.active {
  border-color: #F59E0B;
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.3);
}

.thumb-item.active img {
  opacity: 1;
}

.thumb-indicator {
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background: #F59E0B;
  border-radius: 9999px;
  transition: transform 0.3s;
}

.thumb-item.active .thumb-indicator {
  transform: translateX(-50%) scaleX(1);
}

/* 响应式 */
@media (max-width: 1024px) {
  .artwork-showcase {
    max-width: 80%;
  }

  .panel-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .panel-actions {
    flex-direction: row;
  }

  .action-btn {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .cabinet-mode {
    padding-top: 3.5rem;
  }

  .cabinet-header {
    padding: 1rem;
  }

  .artwork-showcase {
    max-width: 90%;
  }

  .artwork-image {
    max-height: 45vh;
  }

  .panel-content {
    padding: 0 1rem 1rem;
  }

  .cabinet-thumbnails {
    padding: 0.5rem 1rem 1rem;
  }

  .thumb-item {
    width: 2.5rem;
    height: 2.5rem;
  }

  .corner-deco { display: none; }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .seal-ghost,
  .seal-diamond,
  .toggle-icon {
    animation: none !important;
  }

  .artwork-image {
    transition: none !important;
  }

  .artwork-image.zoomed {
    transform: scale(1.2);
  }
}
</style>
