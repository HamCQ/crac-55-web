/*
 * @Description:
 * @Author: zyg0121 zhouyiguo2012@qq.com
 * @Date: 2023-08-17
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-27
 */
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// ESM 下没有 __dirname，使用 import.meta.url 解析项目路径
const pathSrc = fileURLToPath(new URL('./src', import.meta.url))
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc
    }
  },

  plugins: [
    vue(),
    vueJsx(),

    Components({
      resolvers: [
        ElementPlusResolver({
          // 关闭按需样式：Element Plus 全量样式已在 main.scss 中按 layer 引入，
          // 按需注入的样式未分层会压过 Tailwind 工具类
          importStyle: false
        })
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    })
  ],

  server: {
    proxy: {
      '/v1': {
        target: 'https://crac.hamcq.cn/v1',
        //target: 'http://127.0.0.1:4523/m1/3178384-0-default/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, '')
      }
    }
  }
})
