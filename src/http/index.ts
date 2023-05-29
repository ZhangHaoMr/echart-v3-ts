import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

const server: AxiosInstance = axios.create({
  baseURL: 'https://www.bookbook.cc/api/data-view',
  timeout: 5000
})

server.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.resolve(error)
  }
)

server.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    return error.response
  }
)

export default server
