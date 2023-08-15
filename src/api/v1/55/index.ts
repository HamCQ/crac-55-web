import request from "@/api/request";

/** 
 * 搜索
 */
export const search = (data: Search55V1Types.IRequest) => {
  return request.get<Search55V1Types.IResponse>('/v1/55/search', data)
}
