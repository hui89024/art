# 经典展厅布局排版重新设计

> 剪艺数字艺术平台 — CollectiblesView 沉浸式叙事展厅改版
> 日期：2026-04-26 | 状态：设计稿 v1

---

## 1. 概述

将 `CollectiblesView.vue` 从当前 Apple 风格统一画廊布局，改造为**三段式叙事性展厅**：画廊区（白墙风格）→ 渐变过渡带 → 典藏区（暖色木纹风格），并在顶部增加**主题维度下拉组合筛选**功能。

### 设计目标

- 创造"从现代到经典"的沉浸式浏览叙事体验
- 通过 CSS 渐变插值实现平滑过渡，无 JS 滚动事件依赖
- 增强内容可发现性：按主题筛选 + 锚点定位
- 保持与现有 Apple 风格改版（Tasks 1-9）的设计语言兼容

---

## 2. 页面架构

```
┌──────────────────────────────────────────┐
│  SectionHero                              │
│  kicker: "主题馆藏"                        │
│  title:  "沉浸展厅"                       │
│  subtitle: "先看价值，再读细节"            │
├──────────────────────────────────────────┤
│  FilterBar (sticky top-28, z-20)         │
│  ┌─ ThemeDropdown ───────────────────┐   │
│  │  全部 │ 生肖 ▼ │ 花卉 ▼ │ ...     │   │
│  └───────────────────────────────────┘   │
│  ActiveFilters: [生肖 ×] [花卉 ×]        │
├──────────────────────────────────────────┤
│  GallerySection (白墙画廊风格)            │
│  grid md:grid-cols-2 xl:grid-cols-3      │
│  gap-6, 白色/浅米背景, 细边框, 柔阴影    │
│  --index: 0..N                           │
├─── 渐变过渡带 (约 3-4 张卡片) ────────────┤
│  color-mix 插值画廊白 → 典藏暖           │
│  边框、阴影、装饰同步过渡                 │
├──────────────────────────────────────────┤
│  ArchiveSection (暖色典藏风格)            │
│  同网格, 暖棕底, 深色边框, 厚重阴影      │
│  卡片底部增加"藏品编号"铭牌               │
└──────────────────────────────────────────┘
```

---

## 3. 组件树

```
CollectiblesView.vue
├── SectionHero（已有，更新 props）
├── FilterBar（新增）
│   ├── ThemeDropdown.vue（新增）
│   └── ActiveFilterTags（内联）
├── GallerySection（新增分节）
│   └── CollectibleCard × N（改自现有 article）
├── TransitionBand（CSS 自动处理，无独立组件）
├── ArchiveSection（新增分节）
│   └── CollectibleCard × N（风格变体）
├── Loading / Error / Empty 状态（已有）
└── StoryModal（已有）
    └── Teleport
```

### 组件职责

| 组件 | 职责 | 状态 |
|------|------|------|
| `CollectiblesView.vue` | 数据获取、筛选状态、布局编排、动画触发 | 改造 |
| `FilterBar.vue` | 主题筛选下拉 + 已选标签展示 | 新增 |
| `CollectibleCard.vue` | **从 CollectibleDisplay 抽离出**的单卡片容器，接收 `style-mode` prop | 新增 |
| `CollectibleDisplay.vue` | 藏品展台（不变） | 已有 |
| `SectionHero.vue` | 更新文案 | 已有 |
| `StoryModal.vue` | 不变 | 已有 |

---

## 4. 数据模型与筛选

### 主题分类

在 `fallbackPatterns` 以及 API 归一化中增加 `theme` 字段：

```js
// 主题枚举
const THEMES = ['瑞兽', '花卉', '人物', '山水', '几何', '吉祥纹'] 

// 藏品数据结构扩展
{
  id: '0001',
  title: '凤凰涅槃',
  theme: '瑞兽',      // 新增
  patternCode: 'PHX-2024-001',
  // ... 其余字段不变
}
```

### API 数据归一化扩展

在 `normalizePattern` 中增加 `theme` 字段提取逻辑：
- 优先从 API 响应的 `mainCategory` 字段映射
- 若无匹配，随机分配一个主题（或标记为"未分类"）
- fallback 数据手工标注

### 筛选状态管理

```js
const selectedThemes = ref([])        // 当前选中的主题列表
const themeOptions = ref(THEMES)      // 所有可选主题
const filteredPatterns = computed(() => /* 根据 selectedThemes 过滤 */)
```

### 筛选交互流程

1. 点击 FilterBar 中的下拉触发器 → 展开多选面板
2. 勾选/取消主题 → `selectedThemes` 更新
3. 已选主题以 tag 形式显示在筛选栏右侧，每个 tag 带 × 按钮
4. 全选/取消全选按钮
5. 筛选后：页面滚动到第一个匹配卡片位置（`scrollIntoView({ behavior: 'smooth' })`）

---

## 5. 渐变过渡机制（核心）

### CSS 自定义属性驱动

不依赖 JS 滚动事件，使用卡片在列表中的位置索引驱动过渡：

```css
.collectible-card {
  /* 由模板通过 style="--index: i" 注入 */
  /* 使用比例而非固定数值，兼容筛选后卡片数量变化 */
  --gallery-ratio: 0.4;         /* 前 40% 为画廊区 */
  --transition-ratio: 0.3;      /* 中间 30% 为过渡带 */
  --total-cards: 12;            /* 由模板注入：筛选后的总卡片数 */
  --progress: clamp(0, 
    ((var(--index) + 1) / var(--total-cards) - var(--gallery-ratio)) / var(--transition-ratio),
    1);

  /* 画廊风格 → 典藏风格插值 */
  --gallery-bg: #FBF9F6;
  --archive-bg: #F0E8D8;
  background: color-mix(in oklab, 
    var(--gallery-bg), 
    var(--archive-bg) calc(var(--progress) * 100%));

  --gallery-border: #E3D6C2;
  --archive-border: #C4A87A;
  border-color: color-mix(in oklab,
    var(--gallery-border),
    var(--archive-border) calc(var(--progress) * 100%));

  box-shadow: 0 2px 8px rgba(154,132,98, calc(0.08 + var(--progress) * 0.12));
}
```

