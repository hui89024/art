[根目录](../../CLAUDE.md) > **src/components**

# components — 可复用 UI 组件库

---

## 模块职责

存放项目所有可复用的 Vue 单文件组件（SFC）。均采用 `<script setup>` Composition API 风格。

---

## 组件一览

| 组件 | Props | Emits | 说明 |
|------|-------|-------|------|
| `NavBar.vue` | 无 | 无（内部用 `RouterLink`） | 固定顶部导航栏，滚动后加磨砂背景；包含登录/登出逻辑 |
| `Carousel.vue` | 无 | 无 | 全屏 Hero 区域，视差背景图 + 品牌大字 + 两个 CTA 按钮 |
| `LoginModal.vue` | 无（由父组件 `v-if` 控制） | `close`、`login-success` | 登录弹窗，含表单验证、loading 状态、错误提示 |
| `CollectibleDisplay.vue` | 无 | `open-story` | 藏品 3D 展台：悬浮动画、玻璃反光、亚克力台座 |
| `StoryModal.vue` | 无（由父组件 `v-if` 控制） | `close` | 作品档案弹窗（两栏：左侧 PDF 文档模拟 + 右侧元数据） |
| `LaptopAnimation.vue` | 无 | 无 | 纯 CSS 3D 笔记本开盖动画（循环） |
| `PhoneAnimation.vue` | 无 | 无 | 纯 CSS 手机外壳展示 |

---

## NavBar.vue

- 监听 `window.scroll`，`scrollY > 50` 时切换 `isScrolled` → 应用 `bg-evasion-black` 背景。
- 调用 `getStoredAuth()` 初始化登录状态；`handleLogout` 调用 `clearAuth()` 后刷新状态。
- 使用 `<Teleport to="body">` 挂载 `<LoginModal />`。
- 导航链接：首页（`/`）、工艺技法（`#technology` 锚点）、经典展厅（`/collectibles`）、文创周边（`#accessories` 锚点）。

## Carousel.vue

- `isVisible` ref 控制入场动画（100ms 延迟后设为 `true`）。
- `scrollY` ref 通过 `window.scroll` 事件更新，驱动背景图 `translateY` 视差效果（`scrollY * 0.4`）。
- "探索作品" 按钮调用 `router.push('/collectibles')`。

## LoginModal.vue

- 表单字段：`username`、`password`（均为 `ref`）。
- 提交时调用 `loginWithPassword()`（来自 `authService`），成功后 emit `login-success` 并 `close`。
- 错误通过 `errorMsg` ref 显示（红色提示框 + AlertCircle 图标）。
- loading 状态禁用提交按钮并显示 Loader2 旋转图标。

## CollectibleDisplay.vue

- 展示 `窗花017.png` 静态图片。
- 点击图片或台座按钮均 emit `open-story`。
- 纯展示组件，无外部数据依赖。
- 使用 `@keyframes float` CSS 动画（6s 无限循环）实现悬浮效果。

## StoryModal.vue

- 两栏布局：左侧模拟 PDF 收藏证书（"凤凰涅槃"）+ 右侧创作者/出品方元数据。
- 点击遮罩层或关闭按钮均 emit `close`。
- 自定义细滚动条样式（`.custom-scrollbar`）。

## LaptopAnimation.vue / PhoneAnimation.vue

- 纯 CSS 实现，无 JS 逻辑。
- 展示 `src/assets/image.png` 作为屏幕内容。
- 响应式：Laptop 在移动端缩小 `scale`；Phone 固定尺寸。

---

## 测试与质量

当前无测试文件。建议：
- `LoginModal`：测试表单提交、错误状态、loading 禁用逻辑
- `NavBar`：测试滚动后 class 切换、登录/登出状态渲染

---

## 变更记录 (Changelog)

| 时间 | 操作 |
|------|------|
| 2026-04-13T07:07:57+0000 | 初始化创建 |
