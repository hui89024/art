# 剪艺宣言区重新设计实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 ChineseManifesto.vue 从暗调深色风格转变为"晨光纸韵"明亮温暖风格

**Architecture:** 单文件重构，保持现有组件结构和动画系统，仅修改颜色令牌、文案内容和印章样式

**Tech Stack:** Vue 3 `<script setup>`、Scoped CSS、Tailwind CSS

---

## 文件结构

| 操作 | 文件路径 | 职责 |
|------|----------|------|
| Modify | `src/components/ChineseManifesto.vue` | 宣言区核心组件 |

---

### Task 1: 更新 CSS 颜色令牌

**Files:**
- Modify: `src/components/ChineseManifesto.vue:216-299`

- [ ] **Step 1: 更新背景渐变**

将深色背景改为淡米色渐变：

```css
.bg-manifesto-bg {
  background: linear-gradient(to bottom, #FAF5EF, #F5EFE6, #FAF5EF);
}
```

- [ ] **Step 2: 更新光晕效果**

将红色/琥珀光晕改为金色/棕色系：

```css
.bg-manifesto-glow-left {
  background: linear-gradient(to right, #DEB887, transparent);
}

.bg-manifesto-glow-right {
  background: linear-gradient(to left, #D2B48C, transparent);
}

.bg-manifesto-glow-center {
  background: linear-gradient(to right, #F5DEB3, #DEB887, #F5DEB3);
}
```

- [ ] **Step 3: 更新文字颜色**

将浅灰色文字改为深棕色：

```css
.text-manifesto-primary {
  color: #5D4037;
}

.text-manifesto-secondary {
  color: #795548;
}

.text-manifesto-label {
  color: #A0522D;
}
```

- [ ] **Step 4: 更新标签背景和边框**

将红色系改为金色系：

```css
.text-manifesto-label-bg {
  background: rgba(184, 134, 11, 0.1);
}

.border-manifesto-border {
  border-color: rgba(184, 134, 11, 0.3);
}
```

- [ ] **Step 5: 更新印章颜色**

将红色印章改为金色/棕色系：

```css
.border-manifesto-seal {
  border-color: #B8860B;
}

.border-manifesto-seal-inner {
  border-color: rgba(184, 134, 11, 0.5);
}

.text-manifesto-seal-text {
  color: #8B4513;
}
```

- [ ] **Step 6: 更新装饰元素颜色**

将红色装饰改为金色：

```css
.text-manifesto-accent {
  color: #B8860B;
}

.bg-manifesto-accent {
  background-color: #B8860B;
}

.bg-manifesto-divider {
  background: linear-gradient(to right, transparent, rgba(184, 134, 11, 0.5));
}
```

- [ ] **Step 7: 更新滚动指示器颜色**

```css
.border-manifesto-scroll-indicator {
  border-color: #B8860B;
}

.bg-manifesto-scroll-dot {
  background-color: #8B4513;
}
```

- [ ] **Step 8: 更新渐变文字**

将红琥珀渐变改为红棕巧克力色渐变：

```css
.manifesto-gradient-text {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #8B4513 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 9: 更新页脚颜色**

```css
.text-manifesto-footer {
  color: #795548;
}

.text-manifesto-footer-sub {
  color: #8D6E63;
}
```

- [ ] **Step 10: 提交颜色令牌更新**

```bash
git add src/components/ChineseManifesto.vue
git commit -m "feat(manifesto): 更新颜色令牌为晨光纸韵风格"
```

---

### Task 2: 更新文案内容

**Files:**
- Modify: `src/components/ChineseManifesto.vue:56-98`

- [ ] **Step 1: 更新核心宣言文字**

将现有的三行宣言替换为新版本：

```html
<!-- 核心宣言文字 -->
<div class="mb-12 md:mb-20 space-y-4 md:space-y-6">
  <h2 class="manifesto-slide-up delay-2"
      :class="{ 'is-visible': isVisible }">
    <span class="block manifesto-heading-text text-manifesto-primary">
      纸，是时光的信笺。
    </span>
  </h2>

  <h3 class="manifesto-slide-up delay-3"
      :class="{ 'is-visible': isVisible }">
    <span class="block manifesto-heading-text text-manifesto-primary">
      刀，是心意的画笔。
    </span>
  </h3>

  <h3 class="manifesto-slide-up delay-4"
      :class="{ 'is-visible': isVisible }">
    <span class="block manifesto-heading-text manifesto-gradient-text">
      每一次裁剪，
    </span>
    <span class="block manifesto-heading-text manifesto-gradient-text">
      都是与美好的相遇。
    </span>
  </h3>
</div>
```

- [ ] **Step 2: 更新哲学阐述段落**

将现有段落替换为温暖诗意版本：

```html
<!-- 哲学阐述 -->
<p class="text-manifesto-secondary text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto
          mb-12 md:mb-20 manifesto-slide-up delay-6"
   :class="{ 'is-visible': isVisible }">
  在剪艺的世界里，一把剪刀，一张红纸，便能剪出四季的风景、千年的祝福。
  我们相信，传统不是尘封的记忆，而是流淌在指尖的温度。
  每一刀落下，都是匠心与时光的对话；每一幅窗花，都是送给生活的礼物。
