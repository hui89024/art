<template>
  <div class="group relative bg-white rounded-2xl overflow-hidden
              border-4 border-red-200 hover:border-red-500
              shadow-xl shadow-red-100/50 hover:shadow-2xl hover:shadow-red-300/50
              transition-all duration-500 hover:-translate-y-4 hover:scale-105">

    <!-- 顶部装饰带 -->
    <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>

    <!-- 图片容器 -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-red-50 to-amber-50 flex justify-center items-center p-8">

      <!-- 背景装饰圆环 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-48 h-48 border-2 border-red-200/50 rounded-full animate-spin-slow"></div>
        <div class="absolute w-40 h-40 border-2 border-amber-200/50 rounded-full animate-spin-slow" style="animation-direction: reverse; animation-duration: 15s;"></div>
      </div>

      <!-- 四角中式窗格装饰 -->
      <div class="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-red-400/50"></div>
      <div class="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-red-400/50"></div>
      <div class="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-red-400/50"></div>
      <div class="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-red-400/50"></div>

      <img :src="image"
           class="relative z-10 w-full h-full object-contain filter brightness-110
                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-700"
           :alt="title">

      <!-- 悬浮时的光芒效果 -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  transform -translate-x-full group-hover:translate-x-full"
           style="transition: transform 1.5s ease-in-out;"></div>
    </div>

    <!-- 内容区域 -->
    <div class="relative p-8 bg-gradient-to-br from-white to-red-50/30">

      <!-- 系列标签（中式印章样式） -->
      <div class="mb-6 inline-flex items-center gap-2">
        <div class="relative px-4 py-2 border-3 border-red-600 bg-red-50
                    transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
          <span class="relative z-10 text-red-700 text-xs font-bold tracking-wider">
            {{ series }}
          </span>
          <!-- 印章纹理 -->
          <div class="absolute inset-0 opacity-20"
               style="background-image: repeating-linear-gradient(45deg, transparent, transparent 3px, currentColor 3px, currentColor 6px); color: #DC2626;">
          </div>
        </div>
      </div>

      <!-- 标题行 -->
      <div class="flex justify-between items-start mb-4">
        <h4 class="font-display text-3xl font-bold text-red-800 tracking-wide
                   group-hover:text-red-600 transition-colors">
          {{ title }}
        </h4>
        <div class="flex-shrink-0 ml-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-amber-500
                      flex items-center justify-center text-white text-xl
                      group-hover:scale-125 group-hover:rotate-90 transition-all duration-500
                      shadow-lg shadow-red-300/50">
            ↗
          </div>
        </div>
      </div>

      <!-- 描述 -->
      <p class="text-red-900/70 text-sm leading-relaxed mb-8">
        {{ description }}
      </p>

      <!-- 底部装饰线和按钮 -->
      <div class="relative">
        <!-- 中式云纹分隔线 -->
        <div class="flex items-center gap-2 mb-6">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
          <div class="w-2 h-2 bg-red-500 rotate-45"></div>
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
        </div>

        <button @click="handleClick"
                class="group/btn relative w-full px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600
                       text-white font-bold text-sm uppercase tracking-widest
                       overflow-hidden shadow-lg shadow-red-300/50
                       hover:shadow-xl hover:shadow-red-400/50
                       transition-all duration-300">
          <span class="relative z-10 flex items-center justify-center gap-2">
            查看详情
            <svg class="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </span>
          <!-- 按钮光芒扫过 -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                      transform -translate-x-full group-hover/btn:translate-x-full
                      transition-transform duration-1000"></div>
        </button>
      </div>
    </div>

    <!-- 卡片四角装饰点（悬浮时出现） -->
    <div class="absolute -top-2 -left-2 w-4 h-4 bg-red-600 rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
    <div class="absolute -top-2 -right-2 w-4 h-4 bg-amber-600 rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style="animation-delay: 0.1s;"></div>
    <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-600 rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style="animation-delay: 0.2s;"></div>
    <div class="absolute -bottom-2 -right-2 w-4 h-4 bg-red-600 rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style="animation-delay: 0.3s;"></div>

  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  series: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* 响应式优化 */
@media (prefers-reduced-motion: reduce) {
  .group:hover {
    transform: translateY(-8px) scale(1.02);
  }

  .animate-spin-slow {
    animation: none;
  }
}
</style>
