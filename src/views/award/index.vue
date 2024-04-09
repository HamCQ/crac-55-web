<!-- 申请纸质奖状 -->
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { useProvideHomeStore } from '@/store/home'

import MailInfo, { type RuleForm } from './components/MailInfo.vue'

defineOptions({ name: 'applyPaperVue' })
const { awardData } = useProvideHomeStore()

const { t } = useI18n()

const state = reactive({
  agreement: false,
  day: '',
  hour: '',
  minute: '',
  /** 是否通过校验 */
  hasCheck: false
})

const onSubmit = (form: RuleForm) => {
  if (!state.agreement) {
    ElMessage.info(t('award.pleaseAgreement'))
    return
  }
  if (!state.hasCheck) {
    ElMessage.info(t('award.pleaseCheck'))
    return
  }
  console.log(form)
}
</script>

<template>
  <div class="apply-page">
    <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900">
      {{ t('award.title') }}
    </h1>
    <div class="flex apply-page-content">
      <el-image
        class="flex-1 mt-20 w-50%"
        v-if="awardData?.img_url"
        :src="awardData.img_url"
        fit="contain"
      />
      <el-skeleton class="flex-1 mt-20 w-50%" v-else>
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 1000px" />
        </template>
      </el-skeleton>

      <div class="ml-10 flex-1 mt-20 apply-page-main">
        <h2 class="font-bold sm:text-2xl text-xl">{{ t('award.stepOne') }}</h2>
        <p class="mt-5">
          {{ t('award.stepOneLine1') }}
        </p>
        <p class="mt-5">
          {{ t('award.stepOneLine2') }}
        </p>

        <el-checkbox
          class="mt-5"
          style="color: var(--el-color-primary)"
          v-model="state.agreement"
          :label="t('award.agreement')"
          :value="1"
        />

        <h2 class="font-bold sm:text-2xl text-xl mt-10">{{ t('award.stepTwo') }}</h2>
        <p class="mt-5">
          {{ t('award.stepTwoLine1') }}
          <span class="font-bold" style="color: var(--el-color-primary)">B8CRA</span>
          {{ t('award.stepTwoLine2') }}
        </p>
        <p class="mt-5">{{ t('award.stepTwoLine3') }}</p>

        <div class="mt-5 flex items-center flex-wrap">
          <div class="flex items-center mr-3 mb-3">
            <span class="font-bold mr-1">{{ t('award.band') }}</span>
            <span>15M</span>
          </div>
          <div class="flex items-center mr-5 mb-3">
            <span class="font-bold mr-1">{{ t('award.model') }}</span>
            <span>FT8</span>
          </div>
          <div class="flex items-center mr-3 mb-3">
            <span class="font-bold mr-1">{{ t('award.day') }}</span>
            <el-input style="width: 80px" v-model="state.day" placeholder="00"></el-input>
          </div>
          <div class="flex items-center mr-3 mb-3">
            <span class="font-bold mr-1">{{ t('award.hour') }}</span>
            <el-input style="width: 80px" v-model="state.hour" placeholder="00"></el-input>
          </div>
          <div class="flex items-center mb-3">
            <span class="font-bold mr-1">{{ t('award.minute') }}</span>
            <el-input style="width: 80px" v-model="state.minute" placeholder="00"></el-input>
          </div>
        </div>
        <el-button class="mt-5" style="width: 100px" size="large" type="primary">{{
          t('award.validate')
        }}</el-button>

        <h2 class="font-bold sm:text-2xl text-xl mt-10">{{ t('award.stepThree') }}</h2>
        <MailInfo @submit="onSubmit" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
  .apply-page-content {
    flex-direction: column;

    .apply-page-main {
      margin-top: 30px;
    }
  }
}
</style>
