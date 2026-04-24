[根目录](../../CLAUDE.md) > [src](../) > **services**

# services — 业务服务层

---

## 模块职责

封装会话认证与本地持久化，避免组件层直接操作 localStorage。

---

## 入口与启动

- 被 `NavBar.vue`（读取/清理登录态）与 `LoginModal.vue`（登录提交）调用。
- 被路由守卫 `src/router/index.js` 用于权限判断。

---

## 对外接口

| 函数 | 签名 | 说明 |
|------|------|------|
| `saveAuth` | `(token, username) => void` | 写入 token/username |
| `clearAuth` | `() => void` | 清除会话 |
| `getStoredAuth` | `() => { token, username }` | 读取会话 |
| `loginWithPassword` | `({ username, password }) => Promise<{ok,...}>` | 调用登录 API 并落盘 |
| `getAuthorizationHeader` | `() => string` | 返回 `Bearer <token>` |

---

## 关键依赖与配置

- 登录接口：`https://bpsljpqucopd.sealosbja.site/api/auth/login`
- localStorage 键：
  - `paper-cut-jwt-token`
  - `paper-cut-username`

---

## 数据模型

`loginWithPassword` 统一返回：
- 成功：`{ ok: true, token, username, message }`
- 失败：`{ ok: false, message }`

---

## 测试与质量

当前无测试。

建议覆盖：
1. HTTP 非 2xx + message 回传；
2. 2xx 但无 token 的异常响应；
3. 网络异常分支；
4. localStorage 读写一致性。

---

## 常见问题 (FAQ)

### 1) 路由守卫为何只检查 token？
当前权限模型为最简登录门槛，不区分角色与过期时间。

### 2) 如何在 API 层使用 token？
调用 `getAuthorizationHeader()` 并注入 `Authorization` 请求头。

---

## 相关文件清单

- `src/services/authService.js`

---

## 变更记录 (Changelog)

| 时间 | 操作 | 说明 |
|------|------|------|
| 2026-04-24T11:14:37 | 增量更新 | 补充路由守卫与组件消费关系，统一返回模型说明 |
| 2026-04-13T07:07:57+0000 | 初始化创建 | 首次生成 |
