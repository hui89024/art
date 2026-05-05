<template>
  <main class="min-h-screen bg-luxury-black text-luxury-text font-sans overflow-x-hidden">

    <!-- Hero Section - 全屏沉浸式 -->
    <LuxuryHero />

    <!-- 作品展示区 -->
    <section id="works-section" class="relative py-32 px-6 lg:px-12 bg-luxury-gradient">
      <!-- 背景纹样 -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute inset-0 bg-repeat"
             style="background-image: url('/src/assets/窗花018.png'); background-size: 150px;">
        </div>
      </div>

      <div class="relative max-w-[1600px] mx-auto">
        <LuxurySectionHeader
          kicker="核心作品"
          title="千刻万镂，传世之美。"
          subtitle="每一件纸艺作品都历经匠心雕琢，刀锋婉转间，呈现超越平凡的东方美学。传统技艺与现代设计的完美交融。"
          :show-seal="true"
          seal-text="匠心"
        />

        <!-- 作品卡片网格 -->
        <div ref="productCardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <LuxuryProductCard
            v-for="product in products"
            :key="product.id"
            :series="product.series"
            :title="product.title"
            :description="product.description"
            :image="product.image"
            @click="router.push('/collectibles')"
          />
        </div>

        <!-- 查看更多按钮 -->
        <div class="text-center">
          <button @click="router.push('/collectibles')"
                  class="group relative px-10 py-5 border-2 border-luxury-gold text-luxury-gold
                         font-bold text-sm tracking-[0.2em] uppercase overflow-hidden
                         transition-all duration-300 hover:shadow-luxury-glow">
            <span class="relative z-10 flex items-center gap-3">
              查看所有作品
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
            <div class="absolute inset-0 bg-luxury-gold transform -translate-x-full
                        group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </section>

    <!-- 装饰性分隔 -->
    <LuxuryDivider />

    <!-- 工艺技术区 -->
    <section class="relative py-32 px-6 lg:px-12 bg-luxury-black">
      <!-- 背景光斑 -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]
                  bg-luxury-radial pointer-events-none"></div>

      <div class="relative max-w-[1600px] mx-auto">
        <LuxurySectionHeader
          kicker="核心工艺"
          title="剪艺背后的坚持。"
          subtitle="每一刀刻画，每一次镂空，都只有一个目的：让纸张焕发新生，让你纯粹地感受剪纸艺术的灵动与震撼。"
          :show-seal="true"
          seal-text="传承"
        />

        <!-- 工艺特性网格 -->
        <div ref="featureGridRef" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features"
               :key="feature.id"
               class="group relative p-10 bg-luxury-surface/50 backdrop-blur-sm
                      border border-luxury-border/30 hover:border-luxury-gold/50
                      transition-all duration-500 hover:shadow-luxury-card
                      hover:-translate-y-2">

            <!-- 背景装饰图案 -->
            <div class="absolute top-4 right-4 w-24 h-24 opacity-10 group-hover:opacity-20
                        transition-opacity duration-500">
              <img v-protect-image :src="`/src/assets/窗花${String(17 + index).padStart(3, '0')}.png`"
                   class="w-full h-full object-contain"
                   alt="">
            </div>

            <!-- 序号 -->
            <div class="text-luxury-gold/30 font-display text-6xl font-bold mb-6">
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <!-- 标题 -->
            <h3 class="font-display text-2xl font-medium text-luxury-text mb-4 tracking-wide">
              {{ feature.title }}
            </h3>

            <!-- 描述 -->
            <p class="text-luxury-text-muted text-sm leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- 底部装饰线 -->
            <div class="mt-8 w-16 h-px bg-luxury-gold/50 group-hover:w-full
                        transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 装饰性分隔 -->
    <LuxuryDivider />

    <!-- 数字生态区 -->
    <section class="relative py-32 px-6 lg:px-12 bg-luxury-gradient overflow-hidden">
      <!-- 背景装饰圆环 -->
      <div class="absolute top-1/4 -right-48 w-96 h-96 border border-luxury-gold/10 rounded-full"></div>
      <div class="absolute bottom-1/4 -left-48 w-96 h-96 border border-luxury-gold/10 rounded-full"></div>

      <div class="relative max-w-[1600px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          <!-- 左侧：应用简介 -->
          <div class="space-y-24">
            <div>
              <LuxurySectionHeader
                kicker="剪艺应用"
                title="非遗艺术，在指尖交互中重生。"
                subtitle="剪艺应用不仅仅是一个展示平台，它将繁复的剪纸技艺转化为直观的数字化交互体验。"
              />
            </div>

            <!-- 电脑模型 -->
            <div class="relative flex justify-center">
              <div class="absolute inset-0 bg-luxury-radial blur-3xl"></div>
              <LaptopAnimation class="relative z-10" />
            </div>
          </div>

          <!-- 右侧：手机模型 + 纹样库 -->
          <div class="space-y-16">
            <!-- 手机模型 -->
            <div class="relative flex justify-center py-10">
              <div class="absolute inset-0 bg-luxury-radial blur-3xl"></div>
              <PhoneAnimation class="relative z-10 scale-110" />
            </div>

            <!-- 纹样库简介 -->
            <div class="pt-12 border-t border-luxury-border/30">
              <LuxurySectionHeader
                kicker="剪艺纹样库"
                title="数字化传承的基因库。"
                subtitle="我们深度提取了上千种传统剪纸纹样，进行数字化修复与矢量化建模。这不仅是一部活态的非遗百科全书，更为现代设计、文创开发提供了源源不断的东方美学灵感。"
              />

              <!-- 纹样图标展示 -->
              <div class="mt-8 flex gap-4">
                <div v-for="i in 3" :key="i"
                     class="group w-16 h-16 rounded-lg bg-luxury-surface/50 border border-luxury-border/30
                            hover:border-luxury-gold/50 flex items-center justify-center p-3
                            transition-all duration-300 hover:shadow-luxury-card cursor-pointer">
                  <img v-protect-image :src="`/src/assets/窗花${String(16 + i).padStart(3, '0')}.png`"
                       class="w-full h-full object-contain opacity-60 group-hover:opacity-100
                              transition-opacity"
                       alt="纹样图标">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 装饰性分隔 -->
    <LuxuryDivider />

    <!-- 宣言区 -->
    <section class="relative py-48 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      <!-- 背景：模糊的剪纸作品 -->
      <div class="absolute inset-0 z-0">
        <img v-protect-image src="/src/assets/窗花019.png"
             class="w-full h-full object-cover opacity-10 blur-sm scale-150"
             alt="">
        <div class="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/80 to-luxury-black"></div>
      </div>

      <!-- 飘动的剪纸碎片 -->
      <div class="absolute inset-0 pointer-events-none">
        <div v-for="i in 8" :key="i"
             class="absolute w-12 h-12 opacity-20 animate-float"
             :style="{
               left: `${10 + i * 12}%`,
               top: `${20 + (i % 3) * 30}%`,
               animationDelay: `${i * 0.8}s`,
               animationDuration: `${8 + i}s`
             }">
          <img v-protect-image :src="`/src/assets/窗花${String(17 + (i % 3)).padStart(3, '0')}.png`"
               class="w-full h-full object-contain"
               alt="">
        </div>
      </div>

      <div class="relative z-10 max-w-5xl">
        <!-- 顶部装饰 -->
        <div class="flex items-center justify-center gap-4 mb-12">
          <div class="w-16 h-px bg-luxury-gold/50"></div>
          <p class="text-luxury-gold text-[11px] font-bold uppercase tracking-[0.3em]">
            剪艺宣言
          </p>
          <div class="w-16 h-px bg-luxury-gold/50"></div>
        </div>

        <!-- 主标语 -->
        <h2 class="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-luxury-text
                   leading-snug tracking-wide mb-12"
            style="text-shadow: 0 0 40px rgba(212, 175, 55, 0.3);">
          "我们不只是裁刻纸张。<br>
          我们在方寸之间，<br>
          雕琢大千世界。"
        </h2>

        <!-- 印章 -->
        <div class="inline-block relative w-24 h-24 mb-8">
          <div class="absolute inset-0 border-4 border-luxury-red rotate-45"></div>
          <div class="absolute inset-2 border-2 border-luxury-red rotate-45"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-serif text-luxury-red text-sm font-bold">剪艺</span>
          </div>
        </div>

        <!-- 底部信息 -->
        <div class="flex items-center justify-center gap-4">
          <div class="w-8 h-px bg-luxury-gold/50"></div>
          <p class="text-luxury-text-muted text-xs font-bold uppercase tracking-[0.2em]">
            剪艺数字实验室，中国
          </p>
          <div class="w-8 h-px bg-luxury-gold/50"></div>
        </div>
      </div>
    </section>

    <!-- 装饰性分隔 -->
    <LuxuryDivider />

    <!-- Footer CTA -->
    <footer class="relative pt-32 pb-16 px-6 lg:px-12 bg-luxury-black">
      <div class="max-w-[1600px] mx-auto">

        <!-- CTA区域 -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end
                    border-b border-luxury-border/30 pb-20 mb-20">
          <div>
            <p class="text-luxury-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
              准备好开启创作了吗
            </p>
            <h2 class="font-display text-5xl md:text-6xl font-medium tracking-tight text-luxury-text">
              与剪艺一起<br>
              开启非遗之旅。
            </h2>
          </div>

          <div class="mt-10 md:mt-0">
            <button @click="router.push('/collectibles')"
                    class="group relative px-10 py-5 bg-luxury-gold text-luxury-black
                           font-bold text-sm tracking-[0.2em] uppercase overflow-hidden
                           transition-all duration-300 hover:shadow-luxury-glow">
              <span class="relative z-10 flex items-center gap-3">
                浏览全系产品
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <!-- Footer链接 -->
        <div class="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          <!-- 品牌信息 -->
          <div class="max-w-xs">
            <div class="flex items-center gap-3 mb-6">
              <img src="@/assets/配色版矢量（标准）.svg" alt="剪艺标志" class="w-8 h-8 object-contain opacity-80">
              <h3 class="font-display text-2xl font-medium tracking-[0.3em] text-luxury-text">剪艺</h3>
            </div>
            <p class="text-luxury-text-muted text-sm leading-relaxed mb-8">
              致力于传承与创新中国传统剪纸艺术，让非遗之美走进现代生活。匠心独运，纸上生花。
            </p>
            <!-- 社交媒体 -->
            <div class="flex gap-4">
              <div class="w-12 h-12 border border-luxury-border/50 rounded-full
                          flex items-center justify-center hover:border-luxury-gold
                          hover:bg-luxury-gold/10 cursor-pointer transition-all duration-300
                          text-luxury-text-muted hover:text-luxury-gold text-xs">
                微信
              </div>
              <div class="w-12 h-12 border border-luxury-border/50 rounded-full
                          flex items-center justify-center hover:border-luxury-gold
                          hover:bg-luxury-gold/10 cursor-pointer transition-all duration-300
                          text-luxury-text-muted hover:text-luxury-gold text-xs">
                微博
              </div>
              <div class="w-12 h-12 border border-luxury-border/50 rounded-full
                          flex items-center justify-center hover:border-luxury-gold
                          hover:bg-luxury-gold/10 cursor-pointer transition-all duration-300
                          text-luxury-text-muted hover:text-luxury-gold text-xs">
                小红书
              </div>
            </div>
          </div>

          <!-- 链接列表 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 flex-1">
            <div>
              <h4 class="text-luxury-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                剪纸作品
              </h4>
              <ul class="space-y-4 text-sm text-luxury-text-muted">
                <li><a href="#" class="hover:text-luxury-gold transition-colors">传统窗花</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">现代纸雕</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">定制肖像</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">限量版典藏</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-luxury-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                工艺技法
              </h4>
              <ul class="space-y-4 text-sm text-luxury-text-muted">
                <li><a href="#" class="hover:text-luxury-gold transition-colors">单色剪纸</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">套色剪纸</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">多层纸雕</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">材料工艺</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-luxury-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                关于企业
              </h4>
              <ul class="space-y-4 text-sm text-luxury-text-muted">
                <li><a href="#" class="hover:text-luxury-gold transition-colors">关于剪艺</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">设计实验室</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">可持续发展</a></li>
                <li><a href="#" class="hover:text-luxury-gold transition-colors">招贤纳士</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-luxury-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                用户支持
              </h4>
              <ul class="space-y-4 text-sm text-luxury-text-muted">
                <li><a href="#" class="hover:text-luxury-gold transition-colors">联系我们</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-luxury-border/30 pt-8 flex flex-col md:flex-row
                    justify-between items-center text-xs text-luxury-text-muted
                    font-bold uppercase tracking-[0.2em] gap-4">
          <p>© 2026 云南棱剪科技有限公司</p>
          <div class="flex gap-6">
            <button @click="openProtocol('privacy')" class="hover:text-luxury-gold transition-colors">隐私政策</button>
            <button @click="openProtocol('terms')" class="hover:text-luxury-gold transition-colors">服务条款</button>
          </div>
        </div>
      </div>
    </footer>

    <ProtocolModal
      v-model:visible="showProtocol"
      :initial-tab="protocolTab"
    />

  </main>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import LuxuryHero from '../components/LuxuryHero.vue'
