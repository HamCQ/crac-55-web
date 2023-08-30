<!--
 * @Description: 历年活动
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-30
-->
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useConfigState } from '@/store/config'

defineOptions({ name: 'ArchivePage' })

interface ArchiveType {
  year: number
  title: string
}
const { t } = useI18n()
const list = computed<ArchiveType[]>(() => [
  {
    year: 2022,
    title: t('archive.years.2022.title')
  },
  {
    year: 2023,
    title: t('archive.years.2023.title')
  }
])

const router = useRouter()

const { changeYear } = useConfigState()

/**
 * 跳转首页
 */
const goHome = (item: ArchiveType) => {
  changeYear(item.year?.toString())
  router.push('/statistics')
}
</script>

<template>
  <div class="about-page">
    <div class="text-center mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
        {{ $t('archive.title') }}
      </h1>
    </div>

    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex flex-wrap">
        <div class="flex flex-wrap -m-4 flex-1">
          <div class="p-4 lg:w-1/2 md:w-full" v-for="item in list" :key="item.year">
            <div
              class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col"
            >
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">{{ item.year }}</h2>
                <p class="leading-relaxed text-base">
                  {{ item.title }}
                </p>
                <a
                  class="mt-3 text-indigo-500 inline-flex items-center cursor-pointer"
                  @click="goHome(item)"
                  >Go
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
