<script lang="ts" setup>
import { useMediaQuery, useWindowSize } from '@vueuse/core'
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption
} from 'echarts/charts'
import { BarChart } from 'echarts/charts'
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components'
import {
  // 数据集组件
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { by09BarchartAnalyse } from '../../../api/55/analyse'

defineOptions({ name: 'BYStationTotal' })

const isLargeScreen = useMediaQuery('(min-width: 992px)')
const { width } = useWindowSize()

const props = defineProps<{
  year?: string
}>()

const { t } = useI18n()

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

type ECOption = ComposeOption<
  | BarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>

const chartBy09 = ref()
let myChart: any

watch(width, () => {
  if (myChart) {
    myChart.resize()
  }
})
watchEffect(() => {
  // 设置echarts数据
  if (chartBy09.value && myChart) {
    const xAxis = [
      t('statistic.BYStationTotal.zone0'),
      t('statistic.BYStationTotal.zone1'),
      t('statistic.BYStationTotal.zone2'),
      t('statistic.BYStationTotal.zone3'),
      t('statistic.BYStationTotal.zone4'),
      t('statistic.BYStationTotal.zone5'),
      t('statistic.BYStationTotal.zone6'),
      t('statistic.BYStationTotal.zone7'),
      t('statistic.BYStationTotal.zone8'),
      t('statistic.BYStationTotal.zone9')
    ]

    const option: ECOption = {
      legend: {
        show: true
      },
      grid: {
        left: isLargeScreen.value ? '4%' : '11%',
        right: isLargeScreen.value ? '3%' : '10px'
      },
      tooltip: {
        show: true,
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: xAxis,
        splitLine: {
          show: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true
        }
      },
      dataset: {
        dimensions: ['by_code', 'phone_num', 'cw_num', 'digi_num'],
        source: formData.value
      },
      series: [
        {
          name: 'PHONE',
          type: 'bar',
          itemStyle: {
            color: 'rgb(75, 192, 192)'
          }
        },

        {
          name: 'CW',
          type: 'bar',
          itemStyle: {
            color: 'rgb(255, 99, 132)'
          }
        },
        {
          name: 'DIGI',
          type: 'bar',
          itemStyle: {
            color: 'rgb(101, 143, 241)'
          }
        }
      ]
    }

    myChart.setOption(option)
  }
})

const loading = ref(false)
const formData = ref<By09BarchartAnalyseTypes.IResponse>([])
/**
 * 获取数据
 */
const getList = async () => {
  loading.value = true
  try {
    const res = await by09BarchartAnalyse({ year: props.year ?? '' })
    formData.value = res
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (chartBy09.value) {
    myChart = echarts.init(chartBy09.value)
  }
})
watch(
  () => props.year,
  () => {
    if (props.year) {
      nextTick(() => {
        getList()
      })
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <section class="text-gray-600 body-font by-station-total">
    <div class="flex flex-col text-center w-full">
      <h1 class="sm:text-4xl text-3xl font-medium title-font text-gray-900">
        {{ $t('statistic.BYStationTotal.title') }}
      </h1>
    </div>
    <div class="container px-5 mt-10 mx-auto" v-loading="loading">
      <div id="chartBy09" ref="chartBy09" class="p-10 chart-by09"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.chart-by09 {
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 1496px;
  height: 580px;
}

@media screen and (max-width: 992px) {
  .by-station-total {
    .container {
      max-width: 100%;
      padding: 0;
      overflow: hidden;

      .chart-by09 {
        width: 100%;
        padding-right: 0;
        padding-left: 0;
      }
    }
  }
}
</style>
