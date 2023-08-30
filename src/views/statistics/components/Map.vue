<!--
 * @Description: 地图
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-19
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-30
-->
<script lang="tsx" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { useElementSize, useMediaQuery, useScriptTag } from '@vueuse/core'

import { provinceAnalyse } from '@/api/55/analyse'

useScriptTag('https://a.amap.com/jsapi_demos/static/demo-center/data/china-pp.js')

defineOptions({ name: 'StatisticsMap' })

const isPhone = useMediaQuery('(max-width: 500px)')

const props = defineProps<{
  year?: string
}>()

// 地图实例
const map = shallowRef<any>(null)

const colors: any = {}

/**
 * 获取颜色
 */
const getColorByDGP = function (adcode: number) {
  if (!colors[adcode]) {
    const data = QSO.value[adcode]
    if (!data) {
      colors[adcode] = 'rgb(227,227,227)'
    } else {
      if (data == 0) {
        colors[adcode] = 'rgb(255, 255, 255)'
      }
      if (data > 0 && data <= 500) {
        colors[adcode] = 'rgb(213, 214, 252)'
      }
      if (data > 500 && data <= 1000) {
        colors[adcode] = 'rgb(152, 156, 248)'
      }
      if (data > 1000 && data <= 1500) {
        colors[adcode] = 'rgb(100, 108, 246)'
      }
      if (data > 1500 && data <= 2000) {
        colors[adcode] = 'rgb(73, 85, 245)'
      }
      if (data > 2000) {
        colors[adcode] = 'rgb(0, 38, 245)'
      }
    }
  }
  return colors[adcode]
}
/**
 * 初始化地图
 */
const initMap = () => {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale', 'AMap.ToolBar'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      const disCountry = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: 'CHN',
        depth: 1,
        styles: {
          'nation-stroke': '#f09',
          'coastline-stroke': [0.85, 0.63, 0.94, 1],
          'province-stroke': 'white',
          'city-stroke': 'rgba(255,255,255,0.05)',
          fill: function (props: any) {
            // console.log(props)
            return getColorByDGP(props.adcode_pro)
          }
        }
      })

      map.value = new AMap.Map('container', {
        center: [104.188488, 36.302032],
        expandZoomRange: true,
        zoom: isPhone.value ? 3 : 4,
        zooms: isPhone.value ? [3, 6] : [4, 6],
        layers: [disCountry],
        showLabel: true,
        isHotspot: false,
        viewMode: '3D'
      })

      map.value.addControl(new AMap.Scale())
      map.value.addControl(new AMap.ToolBar({ liteStyle: true }))

      // 省份名称标注
      map.value.on('complete', function () {
        var layer = new AMap.LabelsLayer({
          // 开启标注避让，默认为开启，v1.4.15 新增属性
          collision: false,
          // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
          animation: true
        })
        // @ts-ignore
        for (var i = 0; i < LabelsData.length; i++) {
          // @ts-ignore
          var labelsMarker = new AMap.LabelMarker(LabelsData[i])
          layer.add(labelsMarker)
        }
        map.value.add(layer)
      })
      // 绑定点击事件
      map.value.on('click', function (event: any) {
        onDisCountryClick(event, AMap, disCountry)
      })
    })
    .catch((e) => {
      console.log(e)
    })
}

/**
 * 打开信息窗体
 */
const openInfo = (e: any, props: any, AMap: any) => {
  const info = []
  info.push("<div class='input-card content-window-card'>")
  info.push('<div style="padding:7px 0px 0px 0px;"><h4>' + props.NAME_CHN + '</h4>')
  info.push("<p class='input-item'>QSO: " + QSO.value[props.adcode_pro] + '</p>')
  info.push('</div></div>')

  const infoWindow = new AMap.InfoWindow({
    content: info.join(''), //使用默认信息窗体框样式，显示信息内容,
    closeWhenClickMap: true
  })

  infoWindow.open(map.value, [e.lnglat.getLng(), e.lnglat.getLat()])
}

/**
 * 绑定点击事件
 */
const onDisCountryClick = (ev: any, AMap: any, disCountry: any) => {
  const px = ev.pixel
  // 拾取所在位置的行政区
  const props = disCountry.getDistrictByContainerPos(px)
  if (!props) {
    return
  }
  if (props.SOC != 'CHN') {
    return
  }
  openInfo(ev, props, AMap)
}

const loading = ref(false)
const QSO = ref<Record<string, number>>({})

/**
 * 获取数据列表
 */
const getList = async () => {
  loading.value = true
  try {
    const res = await provinceAnalyse({
      year: props.year ?? ''
    })
    QSO.value = res.reduce((acc: any, curr) => {
      acc[curr.cn_region_code + '0000'] = curr.qso_num
      return acc
    }, {})

    nextTick(() => {
      initMap()
    })
  } finally {
    loading.value = false
  }
}

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
onUnmounted(() => {
  map.value?.destroy?.()
})

// 监听窗口变化
const statisticsMapWrap = ref()
const { width } = useElementSize(statisticsMapWrap)
watch(width, () => {
  map.value?.resize()
  map.value?.setZoom(isPhone.value ? 3 : 4)
})
</script>

<template>
  <section class="text-gray-600 body-font statistics-map">
    <div
      class="container px-5 mt-10 mb-10 mx-auto statistics-map-wrap"
      v-loading="loading"
      ref="statisticsMapWrap"
    >
      <div id="container" class="shadow-lg amap-container statistics-map-container"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.statistics-map {
  .statistics-map-wrap {
    width: 1100px;
    max-width: 100%;
    height: 600px;
    margin: 0 auto;
  }

  .statistics-map-container {
    width: 100%;
    height: 100%;
    cursor: default;
    background-color: rgb(247 247 247);
  }
}
</style>
