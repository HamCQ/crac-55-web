<!--
 * @Description: 首页
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-26
-->
<script lang="ts" setup>
import { useProvideHomeStore } from '@/store/home'

import Award from './components/Award.vue'
import BnCRA from './components/BnCRA.vue'
import Rank from './components/Rank.vue'
import Search from './components/Search.vue'

defineOptions({ name: 'HomePage' })

const { searchData } = useProvideHomeStore()
const hasSearch = computed(() => Boolean(searchData.value?.bncra?.callsign_station))
</script>

<template>
  <div :class="['home', hasSearch ? 'items-center' : '']">
    <!-- 搜索 -->
    <Search />
    <template v-if="hasSearch">
      <!-- 是否获奖 -->
      <Award v-if="searchData?.award_info?.status" />
      <Rank year="2023" />
      <!-- bncra -->
      <BnCRA />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.home {
  flex: 1;
  margin: 0;
}
</style>
