<template>
  <div class="mb-16">
    <!-- 小标题 -->
    <div class="flex items-center gap-4 mb-6">
      <div class="w-12 h-px bg-luxury-gold/50"></div>
      <h3 class="text-luxury-gold text-[11px] font-bold uppercase tracking-[0.3em]">
        {{ kicker }}
      </h3>
      <div class="flex-1 h-px bg-luxury-gold/20"></div>
    </div>

    <!-- 主标题 -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div class="max-w-3xl">
        <h2 class="font-display text-5xl md:text-7xl font-medium tracking-tight text-luxury-text mb-6
                   leading-tight"
            style="text-shadow: 0 0 30px rgba(212, 175, 55, 0.2);">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-luxury-text-muted text-base leading-relaxed max-w-xl">
          {{ subtitle }}
        </p>
      </div>

      <!-- 装饰性印章（可选） -->
      <div v-if="showSeal" class="relative w-20 h-20 flex-shrink-0">
        <div class="absolute inset-0 border-4 border-luxury-red rotate-45 opacity-80"></div>
        <div class="absolute inset-2 border-2 border-luxury-red rotate-45 opacity-60"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="font-serif text-luxury-red text-xs font-bold tracking-wider rotate-0">
            {{ sealText || '剪艺' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 底部装饰线 -->
    <div class="mt-8 flex items-center gap-2">
      <div class="w-2 h-2 bg-luxury-gold rotate-45"></div>
      <div class="flex-1 h-px bg-gradient-to-r from-luxury-gold/50 to-transparent"></div>
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
