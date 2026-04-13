<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col relative bg-evasion-black text-white selection:bg-accent/30 selection:text-white overflow-x-hidden antialiased">
    <NavBar />
    <RouterView />
  </div>
</template>