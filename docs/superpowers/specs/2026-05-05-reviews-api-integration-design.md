# 应用页面用户评价对接后端 API

> 2026-05-05 | 状态：设计完成

---

## 背景

`AppDownloadView.vue` 的"用户评价"区域当前使用硬编码占位数据（3 条虚构评价）。后端已提供评价列表 API（`GET /api/reviews`），需要对接真实数据。

---

## 目标

- 将应用页面的 3 条用户评价从硬编码改为从后端 API 动态获取
- 遵循项目现有 API 模块架构（`src/api/` 统一收敛）
- 保留 Hero 区的 4.9 评分和 10,000+ 下载量硬编码不变
- 评价卡片 UI 布局和样式不变

---

## API 规格

```
GET /api/reviews?page=0&size=3
无需认证
```

**响应格式（Spring Boot Page）：**

```json
{
  "content": [
    {
      "id": 1,
      "user": { "id": 1, "username": "zhangsan", "role": "USER" },
      "rating": 5,
      "comment": "非常好用的App！",
      "createdAt": "2026-05-05T10:30:00",
      "updatedAt": "2026-05-05T10:30:00"
    }
  ],
  "totalElements": 128,
  "totalPages": 7,
  "size": 3,
  "number": 0,
  "first": true,
  "last": false,
  "numberOfElements": 3
}
```

---

## 方案：新建 `src/api/reviews.js`

### 新增文件：`src/api/reviews.js`

- 复用 `VITE_OPEN_EVENTS_API` 环境变量的 domain：从 events URL 中提取 origin（如 `https://bpsljpqucopd.sealosbja.site`），拼接 `/api/reviews` 作为 reviews API 地址
- 注意：events 路径是 `/api/open/events`，reviews 路径是 `/api/reviews`，不能简单替换末尾
- 导出 `getReviews(params)` 函数
- 默认参数：`{ page: 0, size: 3 }`
- 内部归一化字段映射：

| API 字段 | 组件字段 | 说明 |
|----------|----------|------|
| `id` | `id` | 直接透传 |
| `user.username` | `name` | 用户名（模板绑定 `review.name`） |
| `user.username` 首字 | `initials` | 头像显示用 |
| `rating` | `rating` | 评分 1-5 |
| `comment` | `comment` | 评价内容 |
| `createdAt` | `date` | 格式化为 `YYYY-MM-DD` |
| （生成） | `color` | 从预设渐变色 palette 轮流取 |

- 预设渐变色 palette（6 色轮换）：
  - `from-pink-500 to-rose-500`
  - `from-blue-500 to-cyan-500`
  - `from-purple-500 to-indigo-500`
  - `from-green-500 to-emerald-500`
  - `from-orange-500 to-amber-500`
  - `from-teal-500 to-emerald-500`

### 修改文件：`src/views/AppDownloadView.vue`

**script 部分变更：**

1. 新增 import：`import { getReviews } from '@/api/reviews'`、`import { ref, onMounted } from 'vue'`
2. 删除硬编码的 `reviews` 数组
3. 新增响应式状态：
   - `reviews = ref([])`
   - `loadingReviews = ref(false)`
4. 新增 fallback 默认数据（3 条，API 失败时降级使用）
5. `onMounted` 中调用 `getReviews({ page: 0, size: 3 })`，赋值给 `reviews`
6. 错误处理：catch 中 fallback 到默认数据，不阻塞页面渲染

**template 部分：无需修改。** `v-for="review in reviews"` 绑定不变，字段名已对齐。

---

## 不动的部分

- Hero 区 4.9 评分 / 10,000+ 下载量
- 评价卡片 UI 布局和样式
- 其他页面

---

## 文件清单

| 操作 | 文件 |
|------|------|
| 新增 | `src/api/reviews.js` |
| 修改 | `src/views/AppDownloadView.vue` |
