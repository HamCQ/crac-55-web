<!--
 * @Description: BnCRA 电台通联模式比例
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-19
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-19
-->
<script lang="ts" setup>
import ProportionModeItem from './ProportionModeItem.vue'

defineOptions({ name: 'ProportionMode' })

defineProps<{
  loading: boolean
  state: BncraBarchartAnalyseTypes.IResponse
}>()
</script>

<template>
  <section class="text-gray-600 body-font proportion-mode">
    <div class="flex flex-col text-center w-full">
      <h1 class="sm:text-4xl text-3xl font-medium title-font text-gray-900">
        <!-- BnCRA 电台通联模式比例 -->
        {{ $t('statistic.proportionMode.title') }}
      </h1>
    </div>
    <div class="container px-5 mt-10 mb-10 mx-auto">
      <div class="flex flex-wrap -m-4" v-loading="loading">
        <ProportionModeItem v-for="item in state" :key="item.callsign_station" :formData="item" />
      </div>
    </div>
  </section>
</template>
