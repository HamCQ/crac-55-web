/*
 * @Description: 
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-14
 */
declare namespace Search55V1Types {
  export type IRequest = {
    /** 年份 */
    year: number
    /** 呼号 */
    callsign: string
  }

  export type IResponse = Item[]

  export interface MODEL {

    [x: string]:
    {
      "call": string,
      "oprator": string,
      "frequecy": string,
      "qso_date": string
    }[],


  }

  export interface Item {
    "callsign_station": string,
    [x: string]: MODEL
  }
}