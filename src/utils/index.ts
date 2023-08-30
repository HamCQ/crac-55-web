/*
 * @Description: 工具
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-29
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-29
 */
import { useNavigatorLanguage, useStorage } from '@vueuse/core'

import { LANGUAGE_TYPE } from '@/store/global'

/**
 * 获取默认语言
 */
export const getDefaultLang = () => {
  const { language } = useNavigatorLanguage()

  const languageCache = useStorage<LANGUAGE_TYPE>(
    'language',
    language.value && !/zh-/i.test(language.value) ? LANGUAGE_TYPE.ENGLISH : LANGUAGE_TYPE.CHINESE
  )
  return languageCache
}
