<!--
 * @Description: 赞助鸣谢
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-27
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-27
-->
<script lang="ts" setup>
import Item from './components/item.vue'
defineOptions({ name: 'AcknowledgementPage' })

const acknowledgementList = reactive([
  {
    year: 2023,
    list: [
      {
        name: '八重洲电子设备科技(上海)有限公司'
      },
      {
        name: '天津市无线电协会'
      },
      {
        name: '四川省无线电协会'
      },
      {
        name: 'FlexRadio'
      },
      {
        name: '哈罗CQ火腿社区'
      },
      {
        name: 'HamZone社区'
      },
      {
        name: '北京世纪金宇通讯设备有限公司'
      }
    ]
  },
  {
    year: 2022,
    list: [
      {
        name: '八重洲电子设备科技（上海）有限公司'
      },
      {
        name: 'FlexRadio'
      },
      {
        name: '哈罗CQ火腿社区'
      },
      {
        name: '重庆协谷科技有限公司'
      },
      {
        name: '北京世纪金宇通讯设备有限公司'
      }
    ]
  }
])
</script>

<template>
  <section class="text-gray-600 body-font overflow-hidden acknowledgement">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
        {{ $t('acknowledgement.title') }}
      </h1>
    </div>

    <template v-for="item in acknowledgementList" :key="item.year">
      <Item :formData="item" />
    </template>
  </section>
</template>

<style lang="scss" scoped>
.acknowledgement {
  margin: 0;
}
</style>
