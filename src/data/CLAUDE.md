[根目录](../../CLAUDE.md) > [src](../) > **data**

# data — 静态内容数据层

---

## 模块职责

集中管理静态文案、导航项、轮播项与藏品默认信息，为页面提供可替换数据源。

---

## 入口与启动

- 当前主要作为内容源存在，部分页面仍有内联文案。
- 可作为后续“内容配置化”改造起点。

---

## 对外接口

`siteContent.js` 导出：
- `navItems`
- `heroSlides`
- `featureCards`
- `registerInfo`
- `collectibleItem`

---

## 关键依赖与配置

- 引用资源：`窗花017/018/019.png`
- 暂无外部 API 依赖

---

## 数据模型

- `heroSlides[]`：`id/title/subtitle/description/image`
- `collectibleItem`：`title/image/edition/status/series/summary/highlights/storyTitle/storyPlaceholder/creator/publisher/note`

---

## 测试与质量

无测试。

建议：
- 增加内容 schema 校验（如 Zod 或轻量手写校验）；
- 校验图片路径存在性，避免运行期 404。

---

## 常见问题 (FAQ)

### 1) 为什么改了 data 但页面不全生效？
部分视图（尤其 HomeView）仍包含大量硬编码文案，需做内容解耦重构。

---

## 相关文件清单

- `src/data/siteContent.js`

---

## 变更记录 (Changelog)

| 时间 | 操作 | 说明 |
|------|------|------|
| 2026-04-24T11:14:37 | 增量更新 | 补充“配置化改造”现状与落地建议 |
| 2026-04-13T07:07:57+0000 | 初始化创建 | 首次生成 |
