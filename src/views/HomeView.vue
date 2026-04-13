<template>
  <main class="min-h-screen bg-evasion-black flex flex-col font-sans text-white">
    <!-- Hero Section -->
    <Carousel />
    
    <!-- Product Highlight Section -->
    <section class="py-24 sm:py-32 px-6 lg:px-12 bg-evasion-black max-w-[1600px] mx-auto w-full">
      <div class="mb-16">
        <h3 class="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
          <span class="w-8 h-[1px] bg-[#333]"></span> 核心作品
        </h3>
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div class="max-w-2xl">
            <h2 class="text-5xl md:text-7xl font-medium tracking-tight text-[#e5e5e5] mb-6">千刻万镂，传世之美。</h2>
            <p class="text-[#888] text-sm leading-relaxed max-w-md">
              每一件纸艺作品都历经匠心雕琢，刀锋婉转间，呈现超越平凡的东方美学。传统技艺与现代设计的完美交融。
            </p>
          </div>
        </div>
      </div>

      <!-- 3 Columns Products -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
          <div class="relative aspect-[4/3] overflow-hidden bg-zinc-900 flex justify-center items-center p-8">
            <div class="absolute top-4 left-4 z-10 bg-[#1a1a1a] px-3 py-1.5 rounded-[2px] text-[9px] font-bold tracking-[0.2em] uppercase text-[#D2C4A7]">
              New Arrival
            </div>
            <img src="../assets/窗花017.png" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="Product">
          </div>
          <div class="p-8">
            <p class="text-[#555] text-[9px] font-bold uppercase tracking-[0.2em] mb-3">系列 01 · 暮金流影</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-[#e5e5e5]">生生不息</h4>
              <span class="text-[#555] group-hover:text-white transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-[#888] text-xs leading-relaxed mb-8">
              以传统窗花语言为核心，提炼纹样、留白与层叠结构，呈现生生不息的繁荣愿景。
            </p>
            <div class="flex justify-between items-center border-t border-white/5 pt-6">
              <span class="text-[#D2C4A7] font-medium text-sm">限量 8000 份</span>
              <button class="border border-white/10 px-6 py-2.5 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.1em] text-[#ccc] hover:bg-white/5 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
          <div class="relative aspect-[4/3] overflow-hidden bg-zinc-900 flex justify-center items-center p-8">
            <div class="absolute top-4 left-4 z-10 bg-[#1a1a1a] px-3 py-1.5 rounded-[2px] text-[9px] font-bold tracking-[0.2em] uppercase text-[#D2C4A7]">
              Bestseller
            </div>
            <img src="../assets/窗花018.png" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="Product">
          </div>
          <div class="p-8">
            <p class="text-[#555] text-[9px] font-bold uppercase tracking-[0.2em] mb-3">系列 02 · 玉紫华章</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-[#e5e5e5]">鱼跃龙门</h4>
              <span class="text-[#555] group-hover:text-white transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-[#888] text-xs leading-relaxed mb-8">
              细腻镂空与金色轮廓相映，传说中的锦鲤化龙，象征着终极的胜利与荣耀。
            </p>
            <div class="flex justify-between items-center border-t border-white/5 pt-6">
              <span class="text-[#D2C4A7] font-medium text-sm">限量 5000 份</span>
              <button class="border border-white/10 px-6 py-2.5 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.1em] text-[#ccc] hover:bg-white/5 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
          <div class="relative aspect-[4/3] overflow-hidden bg-zinc-900 flex justify-center items-center p-8">
            <div class="absolute top-4 left-4 z-10 bg-[#1a1a1a] px-3 py-1.5 rounded-[2px] text-[9px] font-bold tracking-[0.2em] uppercase text-[#D2C4A7]">
              Limited
            </div>
            <img src="../assets/窗花019.png" class="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700" alt="Product">
          </div>
          <div class="p-8">
            <p class="text-[#555] text-[9px] font-bold uppercase tracking-[0.2em] mb-3">系列 03 · 典藏映辉</p>
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-2xl font-medium text-[#e5e5e5]">天命玄鸟</h4>
              <span class="text-[#555] group-hover:text-white transition-colors cursor-pointer">↗</span>
            </div>
            <p class="text-[#888] text-xs leading-relaxed mb-8">
              以暗玉紫铺陈深邃氛围，借由剪艺纹样传递守护与新生的东方神话信仰。
            </p>
            <div class="flex justify-between items-center border-t border-white/5 pt-6">
              <span class="text-[#D2C4A7] font-medium text-sm">已售罄</span>
              <button class="border border-white/10 px-6 py-2.5 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.1em] text-[#ccc] hover:bg-white/5 transition-colors">
                详情
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-16 text-center border-b border-white/5 pb-24">
        <button class="border border-white/10 px-8 py-4 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.15em] text-white hover:bg-white/5 transition-colors flex items-center justify-center mx-auto gap-2">
          查看所有作品 ↗
        </button>
      </div>
    </section>

    <!-- Technology Section -->
    <section id="technology" class="py-24 px-6 lg:px-12 bg-evasion-black max-w-[1600px] mx-auto w-full">
      <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div class="max-w-2xl">
          <h3 class="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
            <span class="w-8 h-[1px] bg-[#333]"></span> 核心工艺
          </h3>
          <h2 class="text-5xl md:text-7xl font-medium tracking-tight text-[#e5e5e5]">剪艺背后的坚持。</h2>
        </div>
        <div class="max-w-xs pt-4 md:pt-12">
          <p class="text-[#888] text-sm leading-relaxed">
            每一刀刻画，每一次镂空，都只有一个目的：让纸张焕发新生，让你纯粹地感受剪纸艺术的灵动与震撼。
          </p>
        </div>
      </div>

      <!-- 4 Columns Tech Specs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-[#111] border border-white/5 rounded-2xl p-8 hover:bg-[#151515] transition-colors flex flex-col justify-between min-h-[360px]">
          <div>
            <div class="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center mb-8">
              <ShieldCheck class="w-4 h-4 text-[#888]" />
            </div>
            <h4 class="text-4xl font-medium text-white mb-2 tracking-tight">非遗传承</h4>
            <p class="text-[#555] text-[9px] font-bold uppercase tracking-[0.2em]">国家级非物质文化遗产</p>
          </div>
          <div class="mt-8">
            <p class="text-[#D2C4A7] text-[9px] font-bold uppercase tracking-[0.1em] mb-2">世代相传的记忆</p>
            <h5 class="text-white font-medium mb-2">技艺传承</h5>
            <p class="text-[#888] text-xs leading-relaxed">
              每一件作品都承载着千百年的文化积淀，通过师徒相授，将精湛的剪纸技艺代代相传。
            </p>
          </div>
        </div>

        <div class="bg-[#111] border border-white/5 rounded-2xl p-8 hover:bg-[#151515] transition-colors flex flex-col justify-between min-h-[360px]">
          <div>
            <div class="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center mb-8">
              <ThermometerSnowflake class="w-4 h-4 text-[#888]" />
            </div>
            <h4 class="text-4xl font-medium text-white mb-2 tracking-tight">微米级雕刻</h4>
            <p class="text-[#555] text-[9px] font-bold uppercase tracking-[0.2em]">极光微雕工艺</p>
          </div>
          <div class="mt-8">
            <p class="text-[#D2C4A7] text-[9px] font-bold uppercase tracking-[0.1em] mb-2">丝丝入扣的细节表现</p>
            <h5 class="text-white font-medium mb-2">多维立体层叠</h5>
            <p class="text-[#888] text-xs leading-relaxed">
              采用多层镂空与叠层技术，赋予平面纸张突破维度的立体感与丰富的光影变幻。
            </p>
          </div>
        </div>

        <div class="bg-[#111] border border-white/5 rounded-2xl p-8 hover:bg-[#151515] transition-colors flex flex-col justify-between min-h-[360px]">
          <div>
            <div class="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center mb-8">
              <MapPin class="w-4 h-4 text-[#888]" />
            </div>
            <h4 class="text-4xl font-medium text-white mb-2 tracking-tight">纯手工</h4>
            <p class="text-[#555] text-[9px] font-bold uppercase tracking-[0.2em]">匠心独运的坚持</p>
          </div>
          <div class="mt-8">
            <p class="text-[#D2C4A7] text-[9px] font-bold uppercase tracking-[0.1em] mb-2">指尖的温度</p>
            <h5 class="text-white font-medium mb-2">精细刻画</h5>
            <p class="text-[#888] text-xs leading-relaxed">
              每一道刻痕都留有匠人的温度，手工雕琢的独特魅力是任何机械都无法替代的。
            </p>
          </div>
        </div>

        <div class="bg-[#111] border border-white/5 rounded-2xl p-8 hover:bg-[#151515] transition-colors flex flex-col justify-between min-h-[360px]">
          <div>
            <div class="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center mb-8">
              <MapPin class="w-4 h-4 text-[#888]" />
            </div>
            <h4 class="text-4xl font-medium text-white mb-2 tracking-tight">无酸装裱</h4>
            <p class="text-[#555] text-[9px] font-bold uppercase tracking-[0.2em]">博物馆级典藏标准</p>
          </div>
          <div class="mt-8">
            <p class="text-[#D2C4A7] text-[9px] font-bold uppercase tracking-[0.1em] mb-2">历久弥新的保存</p>
            <h5 class="text-white font-medium mb-2">专业级防护装裱</h5>
            <p class="text-[#888] text-xs leading-relaxed">
              采用博物馆级无酸纸与专业防紫外线装裱技术，确保剪纸作品历经岁月洗礼依然色彩如新。
            </p>
          </div>
        </div>
      </div>
      
      <div class="mt-16 flex justify-between items-center border-t border-white/5 pt-12">
        <p class="text-[#666] text-xs">所有作品均附带国家级非物质文化遗产传承人亲笔签名证书。</p>
        <button class="border border-white/10 px-6 py-3 rounded-[2px] text-[9px] font-bold uppercase tracking-[0.15em] text-[#ccc] hover:bg-white/5 transition-colors">
          了解工艺详情
        </button>
      </div>
    </section>

    <!-- Digital Lab Section -->
    <section class="py-24 px-6 lg:px-12 bg-evasion-black max-w-[1600px] mx-auto w-full border-y border-white/5 overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
            <span class="w-8 h-[1px] bg-[#333]"></span> 数字实验室
          </h3>
          <h2 class="text-4xl md:text-6xl font-medium tracking-tight text-[#e5e5e5] mb-6">
            让作品在屏幕中再次绽放。
          </h2>
          <p class="text-[#888] text-sm leading-relaxed max-w-md">
            我们将纸艺纹样映射进数字载体，让传统工艺以沉浸式视觉在新媒介中延展生命力。
          </p>
        </div>
        <div class="flex flex-wrap items-end justify-center gap-6 lg:gap-8">
          <div class="shrink-0">
            <LaptopAnimation />
          </div>
          <div class="shrink-0">
            <PhoneAnimation />
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-24 px-6 lg:px-12 bg-evasion-black max-w-[1600px] mx-auto w-full overflow-hidden">
      <div class="flex justify-between items-end mb-16">
        <div>
          <h3 class="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
            <span class="w-8 h-[1px] bg-[#333]"></span> 经典展厅
          </h3>
          <h2 class="text-5xl md:text-7xl font-medium tracking-tight text-[#e5e5e5]">纸艺与光影<br>的交织。</h2>
        </div>
        <div class="flex gap-4">
          <button class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white">
            &lt;
          </button>
          <button class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white">
            &gt;
          </button>
        </div>
      </div>

      <div class="flex gap-6 overflow-x-auto pb-8 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div class="min-w-[300px] md:min-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden relative snap-start group">
          <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-8 left-8">
            <p class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mb-2">《春风得意》，红纸金箔</p>
            <h4 class="text-white text-xl font-medium">繁花似锦</h4>
          </div>
        </div>
        <div class="min-w-[300px] md:min-w-[500px] aspect-[4/3] mt-auto rounded-2xl overflow-hidden relative snap-start group">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-8 left-8">
            <p class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mb-2">《瑞兽呈祥》，宣纸微雕</p>
            <h4 class="text-white text-xl font-medium">龙腾四海</h4>
          </div>
        </div>
        <div class="min-w-[300px] md:min-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden relative snap-start group">
          <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-8 left-8">
            <p class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mb-2">《山水清音》，多层叠纸</p>
            <h4 class="text-white text-xl font-medium">层峦叠嶂</h4>
          </div>
        </div>
        <div class="min-w-[300px] md:min-w-[300px] aspect-[4/5] mt-auto rounded-2xl overflow-hidden relative snap-start group">
          <img src="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-8 left-8">
            <p class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mb-2">《梅花傲雪》，镂空剪影</p>
            <h4 class="text-white text-xl font-medium">暗香浮动</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Manifesto Section -->
    <section class="relative py-48 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-y border-white/5">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-30" alt="Forest mist">
        <div class="absolute inset-0 bg-evasion-black/70"></div>
      </div>
      <div class="relative z-10 max-w-4xl">
        <p class="text-[#D2C4A7] text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
          THE JIANYI MANIFESTO
        </p>
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-medium text-[#e5e5e5] leading-snug tracking-tight">
          "我们不只是裁刻纸张。<br>我们在方寸之间，<br>雕琢大千世界。"
        </h2>
        <p class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mt-12 flex items-center justify-center gap-4">
          <span class="w-6 h-[1px] bg-[#555]"></span> 剪艺数字实验室，中国
        </p>
      </div>
    </section>

    <!-- Accessories Section -->
    <section class="py-24 px-6 lg:px-12 bg-evasion-black max-w-[1600px] mx-auto w-full">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h3 class="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
            <span class="w-8 h-[1px] bg-[#333]"></span> 文创周边
          </h3>
          <h2 class="text-5xl md:text-7xl font-medium tracking-tight text-[#e5e5e5]">点缀你的艺术生活。</h2>
        </div>
        <button class="border border-white/10 px-8 py-3.5 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.15em] text-[#ccc] hover:bg-white/5 transition-colors">
          查看所有周边 ↗
        </button>
      </div>

      <!-- 4 Columns Accessories -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1 -->
        <div class="bg-[#111] rounded-2xl overflow-hidden border border-white/5 group">
          <div class="aspect-[4/3] relative overflow-hidden bg-zinc-900">
            <div class="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 text-[8px] font-bold tracking-[0.2em] uppercase text-white">
              Essential
            </div>
            <img src="https://images.unsplash.com/photo-1518873890627-d4b177c06e51?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" alt="Accessory">
          </div>
          <div class="p-6 flex justify-between items-end">
            <div>
              <p class="text-[#555] text-[8px] font-bold uppercase tracking-[0.2em] mb-2">生活美学 ↗</p>
              <h4 class="text-white font-medium text-lg">剪纸艺术夜灯</h4>
            </div>
            <p class="text-[#D2C4A7] font-medium text-sm">¥389</p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-[#111] rounded-2xl overflow-hidden border border-white/5 group">
          <div class="aspect-[4/3] relative overflow-hidden bg-zinc-900">
            <div class="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 text-[8px] font-bold tracking-[0.2em] uppercase text-white">
              Popular
            </div>
            <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" alt="Accessory">
          </div>
          <div class="p-6 flex justify-between items-end">
            <div>
              <p class="text-[#555] text-[8px] font-bold uppercase tracking-[0.2em] mb-2">桌面装饰 ↗</p>
              <h4 class="text-white font-medium text-lg">立体纸雕摆件</h4>
            </div>
            <p class="text-[#D2C4A7] font-medium text-sm">¥128</p>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-[#111] rounded-2xl overflow-hidden border border-white/5 group">
          <div class="aspect-[4/3] relative overflow-hidden bg-zinc-900">
            <div class="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 text-[8px] font-bold tracking-[0.2em] uppercase text-white">
              New
            </div>
            <img src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" alt="Accessory">
          </div>
          <div class="p-6 flex justify-between items-end">
            <div>
              <p class="text-[#555] text-[8px] font-bold uppercase tracking-[0.2em] mb-2">日常好物 ↗</p>
              <h4 class="text-white font-medium text-lg">镂空剪纸书签套盒</h4>
            </div>
            <p class="text-[#D2C4A7] font-medium text-sm">¥245</p>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-[#111] rounded-2xl overflow-hidden border border-white/5 group">
          <div class="aspect-[4/3] relative overflow-hidden bg-zinc-900">
            <div class="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 text-[8px] font-bold tracking-[0.2em] uppercase text-white">
              Classic
            </div>
            <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" alt="Accessory">
          </div>
          <div class="p-6 flex justify-between items-end">
            <div>
              <p class="text-[#555] text-[8px] font-bold uppercase tracking-[0.2em] mb-2">手工套件 ↗</p>
              <h4 class="text-white font-medium text-lg">剪纸入门体验套装</h4>
            </div>
            <p class="text-[#D2C4A7] font-medium text-sm">¥195</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="pt-24 pb-12 px-6 lg:px-12 bg-evasion-black max-w-[1600px] mx-auto w-full">
      <!-- Top Footer Action -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-20 mb-20">
        <div>
          <p class="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Ready to create</p>
          <h2 class="text-4xl md:text-6xl font-medium tracking-tight text-[#e5e5e5]">
            与剪艺一起<br>开启非遗之旅。
          </h2>
        </div>
        <div class="mt-10 md:mt-0 flex flex-col items-start md:items-end">
          <button class="bg-[#D2C4A7] text-[#0a0a0a] px-8 py-4 rounded-[2px] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#b5a68a] transition-all mb-4">
            浏览全系产品 ↗
          </button>
          <p class="text-[#666] text-xs">全国顺丰包邮，满 ¥500 附赠定制礼盒。</p>
        </div>
      </div>

      <!-- Main Footer Links -->
      <div class="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
        <div class="max-w-xs">
          <h3 class="text-xl font-medium tracking-[0.3em] text-white mb-6">剪艺</h3>
          <p class="text-[#666] text-xs leading-relaxed">
            致力于传承与创新中国传统剪纸艺术，让非遗之美走进现代生活。匠心独运，纸上生花。
          </p>
          <div class="flex gap-4 mt-8">
            <div class="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors text-[#888] hover:text-white">IG</div>
            <div class="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors text-[#888] hover:text-white">TW</div>
            <div class="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors text-[#888] hover:text-white">YT</div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 flex-1 lg:ml-20">
          <div>
            <h4 class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mb-6">剪纸作品</h4>
            <ul class="space-y-4 text-xs text-[#ccc]">
              <li><a href="#" class="hover:text-white transition-colors">传统窗花</a></li>
              <li><a href="#" class="hover:text-white transition-colors">现代纸雕</a></li>
              <li><a href="#" class="hover:text-white transition-colors">定制肖像</a></li>
              <li><a href="#" class="hover:text-white transition-colors">限量版典藏</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mb-6">工艺技法</h4>
            <ul class="space-y-4 text-xs text-[#ccc]">
              <li><a href="#" class="hover:text-white transition-colors">单色剪纸</a></li>
              <li><a href="#" class="hover:text-white transition-colors">套色剪纸</a></li>
              <li><a href="#" class="hover:text-white transition-colors">多层纸雕</a></li>
              <li><a href="#" class="hover:text-white transition-colors">材料工艺</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mb-6">关于企业</h4>
            <ul class="space-y-4 text-xs text-[#ccc]">
              <li><a href="#" class="hover:text-white transition-colors">关于剪艺</a></li>
              <li><a href="#" class="hover:text-white transition-colors">设计实验室</a></li>
              <li><a href="#" class="hover:text-white transition-colors">可持续发展</a></li>
              <li><a href="#" class="hover:text-white transition-colors">招贤纳士</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[#888] text-[9px] font-bold uppercase tracking-[0.2em] mb-6">用户支持</h4>
            <ul class="space-y-4 text-xs text-[#ccc]">
              <li><a href="#" class="hover:text-white transition-colors">护理指南</a></li>
              <li><a href="#" class="hover:text-white transition-colors">保修条款</a></li>
              <li><a href="#" class="hover:text-white transition-colors">退换货政策</a></li>
              <li><a href="#" class="hover:text-white transition-colors">联系我们</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#666] font-bold uppercase tracking-[0.2em] gap-4">
        <p>© 2026 剪艺数字艺术有限公司</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-[#ccc] transition-colors">隐私政策</a>
          <a href="#" class="hover:text-[#ccc] transition-colors">服务条款</a>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Carousel from '../components/Carousel.vue'
import LaptopAnimation from '../components/LaptopAnimation.vue'
import PhoneAnimation from '../components/PhoneAnimation.vue'
import { ThermometerSnowflake, ShieldCheck, MapPin } from 'lucide-vue-next'

const accessoriesTrackRef = ref(null)
let observer = null

const accessoriesItems = [
  {
    badge: 'Essential',
    tag: '生活美学',
    title: '剪纸艺术夜灯',
    price: '¥389',
    image: 'https://images.unsplash.com/photo-1518873890627-d4b177c06e51?q=80&w=600&auto=format&fit=crop'
  },
  {
    badge: 'Popular',
    tag: '桌面装饰',
    title: '立体纸雕摆件',
    price: '¥128',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
  },
  {
    badge: 'New',
    tag: '日常好物',
    title: '镂空剪纸书签套盒',
    price: '¥245',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600&auto=format&fit=crop'
  },
  {
    badge: 'Classic',
    tag: '手工套件',
    title: '剪纸入门体验套装',
    price: '¥195',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop'
  }
]

const updateParallax = (event) => {
  const track = accessoriesTrackRef.value
  if (!track) return

  const cards = track.querySelectorAll('.js-accessory-card')
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left - rect.width / 2) / rect.width
    const relativeY = (event.clientY - rect.top - rect.height / 2) / rect.height

    card.style.setProperty('--mx', `${(relativeX * 16).toFixed(2)}px`)
    card.style.setProperty('--my', `${(relativeY * 12).toFixed(2)}px`)
  })
}

const resetParallax = () => {
  const track = accessoriesTrackRef.value
  if (!track) return

  track.querySelectorAll('.js-accessory-card').forEach((card) => {
    card.style.setProperty('--mx', '0px')
    card.style.setProperty('--my', '0px')
  })
}

onMounted(() => {
  if (!accessoriesItems.length) return

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal, .js-accessory-card').forEach((el) => observer?.observe(el))

  const track = accessoriesTrackRef.value
  if (track) {
    track.addEventListener('mousemove', updateParallax)
    track.addEventListener('mouseleave', resetParallax)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()

  const track = accessoriesTrackRef.value
  if (track) {
    track.removeEventListener('mousemove', updateParallax)
    track.removeEventListener('mouseleave', resetParallax)
  }
})
</script>