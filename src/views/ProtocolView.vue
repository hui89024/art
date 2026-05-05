<template>
  <main class="min-h-screen bg-[#f8f4ef] flex flex-col">
    <!-- 顶部导航栏 -->
    <header class="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800">
      <div class="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 h-16 flex items-center justify-between">
        <button
          @click="router.back()"
          class="flex items-center gap-2 text-white hover:text-amber-400 transition-colors text-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </button>
        <h1 class="text-white text-sm font-bold tracking-[0.2em]">{{ currentTitle }}</h1>
        <div class="w-16"></div>
      </div>
    </header>

    <!-- 协议切换标签 -->
    <div class="bg-gray-900 border-b border-gray-800">
      <div class="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 flex gap-1 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 border-b-2',
            activeTab === tab.key
              ? 'text-amber-400 border-amber-400'
              : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 协议内容区 -->
    <div class="flex-1">
      <iframe
        :src="currentSrc"
        class="w-full border-0"
        :style="{ height: iframeHeight }"
        @load="onIframeLoad"
        ref="iframeRef"
      ></iframe>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const iframeRef = ref(null)
const iframeHeight = ref('calc(100vh - 7rem)')

const tabs = [
  { key: 'privacy', label: '隐私政策', src: '/protocols/privacy.html' },
  { key: 'terms', label: '用户使用协议', src: '/protocols/terms.html' },
  { key: 'registration', label: '用户注册协议', src: '/protocols/registration.html' },
  { key: 'blockchain', label: '区块链版权保护协议', src: '/protocols/blockchain.html' }
]

const activeTab = ref('privacy')

// 根据路由参数初始化标签
onMounted(() => {
  const tabParam = route.params.tab
  if (tabParam && tabs.some(t => t.key === tabParam)) {
    activeTab.value = tabParam
  }
})

// 监听路由参数变化
watch(() => route.params.tab, (newTab) => {
  if (newTab && tabs.some(t => t.key === newTab)) {
    activeTab.value = newTab
  }
})

const currentTab = computed(() => tabs.find(t => t.key === activeTab.value))
const currentSrc = computed(() => currentTab.value?.src || '')
const currentTitle = computed(() => currentTab.value?.label || '')

// iframe 加载完成后调整高度
function onIframeLoad() {
  try {
    const iframe = iframeRef.value
    if (iframe && iframe.contentDocument) {
      const body = iframe.contentDocument.body
      if (body) {
        const height = body.scrollHeight + 40
        iframeHeight.value = `${Math.max(height, 600)}px`
      }
    }
  } catch {
    // 跨域限制时使用默认高度
    iframeHeight.value = 'calc(100vh - 7rem)'
  }
}
</script>
