/** 工具 */
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

/**
 * 校验手机号
 */
export const isPhone = (value: string | number) => /^(?:(?:\+|00)86)?1\d{10}$/.test(String(value))
