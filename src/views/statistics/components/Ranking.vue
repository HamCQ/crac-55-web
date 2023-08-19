<!--
 * @Description: TOP5排行
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-17
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-17
-->
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { RANKING_TYPE } from '@/enum/rankingEnum'

import { top5RankAnalyse } from '../../../api/55/analyse'

defineOptions({ name: 'StatisticsRanking' })
const { t } = useI18n()
const props = defineProps<{
  year?: string
}>()

const ranking = ref<Top5RankAnalyseTypes.IResponse>({} as Top5RankAnalyseTypes.IResponse)

const rankingList = computed(() => ({
  cn_diff_cra: {
    name: `${t('statistic.ranking.China')} - ${t('statistic.ranking.distinguish')}`,
    value: ranking.value?.cn_diff_cra ?? [],
    type: RANKING_TYPE.CN_DIFF_CRA
  },
  cn_cra: {
    name: `${t('statistic.ranking.China')} - ${t('statistic.ranking.indistinguishable')}`,
    value: ranking.value?.cn_cra ?? [],
    type: RANKING_TYPE.CN_CRA
  },
  globle_diff_cra: {
    name: `${t('statistic.ranking.international')} - ${t('statistic.ranking.distinguish')}`,
    value: ranking.value?.globle_diff_cra ?? [],
    type: RANKING_TYPE.GLOBLE_DIFF_CRA
  },
  globle_cra: {
    name: `${t('statistic.ranking.international')} - ${t('statistic.ranking.indistinguishable')}`,
    value: ranking.value?.globle_cra ?? [],
    type: RANKING_TYPE.GLOBLE_CRA
  }
}))

const getData = async () => {
  const res = await top5RankAnalyse({ year: props.year ?? '' })
  ranking.value = res
}

onMounted(() => {
  getData()
})

const router = useRouter()
/**
 * 跳转排行列表
 */
const goto = (type: RANKING_TYPE) => {
  router.push('/ranking?type=' + type)
}
</script>

<template>
  <section class="text-gray-600 body-font overflow-hidden statistics-ranking">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
          {{ $t('statistic.ranking.title') }}
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
          {{ `${$t('statistic.ranking.updateTime')}${ranking.update_time ?? ''}` }}
        </p>
      </div>

      <div class="flex justify-center flex-wrap -m-4" id="country-tabs-contents">
        <div
          class="p-4 xl:w-1/4 md:w-1/2 w-full"
          :id="`rank${item.type}`"
          v-for="(item, key) in rankingList"
          :key="key"
        >
          <div
            class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden"
          >
            <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
              {{ item.name }}
            </h2>
            <p class="flex items-center text-gray-600 mb-2"></p>
            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-center">
                      <thead>
                        <tr>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">#</th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            {{ $t('statistic.ranking.callSign') }}
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            {{ $t('statistic.ranking.points') }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(i, index) in item.value" :key="i.callsign">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {{ index + 1 }}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {{ i.callsign ?? '' }}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {{ i.score ?? '' }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <p></p>

            <p class="text-xs text-gray-500 mt-3">
              <span class="float-right cursor-pointer" @click="goto(item.type)">
                {{ $t('statistic.ranking.more') }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
