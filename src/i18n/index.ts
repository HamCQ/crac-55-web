/*
 * @Description: 多语言
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-29
 */
import { createI18n } from 'vue-i18n'

import { getDefaultLang } from '@/utils'

import EN from './en'
import ZH from './zh'

const messages = {
  zh: { ...ZH },
  en: { ...EN }
}
const languageCache = getDefaultLang()

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  allowComposition: true,
  locale: languageCache.value,
  messages
})
export default i18n
