<script setup>
import { ref } from 'vue'
import { X, Loader2, AlertCircle } from 'lucide-vue-next'
import { loginWithPassword } from '../services/authService'

defineProps({})

const emit = defineEmits(['close', 'login-success'])

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMsg.value = '请输入用户名和密码'
    return
  }
  
  loading.value = true
  errorMsg.value = ''
  
  const result = await loginWithPassword({ username: username.value, password: password.value })
  
  loading.value = false
  
  if (result.ok) {
    emit('login-success')
    emit('close')
    username.value = ''
    password.value = ''
  } else {
    errorMsg.value = result.message
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="emit('close')"></div>
    
    <!-- Modal Content -->
    <div class="relative w-full max-w-md bg-evasion-stone border border-evasion-sand/35 rounded-2xl shadow-2xl overflow-hidden shadow-black/40">
      <!-- Top decorative bar -->
      <div class="h-2 w-full bg-gradient-to-r from-evasion-sand-dark via-evasion-sand to-evasion-sand-dark"></div>
      
      <button @click="emit('close')" class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
        <X class="w-6 h-6" />
      </button>
      
      <div class="p-8">
        <h2 class="text-2xl font-bold text-white mb-2 text-center">欢迎回来</h2>
        <p class="text-white/60 text-center text-sm mb-8">请登录以探索更多剪艺珍品</p>
        
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-white/80 mb-1">用户名</label>
            <input 
              v-model="username" 
              type="text" 
              class="w-full bg-evasion-grey border border-evasion-sand/35 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-evasion-sand focus:ring-1 focus:ring-evasion-sand/70 transition-all placeholder-white/30"
              placeholder="输入用户名"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-white/80 mb-1">密码</label>
            <input 
              v-model="password" 
              type="password" 
              class="w-full bg-evasion-grey border border-evasion-sand/35 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-evasion-sand focus:ring-1 focus:ring-evasion-sand/70 transition-all placeholder-white/30"
              placeholder="输入密码"
            />
          </div>
          
          <div v-if="errorMsg" class="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
            <AlertCircle class="w-4 h-4 flex-shrink-0" />
            <p>{{ errorMsg }}</p>
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-3.5 mt-2 bg-gradient-to-r from-evasion-sand-dark to-evasion-sand hover:from-evasion-sand hover:to-evasion-sand-dark text-evasion-black rounded-xl font-bold tracking-wide shadow-lg shadow-black/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Loader2 v-if="loading" class="w-5 h-5 animate-spin mr-2" />
            {{ loading ? '登录中...' : '登 录' }}
          </button>
        </form>
        
        <div class="mt-8 pt-6 border-t border-evasion-sand/25 text-center">
          <p class="text-sm text-white/70 mb-2">还没有账号？请在此网站注册：</p>
          <a href="https://nwiexwzoxsyb.sealosbja.site" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/80 text-sm font-medium border-b border-white/30 hover:border-white transition-colors">
            https://nwiexwzoxsyb.sealosbja.site
          </a>
        </div>
      </div>
    </div>
  </div>
</template>