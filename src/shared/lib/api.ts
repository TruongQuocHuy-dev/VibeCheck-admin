import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios'
import { queryClient } from '../../app/providers'

const AUTH_TOKEN_KEY = 'vibe_token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Tự động đính token vào header
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Response Interceptor: Xử lý lỗi tập trung, đặc biệt là 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (isAxiosError(error)) {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
      const status = error.response?.status

      // Xử lý lỗi 401: Unauthorized (Token hết hạn hoặc không hợp lệ)
      // Thêm flag _retry để tránh vòng lặp vô tận nếu endpoint login cũng trả về 401
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        
        console.warn('Unauthorized: Token hết hạn hoặc không hợp lệ. Đang dọn dẹp session...')
        
        // Dọn dẹp session
        localStorage.removeItem(AUTH_TOKEN_KEY)
        queryClient.clear() // Xóa cache React Query để đảm bảo không leak data

        // Chuyển hướng về trang login nếu không phải đang ở trang login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }

      if (status === 403) {
        console.error('Forbidden: Bạn không có quyền thực hiện hành động này.')
      }
    }

    return Promise.reject(error)
  },
)