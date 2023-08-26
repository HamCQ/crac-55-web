<!--
 * @Description: BnCRA 电台通联统计
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-19
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-26
-->
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

defineOptions({ name: 'BnCRATotal' })

const isLargeScreen = useMediaQuery('(min-width: 992px)')
const { width } = useWindowSize()

const props = defineProps<{
  loading: boolean
  state: BncraBarchartAnalyseTypes.IResponse
}>()

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
      'B0CRA',
      'B1CRA',
      'B2CRA',
      'B3CRA',
      'B4CRA',
      'B5CRA',
      'B6CRA',
      'B7CRA',
      'B8CRA',
      'B9CRA'
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
        dimensions: ['callsign_station', 'phone_num', 'cw_num', 'digi_num'],
        source: props.state as any
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

onMounted(() => {
  if (chartBy09.value) {
    myChart = echarts.init(chartBy09.value)
  }
})
</script>

<template>
  <section class="text-gray-600 body-font by-station-total">
    <div class="flex flex-col text-center w-full">
      <h1 class="sm:text-4xl text-3xl font-medium title-font text-gray-900 mt-20">
        {{ $t('statistic.BnCRATotal.title') }}
      </h1>
    </div>
    <div class="container px-5 mt-10 mb-10 mx-auto" v-loading="loading">
      <div ref="chartBy09" class="p-10 chart-by09"></div>
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
