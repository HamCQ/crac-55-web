<!--
 * @Description: 首页
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-14
-->
<script lang="ts" setup>
import { useProvideHomeStore } from '@/store/home'

import BnCRA from './components/BnCRA.vue';
import Search from './components/Search.vue'

defineOptions({ name: 'HomePage' })

useProvideHomeStore()
</script>

<template>
  <div class="home">
    <Search />
    <BnCRA />
  </div>
</template>

<style lang="scss" scoped>
.home {
  margin: 0;
}
</style>
