<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="protocol-overlay" @click.self="close">
        <div class="protocol-modal">
          <!-- 头部 -->
          <div class="protocol-header">
            <h2 class="protocol-title">{{ currentTab?.label || '协议条款' }}</h2>
            <button class="protocol-close" @click="close" aria-label="关闭">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- 标签栏 -->
          <div class="protocol-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              :class="['protocol-tab', { active: activeTab === tab.key }]"
              @click="activeTab = tab.key"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- 内容区 -->
          <div class="protocol-body">
            <iframe
              v-if="currentTab"
              :src="currentTab.src"
              class="protocol-iframe"
              ref="iframeRef"
              @load="onIframeLoad"
            ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  initialTab: { type: String, default: 'privacy' }
})

const emit = defineEmits(['update:visible'])

const tabs = [
  { key: 'privacy', label: '隐私政策', src: '/protocols/privacy.html' },
  { key: 'terms', label: '用户使用协议', src: '/protocols/terms.html' },
  { key: 'registration', label: '用户注册协议', src: '/protocols/registration.html' },
  { key: 'blockchain', label: '区块链版权协议', src: '/protocols/blockchain.html' }
]

const activeTab = ref(props.initialTab)
const iframeRef = ref(null)

const currentTab = computed(() => tabs.find(t => t.key === activeTab.value))

watch(() => props.visible, (val) => {
  if (val) {
    activeTab.value = props.initialTab
    nextTick(() => document.body.style.overflow = 'hidden')
  } else {
    document.body.style.overflow = ''
  }
})

watch(() => props.initialTab, (val) => {
  if (props.visible) activeTab.value = val
})

function close() {
  emit('update:visible', false)
}

function onIframeLoad() {
  try {
    const iframe = iframeRef.value
    if (iframe?.contentDocument?.body) {
      const doc = iframe.contentDocument
      // 区块链协议保持原有样式，不注入深色主题
      if (activeTab.value === 'blockchain') return
      const style = doc.createElement('style')
      style.textContent = `
        body {
          max-width: 100% !important;
          padding: 24px 28px !important;
          background: #1e1e1e !important;
          color: #e0e0e0 !important;
        }
        h1, h2, h3, h4, h5, h6 { color: #ffffff !important; }
        p, li, td, th, span, div { color: #d4d4d4 !important; }
        a { color: #d4af37 !important; }
        hr, .divider { border-color: rgba(255,255,255,0.1) !important; }
        table { border-color: rgba(255,255,255,0.15) !important; }
        th, td { border-color: rgba(255,255,255,0.1) !important; }
      `
      doc.head.appendChild(style)
    }
  } catch {}
}
</script>

<style scoped>
.protocol-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.protocol-modal {
  width: 100%;
  max-width: 960px;
  max-height: calc(100vh - 48px);
  background: #1a1a1a;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
}

.protocol-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.protocol-title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.15em;
}

.protocol-close {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.protocol-close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}

.protocol-tabs {
  display: flex;
  gap: 0;
  padding: 0 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  overflow-x: auto;
}

.protocol-tab {
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s;
}

.protocol-tab:hover {
  color: rgba(255, 255, 255, 0.7);
}

.protocol-tab.active {
  color: #d4af37;
  border-bottom-color: #d4af37;
}

.protocol-body {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

.protocol-iframe {
  width: 100%;
  height: 65vh;
  border: none;
  display: block;
}

/* 弹窗动画 */
.modal-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active {
  transition: all 0.25s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .protocol-modal {
  transform: scale(0.92) translateY(20px);
  opacity: 0;
}

.modal-leave-to .protocol-modal {
  transform: scale(0.95);
  opacity: 0;
}

.modal-enter-active .protocol-modal {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active .protocol-modal {
  transition: all 0.2s ease-in;
}

@media (max-width: 768px) {
  .protocol-overlay {
    padding: 12px;
  }

  .protocol-modal {
    max-height: calc(100vh - 24px);
    border-radius: 8px;
  }

  .protocol-header {
    padding: 16px 20px;
  }

  .protocol-tabs {
    padding: 0 16px;
  }

  .protocol-tab {
    padding: 12px 14px;
    font-size: 11px;
  }

  .protocol-iframe {
    height: 70vh;
  }
}
</style>
