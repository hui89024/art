# 首页底部 CTA 区域重新设计 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 HomeViewChinese.vue 底部 CTA 区域从普通红金渐变风格重新设计为具有奢侈品官网质感的深色金色品牌区域。

**Architecture:** 仅修改 `src/views/HomeViewChinese.vue` 一个文件中的 footer CTA 部分（约 lines 143-178）。使用项目已有的 `useScrollReveal` composable 实现滚动入场动画，纯 CSS 实现扫光动效和云纹暗纹背景。

**Tech Stack:** Vue 3 Composition API, Tailwind CSS, animejs (via useScrollReveal), 内联 SVG

---

## 文件结构

| 操作 | 文件 | 职责 |
|------|------|------|
| 修改 | `src/views/HomeViewChinese.vue:143-178` | footer CTA 区域的模板、脚本、样式 |

此改动仅涉及一个文件的局部区域，无需创建新文件。

---

### Task 1: 添加 useScrollReveal 导入与 ref 引用

**Files:**
- Modify: `src/views/HomeViewChinese.vue` — `<script setup>` 区域

- [ ] **Step 1: 读取当前 script setup 区域**

确认当前导入和 ref 声明的位置。

- [ ] **Step 2: 添加 useScrollReveal 导入**

在 `<script setup>` 中的现有导入之后添加：

```javascript
import { useScrollReveal } from '@/composables/useScrollReveal.js'
```

- [ ] **Step 3: 初始化 useScrollReveal 并声明 ref**

在 script setup 中添加：

```javascript
const { reveal } = useScrollReveal()

const ctaSection = ref(null)
const ctaKicker = ref(null)
const ctaHeading = ref(null)
const ctaManifesto = ref(null)
const ctaButton = ref(null)
const ctaDivider = ref(null)
```

- [ ] **Step 4: 添加 onMounted 滚动注册**

在 script setup 末尾添加：

```javascript
onMounted(() => {
  // 错位注册滚动入场，实现设计规格中的时序（间隔 150ms）
  const revealQueue = [
    { el: ctaKicker, opts: { effect: 'fade', duration: 600 } },
    { el: ctaHeading, opts: { effect: 'slideUp', duration: 800, translateY: 30 } },
    { el: ctaManifesto, opts: { effect: 'fade', duration: 600 } },
    { el: ctaButton, opts: { effect: 'slideUp', duration: 600, translateY: 20 } },
    { el: ctaDivider, opts: { effect: 'fade', duration: 600 } },
  ]
  revealQueue.forEach(({ el, opts }, i) => {
    if (el.value) setTimeout(() => reveal(el, opts), i * 150)
  })
})
```

- [ ] **Step 5: 验证导入正确**

运行 `npm run dev`，确认无编译错误。

---

### Task 2: 替换 footer CTA 模板结构

**Files:**
- Modify: `src/views/HomeViewChinese.vue:143-178` — footer CTA 模板区域

- [ ] **Step 1: 定位当前 CTA 区域**

当前代码位于 lines 143-178，以 `<!-- Footer CTA -->` 注释开始，到 `</div>` 闭合 footer CTA 区域结束。

- [ ] **Step 2: 替换整个 CTA 区域模板**

将 lines 143-178 的 CTA 区域替换为以下代码：

```html
    <!-- Footer CTA -->
    <footer ref="ctaSection" class="relative pt-32 pb-16 px-6 lg:px-12 bg-gray-950 overflow-hidden">

      <!-- 云纹暗纹背景 -->
      <div class="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cloud-pattern" x="0" y="0" width="96" height="48" patternUnits="userSpaceOnUse">
              <path d="M2 24C2 24 12 12 24 12C36 12 42 24 48 24C54 24 60 12 72 12C84 12 94 24 94 24"
                    stroke="#6b7280" stroke-width="2" fill="none" stroke-linecap="round"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cloud-pattern)"/>
        </svg>
      </div>

      <!-- 微弱径向渐变叠加 -->
      <div class="absolute inset-0 bg-radial-gradient" aria-hidden="true"></div>

      <div class="relative max-w-[1600px] mx-auto">

        <!-- CTA区域 -->
        <div class="flex flex-col items-center text-center
                    border-b border-amber-500/20 pb-20 mb-20">

          <!-- Kicker 标签 -->
          <div ref="ctaKicker"
               class="text-amber-400 text-sm font-bold tracking-[0.4em]
                      px-6 py-2 border border-amber-500/30 bg-amber-500/5
                      inline-block mb-8">
            准备好开启创作了吗
          </div>

          <!-- 大标题 -->
          <h2 ref="ctaHeading"
              class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white
                     leading-tight tracking-tight">
            与剪艺一起<br>
            开启非遗之旅。
          </h2>

          <!-- 品牌理念 -->
          <div ref="ctaManifesto" class="mt-12 max-w-2xl flex items-start gap-4">
            <span class="text-amber-500/60 text-4xl font-serif leading-none select-none">"</span>
            <p class="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              我们不只是裁刻纸张，我们在方寸之间，雕琢大千世界。
            </p>
          </div>

          <!-- CTA 按钮 -->
          <div ref="ctaButton" class="mt-10 w-full md:w-auto">
            <button @click="router.push('/collectibles')"
                    class="cta-button group relative w-full md:w-auto px-10 py-5
                           bg-gradient-to-r from-amber-500 to-yellow-500
                           text-gray-900 font-bold text-sm tracking-[0.2em]
                           overflow-hidden transition-all duration-300
                           hover:shadow-lg hover:shadow-amber-500/25"
                    aria-label="浏览全系剪纸作品">
              <span class="relative z-10 flex items-center justify-center gap-3">
                浏览全系作品
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <!-- 装饰细线 -->
        <div ref="ctaDivider"
             class="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-16"
             aria-hidden="true">
        </div>
```