### 响应式区域比例

| 断点 | 画廊区占比 | 过渡带占比 | 典藏区占比 |
|------|-----------|-----------|-----------|
| 默认 (1列) | 40% | 30% | 30% |
| md (2列) | 45% | 25% | 30% |
| xl (3列) | 50% | 20% | 30% |

区域比例通过 CSS 变量 `--gallery-ratio` 和 `--transition-ratio` 在不同媒体查询中覆盖。

**筛选激活时**：`--total-cards` 缩小，过渡起点等比前移，确保在任何筛选结果数量下都能体验完整的画廊→典藏叙事。

### 卡片样式对比

| 属性 | 画廊区（Gallery） | 典藏区（Archive） |
|------|-------------------|-------------------|
| 背景色 | `#FBF9F6` 米白 | `#F0E8D8` 暖棕 |
| 边框 | 1px `#E3D6C2` | 1.5px `#C4A87A` |
| 圆角 | `rounded-2xl` (1rem) | `rounded-2xl` (不变) |
| 阴影 | 柔和 `0 2px 8px` | 厚重 `0 8px 24px` |
| 文字色 | `#6F614D` | `#5C4A32`（加深）|
| 装饰 | 无 | 底部"藏品编号"铭牌 |
| CollectibleDisplay 投影 | `shadow-[0_24px_45px_rgba(154,132,98,0.22)]` | 加深至 0.35 |

---

## 6. 具体实现方案

### 6.1 模板结构调整

保持单 `v-for` 渲染，由 CSS 根据 `--index` / `--total-cards` 自动完成风格过渡，无需拆分为两个 section：

```html
<template v-if="!loading && filteredPatterns.length">
  <section class="max-w-[1280px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
    <article
      v-for="(item, index) in filteredPatterns"
      :key="item.id"
      :style="{ '--index': index, '--total-cards': filteredPatterns.length }"
      class="collectible-card"
    >
      <!-- 卡内容，保持不变 -->
      <!-- 典藏区额外铭牌通过 v-if="--progress > 1" 条件渲染 -->
    </article>
  </section>
</template>
```

### 6.2 主题锚点

无需硬编码锚点位置。筛选后使用 `scrollIntoView` 定位到第一个匹配卡片。可选：在每个主题组的首张卡片前插入一个不可见的锚点 `<span :id="'theme-' + item.theme" />`。

### 6.3 主题分组视觉提示

当**未激活筛选**时（`selectedThemes.length === 0`），在主题组之间插入分隔标题（如"—— 瑞兽 ——"），增强"按主题浏览"的感知。

实现方式：构造 `groupedPatterns` computed 属性，将 `filteredPatterns` 按 theme 分组，每组首项前渲染分组标题。

当**筛选激活**时，隐藏所有分组标题，仅显示匹配卡片。

### 6.4 筛选后行为

- 筛选激活时（`selectedThemes.length > 0`）：只展示匹配卡片，不显示分组标题
- 筛选未激活时：展示所有卡片，显示分组标题
- 筛选状态通过 computed 自动派生

---

## 7. 不涉及改动的部分

- **CollectibleDisplay.vue** — 保持现有展台组件不变
- **StoryModal.vue** — 保持现有弹窗不变
- **数据获取逻辑** — `loadPatternDetails` 流程不变
- **动画机制** — `animateSections` + `slideUp` 入场动画不变，仅适配新数据流
- **路由** — `/collectibles` 路径和导航不变
- **NavBar** — "经典展厅"入口不变
- **无障碍** — `prefers-reduced-motion` 支持保持不变

---

## 8. 数据流示意图

```
getPatterns() + getPatternDetail(id)
        │
        ▼
normalizePattern(data) → { id, title, patternCode, image, desc, story, theme }
        │
        ▼
patterns.value (含 theme 字段)
        │
        ▼
computed filteredPatterns (根据 selectedThemes 过滤，未分类始终显示)
        │
        ▼
v-for + :style="{'--index': i, '--total-cards': n}" → CSS 比例过渡
```

---

## 9. 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/views/CollectiblesView.vue` | 改造 | 新增 FilterBar、分组/筛选逻辑、--index 驱动样式过渡 |
| `src/components/FilterBar.vue` | **新增** | 下拉组合筛选组件 |
| `src/components/SectionHero.vue` | 更新 props | 文案改为"主题馆藏 / 沉浸展厅" |
| `src/data/siteContent.js` | 扩展 | fallbackPatterns 增加 theme 字段 |
| `docs/superpowers/specs/2026-04-26-classic-gallery-redesign.md` | **新增** | 本文档 |

---

## 10. 排除范围（YAGNI）

以下明确不属于本次改版范围：
- 不新增后端 API 接口
- 不修改鉴权/登录逻辑
- 不引入新的 npm 依赖
- 不影响其他页面（Events、AppDownload、Contact、PatternLibrary）
- 不修改 E2E 测试或 Playwright 配置
- 不涉及 NavBar 导航结构调整

---

## 11. 错误边界

- 筛选结果为空时显示 `"暂无匹配作品"` 提示
- API 失败回退到 `fallbackPatterns`（已有逻辑），并补充 theme 字段
- `theme` 字段缺失的卡片归入 `"未分类"`，筛选状态下始终显示（不受筛选条件影响）
