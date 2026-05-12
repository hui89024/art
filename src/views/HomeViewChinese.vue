<template>
  <main class="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50 text-red-900 font-sans overflow-x-hidden">

    <!-- Hero Section - 震撼的新中式Hero -->
    <ChineseHero />

    <!-- 作品展示区 -->
    <section id="works-section" class="relative py-32 px-6 lg:px-12 bg-white">
      <!-- 背景装饰纹样 -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute inset-0 bg-repeat"
             style="background-image: url('/src/assets/窗花018.png'); background-size: 200px;">
        </div>
      </div>

      <!-- 背景光晕 -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-red-200/30 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>

      <div class="relative max-w-[1600px] mx-auto">
        <ChineseSectionHeader
          kicker="核心作品"
          title="千刻万镂，传世之美"
          subtitle="每一件纸艺作品都历经匠心雕琢，刀锋婉转间，呈现超越平凡的东方美学。传统技艺与现代设计的完美交融"
          :show-seal="true"
          seal-text="匠心"
        />

        <!-- 作品卡片网格 -->
        <div ref="productCardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <ChineseProductCard
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
                  class="group relative px-14 py-6 bg-gradient-to-r from-red-600 to-amber-600
                         text-white font-bold text-base tracking-[0.3em] uppercase overflow-hidden
                         shadow-2xl shadow-red-400/50 hover:shadow-red-500/70
                         transition-all duration-500 hover:scale-110 hover:-translate-y-2">
            <span class="relative z-10 flex items-center gap-4">
              查看所有作品
              <svg class="w-6 h-6 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
            <!-- 光芒扫过 -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                        transform -translate-x-full group-hover:translate-x-full
                        transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    </section>

    <!-- 装饰性分隔 -->
    <ChineseDivider />

    <!-- 数字生态区 -->
    <section class="relative py-20 md:py-28 lg:py-32 px-5 md:px-8 lg:px-12 bg-white overflow-hidden">
      <!-- 极简光晕装饰 -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-red-200/20 rounded-full blur-3xl" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" aria-hidden="true"></div>

      <div class="relative max-w-[1600px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

          <!-- 左侧：应用介绍 + 电脑模型 -->
          <div class="space-y-8 md:space-y-10">
            <ChineseSectionHeader
              kicker="剪艺应用"
              title="非遗艺术，在指尖交互中重生"
              subtitle="剪艺应用不仅仅是一个展示平台，它将繁复的剪纸技艺转化为直观的数字化交互体验"
            />

            <!-- 电脑模型 -->
            <div class="relative flex justify-center items-center p-6 md:p-8
                        bg-white rounded-2xl border border-gray-100
                        shadow-xl shadow-gray-200/60
                        hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <LaptopAnimation class="relative z-10" />
            </div>
          </div>

          <!-- 右侧：手机模型 + 纹样库介绍 -->
          <div class="space-y-8 md:space-y-10">
            <!-- 手机模型 -->
            <div class="relative flex justify-center items-center p-6 md:p-8
                        bg-white rounded-2xl border border-gray-100
                        shadow-xl shadow-gray-200/60
                        hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <PhoneAnimation class="relative z-10" />
            </div>

            <!-- 纹样库介绍 -->
            <ChineseSectionHeader
              kicker="剪艺纹样库"
              title="数字化传承的基因库"
              subtitle="我们深度提取了上千种传统剪纸纹样，进行数字化修复与矢量化建模"
            />
          </div>

        </div>
      </div>
    </section>

    <!-- 装饰性分隔 -->
    <ChineseDivider />

    <!-- 宣言区 -->
    <ChineseManifesto />

    <!-- 装饰性分隔 -->
    <ChineseDivider />

    <!-- CTA区域 -->
    <section ref="ctaSection" class="cta-section relative pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 px-5 md:px-8 lg:px-12 overflow-hidden">

      <!-- 背景 -->
      <div class="absolute inset-0 bg-[#f8f4ef]" aria-hidden="true"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(212,190,152,0.12),transparent)]" aria-hidden="true"></div>

      <!-- 纹样装饰 -->
      <img
        v-protect-image
        src="@/assets/AN-TR-OT-CN-2026-02-11(3).png"
        alt=""
        class="cta-pattern absolute -left-24 md:-left-12 top-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[420px] md:h-[420px] object-contain opacity-[0.07] pointer-events-none select-none"
        aria-hidden="true"
      />
      <img
        v-protect-image
        src="@/assets/AN-TR-OT-CN-2026-02-11(4).png"
        alt=""
        class="cta-pattern absolute -right-20 md:-right-8 top-0 w-[280px] h-[280px] md:w-[380px] md:h-[380px] object-contain opacity-[0.06] pointer-events-none select-none"
        aria-hidden="true"
      />
      <img
        v-protect-image
        src="@/assets/AN-TR-OT-CN-2026-02-11(9).png"
        alt=""
        class="cta-pattern absolute -right-16 md:-right-4 bottom-0 w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-contain opacity-[0.05] pointer-events-none select-none"
        aria-hidden="true"
      />

      <div class="relative max-w-[1600px] mx-auto">
        <div class="flex flex-col items-center text-center">

          <!-- Kicker 标签 -->
          <div ref="ctaKicker"
               class="text-amber-600 text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.4em]
                      px-4 md:px-6 py-1.5 md:py-2 border border-amber-500/40 bg-amber-500/10
                      inline-block mb-6 md:mb-8">
            准备好开启创作了吗
          </div>

          <!-- 大标题 -->
          <h2 ref="ctaHeading"
              class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-ink-base
                     leading-tight tracking-tight">
            与剪艺一起<br>
            开启非遗之旅
          </h2>

          <!-- 品牌理念 -->
          <div ref="ctaManifesto" class="mt-8 md:mt-12 max-w-2xl flex items-start gap-3 md:gap-4">
            <span class="text-amber-500/60 text-3xl md:text-4xl font-serif leading-none select-none shrink-0">"</span>
            <p class="text-bamboo-deep text-sm md:text-base lg:text-lg font-light leading-relaxed">
              我们不只是裁刻纸张，我们在方寸之间，雕琢大千世界
            </p>
          </div>

          <!-- CTA 按钮 -->
          <div ref="ctaButton" class="mt-8 md:mt-10 w-full md:w-auto">
            <button type="button" @click="router.push('/collectibles')"
                    class="cta-button group relative w-full md:w-auto px-10 py-5
                           bg-gradient-to-r from-amber-500 to-yellow-500
                           text-gray-900 font-bold text-sm tracking-[0.2em]
                           overflow-hidden transition-all duration-300
                           hover:shadow-lg hover:shadow-amber-500/25"
                    aria-label="浏览全系剪纸作品">
              <span class="relative z-10 flex items-center justify-center gap-3">
                浏览全系作品
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer链接 -->
    <footer class="relative pt-10 md:pt-16 pb-12 md:pb-16 px-5 md:px-8 lg:px-12 bg-gray-950 overflow-hidden">

      <!-- 云纹暗纹背景 -->
      <div class="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cloud-pattern" x="0" y="0" width="96" height="48" patternUnits="userSpaceOnUse">
              <path d="M2 24C2 24 12 12 24 12C36 12 42 24 48 24C54 24 60 12 72 12C84 12 94 24 94 24"
                    stroke="#6b7280" stroke-width="2" fill="none" stroke-linecap="round"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cloud-pattern)"/>
        </svg>
      </div>

      <!-- 微弱径向渐变叠加 -->
      <div class="absolute inset-0 bg-radial-gradient" aria-hidden="true"></div>

      <div class="relative max-w-[1600px] mx-auto">

        <!-- 装饰细线 -->
        <div ref="ctaDivider"
             class="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-10 md:mb-16"
             aria-hidden="true">
        </div>

        <!-- Footer链接 -->
        <div class="flex flex-col lg:flex-row justify-between items-start gap-10 md:gap-14 lg:gap-16 mb-12 md:mb-16 lg:mb-20">
          <!-- 品牌信息 -->
          <div class="max-w-sm">
            <div class="flex items-center gap-4 mb-8">
              <img src="@/assets/配色版矢量（标准）.svg" alt="剪艺标志" class="w-10 h-10 object-contain">
              <h3 class="font-sans text-2xl md:text-3xl font-bold text-white tracking-[0.3em]">剪艺</h3>
            </div>
            <p class="text-white text-base leading-relaxed mb-10">
              致力于传承与创新中国传统剪纸艺术，让非遗之美走进现代生活。匠心独运，纸上生花
            </p>
            <!-- 社交媒体 -->
            <div class="flex gap-3 md:gap-4">
              <div class="w-11 h-11 md:w-14 md:h-14 border border-gray-600 rounded-full
                          flex items-center justify-center hover:border-amber-500
                          cursor-pointer transition-all duration-300
                          text-white hover:text-amber-400 text-[10px] md:text-xs font-bold hover:scale-110">
                微信
              </div>
              <div class="w-11 h-11 md:w-14 md:h-14 border border-gray-600 rounded-full
                          flex items-center justify-center hover:border-amber-500
                          cursor-pointer transition-all duration-300
                          text-white hover:text-amber-400 text-[10px] md:text-xs font-bold hover:scale-110">
                微博
              </div>
              <div class="w-11 h-11 md:w-14 md:h-14 border border-gray-600 rounded-full
                          flex items-center justify-center hover:border-amber-500
                          cursor-pointer transition-all duration-300
                          text-white hover:text-amber-400 text-[10px] md:text-xs font-bold hover:scale-110">
                小红书
              </div>
            </div>
          </div>

          <!-- 链接列表 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12 flex-1">
            <div>
              <h4 class="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-6
                         border-b border-amber-500/30 pb-2">
                剪纸作品
              </h4>
              <ul class="space-y-2.5 md:space-y-4 text-xs md:text-sm text-white">
                <li><router-link to="/collectibles" class="hover:text-amber-400 transition-colors">传统窗花</router-link></li>
                <li><router-link to="/collectibles" class="hover:text-amber-400 transition-colors">现代纸雕</router-link></li>
                <li><router-link to="/collectibles" class="hover:text-amber-400 transition-colors">定制肖像</router-link></li>
                <li><router-link to="/collectibles" class="hover:text-amber-400 transition-colors">限量版典藏</router-link></li>
              </ul>
            </div>
            <div>
              <h4 class="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-6
                         border-b border-amber-500/30 pb-2">
                工艺技法
              </h4>
              <ul class="space-y-2.5 md:space-y-4 text-xs md:text-sm text-white">
                <li><router-link to="/collectibles" class="hover:text-amber-400 transition-colors">单色剪纸</router-link></li>
                <li><router-link to="/collectibles" class="hover:text-amber-400 transition-colors">套色剪纸</router-link></li>
                <li><router-link to="/collectibles" class="hover:text-amber-400 transition-colors">多层纸雕</router-link></li>
                <li><router-link to="/collectibles" class="hover:text-amber-400 transition-colors">材料工艺</router-link></li>
              </ul>
            </div>
            <div>
              <h4 class="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-6
                         border-b border-amber-500/30 pb-2">
                关于企业
              </h4>
              <ul class="space-y-2.5 md:space-y-4 text-xs md:text-sm text-white">
                <li><router-link to="/contact" class="hover:text-amber-400 transition-colors">关于剪艺</router-link></li>
                <li><router-link to="/events" class="hover:text-amber-400 transition-colors">设计实验室</router-link></li>
                <li><router-link to="/contact" class="hover:text-amber-400 transition-colors">可持续发展</router-link></li>
                <li><router-link to="/contact" class="hover:text-amber-400 transition-colors">招贤纳士</router-link></li>
              </ul>
            </div>
            <div>
              <h4 class="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-6
                         border-b border-amber-500/30 pb-2">
                用户支持
              </h4>
              <ul class="space-y-2.5 md:space-y-4 text-xs md:text-sm text-white">
                <li><router-link to="/contact" class="hover:text-amber-400 transition-colors">联系我们</router-link></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row
                    justify-between items-center text-[10px] md:text-xs text-white
                    font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] gap-3 md:gap-4">
          <p>© 2026 云南棱剪科技有限公司</p>
          <div class="flex gap-6 md:gap-8">
            <button @click="openProtocol('privacy')" class="hover:text-amber-400 transition-colors">隐私政策</button>
            <button @click="openProtocol('terms')" class="hover:text-amber-400 transition-colors">服务条款</button>
          </div>
        </div>
      </div>
    </footer>

    <!-- 协议弹窗 -->
    <ProtocolModal
      v-model:visible="showProtocol"
      :initial-tab="protocolTab"
    />

  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ChineseHero from '../components/ChineseHero.vue'
