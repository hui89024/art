const OPEN_COLLECTIBLES_API = 'https://bvsgfaqysqva.sealosbja.site/api/open/collectibles'
const OPEN_PATTERNS_API = 'https://bvsgfaqysqva.sealosbja.site/api/open/patterns'

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return

    const text = `${value}`.trim()
    if (!text) return

    query.set(key, text)
  })

  return query.toString()
}

export const getPatterns = async () => {
  const response = await fetch(OPEN_COLLECTIBLES_API, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = new Error('获取数字藏品列表失败')
    error.status = response.status
    throw error
  }

  return response.json()
}

export const getPatternDetail = async (id) => {
  if (id === null || id === undefined || id === '') {
    throw new Error('数字藏品ID不能为空')
  }

  const response = await fetch(`${OPEN_COLLECTIBLES_API}/${encodeURIComponent(id)}/detail`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = new Error(response.status === 404 ? '作品不存在或未通过审核' : '获取作品详情失败')
    error.status = response.status
    throw error
  }

  return response.json()
}

export const searchOpenPatterns = async (params = {}) => {
  const queryString = buildQueryString(params)
  const url = queryString ? `${OPEN_PATTERNS_API}/images?${queryString}` : `${OPEN_PATTERNS_API}/images`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = new Error('获取纹样列表失败')
    error.status = response.status
    throw error
  }

  return response.json()
}

export const getOpenPatternDetailByCode = async (code) => {
  if (code === null || code === undefined || `${code}`.trim() === '') {
    throw new Error('纹样编码不能为空')
  }

  const response = await fetch(`${OPEN_PATTERNS_API}/${encodeURIComponent(code)}/detail`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = new Error(response.status === 404 ? '纹样不存在' : '获取纹样详情失败')
    error.status = response.status
    throw error
  }

  return response.json()
}

export const getOpenPatternTableUrl = (code) => {
  if (code === null || code === undefined || `${code}`.trim() === '') {
    throw new Error('纹样编码不能为空')
  }

  return `${OPEN_PATTERNS_API}/${encodeURIComponent(code)}/table`
}
