[根目录](../../CLAUDE.md) > [src](../) > **router**

# router — 路由与权限控制

---

## 模块职责

维护前端路由表、滚动行为与基础鉴权守卫。

---

## 入口与启动

- 入口文件：`src/router/index.js`
- 在 `src/main.js` 中 `app.use(router)` 挂载。

---

## 对外接口

- 默认导出 `router` 实例
- 路由守卫：`beforeEach`
  - 若 `to.meta.requiresAuth` 为真，则检查 `getStoredAuth().token`
  - 未登录时重定向到 `/`

---

## 关键依赖与配置

- `createWebHistory(import.meta.env.BASE_URL)`
- `scrollBehavior`：
  - 有 hash 时平滑滚动到锚点
  - 否则回到页面顶部

---

## 数据模型

路由元信息关键字段：
- `meta.requiresAuth?: boolean`

---

## 测试与质量

当前无路由测试。

建议：
- 覆盖未登录访问 `/pattern-library` 的重定向；
- 覆盖 hash 路由滚动行为；
- 覆盖守卫在 token 存在/缺失两类分支。

---

## 常见问题 (FAQ)

### 1) 为什么菜单里有些路由登录前不可见？
`NavBar` 基于 token 渲染菜单，路由本身也有守卫，双层控制。

### 2) 新增鉴权页面怎么做？
在路由项添加 `meta: { requiresAuth: true }`。

---

## 相关文件清单

- `src/router/index.js`

---

## 变更记录 (Changelog)

| 时间 | 操作 | 说明 |
|------|------|------|
| 2026-04-24T11:14:37 | 初始化创建 | 新增 router 模块文档，补充守卫与滚动策略 |
