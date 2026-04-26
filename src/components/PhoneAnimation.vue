<template>
  <div class="phone-wrapper flex justify-center items-center">
    <div class="relative phone-shell rounded-[36px] p-2 bg-black shadow-card">
      <div class="rounded-[28px] overflow-hidden bg-white">
        <img src="../assets/image.png" class="w-full h-full object-cover" alt="手机展示图" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-shell {
  filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.25));
}
</style>
