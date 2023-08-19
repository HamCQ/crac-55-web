<!--
 * @Description: 总数统计
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-17
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-17
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { totalAnalyse } from '../../../api/55/analyse'

defineOptions({ name: 'StatisticTotal' })

const total = ref<TotalAnalyseTypes.IResponse>({} as TotalAnalyseTypes.IResponse)

const getData = async () => {
  const res = await totalAnalyse({})
  total.value = res
}

onMounted(() => {
  getData()
})
</script>

<template>
  <section class="text-gray-600 body-font statistic-total">
    <div class="container px-5 pt-20 pb-24 mx-auto">
      <div class="flex flex-wrap -m-4 text-center">
        <div class="p-4 sm:w-1/3 w-1/3">
          <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {{ total.log_num ?? 0 }}
          </h2>
          <p class="leading-relaxed">{{ $t('statistic.total.logNum') }}</p>
        </div>
        <div class="p-4 sm:w-1/3 w-1/3">
          <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {{ total.single_call_num ?? 0 }}
          </h2>
          <p class="leading-relaxed">{{ $t('statistic.total.singleCallNum') }}</p>
        </div>
        <div class="p-4 sm:w-1/3 w-1/3">
          <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {{ total.award_num ?? 0 }}
          </h2>
          <p class="leading-relaxed">{{ $t('statistic.total.awardNum') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
