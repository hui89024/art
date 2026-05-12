# 首页「剪艺应用」区域背景重设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 增强「剪艺应用」区域背景的国潮氛围，通过强化织锦纹、叠加窗花水印和水墨晕染效果实现更有层次感的视觉体验。

**Architecture:** 所有修改集中在 `src/views/HomeView.vue` 一个文件内：替换 CSS 背景样式、添加窗花图片导入和模板元素、移除粒子动画。纯 CSS + 静态图片方案，零额外运行时开销。

**Tech Stack:** Vue 3 `<script setup>`, Tailwind CSS, CSS gradients, 静态图片资源

---

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/views/HomeView.vue` | 修改 | 唯一需要改动的文件：template/script/style 全部涉及 |

## 已有资源

- 窗花图片：`src/assets/窗花067.png`、`窗花068.png`、`窗花096.png`、`窗花128.png`
- 无需创建新文件

---

### Task 1: 移除粒子动画 HTML

**Files:**
- Modify: `src/views/HomeView.vue:114-124`

- [ ] **Step 1: 删除粒子容器和 8 个 div**

删除以下 HTML 块（第 114-124 行）：

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

- [ ] **Step 2: 验证构建**

Run: `npm run build`
Expected: 构建成功，无报错

---

### Task 2: 添加窗花图片导入

**Files:**
- Modify: `src/views/HomeView.vue:301-303`（script setup 导入区）

- [ ] **Step 1: 添加 4 张窗花图片的 import**

在现有 `pattern019` 导入下方添加：

```javascript
import watermarkTL from '@/assets/窗花067.png'
import watermarkTR from '@/assets/窗花068.png'
import watermarkBL from '@/assets/窗花096.png'
import watermarkBR from '@/assets/窗花128.png'
```

- [ ] **Step 2: 验证构建**

Run: `npm run build`
Expected: 构建成功，无报错

---

### Task 3: 添加窗花水印模板元素

**Files:**
- Modify: `src/views/HomeView.vue`（ecosystem-section 内部，grid 之前）

- [ ] **Step 1: 在 ecosystem-section 开头添加水印容器**

在 `<section class="ecosystem-section ...">` 标签之后、`<div class="grid ...">` 之前插入：

```html
      <!-- 窗花四角水印 -->
      <div class="ecosystem-watermarks" aria-hidden="true">
        <img :src="watermarkTL" class="ecosystem-watermark ecosystem-watermark--tl" alt="">
        <img :src="watermarkTR" class="ecosystem-watermark ecosystem-watermark--tr" alt="">
        <img :src="watermarkBL" class="ecosystem-watermark ecosystem-watermark--bl" alt="">
        <img :src="watermarkBR" class="ecosystem-watermark ecosystem-watermark--br" alt="">
      </div>