import ChineseManifesto from '../components/ChineseManifesto.vue'
import ChineseProductCard from '../components/ChineseProductCard.vue'
import ChineseSectionHeader from '../components/ChineseSectionHeader.vue'
import ChineseDivider from '../components/ChineseDivider.vue'
import LaptopAnimation from '../components/LaptopAnimation.vue'
import PhoneAnimation from '../components/PhoneAnimation.vue'
import ProtocolModal from '../components/ProtocolModal.vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'

const router = useRouter()
const productCardsRef = ref(null)

const { reveal } = useScrollReveal()

const ctaSection = ref(null)
const ctaKicker = ref(null)
const ctaHeading = ref(null)
const ctaManifesto = ref(null)
const ctaButton = ref(null)
const ctaDivider = ref(null)
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
    description: '以传统窗花语言为核心，提炼纹样、留白与层叠结构，呈现生生不息的繁荣愿景',
    image: '/src/assets/窗花017.png'
  },
  {
    id: 2,
    series: '系列 02 · 玉紫华章',
    title: '鱼跃龙门',
    description: '细腻镂空与金色轮廓相映，传说中的锦鲤化龙，象征着终极的胜利与荣耀',
    image: '/src/assets/窗花018.png'
  },
  {
    id: 3,
    series: '系列 03 · 典藏映辉',
    title: '天命玄鸟',
    description: '以暗玉紫铺陈深邃氛围，借由剪艺纹样传递守护与新生的东方神话信仰',
    image: '/src/assets/窗花019.png'
  }
]

