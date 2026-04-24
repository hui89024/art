const OPEN_EVENTS_API = (import.meta.env.VITE_OPEN_EVENTS_API || 'https://bpsljpqucopd.sealosbja.site/api/open/events').trim()

const pickText = (...values) => {
  for (const value of values) {
    if (value === null || value === undefined) continue
    const text = `${value}`.trim()
    if (text) return text
  }
  return ''
}

const normalizeDate = (value) => {
  if (value === null || value === undefined || value === '') return ''

  if (typeof value === 'number' && Number.isFinite(value)) {
    const timestamp = value < 1e12 ? value * 1000 : value
    const date = new Date(timestamp)
    return Number.isNaN(date.getTime()) ? '' : date.toISOString()
  }

  const text = `${value}`.trim()
  if (!text) return ''

  const pureNumber = Number(text)
  if (!Number.isNaN(pureNumber) && Number.isFinite(pureNumber) && /^\d{10,13}$/.test(text)) {
    const timestamp = text.length === 10 ? pureNumber * 1000 : pureNumber
    const date = new Date(timestamp)
    return Number.isNaN(date.getTime()) ? '' : date.toISOString()
  }

  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

const normalizeEvents = (payload) => {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.list)
        ? payload.list
        : []

  return source
    .map((item, index) => {
      const id = item?.id ?? item?.eventId ?? item?._id ?? `event-${index + 1}`
      const title = pickText(item?.title, item?.name, item?.eventTitle)
      const desc = pickText(item?.desc, item?.description, item?.intro, item?.summary)
      const image = pickText(item?.image, item?.cover, item?.coverUrl, item?.imageUrl, item?.thumbnail)
      const url = pickText(item?.url, item?.link, item?.articleUrl, item?.jumpUrl)
      const publishTime = normalizeDate(
        item?.publish_date_time
        ?? item?.publishDateTime
        ?? item?.publishTime
        ?? item?.publishedAt
        ?? item?.publishAt
        ?? item?.date
        ?? item?.createdAt
        ?? item?.createTime
      )

      return {
        id: `${id}`.trim(),
        title,
        desc,
        image,
        url,
        publishTime,
      }
    })
    .filter((item) => item.id && item.title)
}

export const getEvents = async (params = {}) => {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    const text = `${value}`.trim()
    if (!text) return
    query.set(key, text)
  })

  const url = query.toString() ? `${OPEN_EVENTS_API}?${query.toString()}` : OPEN_EVENTS_API

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = new Error('获取活动列表失败')
    error.status = response.status
    throw error
  }

  const payload = await response.json()
  return normalizeEvents(payload)
}
