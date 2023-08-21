<!--
 * @Description: 统计页面
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-17
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-21
-->
<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import { useRoute } from 'vue-router'

import { bncraBarchartAnalyse } from '@/api/55/analyse'

import BnCRATotal from './components/BnCRATotal.vue'
import BYStationTotal from './components/BYStationTotal.vue'
import Map from './components/Map.vue'
import ProportionMode from './components/ProportionMode.vue'
import Ranking from './components/Ranking.vue'
import Total from './components/Total.vue'

defineOptions({ name: 'StatisticsPage' })
const { execute, isLoading, state } = useAsyncState(bncraBarchartAnalyse, [], {
  immediate: false
})

const route = useRoute()
const year = computed(() => (route.query?.year as string) ?? '')
onMounted(() => {
  execute(0, { year: year.value })
})
</script>

<template>
  <div class="statistics">
    <!-- 统计 -->
    <Total :year="year" />
    <!-- TOP5 -->
    <Ranking :year="year" />
    <!-- BY 电台通联数量统计（0-9 区） -->
    <BYStationTotal :year="year" />
    <!-- 地图 -->
    <Map :year="year" />
    <!-- BnCRA 电台通联统计 -->
    <BnCRATotal :loading="isLoading" :state="state" />
    <!-- BnCRA 电台通联模式比例 -->
    <ProportionMode :loading="isLoading" :state="state" />
  </div>
</template>

<style lang="scss" scoped>
.statistics {
  margin: 0;
}
</style>
