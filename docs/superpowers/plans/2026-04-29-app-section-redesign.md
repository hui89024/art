# 首页剪艺应用区域重新设计 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 HomeViewChinese.vue 的"数字生态区"从红暖色杂乱风格重新设计为苹果官网式精致明亮的产品展示区域。

**Architecture:** 仅修改 `src/views/HomeViewChinese.vue` 一个文件中的数字生态区部分（约 lines 67-132）。移除视觉噪音（旋转窗花、纹样图标网格），设备容器改为苹果风格（纯白 + 极细边框 + 精致阴影），重新组织左右内容分配。

**Tech Stack:** Vue 3 Composition API, Tailwind CSS

---

## 文件结构

| 操作 | 文件 | 职责 |
|------|------|------|
| 修改 | `src/views/HomeViewChinese.vue:67-132` | 数字生态区的模板 |

此改动仅涉及一个文件的局部区域，无需创建新文件。

---

### Task 1: 替换数字生态区模板结构

**Files:**
- Modify: `src/views/HomeViewChinese.vue:67-132` — 数字生态区模板

- [ ] **Step 1: 定位当前数字生态区**

当前代码位于 lines 67-132，以 `<!-- 数字生态区 -->` 注释开始，到 `</section>` 结束。

当前内容包含：
- 两个旋转窗花背景装饰（lines 69-75）
- 左侧：ChineseSectionHeader（应用介绍）+ 电脑模型容器（红暖色渐变）
- 右侧：手机模型容器（红暖色渐变）+ 纹样库简介 + 纹样图标展示网格

- [ ] **Step 2: 替换整个数字生态区模板**

将 lines 67-132 替换为以下代码：

```html
    <!-- 数字生态区 -->
    <section class="relative py-20 md:py-28 lg:py-32 px-5 md:px-8 lg:px-12 bg-white overflow-hidden">
      <!-- 极简光晕装饰 -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-red-200/20 rounded-full blur-3xl" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" aria-hidden="true"></div>

      <div class="relative max-w-[1600px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

          <!-- 左侧：应用介绍 + 电脑模型 -->
          <div class="space-y-8 md:space-y-10">
            <ChineseSectionHeader
              kicker="剪艺应用"
              title="非遗艺术，在指尖交互中重生。"
              subtitle="剪艺应用不仅仅是一个展示平台，它将繁复的剪纸技艺转化为直观的数字化交互体验。"
            />

            <!-- 电脑模型 -->
            <div class="relative flex justify-center items-center p-6 md:p-8
                        bg-white rounded-2xl border border-gray-100
                        shadow-xl shadow-gray-200/60
                        hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <LaptopAnimation class="relative z-10" />
            </div>
          </div>

          <!-- 右侧：手机模型 + 纹样库介绍 -->
          <div class="space-y-8 md:space-y-10">
            <!-- 手机模型 -->
            <div class="relative flex justify-center items-center p-6 md:p-8
                        bg-white rounded-2xl border border-gray-100
                        shadow-xl shadow-gray-200/60
                        hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <PhoneAnimation class="relative z-10" />
            </div>

            <!-- 纹样库介绍 -->
            <ChineseSectionHeader
              kicker="剪艺纹样库"
              title="数字化传承的基因库。"
              subtitle="我们深度提取了上千种传统剪纸纹样，进行数字化修复与矢量化建模。"
            />
          </div>

        </div>
      </div>
    </section>
```

- [ ] **Step 3: 验证模板语法**

运行 `npm run dev`，确认无 Vue 模板编译错误。

---

### Task 2: 验证与提交

**Files:**
- Modify: `src/views/HomeViewChinese.vue`

- [ ] **Step 1: 完整功能验证**

运行 `npm run build` 确认构建成功。在浏览器中检查：
- [ ] 白色背景，无旋转窗花装饰
- [ ] 极简光晕可见（微弱）
- [ ] 左侧：应用介绍 + 电脑模型（纯白容器 + 精致阴影）
- [ ] 右侧：手机模型（纯白容器 + 精致阴影）+ 纹样库介绍
- [ ] 设备容器悬停时浮起效果
- [ ] 移动端单栏堆叠正常

- [ ] **Step 2: 提交代码**

```bash
git add src/views/HomeViewChinese.vue
git commit -m "feat(ui): 重新设计首页数字生态区为苹果风格精致展示"
```
