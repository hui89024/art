# 应用页面全宽沉浸式重设计 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 AppDownloadView.vue 从区块割裂的平铺布局改造为渐变色带串联的国潮沉浸式页面，不更改任何现有内容。

**Architecture:** 单文件改造，5 个区块通过渐变背景自然过渡取代硬分割线。窗花纹样以半透明装饰增加文化质感。保留 IntersectionObserver 滚动入场动画。所有文案、数据、逻辑保持不变。

**Tech Stack:** Vue 3 `<script setup>`, Tailwind CSS 3, @phosphor-icons/vue

---

## 文件结构

| 操作 | 文件 | 说明 |
|------|------|------|
| Modify | `src/views/AppDownloadView.vue` | 唯一改动文件，重写 template 和 style |

---

### Task 1: 在 script setup 中添加窗花纹样图片导入

**Files:**
- Modify: `src/views/AppDownloadView.vue:1-8`

在现有 import 块末尾添加窗花纹样图片导入，供背景装饰使用。

- [ ] **Step 1: 添加 import 语句**

在 `appScreenshot3` import 后添加三行：

```vue
import patternBg1 from '@/assets/窗花017.png'
import patternBg2 from '@/assets/窗花018.png'
import patternBg3 from '@/assets/窗花019.png'
```

- [ ] **Step 2: 验证构建**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built in X.XXs`

---

### Task 2: 重写 Hero 区域

**Files:**
- Modify: `src/views/AppDownloadView.vue` (template, Hero section)

替换当前 Hero section，改为全宽渐变背景 + 窗花纹样装饰 + 放大的手机模型。

- [ ] **Step 1: 替换 Hero section 模板**

将 `<section class="relative overflow-hidden bg-gradient-to-br from-jy-color-bg ...">` 到 `</section>` 之间的 Hero 整段替换为：

```html
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#F7F5F2] to-[#FFF1F3]">
      <!-- 窗花纹样装饰 -->
      <div class="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-5 pointer-events-none">
        <img :src="patternBg1" class="w-full h-full object-contain" alt="" />
      </div>
      <div class="absolute -bottom-32 -left-20 w-[400px] h-[400px] opacity-5 pointer-events-none rotate-45">
        <img :src="patternBg2" class="w-full h-full object-contain" alt="" />
      </div>

      <div class="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <!-- 左：文案 -->
          <div class="text-center lg:text-left">
            <div class="inline-block mb-6 px-4 py-1.5 rounded-full bg-accent-pink/5 border border-accent-pink/15">
              <span class="text-sm text-accent-pink tracking-wide font-medium">剪纸非遗 · 数字传承</span>
            </div>

            <h1 class="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-text-primary mb-6 tracking-tight leading-[1.15]">
              非遗体验<br>
              <span class="bg-gradient-to-r from-accent-pink to-pink-400 bg-clip-text text-transparent">从手机开始</span>
            </h1>

            <p class="text-lg text-text-secondary mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              随时随地学习传统剪纸艺术，用科技传承非遗文化，让每个人都能成为剪纸艺术家
            </p>

            <!-- 评分卡 -->
            <div class="inline-flex items-center gap-6 px-6 py-4 rounded-2xl bg-white border border-border-light shadow-sm mb-10">
              <div class="flex items-center gap-2.5">
                <div class="flex gap-0.5">
                  <PhStar v-for="i in 5" :key="i" class="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <span class="text-2xl font-bold text-text-primary">4.9</span>
              </div>
              <div class="h-8 w-px bg-border-light"></div>
              <div class="text-left">
                <p class="text-sm font-medium text-text-primary">10,000+ 次下载</p>
                <p class="text-xs text-text-tertiary">用户好评如潮</p>
              </div>
            </div>

            <!-- 下载按钮 -->
            <div class="flex justify-center lg:justify-start">
              <button
                @click="goAndroid"
                class="group flex items-center justify-center gap-3 bg-accent-pink hover:bg-pink-600 text-white px-10 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-accent-pink/25 hover:-translate-y-0.5 cursor-pointer"
              >
                <PhDeviceMobile class="w-6 h-6" />
                <div class="text-left">
                  <p class="text-xs opacity-80">立即下载</p>
                  <p class="text-lg font-semibold -mt-1">安卓版本</p>
                </div>
              </button>
            </div>
          </div>

          <!-- 右：手机模型 -->
          <div class="relative flex justify-center">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-pink/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div class="relative mx-auto w-[280px] h-[560px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/20 border border-white/10">
              <div class="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10"></div>
                <img
                  v-protect-image
                  :src="screenshotImages[0]"
                  alt="剪艺 APP 主界面截图"
                  class="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <!-- 手机底部倒影装饰 -->
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[60px] bg-gradient-to-b from-accent-pink/8 to-transparent rounded-full blur-xl pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: 验证构建**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built in X.XXs`

---

### Task 3: 重写截图轮播区

**Files:**
- Modify: `src/views/AppDownloadView.vue` (template, carousel section)

删除 Hero 后的第一个 `section-divider`，替换截图轮播 section。改为全宽渐变背景 + 渐变色块底板 + 窗花纹样装饰。

- [ ] **Step 1: 删除第一个 section-divider**

删除这段：
```html
    <!-- 分割线 -->
    <div class="section-divider">
      <span class="section-divider__line"></span>
    </div>
