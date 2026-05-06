# 应用页面全宽沉浸式重设计

> 日期：2026-05-06
> 范围：`src/views/AppDownloadView.vue`
> 约束：不更改现有内容（文案、功能列表、评价数据、截图图片）

---

## 设计目标

1. 解决区块割裂感——5 个区块通过渐变色带自然串联，取消硬分割线
2. 建立清晰视觉层次——截图轮播区作为视觉高潮，Hero 和 CTA 首尾呼应
3. 充分利用页面宽度——全宽布局，最大化沉浸感
4. 增加视觉丰富度——国潮风格，窗花纹样装饰、渐变色块、毛玻璃卡片

---

## 整体色彩与衔接策略

5 个区块用渐变背景自然过渡，页面像一条流动的色带：

| 区块 | 背景渐变 | 色调说明 |
|------|----------|----------|
| Hero | `#F7F5F2 → #FFF1F3` | 暖白→极淡粉，暗示即将进入粉色系 |
| 截图轮播 | `#FFF1F3 → #FDF2F8` | 淡粉→更粉，视觉高潮区 |
| 核心功能 | `#FDF2F8 → #F7F5F2` | 粉→回暖白，呼吸感 |
| 用户评价 | `#F7F5F2` | 纯暖白，干净留白 |
| CTA | `#F7F5F3 → #FFF1F3` | 暖白→淡粉，呼应 Hero 首尾闭环 |

**装饰元素**：窗花纹样（`窗花017/018/019.png`）以 `opacity: 4%-8%` 半透明铺在各区块背景角落，增加文化质感，不干扰文字阅读。

**无英文标签**：所有章节标题不使用英文小标签，只保留中文标题和副标题。

---

## 区块设计

### 1. Hero 区域

**布局**：保留左右双栏结构。

**左侧文案区**：
- 顶部标签「剪纸非遗 · 数字传承」：`accent-pink` 色圆角胶囊样式，`bg-accent-pink/5 border border-accent-pink/15`
- 标题：第一行「非遗体验」serif 粗体 `text-text-primary`，第二行「从手机开始」粉色渐变文字 `from-accent-pink to-pink-400 bg-clip-text text-transparent`
- 副文案：`text-text-secondary`
- 评分卡：白色实底卡片 `bg-white border-border-light shadow-sm`，包含 5 颗黄色星星 + 4.9 分 + 下载量信息
- 下载按钮：`bg-accent-pink hover:bg-pink-600`，hover 加投影和微上移

**右侧手机模型**：
- 尺寸放大至 `280×560`
- 手机背后粉色光晕（`accent-pink/10`，blur 80px）
- 手机底部斜向渐变倒影装饰（粉色→透明）

**背景**：
- 渐变 `#F7F5F2 → #FFF1F3`
- 右上角和左下角各放一个半透明窗花纹样（`opacity: 5%`，大尺寸，裁切溢出）

---

### 2. 截图轮播区（视觉高潮）

**背景**：全宽渐变 `#FFF1F3 → #FDF2F8`，比 Hero 更粉一层。

**轮播容器**：
- 取消 `jy-glass-card` 白底容器
- 改为渐变色块底板 `from-pink-50 via-rose-50 to-purple-50`，`rounded-3xl`
- 边框 `1px solid accent-pink/10`
- 底板内左右各放一个半透明窗花纹样装饰（`opacity: 6%`）

**手机模型**：
- 尺寸 `260×520`，居中
- 背后粉色光晕 `accent-pink/15`
- 截图切换用 `<Transition name="fade-scale">` 淡入缩放动画

**导航按钮**：
- 半透明白底圆按钮 `bg-white/70 backdrop-blur-sm`
- hover 变 `accent-pink` 背景色 + 白色图标

**圆点指示器**：
- 激活态：胶囊形 `w-10`，`bg-accent-pink`
- 非激活态：圆形 `w-2`，`bg-border-light`

**截图标题**：手机下方显示当前截图标题和描述，与切换同步变化。

---

### 3. 核心功能区

**背景**：渐变 `#FDF2F8 → #F7F5F2`，从粉色回落到暖白。

**章节标题**：
- 中文主标题「核心功能」serif 粗体
- 副标题「四大核心功能，全方位提升剪纸体验」
- 无英文标签

**卡片（4 列网格）**：
- 背景 `bg-white/80 backdrop-blur-sm`，半透明毛玻璃
- 边框 `border-accent-pink/10`
- hover：边框变 `accent-pink/30`，上移 4px，投影加 `accent-pink/8`
- 卡片内悬停渐显粉色背景层（`from-accent-pink/3 to-transparent`）
- 图标容器保留原有渐变色 + `shadow-lg`，hover `scale-110`

---

### 4. 用户评价区

**背景**：纯暖白 `#F7F5F2`。

**章节标题**：
- 中文主标题「用户评价」serif 粗体
- 副标题「听听用户怎么说」

**卡片（3 列网格）**：
- 白色实底 `bg-white` + `border-light` + 轻投影
- hover：边框 `accent-pink/20`，投影加 `accent-pink/5`
- 评价内容加中文引号包裹

---

### 5. 底部 CTA

**背景**：渐变 `#F7F5F3 → #FFF1F3`，呼应 Hero。
- 右下角半透明窗花纹样装饰（`opacity: 5%`）

**容器**：全宽圆角色块 `rounded-3xl`，无边框，靠渐变背景与页面区分。

**内容**：
- 中文主标题「立即下载，开启剪纸之旅」serif 粗体
- 副标题文案
- 下载按钮 `accent-pink`，hover 加投影和微上移

---

## 区块衔接与间距

- **取消所有 `section-divider` 分割线**，区块之间靠渐变背景自然过渡
- **区块间距**：每个 section `py-20 lg:py-28`（80px-112px）
- **滚动入场动画**：保留 `.reveal` + IntersectionObserver，上浮+淡入+去模糊
- **`prefers-reduced-motion` 适配**：保留

---

## 技术实现要点

- 渐变背景使用 Tailwind `bg-gradient-to-br` 配合自定义色值
- 窗花纹样装饰用 `absolute` 定位 + `pointer-events-none` + `overflow-hidden` 裁切
- IntersectionObserver 复用 HomeView 已有模式
- 所有按钮添加 `cursor-pointer`
- 手机模型保留深色机身（真实感），仅调整投影和光晕
- 截图切换保留 `<Transition name="fade-scale">` 已有动画

---

## 不变内容清单

以下内容保持原样，不做任何修改：

- Hero 标题、副文案、评分数据
- 截图图片（`appScreenshot1/2/3`）及截图元数据（title/description）
- 功能列表（4 项：纹样盛宴、时光映记、AR 纹样识别、社区共创）及其图标、描述、渐变色
- 用户评价数据（3 条默认评价 + API 获取逻辑）
- 下载按钮文案和跳转逻辑（`goAndroid`）
- `<script setup>` 中的所有数据和函数
