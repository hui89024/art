<template>
  <div class="parallax-background" aria-hidden="true">
    <div
      ref="textureLayer"
      class="texture-layer"
      :style="{ transform }"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useParallax } from '@/composables/useParallax.js'

const props = defineProps({
  speed: {
    type: Number,
    default: 0.5
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

const textureLayer = ref(null)
const { transform } = useParallax({
  speed: props.speed,
  enabled: props.enabled
})
</script>

<style scoped>
.parallax-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.texture-layer {
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  will-change: transform;
  background:
    /* 布料纹理 */
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.03) 2px,
      rgba(255, 255, 255, 0.03) 4px
    ),
    /* 纸张纹理 */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23f5f0eb'/%3E%3Crect width='1' height='1' fill='%23e8e0d8' opacity='0.3'/%3E%3C/svg%3E") repeat,
    /* 底色 */
    linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%);
}

/* 响应式处理 */
@media (max-width: 768px) {
  .texture-layer {
    background:
      /* 简化的布料纹理 */
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 3px,
        rgba(255, 255, 255, 0.02) 3px,
        rgba(255, 255, 255, 0.02) 6px
      ),
      /* 底色 */
      linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%);
  }
}

/* 无障碍支持 */
@media (prefers-reduced-motion: reduce) {
  .texture-layer {
    transform: none !important;
  }
}
</style>
