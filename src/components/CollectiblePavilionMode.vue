<script setup>
import { PhCaretRight } from '@phosphor-icons/vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  loadError: { type: String, default: '' },
})

const emit = defineEmits(['select-item', 'open-story'])
</script>

<template>
  <main class="pavilion-mode" role="tabpanel" aria-label="百宝阁浏览模式">
    <!-- 骨架屏加载状态 -->
    <div v-if="loading" class="skeleton-grid" aria-label="加载中">
      <div v-for="i in 6" :key="i" class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-body">
          <div class="skeleton-tag"></div>
          <div class="skeleton-line title"></div>
          <div class="skeleton-line code"></div>
          <div class="skeleton-line desc"></div>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="loadError" class="error-banner" role="alert">
      <span>{{ loadError }}</span>
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && !items.length" class="empty-state">
      <div class="empty-illustration" aria-hidden="true">
        <div class="empty-seal">
          <div class="empty-diamond">
            <span>空</span>
          </div>
        </div>
      </div>
      <h3 class="empty-title">暂无可展示珍品</h3>
      <p class="empty-desc">珍品正在精心筹备中，敬请期待。</p>
    </div>

    <!-- 百宝阁网格 -->
    <div v-if="!loading && items.length" class="pavilion-grid" role="list" aria-label="珍品展示">
      <article
        v-for="(item, index) in items"
        :key="item.id"
        class="pavilion-card"
        role="listitem"
        @click="emit('open-story', item)"
        @keydown.enter="emit('open-story', item)"
        @keydown.space.prevent="emit('open-story', item)"
        tabindex="0"
        :aria-label="`珍品 ${index + 1}：${item.title}`"
      >
        <!-- 顶部渐变条 -->
        <div class="card-accent" aria-hidden="true"></div>

        <!-- 图片区域 -->
        <div
          class="card-image"
          @click.stop="emit('open-story', item)"
          @keydown.enter.stop="emit('open-story', item)"
          @keydown.space.prevent.stop="emit('open-story', item)"
          tabindex="0"
          :aria-label="`查看 ${item.title} 的作品档案`"
          role="button"
        >
          <!-- 装饰旋转圆环 -->
          <div class="image-ring outer" aria-hidden="true"></div>
          <div class="image-ring inner" aria-hidden="true"></div>

          <!-- 四角窗格 -->
          <div class="image-corner top-left" aria-hidden="true"></div>
          <div class="image-corner top-right" aria-hidden="true"></div>
          <div class="image-corner bottom-left" aria-hidden="true"></div>
          <div class="image-corner bottom-right" aria-hidden="true"></div>

          <img
            v-protect-image
            :src="item.image"
            :alt="`${item.title} - ${item.desc}`"
            loading="lazy"
            decoding="async"
          />

          <!-- 光晕悬浮效果 -->
          <div class="image-shine" aria-hidden="true"></div>
        </div>

        <!-- 内容区域 -->
        <div class="card-body">
          <!-- 标题行 -->
          <div class="card-header">
            <span class="card-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="card-title">{{ item.title }}</h3>
          </div>

          <!-- 编号 -->
          <p class="card-code">{{ item.patternCode }}</p>

          <!-- 描述 -->
          <div class="card-desc">
            <p v-for="(para, pIdx) in item.story" :key="pIdx">{{ para }}</p>
          </div>

          <!-- 底部操作 -->
          <div class="card-footer">
            <div class="footer-cloud" aria-hidden="true">
              <svg viewBox="0 0 60 10" class="cloud-line">
                <path d="M0,5 Q15,0 30,5 Q45,10 60,5" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
              </svg>
            </div>
            <button
              class="card-cta"
              @click.stop="emit('open-story', item)"
              :aria-label="`查看 ${item.title} 的故事`"
            >
              <span>品读故事</span>
              <PhCaretRight class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- 角落装饰点 -->
        <div class="card-dot top-left" aria-hidden="true"></div>
        <div class="card-dot top-right" aria-hidden="true"></div>
        <div class="card-dot bottom-left" aria-hidden="true"></div>
        <div class="card-dot bottom-right" aria-hidden="true"></div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.pavilion-mode {
  min-height: 100vh;
  background: linear-gradient(135deg, #FEF2F2 0%, #FFFBEB 50%, #FFF7ED 100%);
  padding-bottom: 4rem;
}

/* 骨架屏 */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.skeleton-card {
  border-radius: 1rem;
  overflow: hidden;
  background: #FFFFFF;
  border: 1px solid rgba(220, 38, 38, 0.1);
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(90deg, #FEF2F2 25%, #FEE2E2 50%, #FEF2F2 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-body {
  padding: 1.25rem;
}

.skeleton-tag {
  width: 3rem;
  height: 1.25rem;
  border-radius: 2px;
  background: linear-gradient(90deg, #FEF2F2 25%, #FEE2E2 50%, #FEF2F2 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 0.75rem;
}

.skeleton-line {
  height: 0.875rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #FEF2F2 25%, #FEE2E2 50%, #FEF2F2 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-line.title {
  width: 50%;
  margin-bottom: 0.5rem;
}

.skeleton-line.code {
  width: 35%;
  margin-bottom: 0.75rem;
  height: 0.75rem;
}

.skeleton-line.desc {
  width: 80%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 错误提示 */
.error-banner {
  max-width: 1280px;
  margin: 1rem auto;
  padding: 0.75rem 1.5rem;
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.15);
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  color: #DC2626;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem;
  text-align: center;
}

.empty-illustration {
  margin-bottom: 2rem;
}

.empty-seal {
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-diamond {
  width: 4rem;
  height: 4rem;
  border: 3px solid rgba(220, 38, 38, 0.3);
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin-slow 20s linear infinite;
}

.empty-diamond span {
  transform: rotate(-45deg);
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1.25rem;
  color: rgba(220, 38, 38, 0.4);
}

.empty-title {
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1.375rem;
  font-weight: 600;
  color: #991B1B;
  margin-bottom: 0.75rem;
}

.empty-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #B45309;
  opacity: 0.7;
  max-width: 28rem;
}

/* 百宝阁网格 */
.pavilion-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

/* 珍品卡片 */
.pavilion-card {
  position: relative;
  background: #FFFFFF;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid rgba(220, 38, 38, 0.15);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.pavilion-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(220, 38, 38, 0.12);
  border-color: rgba(220, 38, 38, 0.4);
}

.pavilion-card:focus-visible {
  outline: 2px solid #DC2626;
  outline-offset: 4px;
}

/* 顶部渐变条 */
.card-accent {
  height: 3px;
  background: linear-gradient(90deg, #DC2626, #F59E0B, #DC2626);
}

/* 图片区域 */
.card-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #FEF2F2;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s;
}

.pavilion-card:hover .card-image img {
  transform: scale(1.08) rotate(1deg);
}

/* 装饰旋转圆环 */
.image-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(220, 38, 38, 0.08);
  pointer-events: none;
}

.image-ring.outer {
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  animation: spin-slow 25s linear infinite;
}

.image-ring.inner {
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  animation: spin-slow 18s linear infinite reverse;
}

/* 四角窗格 */
.image-corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-color: rgba(220, 38, 38, 0.2);
  border-style: solid;
  border-width: 0;
  z-index: 2;
  transition: border-color 0.3s;
}

.pavilion-card:hover .image-corner {
  border-color: rgba(220, 38, 38, 0.5);
}

.image-corner.top-left { top: 0.5rem; left: 0.5rem; border-top-width: 2px; border-left-width: 2px; }
.image-corner.top-right { top: 0.5rem; right: 0.5rem; border-top-width: 2px; border-right-width: 2px; }
.image-corner.bottom-left { bottom: 0.5rem; left: 0.5rem; border-bottom-width: 2px; border-left-width: 2px; }
.image-corner.bottom-right { bottom: 0.5rem; right: 0.5rem; border-bottom-width: 2px; border-right-width: 2px; }

/* 光晕效果 */
.image-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0) 0%, rgba(245, 158, 11, 0.08) 50%, rgba(245, 158, 11, 0) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s;
  pointer-events: none;
}

