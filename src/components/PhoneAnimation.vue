<template>
  <div class="phone-wrapper flex justify-center items-center">
    <div class="phone-frame relative rounded-[44px] bg-[#1a1a1a] p-[10px] shadow-card">
      <!-- 侧边按钮 -->
      <div class="absolute -right-[3px] top-[120px] w-[3px] h-[35px] bg-[#2a2a2a] rounded-r-sm"></div>
      <div class="absolute -right-[3px] top-[175px] w-[3px] h-[65px] bg-[#2a2a2a] rounded-r-sm"></div>
      <div class="absolute -left-[3px] top-[150px] w-[3px] h-[45px] bg-[#2a2a2a] rounded-l-sm"></div>

      <!-- 屏幕 -->
      <div class="phone-screen rounded-[34px] overflow-hidden bg-[#f8f4ef] relative">
        <!-- 灵动岛 -->
        <div class="dynamic-island absolute top-[10px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20"></div>

        <!-- 状态栏 -->
        <div class="status-bar flex justify-between items-center px-7 pt-[14px] pb-1 text-[11px] font-semibold text-[#1a1a1a]">
          <span>9:41</span>
          <div class="flex items-center gap-1">
            <svg class="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
            <svg class="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
          </div>
        </div>

        <!-- App 内容区 -->
        <div class="app-content px-5 pt-2 pb-4">
          <!-- App Header -->
          <div class="flex items-center justify-between mb-5">
            <div>
              <p class="text-[10px] text-bamboo-dark tracking-wider uppercase">剪艺</p>
              <h3 class="text-[17px] font-bold text-ink-base tracking-tight">纸间万象</h3>
            </div>
            <div class="w-8 h-8 rounded-full bg-bamboo-light/20 flex items-center justify-center">
              <div class="w-5 h-5 rounded-full bg-bamboo-light/40"></div>
            </div>
          </div>

          <!-- 功能卡片区 -->
          <div class="space-y-3">
            <!-- AR 预览卡片 -->
            <div class="app-card bg-gradient-to-br from-[#fef3e2] to-[#fde8c8] rounded-2xl p-4 relative overflow-hidden">
              <div class="absolute top-2 right-3 text-[40px] opacity-10">✂</div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-[18px]">📷</div>
                <div>
                  <h4 class="text-[13px] font-bold text-ink-base">AR 作品预览</h4>
                  <p class="text-[10px] text-bamboo-dark mt-0.5">实时查看装饰效果</p>
                </div>
              </div>
            </div>

            <!-- 智能临摹卡片 -->
            <div class="app-card bg-gradient-to-br from-[#f3e8ff] to-[#e9d5ff] rounded-2xl p-4 relative overflow-hidden">
              <div class="absolute top-2 right-3 text-[40px] opacity-10">🎨</div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-[18px]">✏️</div>
                <div>
                  <h4 class="text-[13px] font-bold text-ink-base">智能临摹</h4>
                  <p class="text-[10px] text-bamboo-dark mt-0.5">逐步掌握剪纸节奏</p>
                </div>
              </div>
            </div>

            <!-- 纹样库卡片 -->
            <div class="app-card bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] rounded-2xl p-4 relative overflow-hidden">
              <div class="absolute top-2 right-3 text-[40px] opacity-10">🔍</div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-[18px]">🏛️</div>
                <div>
                  <h4 class="text-[13px] font-bold text-ink-base">纹样库检索</h4>
                  <p class="text-[10px] text-bamboo-dark mt-0.5">海量传统纹样资源</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 推荐作品 -->
          <div class="mt-5">
            <p class="text-[11px] font-bold text-bamboo-dark tracking-wider uppercase mb-3">今日推荐</p>
            <div class="flex gap-2">
              <div class="flex-1 aspect-square rounded-xl bg-gradient-to-br from-[#dc2626]/10 to-[#dc2626]/5 border border-[#dc2626]/10"></div>
              <div class="flex-1 aspect-square rounded-xl bg-gradient-to-br from-[#c8a86b]/10 to-[#c8a86b]/5 border border-[#c8a86b]/10"></div>
              <div class="flex-1 aspect-square rounded-xl bg-gradient-to-br from-[#1a1a1a]/10 to-[#1a1a1a]/5 border border-[#1a1a1a]/10"></div>
            </div>
          </div>
        </div>

        <!-- 底部导航栏 -->
        <div class="bottom-nav absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-black/5 px-4 py-2 flex justify-around items-center">
          <div class="flex flex-col items-center gap-0.5">
            <div class="w-5 h-5 rounded-md bg-bamboo-base/20"></div>
            <span class="text-[8px] text-bamboo-base font-medium">首页</span>
          </div>
          <div class="flex flex-col items-center gap-0.5">
            <div class="w-5 h-5 rounded-md bg-bamboo-dark/10"></div>
            <span class="text-[8px] text-bamboo-dark">发现</span>
          </div>
          <div class="flex flex-col items-center gap-0.5">
            <div class="w-5 h-5 rounded-md bg-bamboo-dark/10"></div>
            <span class="text-[8px] text-bamboo-dark">创作</span>
          </div>
          <div class="flex flex-col items-center gap-0.5">
            <div class="w-5 h-5 rounded-md bg-bamboo-dark/10"></div>
            <span class="text-[8px] text-bamboo-dark">我的</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-frame {
  width: 260px;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
}

.phone-screen {
  aspect-ratio: 9 / 19.5;
}

.app-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.app-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .app-card {
    transition: none !important;
  }
}
</style>
