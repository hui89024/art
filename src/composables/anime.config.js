// 全局动画常量 —— 统一动效节奏与可访问性基线
// anime.js v4 官方内置 ease 字符串，请勿随意修改
export const EASING = 'outQuart'

export const DURATION = {
  micro: 120,     // 微交互（悬浮/细节反馈）毫秒
  fast: 180,      // 快速反馈（弹窗关闭）毫秒
  base: 320,      // 标准入场 毫秒
  slow: 640,      // 强调性入场 毫秒
  pageLeave: 420, // 路由离场淡出 毫秒
  pageEnter: 900  // 路由入场淡入 毫秒
}

// anime.js stagger 参数间隔（毫秒）
export const STAGGER_DELAY = 40
