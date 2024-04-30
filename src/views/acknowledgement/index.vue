<!--赞助鸣谢-->
<script lang="ts" setup>
import Item from './components/Item.vue'
defineOptions({ name: 'AcknowledgementPage' })
type AcknowledgementListType = {
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
}[]

const acknowledgementList = reactive<AcknowledgementListType>([
  {
    year: 2024,
    list: [
      {
        name: '八重洲电子设备科技(上海)有限公司',
        url: 'http://www.yaesu.com.cn/'
      },
      {
        name: '深圳市业余无线电协会',
        popup: {
          text: '公众号：深圳市业余无线电协会'
        }
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
        name: '西安无线电通信学会',
        popup: {
          text: '公众号：西安无线电通信学会'
        }
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
        name: 'HamCQ社区',
        url: 'https://forum.hamcq.cn'
      },
      {
        name: '北京世纪金宇通讯设备有限公司',
        url: 'http://sjjywxd.com/index.html'
      },
      {
        name: '重庆国赫电子科技有限公司',
        url: 'https://www.guohedz.com'
      }
    ]
  },
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
