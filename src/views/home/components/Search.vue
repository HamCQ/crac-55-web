<!--
 * @Description: 搜索模块
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-31
-->
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import DatePickerYear from '@/components/DatePickerYear/DatePickerYear.vue'
import { useConfigState } from '@/store/config'
import { LANGUAGE_TYPE, useGlobalState } from '@/store/global'
import { useHomeStore } from '@/store/home'

defineOptions({ name: 'HomeSearch' })

const homeStore = useHomeStore()!

const { config } = useConfigState()
const { language } = useGlobalState()
const { t } = useI18n()

const onSearch = () => {
  if (!homeStore.searchQuery.callsign?.trim()) {
    ElMessage.warning(t('home.searchPlaceholder'))
    return
  }
  homeStore.onSearch({ callsign: homeStore.searchQuery.callsign })
}

const localConfig = computed(() => {
  let obj = {
    title: config.value?.title,
    sub_title: config.value?.sub_title
  }
  if (language.value === LANGUAGE_TYPE.ENGLISH) {
    obj = {
      title: config.value?.title_en,
      sub_title: config.value?.sub_title_en
    }
  }

  return obj
})
</script>

<template>
  <section class="text-gray-600 body-font home-search">
    <div
      class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center home-search-block"
    >
      <div
        class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
      >
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 hs-year">
          {{ localConfig.title }}
        </h1>
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 hs-title">
          {{ localConfig.sub_title }}
        </h1>
        <div class="flex w-full md:justify-start justify-center items-end hs-input-main">
          <div class="flex relative md:w-full lg:w-full xl:w-1/2 w-full hs-input-block">
            <DatePickerYear />
            <input
              type="text"
              :placeholder="$t('home.searchPlaceholder')"
              id="hero-field"
              name="callsign"
              class="ml-5 w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-purple-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              style="height: 40px"
              v-model="homeStore.searchQuery.callsign"
              @keyup.enter="onSearch"
            />
          </div>
          <button
            class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            @click="onSearch"
          >
            {{ $t('home.searchBtn') }}
          </button>
        </div>
        <p class="text-sm mt-2 text-gray-500 mb-8 w-full hs-tip">{{ $t('home.searchTip') }}</p>
      </div>

      <div class="lg:max-w-lg lg:w-full md:w-1/2 search-img">
        <img
          class="object-cover object-center rounded"
          alt="hero"
          :src="config.cover || '/img/2023.svg'"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#hero-field {
  margin-right: 20px;
}
/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 1280px) {
  .home-search {
    .home-search-block {
      width: 100%;
      padding: 0;

      .hs-input-main {
        flex-direction: column;
        align-items: center;
      }

      > .items-center {
        align-items: center;
        width: 100%;
        padding-right: 0;
        margin-right: 0;
        text-align: center;

        .hs-input-block {
          flex: 1;
          margin-top: 20px;

          #hero-field {
            margin-right: 0;
          }
        }

        button {
          padding-right: 20px;
          padding-left: 20px;
          margin-top: 20px;
          white-space: nowrap;
        }

        input {
          flex: 1;
        }
      }
    }

    .search-img {
      display: none;
    }
  }

  .hs-tip {
    margin-top: 20px;
  }
}
</style>
