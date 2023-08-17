<!--
 * @Description: 获奖
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-15
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2023-08-17
-->
<script lang="ts" setup>
import '@lottiefiles/lottie-player'

import { ElButton } from 'element-plus'
import { ElDialog } from 'element-plus'
import { ElImage } from 'element-plus'
import { onBeforeUnmount,onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '@/store/home'
const homeStore = useHomeStore()!

defineOptions({ name: 'HomeAward' })

const { searchData, searchQuery , awardData } = useHomeStore()!
const { t } = useI18n()

const awardMap = computed<Record<string, string> >(() =>({
  Gold: t('home.award.awardString.Gold'),
  Silver: t('home.award.awardString.Silver'),
  Bronze: t('home.award.awardString.Bronze')
}))

const VITE_LOTTIE = import.meta.env.VITE_LOTTIE

// 获取奖状信息
const onAward = () => {
  homeStore.onAward({ callsign: homeStore.searchQuery.callsign })
}

const awardDialogVisible = ref(false);

const clickAwardDialoge = () => {
  awardDialogVisible.value = true;
  //console.log("打开奖项对话框");
  onAward();
};

// 监测屏幕大小
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

</script>

<template>
  <p class="text-center py-4 mx-auto leading-relaxed text-base text-indigo-900 home-award">
    <lottie-player
      :src="`${VITE_LOTTIE}/${
        searchData?.award_info?.award_string?.toLocaleLowerCase() ?? 'gold'
      }_award.json`"
      background="transparent"
      speed="1.5"
      style="height: 150px"
      loop=""
      autoplay=""
    ></lottie-player>

    {{
      `${awardMap[searchData?.award_info?.award_string] ?? ''}(${
        searchData?.award_info?.continent === 'AS' ? t('home.award.continent.AS') : t('home.award.continent.OA')
      })`
    }}
    <a
      @click="clickAwardDialoge()"
      style="text-decoration: underline"
      >{{t('home.award.download')}}</a
    >

    <el-dialog
      :title="$t('home.award.download')" 
      v-model="awardDialogVisible"
      :width="windowWidth < 992 ? '80%' : '40%'" center>
      <!-- <span>{{ awardData.img_url }}</span> -->
      <el-image :src=awardData.img_url fit="contain" />
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-8 mx-auto">
            <div class="flex flex-wrap -m-4 text-center">
            <div class="p-4 sm:w-1/2 w-1/2">
                <h2 class="title-font font-medium text-3xl text-gray-900">{{ awardData.combination }}</h2>
                <p class="leading-relaxed">组合数</p>
            </div>
            <div class="p-4 sm:w-1/2 w-1/2">
                <h2 class="title-font font-medium text-3xl text-gray-900">{{ awardData.bncra_num }}</h2>
                <p class="leading-relaxed">BnCRA</p>
            </div>
        </div>
        </div>
      </section>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-8 mx-auto">
            <div class="flex flex-wrap -m-4 text-center">
            <div class="p-4 sm:w-1/2 w-1/2">
              <button
            class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
          <a :href="awardData.img_url_origin" target="_blank">{{ $t('home.award.ImgSave') }}</a>
          </button>
            </div>
            <div class="p-4 sm:w-1/2 w-1/2">
              <button
            class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
          <a target="_blank" :href="`/award?year=${searchQuery.year}&callsign=${searchQuery.callsign}`">
            {{ $t('home.award.Apply') }}</a>
          </button>
            </div>
        </div>
        </div>
      </section>
    </el-dialog>


  </p>
</template>

<style scoped lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
