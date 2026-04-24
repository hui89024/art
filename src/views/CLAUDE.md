[根目录](../../CLAUDE.md) > [src](../) > **views**

# views — 页面级路由视图

---

## 模块职责

承载所有路由页面，负责页面结构编排、状态调度与组件组合；API 调用主要通过 `src/api`，动画能力通过 `src/composables`。

---

## 入口与启动

- 页面由 `src/router/index.js` 注册并挂载。
- 顶层容器由 `src/App.vue` 的 `<RouterView>` 渲染，并带有路由切换淡入淡出动画。
- `onMounted` 高频入口：
  - `HomeView.vue`：注册 `IntersectionObserver` + reveal 动画。
  - `CollectiblesView.vue`：拉取作品详情，回退到本地备选数据。
  - `EventsView.vue`：拉取活动列表并初始化轮播索引。
  - `PatternLibraryView.vue`：初始化检索并加载分页数据。

---

## 对外接口

- 与 API 层交互：
  - `getPatterns/getPatternDetail`（藏品页）
  - `getEvents`（活动页）
  - `searchOpenPatterns/getOpenPatternDetailByCode`（纹样库）
- 与路由交互：
  - `useRouter().push(...)` 用于按钮跳转。
  - `PatternLibraryView` 受路由守卫保护（需 token）。

---

## 关键依赖与配置

- 图标：`lucide-vue-next`
- 动画：`animejs` + `useAnimate` + `useScrollReveal` + `anime.config.js`
- 样式：Tailwind utility + 少量 scoped style（活动页轮播样式较重）

---

## 数据模型

- 活动卡片（归一化后）
  - `id/title/desc/image/url/publishTime`
- 纹样列表项（归一化后）
  - `id/patternCode/imageUrl/description/mainCategory/style/region/period`
- 藏品详情（归一化后）
  - `id/title/patternCode/image/desc/story[]`

---

## 测试与质量

当前未发现测试文件。

建议优先测试：
1. `PatternLibraryView`：筛选参数、分页边界、详情弹窗；
2. `CollectiblesView`：线上接口失败后的 fallback 合并；
3. `EventsView`：轮播索引归一化与键盘可访问交互。

---

## 常见问题 (FAQ)

### 1) 为什么登录后才看到“在线纹样库”？
`NavBar.vue` 根据 `getStoredAuth().token` 决定是否展示入口，且路由也有 `requiresAuth` 守卫。

### 2) 活动或纹样接口挂掉时会怎样？
页面会显示错误态文案；藏品页会优先尝试远端，失败时回退本地备选数据。

### 3) 页面动画太慢怎么统一调整？
优先修改 `src/composables/anime.config.js` 的 `DURATION` 常量。

---

## 相关文件清单

- `src/views/HomeView.vue`
- `src/views/CollectiblesView.vue`
- `src/views/EventsView.vue`
- `src/views/PatternLibraryView.vue`
- `src/views/AppDownloadView.vue`
- `src/views/ContactView.vue`

---

## 变更记录 (Changelog)

| 时间 | 操作 | 说明 |
|------|------|------|
| 2026-04-24T11:14:37 | 增量更新 | 补充新增页面（活动/应用/联系/纹样库）与 API/动画依赖关系 |
| 2026-04-13T07:07:57+0000 | 初始化创建 | 首次生成 |
