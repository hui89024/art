# 纹样库页面视觉升级设计

> 日期: 2026-05-05
> 状态: 待审批
> 类型: 视觉体验升级（功能不变）

---

## 1. 目标

在保持现有功能（筛选、搜索、分页、详情）完全不变的前提下，深化羊皮纸/竹木视觉风格，提升三个区域的视觉品质：

1. Hero 区域 — 加窗花装饰与背景纹理
2. 筛选栏 + 卡片区 — 卡片悬停动效、标签样式优化
3. 详情弹窗 — 改为侧边滑入面板

**约束：**
- 不改动后端 API
- 不改动 `SectionHero` 组件本身
- 不改动分页逻辑与交互
- 不使用英文文案

---

## 2. 涉及文件

| 文件 | 改动范围 |
|------|----------|
| `src/views/PatternLibraryView.vue` | 模板结构 + 新增 scoped style |
| `src/assets/index.css` | 可选：新增滑入面板动画 keyframes |
| `tailwind.config.js` | 可能新增 1~2 个 pattern-* token |

---

## 3. 区域一：Hero

### 3.1 现状

使用 `SectionHero` 组件，仅传 `title` 和 `subtitle`，无装饰。

### 3.2 改造方案

**kicker：** 传入 `"纹样数据库"`，在标题上方显示小字标签。

**窗花装饰：**
- `窗花018.png` — 左上角定位，`position: absolute`，`opacity: 0.08`，`transform: rotate(-15deg)`，宽 200px
- `窗花019.png` — 右下角定位，`position: absolute`，`opacity: 0.1`，`transform: rotate(10deg)`，宽 180px
- 父容器设 `position: relative` + `overflow: hidden`

**背景纹理：** 使用 CSS `radial-gradient` 叠加暖色调渐变，模拟羊皮纸质感：
```css
background:
  radial-gradient(ellipse at 20% 50%, rgba(213,194,162,0.15) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 50%, rgba(182,168,143,0.1) 0%, transparent 50%),
  linear-gradient(180deg, #f9f3e8 0%, #f4ebdc 100%);
```

**分隔线：** Hero 下方加一条渐变分隔线，复用 `.section-divider` 样式思路，用纯 CSS 实现：
```css
border-bottom: 1px solid transparent;
background-image: linear-gradient(to right, transparent, #d5c2a2, transparent);
background-position: bottom;
background-size: 100% 1px;
background-repeat: no-repeat;
```

---

## 4. 区域二：筛选栏 + 卡片区

### 4.1 筛选栏

**容器：**
- 加内阴影 `shadow-inner`（微妙的凹陷感）
- 顶部加装饰线：1px 渐变色条，从 `bamboo-light` 到透明

**查询按钮：**
- 悬停时加微光 shimmer 效果（CSS `@keyframes`，背景色从左到右扫过）

### 4.2 卡片

**悬停动效：**
- `transition: transform 0.3s ease, box-shadow 0.3s ease`
- 悬停时 `transform: translateY(-4px)` + `box-shadow` 扩大
- 图片区亮度微增：`filter: brightness(1.05)`

**图片渐变遮罩：**
- 在图片底部叠加一层渐变：从 `transparent` 到 `pattern-card` 色
- 用 `::after` 伪元素实现，`height: 40%`，`position: absolute; bottom: 0`

**标签药丸样式：**
- 改为左边框彩色条样式，每个维度一个颜色：
  - 主分类：`border-left: 3px solid #96ad92`（竹绿）
  - 风格：`border-left: 3px solid #d5c2a2`（暖金）
  - 地区：`border-left: 3px solid #b8a88f`（羊皮纸深）
  - 时期：`border-left: 3px solid #8f7b5f`（棕褐）
- 背景改为半透明 `bg-white/40`，圆角改为 `rounded-md`

**编码标题：**
- 左侧加竖线装饰：`border-left: 2px solid bamboo-accent` + `pl-3`

---

## 5. 区域三：详情弹窗

### 5.1 布局变更

从居中弹窗改为右侧滑入面板：

- 遮罩层：保持 `fixed inset-0`，`bg-black/45`，`backdrop-blur-[2px]`
- 面板：`fixed right-0 top-0 h-full`，`width: max-w-lg`（512px），`max-h-screen`
- 面板背景：`pattern-modal` 色，左侧加 `border-l` 装饰

### 5.2 入场动画

**滑入：**
```css
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```
- `animation: slideInRight 0.35s ease-out`
- Vue transition配合：`enter-active` 设置动画，`leave-active` 反向

**遮罩淡入：**
- `transition: opacity 0.3s ease`
- 进入时 `opacity: 0 → 1`

### 5.3 内容区优化

**头部：**
- 标题加大为 `text-2xl font-bold`
- 底部加分隔线（渐变色条）
- 关闭按钮改为图标按钮（X 形状），右上角定位

**图片区：**
- `border-radius: 12px` + 微妙阴影
- 加点击放大功能：点击后 `transform: scale(1.5)` + 背景虚化，再次点击恢复
- 用 `ref` 追踪放大状态，CSS transition 实现平滑缩放

**故事区：**
- 标题前加装饰符号 `✦`
- 段落间加分隔线（细虚线）
- 首段前加引号装饰 `❝`，末段后加 `❞`

### 5.4 键盘支持

- 监听 `Esc` 键关闭面板
- 在 `showDetail` 变为 `true` 时添加 `keydown` 监听，`false` 时移除

---

## 6. 新增 Tailwind Token（如需要）

| Token | 值 | 用途 |
|-------|-----|------|
| `pattern-shimmer` | `rgba(255,255,255,0.3)` | 查询按钮 shimmer 动画高光色 |

---

## 7. 不改动项

- 筛选逻辑与 API 调用参数
- 分页交互（上一页/下一页）
- `SectionHero` 组件源码
- `src/api/patterns.js`
- 筛选器的选项内容与编码

---

## 8. 验收标准

1. Hero 区域显示窗花水印装饰和羊皮纸纹理背景
2. kicker 显示"纹样数据库"中文文案
3. 卡片悬停时有上浮 + 阴影 + 图片亮度变化动效
4. 标签药丸改为左边框彩色条样式
5. 详情面板从右侧滑入，支持 Esc 关闭
6. 详情图片支持点击放大
7. 构建通过，无报错
8. 所有文案为中文
