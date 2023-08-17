<!--
 * @Description: BnCRA
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-17
-->
<script lang="ts" setup>
import { ElOption, ElSelect } from 'element-plus'

import BnCRATableVue from '@/components/BnCRATable/BnCRATable.vue'
import { useHomeStore } from '@/store/home'
defineOptions({ name: 'BnCRA' })

const { searchData } = useHomeStore()!

const select = ref('B0CRA')
const options = reactive<{
  [x: string]: {
    name: string
    value: Search55V1Types.IResponse['bxcra'][0]
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

watchEffect(() => {
  searchData.value?.bxcra?.forEach((n) => {
    if (n.callsign_station) {
      options[n.callsign_station].value = n
    }
  })
  options.all.value = {
    score: searchData.value?.bxcra?.map((n) => n.score).reduce((a, b) => a + b)
  } as any
})

const showList = computed(() => {
  if (select.value == 'all') {
    return Object.keys(options)
      .filter((n) => n !== 'all')
      .map((n) => options[n].value)
  }
  return [options[select.value].value ?? {}]
})
</script>

<template>
  <section class="body-font bn-cra">
    <BnCRATableVue :formData="searchData.bncra" />

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
            `${key == 'all' ? $t('home.bncra.all') : item.name}(${item.value?.score ?? 0})`
          }}</span>
        </li>
      </ul>

      <ElSelect class="bncra-select" v-model="select" placeholder="Select" size="large">
        <ElOption
          v-for="(item, key) in options"
          :key="key"
          :label="`${key == 'all' ? $t('home.bncra.all') : item.name}(${item.value?.score ?? 0})`"
          :value="key"
        />
      </ElSelect>

      <BnCRATableVue v-for="(item, key) in showList" :key="key" :formData="item" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
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
