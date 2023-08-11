<!--
 * @Description: 布局
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-11
-->
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import LayoutHeader from './components/Header.vue'
import LayoutFooter from './components/Footer.vue'

defineOptions({ name: 'Layout' })
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
