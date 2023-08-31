<!--
 * @Description: 赞助鸣谢
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-27
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-31
-->
<script lang="ts" setup>
import Item from './components/Item.vue'
defineOptions({ name: 'AcknowledgementPage' })

const acknowledgementList = reactive([
  {
    year: 2023,
    list: [
      {
        name: '八重洲电子设备科技(上海)有限公司',
        url: 'http://www.yaesu.com.cn/'
      },
      {
        name: '天津市无线电协会',
        url: 'http://www.tjara.org/'
      },
      {
        name: '四川省无线电协会',
        url: 'http://www.scraa.org.cn/'
      },
      {
        name: 'FlexRadio',
        url: 'https://www.flexradio.com/'
      },
      {
        name: '哈罗CQ火腿社区',
        url: 'https://www.hellocq.net/forum/index.php'
      },
      {
        name: 'HamZone社区',
        url: 'https://forum.hamcq.cn'
      },
      {
        name: '北京世纪金宇通讯设备有限公司',
        url: 'http://sjjywxd.com/index.html'
      }
    ]
  },
  {
    year: 2022,
    list: [
      {
        name: '八重洲电子设备科技（上海）有限公司',
        url: 'http://www.yaesu.com.cn/'
      },
      {
        name: 'FlexRadio',
        url: 'https://www.flexradio.com/'
      },
      {
        name: '哈罗CQ火腿社区',
        url: 'https://www.hellocq.net/forum/index.php'
      },
      {
        name: '重庆协谷科技有限公司',
        url: 'https://www.cqxiegu.com/'
      },
      {
        name: '北京世纪金宇通讯设备有限公司',
        url: 'http://sjjywxd.com/index.html'
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
