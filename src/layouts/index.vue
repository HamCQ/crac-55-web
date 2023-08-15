<!--
 * @Description: 布局
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-14
-->
<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import { ElBacktop } from 'element-plus'
import { RouterView } from 'vue-router'

import LayoutFooter from './components/Footer.vue'
import LayoutHeader from './components/Header.vue'

// eslint-disable-next-line vue/multi-word-component-names
defineOptions({ name: 'Layout' })

const isLargeScreen = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <div class="layout">
    <!-- 顶部 -->
    <LayoutHeader />

    <!-- 页面渲染 -->
    <main class="flex-1 text-gray-600 body-font container px-5 mt-10 mb-10 mx-auto">
      <RouterView v-slot="{ Component, route }">
        <component :is="Component" :key="route.name" />
      </RouterView>
    </main>

    <!-- 底部 -->
    <LayoutFooter />

    <ElBacktop :right="isLargeScreen ? 100 : 10" :bottom="isLargeScreen ? 100 : 10" />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}
</style>
