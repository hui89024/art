# 应用页面核心功能卡片重设计 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将应用页面核心功能卡片中的「时光映记」和「AR纹样识别」替换为「AI智能剪纸」和「剪趣在线创作」

**Architecture:** 仅修改 `src/views/AppDownloadView.vue` 中的 `featureItems` 数组（第2、3项）及对应的图标 import 语句。不涉及组件拆分、路由变更或 API 调整。

**Tech Stack:** Vue 3 `<script setup>`, Phosphor Icons (`@phosphor-icons/vue`)

---

## 文件清单

| 操作 | 文件 | 说明 |
|------|------|------|
| Modify | `src/views/AppDownloadView.vue:1-8` | 更新图标 import：移除 PhPalette/PhCamera，新增 PhBrain/PhScissors |
| Modify | `src/views/AppDownloadView.vue:13-42` | 更新 featureItems 数组第2、3项 |

---

### Task 1: 更新图标 import 语句

**Files:**
- Modify: `src/views/AppDownloadView.vue:4`

- [ ] **Step 1: 替换 import 中的图标**

将第4行：
```js
import { PhStar, PhDeviceMobile, PhCamera, PhPalette, PhUsers, PhSparkle, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
```

替换为：
```js
import { PhStar, PhDeviceMobile, PhBrain, PhScissors, PhUsers, PhSparkle, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 构建成功，无报错

- [ ] **Step 3: Commit**

```bash
git add src/views/AppDownloadView.vue
git commit -m "feat: 更新应用页面核心功能图标导入"
```

---

### Task 2: 替换 featureItems 数组第2、3项

**Files:**
- Modify: `src/views/AppDownloadView.vue:13-42`

- [ ] **Step 1: 替换 featureItems 第2项（时光映记 → AI智能剪纸）**

将：
```js
  {
    id: 2,
    icon: PhPalette,
    title: '时光映记',
    description: '卡片式发现体验，换一批探索更多精美纹样与故事',
    color: 'from-purple-500 to-indigo-500'
  },
```

替换为：
```js
  {
    id: 2,
    icon: PhBrain,
    title: 'AI智能剪纸',
    description: '上传图片一键转剪纸风格，输入描述智能生成专属纹样',
    color: 'from-purple-500 to-indigo-500'
  },
```

- [ ] **Step 2: 替换 featureItems 第3项（AR纹样识别 → 剪趣在线创作）**

将：
```js
  {
    id: 3,
    icon: PhCamera,
    title: 'AR 纹样识别',
    description: '实时相机扫描剪纸作品，AR 智能识别纹样信息',
    color: 'from-blue-500 to-cyan-500'
  },
```

替换为：
```js
  {
    id: 3,
    icon: PhScissors,
    title: '剪趣在线创作',
    description: '丰富模板随心选，指尖自由绘制你的剪纸作品',
    color: 'from-blue-500 to-cyan-500'
  },
```

- [ ] **Step 3: 构建验证**

Run: `npm run build`
Expected: 构建成功，无报错

- [ ] **Step 4: Commit**

```bash
git add src/views/AppDownloadView.vue
git commit -m "feat: 应用页面核心功能卡片替换为AI智能剪纸和剪趣在线创作"
```
