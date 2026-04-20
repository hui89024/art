const OPEN_COLLECTIBLES_API = 'https://bpsljpqucopd.sealosbja.site/api/open/collectibles'

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
