/*
 * @Description: request请求
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-17
 */

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { ElNotification } from 'element-plus'

type Config = AxiosResponse['config'] & {
  isErr?: boolean
  token?: string
}

type ResponseType = Omit<AxiosResponse, 'config'> & {
  config: Config
}

const config = {
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

class RequestHttp {
  instance: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig & any) => {
        // 如果请求头需要添加字段则在此添加
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: ResponseType) => {
        const { data } = response

        if (data.code === 200) {
          return data
        }
        // 登录信息失效，应跳转到登录页面，并清空本地的token
        if (data.code === 401) {
          localStorage.token = ''
          ElNotification({
            title: '提示',
            message: '登录失效，请重新登录',
            type: 'error'
          })

          return Promise.reject(data)
        }

        if (response.config.isErr) {
          // 全局错误信息拦截
          console.error(data.msg)

          ElNotification({
            title: '提示',
            message: data.msg || data.message,
            type: 'error'
          })
        }

        return Promise.reject(data)
      },
      (error) => {
        console.error(error.message || '请求错误，请重试')
        // 处理 422 或者 500 的错误异常提示
        const errMsg = error?.response?.data?.message ?? '未知错误，请重试'
        if (!error.config || error.config.isErr) {
          ElNotification({
            title: '提示',
            message: errMsg,
            type: 'error'
          })
        }
        error.message = errMsg
        return Promise.reject(error)
      }
    )
  }

  async get<T, D = any>(
    url: string,
    params: object = {},
    config: AxiosRequestConfig<D> & {
      /** 是否显示错误提示 */
      isErr?: boolean
      /** 是否直接获取data，而忽略message等 */
      isGetDataDirectly?: boolean
    } = {}
  ): Promise<T> {
    const { isErr = true, isGetDataDirectly = true, ..._config } = config
    const res = await this.instance.get(url, { params, ...{ ..._config, isErr } })
    return isGetDataDirectly ? res?.data : res
  }

  async post<T, D = any>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> & {
      /** 是否显示错误提示 */
      isErr?: boolean
      /** 是否直接获取data，而忽略message等 */
      isGetDataDirectly?: boolean
    } = {}
  ): Promise<T> {
    const { isErr = true, isGetDataDirectly = true, ..._config } = config
    // @ts-ignore
    const res = await this.instance.post(url, data, { ..._config, isErr })
    return isGetDataDirectly ? res?.data : res
  }
}

export default new RequestHttp(config)
