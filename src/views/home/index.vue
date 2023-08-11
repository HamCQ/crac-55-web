<!--
 * @Description: 首页
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-11
-->
<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'

defineOptions({ name: 'HomePage' })
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="home">
    <HelloWorld msg="hello" />

    <div>{{ VITE_APP_TITLE }}</div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  margin: 0;
}
</style>
