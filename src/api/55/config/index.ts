import request from '@/api/request'

/**
 * 配置查询
 */
export const config55 = (data: Config55Types.IRequest) => {
  return request.get<Config55Types.IResponse>('/55/config', data)
}
