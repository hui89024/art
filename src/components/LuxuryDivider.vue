<template>
  <div class="relative py-16 flex items-center justify-center" aria-hidden="true">
    <!-- 中央装饰元素 -->
    <div class="flex items-center gap-6">
      <!-- 左侧云纹 -->
      <svg class="w-16 h-8 text-luxury-gold/40" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 16C2 16 8 8 16 8C24 8 28 16 32 16C36 16 40 8 48 8C56 8 62 16 62 16"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M2 20C2 20 8 12 16 12C24 12 28 20 32 20C36 20 40 12 48 12C56 12 62 20 62 20"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>

      <!-- 中央菱形 -->
      <div class="relative">
        <div class="w-3 h-3 bg-luxury-gold rotate-45"></div>
        <div class="absolute inset-0 w-3 h-3 bg-luxury-gold rotate-45 animate-glow-pulse"></div>
      </div>

      <!-- 右侧云纹（镜像） -->
      <svg class="w-16 h-8 text-luxury-gold/40 scale-x-[-1]" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 16C2 16 8 8 16 8C24 8 28 16 32 16C36 16 40 8 48 8C56 8 62 16 62 16"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M2 20C2 20 8 12 16 12C24 12 28 20 32 20C36 20 40 12 48 12C56 12 62 20 62 20"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    </div>

    <!-- 延伸线条 -->
    <div class="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"></div>
  </div>
</template>

<script setup>
// 纯装饰组件，无需逻辑
</script>
