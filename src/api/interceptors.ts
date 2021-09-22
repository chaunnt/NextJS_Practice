import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { TOKEN } from '@/constants/auth'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.authorization = TOKEN
  return config
}, error => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response
}, error => {
  return Promise.reject(error)
})

export default axiosInstance
