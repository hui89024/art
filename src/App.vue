<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { animate } from 'animejs'
import { EASING, DURATION } from '@/composables/anime.config.js'

/** 包装 done 使其最多被调用一次，防止双重调用损坏 Vue 过渡状态机 */
function safeDone(done) {
  let called = false
  return () => { if (!called) { called = true; done() } }
}

function onLeave(el, done) {
  const sd = safeDone(done)
  animate(el, {
    opacity: [1, 0],
    duration: DURATION.pageLeave,
    ease: EASING,
    onComplete: sd
  })
  // 防止快速切换路由时 done() 永远不被调用
  setTimeout(sd, DURATION.pageLeave + 50)
}

function onEnter(el, done) {
  const sd = safeDone(done)
  animate(el, {
    opacity: [0, 1],
    duration: DURATION.pageEnter,
    ease: EASING,
    onComplete: sd
  })
  setTimeout(sd, DURATION.pageEnter + 50)
}
</script>

<template>
  <div class="min-h-screen flex flex-col relative text-[#2f3a32] selection:bg-accent/30 selection:text-black overflow-x-hidden antialiased">
    <NavBar />
    <RouterView v-slot="{ Component }">
      <Transition :css="false" @leave="onLeave" @enter="onEnter">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </div>
</template>
