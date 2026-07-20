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

const { searchData, awardData } = useHomeStore()!
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
      :width="windowWidth < 992 ? '100%' : '720px'"
      class="award-dialog"
      center
    >
      <!-- 如果屏幕分辨率低于992px 对话框转为全屏 并修改按钮文字不能换行 -->
      <!-- <span>{{ awardData.img_url }}</span> -->
      <div class="award-dialog-content">
        <div class="award-image-wrap">
          <el-image
            v-if="awardData?.img_url"
            class="award-image"
            :src="awardData.img_url"
            fit="contain"
          />
        </div>

        <section class="award-stats">
          <div class="award-stat-item">
            <h2 v-if="awardData?.combination">{{ awardData.combination }}</h2>
            <p>组合数</p>
          </div>
          <div class="award-stat-item">
            <h2 v-if="awardData?.bncra_num">{{ awardData.bncra_num }}</h2>
            <p>BnCRA</p>
          </div>
        </section>

        <div class="award-actions">
          <a
            v-if="awardData?.img_url_origin"
            class="award-save-button"
            :href="awardData.img_url_origin"
            target="_blank"
          >
            {{ $t('home.award.ImgSave') }}
          </a>
        </div>
      </div>
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

:deep(.award-dialog .el-dialog__body) {
  padding: 16px 24px 28px;
}

.award-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.award-image-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.award-image {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: min(68vh, 820px);

  :deep(img) {
    display: block;
    width: auto;
    max-width: 100%;
    max-height: min(68vh, 820px);
    object-fit: contain;
  }
}

.award-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 24px;
  width: min(100%, 520px);
  margin: 28px auto 0;
  color: #4b5563;
  text-align: center;
}

.award-stat-item {
  h2 {
    margin: 0;
    color: #111827;
    font-size: 36px;
    font-weight: 500;
    line-height: 1.15;
  }

  p {
    margin: 6px 0 0;
    line-height: 1.5;
  }
}

.award-actions {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
}

.award-save-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  height: 44px;
  padding: 0 24px;
  border-radius: 6px;
  background: #6366f1;
  color: #fff;
  font-size: 18px;
  line-height: 1;
  white-space: nowrap;
}

.award-save-button:hover {
  background: #4f46e5;
  color: #fff;
}

@media screen and (max-width: 991px) {
  :deep(.award-dialog .el-dialog__body) {
    padding: 12px 16px 24px;
  }

  .award-image,
  .award-image :deep(img) {
    max-height: 62vh;
  }

  .award-stats {
    margin-top: 24px;
  }
}
</style>
