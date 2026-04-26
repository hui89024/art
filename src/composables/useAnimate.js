import { animate, stagger } from 'animejs'
import { EASING, DURATION, STAGGER_DELAY } from './anime.config.js'
import { prefersReducedMotion, resolveDuration } from './motion.js'

/**
 * useAnimate — 入场与交互动画
 * 所有方法接受 HTMLElement | Ref<HTMLElement> | string（CSS 选择器）
 * 返回 anime.js Animation 实例
 */
export function useAnimate() {
  /**
   * 将 ref 或 HTMLElement 解包为真实 DOM 节点
   * @param {HTMLElement|import('vue').Ref|string} el
   * @returns {HTMLElement|string}
   */
  function unwrap(el) {
    if (el && typeof el === 'object' && 'value' in el) return el.value
    return el
  }

  /**
   * 透明度淡入 0 → 1
   */
  function fadeIn(el, opts = {}) {
    return animate(unwrap(el), {
      opacity: [0, 1],
      duration: resolveDuration(opts.duration ?? DURATION.base),
      ease: opts.ease ?? EASING,
      delay: prefersReducedMotion() ? 0 : (opts.delay ?? 0)
    })
  }

  /**
   * 向上滑入 + 淡入（translateY 80px → 0）
   */
  function slideUp(el, opts = {}) {
    return animate(unwrap(el), {
      opacity: [0, 1],
      translateY: [opts.translateY ?? 80, 0],
      duration: resolveDuration(opts.duration ?? DURATION.slow),
      ease: opts.ease ?? EASING,
      delay: prefersReducedMotion() ? 0 : (opts.delay ?? 0)
    })
  }

  /**
   * 子元素逐个 slideUp（用于列表/卡片组）
   * @param {HTMLElement|Ref} parent  —— 父容器，子元素为动画对象
   * @param {object} opts
   * @param {number} [opts.delay=80]  —— 每个子元素的额外延迟
   */
  function staggerIn(parent, opts = {}) {
    const el = unwrap(parent)
    if (!el) return null
    return animate(el.children, {
      opacity: [0, 1],
      translateY: opts.translateY ?? [80, 0],
      duration: resolveDuration(opts.duration ?? DURATION.base),
      ease: opts.ease ?? EASING,
      delay: prefersReducedMotion() ? 0 : stagger(opts.delay ?? STAGGER_DELAY)
    })
  }

  /**
   * 缩放淡入 0.92 → 1（适合弹窗、卡片聚焦）
   */
  function scaleIn(el, opts = {}) {
    return animate(unwrap(el), {
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: resolveDuration(opts.duration ?? DURATION.base),
      ease: opts.ease ?? EASING,
      delay: prefersReducedMotion() ? 0 : (opts.delay ?? 0)
    })
  }

  /**
   * 淡出（用于弹窗关闭）
   */
  function fadeOut(el, opts = {}) {
    const animConfig = {
      opacity: [1, 0],
      duration: resolveDuration(opts.duration ?? DURATION.fast),
      ease: opts.ease ?? EASING,
      delay: prefersReducedMotion() ? 0 : (opts.delay ?? 0)
    }
    if (opts.scale) {
      animConfig.scale = [1, 0.95]
    }
    return animate(unwrap(el), animConfig)
  }

  return { fadeIn, slideUp, staggerIn, scaleIn, fadeOut }
}