- [ ] **Step 3: 验证模板语法**

运行 `npm run dev`，确认无 Vue 模板编译错误。

---

### Task 3: 添加 CSS 样式（扫光动效 + 径向渐变）

**Files:**
- Modify: `src/views/HomeViewChinese.vue` — `<style>` 区域

- [ ] **Step 1: 定位当前 style 区域**

查看文件末尾的 `<style scoped>` 或 `<style>` 块。

- [ ] **Step 2: 添加 CTA 相关样式**

在 `<style>` 块中添加以下样式：

```css
/* CTA 按钮扫光动效 */
.cta-button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 1000ms ease-in-out;
}

.cta-button:hover::after {
  transform: translateX(100%);
}

/* 径向渐变叠加 */
.bg-radial-gradient {
  background: radial-gradient(
    ellipse at center,
    rgba(17, 24, 39, 0.3) 0%,
    transparent 70%
  );
}
```

- [ ] **Step 3: 验证样式生效**

运行 `npm run dev`，打开浏览器确认：
- 深色背景显示正确
- 云纹暗纹可见（极淡）
- 按钮悬停时扫光效果触发

---

### Task 4: 调整 Footer 链接区域样式适配深色背景

**Files:**
- Modify: `src/views/HomeViewChinese.vue:180-275` — Footer 链接与版权区域

- [ ] **Step 1: 更新品牌信息区域（lines 183-211）**

替换以下样式类：

```html
<!-- 品牌名 -->
<h3 class="font-display text-3xl font-bold text-white tracking-[0.3em]">剪艺</h3>

<!-- 品牌描述 -->
<p class="text-gray-400 text-base leading-relaxed mb-10">

<!-- 社交媒体按钮（三个 div 统一替换） -->
<div class="w-14 h-14 border border-gray-700 rounded-full
            flex items-center justify-center hover:border-amber-500
            cursor-pointer transition-all duration-300
            text-gray-400 text-xs font-bold hover:text-amber-400 hover:scale-110">
```

- [ ] **Step 2: 更新链接列表区域（lines 214-261）**

四个链接分组的标题和文字统一替换：

```html
<!-- 链接标题（4 个 h4 统一替换） -->
<h4 class="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-6
           border-b border-amber-500/30 pb-2">

<!-- 链接列表容器 -->
<ul class="space-y-4 text-sm text-gray-500">

<!-- 链接文字（所有 a 标签统一替换） -->
<a href="#" class="hover:text-amber-400 transition-colors">
```

- [ ] **Step 3: 更新版权区域（lines 264-273）**

```html
<div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row
            justify-between items-center text-xs text-gray-600
            font-bold uppercase tracking-[0.3em] gap-4">
  <p>© 2026 剪艺数字艺术有限公司</p>
  <div class="flex gap-8">
    <a href="#" class="hover:text-amber-400 transition-colors">隐私政策</a>
    <a href="#" class="hover:text-amber-400 transition-colors">服务条款</a>
  </div>
</div>
```

- [ ] **Step 4: 验证整体视觉一致性**

运行 `npm run dev`，确认 Footer 链接区域与新 CTA 深色背景风格统一。

---

### Task 5: 最终验证与提交

**Files:**
- Modify: `src/views/HomeViewChinese.vue`

- [ ] **Step 1: 完整功能验证**

在浏览器中打开首页，滚动到底部 CTA 区域，检查：
- [ ] 深色背景 + 云纹暗纹正确显示
- [ ] Kicker 标签金色边框 + 文字正确
- [ ] 大标题书法衬线体 + 白色文字
- [ ] 品牌理念带金色引号装饰
- [ ] CTA 按钮金色渐变 + 悬停扫光效果
- [ ] 装饰细线从中心向两侧渐变
- [ ] 滚动入场动画依次触发
- [ ] Footer 链接区域风格统一
- [ ] 移动端响应式布局正常

- [ ] **Step 2: 提交代码**

```bash
git add src/views/HomeViewChinese.vue
git commit -m "feat(ui): 重新设计首页底部CTA区域为奢侈品风格深色主题"
```
