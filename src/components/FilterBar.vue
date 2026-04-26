<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown, X } from 'lucide-vue-next'

const props = defineProps({
  options: { type: Array, default: () => [] },
  selected: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:selected'])

const open = ref(false)
const dropdownRef = ref(null)

const allSelected = computed(() => props.selected.length === props.options.length)

const toggleAll = () => {
  emit('update:selected', allSelected.value ? [] : [...props.options])
}

const toggleOption = (opt) => {
  const next = props.selected.includes(opt)
    ? props.selected.filter((o) => o !== opt)
    : [...props.selected, opt]
  emit('update:selected', next)
}

const removeOption = (opt) => {
  emit('update:selected', props.selected.filter((o) => o !== opt))
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- 下拉触发器 -->
    <button
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-hex-e3d6c2 bg-white/60 backdrop-blur-sm text-hex-7a6a50 text-sm font-medium hover:border-hex-c9b289 transition-colors"
      @click="open = !open"
    >
      主题筛选
      <ChevronDown
        class="w-4 h-4 transition-transform duration-200"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <!-- 已选标签 -->
    <div v-if="selected.length" class="flex flex-wrap gap-2 mt-2">
      <span
        v-for="opt in selected"
        :key="opt"
        class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-hex-f0e8d8 border border-hex-d8c7ab text-hex-7a6a50 text-xs font-medium"
      >
        {{ opt }}
        <button
          class="hover:text-hex-b4232a transition-colors"
          @click.stop="removeOption(opt)"
        >
          <X class="w-3 h-3" />
        </button>
      </span>
      <button
        v-if="selected.length"
        class="text-xs text-hex-a08b6d hover:text-hex-7a6a50 transition-colors ml-1"
        @click="emit('update:selected', [])"
      >
        清除全部
      </button>
    </div>

    <!-- 下拉面板 -->
    <div v-if="open" class="fixed inset-0 z-30" @click="open = false"></div>
    <div
      v-if="open"
      class="absolute top-full left-0 mt-1 z-40 w-56 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-hex-e3d6c2 p-2"
    >
      <button
        class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-hex-7a6a50 hover:bg-hex-f5efe5 transition-colors"
        @click="toggleAll"
      >
        <span
          class="w-4 h-4 rounded border border-hex-c4b28f flex items-center justify-center text-[10px]"
          :class="allSelected ? 'bg-hex-b4232a text-white border-hex-b4232a' : ''"
        >✓</span>
        {{ allSelected ? '取消全选' : '全选' }}
      </button>
      <div class="h-px bg-hex-e7dbc9 my-1"></div>
      <div class="max-h-48 overflow-y-auto">
        <button
          v-for="opt in options"
          :key="opt"
          class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-hex-6f614d hover:bg-hex-f5efe5 transition-colors"
          @click="toggleOption(opt)"
        >
          <span
            class="w-4 h-4 rounded border flex items-center justify-center text-[10px] transition-colors"
            :class="selected.includes(opt)
              ? 'bg-hex-b4232a text-white border-hex-b4232a'
              : 'border-hex-c4b28f'"
          >✓</span>
          {{ opt }}
        </button>
      </div>
    </div>
  </div>
</template>