```

（位于 Hero `</section>` 之后、截图轮播 `<section` 之前的那一段）

- [ ] **Step 2: 替换截图轮播 section**

将整个截图轮播 `<section>` 替换为：

```html
    <!-- 截图轮播 -->
    <section class="reveal relative overflow-hidden bg-gradient-to-br from-[#FFF1F3] to-[#FDF2F8] py-20 lg:py-28">
      <!-- 窗花纹样装饰 -->
      <div class="absolute top-10 -left-10 w-[300px] h-[300px] opacity-6 pointer-events-none">
        <img :src="patternBg3" class="w-full h-full object-contain" alt="" />
      </div>
      <div class="absolute bottom-10 -right-10 w-[250px] h-[250px] opacity-6 pointer-events-none rotate-12">
        <img :src="patternBg1" class="w-full h-full object-contain" alt="" />
      </div>

      <div class="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-14">
          <h2 class="font-serif text-3xl md:text-4xl font-semibold text-text-primary mb-4">应用截图</h2>
          <p class="text-text-secondary">直观了解 APP 核心功能</p>
        </div>

        <div class="relative">
          <!-- 轮播容器 — 渐变色块底板 -->
          <div class="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded-3xl p-10 md:p-14 border border-accent-pink/10">
            <div class="flex items-center justify-center gap-6 md:gap-10">

              <!-- 上一张按钮 -->
              <button
                @click="prevScreenshot"
                class="flex-shrink-0 w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-accent-pink hover:border-accent-pink hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                aria-label="上一张截图"
              >
                <PhCaretLeft class="w-5 h-5" />
              </button>

              <!-- 截图展示 -->
              <div class="flex-1 max-w-[260px]">
                <div class="relative mx-auto w-[260px] h-[520px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.6rem] p-2.5 shadow-xl shadow-black/20 border border-white/10">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-accent-pink/15 rounded-full blur-[60px] pointer-events-none"></div>
                  <div class="relative w-full h-full bg-white rounded-[2.1rem] overflow-hidden">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-b-2xl z-10"></div>
                    <Transition name="fade-scale" mode="out-in">
                      <img
                        v-protect-image
                        :key="currentScreenshot"
                        :src="screenshotImages[currentScreenshot]"
                        :alt="screenshots[currentScreenshot].title + ' 截图'"
                        class="w-full h-full object-cover object-top"
                      />
                    </Transition>
                  </div>
                </div>
                <!-- 截图标题 -->
                <div class="text-center mt-6">
                  <Transition name="fade-scale" mode="out-in">
                    <div :key="currentScreenshot">
                      <p class="font-serif text-lg font-semibold text-text-primary">{{ screenshots[currentScreenshot].title }}</p>
                      <p class="text-sm text-text-secondary mt-1">{{ screenshots[currentScreenshot].description }}</p>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- 下一张按钮 -->
              <button
                @click="nextScreenshot"
                class="flex-shrink-0 w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-accent-pink hover:border-accent-pink hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                aria-label="下一张截图"
              >
                <PhCaretRight class="w-5 h-5" />
              </button>

            </div>

            <!-- 圆点指示器 -->
            <div class="flex justify-center gap-2.5 mt-8">
              <button
                v-for="(screenshot, index) in screenshots"
                :key="screenshot.id"
                @click="goToScreenshot(index)"
                :class="[
                  'h-2 rounded-full transition-all duration-300 cursor-pointer',
                  currentScreenshot === index
                    ? 'bg-accent-pink w-10'
                    : 'bg-border-light hover:bg-text-tertiary w-2'
                ]"
                :aria-label="`查看第 ${index + 1} 张截图`"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: 验证构建**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built in X.XXs`

---

### Task 4: 重写核心功能区

**Files:**
- Modify: `src/views/AppDownloadView.vue` (template, features section)

删除截图轮播后的 `section-divider`，替换功能 section。改为全宽渐变背景 + 毛玻璃卡片。

- [ ] **Step 1: 删除第二个 section-divider**

删除截图轮播 `</section>` 之后的那一段 `section-divider`。

- [ ] **Step 2: 替换核心功能 section**

将整个功能 `<section>` 替换为：

```html
    <!-- 核心功能 -->
    <section class="reveal relative overflow-hidden bg-gradient-to-br from-[#FDF2F8] to-[#F7F5F2] py-20 lg:py-28">
      <div class="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-14">
          <h2 class="font-serif text-3xl md:text-4xl font-semibold text-text-primary mb-4">核心功能</h2>
          <p class="text-text-secondary">四大核心功能，全方位提升剪纸体验</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="feature in featureItems"
            :key="feature.id"
            class="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-accent-pink/10 hover:border-accent-pink/30 hover:shadow-xl hover:shadow-accent-pink/8 transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-accent-pink/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div class="relative z-10">
              <div :class="['w-14 h-14 rounded-2xl bg-gradient-to-br', feature.color, 'flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300']">
                <component :is="feature.icon" class="w-7 h-7 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-text-primary mb-3">{{ feature.title }}</h3>
              <p class="text-sm text-text-secondary leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: 验证构建**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built in X.XXs`

