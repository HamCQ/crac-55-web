/*
 * @Description:
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-16
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 网站title */
  readonly VITE_APP_TITLE: string
  /** 高德地图map */
  readonly VITE_AMAP_KEY: string
  /** lottie动图配置基础路径 */
  readonly VITE_LOTTIE: string
  /** 404页动图配置 */
  readonly VITE_NOT_FOUND_LOTTIE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
