<template>
  <div class="relative py-20 flex items-center justify-center overflow-hidden" aria-hidden="true">

    <!-- 背景光晕 -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-96 h-32 bg-gradient-to-r from-transparent via-red-200/30 to-transparent blur-2xl"></div>
    </div>

    <!-- 中央装饰元素 -->
    <div class="relative flex items-center gap-8">

      <!-- 左侧云纹 -->
      <svg class="w-24 h-12 text-red-400/60 animate-float-left" viewBox="0 0 96 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 24C2 24 12 12 24 12C36 12 42 24 48 24C54 24 60 12 72 12C84 12 94 24 94 24"
              stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M2 30C2 30 12 18 24 18C36 18 42 30 48 30C54 30 60 18 72 18C84 18 94 30 94 30"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      </svg>

      <!-- 中央装饰组 -->
      <div class="flex items-center gap-6">
        <!-- 左侧菱形 -->
        <div class="relative w-4 h-4">
          <div class="absolute inset-0 bg-red-600 rotate-45 animate-pulse"></div>
          <div class="absolute inset-0 bg-red-600 rotate-45 animate-ping opacity-30"></div>
        </div>

        <!-- 中央印章 -->
        <div class="relative w-16 h-16 animate-bounce-slow">
          <div class="absolute inset-0 border-3 border-red-600 rotate-45 animate-spin-slow"></div>
          <div class="absolute inset-2 border-2 border-amber-600 rotate-45 animate-spin-slow" style="animation-direction: reverse; animation-duration: 15s;"></div>
          <div class="absolute inset-4 w-8 h-8 bg-gradient-to-br from-red-600 to-amber-600 rounded-full animate-pulse"></div>
        </div>

        <!-- 右侧菱形 -->
        <div class="relative w-4 h-4">
          <div class="absolute inset-0 bg-amber-600 rotate-45 animate-pulse" style="animation-delay: 0.5s;"></div>
          <div class="absolute inset-0 bg-amber-600 rotate-45 animate-ping opacity-30" style="animation-delay: 0.5s;"></div>
        </div>
      </div>

      <!-- 右侧云纹（镜像） -->
      <svg class="w-24 h-12 text-red-400/60 scale-x-[-1] animate-float-right" viewBox="0 0 96 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 24C2 24 12 12 24 12C36 12 42 24 48 24C54 24 60 12 72 12C84 12 94 24 94 24"
              stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M2 30C2 30 12 18 24 18C36 18 42 30 48 30C54 30 60 18 72 18C84 18 94 30 94 30"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>

    <!-- 延伸线条 -->
    <div class="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-red-300/40 to-transparent"></div>

    <!-- 装饰性小点 -->
    <div class="absolute left-1/4 top-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
    <div class="absolute right-1/4 top-1/2 w-2 h-2 bg-amber-500 rounded-full animate-pulse" style="animation-delay: 0.3s;"></div>
  </div>
</template>

<script setup>
// 纯装饰组件
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes float-left {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-10px) translateY(-5px); }
}

@keyframes float-right {
  0%, 100% { transform: translateX(0) translateY(0) scaleX(-1); }
  50% { transform: translateX(10px) translateY(-5px) scaleX(-1); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-float-left {
  animation: float-left 4s ease-in-out infinite;
}

.animate-float-right {
  animation: float-right 4s ease-in-out infinite;
}
</style>
