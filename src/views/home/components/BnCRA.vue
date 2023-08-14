<!--
 * @Description: BnCRA
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-14
-->
<script lang="ts" setup>
import { ElOption, ElSelect } from 'element-plus'

import BnCRATableVue from './BnCRATable.vue'

defineOptions({ name: 'BnCRA' })

const select = ref('B0CRA')
const options = reactive([
  {
    id: '',
    name: '全部(0)'
  },
  {
    id: 'B0CRA',
    name: 'B0CRA(0)'
  },
  {
    id: 'B1CRA',
    name: 'B1CRA(0)'
  },
  {
    id: 'B2CRA',
    name: 'B2CRA(0)'
  },
  {
    id: 'B3CRA',
    name: 'B3CRA(0)'
  },
  {
    id: 'B4CRA',
    name: 'B4CRA(0)'
  },
  {
    id: 'B5CRA',
    name: 'B5CRA(0)'
  },
  {
    id: 'B6CRA',
    name: 'B6CRA(0)'
  },
  {
    id: 'B7CRA',
    name: 'B7CRA(0)'
  },
  {
    id: 'B8CRA',
    name: 'B8CRA(0)'
  },
  {
    id: 'B9CRA',
    name: 'B9CRA(0)'
  }
])
</script>

<template>
  <section class="body-font bn-cra">
    <BnCRATableVue />

    <div class="rounded mx-auto mt-4 py-3 bn-cra-nav">
      <!-- <p class="text-gray-500">请选择您的通联地区</p> -->
      <!-- Tabs -->
      <ul id="tabs" class="flex justify-center nav nav-pills md:flex-row list-none pl-0 mb-4">
        <li
          :class="[
            'mt-4 inline-flex border-0 py-2 md:mr-2 px-3 focus:outline-none hover:bg-indigo-600 hover:text-white rounded ',
            select == i.id ? 'text-white bg-indigo-500' : ''
          ]"
          v-for="i in options"
          :key="i.id"
        >
          <span>{{ i.name }}</span>
        </li>
      </ul>

      <ElSelect class="bncra-select" v-model="select" placeholder="Select" size="large">
        <ElOption v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
      </ElSelect>

      <BnCRATableVue />
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

@media screen and (width <= 768px) {
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
