<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getStoredAuth, clearAuth } from '../services/authService'
import LoginModal from './LoginModal.vue'

const router = useRouter()
const showLogin = ref(false)
const auth = ref({ token: '', username: '' })
const isScrolled = ref(false)

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

onMounted(() => {
  updateAuth()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleLogout = () => {
  clearAuth()
  updateAuth()
}
</script>

<template>
  <nav :class="['fixed top-0 w-full z-50 px-8 py-6 transition-all duration-300 border-b border-transparent', isScrolled ? 'bg-evasion-black border-white/5' : 'bg-transparent']">
    <div class="max-w-[1600px] mx-auto flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="text-xl font-medium tracking-[0.3em] text-[#e5e5e5] hover:text-white transition-colors">
        剪艺
      </RouterLink>

      <!-- Center Links -->
      <div class="hidden lg:flex items-center space-x-10 text-[10px] uppercase tracking-[0.2em] font-bold text-[#888888]">
        <RouterLink to="/" class="hover:text-white transition-colors" active-class="text-[#d2c4a7]">核心作品</RouterLink>
        <a href="#technology" class="hover:text-white transition-colors">工艺技法</a>
        <RouterLink to="/collectibles" class="hover:text-white transition-colors" active-class="text-[#d2c4a7]">经典展厅</RouterLink>
        <a href="#accessories" class="hover:text-white transition-colors">文创周边</a>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-6">
        <template v-if="auth.token">
          <button @click="handleLogout" class="text-[10px] font-bold uppercase tracking-[0.15em] text-[#888888] hover:text-white transition-colors">
            登出
          </button>
        </template>
        <template v-else>
          <button @click="showLogin = true" class="bg-[#D2C4A7] text-[#0a0a0a] px-6 py-3 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#b5a68a] transition-colors">
            立即探索
          </button>
        </template>
      </div>
    </div>
  </nav>

  <Teleport to="body">
    <LoginModal :is-open="showLogin" @close="showLogin = false" @login-success="updateAuth" />
  </Teleport>
</template>

<style scoped>
/* Scoped styles removed in favor of global glass-nav */
</style>