<script setup>
import { X, FileText, User, Building } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="emit('close')"></div>
    
    <!-- Modal -->
    <div class="relative w-full max-w-5xl h-[85vh] bg-evasion-grey border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row font-sans text-white">
      
      <!-- Close Button -->
      <button @click="emit('close')" class="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black rounded-full text-zinc-400 hover:text-white border border-white/10 transition-colors">
        <X class="w-5 h-5" />
      </button>

      <!-- Left Column: Story (PDF Image) -->
      <div class="flex-1 h-1/2 md:h-full overflow-y-auto bg-zinc-950 relative custom-scrollbar flex flex-col">
        <div class="sticky top-0 z-10 p-6 pb-4 border-b border-white/10 bg-zinc-950/95 backdrop-blur-md flex items-center gap-2">
           <FileText class="w-5 h-5 text-accent" />
           <h3 class="text-xs font-bold text-white uppercase tracking-[0.2em]">作品档案</h3>
        </div>
        
        <!-- Simulate PDF document view -->
        <div class="p-6 pt-4 flex-1">
          <div class="w-full bg-[#E5E5E5] rounded-lg text-black p-8 md:p-12 shadow-inner min-h-[600px] shadow-2xl border border-white/20">
           <div class="text-center mb-8 border-b-2 border-black/10 pb-4">
             <h1 class="text-3xl font-display font-black text-black mb-2 uppercase tracking-widest">凤凰涅槃</h1>
             <p class="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em]">收藏证书</p>
           </div>
           
           <div class="space-y-6 text-zinc-800 leading-relaxed text-justify px-4 text-sm font-medium">
             <p class="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-black">
               凤凰浴火重生于红纸金箔之间，在传统技艺与现代审美之间架起桥梁。
             </p>
             <p>
               本作品“系列 01：凤凰”的灵感源自历代剪纸纹饰与神话故事。在古代文明中，凤凰被视为吉祥与重生的神圣图腾。我们的非遗传承人运用极细的镂空刀法与多层错位叠纸技术，重新诠释了这一传说。
             </p>
             <p>
               这件作品中的每一片羽毛与纹路都经过匠人上万次的精心刻画，纸张的层叠在光线照射下展现出令人惊叹的立体感。它不仅是一件精美的剪纸艺术品，更是非遗技艺的结晶。
             </p>
             <div class="mt-12 text-center opacity-60">
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" class="w-32 h-32 object-cover mx-auto mix-blend-multiply rounded-full filter grayscale" alt="Seal" />
             </div>
           </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Details -->
      <div class="w-full md:w-80 lg:w-96 bg-evasion-grey h-1/2 md:h-full border-t md:border-t-0 md:border-l border-white/10 p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
        
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-white mb-2">
            <User class="w-5 h-5 text-accent" />
            <h4 class="text-xs font-bold uppercase tracking-[0.2em]">创作者</h4>
          </div>
          <div class="bg-zinc-900 border border-white/5 rounded-xl p-5 hover:border-white/20 transition-colors shadow-inner">
            <h5 class="text-sm text-white font-bold mb-2 uppercase tracking-widest">剪艺工坊</h5>
            <p class="text-xs text-zinc-500 leading-relaxed font-medium">
              一个由国家级非遗传承人与新锐设计师组成的团队，致力于让传统剪纸艺术焕发时代光彩。
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3 text-white mb-2">
            <Building class="w-5 h-5 text-accent" />
            <h4 class="text-xs font-bold uppercase tracking-[0.2em]">出品方</h4>
          </div>
          <div class="bg-zinc-900 border border-white/5 rounded-xl p-5 hover:border-white/20 transition-colors shadow-inner">
            <h5 class="text-sm text-white font-bold mb-2 uppercase tracking-widest">剪艺文化</h5>
            <p class="text-xs text-zinc-500 leading-relaxed font-medium">
              国内领先的非遗手工艺品与现代文创开发品牌。
            </p>
            <div class="mt-4 pt-4 border-t border-white/10">
               <span class="inline-block px-3 py-1 bg-zinc-950 text-accent text-[10px] uppercase font-bold tracking-widest rounded-full border border-white/5">馆藏级限量发售</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
</style>