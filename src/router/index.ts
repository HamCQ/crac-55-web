import { useStorage } from '@vueuse/core'
import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layouts/index.vue'
import { LANGUAGE_TYPE } from '@/store/global'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: () => import('../views/home/index.vue'),
          meta: { title: '首页', titleEn: 'Home' }
        },
        {
          path: 'archive',
          name: 'ArchivePage',
          component: () => import('../views/archive/index.vue'),
          meta: { title: '历年活动', titleEn: 'Archive' }
        },
        {
          path: 'onlineStatus',
          name: 'OnlineStatus',
          component: () => import('../views/onlineStatus/index.vue'),
          meta: { title: '总部电台上线状态', titleEn: 'On the Air' }
        },
        // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('../views/notFound/index.vue'),
          meta: { title: '404 NotFound', titleEn: '404 NotFound' }
        }
      ]
    }
  ]
})

/**
 * 路由全局后置钩子
 */
router.afterEach((to, from) => {
  const languageCache = useStorage<LANGUAGE_TYPE>('language', LANGUAGE_TYPE.CHINESE)
  let title = to.meta.title
  let appName = import.meta.env.VITE_APP_TITLE
  if (languageCache.value == LANGUAGE_TYPE.ENGLISH) {
    title = to.meta.titleEn
    appName = import.meta.env.VITE_APP_TITLE_EN
  }
  document.title = title + ' - ' + appName
})

export default router
