<!--
 * @Description: BnCRA 电台通联模式比例
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-19
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-26
-->
<script lang="ts" setup>
import { useElementSize } from '@vueuse/core'
import type { PieSeriesOption } from 'echarts'
import { PieChart } from 'echarts/charts'
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

defineOptions({ name: 'ProportionModeItem' })

const props = defineProps<{
  formData: BncraBarchartAnalyseTypes.Item
}>()

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

type ECOption = ComposeOption<
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>

const chart = ref()
const chartBox = ref()
let myChart: any

const { width } = useElementSize(chartBox)

watch(width, () => {
  if (myChart) {
    myChart.resize()
  }
})
watchEffect(() => {
  // 设置echarts数据
  if (chart.value && myChart) {
    const option: ECOption = {
      legend: {
        left: 'center'
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        containLabel: false
      },
      tooltip: {
        show: true,
        formatter(params: any) {
          return `<div class="flex flex-col">
                      <div class="flex justify-between">
                        <span class="mr-3">${props.formData?.callsign_station ?? ''}</span>
                        <span>${params.percent}%</span>
                      </div>
                      <div class="flex justify-between">
                        <span>${params.marker}${params.data.name}</span>
                        <span>${params.data.value}</span>
                      </div>
                    </div>`
        }
      },
      dataset: {
        dimensions: ['callsign_station', 'phone_num', 'cw_num', 'digi_num'],
        source: props.formData as any
      },
      series: [
        {
          name: props.formData?.callsign_station ?? 'BnCRA',
          type: 'pie',
          radius: '50%',
          data: [
            {
              value: props.formData.phone_num ?? 0,
              name: 'PHONE',
              itemStyle: { color: 'rgb(75, 192, 192)' }
            },
            {
              value: props.formData?.cw_num ?? 0,
              name: 'CW',
              itemStyle: { color: 'rgb(255, 99, 132)' }
            },
            {
              value: props.formData?.digi_num ?? 0,
              name: 'DIGI',
              itemStyle: { color: 'rgb(101, 143, 241)' }
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: false
          }
        }
      ]
    }

    myChart.setOption(option)
  }
})

onMounted(() => {
  if (chart.value) {
    myChart = echarts.init(chart.value)
  }
})
</script>

<template>
  <div
    class="2xl:w-1/5 xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full p-4 w-full proportion-mode-item"
    ref="chartBox"
  >
    <div class="border-2 rounded-lg overflow-hidden">
      <div class="py-3 px-5 bg-gray-50">
        {{ formData?.callsign_station ?? '' }}({{ formData?.sum ?? 0 }})
      </div>
      <div class="pt-10 pl-5 pr-5 chart-container" ref="chart"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.proportion-mode-item {
  .chart-container {
    box-sizing: border-box;
    display: block;
    width: 269.5px;
    height: 269px;
    margin: 0 auto;
  }
}
</style>
