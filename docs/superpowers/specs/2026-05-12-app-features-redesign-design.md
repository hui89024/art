# 应用页面核心功能卡片重设计

> 日期：2026-05-12
> 范围：`src/views/AppDownloadView.vue` — `featureItems` 数组
> 状态：已批准

---

## 背景

当前应用页面（`/app`）展示四个核心功能卡片：纹样盛宴、时光映记、AR纹样识别、社区共创。产品方向调整，需将第2、3项替换为「AI智能剪纸」和「剪趣在线创作」。

截图轮播、Hero区、用户评价、CTA 等区域保持不变。用户评价由后端 API 提供，不修改 `DEFAULT_REVIEWS`。

---

## 变更内容

### featureItems 数组（第2、3项）

| 序号 | 字段 | 旧值 | 新值 |
|------|------|------|------|
| 2 | title | 时光映记 | **AI智能剪纸** |
| 2 | description | 卡片式发现体验，换一批探索更多精美纹样与故事 | **上传图片一键转剪纸风格，输入描述智能生成专属纹样** |
| 2 | icon | PhPalette | **PhBrain** |
| 2 | color | from-purple-500 to-indigo-500 | **from-purple-500 to-indigo-500**（不变） |
| 3 | title | AR 纹样识别 | **剪趣在线创作** |
| 3 | description | 实时相机扫描剪纸作品，AR 智能识别纹样信息 | **丰富模板随心选，指尖自由绘制你的剪纸作品** |
| 3 | icon | PhCamera | **PhScissors** |
| 3 | color | from-blue-500 to-cyan-500 | **from-blue-500 to-cyan-500**（不变） |

### 不变项

- 第1项（纹样盛宴）：原样保留
- 第4项（社区共创）：原样保留
- 截图轮播（`screenshots` 数组及 `PhoneAnimation`）
- Hero 区域
- 用户评价区域（`DEFAULT_REVIEWS` 不修改，评价由后端 API 驱动）
- CTA 区域

---

## 实施要点

1. 在 `src/views/AppDownloadView.vue` 的 `featureItems` 数组中替换第2、3项的 `icon`、`title`、`description` 字段。
2. 更新 script 顶部的图标导入：移除 `PhPalette`、`PhCamera`，新增 `PhBrain`、`PhScissors`（均来自 `@phosphor-icons/vue`）。
3. 确认 `PhBrain` 和 `PhScissors` 在 `@phosphor-icons/vue` 包中可用（项目已依赖此包）。
