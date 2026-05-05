# 应用页面用户评价对接后端 API — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 AppDownloadView 的用户评价从硬编码改为从 `GET /api/reviews` 动态获取。

**Architecture:** 新建 `src/api/reviews.js` API 模块（复用 events.js 的 fetch 模式），修改 `AppDownloadView.vue` 在 onMounted 中调用并 fallback 到默认数据。

**Tech Stack:** Vue 3 Composition API, 原生 fetch, Vite 环境变量

---

## File Map

| 操作 | 文件 | 职责 |
|------|------|------|
| 新建 | `src/api/reviews.js` | 评价 API 请求 + 数据归一化 |
| 修改 | `src/views/AppDownloadView.vue` | 对接 API，替换硬编码数据 |

---

### Task 1: 新建 `src/api/reviews.js`

**Files:**
- Create: `src/api/reviews.js`

- [ ] **Step 1: 创建 reviews.js API 模块**

从 `VITE_OPEN_EVENTS_API` 提取 origin，拼接 `/api/reviews`。遵循 `events.js` 的 fetch 模式。

```js
// src/api/reviews.js

const OPEN_EVENTS_API = (import.meta.env.VITE_OPEN_EVENTS_API || 'https://bpsljpqucopd.sealosbja.site/api/open/events').trim()

// 从 events URL 提取 origin，拼接 /api/reviews
const REVIEWS_API = (() => {
  try {
    const url = new URL(OPEN_EVENTS_API)
    return `${url.origin}/api/reviews`
  } catch {
    return 'https://bpsljpqucopd.sealosbja.site/api/reviews'
  }
})()

const COLOR_PALETTE = [
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-indigo-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-amber-500',
  'from-teal-500 to-emerald-500',
]

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const normalizeReviews = (payload) => {
  const source = Array.isArray(payload?.content)
    ? payload.content
    : Array.isArray(payload)
      ? payload
      : []

  return source.map((item, index) => {
    const username = item?.user?.username || item?.username || '匿名用户'
    return {
      id: item?.id ?? `review-${index}`,
      name: username,
      initials: username.charAt(0),
      rating: Number.isFinite(item?.rating) ? item.rating : 5,
      comment: item?.comment || '',
      date: formatDate(item?.createdAt),
      color: COLOR_PALETTE[index % COLOR_PALETTE.length],
    }
  })
}

export const getReviews = async (params = {}) => {
  const query = new URLSearchParams()

  const merged = { page: 0, size: 3, ...params }
  Object.entries(merged).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    const text = `${value}`.trim()
    if (!text) return
    query.set(key, text)
  })

  const url = query.toString() ? `${REVIEWS_API}?${query.toString()}` : REVIEWS_API

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    const error = new Error('获取评价列表失败')
    error.status = response.status
    throw error
  }

  const payload = await response.json()
  return normalizeReviews(payload)
}
```

- [ ] **Step 2: 验证文件语法**

Run: `node -c src/api/reviews.js`
Expected: 无输出（语法正确）

- [ ] **Step 3: Commit**

```bash
git add src/api/reviews.js
git commit -m "feat: 新建 reviews API 模块"
```

---

### Task 2: 修改 `AppDownloadView.vue` 对接 API

**Files:**
- Modify: `src/views/AppDownloadView.vue`

- [ ] **Step 1: 替换 script 部分的 import 和 reviews 数据**

将 `import { ref } from 'vue'` 改为 `import { ref, onMounted } from 'vue'`，新增 `import { getReviews } from '@/api/reviews'`。

删除硬编码的 `const reviews = [...]`（第 42-71 行），替换为：

```js
// User reviews — 从 API 获取，fallback 到默认数据
const DEFAULT_REVIEWS = [
  {
    id: 'default-1',
    name: '剪纸爱好者',
    initials: '剪',
    rating: 5,
    comment: '纹样盛宴功能太赞了！海量窗花纹样随心浏览，搜索也很方便，每次都能发现新惊喜。',
    date: '2026-04-15',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'default-2',
    name: '非遗传承人',
    initials: '非',
    rating: 5,
    comment: '时光映记的卡片式浏览体验很棒，换一批功能让我停不下来，AR 识别更是黑科技！',
    date: '2026-04-10',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'default-3',
    name: '艺术学院学生',
    initials: '艺',
    rating: 4,
    comment: '界面设计很有文化气息，AR 扫描识别剪纸纹样太酷了，期待更多功能更新。',
    date: '2026-04-05',
    color: 'from-purple-500 to-indigo-500'
  }
]

const reviews = ref(DEFAULT_REVIEWS)
const loadingReviews = ref(false)

onMounted(async () => {
  loadingReviews.value = true
  try {
    const data = await getReviews({ page: 0, size: 3 })
    if (data.length > 0) {
      reviews.value = data
    }
  } catch (err) {
    console.error('评价加载失败，使用默认数据:', err)
  } finally {
    loadingReviews.value = false
  }
})
```

- [ ] **Step 2: 验证构建通过**

Run: `npx vite build 2>&1 | tail -5`
Expected: `built in Xs` 无报错

- [ ] **Step 3: Commit**

```bash
git add src/views/AppDownloadView.vue
git commit -m "feat: 应用页面用户评价对接后端 API"
```

---

## Verification

1. `npx vite build` 构建无报错
2. 页面正常加载，评价区域展示 API 返回的真实数据
3. API 失败时 fallback 到默认数据，页面不白不报错
