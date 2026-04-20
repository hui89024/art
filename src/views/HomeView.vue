<template>
  <main class="min-h-screen bg-transparent flex flex-col font-sans text-[#2f3a32]">
    <!-- Hero Section -->
    <Carousel />
    
    <!-- Product Highlight Section -->
    <section class="py-24 sm:py-32 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full">
      <div class="mb-16">
        <h3 class="text-[#728275] text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
          <span class="w-8 h-[1px] bg-[#90a193]"></span> 核心作品
        </h3>
        <div ref="productHeadingRef" class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div class="max-w-2xl">
            <h2 class="text-5xl md:text-7xl font-medium tracking-tight text-[#2f3a32] mb-6">千刻万镂，传世之美。</h2>
            <p class="text-[#5f6e63] text-sm leading-relaxed max-w-md">
              每一件纸艺作品都历经匠心雕琢，刀锋婉转间，呈现超越平凡的东方美学。传统技艺与现代设计的完美交融。
            </p>
          </div>
        </div>
      </div>

      <!-- 3 Columns Products -->
      <div ref="productCardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="group relative bg-[#fffdf8] rounded-2xl overflow-hidden border border-[#d8cfbd]/60 hover:border-[#d8cfbd]/70 transition-colors flex flex-col">
          <div class="relative aspect-[4/3] overflow-hidden bg-[#f3ede1] flex justify-center items-center p-8">
            <div class="absolute top-4 left-4 z-10 bg-[#2f3a32] px-3 py-1.5 rounded-[2px] text-[13px] font-bold tracking-[0.2em] uppercase text-[#96AD92]">
              New Arrival
            </div>
            <img src="../assets/窗花017.png" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="Product">
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <p class="text-[#728275] text-[13px] font-bold uppercase tracking-[0.2em] mb-3">系列 01 · 暮金流影</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-[#2f3a32]">生生不息</h4>
              <span class="text-[#728275] group-hover:text-[#2f3a32] transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-[#5f6e63] text-xs leading-relaxed mb-8">
              以传统窗花语言为核心，提炼纹样、留白与层叠结构，呈现生生不息的繁荣愿景。
            </p>
            <div class="flex justify-end items-center border-t border-[#d8cfbd]/60 pt-6 mt-auto">
              <button @click="router.push('/collectibles')" class="border border-[#d8cfbd]/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-[#4a5a50] hover:bg-[#edf3ea]/70 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="group relative bg-[#fffdf8] rounded-2xl overflow-hidden border border-[#d8cfbd]/60 hover:border-[#d8cfbd]/70 transition-colors flex flex-col">
          <div class="relative aspect-[4/3] overflow-hidden bg-[#f3ede1] flex justify-center items-center p-8">
            <div class="absolute top-4 left-4 z-10 bg-[#2f3a32] px-3 py-1.5 rounded-[2px] text-[13px] font-bold tracking-[0.2em] uppercase text-[#96AD92]">
              Bestseller
            </div>
            <img src="../assets/窗花018.png" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="Product">
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <p class="text-[#728275] text-[13px] font-bold uppercase tracking-[0.2em] mb-3">系列 02 · 玉紫华章</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-[#2f3a32]">鱼跃龙门</h4>
              <span class="text-[#728275] group-hover:text-[#2f3a32] transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-[#5f6e63] text-xs leading-relaxed mb-8">
              细腻镂空与金色轮廓相映，传说中的锦鲤化龙，象征着终极的胜利与荣耀。
            </p>
            <div class="flex justify-end items-center border-t border-[#d8cfbd]/60 pt-6 mt-auto">
              <button @click="router.push('/collectibles')" class="border border-[#d8cfbd]/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-[#4a5a50] hover:bg-[#edf3ea]/70 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="group relative bg-[#fffdf8] rounded-2xl overflow-hidden border border-[#d8cfbd]/60 hover:border-[#d8cfbd]/70 transition-colors flex flex-col">
          <div class="relative aspect-[4/3] overflow-hidden bg-[#f3ede1] flex justify-center items-center p-8">
            <div class="absolute top-4 left-4 z-10 bg-[#2f3a32] px-3 py-1.5 rounded-[2px] text-[13px] font-bold tracking-[0.2em] uppercase text-[#96AD92]">
              Limited
            </div>
            <img src="../assets/窗花019.png" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="Product">
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <p class="text-[#728275] text-[13px] font-bold uppercase tracking-[0.2em] mb-3">系列 03 · 典藏映辉</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-[#2f3a32]">天命玄鸟</h4>
              <span class="text-[#728275] group-hover:text-[#2f3a32] transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-[#5f6e63] text-xs leading-relaxed mb-8">
              以暗玉紫铺陈深邃氛围，借由剪艺纹样传递守护与新生的东方神话信仰。
            </p>
            <div class="flex justify-end items-center border-t border-[#d8cfbd]/60 pt-6 mt-auto">
              <button @click="router.push('/collectibles')" class="border border-[#d8cfbd]/70 px-6 py-2.5 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.1em] text-[#4a5a50] hover:bg-[#edf3ea]/70 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-16 text-center pb-8">
        <button class="border border-[#d8cfbd]/70 px-8 py-4 rounded-[2px] text-[12px] font-bold uppercase tracking-[0.15em] text-[#2f3a32] hover:bg-[#edf3ea]/70 transition-colors flex items-center justify-center mx-auto gap-2">
          查看所有作品 ↗
        </button>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
    </div>

    <!-- Technology Section -->
    <section id="technology" class="py-24 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full">
      <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div class="max-w-2xl">
          <h3 class="text-[#728275] text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
            <span class="w-8 h-[1px] bg-[#90a193]"></span> 核心工艺
          </h3>
          <h2 class="text-5xl md:text-7xl font-medium tracking-tight text-[#2f3a32]">剪艺背后的坚持。</h2>
        </div>
        <div class="max-w-xs pt-4 md:pt-12">
          <p class="text-[#5f6e63] text-sm leading-relaxed">
            每一刀刻画，每一次镂空，都只有一个目的：让纸张焕发新生，让你纯粹地感受剪纸艺术的灵动与震撼。
          </p>
        </div>
      </div>

      <!-- 4 Columns Tech Specs -->
      <div ref="techCardsRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-[#fffdf8] border border-[#d8cfbd]/60 rounded-2xl p-8 hover:bg-[#edf3ea] transition-colors flex flex-col justify-between min-h-[360px]">
          <div>
            <div class="w-10 h-10 border border-[#d8cfbd]/70 rounded-lg flex items-center justify-center mb-8">
              <ShieldCheck class="w-4 h-4 text-[#5f6e63]" />
            </div>
            <h4 class="text-4xl font-medium text-[#2f3a32] mb-2 tracking-tight">非遗传承</h4>
            <p class="text-[#728275] text-[13px] font-bold uppercase tracking-[0.2em]">国家级非物质文化遗产</p>
          </div>
          <div class="mt-8">
            <p class="text-[#96AD92] text-[13px] font-bold uppercase tracking-[0.1em] mb-2">世代相传的记忆</p>
            <h5 class="text-[#2f3a32] font-medium mb-2">技艺传承</h5>
            <p class="text-[#5f6e63] text-xs leading-relaxed">
              每一件作品都承载着千百年的文化积淀，通过师徒相授，将精湛的剪纸技艺代代相传。
            </p>
          </div>
        </div>

        <div class="bg-[#fffdf8] border border-[#d8cfbd]/60 rounded-2xl p-8 hover:bg-[#edf3ea] transition-colors flex flex-col justify-between min-h-[360px]">
          <div>
            <div class="w-10 h-10 border border-[#d8cfbd]/70 rounded-lg flex items-center justify-center mb-8">
              <ThermometerSnowflake class="w-4 h-4 text-[#5f6e63]" />
            </div>
            <h4 class="text-4xl font-medium text-[#2f3a32] mb-2 tracking-tight">微米级雕刻</h4>
            <p class="text-[#728275] text-[13px] font-bold uppercase tracking-[0.2em]">极光微雕工艺</p>
          </div>
          <div class="mt-8">
            <p class="text-[#96AD92] text-[13px] font-bold uppercase tracking-[0.1em] mb-2">丝丝入扣的细节表现</p>
            <h5 class="text-[#2f3a32] font-medium mb-2">多维立体层叠</h5>
            <p class="text-[#5f6e63] text-xs leading-relaxed">
              采用多层镂空与叠层技术，赋予平面纸张突破维度的立体感与丰富的光影变幻。
            </p>
          </div>
        </div>

        <div class="bg-[#fffdf8] border border-[#d8cfbd]/60 rounded-2xl p-8 hover:bg-[#edf3ea] transition-colors flex flex-col justify-between min-h-[360px]">
          <div>
            <div class="w-10 h-10 border border-[#d8cfbd]/70 rounded-lg flex items-center justify-center mb-8">
              <MapPin class="w-4 h-4 text-[#5f6e63]" />
            </div>
            <h4 class="text-4xl font-medium text-[#2f3a32] mb-2 tracking-tight">纯手工</h4>
            <p class="text-[#728275] text-[13px] font-bold uppercase tracking-[0.2em]">匠心独运的坚持</p>
          </div>
          <div class="mt-8">
            <p class="text-[#96AD92] text-[13px] font-bold uppercase tracking-[0.1em] mb-2">指尖的温度</p>
            <h5 class="text-[#2f3a32] font-medium mb-2">精细刻画</h5>
            <p class="text-[#5f6e63] text-xs leading-relaxed">
              每一道刻痕都留有匠人的温度，手工雕琢的独特魅力是任何机械都无法替代的。
            </p>
          </div>
        </div>

        <div class="bg-[#fffdf8] border border-[#d8cfbd]/60 rounded-2xl p-8 hover:bg-[#edf3ea] transition-colors flex flex-col justify-between min-h-[360px]">
          <div>
            <div class="w-10 h-10 border border-[#d8cfbd]/70 rounded-lg flex items-center justify-center mb-8">
              <MapPin class="w-4 h-4 text-[#5f6e63]" />
            </div>
            <h4 class="text-4xl font-medium text-[#2f3a32] mb-2 tracking-tight">无酸装裱</h4>
            <p class="text-[#728275] text-[13px] font-bold uppercase tracking-[0.2em]">博物馆级典藏标准</p>
          </div>
          <div class="mt-8">
            <p class="text-[#96AD92] text-[13px] font-bold uppercase tracking-[0.1em] mb-2">历久弥新的保存</p>
            <h5 class="text-[#2f3a32] font-medium mb-2">专业级防护装裱</h5>
            <p class="text-[#5f6e63] text-xs leading-relaxed">
              采用博物馆级无酸纸与专业防紫外线装裱技术，确保剪纸作品历经岁月洗礼依然色彩如新。
            </p>
          </div>
        </div>
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
            <h3 class="text-[#728275] text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
              <span class="w-8 h-[1px] bg-[#90a193]"></span> 剪艺APP简介
            </h3>
            <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-[#2f3a32] mb-6">
              非遗艺术，<br>在指尖交互中重生。
            </h2>
            <p class="text-[#5f6e63] text-sm leading-relaxed max-w-md">
              剪艺App不仅仅是一个展示平台，它将繁复的剪纸技艺转化为直观的数字化交互体验。通过 AR 预览、智能临摹与社区分享，让每一位用户都能在掌上完成从感知到创作的全过程。
            </p>
          </div>

          <!-- 下：电脑模型 -->
          <div class="relative w-full flex justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-[#d2c4a7]/10 to-transparent blur-3xl rounded-full"></div>
            <LaptopAnimation />
          </div>
        </div>

        <!-- 右侧：模型展示区 -->
        <div class="flex flex-col items-center gap-12 lg:gap-4">
          <!-- 上：手机模型 -->
          <div class="relative w-full flex justify-center py-10">
            <div class="absolute inset-0 bg-gradient-to-b from-[#d2c4a7]/10 to-transparent blur-3xl rounded-full"></div>
            <PhoneAnimation class="scale-110" />
          </div>

          <!-- 下：纹样库简介 -->
          <div class="pt-12 border-t border-[#d8cfbd]/40 w-full">
            <h3 class="text-[#728275] text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
              <span class="w-8 h-[1px] bg-[#90a193]"></span> 剪艺纹样库
            </h3>
            <h2 class="text-3xl md:text-4xl font-medium tracking-tight text-[#2f3a32] mb-6">
              数字化传承的基因库。
            </h2>
            <p class="text-[#5f6e63] text-sm leading-relaxed max-w-md">
              我们深度提取了上千种传统剪纸纹样，进行数字化修复与矢量化建模。这不仅是一部活态的非遗百科全书，更为现代设计、文创开发提供了源源不断的东方美学灵感。
            </p>
            <div class="mt-8 flex gap-3">
              <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-lg bg-[#fffdf8] border border-[#d8cfbd]/40 flex items-center justify-center p-2">
                <img :src="`/src/assets/窗花01${6+i}.png`" class="w-full h-full object-contain opacity-60" alt="pattern icon">
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
    </div>

    <!-- Gallery Section -->
    <section class="py-24 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <!-- 左侧：纹样故事 -->
        <div>
          <h3 class="text-[#728275] text-[12px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
            <span class="w-8 h-[1px] bg-[#90a193]"></span> 经典展厅
          </h3>
          <h2 class="text-5xl md:text-6xl font-medium tracking-tight text-[#2f3a32] mb-8">系列 01：凤凰</h2>
          <p class="text-[#5f6e63] text-sm leading-relaxed max-w-xl mb-6">
            凤凰浴火重生于红纸金箔之间，在传统技艺与现代审美之间架起桥梁。细腻的镂空与层叠纸张形成鲜明光影，让平面的飞鸟升华为充满生命力的艺术图腾。
          </p>

          <div class="min-h-[180px]">
            <Transition name="gallery-text-fade" mode="out-in">
              <div :key="activeGalleryIndex" class="bg-[#fffdf8] border border-[#d8cfbd]/60 rounded-2xl p-6 transition-all duration-500">
                <p class="text-[#728275] text-[12px] font-bold uppercase tracking-[0.18em] mb-2">当前纹样</p>
                <h4 class="text-[#2f3a32] text-2xl font-medium mb-3">{{ activeGalleryItem.title }}</h4>
                <p class="text-[#5f6e63] text-sm leading-relaxed">{{ activeGalleryItem.desc }}</p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- 右侧：纹样图片（滚轮切换 + 上下方向渐入渐出动画） -->
        <div class="w-full">
          <div
            class="relative h-[520px] overflow-hidden rounded-2xl border border-[#d8cfbd]/60 bg-transparent"
            @wheel.prevent="handleGalleryWheel"
          >
            <Transition :name="slideDirection">
              <figure
                :key="activeGalleryIndex"
                class="absolute inset-0 overflow-hidden bg-transparent"
              >
                <img
                  :src="activeGalleryItem.image"
                  class="w-full h-full object-contain p-10 filter brightness-110 contrast-110"
                  :alt="activeGalleryItem.title"
                >
                <div class="absolute bottom-6 right-6 z-20">
                  <span class="px-4 py-2 bg-[#2f3a32]/80 backdrop-blur-md text-[#96AD92] text-[13px] font-bold uppercase tracking-widest rounded-full border border-[#96AD92]/30">
                    {{ activeGalleryItem.badge }}
                  </span>
                </div>
              </figure>
            </Transition>
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
        <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-30" alt="Forest mist">
        <div class="absolute inset-0 bg-[#2a3a32]/55"></div>
      </div>
      <div class="relative z-10 max-w-4xl">
        <p class="text-[#96AD92] text-[12px] font-bold uppercase tracking-[0.3em] mb-12">
          THE JIANYI MANIFESTO
        </p>
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-medium text-[#f6faf5] leading-snug tracking-tight">
          "我们不只是裁刻纸张。<br>我们在方寸之间，<br>雕琢大千世界。"
        </h2>
        <p class="text-[#c7d6c4] text-[13px] font-bold uppercase tracking-[0.2em] mt-12 flex items-center justify-center gap-4">
          <span class="w-6 h-[1px] bg-[#8da38a]"></span> 剪艺数字实验室，中国
        </p>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
    </div>

    <!-- Footer -->
    <footer class="pt-24 pb-12 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full">
      <!-- Top Footer Action -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#d8cfbd]/60 pb-20 mb-20">
        <div>
          <p class="text-[#728275] text-[12px] font-bold uppercase tracking-[0.2em] mb-6">Ready to create</p>
          <h2 class="text-4xl md:text-6xl font-medium tracking-tight text-[#2f3a32]">
            与剪艺一起<br>开启非遗之旅。
          </h2>
        </div>
        <div class="mt-10 md:mt-0 flex flex-col items-start md:items-end">
          <button @click="router.push('/collectibles')" class="bg-[#96AD92] text-[#0a0a0a] px-8 py-4 rounded-[2px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-[#7d9679] transition-all mb-4">
            浏览全系产品 ↗
          </button>
        </div>
      </div>

      <!-- Main Footer Links -->
      <div class="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
        <div class="max-w-xs">
          <div class="flex items-center gap-3 mb-6">
            <img src="@/assets/配色版矢量（标准）.svg" alt="剪艺 Logo" class="w-6 h-6 object-contain opacity-80">
            <h3 class="text-xl font-medium tracking-[0.3em] text-[#2f3a32]">剪艺</h3>
          </div>
          <p class="text-[#6d7b71] text-xs leading-relaxed">
            致力于传承与创新中国传统剪纸艺术，让非遗之美走进现代生活。匠心独运，纸上生花。
          </p>
          <div class="flex gap-4 mt-8">
            <div class="w-10 h-10 border border-[#d8cfbd]/70 rounded-full flex items-center justify-center hover:bg-[#edf3ea]/70 cursor-pointer transition-colors text-[#5f6e63] hover:text-white">IG</div>
            <div class="w-10 h-10 border border-[#d8cfbd]/70 rounded-full flex items-center justify-center hover:bg-[#edf3ea]/70 cursor-pointer transition-colors text-[#5f6e63] hover:text-white">TW</div>
            <div class="w-10 h-10 border border-[#d8cfbd]/70 rounded-full flex items-center justify-center hover:bg-[#edf3ea]/70 cursor-pointer transition-colors text-[#5f6e63] hover:text-white">YT</div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 flex-1 lg:ml-20">
          <div>
            <h4 class="text-[#5f6e63] text-[13px] font-bold uppercase tracking-[0.2em] mb-6">剪纸作品</h4>
            <ul class="space-y-4 text-xs text-[#4a5a50]">
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">传统窗花</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">现代纸雕</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">定制肖像</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">限量版典藏</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[#5f6e63] text-[13px] font-bold uppercase tracking-[0.2em] mb-6">工艺技法</h4>
            <ul class="space-y-4 text-xs text-[#4a5a50]">
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">单色剪纸</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">套色剪纸</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">多层纸雕</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">材料工艺</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[#5f6e63] text-[13px] font-bold uppercase tracking-[0.2em] mb-6">关于企业</h4>
            <ul class="space-y-4 text-xs text-[#4a5a50]">
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">关于剪艺</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">设计实验室</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">可持续发展</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">招贤纳士</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[#5f6e63] text-[13px] font-bold uppercase tracking-[0.2em] mb-6">用户支持</h4>
            <ul class="space-y-4 text-xs text-[#4a5a50]">
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">护理指南</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">保修条款</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">退换货政策</a></li>
              <li><a href="#" class="hover:text-[#2f3a32] transition-colors">联系我们</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="border-t border-[#d8cfbd]/60 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-[#6d7b71] font-bold uppercase tracking-[0.2em] gap-4">
        <p>© 2026 剪艺数字艺术有限公司</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-[#4a5a50] transition-colors">隐私政策</a>
          <a href="#" class="hover:text-[#4a5a50] transition-colors">服务条款</a>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import Carousel from '../components/Carousel.vue'
import LaptopAnimation from '../components/LaptopAnimation.vue'
import PhoneAnimation from '../components/PhoneAnimation.vue'
import { ThermometerSnowflake, ShieldCheck, MapPin } from 'lucide-vue-next'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { DURATION, STAGGER_DELAY } from '@/composables/anime.config.js'
import { getPatterns, getPatternDetail } from '@/api/patterns.js'
import pattern017 from '../assets/窗花017.png'
import pattern018 from '../assets/窗花018.png'
import pattern019 from '../assets/窗花019.png'

let observer = null
let galleryAnimationTimer = null

const router = useRouter()

const productHeadingRef = ref(null)
const productCardsRef = ref(null)
const techCardsRef = ref(null)
const activeGalleryIndex = ref(0)
const isGalleryAnimating = ref(false)
const slideDirection = ref('slide-up')

const DEFAULT_GALLERY_IDS = ['0001', '0002', '0003']

const fallbackGalleryItems = [
  {
    id: '0001',
    title: '《凤凰涅槃》',
    desc: '灵感源自历代剪纸纹饰与神话故事。在古代文明中，凤凰被视为吉祥与重生的神圣图腾，象征着永恒的生命力。',
    image: pattern017,
    badge: '馆藏作品 0001'
  },
  {
    id: '0002',
    title: '《匠心雕琢》',
    desc: '运用极细的镂空刀法与多层错位叠纸技术，重新诠释了这一传说。每一片羽毛与纹路都经过匠人数万次的精心刻画。',
    image: pattern018,
    badge: '馆藏作品 0002'
  },
  {
    id: '0003',
    title: '《非遗结晶》',
    desc: '这不仅是一件精美的剪纸艺术品，更是非遗技艺的结晶。通过现代设计语言，让传统纹样在当代空间中焕发光彩。',
    image: pattern019,
    badge: '馆藏作品 0003'
  }
]

const fallbackGalleryById = fallbackGalleryItems.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {})

const patternGalleryItems = ref([...fallbackGalleryItems])

const ensureGalleryTitle = (title = '') => {
  const normalized = `${title}`.trim()
  if (!normalized) return '《无标题作品》'
  return normalized.startsWith('《') ? normalized : `《${normalized}》`
}

const getFirstStoryParagraph = (story) => {
  if (Array.isArray(story)) {
    return story.map((item) => `${item ?? ''}`.trim()).find(Boolean) ?? ''
  }

  if (typeof story === 'string') {
    return story
      .split('\n')
      .map((item) => item.trim())
      .find(Boolean) ?? ''
  }

  return ''
}

const normalizeGalleryItem = (detail, fallbackItem, id) => {
  const title = ensureGalleryTitle(detail?.title ?? fallbackItem?.title)
  const storyParagraph = getFirstStoryParagraph(detail?.story)
  const desc = `${detail?.desc ?? ''}`.trim() || storyParagraph || fallbackItem?.desc || '暂无作品介绍'

  return {
    id: `${detail?.id ?? id ?? fallbackItem?.id ?? ''}`,
    title,
    desc,
    image: `${detail?.image ?? fallbackItem?.image ?? ''}`,
    badge: `馆藏作品 ${`${detail?.id ?? id ?? fallbackItem?.id ?? ''}`.padStart(4, '0')}`
  }
}

const loadGalleryData = async () => {
  let galleryIds = [...DEFAULT_GALLERY_IDS]

  try {
    const listResponse = await getPatterns()
    const list = Array.isArray(listResponse)
      ? listResponse
      : Array.isArray(listResponse?.data)
        ? listResponse.data
        : []

    const remoteIds = list
      .map((item) => `${item?.id ?? ''}`.trim())
      .filter(Boolean)

    if (remoteIds.length) {
      galleryIds = remoteIds.slice(0, fallbackGalleryItems.length)
    }
  } catch (error) {
    console.warn('首页经典展厅获取作品列表失败，使用本地兜底数据:', error)
  }

  const settled = await Promise.allSettled(galleryIds.map((id) => getPatternDetail(id)))

  const merged = galleryIds.map((id, index) => {
    const fallbackItem = fallbackGalleryById[id] ?? fallbackGalleryItems[index] ?? fallbackGalleryItems[0]
    const result = settled[index]

    if (result?.status === 'fulfilled') {
      return normalizeGalleryItem(result.value, fallbackItem, id)
    }

    return normalizeGalleryItem({}, fallbackItem, id)
  })

  patternGalleryItems.value = merged.length ? merged : [...fallbackGalleryItems]

  if (!patternGalleryItems.value.length) {
    activeGalleryIndex.value = 0
    return
  }

  activeGalleryIndex.value = Math.min(activeGalleryIndex.value, patternGalleryItems.value.length - 1)
}

const activeGalleryItem = computed(() => patternGalleryItems.value[activeGalleryIndex.value] ?? patternGalleryItems.value[0] ?? {
  title: '《无标题作品》',
  desc: '暂无作品介绍',
  image: '',
  badge: '馆藏作品 0000'
})

const GALLERY_ANIMATION_DURATION = 1200

const updateGalleryIndex = (targetIndex) => {
  if (!patternGalleryItems.value.length) return

  const safeIndex = Math.max(0, Math.min(patternGalleryItems.value.length - 1, targetIndex))
  if (safeIndex === activeGalleryIndex.value) return

  slideDirection.value = safeIndex > activeGalleryIndex.value ? 'slide-up' : 'slide-down'
  activeGalleryIndex.value = safeIndex
  isGalleryAnimating.value = true

  if (galleryAnimationTimer) {
    clearTimeout(galleryAnimationTimer)
  }

  galleryAnimationTimer = setTimeout(() => {
    isGalleryAnimating.value = false
  }, GALLERY_ANIMATION_DURATION)
}

const handleGalleryWheel = (event) => {
  if (isGalleryAnimating.value) return

  const deltaY = event?.deltaY ?? 0
  if (!deltaY) return

  if (deltaY > 0) {
    updateGalleryIndex(activeGalleryIndex.value + 1)
    return
  }

  updateGalleryIndex(activeGalleryIndex.value - 1)
}

const { reveal } = useScrollReveal()

onMounted(async () => {
  await loadGalleryData()

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

  // 产品区：标题和卡片滚动触发，支持重复进入视口时重播
  if (productHeadingRef.value) {
    reveal(productHeadingRef, { duration: DURATION.slow, threshold: 0.2 })
  }

  if (productCardsRef.value) {
    reveal(productCardsRef, {
      effect: 'stagger',
      duration: DURATION.base,
      delay: STAGGER_DELAY,
      threshold: 0.12
    })
  }

  if (techCardsRef.value) {
    reveal(techCardsRef, {
      effect: 'stagger',
      threshold: 0.1,
      delay: STAGGER_DELAY
    })
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()

  if (galleryAnimationTimer) {
    clearTimeout(galleryAnimationTimer)
  }
})
</script>

<style scoped>
.gallery-text-fade-enter-active,
.gallery-text-fade-leave-active {
  transition: opacity 0.6s ease;
}

.gallery-text-fade-enter-from,
.gallery-text-fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(56px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-56px);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-56px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(56px);
}
</style>