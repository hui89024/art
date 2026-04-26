import { onUnmounted } from 'vue'
import { animate, stagger } from 'animejs'
import { EASING, DURATION, STAGGER_DELAY } from './anime.config.js'
import { prefersReducedMotion, resolveDuration } from './motion.js'

/**
 * useScrollReveal — 滚动触发入场动画
 * 支持重复触发：进入视口播放，离开视口重置
 */
export function useScrollReveal() {
  /** @type {IntersectionObserver|null} */
  let observer = null

  /** 所有已注册元素及其配置 @type {Map<Element, object>} */
  const registry = new Map()

  function getOrCreateObserver(threshold) {
    if (observer) return observer

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const opts = registry.get(entry.target)
        if (!opts) return

        if (entry.isIntersecting) {
          runAnimation(entry.target, opts)
          if (opts.once !== false) observer.unobserve(entry.target)
        } else if (opts.once === false) {
          resetElement(entry.target, opts)
        }
      })
    }, { threshold: threshold ?? 0.15 })

    return observer
  }

  function resetElement(el, opts) {
    const effect = opts.effect ?? 'slideUp'
    const translateY = opts.translateY ?? 80

    if (effect === 'stagger') {
      Array.from(el.children).forEach((child) => {
        child.style.opacity = '0'
        child.style.transform = `translateY(${translateY}px)`
      })
      el.style.opacity = ''
      el.style.transform = ''
      return
    }

    el.style.opacity = '0'
    if (effect !== 'fade') {
      el.style.transform = `translateY(${translateY}px)`
    }
  }

  function runAnimation(el, opts) {
    const effect = opts.effect ?? 'slideUp'
    const translateY = opts.translateY ?? 80
    const reducedMotion = prefersReducedMotion()

    if (effect === 'stagger') {
      animate(el.children, {
        opacity: [0, 1],
        translateY: [translateY, 0],
        duration: resolveDuration(opts.duration ?? DURATION.base),
        ease: opts.ease ?? EASING,
        delay: reducedMotion ? 0 : stagger(opts.delay ?? STAGGER_DELAY)
      })
      return
    }

    const props = {
      opacity: [0, 1],
      duration: resolveDuration(opts.duration ?? DURATION.base),
      ease: opts.ease ?? EASING
    }

    if (effect === 'slideUp') {
      props.translateY = [translateY, 0]
    }

    animate(el, props)
  }

  /**
   * 注册一个元素，进入视口时播放动画
   * @param {import('vue').Ref<HTMLElement>|HTMLElement} elRef
   * @param {object} [opts]
   * @param {'fade'|'slideUp'|'stagger'} [opts.effect='slideUp']
   * @param {number} [opts.threshold=0.15] 可见比例阈值
   * @param {boolean} [opts.once=false] 默认 false，支持重复触发
   * @param {number} [opts.duration] 覆盖默认 duration
   * @param {number} [opts.delay] stagger 间隔（effect='stagger' 时）
   * @param {number} [opts.translateY=80] 位移距离
   */
  function reveal(elRef, opts = {}) {
    const el = elRef && 'value' in elRef ? elRef.value : elRef
    if (!el) {
      console.warn('[useScrollReveal] 元素不存在或 ref 未挂载')
      return
    }

    const threshold = opts.threshold ?? 0.15
    const fullOpts = { once: false, ...opts }

    resetElement(el, fullOpts)
    registry.set(el, fullOpts)
    getOrCreateObserver(threshold).observe(el)
  }

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    registry.clear()
  })

  return { reveal }
}
