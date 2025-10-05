
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

// Simple response/error mappers
api.interceptors.response.use(
  r => r,
  err => {
    const msg = err?.response?.data?.message || err?.message || 'Error de red'
    return Promise.reject(new Error(msg))
  }
)
