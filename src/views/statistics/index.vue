<!-- 统计页面 -->
<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'

import { bncraBarchartAnalyse } from '@/api/55/analyse'
import DatePickerYear from '@/components/DatePickerYear/DatePickerYear.vue'
import { useConfigState } from '@/store/config'

import BnCRATotal from './components/BnCRATotal.vue'
import BYStationTotal from './components/BYStationTotal.vue'
// import Map from './components/Map.vue'
import ProportionMode from './components/ProportionMode.vue'
import Ranking from './components/Ranking.vue'
import Total from './components/Total.vue'

defineOptions({ name: 'StatisticsPage' })
const { execute, isLoading, state } = useAsyncState(bncraBarchartAnalyse, [], {
  immediate: false
})

const { currentYear } = useConfigState()

onMounted(() => {})
watch(
  currentYear,
  () => {
    if (currentYear.value) {
      nextTick(() => {
        execute(0, { year: currentYear.value })
      })
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="statistics">
    <div class="flex justify-end items-center">
      <span class="text-base text-gray-500 mr-3">{{ $t('statistic.selectYear') }}</span>
      <DatePickerYear />
    </div>

    <!-- 统计 -->
    <Total :year="currentYear" />
    <!-- TOP5 -->
    <Ranking :year="currentYear" />
    <!-- BY 电台通联数量统计（0-9 区） -->
    <BYStationTotal :year="currentYear" />
    <!-- 地图 -->
    <!-- <Map :year="currentYear" /> -->
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
