[根目录](../../CLAUDE.md) > [src](../) > **components**

# components — 可复用 UI 组件库

---

## 模块职责

提供跨页面复用的导航、弹窗、展台、轮播与装置动画组件；承接交互事件并向页面层抛出业务语义事件。

---

## 入口与启动

- 主要由 `HomeView`、`CollectiblesView`、`App.vue` 注入使用。
- 关键挂载点：
  - `NavBar` 常驻全局；
  - `LoginModal`、`StoryModal` 通过 `Teleport to="body"` 挂载；
  - `Carousel` 作为首页 Hero 区入口；
  - `LaptopAnimation/PhoneAnimation` 作为视觉增强组件。

---

## 对外接口

| 组件 | Props | Emits | 备注 |
|------|-------|-------|------|
| `NavBar.vue` | 无 | 无 | 读取认证状态，决定入口展示与登出行为 |
| `Carousel.vue` | 无 | 无 | 内部触发 `router.push` |
| `LoginModal.vue` | 无 | `close`、`login-success` | 调用 `loginWithPassword` |
| `CollectibleDisplay.vue` | `image/title/patternCode` | `open-story` | 展台与按钮均可触发 |
| `StoryModal.vue` | `artifact` | `close` | 展示故事与元数据 |
| `LaptopAnimation.vue` | 无 | 无 | IntersectionObserver 控制开盖动画 |
| `PhoneAnimation.vue` | 无 | 无 | 纯视觉展示 |

---

## 关键依赖与配置

- `lucide-vue-next`：交互图标
- `animejs`：弹窗/导航动画
- `src/services/authService.js`：登录态
- `src/composables/useAnimate.js`：导航错峰入场

---

## 数据模型

- `StoryModal` 的 `artifact` 关键字段：`title/certificate/story[]`
- `CollectibleDisplay` 关键字段：`image/title/patternCode`

---

## 测试与质量

当前未发现组件测试。

建议：
- `LoginModal`：空表单校验、成功事件派发、失败文案；
- `NavBar`：token 有无时菜单项变化；
- `StoryModal`：遮罩点击关闭与内容渲染。

---

## 常见问题 (FAQ)

### 1) 登录弹窗为什么不在页面 DOM 层级里？
使用 Teleport 避免被父容器 `overflow/transform` 影响层级。

### 2) 为什么路由切换时没有 CSS transition？
项目使用 `animejs` + `<Transition :css="false">` 走 JS 动画钩子。

---

## 相关文件清单

- `src/components/NavBar.vue`
- `src/components/Carousel.vue`
- `src/components/LoginModal.vue`
- `src/components/CollectibleDisplay.vue`
- `src/components/StoryModal.vue`
- `src/components/LaptopAnimation.vue`
- `src/components/PhoneAnimation.vue`

---

## 变更记录 (Changelog)

| 时间 | 操作 | 说明 |
|------|------|------|
| 2026-04-24T11:14:37 | 增量更新 | 补充 Props/Emits 实际签名、Teleport 与动画实现细节 |
| 2026-04-13T07:07:57+0000 | 初始化创建 | 首次生成 |
