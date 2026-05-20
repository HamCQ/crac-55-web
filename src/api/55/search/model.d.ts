/*
 * @Description:
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-29
 */
declare namespace Search55V1Types {
  export type IRequest = {
    /** 年份 */
    year: string
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
    rank_info: {
      cra: number
      diff_cra: number
      is_cn: boolean
    }
    sat: SatItem
  }

  type SatBxcraEntry = {
    oprator: string
    frequecy: string
  }

  type SatBxcra = {
    b0cra: SatBxcraEntry[] | null
    b1cra: SatBxcraEntry[] | null
    b2cra: SatBxcraEntry[] | null
    b3cra: SatBxcraEntry[] | null
    b4cra: SatBxcraEntry[] | null
    b5cra: SatBxcraEntry[] | null
    b6cra: SatBxcraEntry[] | null
    b7cra: SatBxcraEntry[] | null
    b8cra: SatBxcraEntry[] | null
    b9cra: SatBxcraEntry[] | null
  }

  export interface SatItem {
    callsign_station: string
    score: number
    ao_123: SatBxcra
    so_50: SatBxcra
    iss: SatBxcra
    rs_44: SatBxcra
  }

  type BAND = '2M' | '6M' | '10M' | '12M' | '15M' | '17M' | '20M' | '30M' | '40M' | '80M' | '160M'

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
    year: string
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
