/*
 * @Description: 全局store
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-15
 */
import { createGlobalState, useStorage } from '@vueuse/core'
import { ref } from 'vue'

export enum LANGUAGE_TYPE {
  /** 中文 */
  CHINESE = 'zh',
  /** 英文 */
  ENGLISH = 'en'
}

export const useGlobalState = createGlobalState(() => {
  const languageCache = useStorage<LANGUAGE_TYPE>('language', LANGUAGE_TYPE.CHINESE)
  /**
   * 语言配置
   */
  const language = ref<LANGUAGE_TYPE>(languageCache.value)

  /**
   * 切换语言
   * @param {LANGUAGE_TYPE} lang
   */
  function changeLanguage(lang: LANGUAGE_TYPE) {
    language.value = lang
    languageCache.value = lang
  }

  return { language, changeLanguage }
})
