/*
 * @Description:
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-16
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-17
 */
import request from '@/api/request'

/**
 * 搜索
 */
export const search = (data: Search55V1Types.IRequest) => {
  return request.get<Search55V1Types.IResponse>('/55/search', data)
}
