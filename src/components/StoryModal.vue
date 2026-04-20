<script setup>
import { X, FileText, User, Building } from 'lucide-vue-next'

const props = defineProps({
  artifact: {
    type: Object,
    default: () => ({
      title: '凤凰涅槃',
      certificate: '收藏证书',
      story: [
        '凤凰浴火重生于红纸金箔之间，在传统技艺与现代审美之间架起桥梁。'
      ]
    })
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
    <div class="absolute inset-0 bg-black/45 backdrop-blur-md" @click="emit('close')"></div>

    <div data-modal-box class="relative w-full max-w-5xl h-[85vh] bg-[#f8f3ea] border border-[#e7dac4] rounded-2xl shadow-[0_20px_40px_rgba(143,121,88,0.2)] overflow-hidden flex flex-col md:flex-row font-sans text-[#8f7d62]">
      <button @click="emit('close')" class="absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-white rounded-full text-[#a58d67] hover:text-[#836a48] border border-[#e2d2b7] transition-colors">
        <X class="w-5 h-5" />
      </button>

      <div class="flex-1 h-1/2 md:h-full overflow-y-auto bg-[#f6efe3] relative custom-scrollbar flex flex-col">
        <div class="sticky top-0 z-10 p-6 pb-4 border-b border-[#e5d8c2] bg-[#f6efe3]/95 backdrop-blur-md flex items-center gap-2">
          <FileText class="w-5 h-5 text-[#b79f77]" />
          <h3 class="text-xs font-bold text-[#8b7655] uppercase tracking-[0.2em]">作品档案</h3>
        </div>

        <div class="p-6 pt-4 flex-1">
          <div class="w-full bg-[#fdf9f1] rounded-lg text-[#5e4e38] p-8 md:p-12 shadow-inner min-h-[600px] shadow-[0_12px_24px_rgba(169,143,105,0.15)] border border-[#eadcc5]">
            <div class="text-center mb-8 border-b-2 border-[#d9cab0] pb-4">
              <h1 class="text-3xl font-display font-black text-[#6f5d45] mb-2 uppercase tracking-widest">{{ props.artifact.title }}</h1>
              <p class="text-[#a69478] text-xs font-bold uppercase tracking-[0.3em]">{{ props.artifact.certificate || '收藏证书' }}</p>
            </div>

            <div class="space-y-6 text-[#806f56] leading-relaxed text-justify px-4 text-sm font-medium">
              <p
                v-for="(paragraph, idx) in props.artifact.story"
                :key="`${props.artifact.id || 'artifact'}-${idx}`"
                :class="idx === 0 ? 'first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-[#6f5d45]' : ''"
              >
                {{ paragraph }}
              </p>
              <div class="mt-12 text-center opacity-60">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" class="w-32 h-32 object-cover mx-auto mix-blend-multiply rounded-full filter grayscale" alt="Seal" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full md:w-80 lg:w-96 bg-[#f8f2e7] h-1/2 md:h-full border-t md:border-t-0 md:border-l border-[#e4d6bf] p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-[#8b7655] mb-2">
            <User class="w-5 h-5 text-[#b79f77]" />
            <h4 class="text-xs font-bold uppercase tracking-[0.2em]">创作者</h4>
          </div>
          <div class="bg-[#fffaf1] border border-[#e7d9c3] rounded-xl p-5 hover:border-[#d8c5a5] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <h5 class="text-sm text-[#876f4d] font-bold mb-2 uppercase tracking-widest">剪艺工坊</h5>
            <p class="text-xs text-[#a19074] leading-relaxed font-medium">
              一个由国家级非遗传承人与新锐设计师组成的团队，致力于让传统剪纸艺术焕发时代光彩。
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3 text-[#8b7655] mb-2">
            <Building class="w-5 h-5 text-[#b79f77]" />
            <h4 class="text-xs font-bold uppercase tracking-[0.2em]">出品方</h4>
          </div>
          <div class="bg-[#fffaf1] border border-[#e7d9c3] rounded-xl p-5 hover:border-[#d8c5a5] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <h5 class="text-sm text-[#876f4d] font-bold mb-2 uppercase tracking-widest">剪艺文化</h5>
            <p class="text-xs text-[#a19074] leading-relaxed font-medium">
              国内领先的非遗手工艺品与现代文创开发品牌。
            </p>
            <div class="mt-4 pt-4 border-t border-[#e6d9c4]">
              <span class="inline-block px-3 py-1 bg-[#f3e9d8] text-[#9b8563] text-[12px] uppercase font-bold tracking-widest rounded-full border border-[#e3d3b7]">馆藏级限量发售</span>
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
