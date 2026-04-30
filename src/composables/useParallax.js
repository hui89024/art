import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useParallax(options = {}) {
  const {
    speed = 0.5,
    enabled = true
  } = options

  const scrollY = ref(0)
  const isReducedMotion = ref(false)
  let animationId = null
  let element = null

  const updateScroll = () => {
    if (!enabled || isReducedMotion.value) return
    scrollY.value = window.pageYOffset
    if (element) {
      element.style.transform = `translateY(${scrollY.value * speed}px)`
    }
    animationId = requestAnimationFrame(updateScroll)
  }

  const start = (el) => {
    element = el
    if (enabled && !isReducedMotion.value) {
      animationId = requestAnimationFrame(updateScroll)
    }
  }

  const stop = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  onMounted(() => {
    // 检查用户是否偏好减少动画
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    isReducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener('change', (e) => {
      isReducedMotion.value = e.matches
    })
  })

  onBeforeUnmount(() => {
    stop()
  })

  return {
    scrollY,
    isReducedMotion,
    start,
    stop
  }
}
