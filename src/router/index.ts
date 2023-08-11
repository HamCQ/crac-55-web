import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layouts/index.vue'
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
          meta: { title: '首页' }
        },
        {
          path: 'archive',
          name: 'ArchivePage',
          component: () => import('../views/archive/index.vue'),
          meta: { title: '历年活动' }
        },
        {
          path: 'onlineStatus',
          name: 'OnlineStatus',
          component: () => import('../views/onlineStatus/index.vue'),
          meta: { title: '总部电台上线状态' }
        }
      ]
    },
  ]
})

/**
 * 路由全局后置钩子
 */
router.afterEach((to, from) => {
  document.title = to.meta.title + ' - ' +import.meta.env.VITE_APP_TITLE
})

export default router
