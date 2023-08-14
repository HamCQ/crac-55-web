/*
 * @Description: 入口
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-11
 */
import './assets/css/main.scss'

import { createApp } from 'vue'

import App from './App.vue'
import i18n from './i18n'
import router from './router'

const app = createApp(App)

app.use(router).use(i18n)

app.mount('#app')
