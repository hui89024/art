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
    ref="navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
    :class="[
      isScrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-red-900/10 shadow-lg'
        : 'bg-gradient-to-b from-red-900/80 via-red-900/60 to-transparent backdrop-blur-md'
    ]"
  >
    <div class="max-w-[1440px] mx-auto h-18 px-6 lg:px-10 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3 group shrink-0">
        <img src="@/assets/配色版矢量（标准）.svg" alt="剪艺标志" class="w-8 h-8 object-contain transition-transform duration-500 group-hover:rotate-[15deg]">
        <span
          :class="[
            'text-xl font-medium tracking-[0.3em] transition-colors duration-300',
            isScrolled ? 'text-red-900' : 'text-white drop-shadow-lg'
          ]"
        >
          剪艺
        </span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div
        :class="[
          'hidden lg:flex items-center space-x-10 text-sm uppercase tracking-[0.2em] font-bold transition-colors duration-300',
          isScrolled ? 'text-red-800/80' : 'text-white/95 drop-shadow-md'
        ]"
      >
        <div class="relative group">
          <RouterLink to="/" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-red-600' : 'hover:text-amber-200']" :active-class="isScrolled ? 'text-red-600' : 'text-amber-200'">
            首页
            <span :class="['absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full', isScrolled ? 'bg-red-600' : 'bg-amber-200']"></span>
          </RouterLink>
        </div>

        <div class="relative group">
          <RouterLink to="/collectibles" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-red-600' : 'hover:text-amber-200']" :active-class="isScrolled ? 'text-red-600' : 'text-amber-200'">
            藏品
            <span :class="['absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full', isScrolled ? 'bg-red-600' : 'bg-amber-200']"></span>
          </RouterLink>
        </div>

        <div class="relative group">
          <RouterLink to="/events" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-red-600' : 'hover:text-amber-200']" :active-class="isScrolled ? 'text-red-600' : 'text-amber-200'">
            活动
            <span :class="['absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full', isScrolled ? 'bg-red-600' : 'bg-amber-200']"></span>
          </RouterLink>
        </div>

        <div class="relative group">
          <RouterLink to="/app" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-red-600' : 'hover:text-amber-200']" :active-class="isScrolled ? 'text-red-600' : 'text-amber-200'">
            应用
            <span :class="['absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full', isScrolled ? 'bg-red-600' : 'bg-amber-200']"></span>
          </RouterLink>
        </div>

        <div v-if="auth.token" class="relative group">
          <RouterLink to="/pattern-library" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-red-600' : 'hover:text-amber-200']" :active-class="isScrolled ? 'text-red-600' : 'text-amber-200'">
            纹样库
            <span :class="['absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full', isScrolled ? 'bg-red-600' : 'bg-amber-200']"></span>
          </RouterLink>
        </div>

        <div class="relative group">
          <RouterLink to="/contact" :class="['relative py-2 transition-colors', isScrolled ? 'hover:text-red-600' : 'hover:text-amber-200']" :active-class="isScrolled ? 'text-red-600' : 'text-amber-200'">
            联系
            <span :class="['absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full', isScrolled ? 'bg-red-600' : 'bg-amber-200']"></span>
          </RouterLink>
        </div>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-4">
        <!-- Login/Logout Button -->
        <button
          v-if="!auth.token"
          @click="openLoginModal"
          :class="[
            'hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300',
            isScrolled
              ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:shadow-lg hover:shadow-red-500/30 hover:scale-105'
              : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:border-white/50'
          ]"
        >
          <User :size="16" />
          登录
        </button>

        <button
          v-else
          @click="handleLogout"
          :class="[
            'hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300',
            isScrolled
              ? 'bg-red-50 text-red-700 hover:bg-red-100'
              : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:border-white/50'
          ]"
        >
          <LogOut :size="16" />
          登出
        </button>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          :class="[
            'lg:hidden p-2 rounded-lg transition-colors duration-300',
            isScrolled ? 'text-red-900 hover:bg-red-50' : 'text-white hover:bg-white/20'
          ]"
          aria-label="菜单"
        >
          <Menu v-if="!isMobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      @enter="onMobileMenuEnter"
      @leave="onMobileMenuLeave"
      :css="false"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden border-t"
        :class="[
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-red-900/10'
            : 'bg-red-900/90 backdrop-blur-md border-white/10'
        ]"
      >
        <div class="max-w-[1440px] mx-auto px-6 py-6 space-y-4">
          <RouterLink
            to="/"
            @click="closeMobileMenu"
            :class="[
              'block py-3 px-4 rounded-lg font-medium transition-colors',
              isScrolled
                ? 'text-red-900 hover:bg-red-50 active:bg-red-100'
                : 'text-white hover:bg-white/10 active:bg-white/20'
            ]"
          >
            首页
          </RouterLink>

          <RouterLink
            to="/collectibles"
            @click="closeMobileMenu"
            :class="[
              'block py-3 px-4 rounded-lg font-medium transition-colors',
              isScrolled
                ? 'text-red-900 hover:bg-red-50 active:bg-red-100'
                : 'text-white hover:bg-white/10 active:bg-white/20'
            ]"
          >
            藏品
          </RouterLink>

          <RouterLink
            to="/events"
            @click="closeMobileMenu"
            :class="[
              'block py-3 px-4 rounded-lg font-medium transition-colors',
              isScrolled
                ? 'text-red-900 hover:bg-red-50 active:bg-red-100'
                : 'text-white hover:bg-white/10 active:bg-white/20'
            ]"
          >
            活动
          </RouterLink>

          <RouterLink
            to="/app"
            @click="closeMobileMenu"
            :class="[
              'block py-3 px-4 rounded-lg font-medium transition-colors',
              isScrolled
                ? 'text-red-900 hover:bg-red-50 active:bg-red-100'
                : 'text-white hover:bg-white/10 active:bg-white/20'
            ]"
          >
            应用
          </RouterLink>

          <RouterLink
            v-if="auth.token"
            to="/pattern-library"
            @click="closeMobileMenu"
            :class="[
              'block py-3 px-4 rounded-lg font-medium transition-colors',
              isScrolled
                ? 'text-red-900 hover:bg-red-50 active:bg-red-100'
                : 'text-white hover:bg-white/10 active:bg-white/20'
            ]"
          >
            纹样库
          </RouterLink>

          <RouterLink
            to="/contact"
            @click="closeMobileMenu"
            :class="[
              'block py-3 px-4 rounded-lg font-medium transition-colors',
              isScrolled
                ? 'text-red-900 hover:bg-red-50 active:bg-red-100'
                : 'text-white hover:bg-white/10 active:bg-white/20'
            ]"
          >
            联系
          </RouterLink>

          <div class="pt-4 border-t" :class="[isScrolled ? 'border-red-900/10' : 'border-white/10']">
            <button
              v-if="!auth.token"
              @click="openLoginModal"
              :class="[
                'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300',
                isScrolled
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:shadow-lg'
                  : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
              ]"
            >
              <User :size="18" />
              登录
            </button>

            <button
              v-else
              @click="handleLogout"
              :class="[
                'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors',
                isScrolled
                  ? 'bg-red-50 text-red-700 hover:bg-red-100'
                  : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
              ]"
            >
              <LogOut :size="18" />
              登出
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Scoped styles removed in favor of global glass-nav */
</style>
