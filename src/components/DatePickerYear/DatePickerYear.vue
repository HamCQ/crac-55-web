<!--
 * @Description: 选择年份
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-30
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-30
-->
<script lang="ts" setup>
import { dayjs, ElDatePicker } from 'element-plus'

import { useConfigState } from '@/store/config'

defineOptions({ name: 'DatePickerYear' })

const { currentYear, changeYear, disabledDate } = useConfigState()
</script>

<template>
  <div class="date-picker-year">
    <ElDatePicker
      type="year"
      style="width: 100%"
      placeholder="选择年份"
      size="large"
      :model-value="currentYear ? dayjs().set('y', parseInt(currentYear)).valueOf() : undefined"
      @update:model-value="(e) => changeYear(dayjs(e).get('y').toString())"
      :clearable="false"
      :disabled-date="disabledDate"
    />
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 992px) {
  .date-picker-year {
    width: 100px;
  }
}
</style>
