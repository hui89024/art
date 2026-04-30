<template>
  <div class="group relative bg-luxury-surface rounded-lg overflow-hidden
              border border-luxury-border/30 hover:border-luxury-gold/50
              transition-all duration-500 hover:shadow-luxury-hover
              hover:-translate-y-2">

    <!-- 金色光晕背景 -->
    <div class="absolute inset-0 bg-luxury-radial opacity-0 group-hover:opacity-100
                transition-opacity duration-500"></div>

    <!-- 图片容器 -->
    <div class="relative aspect-[4/3] overflow-hidden bg-luxury-charcoal/50 flex justify-center items-center p-8">
      <!-- 装饰性边角 -->
      <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-luxury-gold/30"></div>
      <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-luxury-gold/30"></div>
      <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-luxury-gold/30"></div>
      <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-luxury-gold/30"></div>

      <img :src="image"
           class="w-full h-full object-contain filter brightness-110
                  group-hover:scale-110 transition-transform duration-700"
           :alt="title">

      <!-- 悬浮时的金光扫过效果 -->
      <div class="absolute inset-0 bg-gold-shimmer opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 pointer-events-none"></div>
    </div>

    <!-- 内容区域 -->
    <div class="relative p-8 flex flex-col">
      <!-- 系列标签（印章样式） -->
      <div class="mb-4 inline-flex items-center gap-2">
        <div class="px-3 py-1 border border-luxury-gold/50 text-luxury-gold
                    text-[11px] font-bold uppercase tracking-[0.2em]
                    relative overflow-hidden">
          <span class="relative z-10">{{ series }}</span>
          <!-- 印章纹理 -->
          <div class="absolute inset-0 opacity-10"
               style="background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, currentColor 2px, currentColor 4px);">
          </div>
        </div>
      </div>

      <!-- 标题行 -->
      <div class="flex justify-between items-start mb-4">
        <h4 class="font-display text-2xl font-medium text-luxury-text tracking-wide">
          {{ title }}
        </h4>
        <span class="text-luxury-gold group-hover:text-luxury-gold-light
                     transition-colors cursor-pointer text-xl">
          ↗
        </span>
      </div>

      <!-- 描述 -->
      <p class="text-luxury-text-muted text-sm leading-relaxed mb-8 flex-1">
        {{ description }}
      </p>

      <!-- 底部分隔线和按钮 -->
      <div class="flex justify-end items-center border-t border-luxury-border/30 pt-6">
        <button @click="handleClick"
                class="group/btn relative px-6 py-2.5 border border-luxury-gold/70
                       text-[12px] font-bold uppercase tracking-[0.1em] text-luxury-gold
                       overflow-hidden transition-all duration-300
                       hover:bg-luxury-gold hover:text-luxury-black">
          <span class="relative z-10">详情</span>
          <!-- 按钮悬浮效果 -->
          <div class="absolute inset-0 bg-luxury-gold transform -translate-x-full
                      group-hover/btn:translate-x-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>

    <!-- 卡片四角装饰点 -->
    <div class="absolute top-0 left-0 w-2 h-2 bg-luxury-gold rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-300"></div>
    <div class="absolute top-0 right-0 w-2 h-2 bg-luxury-gold rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-300"></div>
    <div class="absolute bottom-0 left-0 w-2 h-2 bg-luxury-gold rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-300"></div>
    <div class="absolute bottom-0 right-0 w-2 h-2 bg-luxury-gold rounded-full opacity-0
                group-hover:opacity-100 transition-opacity duration-300"></div>
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
/* 确保动画在低性能设备上可以禁用 */
@media (prefers-reduced-motion: reduce) {
  .group:hover {
    transform: none;
  }

  img {
    transition: none;
  }
}
</style>
