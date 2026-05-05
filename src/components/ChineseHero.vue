<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">

    <!-- 动态背景层1：大型剪纸图案旋转 -->
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="i in 3" :key="`pattern-${i}`"
           class="absolute opacity-10 animate-spin-slow"
           :style="{
             width: `${400 + i * 200}px`,
             height: `${400 + i * 200}px`,
             left: `${20 * i}%`,
             top: `${10 * i}%`,
             animationDuration: `${40 + i * 20}s`,
             animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
           }">
        <img :src="`/src/assets/窗花${String(17 + (i % 3)).padStart(3, '0')}.png`"
             class="w-full h-full object-contain filter brightness-110"
             alt="">
      </div>
    </div>

    <!-- 动态背景层2：飘落的剪纸碎片 -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 30" :key="`particle-${i}`"
           class="absolute animate-fall"
           :style="{
             left: `${Math.random() * 100}%`,
             top: `-${Math.random() * 20}%`,
             width: `${20 + Math.random() * 40}px`,
             height: `${20 + Math.random() * 40}px`,
             animationDelay: `${Math.random() * 10}s`,
             animationDuration: `${10 + Math.random() * 10}s`,
             opacity: 0.3 + Math.random() * 0.3
           }">
        <img :src="`/src/assets/窗花${String(17 + (i % 3)).padStart(3, '0')}.png`"
             class="w-full h-full object-contain"
             :style="{
               filter: `hue-rotate(${Math.random() * 60}deg) brightness(1.2)`
             }"
             alt="">
      </div>
    </div>

    <!-- 动态背景层3：光晕脉冲 -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-300/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
    </div>

    <!-- 主内容层 -->
    <div ref="contentLayer" class="relative z-10 text-center px-6 max-w-6xl mx-auto">

      <!-- 顶部装饰：中国结图案 -->
      <div class="flex items-center justify-center gap-6 mb-12 animate-fade-in">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 border-4 border-red-600 rotate-45 animate-spin-slow" style="animation-duration: 20s;"></div>
          <div class="absolute inset-2 border-2 border-amber-600 rotate-45 animate-spin-slow" style="animation-duration: 15s; animation-direction: reverse;"></div>
          <div class="absolute inset-4 w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
        </div>
        <div class="h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-expand"></div>
        <div class="text-red-600 text-2xl animate-bounce-slow">✦</div>
        <div class="h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-expand"></div>
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 border-4 border-red-600 rotate-45 animate-spin-slow" style="animation-duration: 20s; animation-direction: reverse;"></div>
          <div class="absolute inset-2 border-2 border-amber-600 rotate-45 animate-spin-slow" style="animation-duration: 15s;"></div>
          <div class="absolute inset-4 w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- 主标题：超大书法字体 -->
      <img :src="logoSvg" alt="剪艺" class="w-64 md:w-[30rem] lg:w-[40rem] mt-32 mb-8 animate-scale-in"
         style="filter: drop-shadow(4px 4px 0px rgba(217, 119, 6, 0.3)) drop-shadow(8px 8px 0px rgba(217, 119, 6, 0.2)) drop-shadow(0 0 60px rgba(220, 38, 38, 0.4));">

      <!-- 副标题：带动画的文字 -->
      <div class="flex items-center justify-center gap-4 mb-6 animate-fade-in-up" style="animation-delay: 0.3s;">
        <div class="w-12 h-px bg-gradient-to-r from-transparent to-red-600"></div>
        <p class="font-serif text-3xl md:text-5xl text-amber-700 tracking-[0.3em]">
          纸间万象
        </p>
        <div class="w-2 h-2 bg-red-600 rotate-45 animate-pulse"></div>
        <p class="font-serif text-3xl md:text-5xl text-amber-700 tracking-[0.3em]">
          千年传承
        </p>
        <div class="w-12 h-px bg-gradient-to-l from-transparent to-red-600"></div>
      </div>

      <!-- 描述文字：逐字显示效果 -->
      <div class="text-red-900 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed space-y-2 animate-fade-in-up" style="animation-delay: 0.6s;">
        <p class="animate-slide-in-left">从刀工到像素，从窗花到屏幕</p>
        <p class="animate-slide-in-right" style="animation-delay: 0.8s;">每一刀镂空，都是对传统的致敬</p>
        <p class="animate-slide-in-left" style="animation-delay: 1s;">每一次创新，都是对未来的探索</p>
      </div>

      <!-- CTA按钮组：带涟漪效果 -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in-up" style="animation-delay: 1.2s;">
        <button @click="scrollToWorks"
                class="group relative px-12 py-5 bg-red-600 text-white font-bold
                       text-base tracking-widest uppercase overflow-hidden
                       shadow-2xl shadow-red-600/50 hover:shadow-red-600/70
                       transition-all duration-500 hover:scale-110 hover:-translate-y-1">
          <span class="relative z-10 flex items-center gap-3">
            探索作品
            <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </span>
          <!-- 涟漪效果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <!-- 光芒扫过 -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        <button @click="router.push('/pattern-library')"
                class="group relative px-12 py-5 border-4 border-red-600 text-red-600 font-bold
                       text-base tracking-widest uppercase overflow-hidden
                       bg-white/80 backdrop-blur-sm
                       transition-all duration-500 hover:scale-110 hover:-translate-y-1
                       hover:bg-red-600 hover:text-white hover:shadow-2xl hover:shadow-red-600/50">
          <span class="relative z-10">纹样宝库</span>
        </button>
      </div>

      <!-- 底部装饰：印章阵列 -->
      <div class="flex items-center justify-center gap-8 animate-fade-in" style="animation-delay: 1.5s;">
        <div v-for="i in 3" :key="`seal-${i}`"
             class="relative w-20 h-20 animate-bounce-slow"
             :style="{ animationDelay: `${i * 0.3}s` }">
          <div class="absolute inset-0 border-4 border-red-600 rotate-45"></div>
          <div class="absolute inset-2 border-2 border-red-600 rotate-45"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-serif text-red-600 text-sm font-bold">
              {{ ['匠', '心', '传'][i - 1] }}
            </span>
          </div>
        </div>
      </div>

      <!-- 滚动提示：更明显的动画 -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3
                  animate-bounce cursor-pointer" @click="scrollToWorks">
        <span class="text-red-600 text-sm tracking-widest font-bold">向下探索</span>
        <div class="relative">
          <svg class="w-8 h-8 text-red-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          <div class="absolute inset-0 w-8 h-8 text-red-600 animate-ping opacity-75">
            <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

    </div>

    <!-- 边角装饰：中式窗格 -->
    <div class="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-red-600/30 animate-fade-in"></div>
    <div class="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-red-600/30 animate-fade-in"></div>
    <div class="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-red-600/30 animate-fade-in"></div>
    <div class="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-red-600/30 animate-fade-in"></div>

  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logoSvg from '@/assets/1.svg'
import { useRouter } from 'vue-router'

const router = useRouter()
const contentLayer = ref(null)

const scrollToWorks = () => {
  const worksSection = document.querySelector('#works-section')
  if (worksSection) {
    worksSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 视差滚动效果
const handleScroll = () => {
  if (!contentLayer.value) return

  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  if (scrollY < windowHeight) {
    contentLayer.value.style.transform = `translateY(${scrollY * 0.2}px) scale(${1 - scrollY / windowHeight * 0.1})`
    contentLayer.value.style.opacity = 1 - (scrollY / windowHeight) * 0.7
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 自定义动画 */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes expand {
  0%, 100% {
    transform: scaleX(0.5);
    opacity: 0.5;
  }
  50% {
    transform: scaleX(1);
    opacity: 1;
  }
}

.animate-spin-slow {
  animation: spin-slow 40s linear infinite;
}

.animate-fall {
  animation: fall 15s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-slide-in-left {
  animation: slide-in-left 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.8s ease-out forwards;
}

.animate-expand {
  animation: expand 3s ease-in-out infinite;
}

/* 响应式：移动端简化动画 */
@media (max-width: 768px) {
  .animate-fall,
  .animate-spin-slow {
    animation: none;
  }
}

/* 无障碍：尊重用户偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
