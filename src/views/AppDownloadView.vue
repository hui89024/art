<script setup>
import SectionHero from '@/components/SectionHero.vue'
import CTACluster from '@/components/CTACluster.vue'
import FeatureGrid from '@/components/FeatureGrid.vue'

const featureItems = [
  { id: 1, title: 'AR 作品预览', description: '增强现实作品预览，提前感受装饰效果' },
  { id: 2, title: '智能临摹', description: '智能临摹辅助，逐步掌握剪纸节奏' },
  { id: 3, title: '纹样库检索', description: '纹样库检索，支持风格与主题筛选' },
  { id: 4, title: '社区共创', description: '社区共创，分享作品并获取反馈' }
]

const goIOS = () => {
  window.open('#', '_blank')
}

const goAndroid = () => {
  window.open('#', '_blank')
}
</script>

<template>
  <main class="pt-28 pb-20 min-h-screen bg-transparent text-ink-base">
    <SectionHero
      kicker="Jianyi App"
      title="非遗体验，从手机开始"
      subtitle="下载入口前置，信息层级更清晰"
      description="功能点仍保持现有四项，不删减。"
    >
      <CTACluster
        primary-text="苹果版下载"
        secondary-text="安卓版下载"
        @primary="goIOS"
        @secondary="goAndroid"
      />
    </SectionHero>

    <section class="max-w-[1280px] mx-auto px-6 lg:px-10 mt-16">
      <FeatureGrid :items="featureItems" />
    </section>
  </main>
</template>
