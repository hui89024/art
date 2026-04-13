<script setup>
import { ref } from 'vue'
import CollectibleDisplay from '../components/CollectibleDisplay.vue'
import StoryModal from '../components/StoryModal.vue'
import { ShieldCheck, Database } from 'lucide-vue-next'

const showStory = ref(false)
</script>

<template>
  <main class="pt-24 min-h-screen bg-evasion-black flex flex-col relative overflow-hidden font-sans text-white">
    <div class="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto z-10 px-6 lg:px-12 py-10">
      
      <!-- Left Column: Display -->
      <div class="flex-1 flex items-center justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 relative">
        <CollectibleDisplay @open-story="showStory = true" />
      </div>

      <!-- Right Column: Info -->
      <div class="flex-1 flex flex-col justify-center p-8 lg:p-20 space-y-10 relative">
        <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-evasion-grey border border-white/10 text-accent text-xs tracking-widest w-fit uppercase font-bold">
          <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          作品档案
        </div>
        
        <h1 class="text-5xl md:text-7xl font-black font-display tracking-tight text-white uppercase mb-2">
          系列 01：凤凰
        </h1>
        
        <div class="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <span class="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-white">纯手工雕刻</span>
          <span class="px-4 py-2 rounded-full bg-transparent border border-zinc-800 text-zinc-400">非遗传承</span>
        </div>

        <p class="text-zinc-400 text-sm leading-relaxed mt-8 font-light max-w-md">
          这件作品以传统剪纸技法为基础，融入现代设计语言。细腻的镂空与层叠的纸张形成鲜明的光影对比，将平面的飞鸟升华为充满生命力的艺术图腾。
        </p>
        
        <div class="pt-8 border-t border-white/10 space-y-8 max-w-md">
          <div class="flex items-start gap-5 group">
            <div class="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-white group-hover:border-zinc-500 transition-all duration-300">
              <ShieldCheck class="w-6 h-6" />
            </div>
            <div class="pt-1">
              <h4 class="text-white font-bold text-sm uppercase tracking-widest mb-1">馆藏级认证</h4>
              <p class="text-xs text-zinc-500 font-light">防伪溯源，专属收藏证书</p>
            </div>
          </div>
          
          <div class="flex items-start gap-5 group">
            <div class="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-white group-hover:border-zinc-500 transition-all duration-300">
              <Database class="w-6 h-6" />
            </div>
            <div class="pt-1">
              <h4 class="text-white font-bold text-sm uppercase tracking-widest mb-1">装裱工艺</h4>
              <p class="text-xs text-zinc-500 font-light">无酸装裱，防紫外线亚克力镜面</p>
            </div>
          </div>
        </div>

        <button @click="showStory = true" class="mt-8 px-12 py-5 relative overflow-hidden group w-fit rounded-full border border-white/20 hover:border-white transition-colors duration-500 bg-evasion-grey">
          <div class="relative z-10 flex items-center gap-4">
            <span class="text-white font-bold tracking-[0.2em] text-xs uppercase group-hover:text-white transition-colors">作品详情</span>
            <div class="w-6 h-[1px] bg-zinc-500 group-hover:w-10 group-hover:bg-white transition-all duration-300"></div>
          </div>
        </button>
      </div>

    </div>

    <Teleport to="body">
      <StoryModal :is-open="showStory" @close="showStory = false" />
    </Teleport>
  </main>
</template>