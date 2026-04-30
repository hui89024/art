<template>
  <main class="min-h-screen bg-[#f8f4ef] flex flex-col font-sans text-ink-base">
    <!-- 背景层已移除，各区域独立控制背景 -->

    <!-- Hero Section -->
    <Carousel />

    <!-- SectionHero -->
    <SectionHero
      kicker="剪艺"
      title="剪艺 — 纸间万象"
      subtitle="传统剪纸的非遗数字化之旅"
      description="从刀工到像素，从窗花到屏幕。"
    />
    
    <!-- Product Highlight Section -->
    <section class="py-24 sm:py-32 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full">
      <div class="mb-16">
        <h3 class="text-bamboo-base text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
          <span class="w-8 h-[1px] bg-bamboo-soft"></span> 核心作品
        </h3>
        <div ref="productHeadingRef" class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div class="max-w-2xl">
            <h2 class="text-5xl md:text-7xl font-medium tracking-tight text-ink-base mb-6">千刻万镂，传世之美。</h2>
            <p class="text-bamboo-dark text-sm leading-relaxed max-w-md">
              每一件纸艺作品都历经匠心雕琢，刀锋婉转间，呈现超越平凡的东方美学。传统技艺与现代设计的完美交融。
            </p>
          </div>
        </div>
      </div>

      <!-- 3 Columns Products -->
      <div ref="productCardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="group relative bg-paper-light rounded-2xl overflow-hidden border border-paper-dark/60 hover:border-paper-dark/70 transition-colors flex flex-col">
          <div class="relative aspect-[4/3] overflow-hidden bg-paper-muted flex justify-center items-center p-8">
            <img :src="pattern017" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="作品图片">
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <p class="text-bamboo-base text-[13px] font-bold uppercase tracking-[0.2em] mb-3">系列 01 · 暮金流影</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-ink-base">生生不息</h4>
              <span class="text-bamboo-base group-hover:text-ink-base transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-bamboo-dark text-xs leading-relaxed mb-8">
              以传统窗花语言为核心，提炼纹样、留白与层叠结构，呈现生生不息的繁荣愿景。
            </p>
            <div class="flex justify-end items-center border-t border-paper-dark/60 pt-6 mt-auto">
              <button @click="router.push('/collectibles')" class="border border-paper-dark/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-bamboo-deep hover:bg-paper-hover/70 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="group relative bg-paper-light rounded-2xl overflow-hidden border border-paper-dark/60 hover:border-paper-dark/70 transition-colors flex flex-col">
          <div class="relative aspect-[4/3] overflow-hidden bg-paper-muted flex justify-center items-center p-8">
            <img :src="pattern018" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="作品图片">
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <p class="text-bamboo-base text-[13px] font-bold uppercase tracking-[0.2em] mb-3">系列 02 · 玉紫华章</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-ink-base">鱼跃龙门</h4>
              <span class="text-bamboo-base group-hover:text-ink-base transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-bamboo-dark text-xs leading-relaxed mb-8">
              细腻镂空与金色轮廓相映，传说中的锦鲤化龙，象征着终极的胜利与荣耀。
            </p>
            <div class="flex justify-end items-center border-t border-paper-dark/60 pt-6 mt-auto">
              <button @click="router.push('/collectibles')" class="border border-paper-dark/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-bamboo-deep hover:bg-paper-hover/70 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="group relative bg-paper-light rounded-2xl overflow-hidden border border-paper-dark/60 hover:border-paper-dark/70 transition-colors flex flex-col">
          <div class="relative aspect-[4/3] overflow-hidden bg-paper-muted flex justify-center items-center p-8">
            <img :src="pattern019" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="作品图片">
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <p class="text-bamboo-base text-[13px] font-bold uppercase tracking-[0.2em] mb-3">系列 03 · 典藏映辉</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-ink-base">天命玄鸟</h4>
              <span class="text-bamboo-base group-hover:text-ink-base transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-bamboo-dark text-xs leading-relaxed mb-8">
              以暗玉紫铺陈深邃氛围，借由剪艺纹样传递守护与新生的东方神话信仰。
            </p>
            <div class="flex justify-end items-center border-t border-paper-dark/60 pt-6 mt-auto">
              <button @click="router.push('/collectibles')" class="border border-paper-dark/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-bamboo-deep hover:bg-paper-hover/70 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-16 text-center pb-8">
        <button class="border border-paper-dark/70 px-8 py-4 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.15em] text-ink-base hover:bg-paper-hover/70 transition-colors flex items-center justify-center mx-auto gap-2">
          查看所有作品 ↗
        </button>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
    </div>

    <!-- 剪艺数字生态 Section -->
    <section class="py-24 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

        <!-- 左侧：文字叙述区 -->
        <div class="flex flex-col gap-24">
          <!-- 上：App 简介 -->
          <div>
            <h3 class="text-bamboo-base text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
              <span class="w-8 h-[1px] bg-bamboo-soft"></span> 剪艺应用简介
            </h3>
            <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-ink-base mb-6">
              非遗艺术，<br>在指尖交互中重生。
            </h2>
            <p class="text-bamboo-dark text-sm leading-relaxed max-w-md">
              剪艺应用不仅仅是一个展示平台，它将繁复的剪纸技艺转化为直观的数字化交互体验。通过增强现实预览、智能临摹与社区分享，让每一位用户都能在掌上完成从感知到创作的全过程。
            </p>
          </div>

          <!-- 下：电脑模型 -->
          <div class="relative w-full flex justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-evasion-sand/10 to-transparent blur-3xl rounded-full"></div>
            <LaptopAnimation />
          </div>
        </div>

        <!-- 右侧：模型展示区 -->
        <div class="flex flex-col items-center gap-12 lg:gap-4">
          <!-- 上：手机模型 -->
          <div class="relative w-full flex justify-center py-10">
            <div class="absolute inset-0 bg-gradient-to-b from-evasion-sand/10 to-transparent blur-3xl rounded-full"></div>
            <PhoneAnimation class="scale-110" />
          </div>

          <!-- 下：纹样库简介 -->
          <div class="pt-12 border-t border-paper-dark/40 w-full">
            <h3 class="text-bamboo-base text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
              <span class="w-8 h-[1px] bg-bamboo-soft"></span> 剪艺纹样库
            </h3>
            <h2 class="text-3xl md:text-4xl font-medium tracking-tight text-ink-base mb-6">
              数字化传承的基因库。
            </h2>
            <p class="text-bamboo-dark text-sm leading-relaxed max-w-md">
              我们深度提取了上千种传统剪纸纹样，进行数字化修复与矢量化建模。这不仅是一部活态的非遗百科全书，更为现代设计、文创开发提供了源源不断的东方美学灵感。
            </p>
            <div class="mt-8 flex gap-3">
              <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-lg bg-paper-light border border-paper-dark/40 flex items-center justify-center p-2">
                <img :src="patternImages[i - 1]" class="w-full h-full object-contain opacity-60" alt="纹样图标">
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
    </div>


    <!-- Manifesto Section -->
    <section class="relative py-48 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-30" alt="森林薄雾">
        <div class="absolute inset-0 bg-forest-overlay/55"></div>
      </div>
      <div class="relative z-10 max-w-4xl">
        <p class="text-bamboo-light text-[12px] font-bold uppercase tracking-[0.3em] mb-12">
          剪艺宣言
        </p>
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-medium text-mist-base leading-snug tracking-tight">
          "我们不只是裁刻纸张。<br>我们在方寸之间，<br>雕琢大千世界。"
        </h2>
        <p class="text-sage-light text-[13px] font-bold uppercase tracking-[0.2em] mt-12 flex items-center justify-center gap-4">
          <span class="w-6 h-[1px] bg-sage-dark"></span> 剪艺数字实验室，中国
        </p>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
    </div>

    <!-- Footer -->
    <footer class="pt-24 pb-12 px-6 lg:px-12 bg-[#f8f4ef] max-w-[1600px] mx-auto w-full">
      <!-- Top Footer Action -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-paper-dark/60 pb-20 mb-20">
        <div>
          <p class="text-bamboo-base text-[12px] font-bold uppercase tracking-[0.2em] mb-6">准备好开启创作了吗</p>
          <h2 class="text-4xl md:text-6xl font-medium tracking-tight text-ink-base">
            与剪艺一起<br>开启非遗之旅。
          </h2>
        </div>
        <div class="mt-10 md:mt-0 flex flex-col items-start md:items-end">
          <button @click="router.push('/collectibles')" class="bg-bamboo-light text-ink-contrast px-8 py-4 rounded-[2px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-bamboo-accent transition-all mb-4">
            浏览全系产品 ↗
          </button>
        </div>
      </div>

      <!-- Main Footer Links -->
      <div class="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
        <div class="max-w-xs">
          <div class="flex items-center gap-3 mb-6">
            <img src="@/assets/配色版矢量（标准）.svg" alt="剪艺标志" class="w-6 h-6 object-contain opacity-80">
            <h3 class="text-xl font-medium tracking-[0.3em] text-ink-base">剪艺</h3>
          </div>
          <p class="text-bamboo-muted text-xs leading-relaxed">
            致力于传承与创新中国传统剪纸艺术，让非遗之美走进现代生活。匠心独运，纸上生花。
          </p>
          <div class="flex gap-4 mt-8">
            <div class="w-10 h-10 border border-paper-dark/70 rounded-full flex items-center justify-center hover:bg-paper-hover/70 cursor-pointer transition-colors text-bamboo-dark hover:text-white">微信</div>
            <div class="w-10 h-10 border border-paper-dark/70 rounded-full flex items-center justify-center hover:bg-paper-hover/70 cursor-pointer transition-colors text-bamboo-dark hover:text-white">微博</div>
            <div class="w-10 h-10 border border-paper-dark/70 rounded-full flex items-center justify-center hover:bg-paper-hover/70 cursor-pointer transition-colors text-bamboo-dark hover:text-white">小红书</div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 flex-1 lg:ml-20">
          <div>
            <h4 class="text-bamboo-dark text-[13px] font-bold uppercase tracking-[0.2em] mb-6">剪纸作品</h4>
            <ul class="space-y-4 text-xs text-bamboo-deep">
              <li><a href="#" class="hover:text-ink-base transition-colors">传统窗花</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">现代纸雕</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">定制肖像</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">限量版典藏</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-bamboo-dark text-[13px] font-bold uppercase tracking-[0.2em] mb-6">工艺技法</h4>
            <ul class="space-y-4 text-xs text-bamboo-deep">
              <li><a href="#" class="hover:text-ink-base transition-colors">单色剪纸</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">套色剪纸</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">多层纸雕</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">材料工艺</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-bamboo-dark text-[13px] font-bold uppercase tracking-[0.2em] mb-6">关于企业</h4>
            <ul class="space-y-4 text-xs text-bamboo-deep">
              <li><a href="#" class="hover:text-ink-base transition-colors">关于剪艺</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">设计实验室</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">可持续发展</a></li>
              <li><a href="#" class="hover:text-ink-base transition-colors">招贤纳士</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-bamboo-dark text-[13px] font-bold uppercase tracking-[0.2em] mb-6">用户支持</h4>
            <ul class="space-y-4 text-xs text-bamboo-deep">
              <li><a href="#" class="hover:text-ink-base transition-colors">联系我们</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="border-t border-paper-dark/60 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-bamboo-muted font-bold uppercase tracking-[0.2em] gap-4">
        <p>© 2026 剪艺数字艺术有限公司</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-bamboo-deep transition-colors">隐私政策</a>
          <a href="#" class="hover:text-bamboo-deep transition-colors">服务条款</a>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import Carousel from '@/components/Carousel.vue'
import SectionHero from '@/components/SectionHero.vue'
import LaptopAnimation from '@/components/LaptopAnimation.vue'
import PhoneAnimation from '@/components/PhoneAnimation.vue'
import { useAnimate } from '@/composables/useAnimate.js'
import { DURATION } from '@/composables/anime.config.js'
import pattern017 from '@/assets/窗花017.png'
import pattern018 from '@/assets/窗花018.png'
import pattern019 from '@/assets/窗花019.png'

let observer = null

const router = useRouter()

const productHeadingRef = ref(null)
const productCardsRef = ref(null)

const patternImages = [pattern017, pattern018, pattern019]

const { slideUp, staggerIn } = useAnimate()

onMounted(async () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      } else {
        entry.target.classList.remove('active')
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))

  await nextTick()

  // 产品区：首屏入场动效
  if (productHeadingRef.value) {
    slideUp(productHeadingRef, {
      delay: 100,
      duration: DURATION.slow
    })
  }

  if (productCardsRef.value) {
    staggerIn(productCardsRef, {
      delay: 120,
      duration: DURATION.base
    })
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
