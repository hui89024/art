[根目录](../../CLAUDE.md) > [src](../) > **api**

# api — 外部接口访问层

---

## 模块职责

统一封装公开接口请求、查询参数拼装与响应归一化，向视图层提供稳定数据结构。

---

## 入口与启动

- 由页面在 `onMounted` 或用户交互时调用。
- 当前调用关系：
  - `CollectiblesView.vue` → `getPatterns/getPatternDetail`
  - `PatternLibraryView.vue` → `searchOpenPatterns/getOpenPatternDetailByCode/getOpenPatternTableUrl`
  - `EventsView.vue` → `getEvents`
  - `ContactView.vue` → `sendContactMessage`

---

## 对外接口

### patterns.js

- `getPatterns()`：获取公开藏品列表
- `getPatternDetail(id)`：获取指定藏品详情（含空参校验）
- `searchOpenPatterns(params)`：按条件查询纹样图片列表
- `getOpenPatternDetailByCode(code)`：按编码查纹样详情
- `getOpenPatternTableUrl(code)`：生成纹样网页详情链接

### events.js

- `getEvents(params)`：获取活动列表（支持 query 参数）
- 内部归一化：`normalizeEvents` + `normalizeDate`

### contact.js

- `sendContactMessage({ name, email, phone, message })`：通过飞书 Webhook 发送联系表单消息
- 内部构建飞书卡片消息格式，包含姓名、邮箱、电话、留言字段
- 支持 `VITE_CONTACT_WEBHOOK_URL` 环境变量覆盖 Webhook 地址

---

## 关键依赖与配置

- 使用原生 `fetch`
- 默认接口：
  - `https://bpsljpqucopd.sealosbja.site/api/open/collectibles`
  - `https://bpsljpqucopd.sealosbja.site/api/open/patterns`
  - `https://bpsljpqucopd.sealosbja.site/api/open/events`
- `events.js` 支持 `VITE_OPEN_EVENTS_API` 环境变量覆盖。
- `contact.js` 通过飞书 Webhook 推送消息，支持 `VITE_CONTACT_WEBHOOK_URL` 环境变量覆盖。

---

## 数据模型

- 纹样列表项（页面消费）：`id/patternCode/imageUrl/description/mainCategory/style/region/period`
- 活动项（页面消费）：`id/title/desc/image/url/publishTime`
- 错误模型：抛出 `Error` 并附带 `error.status`

---

## 测试与质量

当前无 API 层测试。

建议：
- Mock fetch 验证 2xx/4xx/5xx 分支；
- 校验 `normalizeDate` 对秒级时间戳、毫秒时间戳、字符串日期的兼容；
- 校验空参异常（`id/code` 为空时）。

---

## 常见问题 (FAQ)

### 1) 为什么页面不直接 `fetch`？
为统一错误处理、参数校验与字段归一化，降低页面复杂度。

### 2) 后端字段名变化怎么办？
优先修改本模块的 normalize 逻辑，保持页面层数据契约稳定。

---

## 相关文件清单

- `src/api/patterns.js`
- `src/api/events.js`
- `src/api/contact.js`

---

## 变更记录 (Changelog)

| 时间 | 操作 | 说明 |
|------|------|------|
| 2026-04-24T11:14:37 | 初始化创建 | 新增 API 模块文档，补充请求入口、归一化与错误模型 |
