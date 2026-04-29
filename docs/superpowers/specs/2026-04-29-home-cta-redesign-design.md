# 首页底部 CTA 区域重新设计 — 设计规格

> 日期：2026-04-29
> 状态：待审阅
> 影响文件：`src/views/HomeViewChinese.vue`

---

## 背景与目标

当前首页（HomeViewChinese.vue）底部的"准备好开启创作了吗"CTA 区域风格过于普通，布局单调，缺少视觉层次。目标是在**保持当前紧凑尺寸**的前提下，将其重新设计为具有**奢侈品官网收尾体验**质感的高级品牌区域。

### 设计原则

- 紧凑有力，不扩展为全屏或半屏
- 深色背景 + 金色点缀，奢侈品调性
- 纯文字 + 装饰驱动，无精选作品卡片
- 微交互 + 大胆排版 + 装饰纹样，全方位打造惊艳感

---

## 布局结构

```
┌─────────────────────────────────────────────┐
│  ☁ 云纹暗纹背景 (opacity: 3-5%)              │
│                                             │
│  ┌─ kicker ─┐                               │
│  │ 准备好开启创作了吗  ← 金色细线标签        │
│  └──────────┘                               │
│                                             │
│  与剪艺一起                                  │
│  开启非遗之旅。      ← 大标题，大胆留白      │
│                                             │
│  "我们不只是裁刻纸张，                        │
│   我们在方寸之间，雕琢大千世界。"             │
│                    ← 品牌理念，金色引号装饰   │
│                                             │
│     [ 浏览全系作品 → ]  ← 金色渐变按钮       │
│                                             │
│  ─────── 金色装饰细线 ───────                │
└─────────────────────────────────────────────┘
```

---

## 视觉规格

### 背景

| 属性 | 值 |
|------|-----|
| 主背景色 | `#0a0a0a`（近黑）或 `bg-gray-950` |
| 暗纹 | 复用 `ChineseDivider.vue` 中的云纹 SVG 路径，平铺为背景，`opacity: 3-5%`，`background-repeat: repeat`，色调改为 `text-gray-500` |
| 渐变叠加 | 可选：从中心向外的微弱径向渐变，`from-gray-900/30 to transparent` |

### Kicker 标签

| 属性 | 值 |
|------|-----|
| 文字 | "准备好开启创作了吗" |
| 字号 | `text-sm`（14px） |
| 字重 | `font-bold` |
| 颜色 | `text-amber-400`（金色） |
| 字间距 | `tracking-[0.4em]` |
| 边框 | `border border-amber-500/30` |
| 内边距 | `px-6 py-2` |
| 背景 | `bg-amber-500/5`（微弱金色底） |

### 大标题

| 属性 | 值 |
|------|-----|
| 文字 | "与剪艺一起<br>开启非遗之旅。" |
| 字体 | `font-serif`（书法衬线体） |
| 字号 | `text-5xl md:text-6xl` |
| 字重 | `font-bold` |
| 颜色 | `text-white` |
| 行高 | `leading-tight` |
| 字间距 | `tracking-tight` |

### 品牌理念

| 属性 | 值 |
|------|-----|
| 文字 | "我们不只是裁刻纸张，我们在方寸之间，雕琢大千世界。" |
| 字号 | `text-lg`（18px） |
| 字重 | `font-light` |
| 颜色 | `text-gray-400` |
| 装饰 | 左侧金色引号 `"` 装饰符，`text-amber-500/60 text-4xl font-serif` |
| 最大宽度 | `max-w-2xl` |

### CTA 按钮

| 属性 | 值 |
|------|-----|
| 文字 | "浏览全系作品" |
| 背景 | `bg-gradient-to-r from-amber-500 to-yellow-500` |
| 文字色 | `text-gray-900`（深色文字） |
| 字号 | `text-sm` |
| 字重 | `font-bold` |
| 字间距 | `tracking-[0.2em]` |
| 内边距 | `px-10 py-5` |
| 圆角 | `rounded-none`（奢侈品风格无圆角）或 `rounded-sm` |
| 图标 | 右侧箭头 `→`，悬停时向右滑动 `group-hover:translate-x-1` |

### 装饰细线

| 属性 | 值 |
|------|-----|
| 位置 | CTA 按钮下方，分隔 CTA 与 footer 链接 |
| 样式 | `h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent` |
| 宽度 | `w-full` |

---

## 动效规格

| 元素 | 触发 | 效果 | 时长 | 缓动 |
|------|------|------|------|------|
| Kicker 标签 | 滚动入场 | `opacity 0→1, translateY 20px→0` | 600ms | `ease-out` |
| 大标题 | 滚动入场 | `opacity 0→1, translateY 30px→0` | 800ms | `ease-out` |
| 品牌理念 | 滚动入场 | `opacity 0→1, translateY 20px→0` | 600ms | `ease-out` |
| CTA 按钮 | 滚动入场 | `opacity 0→1, translateY 20px→0` | 600ms | `ease-out` |
| CTA 按钮 | 悬停 | 扫光效果（从左到右的半透明白色光带） | 1000ms | `ease-in-out` |
| CTA 箭头 | 悬停按钮 | `translateX 0→4px` | 300ms | `ease-out` |

### 滚动入场时序

各元素依次错位淡入，间隔 100-150ms：
1. Kicker 标签（0ms）
2. 大标题（150ms）
3. 品牌理念（300ms）
4. CTA 按钮（450ms）
5. 装饰细线（600ms，从中心向两侧展开）

### 扫光动效实现

```css
/* 按钮悬停扫光 */
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
```

---

## 间距规格

| 区域 | 间距 |
|------|------|
| 整体区域内边距 | `pt-32 pb-16 px-6 lg:px-12`（保持当前） |
| Kicker → 大标题 | `mb-8` |
| 大标题 → 品牌理念 | `mt-12` |
| 品牌理念 → CTA 按钮 | `mt-10` |
| CTA 按钮 → 装饰细线 | `mt-16` |
| 装饰细线 → Footer 链接 | `mb-16` |

---

## 与现有 Footer 的关系

此 CTA 区域位于 `<footer>` 标签内部、Footer 链接区域上方。仅修改 CTA 部分，Footer 链接区域（品牌信息、导航链接、底部版权）保持不变。

---

## 响应式适配

| 断点 | 调整 |
|------|------|
| 移动端 `<768px` | 标题 `text-4xl`，CTA 按钮全宽 `w-full`，品牌理念字号 `text-base` |
| 平板 `768-1024px` | 标题 `text-5xl` |
| 桌面 `>1024px` | 标题 `text-6xl`，内容居中 |

---

## 无障碍

- CTA 按钮需有明确的 `aria-label`（如 "浏览全系剪纸作品"）
- 装饰细线添加 `aria-hidden="true"`
- 暗纹背景添加 `aria-hidden="true"`
- 确保文字与背景对比度符合 WCAG AA 标准（金色文字 `#f59e0b` 在 `#0a0a0a` 上对比度约 8.5:1，达标）

---

## 技术实现备注

- 暗纹背景：复用 `ChineseDivider.vue` 中已有的云纹 SVG 路径（`M2 24C2 24 12 12 24 12...`），通过内联 SVG 或 CSS `background-image` + `url("data:image/svg+xml,...")` 实现平铺，色调改为灰色 `#6b7280`，`opacity: 3-5%`
- 滚动入场：复用项目已有的 `useScrollReveal` composable
- 扫光动效：纯 CSS 实现，无需额外 JS
- 此改动仅涉及 `HomeViewChinese.vue` 的 footer CTA 部分，不涉及其他文件
