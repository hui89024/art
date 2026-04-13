[根目录](../../CLAUDE.md) > **src/services**

# services — 业务服务层

---

## 模块职责

封装所有与外部 API 和本地持久化相关的业务逻辑，组件层不直接操作 localStorage 或调用 fetch。

---

## authService.js

### 常量

| 常量 | 值 | 说明 |
|------|----|------|
| `LOGIN_URL` | `https://bpsljpqucopd.sealosbja.site/api/auth/login` | 后端登录接口 |
| `TOKEN_KEY` | `paper-cut-jwt-token` | localStorage 键名 |
| `USERNAME_KEY` | `paper-cut-username` | localStorage 键名 |

### 导出函数

| 函数 | 签名 | 说明 |
|------|------|------|
| `saveAuth` | `(token, username) => void` | 写入 token 和用户名到 localStorage |
| `clearAuth` | `() => void` | 清除 token 和用户名（登出） |
| `getStoredAuth` | `() => { token, username }` | 读取当前存储的认证信息 |
| `loginWithPassword` | `({ username, password }) => Promise<Result>` | POST 登录，成功后自动调用 `saveAuth` |
| `getAuthorizationHeader` | `() => string` | 返回 `"Bearer <token>"` 或空字符串 |

### loginWithPassword 返回值结构

```js
// 成功
{ ok: true, token: string, username: string, message: string }

// 失败（HTTP 错误 / 无 token / 网络异常）
{ ok: false, message: string }
```

### 错误处理策略

- HTTP 响应非 OK 或 body 中无 `token` 字段 → 返回 `{ ok: false, message: data.message || '用户名或密码错误' }`
- fetch 抛出异常（网络不通）→ 返回 `{ ok: false, message: '登录服务暂不可用...' }`

---

## 测试与质量

当前无测试文件。建议：
- 使用 Vitest + `vi.spyOn(window, 'fetch')` Mock 接口
- 分别覆盖：成功登录、HTTP 错误、网络异常、空字段校验四个分支

---

## 变更记录 (Changelog)

| 时间 | 操作 |
|------|------|
| 2026-04-13T07:07:57+0000 | 初始化创建 |
