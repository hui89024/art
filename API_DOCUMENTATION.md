# 剪艺数字艺术平台 — API 接口文档

> 版本：v1.0 | 更新日期：2026-05-05

---

## 基础配置

| 配置项 | 值 |
|--------|-----|
| 基础 URL | `https://bpsljpqucopd.sealosbja.site/api/open` |
| 请求方式 | 原生 `fetch` |
| 数据格式 | JSON |
| 认证方式 | 无需认证（公开接口） |

---

## 目录

- [纹样/藏品接口](#纹样藏品接口)
- [活动接口](#活动接口)
- [联系表单接口](#联系表单接口)
- [错误处理](#错误处理)
- [数据模型](#数据模型)
- [使用示例](#使用示例)

---

## 纹样/藏品接口

**模块文件**：`src/api/patterns.js`

**默认接口地址**：`https://bpsljpqucopd.sealosbja.site/api/open/collectibles`

### 1. 获取公开藏品列表

```javascript
getPatterns()
```

- **用途**：获取所有公开的剪纸藏品列表
- **参数**：无
- **返回值**：藏品数组

**返回字段说明**：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number/string | 藏品唯一标识 |
| patternCode | string | 纹样编码 |
| imageUrl | string | 藏品图片地址 |
| description | string | 藏品描述 |
| mainCategory | string | 主分类 |
| style | string | 风格 |
| region | string | 地区 |
| period | string | 时期 |

---

### 2. 获取指定藏品详情

```javascript
getPatternDetail(id)
```

- **用途**：根据 ID 获取单个藏品的详细信息
- **参数**：
  - `id`（必填）— 藏品 ID
- **返回值**：单个藏品对象
- **异常**：参数为空时抛出错误

---

### 3. 搜索纹样图片列表

```javascript
searchOpenPatterns(params)
```

- **用途**：按条件查询纹样图片列表
- **参数**：
  - `params`（可选）— 查询参数对象
- **返回值**：纹样图片数组

---

### 4. 按编码查纹样详情

```javascript
getOpenPatternDetailByCode(code)
```

- **用途**：根据纹样编码获取详情
- **参数**：
  - `code`（必填）— 纹样编码
- **返回值**：纹样详情对象
- **异常**：参数为空时抛出错误

---

### 5. 生成纹样网页详情链接

```javascript
getOpenPatternTableUrl(code)
```

- **用途**：生成纹样的网页详情页 URL
- **参数**：
  - `code`（必填）— 纹样编码
- **返回值**：URL 字符串

---

## 活动接口

**模块文件**：`src/api/events.js`

**默认接口地址**：`https://bpsljpqucopd.sealosbja.site/api/open/events`

**环境变量覆盖**：`VITE_OPEN_EVENTS_API`

### 获取活动列表

```javascript
getEvents(params)
```

- **用途**：获取平台活动列表
- **参数**：
  - `params`（可选）— 查询参数对象，支持自定义筛选条件
- **返回值**：活动数组（经过归一化处理）

**返回字段说明**：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number/string | 活动唯一标识 |
| title | string | 活动标题 |
| desc | string | 活动描述 |
| image | string | 活动封面图地址 |
| url | string | 活动详情页链接 |
| publishTime | Date | 发布时间（已归一化） |

**内部处理**：
- `normalizeEvents` — 活动数据归一化
- `normalizeDate` — 日期格式归一化（兼容秒级/毫秒级时间戳及字符串日期）

---

## 联系表单接口

**模块文件**：`src/api/contact.js`

**实现方式**：通过飞书 Webhook 推送消息

**环境变量覆盖**：`VITE_CONTACT_WEBHOOK_URL`

### 发送联系消息

```javascript
sendContactMessage({ name, email, phone, message })
```

- **用途**：通过飞书 Webhook 发送用户联系表单
- **参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 用户姓名 |
| email | string | 是 | 用户邮箱 |
| phone | string | 是 | 用户电话 |
| message | string | 是 | 留言内容 |

- **返回值**：无（异步操作）
- **内部实现**：构建飞书卡片消息格式后发送

---

## 错误处理

所有接口统一错误模型：

```javascript
try {
  const data = await getPatterns()
} catch (error) {
  console.error(error.status)  // HTTP 状态码
  console.error(error.message) // 错误信息
}
```

**错误对象属性**：

| 属性 | 类型 | 说明 |
|------|------|------|
| status | number | HTTP 状态码 |
| message | string | 错误描述信息 |

---

## 数据模型

### 藏品对象 (Collectible)

```json
{
  "id": 1,
  "patternCode": "JY-001",
  "imageUrl": "https://example.com/image.jpg",
  "description": "传统窗花剪纸",
  "mainCategory": "窗花",
  "style": "传统",
  "region": "陕西",
  "period": "清代"
}
```

### 活动对象 (Event)

```json
{
  "id": 1,
  "title": "剪纸艺术展",
  "desc": "展示中国传统剪纸艺术",
  "image": "https://example.com/event.jpg",
  "url": "/events/1",
  "publishTime": "2026-05-01T00:00:00Z"
}
```

---

## 使用示例

### 基础调用

```javascript
import { getPatterns, getPatternDetail, searchOpenPatterns } from '@/api/patterns'
import { getEvents } from '@/api/events'
import { sendContactMessage } from '@/api/contact'
```

### 获取藏品列表

```javascript
// 获取所有藏品
const patterns = await getPatterns()
console.log(patterns) // [{id, patternCode, imageUrl, ...}, ...]
```

### 获取单个藏品详情

```javascript
// 根据 ID 获取详情
const detail = await getPatternDetail(123)
console.log(detail) // {id, patternCode, description, ...}
```

### 搜索纹样

```javascript
// 按条件搜索
const results = await searchOpenPatterns({ category: '窗花', region: '陕西' })
```

### 获取活动列表

```javascript
// 获取所有活动
const events = await getEvents()
console.log(events) // [{id, title, desc, image, url, publishTime}, ...]
```

### 发送联系表单

```javascript
// 发送联系消息到飞书
await sendContactMessage({
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  message: '我想了解更多剪纸艺术'
})
```

### 错误处理

```javascript
try {
  const data = await getPatternDetail(null)
} catch (error) {
  if (error.status === 404) {
    console.log('藏品不存在')
  } else {
    console.log('请求失败：', error.message)
  }
}
```

---

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| VITE_OPEN_EVENTS_API | 活动接口地址覆盖 | `https://bpsljpqucopd.sealosbja.site/api/open/events` |
| VITE_CONTACT_WEBHOOK_URL | 飞书 Webhook 地址覆盖 | 内置默认地址 |

---

## 更新日志

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-05-05 | v1.0 | 初始版本，包含纹样、活动、联系三大模块接口文档 |

---

> 本文档由剪艺开发团队维护，如有问题请联系开发团队。
