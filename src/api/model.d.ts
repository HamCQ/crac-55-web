/*
 * @Description: request请求类型
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-16
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-21
 */
declare namespace IBaseHttp {
  export type IRequest = {}

  export type IResponse<T> = {
    code: number
    status: boolean
    message: string
    data: T
  }

  export interface IPaginationRequest {
    /** 当前页 */
    page?: number
    /** 每页显示数 */
    page_size?: number
  }

  export interface IPaginationResponse<T = Record<string, unknown>> extends IPaginationBase {
    data: T[]
    /** 当前页 */
    page: number
    /** 每页显示数 */
    page_size: number
    /** 总页数 */
    page_count: number
    /** 总条数 */
    total: number
  }
}
