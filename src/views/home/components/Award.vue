<!--
 * @Description: 获奖
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-15
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-15
-->
<script lang="ts" setup>
import '@lottiefiles/lottie-player'

import { useI18n } from 'vue-i18n'

import { useHomeStore } from '@/store/home'

defineOptions({ name: 'HomeAward' })

const { searchData, searchQuery } = useHomeStore()!
const { t } = useI18n()

const awardMap = computed<Record<string, string> >(() =>({
  Gold: t('home.award.awardString.Gold'),
  Silver: t('home.award.awardString.Silver'),
  Bronze: t('home.award.awardString.Bronze')
}))
</script>

<template>
  <p class="text-center py-4 mx-auto leading-relaxed text-base text-indigo-900 home-award">
    <lottie-player
      :src="`https://oss.hamcq.cn/static/lottie/icon/${
        searchData?.award_info?.award_string?.toLocaleLowerCase() ?? 'gold'
      }_award.json`"
      background="transparent"
      speed="1.5"
      style="height: 150px"
      loop=""
      autoplay=""
    ></lottie-player>

    {{
      `${awardMap[searchData?.award_info?.award_string] ?? ''}（${
        searchData?.award_info?.continent === 'AS' ? t('home.award.continent.AS') : t('home.award.continent.OA')
      }）`
    }}<a
      target="_blank"
      :href="`/award?year=${searchQuery.year}&callsign=${searchQuery.callsign}`"
      style="text-decoration: underline"
      >{{t('home.award.download')}}</a
    >
  </p>
</template>
