/*
 * @Description:
 * @Author: zyg0121 zhouyiguo2012@qq.com
 * @Date: 2023-08-20
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2023-08-20
 */

/*
[ { "callsign_station": "B0CRA", "score": 2, "cw": { "40M": [ { "callsign": "BY0AA", "time": "10分钟前" } ] }, "digi": { "20M": [ { "callsign": "BY0AB", "time": "1分钟前" } ] } }, { "callsign_station": "B1CRA", "score": 1, "cw": { "80M": [ { "callsign": "BY1AA", "time": "15分钟前" } ] } } ]
*/
declare namespace Slot55V1Types {
  export interface IResponse {
    callsign_station: string
    score: number
    cw?: {
      [band: string]: ICallSign[]
    }
    digi?: {
      [band: string]: ICallSign[]
    }
    phone?: {
      [band: string]: ICallSign[]
    }
  }

  export interface ICallSign {
    callsign: string
    time: string
  }
}
