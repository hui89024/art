# 首页剪艺应用区域重新设计 — 设计规格

> 日期：2026-04-29
> 状态：待审阅
> 影响文件：`src/views/HomeViewChinese.vue`

---

## 背景与目标

当前首页（HomeViewChinese.vue）的"剪艺应用"区域（数字生态区）存在三个问题：
1. 左右内容分配不均衡，右侧太拥挤
2. 电脑/手机模型的展示容器太普通（红/暖色渐变 + 粗边框）
3. 纹样库部分太简陋，与应用介绍不协调

目标是在**保持当前紧凑规模**的前提下，以**苹果官网产品展示风格**重新设计该区域，提升精致度和品质感。

### 设计原则

- 保持明亮风格，不切换为深色主题
- 苹果官网式产品展示：大量留白、精致阴影、极简容器
- 去除视觉噪音（旋转窗花装饰、粗边框、暖色渐变）
- 内容清晰：2 个设备模型 + 2 段文字介绍

---

## 内容结构

该区域包含 4 个核心元素：

| 元素 | 位置 | 说明 |
|------|------|------|
| 电脑模型（LaptopAnimation） | 左侧 | 已内置纹样库图片，保留 |
| 手机 APP 介绍 | 左侧 | kicker + title + subtitle（ChineseSectionHeader） |
| 手机模型（PhoneAnimation） | 右侧 | 保留 |
| 纹样库介绍 | 右侧 | kicker + title + subtitle（ChineseSectionHeader） |

**移除内容：**
- 底部三个独立的纹样图标展示（窗花 17/18/19 图标网格）
- 背景旋转窗花装饰（`animate-spin-very-slow`）

---

## 布局结构

```
┌─────────────────────────────────────────────────────┐
│  白色背景 + 极简光晕装饰                              │
│                                                     │
│  ┌── 左侧 (55%) ──────┐  ┌── 右侧 (45%) ──────┐   │
│  │                     │  │                     │   │
│  │  kicker: 剪艺应用    │  │  📱 手机模型        │   │
│  │  title: 非遗艺术…    │  │  (精致白色容器      │   │
│  │  subtitle: …        │  │   + 柔和扩散阴影)    │   │
│  │                     │  │                     │   │
│  │  💻 电脑模型        │  │  kicker: 剪艺纹样库  │   │
│  │  (纯白背景容器      │  │  title: 数字化传承…  │   │
│  │   + 精致悬浮阴影    │  │  subtitle: …        │   │
│  │   + 极细边框)       │  │                     │   │
│  │                     │  │                     │   │
│  └─────────────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 视觉规格

### 背景

| 属性 | 值 |
|------|-----|
| 主背景色 | `bg-white`（保持） |
| 旋转窗花装饰 | **移除**（两个 `animate-spin-very-slow` 元素） |
| 光晕装饰 | 保留但缩小：`w-64 h-64`（原 `w-96 h-96`），opacity 降低至 `opacity-20` |

### 整体布局容器

| 属性 | 值 |
|------|-----|
| 外层 section | `py-20 md:py-28 lg:py-32 px-5 md:px-8 lg:px-12` |
| 网格容器 | `grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20` |
| 左侧宽度 | `lg:col-span-1`（默认等分，通过内容自然撑开） |
| 左侧内部 | `space-y-8 md:space-y-10` |
| 右侧内部 | `space-y-8 md:space-y-10` |

### 设备容器（苹果风格）

统一应用于电脑模型和手机模型的外层容器：

| 属性 | 值 |
|------|-----|
| 背景 | `bg-white` |
| 边框 | `border border-gray-100` |
| 圆角 | `rounded-2xl` |
| 阴影 | `shadow-xl shadow-gray-200/60` |
| 内边距 | `p-6 md:p-8` |
| 布局 | `flex justify-center items-center` |
| 悬停效果 | `hover:shadow-2xl hover:-translate-y-1 transition-all duration-500` |

**电脑模型容器：**
```html
<div class="relative flex justify-center items-center p-6 md:p-8
            bg-white rounded-2xl border border-gray-100
            shadow-xl shadow-gray-200/60
            hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
  <LaptopAnimation class="relative z-10" />
</div>
```

**手机模型容器：**
```html
<div class="relative flex justify-center items-center p-6 md:p-8
            bg-white rounded-2xl border border-gray-100
            shadow-xl shadow-gray-200/60
            hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
  <PhoneAnimation class="relative z-10" />
</div>
```

### 内容文字

使用已有的 `ChineseSectionHeader` 组件，无需修改组件本身。

**左侧（应用介绍）：**
```html
<ChineseSectionHeader
  kicker="剪艺应用"
  title="非遗艺术，在指尖交互中重生。"
  subtitle="剪艺应用不仅仅是一个展示平台，它将繁复的剪纸技艺转化为直观的数字化交互体验。"
/>
```

**右侧（纹样库介绍）：**
```html
<ChineseSectionHeader
  kicker="剪艺纹样库"
  title="数字化传承的基因库。"
  subtitle="我们深度提取了上千种传统剪纸纹样，进行数字化修复与矢量化建模。"
/>
```

---

## 移除内容清单

| 元素 | 位置 | 原因 |
|------|------|------|
| 背景旋转窗花 1 | `div.absolute.top-0.right-0` | 视觉噪音，与苹果风格不符 |
| 背景旋转窗花 2 | `div.absolute.bottom-0.left-0` | 同上 |
| 纹样库图标展示区 | `div.flex.gap-6.justify-center` | 与电脑模型内容重复 |
| 纹样库分隔线 | `div.border-t-4.border-red-200` | 粗边框与精致风格不符 |
| 设备容器红/暖色渐变 | `bg-gradient-to-br from-red-50 to-amber-50` | 替换为纯白背景 |
| 设备容器粗边框 | `border-4 border-red-200` | 替换为极细边框 |

---

## 响应式适配

| 断点 | 调整 |
|------|------|
| 移动端 `<768px` | 单栏堆叠（上下排列），section padding `py-20 px-5` |
| 平板 `768-1024px` | 双栏，间距 `gap-12`，section padding `py-28 px-8` |
| 桌面 `>1024px` | 标准双栏，间距 `gap-20`，section padding `py-32 px-12` |

---

## 无障碍

- 设备模型图片需有 `alt` 属性（已有）
- 背景装饰元素添加 `aria-hidden="true"`（已有）
- 确保文字与背景对比度符合 WCAG AA 标准

---

## 技术实现备注

- 仅修改 `src/views/HomeViewChinese.vue` 的数字生态区部分（约 lines 67-132）
- 不涉及新组件创建，复用已有的 `ChineseSectionHeader`、`LaptopAnimation`、`PhoneAnimation`
- 设备容器样式可抽取为 Tailwind @apply 或直接内联（保持简单，直接内联）