onMounted(() => {
  // 错位注册滚动入场，实现设计规格中的时序（间隔 150ms）
  const revealQueue = [
    { el: ctaKicker, opts: { effect: 'fade', duration: 600 } },
    { el: ctaHeading, opts: { effect: 'slideUp', duration: 800, translateY: 30 } },
    { el: ctaManifesto, opts: { effect: 'fade', duration: 600 } },
    { el: ctaButton, opts: { effect: 'slideUp', duration: 600, translateY: 20 } },
    { el: ctaDivider, opts: { effect: 'fade', duration: 600 } },
  ]
  revealQueue.forEach(({ el, opts }, i) => {
    if (el.value) setTimeout(() => reveal(el, opts), i * 150)
  })
})
</script>

<style scoped>
/* 纹样背景：去掉白色底，只保留纹样本身 */
.cta-pattern {
  mix-blend-mode: multiply;
  filter: saturate(0.3);
}

/* CTA 按钮扫光动效 */
.cta-button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 1000ms ease-in-out;
}

.cta-button:hover::after {
  transform: translateX(100%);
}

/* 径向渐变叠加 */
.bg-radial-gradient {
  background: radial-gradient(
    ellipse at center,
    rgba(17, 24, 39, 0.3) 0%,
    transparent 70%
  );
}
</style>
