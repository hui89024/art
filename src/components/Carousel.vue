<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import heroBg from '@/assets/wtre.jpg'

const router = useRouter()

const isVisible = ref(false)
const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.pageYOffset
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
    <div class="absolute inset-0 z-0">
      <!-- Hero background image -->
      <img :src="heroBg" 
           class="w-full h-full object-cover brightness-[0.6] parallax-bg" alt="Hero Background"
           :style="{ transform: `translateY(${scrollY * 0.4}px)` }">
      <!-- Gradient overlay to blend with black background at the bottom -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#2f3a32]/20 to-[#2a3a32]/45"></div>
    </div>
    
    <div class="relative z-10 text-center w-full px-6 flex flex-col items-center mt-20">
      <p class="text-[#96AD92] text-[12px] uppercase tracking-[0.4em] font-bold mb-6 transition-all duration-1000 ease-out"
         :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
        剪纸工艺 — 始于 2026
      </p>
      
      <h1 class="text-[6rem] sm:text-[8rem] md:text-[12rem] leading-none font-sans font-medium text-[#f7f6f2] tracking-tight transition-all duration-1000 ease-out delay-100" 
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
        剪艺
      </h1>
      
      <p class="mt-6 md:mt-10 text-sm md:text-base text-white/90 font-medium tracking-[0.1em] transition-opacity duration-1500 delay-500"
         :class="isVisible ? 'opacity-100' : 'opacity-0'">
        以刀为笔，以纸为魂。千年非遗，焕发新生。
      </p>
      
      <div class="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 transition-opacity duration-1000 delay-700"
           :class="isVisible ? 'opacity-100' : 'opacity-0'">
        <button @click="router.push('/collectibles')" class="bg-[#96AD92] text-[#0a0a0a] px-10 py-4 rounded-[2px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-[#7d9679] transition-all">
          探索作品
        </button>
        <button @click="router.push('/#technology')" class="border border-[#96AD92]/30 text-[#96AD92] bg-transparent backdrop-blur-sm px-10 py-4 rounded-[2px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-[#96AD92]/10 transition-all">
          我们的故事
        </button>
      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1000"
         :class="isVisible ? 'opacity-100' : 'opacity-0'">
      <span class="text-[13px] uppercase tracking-[0.3em] text-[#9aaba0] font-bold">Scroll</span>
      <ChevronDown class="text-[#9aaba0] w-4 h-4 animate-bounce" />
    </div>
  </section>
</template>