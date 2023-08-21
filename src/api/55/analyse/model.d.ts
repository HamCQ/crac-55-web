/*
 * @Description:
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-21
 */
declare namespace TotalAnalyseTypes {
  export type IRequest = {
    year?: string
  }

  export type IResponse = {
    /** QSO数量 */
    log_num: number
    /** 奖状数量 */
    award_num: number
    /** 独立呼号 */
    single_call_num: number
  }
}

declare namespace Top5RankAnalyseTypes {
  export type IRequest = {
    /** 所属年份 */
    year?: string
  }

  export type IResponse = {
    /** 中国电台 - 区分 CRA 电台 */
    cn_cra: Item[]
    /** 中国电台 - 不区分 CRA 电台 */
    cn_diff_cra: Item[]
    /** 国际电台 - 区分 CRA 电台 */
    globle_cra: Item[]
    /** 国际电台 - 不区分 CRA 电台 */
    globle_diff_cra: Item[]
    /** 更新时间 */
    update_time: string
  }

  export interface Item {
    /** 呼号 */
    callsign: string
    /** 得分 */
    score: number
  }
}

declare namespace By09BarchartAnalyseTypes {
  export type IRequest = {
    /** 所属年份 */
    year?: string
  }

  export type IResponse = Item[]
  export interface Item {
    /** 区 */
    by_code: number
    cw_num: number
    phone_num: number
    digi_num: number
  }
}

declare namespace ProvinceAnalyseTypes {
  export type IRequest = {
    /** 所属年份 */
    year?: string
  }

  export type IResponse = ProvinceItem[]

  export interface ProvinceItem {
    cn_region_code: string
    qso_num: number
  }
}

declare namespace BncraBarchartAnalyseTypes {
  export type IRequest = {
    /** 所属年份 */
    year?: string
  }

  export type IResponse = Item[]
  export interface Item {
    callsign_station: string
    cw_num: number
    phone_num: number
    digi_num: number
    sum: number
  }
}

declare namespace AllRankAnalyseTypes {
  export type IRequest = {
    /** 所属年份 */
    year?: string
    type?: string
  }

  export type IResponse = {
    callsign: string
    number: number
    score: number
  }
}
