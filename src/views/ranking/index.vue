<!--
 * @Description: 全部排行
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-20
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-30
-->
<script lang="ts" setup>
import { Return } from '@icon-park/vue-next'
import { useMediaQuery } from '@vueuse/core'
import { dayjs, ElButton, ElPagination, ElTable } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { allRankAnalyse } from '@/api/55/analyse'
import { RANKING_TYPE } from '@/enum/rankingEnum'
import { useQueryWithPagination } from '@/hooks/usePage'
import { useConfigState } from '@/store/config'

defineOptions({ name: 'RankingPage' })

const isPhone = useMediaQuery('(max-width: 500px)')

const route = useRoute()
const { query } = route
const { currentYear } = useConfigState()

const queryData = reactive({
  year: currentYear.value ?? '',
  type: (query?.type as string) ?? ''
})

const { limit, list, loading, getList } = useQueryWithPagination<
  AllRankAnalyseTypes.IRequest,
  AllRankAnalyseTypes.IResponse
>(queryData, allRankAnalyse)

onMounted(() => {
  getList()
})

const updateTime = ref()
const rankingList = ref<AllRankAnalyseTypes.IResponse[]>([])
watch(list, (val) => {
  if (limit.page == 1) {
    if (val[0]?.callsign == 'update_time' && val[0]?.score) {
      updateTime.value = parseInt(val[0].score + '000')
    }
    rankingList.value = val.slice(1)
  } else {
    rankingList.value = val
  }
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

const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="ranking">
    <h1 class="text-2xl text-center tracking-widest title-font mb-1 font-medium">
      {{ currentYear }} {{ query.type ? rankingTitle[query.type as any]?.name : '' }}
    </h1>
    <div class="flex justify-between items-center mt-3 ranking-sub-title">
      <ElButton class="ranking-back" text :icon="Return" @click="goBack">{{
        t('ranking.back')
      }}</ElButton>
      <div class="flex justify-end text-base text-gray-500 ranking-sub-title-right">
        <span
          >{{ $t('ranking.updateTime') }}
          {{ updateTime ? dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss') : '--' }}</span
        >
        <span class="ml-10 ranking-total">{{ $t('ranking.total') }} {{ limit.total - 1 }}</span>
      </div>
    </div>

    <div>
      <ElTable
        class="mt-5"
        :data="rankingList"
        stripe
        style="width: 100%"
        v-loading="loading"
        :limit="limit"
      >
        <el-table-column type="index" label="#" width="80">
          <template #default="scope">
            {{ scope.$index + 1 + (limit.page - 1) * limit.page_size - (limit.page > 1 ? 1 : 0) }}
          </template>
        </el-table-column>
        <el-table-column prop="callsign" :label="$t('ranking.callSign')" align="center" />
        <el-table-column prop="score" :label="$t('ranking.points')" align="center" />
      </ElTable>
      <div :class="['mt-5 flex', isPhone ? 'justify-center' : 'justify-end']">
        <ElPagination
          v-model:currentPage="limit.page"
          v-model:pageSize="limit.page_size"
          :pager-count="5"
          :layout="isPhone ? 'total, prev, pager, next' : 'total, prev, pager, next, jumper'"
          :total="limit.total"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 992px) {
  .ranking-sub-title {
    justify-content: center;
  }

  .ranking-back {
    display: none;
  }
}
/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 430px) {
  .ranking-sub-title-right {
    flex-direction: column;
    justify-content: center;

    .ranking-total {
      margin: 10px 0 0;
      text-align: center;
    }
  }
}
</style>
