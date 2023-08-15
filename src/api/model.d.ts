declare namespace IBaseHttp {
  export type IRequest = {}

  export type IResponse<T> = {
    code: number
    status: boolean
    message: string
    data: T
  }
}
