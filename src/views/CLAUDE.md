[根目录](../../CLAUDE.md) > **src/views**

# views — 页面级路由组件

---

## 模块职责

存放与路由一一对应的顶层页面组件。每个文件即一个页面，负责布局编排和子组件的组合，业务逻辑委托给 `src/services/` 与 `src/data/`。

---

## 文件清单

| 文件 | 路由 | 说明 |
|------|------|------|
| `HomeView.vue` | `/` | 品牌营销首页（Hero、作品卡片、工艺介绍、数字实验室、展廊、宣言、周边、页脚） |
| `CollectiblesView.vue` | `/collectibles` | 数字藏品详情页（展台 + 作品档案信息 + 弹窗） |

---

## HomeView.vue — 区块结构

| 顺序 | 区块 ID/名称 | 组件/元素 | 说明 |
|------|--------------|-----------|------|
| 1 | Hero | `<Carousel />` | 全屏视差背景 + 品牌大字 |
| 2 | 核心作品 | 内联 3 列卡片 | 窗花017/018/019 三件藏品 |
| 3 | 核心工艺 | `#technology` 4 列卡片 | lucide 图标 + 工艺说明 |
| 4 | 数字实验室 | `<LaptopAnimation />` + `<PhoneAnimation />` | CSS 3D 设备动画 |
| 5 | 经典展厅 | 横向滚动画廊 | Unsplash 外链图片 |
| 6 | 宣言 | 全屏背景文字 | Manifesto |
| 7 | 文创周边 | 4 列卡片 | 视差鼠标跟踪动效（IntersectionObserver） |
| 8 | 页脚 | 内联 HTML | 导航链接 + 版权 |

**视差与动效逻辑（`<script setup>`）：**
- `IntersectionObserver` 监听 `.reveal` 和 `.js-accessory-card` 元素，入口时添加 `.active` 类触发 CSS 动画。
- 鼠标悬停周边区块时更新 CSS 变量 `--mx`/`--my` 实现 3D 倾斜视差。

---

## CollectiblesView.vue — 结构

| 列 | 组件 | 说明 |
|----|------|------|
| 左列 | `<CollectibleDisplay />` | 藏品 3D 悬浮展台，点击触发 `open-story` 事件 |
| 右列 | 内联信息面板 | 标题、标签、说明文字、特性图标列表、"作品详情"按钮 |
| 全局 | `<StoryModal />` | 通过 `<Teleport to="body">` 挂载到 body |

`showStory` ref 控制弹窗开关，通过 `@open-story` 与 `@click` 双向触发。

---

## 关键依赖

- `src/components/Carousel.vue`、`LaptopAnimation.vue`、`PhoneAnimation.vue`
- `src/components/CollectibleDisplay.vue`、`StoryModal.vue`
- `lucide-vue-next`：`ThermometerSnowflake`、`ShieldCheck`、`MapPin`、`Database`

---

## 测试与质量

当前无测试文件。建议：
- 组件渲染测试（@vue/test-utils）
- IntersectionObserver Mock 测试动画触发逻辑

---

## 变更记录 (Changelog)

| 时间 | 操作 |
|------|------|
| 2026-04-13T07:07:57+0000 | 初始化创建 |
