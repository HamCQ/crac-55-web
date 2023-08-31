<!--
 * @Description: 每年赞助商
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-27
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-31
-->
<script lang="ts" setup>
import { ElCard } from 'element-plus'

import { LANGUAGE_TYPE, useGlobalState } from '@/store/global'

defineOptions({ name: 'AcknowledgementItem' })

interface Props {
  formData: {
    year: number
    list: { name: string; url: string }[]
  }
}

defineProps<Props>()

const { language } = useGlobalState()

const onClick = (item: Props['formData']['list'][0]) => {
  if (item.url) {
    window.open(item.url, '_blank')
  }
}
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h2 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
        {{
          language === LANGUAGE_TYPE.CHINESE
            ? `${formData.year}${$t('acknowledgement.sponsors')}`
            : `${$t('acknowledgement.sponsors')}${formData.year}`
        }}
      </h2>
      <ul class="grid acknowledgement-list">
        <li class="leading-relaxed" v-for="item in formData.list" :key="item.name">
          <ElCard class="cursor-pointer" shadow="hover" @click="onClick(item)">{{
            item.name
          }}</ElCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.acknowledgement-list {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
