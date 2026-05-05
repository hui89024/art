<template>
  <Teleport to="body">
    <Transition name="event-modal">
      <div v-if="visible" class="event-overlay" @click.self="close">
        <div class="event-modal">
          <!-- 关闭按钮 -->
          <button class="event-close" @click="close" aria-label="关闭">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <!-- 图片 -->
          <div v-if="event?.image" class="event-image">
            <img v-protect-image :src="event.image" :alt="event.title" />
          </div>

          <!-- 内容 -->
          <div class="event-content">
            <div class="event-date">
              <PhCalendar class="w-4 h-4" />
              <span>{{ formattedDate }}</span>
            </div>
            <h2 class="event-title">{{ event?.title }}</h2>
            <p v-if="event?.desc" class="event-desc">{{ event.desc }}</p>
            <a
              v-if="event?.url"
              :href="event.url"
              target="_blank"
              rel="noopener noreferrer"
              class="event-link"
            >
              <span>查看详情</span>
              <PhArrowSquareOut class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { PhCalendar, PhArrowSquareOut } from '@phosphor-icons/vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  event: { type: Object, default: null }
})

const emit = defineEmits(['update:visible'])

const formattedDate = computed(() => {
  if (!props.event?.publishTime) return ''
  const date = new Date(props.event.publishTime)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
})

function close() {
  emit('update:visible', false)
}
</script>

<style scoped>
.event-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.event-modal {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: calc(100vh - 48px);
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.event-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-close:hover {
  background: #fff;
  color: #0f172a;
  transform: scale(1.05);
}

.event-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-content {
  padding: 28px 32px 32px;
  overflow-y: auto;
}

.event-date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 12px;
}

.event-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 16px;
}

.event-desc {
  font-size: 15px;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 24px;
}

.event-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  background: #eff6ff;
  transition: all 0.2s;
}

.event-link:hover {
  background: #dbeafe;
  color: #1d4ed8;
}

/* 弹窗动画 */
.event-modal-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.event-modal-leave-active {
  transition: all 0.25s ease-in;
}
.event-modal-enter-from,
.event-modal-leave-to {
  opacity: 0;
}
.event-modal-enter-from .event-modal {
  transform: scale(0.9) translateY(24px);
  opacity: 0;
}
.event-modal-leave-to .event-modal {
  transform: scale(0.95);
  opacity: 0;
}
.event-modal-enter-active .event-modal {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.event-modal-leave-active .event-modal {
  transition: all 0.2s ease-in;
}

@media (max-width: 768px) {
  .event-overlay {
    padding: 16px;
    align-items: flex-end;
  }
  .event-modal {
    max-height: 85vh;
    border-radius: 16px 16px 0 0;
  }
  .event-content {
    padding: 20px 24px 28px;
  }
  .event-title {
    font-size: 20px;
  }
}
</style>
