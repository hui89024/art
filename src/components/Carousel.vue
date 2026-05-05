<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'
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
  <section class="relative h-[100svh] min-h-[720px] overflow-hidden">
    <img
      :src="heroBg"
      class="absolute inset-0 w-full h-full object-cover"
      alt=""
      :style="{ transform: `translateY(${scrollY * 0.4}px)` }"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/55" />
    <div class="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 pt-36">
      <p
        class="text-xs tracking-[0.3em] uppercase text-white/70 transition-all duration-1000 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        剪艺 · 非遗数字化
      </p>
      <h1
        class="mt-4 text-white text-6xl md:text-7xl lg:text-8xl tracking-tight transition-all duration-1000 ease-out delay-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
      >
        第一眼就惊艳
      </h1>
      <p
        class="mt-6 max-w-xl text-white/80 text-sm md:text-base leading-relaxed transition-opacity duration-1000 delay-200"
        :class="isVisible ? 'opacity-100' : 'opacity-0'"
      >
        以现代视觉重构传统剪纸表达。
      </p>
      <div
        class="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 transition-all duration-1000 delay-300"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <button
          @click="router.push('/collectibles')"
          class="bg-white text-ink-black px-10 py-4 rounded-[2px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-white/90 transition-all"
        >
          探索作品
        </button>
        <button
          @click="router.push('/#technology')"
          class="border border-white/30 text-white bg-transparent backdrop-blur-sm px-10 py-4 rounded-[2px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-all"
        >
          我们的故事
        </button>
      </div>
    </div>

    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1000"
      :class="isVisible ? 'opacity-100' : 'opacity-0'"
    >
      <span class="text-[13px] uppercase tracking-[0.3em] text-white/50 font-bold">向下滑动</span>
      <PhCaretDown class="text-white/50 w-4 h-4 animate-bounce" />
    </div>
  </section>
</template>
