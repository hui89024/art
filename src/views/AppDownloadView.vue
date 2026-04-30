<script setup>
import { ref } from 'vue'
import { Star, Apple, Play, Smartphone, Camera, Palette, Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import appScreenshot from '@/assets/screenshot-1776943364783.png'

// Feature items with icons
const featureItems = [
  {
    id: 1,
    icon: Camera,
    title: 'AR 作品预览',
    description: '增强现实作品预览，提前感受装饰效果',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    icon: Palette,
    title: '智能临摹',
    description: '智能临摹辅助，逐步掌握剪纸节奏',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 3,
    icon: Sparkles,
    title: '纹样库检索',
    description: '纹样库检索，支持风格与主题筛选',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 4,
    icon: Users,
    title: '社区共创',
    description: '社区共创，分享作品并获取反馈',
    color: 'from-green-500 to-emerald-500'
  }
]

// User reviews
const reviews = [
  {
    id: 1,
    name: '张艺涵',
    initials: '张',
    rating: 5,
    comment: '作为剪纸爱好者，这个 APP 让我随时随地都能学习和创作，AR 预览功能太棒了！',
    date: '2026-04-15',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    name: '李明轩',
    initials: '李',
    rating: 5,
    comment: '智能临摹功能帮助我快速掌握了剪纸技巧，纹样库资源也很丰富。',
    date: '2026-04-10',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    name: '王诗雨',
    initials: '王',
    rating: 4,
    comment: '界面设计很有文化气息，社区氛围也很好，期待更多功能更新。',
    date: '2026-04-05',
    color: 'from-purple-500 to-indigo-500'
  }
]

// Screenshot carousel
const screenshots = [
  { id: 1, title: 'AR 预览', description: '实时查看作品效果' },
  { id: 2, title: '智能临摹', description: '逐步学习剪纸技巧' },
  { id: 3, title: '纹样库', description: '海量传统纹样资源' },
  { id: 4, title: '社区分享', description: '与创作者交流互动' }
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

const goIOS = () => {
  window.open('#', '_blank')
}

const goAndroid = () => {
  window.open('#', '_blank')
}
</script>

<template>
  <main class="pt-28 pb-20 min-h-screen bg-gradient-to-b from-paper-light via-white to-paper-light text-ink-base">

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
                <Star v-for="i in 5" :key="i" class="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <span class="text-2xl font-bold text-ink-base">4.9</span>
            </div>
            <div class="h-8 w-px bg-paper-dark/30"></div>
            <div class="text-left">
              <p class="text-sm font-medium text-ink-base">10,000+ 次下载</p>
              <p class="text-xs text-bamboo-dark">用户好评如潮</p>
            </div>
          </div>

          <!-- Download Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              @click="goIOS"
              class="group flex items-center justify-center gap-3 bg-ink-base hover:bg-ink-base/90 text-white px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-ink-base/20 hover:-translate-y-0.5"
            >
              <Apple class="w-6 h-6" />
              <div class="text-left">
                <p class="text-xs opacity-90">立即下载</p>
                <p class="text-lg font-semibold -mt-1">苹果版本</p>
              </div>
            </button>

            <button
              @click="goAndroid"
              class="group flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-ink-base border-2 border-paper-dark/30 px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-paper-dark/10 hover:-translate-y-0.5"
            >
              <Smartphone class="w-6 h-6" />
              <div class="text-left">
                <p class="text-xs opacity-70">立即下载</p>
                <p class="text-lg font-semibold -mt-1">安卓版本</p>
              </div>
            </button>
          </div>

          <!-- QR Code Hint -->
          <p class="text-sm text-bamboo-dark mt-6 flex items-center justify-center lg:justify-start gap-2">
            <Smartphone class="w-4 h-4" />
            扫描二维码，手机端快速下载
          </p>
        </div>

        <!-- Right: Device Mockup -->
        <div class="relative">
          <div class="relative mx-auto w-[280px] h-[560px] bg-gradient-to-br from-ink-base to-gray-800 rounded-[3rem] p-3 shadow-2xl">
            <!-- Phone Screen -->
            <div class="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
              <!-- Notch -->
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-ink-base rounded-b-3xl z-10"></div>

              <!-- Real App Screenshot -->
              <img
                src="@/assets/screenshot-1776943364783.png"
                alt="剪艺 APP 主界面截图"
                class="w-full h-full object-cover object-top"
              />
            </div>
          </div>

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
              <ChevronLeft class="w-6 h-6" />
            </button>

            <!-- Screenshot Display -->
            <div class="flex-1 max-w-xs">
              <div class="relative mx-auto w-[240px] h-[480px] bg-gradient-to-br from-ink-base to-gray-800 rounded-[2.5rem] p-2.5 shadow-2xl">
                <div class="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink-base rounded-b-2xl z-10"></div>
                  <img
                    :src="appScreenshot"
                    :alt="screenshots[currentScreenshot].title + ' 截图'"
                    class="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <!-- Next Button -->
            <button
              @click="nextScreenshot"
              class="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-paper-dark/30 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-200 shadow-lg"
              aria-label="下一张截图"
            >
              <ChevronRight class="w-6 h-6" />
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
            <Star v-for="i in review.rating" :key="i" class="w-4 h-4 fill-yellow-400 text-yellow-400" />
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

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="goIOS"
            class="group flex items-center justify-center gap-3 bg-ink-base hover:bg-ink-base/90 text-white px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-ink-base/20 hover:-translate-y-0.5"
          >
            <Apple class="w-6 h-6" />
            <div class="text-left">
              <p class="text-xs opacity-90">立即下载</p>
              <p class="text-lg font-semibold -mt-1">苹果版本</p>
            </div>
          </button>

          <button
            @click="goAndroid"
            class="group flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-ink-base border-2 border-paper-dark/30 px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-paper-dark/10 hover:-translate-y-0.5"
          >
            <Smartphone class="w-6 h-6" />
            <div class="text-left">
              <p class="text-xs opacity-70">立即下载</p>
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
