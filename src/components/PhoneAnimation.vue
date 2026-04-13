<template>
  <div class="phone-wrapper flex justify-center items-center">
    <div class="relative group phone-shell">
      <div class="phone-body relative flex justify-center h-[300px] w-[160px] border-[4px] border-black rounded-[2rem] bg-gray-50 overflow-hidden">
        <div class="absolute inset-[8px] rounded-[1.5rem] overflow-hidden border border-black/10">
          <img src="../assets/image.png" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Phone Display" />
        </div>

        <span class="relative z-10 border border-black bg-black w-20 h-2 rounded-br-xl rounded-bl-xl"></span>
      </div>

      <span class="absolute -right-2 top-14 border-[4px] border-black h-7 rounded-md bg-gray-100"></span>
      <span class="absolute -right-2 bottom-36 border-[4px] border-black h-10 rounded-md bg-gray-100"></span>
    </div>
  </div>
</template>

<style scoped>
.phone-shell {
  filter: drop-shadow(5px 5px 2.5px rgba(209, 218, 218, 0.85));
}

.phone-body {
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.28);
}
</style>
