[根目录](../../CLAUDE.md) > **src/data**

# data — 静态内容数据层

---

## 模块职责

集中管理页面展示所需的静态文本、图片引用和配置数据。修改内容时只需编辑此目录，无需改动组件。

---

## siteContent.js

### 导出常量

| 导出名 | 类型 | 说明 |
|--------|------|------|
| `navItems` | `Array<{key, label}>` | 导航菜单项（当前仅作数据定义，未被组件消费） |
| `heroSlides` | `Array<Slide>` | 轮播幻灯片数据（3 条：窗花017/018/019） |
| `featureCards` | `Array<{title, text}>` | 首页特色介绍卡片（3 条） |
| `registerInfo` | `{url, hint}` | 注册页跳转信息 |
| `collectibleItem` | `Object` | 数字藏品详情（标题、图片、版次、故事、创作者等） |

### heroSlides 数据结构

```js
{
  id: string,       // '017' | '018' | '019'
  title: string,    // 如 '窗花017 · 暮金流影'
  subtitle: string,
  description: string,
  image: string,    // 已 import 的图片资源路径
}
```

### collectibleItem 数据结构

```js
{
  title: string,           // '天命·玄鸟'
  image: importedImage,
  edition: string,         // '8000份'
  status: string,          // '鲸选'
  series: string,          // '剪艺数字藏品'
  summary: string,
  highlights: string[],    // ['限量发行', '舞台展陈', '东方瑞意', '暗金高光']
  storyTitle: string,
  storyPlaceholder: string,
  creator: string,         // '剪艺视觉实验室'
  publisher: string,       // '剪艺数字发行中心'
  note: string,
}
```

> 注意：`navItems` 和 `heroSlides`/`featureCards` 等数据已定义但部分字段未被当前视图直接消费（视图使用内联硬编码）。后续重构可将视图中硬编码内容迁移至此。

---

## 变更记录 (Changelog)

| 时间 | 操作 |
|------|------|
| 2026-04-13T07:07:57+0000 | 初始化创建 |
