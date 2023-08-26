<!--
 * @Description: 总部电台上线状态
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-26
-->
<script lang="ts" setup>
defineOptions({ name: 'OnlineStatus' })
import { useIntervalFn, useTimeoutFn } from '@vueuse/shared'
import { ElOption, ElSelect } from 'element-plus'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { slot } from '@/api/55/slot'

//import BnCRATableVue from '@/components/BnCRATable/BnCRATable.vue'
import BnCRATableVue from './components/BnCRATable.vue'

const slotRes = ref<Slot55V1Types.IResponse>({} as Slot55V1Types.IResponse)

const getData = async () => {
  const res = await slot()
  slotRes.value = res
}

onMounted(() => {
  getData()
})

const select = ref('B0CRA')
const options = reactive<{
  [x: string]: {
    name: string
    value: Slot55V1Types.IResponse
  }
}>({
  all: {
    name: '全部',
    value: {} as any
  },
  B0CRA: {
    name: 'B0CRA',
    value: {} as any
  },
  B1CRA: {
    name: 'B1CRA',
    value: {} as any
  },
  B2CRA: {
    name: 'B2CRA',
    value: {} as any
  },
  B3CRA: {
    name: 'B3CRA',
    value: {} as any
  },
  B4CRA: {
    name: 'B4CRA',
    value: {} as any
  },
  B5CRA: {
    name: 'B5CRA',
    value: {} as any
  },
  B6CRA: {
    name: 'B6CRA',
    value: {} as any
  },
  B7CRA: {
    name: 'B7CRA',
    value: {} as any
  },
  B8CRA: {
    name: 'B8CRA',
    value: {} as any
  },
  B9CRA: {
    name: 'B9CRA',
    value: {} as any
  }
})

const optionsRefs = toRefs(options)

watchEffect(() => {
  if (Array.isArray(slotRes.value)) {
    slotRes.value.forEach((n) => {
      if (n.callsign_station) {
        optionsRefs[n.callsign_station].value.value = n
      }
    })

    optionsRefs.all.value = {
      value: slotRes.value.map((n) => n.score).reduce((a, b) => a + b)
    } as any
  }
})

const showList = computed(() => {
  if (select.value == 'all') {
    return Object.keys(options)
      .filter((n) => n !== 'all')
      .map((n) => options[n].value)
  }
  return [options[select.value].value ?? {}]
})

// 自动刷新
const selectedInterval = ref(0)

// 倒计时执行
const { start, stop } = useTimeoutFn(
  async () => {
    await getData()
    start()
  },
  selectedInterval,
  {
    immediate: false
  }
)

// 监听刷新时间变化
watch(selectedInterval, (newValue) => {
  const interval = Number(newValue)
  if (interval > 0) {
    stop()
    start()
  } else {
    stop()
  }
})

onUnmounted(() => {
  stop()
})
const { t } = useI18n()

const intervalOptions = computed(() => [
  {
    title: t('onlineSlot.refrashTime.0'),
    value: 0
  },
  {
    title: t('onlineSlot.refrashTime.1'),
    value: 1 * 60 * 1000
  },
  {
    title: t('onlineSlot.refrashTime.5'),
    value: 5 * 60 * 1000
  },
  {
    title: t('onlineSlot.refrashTime.10'),
    value: 10 * 60 * 1000
  }
])
</script>

<template>
  <div class="text-center mb-20">
    <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
      {{ $t('onlineSlot.title') }}
    </h1>
    <div class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
      <label for="refreshInterval">{{ $t('onlineSlot.refrash') }}</label>
      <ElSelect v-model="selectedInterval" id="refreshInterval" style="width: 150px">
        <ElOption
          v-for="item in intervalOptions"
          :key="item.value"
          :label="item.title"
          :value="item.value"
          >{{ item.title }}</ElOption
        >
      </ElSelect>
    </div>
  </div>
  <div class="online-status">
    <section class="body-font bn-cra">
      <div class="rounded mx-auto mt-4 py-3 bn-cra-nav">
        <!-- Tabs -->
        <ul id="tabs" class="flex justify-center nav nav-pills md:flex-row list-none pl-0 mb-4">
          <li
            :class="[
              'mt-4 inline-flex border-0 py-2 md:mr-2 px-3 focus:outline-none hover:bg-indigo-600 hover:text-white rounded ',
              select == key ? 'text-white bg-indigo-500' : ''
            ]"
            v-for="(item, key) in options"
            :key="key"
            @click="() => (select = key as string)"
          >
            <span>{{
              `${key == 'all' ? $t('home.bncra.all') : item.name}(${
                key == 'all'
                  ? item.value instanceof Number
                    ? item.value
                    : 0
                  : item.value?.score ?? 0
              })`
            }}</span>
            <!-- <span> {{ item }}</span>  -->
          </li>
        </ul>

        <ElSelect class="bncra-select" v-model="select" placeholder="Select" size="large">
          <ElOption
            v-for="(item, key) in options"
            :key="key"
            :label="`${key == 'all' ? $t('home.bncra.all') : item.name}(${
              key == 'all'
                ? item.value instanceof Number
                  ? item.value
                  : 0
                : item.value?.score ?? 0
            })`"
            :value="key"
          />
        </ElSelect>
        <BnCRATableVue v-for="(item, key) in showList" :key="key" :formData="item" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.online-status {
  margin: 0;
}

.bn-cra {
  #tabs {
    > li {
      cursor: pointer;
    }
  }

  .bncra-select {
    display: none;
  }
}

/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 992px) {
  .bn-cra {
    max-width: 100vw;
    overflow: hidden;

    .bn-cra-nav {
      width: fit-content;
      padding-top: 0;
      margin-top: 0;
      overflow-x: auto;

      #tabs {
        display: none;
      }

      .bncra-select {
        display: flex;
      }
    }
  }
}
</style>