---

### Task 5: 重写用户评价区

**Files:**
- Modify: `src/views/AppDownloadView.vue` (template, reviews section)

删除功能区后的 `section-divider`，替换评价 section。

- [ ] **Step 1: 删除第三个 section-divider**

删除功能 `</section>` 之后的那一段 `section-divider`。

- [ ] **Step 2: 替换用户评价 section**

将整个评价 `<section>` 替换为：

```html
    <!-- 用户评价 -->
    <section class="reveal bg-[#F7F5F2] py-20 lg:py-28">
      <div class="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-14">
          <h2 class="font-serif text-3xl md:text-4xl font-semibold text-text-primary mb-4">用户评价</h2>
          <p class="text-text-secondary">听听用户怎么说</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="group bg-white rounded-2xl p-8 border border-border-light hover:border-accent-pink/20 hover:shadow-lg hover:shadow-accent-pink/5 transition-all duration-300"
          >
            <div class="flex gap-1 mb-5">
              <PhStar v-for="i in review.rating" :key="i" class="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
            <p class="text-sm text-text-secondary leading-relaxed mb-6">"{{ review.comment }}"</p>
            <div class="flex items-center gap-3 pt-5 border-t border-border-light">
              <img
                v-if="review.avatarUrl"
                :src="review.avatarUrl"
                :alt="review.name + ' 的头像'"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div
                v-else
                :class="['w-10 h-10 rounded-full bg-gradient-to-br', review.color, 'flex items-center justify-center text-white font-semibold text-sm shadow-md']"
              >
                {{ review.initials }}
              </div>
              <div>
                <p class="text-sm font-medium text-text-primary">{{ review.name }}</p>
                <p class="text-xs text-text-tertiary">{{ review.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: 验证构建**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built in X.XXs`