.pavilion-card:hover .image-shine {
  transform: translateX(100%);
}

/* 内容区域 */
.card-body {
  padding: 1.25rem;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(254, 242, 242, 0.3) 100%);
}

/* 系列标签 */
.card-tag {
  display: inline-block;
  margin-bottom: 0.75rem;
}

.tag-text {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border: 2px solid #DC2626;
  border-radius: 2px;
  font-size: 0.625rem;
  font-weight: 600;
  color: #DC2626;
  letter-spacing: 0.1em;
  transform: rotate(-1deg);
  position: relative;
}

.tag-text::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(220, 38, 38, 0.05) 2px, rgba(220, 38, 38, 0.05) 4px);
  pointer-events: none;
}

/* 标题行 */
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.card-index {
  flex-shrink: 0;
  font-size: 0.625rem;
  font-weight: 500;
  color: #DC2626;
  letter-spacing: 0.1em;
  padding-top: 0.25rem;
}

.card-title {
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #991B1B;
  line-height: 1.3;
  transition: color 0.3s;
}

.pavilion-card:hover .card-title {
  color: #DC2626;
}

.card-code {
  font-size: 0.6875rem;
  color: #B45309;
  opacity: 0.6;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.card-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
}

.card-desc p {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #78350F;
  opacity: 0.75;
  margin-bottom: 0.5rem;
}

.card-desc p:last-child {
  margin-bottom: 0;
}

/* 底部操作 */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(220, 38, 38, 0.1);
}

.footer-cloud {
  color: #DC2626;
  opacity: 0.3;
}

.cloud-line {
  width: 3rem;
  height: 0.625rem;
}

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #DC2626, #B91C1C);
  color: #FFFFFF;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-cta:hover {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  transform: translateX(2px);
}

.card-cta svg {
  transition: transform 0.3s;
}

.card-cta:hover svg {
  transform: translateX(3px);
}

/* 角落装饰点 */
.card-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #DC2626;
  opacity: 0;
  transition: opacity 0.3s;
}

.pavilion-card:hover .card-dot {
  opacity: 0.4;
}

.card-dot.top-left { top: 0.5rem; left: 0.5rem; }
.card-dot.top-right { top: 0.5rem; right: 0.5rem; background: #F59E0B; }
.card-dot.bottom-left { bottom: 0.5rem; left: 0.5rem; background: #F59E0B; }
.card-dot.bottom-right { bottom: 0.5rem; right: 0.5rem; }

/* 旋转动画 */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式 */
@media (max-width: 1024px) {
  .pavilion-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .skeleton-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .pavilion-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }

  .skeleton-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .image-ring,
  .empty-diamond {
    animation: none !important;
  }

  .pavilion-card:hover {
    transform: translateY(-4px);
  }

  .pavilion-card:hover .card-image img {
    transform: scale(1.02);
  }

  .image-shine {
    display: none;
  }

  .skeleton-image,
  .skeleton-tag,
  .skeleton-line {
    animation: none;
  }
}
</style>
