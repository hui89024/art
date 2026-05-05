/**
 * 图片防护指令 v-protect-image
 * 禁止右键菜单、禁止拖拽、禁止选择
 */

function preventDefault(e) {
  e.preventDefault()
  return false
}

export const vProtectImage = {
  mounted(el) {
    // 禁止右键菜单
    el.addEventListener('contextmenu', preventDefault)
    // 禁止拖拽
    el.addEventListener('dragstart', preventDefault)
    // 禁止选择
    el.addEventListener('selectstart', preventDefault)
    // CSS 防护
    el.style.userSelect = 'none'
    el.style.webkitUserDrag = 'none'
    el.setAttribute('draggable', 'false')
  },
  unmounted(el) {
    // 清理事件监听
    el.removeEventListener('contextmenu', preventDefault)
    el.removeEventListener('dragstart', preventDefault)
    el.removeEventListener('selectstart', preventDefault)
  }
}
