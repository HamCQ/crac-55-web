<!--
 * @Description: 总数统计
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-17
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-30
-->
<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'

import { totalAnalyse } from '../../../api/55/analyse'

defineOptions({ name: 'StatisticTotal' })

const props = defineProps<{ year?: string }>()

const { execute, isLoading, state } = useAsyncState(
  totalAnalyse,
  {
    log_num: 0,
    single_call_num: 0,
    award_num: 0
  },
  {
    immediate: false
  }
)

watch(
  () => props.year,
  () => {
    if (props.year) {
      execute(0, { year: props.year ?? '' })
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <section class="text-gray-600 body-font statistic-total">
    <div class="container px-5 pt-20 pb-24 mx-auto">
      <div class="flex flex-wrap -m-4 text-center" v-loading="isLoading">
        <div class="p-4 sm:w-1/3 w-1/3">
          <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {{ state.log_num ?? 0 }}
          </h2>
          <p class="leading-relaxed">{{ $t('statistic.total.logNum') }}</p>
        </div>
        <div class="p-4 sm:w-1/3 w-1/3">
          <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {{ state.single_call_num ?? 0 }}
          </h2>
          <p class="leading-relaxed">{{ $t('statistic.total.singleCallNum') }}</p>
        </div>
        <div class="p-4 sm:w-1/3 w-1/3">
          <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {{ state.award_num ?? 0 }}
          </h2>
          <p class="leading-relaxed">{{ $t('statistic.total.awardNum') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
