const OPEN_EVENTS_API = (import.meta.env.VITE_OPEN_EVENTS_API || 'https://bvsgfaqysqva.sealosbja.site/api/open/events').trim()

// 从 events URL 提取 origin，拼接 /api/reviews
const REVIEWS_API = (() => {
  try {
    const url = new URL(OPEN_EVENTS_API)
    return `${url.origin}/api/reviews`
  } catch {
    return 'https://bvsgfaqysqva.sealosbja.site/api/reviews'
  }
})()

const COLOR_PALETTE = [
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-indigo-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-amber-500',
  'from-teal-500 to-emerald-500',
]

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const normalizeReviews = (payload) => {
  const source = Array.isArray(payload?.content)
    ? payload.content
    : Array.isArray(payload)
      ? payload
      : []

  return source.map((item, index) => {
    const username = item?.user?.username || item?.username || '匿名用户'
    return {
      id: item?.id ?? `review-${index}`,
      name: username,
      initials: username.charAt(0),
      avatarUrl: item?.user?.avatarUrl || '',
      rating: Number.isFinite(item?.rating) ? item.rating : 5,
      comment: item?.comment || '',
      date: formatDate(item?.createdAt),
      color: COLOR_PALETTE[index % COLOR_PALETTE.length],
    }
  })
}

export const getReviews = async (params = {}) => {
  const query = new URLSearchParams()

  const merged = { page: 0, size: 3, ...params }
  Object.entries(merged).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    const text = `${value}`.trim()
    if (!text) return
    query.set(key, text)
  })

  const url = query.toString() ? `${REVIEWS_API}?${query.toString()}` : REVIEWS_API

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    const error = new Error('获取评价列表失败')
    error.status = response.status
    throw error
  }

  const payload = await response.json()
  return normalizeReviews(payload)
}
