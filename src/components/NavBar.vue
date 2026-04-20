<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { getStoredAuth, clearAuth } from '../services/authService'
import LoginModal from './LoginModal.vue'
import { useAnimate } from '@/composables/useAnimate.js'
import { DURATION, STAGGER_DELAY, EASING } from '@/composables/anime.config.js'
import { animate } from 'animejs'

const router = useRouter()
const route = useRoute()
const showLogin = ref(false)
const auth = ref({ token: '', username: '' })
const isScrolled = ref(false)
const navLinksRef = ref(null)
const { staggerIn } = useAnimate()

const isDarkTheme = computed(() => isScrolled.value || route.path === '/collectibles')

const updateAuth = () => {
  auth.value = getStoredAuth()
}

const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

onMounted(async () => {
  updateAuth()
  window.addEventListener('scroll', handleScroll)
  // 导航链接入场动画（等首帧绘制完成，且仅在桌面端容器可见时触发）
  await nextTick()
  if (navLinksRef.value && navLinksRef.value.offsetParent !== null) {
    // 预置初始透明，避免 FOAC（先可见后跳变）
    Array.from(navLinksRef.value.children).forEach(el => {
      el.style.opacity = '0'
    })
    staggerIn(navLinksRef, { delay: STAGGER_DELAY, duration: DURATION.base })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleLogout = () => {
  clearAuth()
  updateAuth()
}

function onModalEnter(el, done) {
  const box = el.querySelector('.relative.w-full')
  if (!box) { done(); return }
  let called = false
  const sd = () => { if (!called) { called = true; done() } }
  animate(box, {
    opacity: [0, 1],
    scale: [0.92, 1],
    duration: DURATION.base,
    ease: EASING,
    onComplete: sd
  })
  setTimeout(sd, DURATION.base + 50)
}

function onModalLeave(el, done) {
  const box = el.querySelector('.relative.w-full')
  if (!box) { done(); return }
  let called = false
  const sd = () => { if (!called) { called = true; done() } }
  animate(box, {
    opacity: [1, 0],
    scale: [1, 0.95],
    duration: DURATION.fast,
    ease: EASING,
    onComplete: sd
  })
  setTimeout(sd, DURATION.fast + 50)
}
</script>

<template>
  <nav :class="['fixed top-0 w-full z-50 px-8 py-6 transition-all duration-300 border-b border-transparent', isDarkTheme ? 'bg-[#f7f2e8]/90 border-[#d8cfbd]/70 backdrop-blur-md' : 'bg-transparent']">
    <div class="max-w-[1600px] mx-auto flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3 group">
        <img src="@/assets/配色版矢量（标准）.svg" alt="剪艺 Logo" class="w-8 h-8 object-contain transition-transform duration-500 group-hover:rotate-[15deg]">
        <span :class="['text-xl font-medium tracking-[0.3em] transition-colors duration-300', isDarkTheme ? 'text-[#2f3a32]' : 'text-white']">剪艺</span>
      </RouterLink>

      <!-- Center Links -->
      <div
        ref="navLinksRef"
        :class="['hidden lg:flex items-center space-x-10 text-sm uppercase tracking-[0.2em] font-bold transition-colors duration-300', isDarkTheme ? 'text-[#6b7b70]' : 'text-white/90']"
      >
        <RouterLink to="/" :class="['transition-colors', isDarkTheme ? 'hover:text-[#2f3a32]' : 'hover:text-white']" :active-class="isDarkTheme ? 'text-[#7d9679]' : 'text-white'">首页</RouterLink>
        <RouterLink to="/#technology" :class="['transition-colors', isDarkTheme ? 'hover:text-[#2f3a32]' : 'hover:text-white']">工艺技法</RouterLink>
        <RouterLink to="/collectibles" :class="['transition-colors', isDarkTheme ? 'hover:text-[#2f3a32]' : 'hover:text-white']" :active-class="isDarkTheme ? 'text-[#7d9679]' : 'text-white'">经典展厅</RouterLink>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-6">
        <template v-if="auth.token">
          <button @click="handleLogout" :class="['text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300', isDarkTheme ? 'text-[#6b7b70] hover:text-[#2f3a32]' : 'text-white/90 hover:text-white']">
            登出
          </button>
        </template>
        <template v-else>
          <button @click="showLogin = true" class="bg-[#96AD92] text-[#0a0a0a] px-6 py-3 rounded-[2px] text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#7d9679] transition-colors">
            立即探索
          </button>
        </template>
      </div>
    </div>
  </nav>

  <Teleport to="body">
    <Transition :css="false" @enter="onModalEnter" @leave="onModalLeave">
      <LoginModal v-if="showLogin" @close="showLogin = false" @login-success="updateAuth" />
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Scoped styles removed in favor of global glass-nav */
</style>