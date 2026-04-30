/**
 * 用户是否偏好减少动态效果
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  return mediaQuery ? mediaQuery.matches : false
}

/**
 * 根据 reduced-motion 偏好解析动画时长
 * @param {number} ms
 * @returns {number}
 */
export function resolveDuration(ms) {
  return prefersReducedMotion() ? 0 : ms
}