```

- [ ] **Step 2: 验证构建**

Run: `npm run build`
Expected: 构建成功，无报错

---

### Task 4: 替换 CSS 背景样式

**Files:**
- Modify: `src/views/HomeView.vue`（`<style scoped>` 中 `.ecosystem-section` 相关样式）

- [ ] **Step 1: 替换 `.ecosystem-section` 背景**

将现有的 `.ecosystem-section` CSS 块：

```css
.ecosystem-section {
  background:
    /* 编织纹理：交叉织锦纹 */
    repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(180,150,100,0.06) 2px, rgba(180,150,100,0.06) 4px),
    repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(180,150,100,0.06) 2px, rgba(180,150,100,0.06) 4px),
    /* 柔和网格 */
    linear-gradient(rgba(180,150,100,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(180,150,100,0.04) 1px, transparent 1px),
    /* 底色：浅香槟金到暖米渐变 */
    linear-gradient(135deg, #faf5ed, #f5ede0);
  background-size: auto, auto, 60px 60px, 60px 60px, auto;
}
```

替换为：

```css
.ecosystem-section {
  background:
    /* 织锦纹：3 层交叉线（45°/135°/90°），1px 细线，金色调 */
    repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(190,160,100,0.10) 1px, rgba(190,160,100,0.10) 3px),
    repeating-linear-gradient(135deg, transparent, transparent 1px, rgba(190,160,100,0.10) 1px, rgba(190,160,100,0.10) 3px),
    repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(190,160,100,0.08) 1px, rgba(190,160,100,0.08) 3px),
    /* 柔和网格 */
    linear-gradient(rgba(180,150,100,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(180,150,100,0.04) 1px, transparent 1px),
    /* 水墨晕染：左上 + 右下两团淡墨 */
    radial-gradient(ellipse at 15% 20%, rgba(180,160,130,0.07), transparent 60%),
    radial-gradient(ellipse at 85% 80%, rgba(170,150,120,0.07), transparent 60%),
    /* 底色：浅香槟金到暖米渐变 */
    linear-gradient(135deg, #faf5ed, #f5ede0);
  background-size: auto, auto, auto, 60px 60px, 60px 60px, auto, auto, auto;
}
```

- [ ] **Step 2: 验证构建**

Run: `npm run build`
Expected: 构建成功，无报错

---

### Task 5: 添加窗花水印 CSS 样式

**Files:**
- Modify: `src/views/HomeView.vue`（`<style scoped>` 末尾）

- [ ] **Step 1: 添加水印相关 CSS**

在 `<style scoped>` 中 `.ecosystem-section` 样式块之后添加：

```css
/* 窗花四角水印 */
.ecosystem-watermarks {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.ecosystem-watermark {
  position: absolute;
  width: 250px;
  height: 250px;
  object-fit: contain;
  opacity: 0.04;
}

.ecosystem-watermark--tl {
  top: -30px;
  left: -30px;
  transform: rotate(15deg);
}

.ecosystem-watermark--tr {
  top: -30px;
  right: -30px;
  transform: rotate(-15deg);
}

.ecosystem-watermark--bl {
  bottom: -30px;
  left: -30px;
  transform: rotate(-15deg);
}

.ecosystem-watermark--br {
  bottom: -30px;
  right: -30px;
  transform: rotate(15deg);
}
```

- [ ] **Step 2: 验证构建**

Run: `npm run build`
Expected: 构建成功，无报错

---

### Task 6: 删除粒子动画 CSS

**Files:**
- Modify: `src/views/HomeView.vue`（`<style scoped>` 中粒子相关样式）

- [ ] **Step 1: 删除 `.ecosystem-particles` 样式块**

删除以下 CSS：

```css
/* L4 浮动光点 */
.ecosystem-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
```

- [ ] **Step 2: 删除 `.ecosystem-particle` 样式块**

删除以下 CSS：

```css
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
```

- [ ] **Step 3: 删除内容层级选择器中的粒子排除规则**

将：

```css
.ecosystem-section > *:not(.ecosystem-particles) {
  position: relative;
  z-index: 1;
}
```

简化为：

```css
.ecosystem-section > * {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 4: 删除 `particle-float` 动画和相关媒体查询**

删除以下 CSS：

```css
@keyframes particle-float {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 0.25; }
}

@media (prefers-reduced-motion: reduce) {
  .ecosystem-particle {
    animation: none !important;
  }
}
```

- [ ] **Step 5: 最终构建验证**

Run: `npm run build`
Expected: 构建成功，无报错

---

## 验收清单

- [ ] 织锦纹明显更细密，有金色质感（3 层 1px 线）
- [ ] 四角可见隐约窗花轮廓，不抢内容视线（opacity 0.04）
- [ ] 背景有微妙的墨韵层次感（两团 radial-gradient）
- [ ] 无粒子动画（DOM 和 CSS 全部移除）
- [ ] 暖白基调不变（底色渐变保持 `#faf5ed → #f5ede0`）
- [ ] 构建通过，无样式报错