---

### Task 6: 重写底部 CTA

**Files:**
- Modify: `src/views/AppDownloadView.vue` (template, CTA section)

删除评价区后的 `section-divider`，替换 CTA section，删除底部留白 div。

- [ ] **Step 1: 删除第四个 section-divider**

删除评价 `</section>` 之后的那一段 `section-divider`。

- [ ] **Step 2: 替换 CTA section 并删除底部留白**

将 CTA `<section>` 到 `<div class="h-16"></div>` 整段替换为：

```html
    <!-- 最终 CTA -->
    <section class="reveal relative overflow-hidden bg-gradient-to-br from-[#F7F5F3] to-[#FFF1F3] py-20 lg:py-28">
      <!-- 窗花纹样装饰 -->
      <div class="absolute -bottom-20 -right-10 w-[350px] h-[350px] opacity-5 pointer-events-none">
        <img :src="patternBg2" class="w-full h-full object-contain" alt="" />
      </div>

      <div class="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF1F3] via-pink-50 to-purple-50 p-12 md:p-20 text-center border border-accent-pink/10">
          <div class="absolute top-0 left-1/3 w-[300px] h-[300px] bg-accent-pink/8 rounded-full blur-[100px] pointer-events-none"></div>
          <div class="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-purple-400/6 rounded-full blur-[80px] pointer-events-none"></div>

          <div class="relative z-10">
            <h2 class="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-5">
              立即下载，开启剪纸之旅
            </h2>
            <p class="text-text-secondary mb-10 max-w-2xl mx-auto text-lg">
              加入 10,000+ 剪纸爱好者，用科技传承非遗文化
            </p>

            <div class="flex justify-center">
              <button
                @click="goAndroid"
                class="group flex items-center justify-center gap-3 bg-accent-pink hover:bg-pink-600 text-white px-10 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-accent-pink/25 hover:-translate-y-0.5 cursor-pointer"
              >
                <PhDeviceMobile class="w-6 h-6" />
                <div class="text-left">
                  <p class="text-xs opacity-80">立即下载</p>
                  <p class="text-lg font-semibold -mt-1">安卓版本</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: 验证构建**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built in X.XXs`

---

### Task 7: 更新 scoped styles

**Files:**
- Modify: `src/views/AppDownloadView.vue` (`<style scoped>` section)

确保样式块保留 fade-scale 动画、focus-visible、reveal 动画、prefers-reduced-motion 适配。

- [ ] **Step 1: 确认 style 块内容**

当前 `<style scoped>` 块已经包含所有需要的样式（fade-scale、focus-visible、reveal、prefers-reduced-motion），无需修改。验证即可。

- [ ] **Step 2: 最终构建验证**

Run: `npm run build 2>&1 | tail -5`
Expected: `✓ built in X.XXs`，无 warning 或 error

---

### Task 8: 最终内容完整性检查

**Files:**
- Read: `src/views/AppDownloadView.vue`

- [ ] **Step 1: 验证不变内容**

确认以下内容在最终文件中保持不变：
- `featureItems` 数组（4 项，标题、描述、color 全部一致）
- `DEFAULT_REVIEWS` 数组（3 条评价，全部一致）
- `screenshotImages` 数组（3 张截图 import）
- `screenshots` 数组（3 项元数据）
- `goAndroid`、`nextScreenshot`、`prevScreenshot`、`goToScreenshot` 函数
- `getReviews` API 调用逻辑
- IntersectionObserver 滚动入场逻辑

- [ ] **Step 2: 验证无英文标签**

确认模板中无 `Screenshots`、`Features`、`Reviews`、`Download Now` 等英文标签文字。

- [ ] **Step 3: 验证无 section-divider**

确认模板中无 `section-divider` 相关 class。

- [ ] **Step 4: 验证无 `jy-glass-card`**

确认模板中无 `jy-glass-card` class（已替换为渐变色块底板）。
