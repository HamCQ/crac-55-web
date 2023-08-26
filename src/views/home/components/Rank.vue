<!--
 * @Description: 首页排行
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-26
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-27
-->

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { totalAnalyse } from '../../../api/55/analyse'

defineOptions({ name: 'HomeRank' })

const total = ref<TotalAnalyseTypes.IResponse>({} as TotalAnalyseTypes.IResponse)
const props = defineProps<{ year: string }>()
const getData = async () => {
  const res = await totalAnalyse({ year: props.year ?? '' })
  total.value = res
}

onMounted(() => {
  getData()
})
</script>

<template>
  <section class="text-gray-600 body-font statistic-total">
    <div class="container px-5 pt-20 pb-20 mx-auto">
      <div class="flex flex-wrap -m-4 text-center">
        <div class="p-4 w-full sm:w-1/2">
          <h2 class="title-font font-medium sm:text-3xl text-2xl text-gray-900">第 1 名</h2>
          <p class="leading-relaxed">中国电台 - 区分 CRA 电台</p>
        </div>
        <div class="p-4 w-full sm:w-1/2">
          <h2 class="title-font font-medium sm:text-3xl text-2xl text-gray-900">第 1 名</h2>
          <p class="leading-relaxed">中国电台 - 不区分 CRA 电台</p>
        </div>
      </div>
    </div>
  </section>
</template>
