<script setup>
import { Hexagon } from 'lucide-vue-next'
import img from '../assets/窗花017.png'

const emit = defineEmits(['open-story'])
</script>

<template>
  <div class="relative w-full max-w-[420px] aspect-[4/5] mx-auto flex flex-col items-center justify-end overflow-hidden bg-evasion-grey rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] group border border-white/5 hover:border-white/20 transition-colors duration-700">
    
    <!-- Premium Acrylic Glass Cover Reflection -->
    <div class="absolute inset-0 z-40 pointer-events-none rounded-3xl overflow-hidden">
      <!-- Top highlight -->
      <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent"></div>
      <!-- Diagonal glass reflection -->
      <div class="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.03)_48%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.03)_52%,transparent_55%)] transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out"></div>
      <!-- Side rim light -->
      <div class="absolute inset-0 rounded-3xl shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
    </div>
    
    <!-- Tech Background Grid -->
    <div class="absolute inset-0 opacity-[0.03] z-0" style="background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px); background-size: 20px 20px;"></div>

    <!-- Floating Image with Hover Shimmer -->
    <div class="absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] z-20 cursor-pointer transition-transform duration-700 animate-float group-hover:scale-105" @click="emit('open-story')">
      <!-- The main image -->
      <div class="relative overflow-hidden">
        <img :src="img" alt="Artwork" class="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] filter brightness-150 contrast-125" />
        <!-- Tech Shimmer -->
        <div class="absolute inset-0 mix-blend-color-dodge bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.2)_40%,transparent_60%)] -translate-x-full group-hover:animate-[shimmer_2s_ease-in-out_infinite]"></div>
      </div>
    </div>

    <!-- Carbon Fiber Pedestal -->
    <div class="relative w-[85%] h-32 z-10 translate-y-6 flex flex-col items-center">
      
      <!-- Story Button -->
      <button class="absolute -top-6 left-1/2 -translate-x-1/2 z-30 w-12 h-12 bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center hover:bg-zinc-800 hover:border-white/30 transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.8)] group/btn" @click="emit('open-story')">
         <Hexagon class="w-6 h-6 text-zinc-400 group-hover/btn:text-white transition-colors" />
         <!-- Inner glow -->
         <div class="absolute inset-0 rounded-full bg-white/0 group-hover/btn:bg-white/5 transition-colors"></div>
      </button>

      <!-- Pedestal Surface -->
      <div class="w-full h-8 bg-[radial-gradient(ellipse_at_top,#2a2a2d,#0f0f11)] rounded-[50%] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_-5px_15px_rgba(0,0,0,0.5)] border-t border-white/5 z-20"></div>
      
      <!-- Pedestal Body -->
      <div class="w-[96%] h-24 bg-gradient-to-b from-[#151517] to-[#050505] pedestal-body shadow-[0_20px_40px_rgba(0,0,0,0.9)] z-10 -mt-4 border-b border-white/5 relative overflow-hidden">
        <!-- Carbon fiber texture hint -->
        <div class="absolute inset-0 opacity-[0.05]" style="background-image: repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000); background-position: 0 0, 4px 4px; background-size: 8px 8px;"></div>
        
        <!-- Plate info -->
        <div class="absolute top-6 w-full flex flex-col items-center">
          <div class="flex items-center gap-3">
            <h3 class="text-zinc-300 font-display font-bold text-sm tracking-[0.3em] uppercase">凤凰</h3>
          </div>
          <div class="mt-2 flex items-center gap-2 text-[10px] font-sans font-bold text-zinc-500 uppercase tracking-widest">
            <span class="border border-white/10 px-3 py-1 rounded-full shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]">编号 0001/8000</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, -10px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.pedestal-body {
  border-bottom-left-radius: 40% 15px;
  border-bottom-right-radius: 40% 15px;
}
</style>