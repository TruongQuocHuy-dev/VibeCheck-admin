import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios'

const AUTH_TOKEN_KEY = 'vibe_token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      const status = error.response?.status

      if (status === 401) {
        localStorage.removeItem(AUTH_TOKEN_KEY)

        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }

      if (status === 403) {
        console.warn('Forbidden: không đủ quyền truy cập')
      }
    }

    return Promise.reject(error)
  },
)