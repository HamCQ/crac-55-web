/*
 * @Description: 多语言
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-15
 */
import { useStorage } from '@vueuse/core'
import { createI18n } from 'vue-i18n'

import { LANGUAGE_TYPE } from '@/store/global'

import EN from './en'
import ZH from './zh'

const messages = {
  zh: { ...ZH },
  en: { ...EN }
}
const languageCache = useStorage<LANGUAGE_TYPE>('language', LANGUAGE_TYPE.CHINESE)

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  allowComposition: true, 
  locale: languageCache.value,
  messages
})
export default i18n
