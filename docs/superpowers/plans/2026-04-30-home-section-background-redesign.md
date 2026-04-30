# 首页区域背景重新设计 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为首页三个区域（核心作品、剪艺宣言、剪艺应用）创建独立的差异化背景，移除全局 ParallaxBackground。

**Architecture:** 三个 section 各自通过 CSS 多层背景叠加（渐变 + SVG 噪点 + 纹样 + 动效）实现独立视觉身份。新增一个窗花 SVG 矢量纹样用于宣言区。所有背景样式通过 scoped `<style>` 管理。

**Tech Stack:** Vue 3 `<script setup>`, Tailwind CSS 3, CSS `@keyframes`, 内联 SVG 数据 URI

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `src/assets/wing-flower-pattern.svg` | 新增 | 宣言区窗花 SVG 矢量纹样（对称团花，800×800） |
| `src/views/HomeView.vue` | 修改 | 移除 ParallaxBackground；三个 section 添加独立背景；宣言区移除森林图并调整文字颜色 |
| `tests/unit/views/home-redesign.spec.js` | 修改 | 更新测试断言适配新结构 |

---

### Task 1: 创建窗花 SVG 矢量纹样

**Files:**
- Create: `src/assets/wing-flower-pattern.svg`

- [ ] **Step 1: 创建对称团花 SVG**

