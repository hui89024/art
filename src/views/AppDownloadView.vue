<script setup>
import { ref, onMounted } from 'vue'
import { getReviews } from '@/api/reviews'
import { PhStar, PhDeviceMobile, PhBrain, PhScissors, PhUsers, PhSparkle, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
import appScreenshot1 from '@/assets/12-5-2026_9113_h5.yikex.xyz.jpeg'
import appScreenshot2 from '@/assets/12-5-2026_9910_h5.yikex.xyz.jpeg'
import appScreenshot3 from '@/assets/12-5-2026_91226_h5.yikex.xyz.jpeg'
import PhoneAnimation from '@/components/PhoneAnimation.vue'

const screenshotImages = [appScreenshot1, appScreenshot2, appScreenshot3]

// Feature items with icons
const featureItems = [
  {
    id: 1,
    icon: PhSparkle,
    title: '纹样盛宴',
    description: '海量传统窗花纹样图库，支持综合、最新、最热浏览与搜索',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    icon: PhPalette,
    title: '时光映记',
    description: '卡片式发现体验，换一批探索更多精美纹样与故事',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 3,
    icon: PhCamera,
    title: 'AR 纹样识别',
    description: '实时相机扫描剪纸作品，AR 智能识别纹样信息',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 4,
    icon: PhUsers,
    title: '社区共创',
    description: '社区共创，分享作品并获取反馈',
    color: 'from-green-500 to-emerald-500'
  }
]

// User reviews — 从 API 获取，fallback 到默认数据
const DEFAULT_REVIEWS = [
  {
    id: 'default-1',
    name: '剪纸爱好者',
    initials: '剪',
    rating: 5,
    comment: '纹样盛宴功能太赞了！海量窗花纹样随心浏览，搜索也很方便，每次都能发现新惊喜。',
    date: '2026-04-15',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'default-2',
    name: '非遗传承人',
    initials: '非',
    rating: 5,
    comment: '时光映记的卡片式浏览体验很棒，换一批功能让我停不下来，AR 识别更是黑科技！',
    date: '2026-04-10',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'default-3',
    name: '艺术学院学生',
    initials: '艺',
    rating: 4,
    comment: '界面设计很有文化气息，AR 扫描识别剪纸纹样太酷了，期待更多功能更新。',
    date: '2026-04-05',
    color: 'from-purple-500 to-indigo-500'
  }
]

const reviews = ref(DEFAULT_REVIEWS)
const loadingReviews = ref(false)

onMounted(async () => {
  loadingReviews.value = true
  try {
    const data = await getReviews({ page: 0, size: 3 })
    if (data.length > 0) {
      reviews.value = data
    }
  } catch (err) {
    console.error('评价加载失败，使用默认数据:', err)
  } finally {
    loadingReviews.value = false
  }
})

// Screenshot carousel
const screenshots = [
  { id: 1, title: '纹样盛宴', description: '海量传统窗花纹样图库' },
  { id: 2, title: '时光映记', description: '卡片式发现更多精彩' },
  { id: 3, title: 'AR 识别', description: '实时扫描识别剪纸纹样' }
]

const currentScreenshot = ref(0)

const nextScreenshot = () => {
  currentScreenshot.value = (currentScreenshot.value + 1) % screenshots.length
}

const prevScreenshot = () => {
  currentScreenshot.value = (currentScreenshot.value - 1 + screenshots.length) % screenshots.length
}

const goToScreenshot = (index) => {
  currentScreenshot.value = index
}

const goAndroid = () => {
  window.open('#', '_blank')
}
</script>

<template>
  <main class="pt-28 pb-20 min-h-screen text-ink-base">

    <!-- Hero Section with Device Mockup -->
    <section class="max-w-[1280px] mx-auto px-6 lg:px-12 mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <!-- Left: Text Content -->
        <div class="text-center lg:text-left">
          <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-base mb-6 tracking-tight leading-tight">
            非遗体验<br>从手机开始
          </h1>
          <p class="text-lg text-bamboo-deep mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            随时随地学习传统剪纸艺术，用科技传承非遗文化，让每个人都能成为剪纸艺术家
          </p>

          <!-- Rating Display -->
          <div class="flex items-center justify-center lg:justify-start gap-6 mb-8">
            <div class="flex items-center gap-2">
              <div class="flex">
                <PhStar v-for="i in 5" :key="i" class="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <span class="text-2xl font-bold text-ink-base">4.9</span>
            </div>
            <div class="h-8 w-px bg-paper-dark/30"></div>
            <div class="text-left">
              <p class="text-sm font-medium text-ink-base">10,000+ 次下载</p>
              <p class="text-xs text-bamboo-dark">用户好评如潮</p>
            </div>
          </div>

          <!-- Download Button -->
          <div class="flex justify-center lg:justify-start">
            <button
              @click="goAndroid"
              class="group flex items-center justify-center gap-3 bg-ink-base hover:bg-ink-base/90 text-white px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-ink-base/20 hover:-translate-y-0.5"
            >
              <PhDeviceMobile class="w-6 h-6" />
              <div class="text-left">
                <p class="text-xs opacity-90">立即下载</p>
                <p class="text-lg font-semibold -mt-1">安卓版本</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Right: Device Mockup -->
        <div class="relative">
          <PhoneAnimation class="scale-110" />

          <!-- Floating Elements -->
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
          <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        </div>

      </div>
    </section>

    <!-- Screenshots Carousel -->
    <section class="max-w-[1280px] mx-auto px-6 lg:px-12 mb-20">
      <div class="text-center mb-12">
        <h2 class="font-serif text-3xl md:text-4xl font-semibold text-ink-base mb-4">应用截图</h2>
        <p class="text-bamboo-deep">直观了解 APP 核心功能</p>
      </div>

      <div class="relative">
        <!-- Carousel Container -->
        <div class="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-paper-dark/20 p-8 md:p-12">
          <div class="flex items-center justify-center gap-8">

            <!-- Previous Button -->
            <button
              @click="prevScreenshot"
              class="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-paper-dark/30 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-200 shadow-lg"
              aria-label="上一张截图"
            >
              <PhCaretLeft class="w-6 h-6" />
            </button>

            <!-- Screenshot Display -->
            <div class="flex-1 max-w-xs">
              <PhoneAnimation :image="screenshotImages[currentScreenshot]" />
            </div>

            <!-- Next Button -->
            <button
              @click="nextScreenshot"
              class="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-paper-dark/30 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-200 shadow-lg"
              aria-label="下一张截图"
            >
              <PhCaretRight class="w-6 h-6" />
            </button>

          </div>

          <!-- Dots Indicator -->
          <div class="flex justify-center gap-2 mt-8">
            <button
              v-for="(screenshot, index) in screenshots"
              :key="screenshot.id"
              @click="goToScreenshot(index)"
              :class="[
                'w-2 h-2 rounded-full transition-all duration-200',
                currentScreenshot === index
                  ? 'bg-accent w-8'
                  : 'bg-paper-dark/30 hover:bg-paper-dark/50'
              ]"
              :aria-label="`查看第 ${index + 1} 张截图`"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="max-w-[1280px] mx-auto px-6 lg:px-12 mb-20">
      <div class="text-center mb-12">
        <h2 class="font-serif text-3xl md:text-4xl font-semibold text-ink-base mb-4">核心功能</h2>
        <p class="text-bamboo-deep">四大核心功能，全方位提升剪纸体验</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="feature in featureItems"
          :key="feature.id"
          class="group bg-white border-2 border-paper-dark/20 rounded-2xl p-8 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div :class="['w-14 h-14 rounded-2xl bg-gradient-to-br', feature.color, 'flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300']">
            <component :is="feature.icon" class="w-7 h-7 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-ink-base mb-3">{{ feature.title }}</h3>
          <p class="text-sm text-bamboo-dark leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- User Reviews -->
    <section class="max-w-[1280px] mx-auto px-6 lg:px-12 mb-20">
      <div class="text-center mb-12">
        <h2 class="font-serif text-3xl md:text-4xl font-semibold text-ink-base mb-4">用户评价</h2>
        <p class="text-bamboo-deep">听听用户怎么说</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="bg-white border-2 border-paper-dark/20 rounded-2xl p-8 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
        >
          <!-- Rating Stars -->
          <div class="flex gap-1 mb-4">
            <PhStar v-for="i in review.rating" :key="i" class="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>

          <!-- Review Text -->
          <p class="text-sm text-bamboo-deep leading-relaxed mb-6">{{ review.comment }}</p>

          <!-- User Info -->
          <div class="flex items-center gap-3 pt-4 border-t border-paper-dark/20">
            <div :class="['w-10 h-10 rounded-full bg-gradient-to-br', review.color, 'flex items-center justify-center text-white font-semibold text-sm']">
              {{ review.initials }}
            </div>
            <div>
              <p class="text-sm font-medium text-ink-base">{{ review.name }}</p>
              <p class="text-xs text-bamboo-dark">{{ review.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="max-w-[1280px] mx-auto px-6 lg:px-12">
      <div class="bg-gradient-to-br from-accent/10 via-purple-50 to-blue-50 border-2 border-accent/20 rounded-3xl p-12 md:p-16 text-center">
        <h2 class="font-serif text-3xl md:text-4xl font-semibold text-ink-base mb-4">
          立即下载，开启剪纸之旅
        </h2>
        <p class="text-bamboo-deep mb-8 max-w-2xl mx-auto">
          加入 10,000+ 剪纸爱好者，用科技传承非遗文化
        </p>

        <div class="flex justify-center">
          <button
            @click="goAndroid"
            class="group flex items-center justify-center gap-3 bg-ink-base hover:bg-ink-base/90 text-white px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-ink-base/20 hover:-translate-y-0.5"
          >
            <PhDeviceMobile class="w-6 h-6" />
            <div class="text-left">
              <p class="text-xs opacity-90">立即下载</p>
              <p class="text-lg font-semibold -mt-1">安卓版本</p>
            </div>
          </button>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* Smooth transitions for carousel */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus visible for accessibility */
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
