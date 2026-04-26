<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getStoredAuth, clearAuth } from '../services/authService'
import LoginModal from './LoginModal.vue'
import { useAnimate } from '@/composables/useAnimate.js'
import { DURATION, STAGGER_DELAY, EASING } from '@/composables/anime.config.js'
import { animate } from 'animejs'

const route = useRoute()
const showLogin = ref(false)
const auth = ref({ token: '', username: '' })
const isScrolled = ref(false)
const navLinksRef = ref(null)
const mobileMenuOpen = ref(false)
const { staggerIn } = useAnimate()

const isDarkTheme = computed(() => isScrolled.value || route.path !== '/')

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
  await nextTick()
  if (navLinksRef.value && navLinksRef.value.offsetParent !== null) {
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
  <nav
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-porcelain-white/90 backdrop-blur-xl border-b border-ink-black/8'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-[1440px] mx-auto h-18 px-6 lg:px-10 flex items-center justify-between">
      <!-- 左：品牌 -->
      <RouterLink to="/" class="flex items-center gap-3 group shrink-0">
        <img src="@/assets/配色版矢量（标准）.svg" alt="剪艺标志" class="w-8 h-8 object-contain transition-transform duration-500 group-hover:rotate-[15deg]">
        <span
          :class="[
            'text-xl font-medium tracking-[0.3em] transition-colors duration-300',
            isScrolled ? 'text-ink-black' : 'text-white'
          ]"
        >剪艺</span>
      </RouterLink>

      <!-- 中：主导航（桌面端） -->
      <div
        ref="navLinksRef"
        :class="[
          'hidden lg:flex items-center space-x-10 text-sm uppercase tracking-[0.2em] font-bold transition-colors duration-300',
          isScrolled ? 'text-jade-gray' : 'text-white/90'
        ]"
      >
        <div class="relative group">
          <RouterLink to="/" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-ink-black' : 'hover:text-white']" :active-class="isScrolled ? 'text-ink-black' : 'text-white'">
            首页
            <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </RouterLink>
        </div>

        <div class="relative group">
          <RouterLink to="/collectibles" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-ink-black' : 'hover:text-white']" :active-class="isScrolled ? 'text-ink-black' : 'text-white'">
            经典展厅
            <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </RouterLink>
        </div>

        <div class="relative group">
          <RouterLink to="/events" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-ink-black' : 'hover:text-white']" :active-class="isScrolled ? 'text-ink-black' : 'text-white'">
            特色活动
            <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </RouterLink>
        </div>

        <div class="relative group">
          <RouterLink to="/app" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-ink-black' : 'hover:text-white']" :active-class="isScrolled ? 'text-ink-black' : 'text-white'">
            剪艺APP
            <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </RouterLink>
        </div>

        <div v-if="auth.token" class="relative group">
          <RouterLink to="/pattern-library" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-ink-black' : 'hover:text-white']" :active-class="isScrolled ? 'text-ink-black' : 'text-white'">
            在线纹样库
            <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </RouterLink>
        </div>

        <div class="relative group">
          <RouterLink to="/contact" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-ink-black' : 'hover:text-white']" :active-class="isScrolled ? 'text-ink-black' : 'text-white'">
            联系我们
            <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </RouterLink>
        </div>
      </div>

      <!-- 右：登录态动作 -->
      <div class="flex items-center gap-6">
        <template v-if="auth.token">
          <span class="hidden sm:inline text-sm text-jade-gray font-medium tracking-[0.05em]">
            {{ auth.username }}
          </span>
          <button
            @click="handleLogout"
            :class="[
              'text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300',
              isScrolled ? 'text-jade-gray hover:text-brand-red' : 'text-white/80 hover:text-white'
            ]"
          >
            登出
          </button>
        </template>
        <template v-else>
          <button
            @click="showLogin = true"
            class="bg-ink-black text-white px-6 py-3 rounded-[2px] text-sm font-bold uppercase tracking-[0.15em] hover:bg-ink-black/80 transition-colors"
          >
            立即探索
          </button>
        </template>

        <!-- 移动端菜单按钮 -->
        <button
          class="lg:hidden flex flex-col gap-1.5 p-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :class="isScrolled ? 'text-ink-black' : 'text-white'"
          aria-label="菜单"
        >
          <span class="block w-5 h-[2px] bg-current transition-all duration-300" :class="mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''"></span>
          <span class="block w-5 h-[2px] bg-current transition-all duration-300" :class="mobileMenuOpen ? 'opacity-0' : ''"></span>
          <span class="block w-5 h-[2px] bg-current transition-all duration-300" :class="mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''"></span>
        </button>
      </div>
    </div>

    <!-- 移动端菜单面板 -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[600px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-[600px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden overflow-hidden bg-porcelain-white/95 backdrop-blur-xl border-b border-ink-black/8"
      >
        <div class="px-6 py-6 flex flex-col gap-4">
          <RouterLink to="/" class="text-sm uppercase tracking-[0.2em] font-bold text-ink-black py-2" @click="mobileMenuOpen = false">首页</RouterLink>
          <RouterLink to="/collectibles" class="text-sm uppercase tracking-[0.2em] font-bold text-jade-gray py-2" @click="mobileMenuOpen = false">经典展厅</RouterLink>
          <RouterLink to="/events" class="text-sm uppercase tracking-[0.2em] font-bold text-jade-gray py-2" @click="mobileMenuOpen = false">特色活动</RouterLink>
          <RouterLink to="/app" class="text-sm uppercase tracking-[0.2em] font-bold text-jade-gray py-2" @click="mobileMenuOpen = false">剪艺APP</RouterLink>
          <RouterLink v-if="auth.token" to="/pattern-library" class="text-sm uppercase tracking-[0.2em] font-bold text-jade-gray py-2" @click="mobileMenuOpen = false">在线纹样库</RouterLink>
          <RouterLink to="/contact" class="text-sm uppercase tracking-[0.2em] font-bold text-jade-gray py-2" @click="mobileMenuOpen = false">联系我们</RouterLink>
        </div>
      </div>
    </Transition>
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
