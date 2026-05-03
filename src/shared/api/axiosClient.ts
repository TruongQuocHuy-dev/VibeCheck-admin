import axios, { type InternalAxiosRequestConfig } from 'axios'
import { getAuthToken } from '../lib/auth'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const apiClient = axios.create({
  baseURL,
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})