const LOGIN_URL = 'https://bvsgfaqysqva.sealosbja.site/api/auth/login'
const TOKEN_KEY = 'paper-cut-jwt-token'
const USERNAME_KEY = 'paper-cut-username'

export const saveAuth = (token, username) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USERNAME_KEY, username)
}

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USERNAME_KEY)
}

export const getStoredAuth = () => ({
  token: localStorage.getItem(TOKEN_KEY) || '',
  username: localStorage.getItem(USERNAME_KEY) || '',
})

export const loginWithPassword = ({ username, password }) =>
  fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.token) {
        return {
          ok: false,
          message: data.message || '用户名或密码错误',
        }
      }

      saveAuth(data.token, username)

      return {
        ok: true,
        token: data.token,
        username,
        message: data.message || '登录成功',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        ok: false,
        message: '登录服务暂不可用，请确认后端已启动并允许跨域访问。',
      }
    })

export const getAuthorizationHeader = () => {
  const { token } = getStoredAuth()
  return token ? `Bearer ${token}` : ''
}