</p>
```

- [ ] **Step 3: 提交文案更新**

```bash
git add src/components/ChineseManifesto.vue
git commit -m "feat(manifesto): 更新为温暖诗意风格文案"
```

---

### Task 3: 改造印章组

**Files:**
- Modify: `src/components/ChineseManifesto.vue:100-129`
- Modify: `src/components/ChineseManifesto.vue:180-185`
- Modify: `src/components/ChineseManifesto.vue:346-364`

- [ ] **Step 1: 更新印章数据**

将印章内容改为新的四字组合：

```javascript
const seals = [
  { char: '剪', label: '剪影' },
  { char: '纸', label: '纸韵' },
  { char: '匠', label: '匠心' },
  { char: '心', label: '心意' }
]
```

- [ ] **Step 2: 更新印章模板**

将旋转正方形改为圆形篆刻图标：

```html
<!-- 印章组 -->
<div class="flex items-center justify-center gap-6 md:gap-10 lg:gap-16 mb-12 md:mb-16"
     role="list"
     aria-label="剪艺核心价值">
  <div v-for="(seal, index) in seals" :key="seal.char"
       class="manifesto-slide-up"
       :class="{ 'is-visible': isVisible }"
       :style="{ '--seal-delay': `${7 + index}` }"
       role="listitem">
    <div class="seal-group relative cursor-default">
      <!-- 印章外框 - 圆形 -->
      <div class="seal-frame w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                  rounded-full border-[1.5px] border-manifesto-seal flex items-center justify-center">
        <!-- 印章文字 -->
        <span class="font-serif text-manifesto-seal-text text-lg md:text-xl lg:text-2xl font-bold">
          {{ seal.char }}
        </span>
      </div>
      <!-- 印章说明 -->
      <div class="mt-3 md:mt-4 text-center">
        <span class="text-manifesto-label text-xs tracking-widest">
          {{ seal.label }}
        </span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: 更新印章交互样式**

移除旋转效果，改为简单的放大：

```css
/* ===== 印章交互 - 圆形篆刻图标 ===== */
.seal-frame {
  transition: border-color 250ms ease-out, transform 250ms ease-out;
}

.seal-group:hover .seal-frame,
.seal-group:focus-within .seal-frame {
  border-color: #A0522D;
  transform: scale(1.05);
}

.seal-group .font-serif {
  transition: color 250ms ease-out;
}

.seal-group:hover .font-serif,
.seal-group:focus-within .font-serif {
  color: #A0522D;
}
```

- [ ] **Step 4: 提交印章改造**

```bash
git add src/components/ChineseManifesto.vue
git commit -m "feat(manifesto): 改造印章组为圆形篆刻图标"
```

---

### Task 4: 更新装饰元素

**Files:**
- Modify: `src/components/ChineseManifesto.vue:12-14`
- Modify: `src/components/ChineseManifesto.vue:27-41`
- Modify: `src/components/ChineseManifesto.vue:147-161`

- [ ] **Step 1: 更新窗花纹理透明度**

将透明度从 3% 改为 5%：

```html
<!-- 宣纸纹理层 -->
<div class="absolute inset-0 opacity-[0.05] pointer-events-none"
     style="background-image: url('/src/assets/窗花018.png'); background-size: 300px; background-repeat: repeat;">
</div>
```

- [ ] **Step 2: 更新云纹装饰颜色**

云纹 SVG 的颜色通过 `text-manifesto-accent` 类控制，已在 Task 1 中更新为金色 `#B8860B`，无需修改模板。

- [ ] **Step 3: 提交装饰元素更新**

```bash
git add src/components/ChineseManifesto.vue
git commit -m "feat(manifesto): 更新装饰元素透明度和颜色"
```

---

### Task 5: 验证与最终提交

**Files:**
- Modify: `src/components/ChineseManifesto.vue`

- [ ] **Step 1: 启动开发服务器验证**

```bash
npm run dev
```

在浏览器中访问首页，检查：
- 背景色为淡米色
- 文字为深棕色
- 渐变文字从红棕到巧克力色
- 印章为圆形篆刻图标
- 云纹为金色
- 动画正常播放

- [ ] **Step 2: 检查响应式布局**

在浏览器中测试：
- 移动端（< 768px）：自动高度，内边距 4rem
- 桌面端（>= 768px）：全屏高度

- [ ] **Step 3: 检查无障碍支持**

在系统设置中开启"减少动态效果"，确认：
- 所有动画立即完成
- 内容立即显示

- [ ] **Step 4: 最终提交**

```bash
git add src/components/ChineseManifesto.vue
git commit -m "feat(manifesto): 完成晨光纸韵风格重新设计

- 背景从深黑改为淡米色渐变
- 文字从浅灰改为深棕/红棕
- 装饰从红色系改为金色系
- 印章从旋转正方形改为圆形篆刻图标
- 文案更新为温暖诗意风格
- 窗花纹理透明度从3%改为5%"
```

---

## 验收检查清单

- [ ] 背景色为淡米色 `#FAF5EF`
- [ ] 主文字为深棕 `#5D4037`
- [ ] 核心宣言使用红棕 `#8B4513`
- [ ] 渐变文字从红棕到巧克力色
- [ ] 装饰元素为金色系 `#B8860B`
- [ ] 云纹为半透明金色
- [ ] 印章为圆形篆刻图标，正立放置
- [ ] 窗花纹理透明度为5%
- [ ] 文案为新版本温暖诗意风格
- [ ] 动画保持序列入场效果
- [ ] 响应式布局正常
- [ ] 无障碍支持正常

---

*计划完成。等待用户选择执行方式。*