import LuxuryProductCard from '../components/LuxuryProductCard.vue'
import LuxurySectionHeader from '../components/LuxurySectionHeader.vue'
import LuxuryDivider from '../components/LuxuryDivider.vue'
import LaptopAnimation from '../components/LaptopAnimation.vue'
import PhoneAnimation from '../components/PhoneAnimation.vue'
import ProtocolModal from '../components/ProtocolModal.vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useAnimate } from '@/composables/useAnimate.js'

const router = useRouter()
const productCardsRef = ref(null)
const featureGridRef = ref(null)
const showProtocol = ref(false)
const protocolTab = ref('privacy')

function openProtocol(tab) {
  protocolTab.value = tab
  showProtocol.value = true
}

const products = [
  {
    id: 1,
    series: '系列 01 · 暮金流影',
    title: '生生不息',
    description: '以传统窗花语言为核心，提炼纹样、留白与层叠结构，呈现生生不息的繁荣愿景。',
    image: '/src/assets/窗花017.png'
  },
  {
    id: 2,
    series: '系列 02 · 玉紫华章',
    title: '鱼跃龙门',
    description: '细腻镂空与金色轮廓相映，传说中的锦鲤化龙，象征着终极的胜利与荣耀。',
    image: '/src/assets/窗花018.png'
  },
  {
    id: 3,
    series: '系列 03 · 典藏映辉',
    title: '天命玄鸟',
    description: '以暗玉紫铺陈深邃氛围，借由剪艺纹样传递守护与新生的东方神话信仰。',
    image: '/src/assets/窗花019.png'
  }
]

const features = [
  { id: 'craft', title: '非遗传承', description: '将传统刀工转译为现代视觉语言，每一刀都承载着千年技艺的精髓。' },
  { id: 'detail', title: '微米级雕刻', description: '层叠结构与留白形成更强空间感，细节之处见匠心。' },
  { id: 'archive', title: '数字化纹样', description: '纹样沉淀为可持续复用的创作资产，让传统在数字时代焕发新生。' }
]

const { reveal } = useScrollReveal()
const { staggerIn } = useAnimate()

onMounted(async () => {
  await nextTick()

  // 作品卡片入场动画
  if (productCardsRef.value) {
    reveal(productCardsRef, {
      effect: 'stagger',
      threshold: 0.1,
      delay: 100
    })
  }

  // 工艺特性入场动画
  if (featureGridRef.value) {
    reveal(featureGridRef, {
      effect: 'stagger',
      threshold: 0.1,
      delay: 150
    })
  }
})
</script>

<style scoped>
/* 确保滚动流畅 */
html {
  scroll-behavior: smooth;
}

/* 响应式优化 */
@media (max-width: 768px) {
  /* 移动端禁用部分动画以提升性能 */
  .animate-float {
    animation: none;
  }
}

/* 无障碍：尊重用户的动画偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
