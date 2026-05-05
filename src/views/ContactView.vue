<script setup>
import { ref, computed } from 'vue'
import { PhEnvelope, PhPhone, PhMapPin, PhClock, PhPaperPlaneTilt, PhSpinner, PhCheckCircle } from '@phosphor-icons/vue'
import { sendContactMessage } from '@/api/contact'

const submitError = ref('')

const isFormFilled = computed(() => {
  return formData.value.name.trim() && formData.value.email.trim() && formData.value.message.trim()
})

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

// Toast notification
const toast = ref({
  show: false,
  message: ''
})

// Contact info items
const contactItems = [
  {
    icon: PhEnvelope,
    label: '邮箱',
    value: 'lingjiankeji@126.com',
    copyable: true,
    copyText: 'lingjiankeji@126.com',
    copyMsg: '邮箱已复制'
  },
  {
    icon: PhPhone,
    label: '电话',
    value: '19988724493',
    copyable: true,
    copyText: '19988724493',
    copyMsg: '电话已复制'
  },
  {
    icon: PhMapPin,
    label: '地址',
    value: '云南省昆明市五华区丰宁街道办事处\n学府路690号金鼎科技园十七号平台C座2楼211-30',
    copyable: false
  },
  {
    icon: PhClock,
    label: '工作时间',
    value: '周一至周五 9:00 - 18:00',
    copyable: false
  }
]

// Copy to clipboard
const copyToClipboard = async (text, message) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.value = { show: true, message }
    setTimeout(() => { toast.value.show = false }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true
  submitSuccess.value = false
  submitError.value = ''

  try {
    await sendContactMessage(formData.value)
    submitSuccess.value = true
    setTimeout(() => {
      formData.value = { name: '', email: '', phone: '', message: '' }
      submitSuccess.value = false
    }, 3000)
  } catch (err) {
    submitError.value = err.message || '发送失败，请稍后重试'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="pt-28 pb-20">
    <!-- Hero Section -->
    <section class="max-w-[1200px] mx-auto px-6 lg:px-12 mb-16">
      <div class="text-center max-w-2xl mx-auto">
        <h1 class="font-serif text-4xl md:text-5xl font-semibold text-ink-base mb-4 tracking-tight">
          联系我们
        </h1>
        <p class="text-bamboo-deep text-lg leading-relaxed">
          有任何问题或建议，欢迎随时与我们沟通
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="max-w-[1200px] mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

        <!-- Left: Contact Info -->
        <div class="lg:col-span-2">
          <div class="bg-white border-2 border-paper-dark/20 rounded-2xl p-8">
            <h2 class="font-serif text-2xl font-semibold text-ink-base mb-8 flex items-center gap-2">
              <PhEnvelope class="w-6 h-6 text-accent" />
              联系方式
            </h2>
            <div class="space-y-6">
              <div
                v-for="(item, index) in contactItems"
                :key="index"
                class="flex items-start gap-4 group"
                :class="item.copyable ? 'cursor-pointer' : ''"
                @click="item.copyable && copyToClipboard(item.copyText, item.copyMsg)"
              >
                <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <component :is="item.icon" class="w-5 h-5 text-accent" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-bamboo-dark mb-1">{{ item.label }}</p>
                  <p class="text-ink-base font-medium leading-relaxed whitespace-pre-line group-hover:text-accent transition-colors">
                    {{ item.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div class="lg:col-span-3">
          <div class="bg-white border-2 border-paper-dark/20 rounded-2xl p-8 md:p-10">
            <h2 class="font-serif text-2xl font-semibold text-ink-base mb-2">快速联系</h2>
            <p class="text-sm text-bamboo-dark mb-8">填写表单，我们将在 24 小时内回复您</p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-ink-base mb-2">
                  姓名 <span class="text-accent">*</span>
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-2 border-paper-dark/30 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                  placeholder="请输入您的姓名"
                />
              </div>

              <!-- Email & Phone -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-ink-base mb-2">
                    邮箱 <span class="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border-2 border-paper-dark/30 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-ink-base mb-2">
                    电话
                  </label>
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    class="w-full px-4 py-3 border-2 border-paper-dark/30 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                    placeholder="选填"
                  />
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-ink-base mb-2">
                  留言 <span class="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border-2 border-paper-dark/30 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 resize-none"
                  placeholder="请简要描述您的需求或想法..."
                ></textarea>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="isSubmitting || !isFormFilled"
                :class="[
                  'w-full font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed hover:shadow-lg',
                  isFormFilled && !isSubmitting
                    ? 'bg-accent hover:bg-accent/90 text-white hover:shadow-accent/20'
                    : 'bg-gray-300 text-gray-500'
                ]"
              >
                <PhPaperPlaneTilt class="w-5 h-5" v-if="!isSubmitting" />
                <PhSpinner class="w-5 h-5 animate-spin" v-else />
                {{ isSubmitting ? '发送中...' : '发送消息' }}
              </button>

              <!-- Success -->
              <Transition name="fade">
                <div v-if="submitSuccess" class="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                  <PhCheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p class="text-sm font-medium text-green-900">发送成功！</p>
                    <p class="text-xs text-green-700 mt-1">我们已收到您的消息，将在 24 小时内回复您。</p>
                  </div>
                </div>
              </Transition>

              <!-- Error -->
              <Transition name="fade">
                <div v-if="submitError" class="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <PhCheckCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p class="text-sm font-medium text-red-900">发送失败</p>
                    <p class="text-xs text-red-700 mt-1">{{ submitError }}</p>
                  </div>
                </div>
              </Transition>
            </form>
          </div>
        </div>

      </div>
    </section>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.show" class="fixed bottom-8 right-8 bg-ink-base text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50">
        <PhCheckCircle class="w-5 h-5" />
        <span class="font-medium">{{ toast.message }}</span>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
