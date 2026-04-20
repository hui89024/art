<script setup>
import { Hexagon } from 'lucide-vue-next'

const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '凤凰'
  },
  patternCode: {
    type: String,
    default: 'PHX-2024-001'
  }
})

const emit = defineEmits(['open-story'])
</script>

<template>
  <div class="relative w-full max-w-[420px] aspect-[4/5] mx-auto flex flex-col items-center justify-end overflow-hidden bg-[#f8f3ea] rounded-3xl shadow-[0_24px_45px_rgba(154,132,98,0.22)] group border border-[#eadfcf] hover:border-[#dbc8ab] transition-colors duration-700">
    <div class="absolute inset-0 z-40 pointer-events-none rounded-3xl overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/60 to-transparent"></div>
      <div class="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.2)_48%,rgba(255,255,255,0.55)_50%,rgba(255,255,255,0.2)_52%,transparent_55%)] transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out"></div>
      <div class="absolute inset-0 rounded-3xl shadow-[inset_0_0_3px_rgba(231,216,188,0.9)]"></div>
    </div>

    <div class="absolute inset-0 opacity-[0.22] z-0" style="background-image: linear-gradient(rgba(184,160,124,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(184,160,124,0.2) 1px, transparent 1px); background-size: 20px 20px;"></div>

    <div class="absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] z-20 cursor-pointer transition-transform duration-700 animate-float group-hover:scale-105" @click="emit('open-story')">
      <div class="relative overflow-hidden">
        <img :src="props.image" :alt="props.title" class="w-full h-auto drop-shadow-[0_12px_18px_rgba(154,132,98,0.28)] filter brightness-105 contrast-110" />
        <div class="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.45)_40%,transparent_60%)] -translate-x-full group-hover:animate-[shimmer_2s_ease-in-out_infinite]"></div>
      </div>
    </div>

    <div class="relative w-[85%] h-32 z-10 translate-y-6 flex flex-col items-center">
      <button class="absolute -top-6 left-1/2 -translate-x-1/2 z-30 w-12 h-12 bg-[#f7efe1] rounded-full border border-[#d9c6a4] flex items-center justify-center hover:bg-[#f3e7d4] hover:border-[#cdb387] transition-all duration-300 shadow-[0_5px_15px_rgba(168,143,104,0.25)] group/btn" @click="emit('open-story')">
        <Hexagon class="w-6 h-6 text-[#b59c75] group-hover/btn:text-[#9d845d] transition-colors" />
        <div class="absolute inset-0 rounded-full bg-white/0 group-hover/btn:bg-white/40 transition-colors"></div>
      </button>

      <div class="w-full h-8 bg-[radial-gradient(ellipse_at_top,#fffdf8,#eadfcf)] rounded-[50%] shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),0_-4px_12px_rgba(188,164,127,0.28)] border-t border-[#f6f0e5] z-20"></div>

      <div class="w-[96%] h-24 bg-gradient-to-b from-[#f7efe2] to-[#ecdfc9] pedestal-body shadow-[0_14px_26px_rgba(173,147,109,0.25)] z-10 -mt-4 border-b border-[#ddccb0] relative overflow-hidden">
        <div class="absolute inset-0 opacity-[0.18]" style="background-image: repeating-linear-gradient(45deg, #d8c7aa 25%, transparent 25%, transparent 75%, #d8c7aa 75%, #d8c7aa), repeating-linear-gradient(45deg, #d8c7aa 25%, transparent 25%, transparent 75%, #d8c7aa 75%, #d8c7aa); background-position: 0 0, 4px 4px; background-size: 8px 8px;"></div>

        <div class="absolute top-6 w-full flex flex-col items-center">
          <div class="flex items-center gap-3">
            <h3 class="text-[#8d7858] font-display font-bold text-sm tracking-[0.3em] uppercase">{{ props.title }}</h3>
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
