/*
 * @Description:
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2023-08-17
 */
declare namespace Search55V1Types {
  export type IRequest = {
    /** 年份 */
    year: number
    /** 呼号 */
    callsign: string
  }

  export type IResponse = {
    award_info: {
      award_string: string
      award_type: number
      continent: string
      status: boolean
    }
    bncra: Item
    bxcra: Item[]
  }

  type BAND = '6M' | '10M' | '12M' | '15M' | '17M' | '20M' | '30M' | '40M' | '80M' | '160M'

  export interface MODEL {
    [x: BAND]: {
      oprator: string
      frequecy: string
    }[]
  }

  export interface Item {
    callsign_station: string
    [x: 'cw' | 'digi' | 'phone']: MODEL
    /** 得分 */
    score: number
  }
}

// 奖项相关信息
declare namespace Award55V1Types {
  export type IRequest = {
    /** 呼号 */
    callsign: string
    /** 年份 */
    year: number
  }

  export type IResponse = {
      award_string: string
      award_type: number
      continent: string
      bncra_num: number
      callsign: string
      img_url: string
      img_url_origin: string
      combination: number
  }
}