/*
 * @Description:
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-11
 */
import { createI18n } from 'vue-i18n'

import EN from './en'
import ZH from './zh'

const messages = {
  zh: { ...ZH },
  en: { ...EN }
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  messages
})
export default i18n
