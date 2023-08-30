<!--
 * @Description: 首页排行
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-26
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-29
-->

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { LANGUAGE_TYPE, useGlobalState } from '@/store/global'
import { useHomeStore } from '@/store/home'

defineOptions({ name: 'HomeRank' })

const { searchData } = useHomeStore()!
const { t } = useI18n()
const { language } = useGlobalState()

const state = computed(() => {
  const { rank_info } = searchData.value ?? {}
  const obj = {
    cra:
      language.value == LANGUAGE_TYPE.CHINESE ? `第 ${rank_info.cra} 名` : `No. ${rank_info.cra}`,
    diff_cra:
      language.value == LANGUAGE_TYPE.CHINESE
        ? `第 ${rank_info.diff_cra} 名`
        : `No. ${rank_info.diff_cra}`,
    diff_text: `${t('statistic.ranking.international')} - ${t('statistic.ranking.distinguish')}`,
    text: `${t('statistic.ranking.international')} - ${t('statistic.ranking.indistinguishable')}`
  }

  // 如果为中国区
  if (rank_info?.is_cn) {
    obj.diff_text = `${t('statistic.ranking.China')} - ${t('statistic.ranking.distinguish')}`
    obj.text = `${t('statistic.ranking.China')} - ${t('statistic.ranking.indistinguishable')}`
  }
  return obj
})
</script>

<template>
  <section class="text-gray-600 body-font statistic-total">
    <div class="container px-5 pt-20 pb-20 mx-auto">
      <div class="flex flex-wrap -m-4 text-center">
        <div class="p-4 w-full sm:w-1/2">
          <h2 class="title-font font-medium sm:text-3xl text-2xl text-gray-900">
            {{ state.diff_cra }}
          </h2>
          <p class="leading-relaxed">{{ state.diff_text }}</p>
        </div>
        <div class="p-4 w-full sm:w-1/2">
          <h2 class="title-font font-medium sm:text-3xl text-2xl text-gray-900">{{ state.cra }}</h2>
          <p class="leading-relaxed">{{ state.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
