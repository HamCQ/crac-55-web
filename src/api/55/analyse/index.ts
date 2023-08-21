/*
 * @Description:
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-16
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-21
 */
import request from '@/api/request'

/**
 * 数据统计 - 总数
 */
export const totalAnalyse = (data: TotalAnalyseTypes.IRequest) => {
  return request.get<TotalAnalyseTypes.IResponse>('/55/analyse/total', data)
}

/**
 * 排名统计 - Top5
 */
export const top5RankAnalyse = (data: Top5RankAnalyseTypes.IRequest) => {
  return request.get<Top5RankAnalyseTypes.IResponse>('/55/analyse/rank/top5', data)
}

/**
 * 数据统计 - BY 电台通联数量统计（0-9 区）
 */
export const by09BarchartAnalyse = (data: By09BarchartAnalyseTypes.IRequest) => {
  return request.get<By09BarchartAnalyseTypes.IResponse>('/55/analyse/barchart/by09', data)
}

/**
 * 数据统计 - 省份 QSO 数量统计
 */
export const provinceAnalyse = (data: ProvinceAnalyseTypes.IRequest) => {
  return request.get<ProvinceAnalyseTypes.IResponse>('/55/analyse/province', data)
}

/**
 * 数据统计 - BnCRA 电台通联统计 / BnCRA 电台通联模式比例
 */
export const bncraBarchartAnalyse = (data: BncraBarchartAnalyseTypes.IRequest) => {
  return request.get<BncraBarchartAnalyseTypes.IResponse>('/55/analyse/barchart/bncra', data)
}

/**
 * 排名统计 - 所有
 */
export const allRankAnalyse = (
  data: IBaseHttp.IPaginationRequest & AllRankAnalyseTypes.IRequest
) => {
  return request.get<IBaseHttp.IPaginationResponse<AllRankAnalyseTypes.IResponse>>(
    '/55/analyse/rank/all',
    data
  )
}
