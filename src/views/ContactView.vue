<template>
  <main class="pt-28 pb-20 bg-gradient-to-b from-paper-light to-white">
    <!-- Hero Section -->
    <section class="max-w-[1200px] mx-auto px-6 lg:px-12 mb-16">
      <div class="text-center max-w-2xl mx-auto">
        <h1 class="font-serif text-4xl md:text-5xl font-semibold text-ink-base mb-4 tracking-tight">
          我们期待与你沟通
        </h1>
        <p class="text-bamboo-deep text-lg leading-relaxed">
          合作、课程、活动，一站式联络
        </p>
      </div>
    </section>

    <!-- Main Content Grid -->
    <section class="max-w-[1200px] mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

        <!-- Left Column: Contact Info + Cooperation -->
        <div class="lg:col-span-2 space-y-8">

          <!-- Contact Information Card -->
          <div class="bg-white border-2 border-paper-dark/20 rounded-2xl p-8 hover:border-accent/40 transition-colors duration-300">
            <h2 class="font-serif text-2xl font-semibold text-ink-base mb-6 flex items-center gap-2">
              <Mail class="w-6 h-6 text-accent" />
              联系方式
            </h2>
            <div class="space-y-5">
              <div class="flex items-start gap-4 group cursor-pointer" @click="copyToClipboard('contact@jianyi.art', 'email')">
                <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail class="w-5 h-5 text-accent" />
                </div>
                <div class="flex-1">
                  <p class="text-xs text-bamboo-dark mb-1">邮箱</p>
                  <p class="text-ink-base font-medium group-hover:text-accent transition-colors">contact@jianyi.art</p>
                </div>
              </div>

              <div class="flex items-start gap-4 group cursor-pointer" @click="copyToClipboard('400-888-2026', 'phone')">
                <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Phone class="w-5 h-5 text-accent" />
                </div>
                <div class="flex-1">
                  <p class="text-xs text-bamboo-dark mb-1">电话</p>
                  <p class="text-ink-base font-medium group-hover:text-accent transition-colors">400-888-2026</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin class="w-5 h-5 text-accent" />
                </div>
                <div class="flex-1">
                  <p class="text-xs text-bamboo-dark mb-1">地址</p>
                  <p class="text-ink-base font-medium leading-relaxed">杭州市西湖区文创园 A2<br>剪艺数字实验室</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Cooperation Directions Card -->
          <div class="bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20 rounded-2xl p-8">
            <h2 class="font-serif text-2xl font-semibold text-ink-base mb-6 flex items-center gap-2">
              <Sparkles class="w-6 h-6 text-accent" />
              合作方向
            </h2>
            <ul class="space-y-4">
              <li v-for="(item, index) in cooperationItems" :key="index"
                  class="flex items-start gap-3 text-bamboo-deep hover:text-ink-base transition-colors group">
                <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent group-hover:text-white transition-colors">
                  <component :is="item.icon" class="w-4 h-4" />
                </div>
                <span class="leading-relaxed">{{ item.text }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Contact Form -->
        <div class="lg:col-span-3">
          <div class="bg-white border-2 border-paper-dark/20 rounded-2xl p-8 md:p-10 sticky top-32">
            <h2 class="font-serif text-2xl font-semibold text-ink-base mb-2">快速联系</h2>
            <p class="text-sm text-bamboo-dark mb-8">填写表单，我们将在 24 小时内回复您</p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Input -->
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

              <!-- Contact Method -->
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

              <!-- Cooperation Type -->
              <div>
                <label for="type" class="block text-sm font-medium text-ink-base mb-2">
                  合作类型 <span class="text-accent">*</span>
                </label>
                <select
                  id="type"
                  v-model="formData.type"
                  required
                  class="w-full px-4 py-3 border-2 border-paper-dark/30 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 cursor-pointer"
                >
                  <option value="">请选择合作类型</option>
                  <option value="tourism">城市文旅与非遗展陈设计</option>
                  <option value="brand">企业品牌礼品与节庆衍生品定制</option>
                  <option value="education">学校与机构的传统工艺课程合作</option>
                  <option value="event">线上线下主题活动共创</option>
                  <option value="other">其他</option>
                </select>
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

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-accent hover:bg-accent/90 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/20"
              >
                <Send class="w-5 h-5" v-if="!isSubmitting" />
                <Loader2 class="w-5 h-5 animate-spin" v-else />
                {{ isSubmitting ? '发送中...' : '发送消息' }}
              </button>

              <!-- Success Message -->
              <div v-if="submitSuccess" class="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p class="text-sm font-medium text-green-900">发送成功！</p>
                  <p class="text-xs text-green-700 mt-1">我们已收到您的消息，将在 24 小时内回复您。</p>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="toast.show" class="fixed bottom-8 right-8 bg-ink-base text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50">
        <CheckCircle class="w-5 h-5" />
        <span class="font-medium">{{ toast.message }}</span>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { Mail, Phone, MapPin, Sparkles, Send, Loader2, CheckCircle, Building2, GraduationCap, Calendar, Lightbulb } from 'lucide-vue-next'

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  type: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

// Toast notification
const toast = ref({
  show: false,
  message: ''
})

// Cooperation items with icons
const cooperationItems = [
  { icon: Building2, text: '城市文旅与非遗展陈设计' },
  { icon: Sparkles, text: '企业品牌礼品与节庆衍生品定制' },
  { icon: GraduationCap, text: '学校与机构的传统工艺课程合作' },
  { icon: Calendar, text: '线上线下主题活动共创' }
]

// Copy to clipboard
const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.value = {
      show: true,
      message: type === 'email' ? '邮箱已复制' : '电话已复制'
    }
    setTimeout(() => {
      toast.value.show = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true
  submitSuccess.value = false

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  submitSuccess.value = true

  // Reset form after 3 seconds
  setTimeout(() => {
    formData.value = {
      name: '',
      email: '',
      phone: '',
      type: '',
      message: ''
    }
    submitSuccess.value = false
  }, 3000)
}
</script>

<style scoped>
/* Toast animation */
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

/* Focus visible for accessibility */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
