[根目录](../../CLAUDE.md) > [src](../) > **assets**

# assets — 静态资源与全局样式

---

## 模块职责

提供全局 CSS、品牌图形与页面素材资源，支撑视觉风格与动效表现。

---

## 入口与启动

- `src/main.js` 全局引入 `src/assets/index.css`
- 各组件/页面按需引入图片（窗花素材、Logo、背景图等）

---

## 对外接口

- `index.css`：全局样式层（base + 动效类 + 分割线 + 滚动条样式）
- 图片素材：供组件通过 `import` 或静态路径引用

---

## 关键依赖与配置

- `@tailwind base/components/utilities`
- 使用 `theme('colors.xxx')` 读取 `tailwind.config.js` 自定义色板
- 资源引用方式并存：
  - 构建期 import（推荐）
  - 模板内静态字符串路径（需关注打包兼容性）

---

## 数据模型

不涉及业务数据模型；主要是视觉 token 与图片路径资产。

---

## 测试与质量

当前无样式或视觉回归测试。

建议：
- 为关键页面增加截图回归（Playwright）；
- 检查静态路径（如 `/src/assets/...`）在生产构建下的可访问性。

---

## 常见问题 (FAQ)

### 1) 为什么部分资源未做内容扫描？
二进制图片/动图按规则仅记录路径，不读取内容。

### 2) 样式主题从哪里统一改？
先改 `tailwind.config.js`，再在 `index.css` 与组件类名中同步引用。

---

## 相关文件清单

- `src/assets/index.css`
- `src/assets/窗花017.png`
- `src/assets/窗花018.png`
- `src/assets/窗花019.png`
- `src/assets/image.png`
- `src/assets/wtre.jpg`
- `src/assets/配色版矢量（标准）.svg`
- `src/assets/screenshot-1776943364783.png`
- `src/assets/屏幕录制 2026-04-23 191233.gif`

---

## 变更记录 (Changelog)

| 时间 | 操作 | 说明 |
|------|------|------|
| 2026-04-24T11:14:37 | 初始化创建 | 新增 assets 模块文档，记录全局样式入口与二进制资源路径 |
