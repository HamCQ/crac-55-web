<!--
 * @Description: 全部排行
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-20
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-21
-->
<script lang="ts" setup>
import { ElPagination, ElTable } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { allRankAnalyse } from '@/api/55/analyse'
import { RANKING_TYPE } from '@/enum/rankingEnum'
import { useQueryWithPagination } from '@/hooks/usePage'

defineOptions({ name: 'RankingPage' })

const route = useRoute()
const { query } = route

const queryData = reactive({
  year: (query?.year as string) ?? '',
  type: (query?.type as string) ?? ''
})

const { limit, list, loading, getList, handlePageChange, handleSizeChange } =
  useQueryWithPagination<AllRankAnalyseTypes.IRequest, AllRankAnalyseTypes.IResponse>(
    queryData,
    allRankAnalyse
  )

onMounted(() => {
  getList()
})

const { t } = useI18n()

/** 标题 */
const rankingTitle: Record<string, any> = computed(() => ({
  [RANKING_TYPE.CN_DIFF_CRA]: {
    name: `${t('statistic.ranking.China')} - ${t('statistic.ranking.distinguish')}`,
    type: RANKING_TYPE.CN_DIFF_CRA
  },
  [RANKING_TYPE.CN_CRA]: {
    name: `${t('statistic.ranking.China')} - ${t('statistic.ranking.indistinguishable')}`,
    type: RANKING_TYPE.CN_CRA
  },
  [RANKING_TYPE.GLOBLE_DIFF_CRA]: {
    name: `${t('statistic.ranking.international')} - ${t('statistic.ranking.distinguish')}`,
    type: RANKING_TYPE.GLOBLE_DIFF_CRA
  },
  [RANKING_TYPE.GLOBLE_CRA]: {
    name: `${t('statistic.ranking.international')} - ${t('statistic.ranking.indistinguishable')}`,
    type: RANKING_TYPE.GLOBLE_CRA
  }
}))
</script>

<template>
  <div class="ranking">
    <h1 class="text-2xl text-center tracking-widest title-font mb-1 font-medium">
      {{ query.type ? rankingTitle[query.type as any]?.name : '' }}
    </h1>
    <div class="text-base text-right text-gray-500 mt-3">
      <span>更新时间：2023-8-20 23:30:37</span>
      <span class="ml-10">总数：2330</span>
    </div>

    <div>
      <ElTable
        class="mt-10"
        :data="list"
        stripe
        style="width: 100%"
        v-loading="loading"
        :limit="limit"
      >
        <el-table-column type="index" label="#" />
        <el-table-column prop="callsign" label="呼号" align="center" />
        <el-table-column prop="score" label="得分" align="center" />
      </ElTable>
      <div class="mt-5 flex justify-end">
        <ElPagination
          v-model:currentPage="limit.page"
          v-model:pageSize="limit.page_size"
          layout="total, prev, pager, next"
          :total="limit.total"
        />
      </div>
    </div>
  </div>
</template>
