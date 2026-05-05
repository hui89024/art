<template>
  <div class="mb-20">
    <!-- 顶部装饰：中式云纹 -->
    <div class="flex items-center justify-center gap-4 mb-8 animate-fade-in">
      <svg class="w-20 h-10 text-red-500/60" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 20C2 20 10 10 20 10C30 10 35 20 40 20C45 20 50 10 60 10C70 10 78 20 78 20"
              stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M2 25C2 25 10 15 20 15C30 15 35 25 40 25C45 25 50 15 60 15C70 15 78 25 78 25"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      </svg>
      <div class="relative w-6 h-6">
        <div class="absolute inset-0 border-3 border-red-600 rotate-45 animate-spin-slow"></div>
        <div class="absolute inset-1 w-4 h-4 bg-amber-500 rounded-full animate-pulse"></div>
      </div>
      <svg class="w-20 h-10 text-red-500/60 scale-x-[-1]" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 20C2 20 10 10 20 10C30 10 35 20 40 20C45 20 50 10 60 10C70 10 78 20 78 20"
              stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M2 25C2 25 10 15 20 15C30 15 35 25 40 25C45 25 50 15 60 15C70 15 78 25 78 25"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>

    <!-- 小标题 -->
    <div class="flex items-center justify-center gap-4 mb-8 animate-fade-in-up">
      <div class="w-16 h-px bg-gradient-to-r from-transparent to-red-500"></div>
      <h3 class="text-red-600 text-sm font-bold uppercase tracking-[0.4em] px-4 py-2
                 border-2 border-red-300 bg-red-50/50 backdrop-blur-sm">
        {{ kicker }}
      </h3>
      <div class="w-16 h-px bg-gradient-to-l from-transparent to-red-500"></div>
    </div>

    <!-- 主标题 -->
    <div class="text-center animate-scale-in">
      <h2 class="font-serif text-5xl md:text-7xl font-bold text-red-800 mb-8
                 leading-tight tracking-wide">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="text-red-900/70 text-lg leading-relaxed max-w-3xl mx-auto">
        {{ subtitle }}
      </p>
    </div>

    <!-- 底部装饰：印章（可选） -->
    <div v-if="showSeal" class="flex justify-center mt-12 animate-bounce-slow">
      <div class="relative w-24 h-24">
        <div class="absolute inset-0 border-4 border-red-600 rotate-45 animate-spin-slow"></div>
        <div class="absolute inset-2 border-2 border-red-600 rotate-45"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="font-serif text-red-600 text-lg font-bold">
            {{ sealText || '剪艺' }}
          </span>
        </div>
        <!-- 印章光晕 -->
        <div class="absolute inset-0 border-4 border-red-600 rotate-45 animate-ping opacity-20"></div>
      </div>
    </div>

    <!-- 底部装饰线 -->
    <div class="flex items-center justify-center gap-3 mt-12 animate-fade-in">
      <div class="w-3 h-3 bg-red-600 rotate-45 animate-pulse"></div>
      <div class="flex-1 max-w-md h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
      <div class="text-amber-600 text-2xl animate-bounce-slow">✦</div>
      <div class="flex-1 max-w-md h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
      <div class="w-3 h-3 bg-red-600 rotate-45 animate-pulse" style="animation-delay: 0.5s;"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  kicker: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  showSeal: {
    type: Boolean,
    default: false
  },
  sealText: {
    type: String,
    default: '剪艺'
  }
})
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animate-scale-in {
  animation: scale-in 1s ease-out;
}
</style>
