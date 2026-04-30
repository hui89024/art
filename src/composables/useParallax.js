import { ref, onMounted, onBeforeUnmount, toRef, computed } from 'vue'

export function useParallax(options = {}) {
  const enabled = toRef(options, 'enabled', true)
  const speed = toRef(options, 'speed', 0.5)

  const scrollY = ref(0)
  const isReducedMotion = ref(false)
  const transform = computed(() => {
    if (!enabled.value || isReducedMotion.value) return 'translateY(0px)'
    return `translateY(${scrollY.value * speed.value}px)`
  })

  let mediaQuery = null
  let motionHandler = null

  const onScroll = () => {
    if (!enabled.value || isReducedMotion.value) return
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery) {
      isReducedMotion.value = mediaQuery.matches
      motionHandler = (e) => { isReducedMotion.value = e.matches }
      mediaQuery.addEventListener('change', motionHandler)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    if (mediaQuery && motionHandler) {
      mediaQuery.removeEventListener('change', motionHandler)
    }
    window.removeEventListener('scroll', onScroll)
  })

  return { scrollY, isReducedMotion, transform }
}
