/*
 * @Description:
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-16
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2023-08-17
 */
import request from '@/api/request'

/**
 * 搜索
 */
export const search = (data: Search55V1Types.IRequest) => {
  return request.get<Search55V1Types.IResponse>('/55/search', data)
}

/**
 * 获取奖项信息
 * @param data Award55V1Types.IRequest
 * @returns Promise<Award55V1Types.IResponse>
 */
export const award = (data: Award55V1Types.IRequest) => {
  return request.get<Award55V1Types.IResponse>('/55/award', data)
}
