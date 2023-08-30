declare namespace Config55Types {
  export type IRequest = {
    year?: string | number
  }

  export type IResponse = {
    /** 首页配图 */
    cover: string
    /** crac活动介绍链接 */
    crac_desc: string
    /** 当前开启活动 */
    current_active_year: number
    /** 首页标题第二行 */
    sub_title: string
    /** 首页标题第二行 英文 */
    sub_title_en: string
    /** 首页标题 */
    title: string
    /** 首页标题 英文 */
    title_en: string
  }
}
