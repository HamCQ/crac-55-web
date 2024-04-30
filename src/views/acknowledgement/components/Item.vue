<!--每年赞助商-->
<script lang="ts" setup>
import { ElCard } from 'element-plus'

import { LANGUAGE_TYPE, useGlobalState } from '@/store/global'

defineOptions({ name: 'AcknowledgementItem' })

interface Props {
  formData: {
    year: number
    list: {
      name: string
      url?: string
      /** 是否弹窗 */
      popup?: {
        /** 弹窗内容 */
        text?: string
        /** 弹窗图片 */
        img?: string
      }
    }[]
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
          <el-popover v-if="item.popup" placement="top" :width="230" trigger="hover" effect="dark">
            <template #reference>
              <ElCard class="cursor-pointer" shadow="hover" @click="onClick(item)">
                {{ item.name }}
              </ElCard>
            </template>
            <el-image v-if="item.popup?.img" :src="item.popup?.img"></el-image>
            <span v-else>{{ item.popup?.text ?? item.name }}</span>
          </el-popover>

          <ElCard v-else class="cursor-pointer" shadow="hover" @click="onClick(item)">
            {{ item.name }}
          </ElCard>
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
