<template>
  <section
    ref="sectionRef"
    class="manifesto-section relative flex flex-col items-center justify-center overflow-hidden"
    role="region"
    aria-label="剪艺宣言"
  >
    <!-- 深色背景层 -->
    <div class="absolute inset-0 bg-manifesto-bg"></div>

    <!-- 宣纸纹理层 -->
    <div class="absolute inset-0 opacity-[0.05] pointer-events-none"
         style="background-image: url('/src/assets/窗花018.png'); background-size: 300px; background-repeat: repeat;">
    </div>

    <!-- 水墨晕染背景 -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-10
                  bg-manifesto-glow-left blur-3xl"></div>
      <div class="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full opacity-8
                  bg-manifesto-glow-right blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[600px] h-[600px] rounded-full opacity-5
                  bg-manifesto-glow-center blur-3xl"></div>
    </div>

    <!-- 顶部装饰：云纹 -->
    <div class="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6
                manifesto-fade-in"
         :class="{ 'is-visible': isVisible }"
         aria-hidden="true">
      <svg class="w-12 md:w-16 h-6 md:h-8 text-manifesto-accent/15" viewBox="0 0 64 32" fill="none">
        <path d="M2 16C2 16 8 8 16 8C24 8 28 16 32 16C36 16 40 8 48 8C56 8 62 16 62 16"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <div class="w-1.5 h-1.5 bg-manifesto-accent/60 rotate-45"></div>
      <svg class="w-12 md:w-16 h-6 md:h-8 text-manifesto-accent/15 scale-x-[-1]" viewBox="0 0 64 32" fill="none">
        <path d="M2 16C2 16 8 8 16 8C24 8 28 16 32 16C36 16 40 8 48 8C56 8 62 16 62 16"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>

    <!-- 主内容区 -->
    <div class="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">

      <!-- 引言标签 -->
      <div class="mb-10 md:mb-16 manifesto-slide-up delay-1"
           :class="{ 'is-visible': isVisible }">
        <span class="inline-block text-manifesto-label text-xs font-bold uppercase tracking-[0.5em]
                     px-5 py-2.5 md:px-6 md:py-3 border border-manifesto-border bg-manifesto-label-bg
                     backdrop-blur-sm">
          剪 艺 宣 言
        </span>
      </div>

      <!-- 核心宣言文字 -->
      <div class="mb-12 md:mb-20 space-y-4 md:space-y-6">
        <h2 class="manifesto-slide-up delay-2"
            :class="{ 'is-visible': isVisible }">
          <span class="block manifesto-heading-text text-manifesto-primary">
            纸，是时光的信笺
          </span>
        </h2>

        <h3 class="manifesto-slide-up delay-3"
            :class="{ 'is-visible': isVisible }">
          <span class="block manifesto-heading-text text-manifesto-primary">
            刀，是心意的画笔
          </span>
        </h3>

        <h3 class="manifesto-slide-up delay-4"
            :class="{ 'is-visible': isVisible }">
          <span class="block manifesto-heading-text manifesto-gradient-text">
            每一次裁剪
          </span>
          <span class="block manifesto-heading-text manifesto-gradient-text">
            都是与美好的相遇
          </span>
        </h3>
      </div>

      <!-- 分隔线 -->
      <div class="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 manifesto-fade-in delay-5"
           :class="{ 'is-visible': isVisible }"
           aria-hidden="true">
        <div class="w-16 md:w-24 h-px bg-manifesto-divider"></div>
        <div class="w-1.5 h-1.5 bg-manifesto-accent rotate-45"></div>
        <div class="w-16 md:w-24 h-px bg-manifesto-divider"></div>
      </div>

      <!-- 哲学阐述 -->
      <p class="text-manifesto-secondary text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto
                mb-12 md:mb-20 manifesto-slide-up delay-6"
         :class="{ 'is-visible': isVisible }">
        在剪艺的世界里，一把剪刀，一张红纸，便能剪出四季的风景、千年的祝福。
        我们相信，传统不是尘封的记忆，而是流淌在指尖的温度。
        每一刀落下，都是匠心与时光的对话；每一幅窗花，都是送给生活的礼物。
      </p>

      <!-- 印章组 -->
      <div class="flex items-center justify-center gap-6 md:gap-10 lg:gap-16 mb-12 md:mb-16"
           role="list"
           aria-label="剪艺核心价值">
        <div v-for="(seal, index) in seals" :key="seal.char"
             class="manifesto-slide-up"
             :class="{ 'is-visible': isVisible }"
             :style="{ '--seal-delay': `${7 + index}` }"
             role="listitem">
          <div class="seal-group relative cursor-default">
            <!-- 印章外框 - 圆形 -->
            <div class="seal-frame w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                        rounded-full border-[1.5px] border-manifesto-seal flex items-center justify-center">
              <!-- 印章文字 -->
              <span class="font-serif text-manifesto-seal-text text-lg md:text-xl lg:text-2xl font-bold">
                {{ seal.char }}
              </span>
            </div>
            <!-- 印章说明 -->
            <div class="mt-3 md:mt-4 text-center">
              <span class="text-manifesto-label text-xs tracking-widest">
                {{ seal.label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="manifesto-fade-in delay-11"
           :class="{ 'is-visible': isVisible }">
        <div class="flex items-center justify-center gap-3 md:gap-4">
          <div class="w-6 md:w-8 h-px bg-manifesto-divider"></div>
          <p class="text-manifesto-footer text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">
            剪艺数字实验室
          </p>
          <div class="w-6 md:w-8 h-px bg-manifesto-divider"></div>
        </div>
        <p class="text-manifesto-footer-sub text-xs mt-2 md:mt-3 tracking-widest">
          Jianyi Digital Lab · Est. 2024
        </p>
      </div>
    </div>

    <!-- 底部装饰：云纹 -->
    <div class="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6
                manifesto-fade-in delay-12"
         :class="{ 'is-visible': isVisible }"
         aria-hidden="true">
      <svg class="w-12 md:w-16 h-6 md:h-8 text-manifesto-accent/15 rotate-180" viewBox="0 0 64 32" fill="none">
        <path d="M2 16C2 16 8 8 16 8C24 8 28 16 32 16C36 16 40 8 48 8C56 8 62 16 62 16"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <div class="w-1.5 h-1.5 bg-manifesto-accent/40 rotate-45"></div>
      <svg class="w-12 md:w-16 h-6 md:h-8 text-manifesto-accent/15 rotate-180 scale-x-[-1]" viewBox="0 0 64 32" fill="none">
        <path d="M2 16C2 16 8 8 16 8C24 8 28 16 32 16C36 16 40 8 48 8C56 8 62 16 62 16"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>

    <!-- 滚动指示器 -->
    <div class="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 manifesto-fade-in delay-13"
         :class="{ 'is-visible': isVisible }"
         aria-hidden="true">
      <div class="w-5 md:w-6 h-8 md:h-10 border-2 border-manifesto-scroll-indicator rounded-full flex justify-center">
        <div class="w-0.5 md:w-1 h-2 md:h-3 bg-manifesto-scroll-dot rounded-full mt-1.5 md:mt-2 animate-scroll-hint"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)

const seals = [
  { char: '剪', label: '剪影' },
  { char: '纸', label: '纸韵' },
  { char: '匠', label: '匠心' },
  { char: '心', label: '心意' }
]

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -5% 0px'
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* ===== 语义化颜色令牌 ===== */
.bg-manifesto-bg {
  background: linear-gradient(to bottom, #FAF5EF, #F5EFE6, #FAF5EF);
}

.bg-manifesto-glow-left {
  background: linear-gradient(to right, #DEB887, transparent);
}

.bg-manifesto-glow-right {
  background: linear-gradient(to left, #D2B48C, transparent);
}

.bg-manifesto-glow-center {
  background: linear-gradient(to right, #F5DEB3, #DEB887, #F5DEB3);
}

.text-manifesto-primary {
  color: #5D4037;
}

.text-manifesto-secondary {
  color: #795548;
}

.text-manifesto-label {
  color: #A0522D;
}

.text-manifesto-label-bg {
  background: rgba(184, 134, 11, 0.1);
}

.text-manifesto-footer {
  color: #795548;
}

.text-manifesto-footer-sub {
  color: #8D6E63;
}

.border-manifesto-border {
  border-color: rgba(184, 134, 11, 0.3);
}

.border-manifesto-seal {
  border-color: #B8860B;
}

.border-manifesto-seal-inner {
  border-color: rgba(184, 134, 11, 0.5);
}

.text-manifesto-seal-text {
  color: #8B4513;
}

.text-manifesto-accent {
  color: #B8860B;
}

.bg-manifesto-accent {
  background-color: #B8860B;
}

.bg-manifesto-divider {
  background: linear-gradient(to right, transparent, rgba(184, 134, 11, 0.5));
}

.border-manifesto-scroll-indicator {
  border-color: #B8860B;
}

.bg-manifesto-scroll-dot {
  background-color: #8B4513;
}

.manifesto-gradient-text {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #8B4513 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ===== 标题尺寸 - 移动端优先 ===== */
.manifesto-heading-text {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 5vw, 4.5rem);
  line-height: 1.3;
  letter-spacing: 0.02em;
}

/* ===== 动画系统 - 统一时长 300ms ===== */
.manifesto-fade-in {
  opacity: 0;
  transition: opacity 300ms ease-out;
}

.manifesto-slide-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

/* 延迟序列 - 紧凑化：总时长 ~1.2s */
.delay-1 { transition-delay: 100ms; }
.delay-2 { transition-delay: 200ms; }
.delay-3 { transition-delay: 300ms; }
.delay-4 { transition-delay: 400ms; }
.delay-5 { transition-delay: 500ms; }
.delay-6 { transition-delay: 600ms; }
.delay-7 { transition-delay: calc(var(--seal-delay, 7) * 100ms); }
.delay-8 { transition-delay: calc(var(--seal-delay, 8) * 100ms); }
.delay-9 { transition-delay: calc(var(--seal-delay, 9) * 100ms); }
.delay-10 { transition-delay: calc(var(--seal-delay, 10) * 100ms); }
.delay-11 { transition-delay: 1000ms; }
.delay-12 { transition-delay: 1100ms; }
.delay-13 { transition-delay: 1200ms; }

.is-visible {
  opacity: 1;
}

.is-visible.manifesto-slide-up {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 印章交互 - 圆形篆刻图标 ===== */
.seal-frame {
  transition: border-color 250ms ease-out, transform 250ms ease-out;
}

.seal-group:hover .seal-frame,
.seal-group:focus-within .seal-frame {
  border-color: #A0522D;
  transform: scale(1.05);
}

.seal-group .font-serif {
  transition: color 250ms ease-out;
}

.seal-group:hover .font-serif,
.seal-group:focus-within .font-serif {
  color: #A0522D;
}

/* ===== 滚动指示器 ===== */
@keyframes scroll-hint {
  0%, 100% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0.3;
    transform: translateY(6px);
  }
}

.animate-scroll-hint {
  animation: scroll-hint 2s ease-in-out infinite;
}

/* ===== 无障碍：尊重用户动画偏好 ===== */
@media (prefers-reduced-motion: reduce) {
  .animate-scroll-hint {
    animation: none;
  }

  .manifesto-fade-in,
  .manifesto-slide-up {
    transition-duration: 0ms !important;
    transition-delay: 0ms !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .seal-frame {
    transition-duration: 0ms !important;
  }
}

/* ===== 移动端高度优化 ===== */
@media (max-width: 767px) {
  .manifesto-section {
    min-height: auto;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

@media (min-width: 768px) {
  .manifesto-section {
    min-height: 100vh;
    min-height: 100dvh;
  }
}
</style>
