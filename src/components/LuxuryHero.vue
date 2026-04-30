<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-black">
    <!-- 背景层：传统纹样 -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-repeat opacity-30"
           style="background-image: url('/src/assets/窗花017.png'); background-size: 200px;">
      </div>
    </div>

    <!-- 视差背景渐变 -->
    <div ref="bgGradient" class="absolute inset-0 bg-luxury-radial"></div>

    <!-- 金色粒子层 -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 20" :key="i"
           class="absolute w-1 h-1 bg-luxury-gold-light rounded-full animate-float opacity-40"
           :style="{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 6}s`,
             animationDuration: `${6 + Math.random() * 4}s`
           }">
      </div>
    </div>

    <!-- 主内容层 -->
    <div ref="contentLayer" class="relative z-10 text-center px-6 max-w-5xl mx-auto">
      <!-- 装饰性顶部线条 -->
      <div class="flex items-center justify-center gap-4 mb-8">
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
        <div class="w-2 h-2 bg-luxury-gold rotate-45"></div>
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
      </div>

      <!-- 主标题 -->
      <h1 class="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-luxury-text mb-6
                 tracking-wider leading-tight"
          style="text-shadow: 0 0 40px rgba(212, 175, 55, 0.5), 0 0 80px rgba(212, 175, 55, 0.2);">
        剪艺
      </h1>

      <!-- 副标题 -->
      <p class="font-serif text-2xl md:text-4xl text-luxury-gold-light mb-4 tracking-widest">
        纸间万象 · 千年传承
      </p>

      <!-- 描述文字 -->
      <p class="text-luxury-text-muted text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
        从刀工到像素，从窗花到屏幕<br>
        每一刀镂空，都是对传统的致敬<br>
        每一次创新，都是对未来的探索
      </p>

      <!-- CTA按钮组 -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="scrollToWorks"
                class="group relative px-8 py-4 bg-luxury-gold text-luxury-black font-bold
                       text-sm tracking-widest uppercase overflow-hidden
                       transition-all duration-300 hover:shadow-luxury-glow">
          <span class="relative z-10">探索作品</span>
          <div class="absolute inset-0 bg-gold-shimmer opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 animate-shimmer"></div>
        </button>

        <button @click="router.push('/pattern-library')"
                class="px-8 py-4 border-2 border-luxury-gold text-luxury-gold font-bold
                       text-sm tracking-widest uppercase
                       transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-black">
          纹样宝库
        </button>
      </div>

      <!-- 装饰性底部线条 -->
      <div class="flex items-center justify-center gap-4 mt-16">
        <div class="w-24 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
        <div class="text-luxury-gold text-xs tracking-widest">非遗数字化</div>
        <div class="w-24 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
      </div>
    </div>

    <!-- 底部滚动提示 -->
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                animate-bounce cursor-pointer" @click="scrollToWorks">
      <span class="text-luxury-gold text-xs tracking-widest">向下探索</span>
      <svg class="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const bgGradient = ref(null)
const contentLayer = ref(null)

const scrollToWorks = () => {
  const worksSection = document.querySelector('#works-section')
  if (worksSection) {
    worksSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 视差滚动效果
const handleScroll = () => {
  if (!bgGradient.value || !contentLayer.value) return

  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  // 背景层慢速移动
  if (scrollY < windowHeight) {
    bgGradient.value.style.transform = `translateY(${scrollY * 0.3}px)`
    contentLayer.value.style.transform = `translateY(${scrollY * 0.15}px)`
    contentLayer.value.style.opacity = 1 - (scrollY / windowHeight) * 0.8
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
/* 确保粒子动画流畅 */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-bounce {
    animation: none;
  }
}
</style>