创建一个包含中国传统剪纸基础纹样（锯齿、月牙、柳叶）的对称团花 SVG。viewBox 800×800，单色黑色填充，镂空部分为 transparent。

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">
  <!-- 外圈：锯齿纹 -->
  <circle cx="400" cy="400" r="360" stroke="#000" stroke-width="2" fill="none"/>
  <circle cx="400" cy="400" r="340" stroke="#000" stroke-width="1" fill="none"/>
  <!-- 锯齿装饰：沿外圈均匀分布的三角形 -->
  <g id="teeth">
    <!-- 12个锯齿，每30度一个 -->
    <polygon points="400,40 410,60 390,60" fill="#000"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(30,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(60,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(90,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(120,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(150,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(180,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(210,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(240,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(270,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(300,400,400)"/>
    <polygon points="400,40 410,60 390,60" fill="#000" transform="rotate(330,400,400)"/>
  </g>
  <!-- 中圈：月牙纹 -->
  <circle cx="400" cy="400" r="280" stroke="#000" stroke-width="1.5" fill="none"/>
  <g id="crescents">
    <!-- 8个月牙纹，每45度一个 -->
    <path d="M400,130 Q430,160 400,190 Q370,160 400,130Z" fill="#000"/>
    <path d="M400,130 Q430,160 400,190 Q370,160 400,130Z" fill="#000" transform="rotate(45,400,400)"/>
    <path d="M400,130 Q430,160 400,190 Q370,160 400,130Z" fill="#000" transform="rotate(90,400,400)"/>
    <path d="M400,130 Q430,160 400,190 Q370,160 400,130Z" fill="#000" transform="rotate(135,400,400)"/>
    <path d="M400,130 Q430,160 400,190 Q370,160 400,130Z" fill="#000" transform="rotate(180,400,400)"/>
    <path d="M400,130 Q430,160 400,190 Q370,160 400,130Z" fill="#000" transform="rotate(225,400,400)"/>
    <path d="M400,130 Q430,160 400,190 Q370,160 400,130Z" fill="#000" transform="rotate(270,400,400)"/>
    <path d="M400,130 Q430,160 400,190 Q370,160 400,130Z" fill="#000" transform="rotate(315,400,400)"/>
  </g>
  <!-- 内圈：柳叶纹 -->
  <circle cx="400" cy="400" r="200" stroke="#000" stroke-width="1" fill="none"/>
  <g id="leaves">
    <!-- 6组柳叶纹，每60度一组，每组2片 -->
    <path d="M400,210 Q420,250 400,290 Q380,250 400,210Z" fill="#000"/>
    <path d="M410,215 Q430,255 410,295 Q390,255 410,215Z" fill="#000"/>
    <path d="M400,210 Q420,250 400,290 Q380,250 400,210Z" fill="#000" transform="rotate(60,400,400)"/>
    <path d="M410,215 Q430,255 410,295 Q390,255 410,215Z" fill="#000" transform="rotate(60,400,400)"/>
    <path d="M400,210 Q420,250 400,290 Q380,250 400,210Z" fill="#000" transform="rotate(120,400,400)"/>
    <path d="M410,215 Q430,255 410,295 Q390,255 410,215Z" fill="#000" transform="rotate(120,400,400)"/>
    <path d="M400,210 Q420,250 400,290 Q380,250 400,210Z" fill="#000" transform="rotate(180,400,400)"/>
    <path d="M410,215 Q430,255 410,295 Q390,255 410,215Z" fill="#000" transform="rotate(180,400,400)"/>
    <path d="M400,210 Q420,250 400,290 Q380,250 400,210Z" fill="#000" transform="rotate(240,400,400)"/>
    <path d="M410,215 Q430,255 410,295 Q390,255 410,215Z" fill="#000" transform="rotate(240,400,400)"/>
    <path d="M400,210 Q420,250 400,290 Q380,250 400,210Z" fill="#000" transform="rotate(300,400,400)"/>
    <path d="M410,215 Q430,255 410,295 Q390,255 410,215Z" fill="#000" transform="rotate(300,400,400)"/>
  </g>
  <!-- 中心：团花纹 -->
  <circle cx="400" cy="400" r="80" stroke="#000" stroke-width="2" fill="none"/>
  <circle cx="400" cy="400" r="60" stroke="#000" stroke-width="1" fill="none"/>
  <!-- 中心花瓣 -->
  <g id="center-petals">
    <ellipse cx="400" cy="350" rx="15" ry="30" fill="#000"/>
    <ellipse cx="400" cy="350" rx="15" ry="30" fill="#000" transform="rotate(45,400,400)"/>
    <ellipse cx="400" cy="350" rx="15" ry="30" fill="#000" transform="rotate(90,400,400)"/>
    <ellipse cx="400" cy="350" rx="15" ry="30" fill="#000" transform="rotate(135,400,400)"/>
    <ellipse cx="400" cy="350" rx="15" ry="30" fill="#000" transform="rotate(180,400,400)"/>
    <ellipse cx="400" cy="350" rx="15" ry="30" fill="#000" transform="rotate(225,400,400)"/>
    <ellipse cx="400" cy="350" rx="15" ry="30" fill="#000" transform="rotate(270,400,400)"/>
    <ellipse cx="400" cy="350" rx="15" ry="30" fill="#000" transform="rotate(315,400,400)"/>
  </g>
  <circle cx="400" cy="400" r="20" fill="#000"/>
</svg>
```

- [ ] **Step 2: 验证 SVG 文件**

```bash
cat src/assets/wing-flower-pattern.svg | head -5
```

Expected: 文件存在且为有效 SVG 格式。

- [ ] **Step 3: 提交**

```bash
git add src/assets/wing-flower-pattern.svg
git commit -m "feat: add symmetric window-flower SVG pattern for manifesto section"
```

---

### Task 2: 移除全局 ParallaxBackground 并设置 fallback

**Files:**
- Modify: `src/views/HomeView.vue:1-4` (template 入口)
- Modify: `src/views/HomeView.vue:280-292` (script imports)

- [ ] **Step 1: 从 template 移除 ParallaxBackground**

将 `HomeView.vue` 第 3-4 行：

```html
    <!-- 背景层 -->
    <ParallaxBackground :speed="0.5" :enabled="true" />
```

替换为：

```html
    <!-- 背景层已移除，各区域独立控制背景 -->
```

- [ ] **Step 2: 从 script 移除 import**

删除第 287 行：

```javascript
import ParallaxBackground from '@/components/ParallaxBackground.vue'
```

- [ ] **Step 3: 修改 main 容器的 fallback 底色**

将第 1 行：

```html
  <main class="min-h-screen bg-transparent flex flex-col font-sans text-ink-base">
```

替换为：

```html
  <main class="min-h-screen bg-[#f8f4ef] flex flex-col font-sans text-ink-base">
```

- [ ] **Step 4: 为 Footer 添加浅色底**

将第 198 行：

```html
    <footer class="pt-24 pb-12 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full">
```

替换为：

```html
    <footer class="pt-24 pb-12 px-6 lg:px-12 bg-[#f8f4ef] max-w-[1600px] mx-auto w-full">
```

- [ ] **Step 5: 验证开发服务器启动**

```bash
npm run dev -- --host 0.0.0.0 --port 3000 &
sleep 3
curl -s http://localhost:3000 | grep -c "剪艺"
```

Expected: 返回非零数字（页面正常渲染）。

- [ ] **Step 6: 提交**

```bash
git add src/views/HomeView.vue
git commit -m "refactor: remove global ParallaxBackground from HomeView"
```

---

### Task 3: 为核心作品区域添加宣纸展厅背景

**Files:**
- Modify: `src/views/HomeView.vue:17` (section 标签)
- Modify: `src/views/HomeView.vue` 末尾（新增 `<style>` 块）

- [ ] **Step 1: 修改核心作品 section 标签**

将第 17 行：

```html
    <section class="py-24 sm:py-32 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full">
```

替换为：

```html
    <section class="product-section relative py-24 sm:py-32 px-6 lg:px-12 max-w-[1600px] mx-auto w-full overflow-hidden">
```

- [ ] **Step 2: 在 section 开头添加窗花水印层**

在 `<section>` 标签之后、`<div class="mb-16">` 之前插入：

```html
      <!-- 宣纸展厅背景 -->
      <div class="product-bg-watermark" aria-hidden="true"></div>
```

- [ ] **Step 3: 添加 scoped style 块**

在 `</script>` 之后添加完整的 `<style>` 块：

```vue
<style scoped>
/* ========== 核心作品 — 宣纸展厅 ========== */
.product-section {
  background:
    /* L3 光影氛围：柔光从中心偏上辐射 */
    radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255, 248, 235, 0.6), transparent 70%),
    /* L2 纸张纤维：宣纸噪点纹理 */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23faf6f1'/%3E%3Crect width='1' height='1' x='1' y='1' fill='%23e8e0d8' opacity='0.03'/%3E%3C/svg%3E") repeat,
    /* L1 底色：暖白宣纸色 */
    linear-gradient(135deg, #faf6f1, #f0e8df);
}

.product-bg-watermark {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Ccircle cx='400' cy='400' r='360' stroke='%23000' stroke-width='2' fill='none'/%3E%3Ccircle cx='400' cy='400' r='280' stroke='%23000' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='400' cy='400' r='200' stroke='%23000' stroke-width='1' fill='none'/%3E%3Ccircle cx='400' cy='400' r='80' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E") center/60% no-repeat;
  opacity: 0.03;
  animation: product-watermark-breathe 8s ease-in-out infinite;
}

/* 确保内容在背景层之上 */
.product-section > *:not(.product-bg-watermark) {
  position: relative;
  z-index: 1;
}

@keyframes product-watermark-breathe {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.08; }
}

/* ========== 剪艺宣言 — 纸雕光影 ========== */
.manifesto-section {
  background:
    /* L3 光影投射：阳光从顶部偏右 */
    radial-gradient(ellipse 60% 50% at 65% 20%, rgba(255, 248, 235, 0.5), transparent 70%),
    /* L2 纸张质感：手工纸噪点 */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Crect width='2' height='2' fill='%23fdfbf8'/%3E%3Crect width='1' height='1' fill='%23e8e0d8' opacity='0.02'/%3E%3C/svg%3E") repeat,
    /* L1 底色：纯净白色渐变 */
    linear-gradient(180deg, #fdfbf8, #f8f4ee);
}

/* L4 窗花投影层 */
.manifesto-shadow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.manifesto-shadow img {
  width: 60%;
  max-width: 500px;
  opacity: 0.04;
  filter: blur(2px);
  animation: manifesto-shadow-drift 12s ease-in-out infinite;
}

/* L5 窗花浮层 */
.manifesto-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.manifesto-pattern img {
  width: 60%;
  max-width: 500px;
  opacity: 0.03;
  transform: translate(4px, 4px);
  animation: manifesto-pattern-drift 12s ease-in-out infinite;
}

/* 确保宣言内容在背景层之上 */
.manifesto-section > .manifesto-content {
  position: relative;
  z-index: 1;
}

@keyframes manifesto-shadow-drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(3px, -3px); }
}

@keyframes manifesto-pattern-drift {
  0%, 100% { transform: translate(4px, 4px); }
  50% { transform: translate(7px, 1px); }
}

/* ========== 剪艺应用 — 锦缎织造 ========== */
.ecosystem-section {
  background:
    /* L3 金色丝线装饰 */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath d='M0,100 Q50,80 100,100 Q150,120 200,100' stroke='%23c9a96e' stroke-width='0.5' fill='none' opacity='0.04'/%3E%3Cpath d='M0,50 Q50,30 100,50 Q150,70 200,50' stroke='%23c9a96e' stroke-width='0.5' fill='none' opacity='0.04'/%3E%3Cpath d='M0,150 Q50,130 100,150 Q150,170 200,150' stroke='%23c9a96e' stroke-width='0.5' fill='none' opacity='0.04'/%3E%3C/svg%3E") repeat,
    /* L2 编织纹理：交叉织锦纹 */
    repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(180,150,100,0.06) 2px, rgba(180,150,100,0.06) 4px),
    repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(180,150,100,0.06) 2px, rgba(180,150,100,0.06) 4px),
    /* L5 柔和网格 */
    linear-gradient(rgba(180,150,100,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(180,150,100,0.04) 1px, transparent 1px),
    /* L1 底色：浅香槟金到暖米渐变 */
    linear-gradient(135deg, #faf5ed, #f5ede0);
  background-size: auto, auto, auto, 60px 60px, 60px 60px, auto;
}

/* L4 浮动光点 */
.ecosystem-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.ecosystem-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(201, 169, 110, 0.15);
  animation: particle-float 8s ease-in-out infinite;
}

.ecosystem-particle:nth-child(1) { left: 10%; top: 20%; animation-duration: 7s; animation-delay: 0s; }
.ecosystem-particle:nth-child(2) { left: 30%; top: 60%; animation-duration: 9s; animation-delay: 1s; }
.ecosystem-particle:nth-child(3) { left: 50%; top: 30%; animation-duration: 6s; animation-delay: 2s; }
.ecosystem-particle:nth-child(4) { left: 70%; top: 70%; animation-duration: 10s; animation-delay: 0.5s; }
.ecosystem-particle:nth-child(5) { left: 85%; top: 40%; animation-duration: 8s; animation-delay: 1.5s; }
.ecosystem-particle:nth-child(6) { left: 15%; top: 80%; animation-duration: 7.5s; animation-delay: 3s; }
.ecosystem-particle:nth-child(7) { left: 60%; top: 15%; animation-duration: 9.5s; animation-delay: 2.5s; }
.ecosystem-particle:nth-child(8) { left: 40%; top: 50%; animation-duration: 6.5s; animation-delay: 0.8s; }

/* 确保内容在背景层之上 */
.ecosystem-section > *:not(.ecosystem-particles) {
  position: relative;
  z-index: 1;
}

@keyframes particle-float {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 0.25; }
}

/* ========== 无障碍：减少动画偏好 ========== */
@media (prefers-reduced-motion: reduce) {
  .product-bg-watermark,
  .manifesto-shadow img,
  .manifesto-pattern img,
  .ecosystem-particle {
    animation: none !important;
  }
}
</style>
```

- [ ] **Step 4: 验证页面渲染**

```bash
npm run dev -- --host 0.0.0.0 --port 3000 &
sleep 3
curl -s http://localhost:3000 | grep -c "product-section"
```

Expected: 返回 1（section 类名存在）。

- [ ] **Step 5: 提交**

```bash
git add src/views/HomeView.vue
git commit -m "feat: add rice-paper gallery background to product section"
```

---

### Task 4: 为剪艺宣言区域添加纸雕光影背景

**Files:**
- Modify: `src/views/HomeView.vue:175-191` (Manifesto section)

- [ ] **Step 1: 替换宣言区 section 标签**

将第 175 行：

```html
    <section class="relative py-48 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
```

替换为：

```html
    <section class="manifesto-section relative py-48 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
```

- [ ] **Step 2: 替换森林图背景层为纸雕光影层**

将第 176-179 行：

```html
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-30" alt="森林薄雾">
        <div class="absolute inset-0 bg-forest-overlay/55"></div>
      </div>
```

替换为：

```html
      <!-- 纸雕光影背景层 -->
      <div class="manifesto-shadow" aria-hidden="true">
        <img src="@/assets/wing-flower-pattern.svg" alt="">
      </div>
      <div class="manifesto-pattern" aria-hidden="true">
        <img src="@/assets/wing-flower-pattern.svg" alt="">
      </div>
```

- [ ] **Step 3: 为宣言文字内容添加 z-index 容器类**

将第 180 行：

```html
      <div class="relative z-10 max-w-4xl">
```

替换为：

```html
      <div class="manifesto-content relative z-10 max-w-4xl">
```

- [ ] **Step 4: 调整宣言区文字颜色（浅色背景用深色文字）**

将第 181-182 行的 kicker 文字：

```html
        <p class="text-bamboo-light text-[12px] font-bold uppercase tracking-[0.3em] mb-12">
          剪艺宣言
        </p>
```

替换为：

```html
        <p class="text-bamboo-base text-[12px] font-bold uppercase tracking-[0.3em] mb-12">
          剪艺宣言
        </p>
```

将第 184-186 行的主标题：

```html
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-medium text-mist-base leading-snug tracking-tight">
          "我们不只是裁刻纸张。<br>我们在方寸之间，<br>雕琢大千世界。"
        </h2>
```

替换为：

```html
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-medium text-ink-base leading-snug tracking-tight">
          "我们不只是裁刻纸张。<br>我们在方寸之间，<br>雕琢大千世界。"
        </h2>
```

将第 187-189 行的署名：

```html
        <p class="text-sage-light text-[13px] font-bold uppercase tracking-[0.2em] mt-12 flex items-center justify-center gap-4">
          <span class="w-6 h-[1px] bg-sage-dark"></span> 剪艺数字实验室，中国
        </p>
```

替换为：

```html
        <p class="text-bamboo-dark text-[13px] font-bold uppercase tracking-[0.2em] mt-12 flex items-center justify-center gap-4">
          <span class="w-6 h-[1px] bg-bamboo-soft"></span> 剪艺数字实验室，中国
        </p>
```

- [ ] **Step 5: 验证宣言区渲染**

```bash
npm run dev -- --host 0.0.0.0 --port 3000 &
sleep 3
curl -s http://localhost:3000 | grep -c "manifesto-section"
```

Expected: 返回 1。

- [ ] **Step 6: 提交**

```bash
git add src/views/HomeView.vue
git commit -m "feat: add paper-carving light-shadow background to manifesto section"
```

---

### Task 5: 为剪艺应用区域添加锦缎织造背景

**Files:**
- Modify: `src/views/HomeView.vue:114` (ecosystem section 标签)
- Modify: `src/views/HomeView.vue` template（添加粒子层）

- [ ] **Step 1: 修改剪艺应用 section 标签**

将第 114 行：

```html
    <section class="py-24 px-6 lg:px-12 bg-transparent max-w-[1600px] mx-auto w-full overflow-hidden">
```

替换为：

```html
    <section class="ecosystem-section relative py-24 px-6 lg:px-12 max-w-[1600px] mx-auto w-full overflow-hidden">
```

- [ ] **Step 2: 在 section 开头添加浮动光点层**

在 `<section>` 标签之后、`<div class="grid` 之前插入：

```html
      <!-- 锦缎织造背景：浮动光点 -->
      <div class="ecosystem-particles" aria-hidden="true">
        <div class="ecosystem-particle"></div>
        <div class="ecosystem-particle"></div>
        <div class="ecosystem-particle"></div>
        <div class="ecosystem-particle"></div>
        <div class="ecosystem-particle"></div>
        <div class="ecosystem-particle"></div>
        <div class="ecosystem-particle"></div>
        <div class="ecosystem-particle"></div>
      </div>
```

- [ ] **Step 3: 验证应用区渲染**

```bash
npm run dev -- --host 0.0.0.0 --port 3000 &
sleep 3
curl -s http://localhost:3000 | grep -c "ecosystem-section"
```

Expected: 返回 1。

- [ ] **Step 4: 提交**

```bash
git add src/views/HomeView.vue
git commit -m "feat: add brocade-weave background to ecosystem section"
```

---

### Task 6: 更新测试并验证

**Files:**
- Modify: `tests/unit/views/home-redesign.spec.js`

- [ ] **Step 1: 更新现有测试**

将 `tests/unit/views/home-redesign.spec.js` 的全部内容替换为：

```javascript
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../../../src/views/HomeView.vue'

vi.mock('../../../src/components/Carousel.vue', () => ({
  default: { template: '<section data-testid="new-hero">hero</section>' }
}))

vi.mock('../../../src/components/LaptopAnimation.vue', () => ({
  default: { template: '<div data-testid="laptop">laptop</div>' }
}))

vi.mock('../../../src/components/PhoneAnimation.vue', () => ({
  default: { template: '<div data-testid="phone">phone</div>' }
}))

describe('Home redesign structure', () => {
  it('keeps hero and key navigation entry points', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('[data-testid="new-hero"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('核心作品')
    expect(wrapper.findComponent({ name: 'SectionHero' }).exists()).toBe(true)
  })

  it('has product section with rice-paper background class', () => {
    const wrapper = mount(HomeView)
    const productSection = wrapper.find('.product-section')
    expect(productSection.exists()).toBe(true)
  })

  it('has manifesto section with paper-carving background class', () => {
    const wrapper = mount(HomeView)
    const manifestoSection = wrapper.find('.manifesto-section')
    expect(manifestoSection.exists()).toBe(true)
  })

  it('has ecosystem section with brocade background class', () => {
    const wrapper = mount(HomeView)
    const ecosystemSection = wrapper.find('.ecosystem-section')
    expect(ecosystemSection.exists()).toBe(true)
  })

  it('does not render ParallaxBackground component', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent({ name: 'ParallaxBackground' }).exists()).toBe(false)
  })

  it('has manifesto content with dark text for light background', () => {
    const wrapper = mount(HomeView)
    const manifestoHeading = wrapper.find('.manifesto-section h2')
    expect(manifestoHeading.classes()).toContain('text-ink-base')
  })

  it('has floating particles in ecosystem section', () => {
    const wrapper = mount(HomeView)
    const particles = wrapper.findAll('.ecosystem-particle')
    expect(particles.length).toBe(8)
  })
})
```

- [ ] **Step 2: 运行测试**

```bash
npx vitest run tests/unit/views/home-redesign.spec.js
```

Expected: 全部 7 个测试通过。

- [ ] **Step 3: 提交**

```bash
git add tests/unit/views/home-redesign.spec.js
git commit -m "test: update HomeView tests for section background redesign"
```

---

### Task 7: 最终验证与生产构建

**Files:** 无新增/修改

- [ ] **Step 1: 运行全部单元测试**

```bash
npx vitest run
```

Expected: 全部测试通过，无新增失败。

- [ ] **Step 2: 生产构建验证**

```bash
npm run build
```

Expected: 构建成功，无错误。

- [ ] **Step 3: 检查构建产物**

```bash
ls -la dist/assets/*.css | head -5
```

Expected: CSS 文件存在且大小合理（新增样式不超过 3KB gzip）。

- [ ] **Step 4: 最终提交（如有遗漏）**

```bash
git status
```

Expected: 工作区干净，无未提交变更。

---

## 自检清单

- [ ] 核心作品区域呈现宣纸展厅质感，窗花水印隐约可见
- [ ] 剪艺宣言区域呈现纸雕光影效果，窗花投影层次分明
- [ ] 剪艺应用区域呈现锦缎织造质感，金色丝线和浮动光点可见
- [ ] 三个区域视觉身份明显不同，全部为浅色系
- [ ] ParallaxBackground 已从 HomeView 移除
- [ ] 宣言区文字已从浅色改为深色
- [ ] `prefers-reduced-motion` 下动效禁用
- [ ] 全部单元测试通过
- [ ] 生产构建成功
