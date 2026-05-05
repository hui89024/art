<script setup>
import appScreenshot from '@/assets/2026-05-05 102614.png'
</script>

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

        <!-- App 截图 -->
        <img v-protect-image :src="appScreenshot" alt="剪艺应用截图" class="w-full h-full object-cover" />
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

</style>
