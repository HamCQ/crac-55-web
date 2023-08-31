<!--
 * @Description: 获奖
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-15
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-31
-->
<script lang="ts" setup>
import '@lottiefiles/lottie-player'

import { ElDialog } from 'element-plus'
import { ElImage } from 'element-plus'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '@/store/home'
const homeStore = useHomeStore()!

defineOptions({ name: 'HomeAward' })

const { searchData, searchQuery, awardData } = useHomeStore()!
const { t } = useI18n()

const awardMap = computed<Record<string, string>>(() => ({
  Gold: t('home.award.awardString.Gold'),
  Silver: t('home.award.awardString.Silver'),
  Bronze: t('home.award.awardString.Bronze')
}))

const VITE_LOTTIE = import.meta.env.VITE_LOTTIE
const awardString = computed(
  () =>
    `${VITE_LOTTIE}/${
      // 如果银牌、铜牌图标有了，使用这里动态修改
      // searchData.value?.award_info?.award_string?.toLocaleLowerCase() ?? 'gold'
      'gold'
    }_award.json`
)

// 获取奖状信息
const onAward = () => {
  homeStore.onAward({ callsign: homeStore.searchQuery.callsign })
}

const awardDialogVisible = ref(false)

const clickAwardDialoge = () => {
  awardDialogVisible.value = true
  //console.log("打开奖项对话框");
  onAward()
}

// 监测屏幕大小
const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <p class="text-center py-4 mx-auto leading-relaxed text-base text-indigo-900 home-award">
    <lottie-player
      :src="awardString"
      background="transparent"
      speed="1.5"
      style="height: 150px"
      loop=""
      autoplay=""
    ></lottie-player>

    {{
      `${awardMap[searchData?.award_info?.award_string] ?? ''}（${
        searchData?.award_info?.continent === 'AS'
          ? t('home.award.continent.AS')
          : t('home.award.continent.OA')
      }）`
    }}<a @click="clickAwardDialoge()" class="award-down">{{ t('home.award.download') }}</a>

    <el-dialog
      title=""
      v-model="awardDialogVisible"
      :fullscreen="windowWidth < 992"
      :width="windowWidth < 992 ? '100%' : '40%'"
      center
    >
      <!-- 如果屏幕分辨率低于992px 对话框转为全屏 并修改按钮文字不能换行 -->
      <!-- <span>{{ awardData.img_url }}</span> -->
      <el-image v-if="awardData?.img_url" :src="awardData.img_url" fit="contain" />

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-wrap -m-4 text-center">
            <div class="p-4 sm:w-1/2 w-1/2">
              <h2
                class="title-font font-medium text-3xl text-gray-900"
                v-if="awardData?.combination"
              >
                {{ awardData.combination }}
              </h2>
              <p class="leading-relaxed">组合数</p>
            </div>
            <div class="p-4 sm:w-1/2 w-1/2">
              <h2 class="title-font font-medium text-3xl text-gray-900" v-if="awardData?.bncra_num">
                {{ awardData.bncra_num }}
              </h2>
              <p class="leading-relaxed">BnCRA</p>
            </div>
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-wrap -m-4 text-center">
            <div class="p-4 w-full">
              <button
                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg whitespace-nowrap"
              >
                <a
                  :href="awardData?.img_url_origin"
                  target="_blank"
                  v-if="awardData?.img_url_origin"
                  >{{ $t('home.award.ImgSave') }}</a
                >
              </button>
            </div>
            <!-- <div class="p-4 sm:w-1/2 w-1/2">
              <button
                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg whitespace-nowrap"
              >
                <a
                  target="_blank"
                  :href="`https://api.hamcq.cn/partner/crac/paper/${
                    searchQuery.year ?? 2023
                  }?callsign=${searchQuery.callsign}`"
                >
                  {{ $t('home.award.Apply') }}</a
                >
              </button>
            </div> -->
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

.award-down {
  text-decoration: underline;
  cursor: pointer;
}
</style>
